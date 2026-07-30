import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveApplicationPaths } from "../src/config/application-paths";
import type { Application } from "../src/shared/schema";
import {
  FileManagementService,
  formatLocalDate,
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

  it("uses a local ISO date and adds deterministic collision suffixes", async () => {
    const date = new Date(2026, 6, 30, 12, 0, 0);
    expect(formatLocalDate(date)).toBe("2026-07-30");
    await expect(
      service.allocateApplicationFolderName("Siemens", date),
    ).resolves.toBe("Siemens_2026-07-30");
    await expect(
      service.allocateApplicationFolderName("Siemens", date),
    ).resolves.toBe("Siemens_2026-07-30_2");
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
      new Date(2026, 6, 30),
    );
    const application = {
      folderName,
      status: "Beworben",
    } as Application;
    await service.ensureApplicationDirectories(application);
    const active = service.documentDirectories(application);
    await writeFile(path.join(active.anschreiben, "Anschreiben.docx"), "cover");
    await writeFile(path.join(active.lebenslauf, "Lebenslauf.docx"), "resume");

    await service.transitionApplicationDocuments(application, "Absage");

    const rejected = service.documentDirectories({
      ...application,
      status: "Absage",
    });
    await expect(
      readFile(path.join(rejected.anschreiben, "Anschreiben.docx"), "utf8"),
    ).resolves.toBe("cover");
    await expect(
      readFile(path.join(rejected.lebenslauf, "Lebenslauf.docx"), "utf8"),
    ).resolves.toBe("resume");
    await expect(access(active.anschreiben)).rejects.toThrow();
    await expect(access(active.lebenslauf)).rejects.toThrow();
  });
});
