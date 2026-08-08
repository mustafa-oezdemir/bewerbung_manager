import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ApplicationInput } from "../src/shared/schema";
import { defaultDocumentDesign } from "../src/shared/documentDesign";
import { DataStore } from "./storage";

const applicationInput = (company: string): ApplicationInput => ({
  company: {
    name: company,
    street: "",
    postalCode: "10115",
    city: "Berlin",
    country: "Deutschland",
    website: "",
  },
  contact: {
    salutation: "",
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    phone: "",
  },
  job: {
    title: "Softwareentwickler",
    source: "",
    url: "",
    fullText: "",
    workModel: "Hybrid",
    contractType: "Unbefristet",
    salaryExpectation: "",
  },
  templateId: "classic-professional",
  accentColor: "#155e58",
  secondaryColor: "#244766",
  designSettings: defaultDocumentDesign,
  notes: "",
});

describe("DataStore backups", () => {
  let root: string;
  let store: DataStore;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), "bewerbungsmanager-"));
    store = new DataStore(root);
    await store.initialize();
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("creates one automatic daily workspace backup", async () => {
    const files = await readdir(path.join(store.dataPath, "Backups"));
    expect(
      files.some((file) => /^workspace-\d{4}-\d{2}-\d{2}\.json$/.test(file)),
    ).toBe(true);
  });

  it("restores a validated workspace and keeps a pre-import snapshot", async () => {
    await store.createApplication(applicationInput("Erste GmbH"));
    const backupPath = path.join(root, "workspace-export.json");
    await store.writeBackup(backupPath);
    await store.createApplication(applicationInput("Zweite AG"));

    const restored = await store.importBackup(backupPath);

    expect(restored.applications).toHaveLength(1);
    expect(restored.applications[0].company.name).toBe("Erste GmbH");
    const files = await readdir(path.join(store.dataPath, "Backups"));
    expect(files.some((file) => file.startsWith("vor-import-"))).toBe(true);
  });

  it("rejects invalid settings imports without changing the workspace", async () => {
    const settingsPath = path.join(root, "invalid-settings.json");
    await writeFile(
      settingsPath,
      JSON.stringify({
        followUpDays: 14,
        notificationsEnabled: true,
        theme: "system",
        archiveAccepted: false,
        autoBackupEnabled: true,
        backupRetention: 500,
        autoSaveDelaySeconds: 2,
        language: "de",
      }),
      "utf8",
    );

    await expect(store.importSettings(settingsPath)).rejects.toThrow();
    expect(store.getWorkspace().settings.backupRetention).toBe(10);
  });

  it("exports the current editor snapshot instead of a stale persisted template", async () => {
    const workspace = await store.createApplication(
      applicationInput("Snapshot GmbH"),
    );
    const persisted = workspace.applications[0];
    const snapshot = {
      ...persisted,
      templateId: "executive-dark",
      accentColor: "#16b8b5",
      secondaryColor: "#087573",
      designSettings: {
        ...persisted.designSettings,
        columnLayout: "template" as const,
        backgroundId: "dots" as const,
      },
    };

    const persistedHtml = store.getExportHtml(
      persisted.id,
      "lebenslauf",
    );
    const snapshotHtml = store.getExportHtml(
      persisted.id,
      "lebenslauf",
      snapshot,
    );

    expect(persistedHtml).toContain("cv-centered");
    expect(snapshotHtml).toContain("cv-sidebar-left");
    expect(snapshotHtml).toContain("column-template");
    expect(snapshotHtml).toContain("--accent:#16b8b5");
    expect(snapshotHtml).toContain("--secondary:#087573");
    expect(snapshotHtml).toContain("background-dots");
  });

  it("creates only company-date Anschreiben folders for drafts", async () => {
    const first = await store.createApplication(applicationInput("Siemens"));
    const firstApplication = first.applications[0];
    expect(firstApplication.folderName).toMatch(
      /^Siemens_\d{4}-\d{2}-\d{2}$/,
    );
    const second = await store.createApplication(applicationInput("Siemens"));
    const secondApplication = second.applications[0];
    expect(secondApplication.folderName).toBe(
      `${firstApplication.folderName}_2`,
    );
    await expect(
      access(
        path.join(
          store.files.paths.anschreibenDocuments,
          firstApplication.folderName,
        ),
      ),
    ).resolves.toBeUndefined();
    await expect(
      readdir(
        path.join(
          store.files.paths.anschreibenDocuments,
          firstApplication.folderName,
        ),
      ),
    ).resolves.toEqual([]);
    await expect(
      access(
        path.join(
          store.files.paths.lebenslaufDocuments,
          firstApplication.folderName,
        ),
      ),
    ).rejects.toThrow();
    await expect(
      access(
        path.join(
          store.files.paths.applicationsData,
          firstApplication.folderName,
        ),
      ),
    ).resolves.toBeUndefined();
    await expect(
      readFile(
        path.join(
          store.files.paths.applicationsData,
          firstApplication.folderName,
          "bewerbung.json",
        ),
        "utf8",
      ),
    ).resolves.toContain('"status": "Entwurf"');

    await store.changeStatus(firstApplication.id, "Bewerbungsbereit");
    await expect(
      access(
        path.join(
          store.files.paths.lebenslaufDocuments,
          firstApplication.folderName,
        ),
      ),
    ).rejects.toThrow();
  });

  it("does not rewrite user-authored application documents", async () => {
    const first = await store.createApplication(applicationInput("Erste GmbH"));
    const firstApplication = first.applications[0];
    const coverLetterPath = path.join(
      store.files.documentDirectories(firstApplication).anschreiben,
      "Erste_GmbH.md",
    );
    await writeFile(coverLetterPath, "Manuell bearbeitet", "utf8");

    const second = await store.createApplication(applicationInput("Zweite AG"));
    const secondApplication = second.applications[0];
    const secondCoverLetterPath = path.join(
      store.files.documentDirectories(secondApplication).anschreiben,
      "Zweite_AG.md",
    );
    await writeFile(secondCoverLetterPath, "Auch manuell bearbeitet", "utf8");
    secondApplication.documents.coverIntroduction =
      "Nur dieses Anschreiben wurde geändert.";
    await store.saveApplication(secondApplication);

    await expect(readFile(coverLetterPath, "utf8")).resolves.toBe(
      "Manuell bearbeitet",
    );
    await expect(readFile(secondCoverLetterPath, "utf8")).resolves.toBe(
      "Auch manuell bearbeitet",
    );
  });

  it("links central archive documents without copying or deleting them", async () => {
    const created = await store.createApplication(
      applicationInput("Archive GmbH"),
    );
    const application = created.applications[0];
    const certificatePath = path.join(
      store.files.paths.zertifikateArchive,
      "Certificate.pdf",
    );
    await writeFile(certificatePath, "certificate");

    const linked = await store.addAttachment(
      application.id,
      "Zertifikate",
      certificatePath,
    );
    const attachment = linked.attachments[0];
    expect(attachment.archiveRelativePath).toBe("Certificate.pdf");
    expect(attachment.storedName).toBeUndefined();
    expect(store.getAttachmentPathById(attachment.id)).toBe(certificatePath);

    await store.removeAttachment(attachment.id);
    await expect(readFile(certificatePath, "utf8")).resolves.toBe(
      "certificate",
    );
  });

  it("keeps the record and archives company documents when status becomes Absage", async () => {
    const created = await store.createApplication(
      {
        ...applicationInput("Absage GmbH"),
        sentAt: new Date().toISOString(),
      },
    );
    const application = created.applications[0];
    const active = store.files.documentDirectories(application);
    await mkdir(active.lebenslauf, { recursive: true });
    await writeFile(path.join(active.lebenslauf, "Lebenslauf.docx"), "resume");

    const rejected = await store.changeStatus(application.id, "Absage");
    const rejectedApplication = rejected.applications.find(
      (item) => item.id === application.id,
    );
    expect(rejectedApplication?.status).toBe("Absage");
    const rejectedDirectories = store.files.documentDirectories(
      rejectedApplication!,
    );
    await expect(
      readFile(
        path.join(rejectedDirectories.lebenslauf, "Lebenslauf.docx"),
        "utf8",
      ),
    ).resolves.toBe("resume");
  });

  it("persists and clears the new-application draft below data/Settings", async () => {
    const draft = applicationInput("Draft GmbH");
    await store.saveApplicationDraft(draft);
    await expect(store.getApplicationDraft()).resolves.toMatchObject({
      company: { name: "Draft GmbH" },
    });
    await store.clearApplicationDraft();
    await expect(store.getApplicationDraft()).resolves.toBeNull();
  });
});
