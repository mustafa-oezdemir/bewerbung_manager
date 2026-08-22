import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveApplicationPaths } from "../src/config/application-paths";
import type { Application } from "../src/shared/schema";
import {
  ApplicationFolderLockedError,
  FileManagementService,
  formatLocalDate,
  isApplicationFolderLockError,
  sanitizeFileName,
} from "./file-management";

describe("FileManagementService", () => {
  let root: string;
  let service: FileManagementService;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), "bewerbung-files-"));
    service = new FileManagementService(resolveApplicationPaths(root));
    await service.initialize();
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("creates the central folder structure", async () => {
    const paths = service.paths;
    await Promise.all(
      [
        paths.dataRoot,
        paths.anschreibenDocuments,
        paths.lebenslaufDocuments,
        paths.zeugnisseArchive,
        paths.zertifikateArchive,
        paths.absagenRoot,
      ].map((candidate) => expect(access(candidate)).resolves.toBeUndefined()),
    );
  });

  it("sanitizes invalid and reserved Windows names", () => {
    expect(sanitizeFileName('Muster/Firma: "Berlin" | GmbH')).toBe(
      "Muster_Firma_Berlin_GmbH",
    );
    expect(sanitizeFileName("CON")).toBe("_CON");
    expect(sanitizeFileName('  <>:"/\\|?*  ')).toBe("Bewerbung");
  });

  it("groups applications by company/date and adds position collision suffixes", async () => {
    const date = new Date(2026, 6, 30, 12, 0, 0);
    expect(formatLocalDate(date)).toBe("2026-07-30");
    await expect(
      service.allocateApplicationFolderName(
        "Siemens",
        "Softwareentwickler",
        date,
      ),
    ).resolves.toBe(
      path.join("Siemens_2026-07-30", "Softwareentwickler"),
    );
    await expect(
      service.allocateApplicationFolderName("Siemens", "IT Support", date),
    ).resolves.toBe(path.join("Siemens_2026-07-30", "IT_Support"));
    await expect(
      service.allocateApplicationFolderName(
        "Siemens",
        "Softwareentwickler",
        date,
      ),
    ).resolves.toBe(
      path.join("Siemens_2026-07-30", "Softwareentwickler_2"),
    );
  });

  it("moves every application artifact when the application date changes", async () => {
    const folderName = path.join("Siemens_2026-07-30", "Softwareentwickler");
    const application = {
      folderName,
      status: "Beworben",
      company: { name: "Siemens" },
      job: { title: "Softwareentwickler" },
    } as Application;
    const sourcePaths = [
      service.applicationDataPath(folderName),
      path.join(service.paths.anschreibenDocuments, folderName),
      path.join(service.paths.lebenslaufDocuments, folderName),
    ];
    await Promise.all(
      sourcePaths.map(async (source, index) => {
        await mkdir(source, { recursive: true });
        await writeFile(path.join(source, `Dokument-${index}.txt`), "content");
      }),
    );

    const relocated = await service.relocateApplicationFolders(
      application,
      new Date(2026, 7, 22, 9, 0, 0),
    );

    expect(relocated).toBe(
      path.join("Siemens_2026-08-22", "Softwareentwickler"),
    );
    for (const [index, source] of sourcePaths.entries()) {
      await expect(access(source)).rejects.toThrow();
      await expect(
        readFile(
          path.join(
            source.replace(folderName, relocated),
            `Dokument-${index}.txt`,
          ),
          "utf8",
        ),
      ).resolves.toBe("content");
    }
  });

  it("recognizes Windows file-lock errors", () => {
    for (const code of ["EACCES", "EBUSY", "EPERM"]) {
      expect(isApplicationFolderLockError({ code })).toBe(true);
    }
    expect(isApplicationFolderLockError({ code: "ENOENT" })).toBe(false);
    expect(new ApplicationFolderLockedError().message).toMatch(
      /geöffneten Word-, PDF-/,
    );
  });

  it("only accepts archive files from the configured category root", async () => {
    const certificate = path.join(
      service.paths.zertifikateArchive,
      "AWS.pdf",
    );
    await writeFile(certificate, "certificate");
    expect(
      service.archiveRelativePath("Zertifikate", certificate),
    ).toBe("AWS.pdf");
    expect(() =>
      service.archiveRelativePath(
        "Zertifikate",
        path.join(root, "outside.pdf"),
      ),
    ).toThrow(/zentralen Ordner/);
  });

  it("moves company documents into Absagen without deleting their contents", async () => {
    const folderName = await service.allocateApplicationFolderName(
      "Siemens",
      "Softwareentwickler",
      new Date(2026, 6, 30),
    );
    const application = {
      folderName,
      status: "Beworben",
    } as Application;
    const active = service.documentDirectories(application);
    await Promise.all([
      mkdir(active.anschreiben, { recursive: true }),
      mkdir(active.lebenslauf, { recursive: true }),
    ]);
    await writeFile(path.join(active.anschreiben, "Anschreiben.docx"), "cover");
    await writeFile(path.join(active.lebenslauf, "Lebenslauf.docx"), "resume");

    await service.transitionApplicationDocuments(application, "Absage");

    const rejected = service.documentDirectories({
      ...application,
      status: "Absage",
    });
    expect(rejected.anschreiben).toBe(
      path.join(service.paths.absagenRoot, folderName),
    );
    await expect(
      readFile(path.join(rejected.anschreiben, "Anschreiben.docx"), "utf8"),
    ).resolves.toBe("cover");
    await expect(
      readFile(path.join(rejected.lebenslauf, "Lebenslauf.docx"), "utf8"),
    ).resolves.toBe("resume");
    await expect(access(active.anschreiben)).rejects.toThrow();
    await expect(access(active.lebenslauf)).rejects.toThrow();
    await expect(access(path.dirname(active.anschreiben))).rejects.toThrow();
    await expect(access(path.dirname(active.lebenslauf))).rejects.toThrow();
  });

  it("removes empty rejection parents when an application becomes active again", async () => {
    const folderName = path.join("Siemens_2026-07-30", "Softwareentwickler");
    const application = {
      folderName,
      status: "Absage",
    } as Application;
    const rejected = service.documentDirectories(application);
    await Promise.all([
      mkdir(rejected.anschreiben, { recursive: true }),
      mkdir(rejected.lebenslauf, { recursive: true }),
    ]);
    await writeFile(path.join(rejected.anschreiben, "Anschreiben.docx"), "cover");
    await writeFile(path.join(rejected.lebenslauf, "Lebenslauf.docx"), "resume");

    await service.transitionApplicationDocuments(application, "Beworben");

    const active = service.documentDirectories({
      ...application,
      status: "Beworben",
    });
    await expect(
      readFile(path.join(active.anschreiben, "Anschreiben.docx"), "utf8"),
    ).resolves.toBe("cover");
    await expect(
      readFile(path.join(active.lebenslauf, "Lebenslauf.docx"), "utf8"),
    ).resolves.toBe("resume");
    await expect(
      access(path.join(service.paths.absagenRoot, "Siemens_2026-07-30")),
    ).rejects.toThrow();
  });

  it("deletes all application folders from active and rejection locations", async () => {
    const folderName = path.join(
      "Siemens_2026-07-30",
      "Softwareentwickler",
    );
    const targets = [
      service.applicationDataPath(folderName),
      path.join(service.paths.anschreibenDocuments, folderName),
      path.join(service.paths.lebenslaufDocuments, folderName),
      service.rejectionPath(folderName),
    ];
    await Promise.all(
      targets.map(async (target) => {
        await mkdir(target, { recursive: true });
        await writeFile(path.join(target, "Dokument.docx"), "content");
      }),
    );

    await service.removeApplicationArtifacts({ folderName });

    await Promise.all(
      targets.map((target) => expect(access(target)).rejects.toThrow()),
    );
    await Promise.all(
      [
        service.paths.applicationsData,
        service.paths.anschreibenDocuments,
        service.paths.lebenslaufDocuments,
        service.paths.absagenRoot,
      ].map((rootPath) =>
        expect(
          access(path.join(rootPath, "Siemens_2026-07-30")),
        ).rejects.toThrow(),
      ),
    );
  });

  it("refuses to delete an application root", async () => {
    await expect(
      service.removeApplicationArtifacts({ folderName: "." }),
    ).rejects.toThrow(/Ungültiger Bewerbungsordner/);
    await expect(access(service.paths.applicationsData)).resolves.toBeUndefined();
  });

  it("protects nested position applications inside an older flat folder", async () => {
    const legacyFolder = "Siemens_2026-07-30";
    const nestedData = path.join(
      service.applicationDataPath(legacyFolder),
      "Softwareentwickler",
    );
    await mkdir(nestedData, { recursive: true });
    await writeFile(path.join(nestedData, "bewerbung.json"), "{}");

    await expect(
      service.removeApplicationArtifacts({ folderName: legacyFolder }),
    ).rejects.toThrow(/positionsbezogene Bewerbungen/);
    await expect(access(nestedData)).resolves.toBeUndefined();
  });
});
