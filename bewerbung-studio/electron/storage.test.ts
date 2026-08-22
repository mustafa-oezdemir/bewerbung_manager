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

  it("creates company-date roots with position subfolders for drafts", async () => {
    const first = await store.createApplication(applicationInput("Siemens"));
    const firstApplication = first.applications[0];
    const companyDateFolder = path.dirname(firstApplication.folderName);
    expect(companyDateFolder).toMatch(
      /^Siemens_\d{4}-\d{2}-\d{2}$/,
    );
    expect(path.basename(firstApplication.folderName)).toBe(
      "Softwareentwickler",
    );

    const secondInput = applicationInput("Siemens");
    secondInput.job.title = "IT Support Spezialist";
    const second = await store.createApplication(secondInput);
    const secondApplication = second.applications[0];
    expect(path.dirname(secondApplication.folderName)).toBe(companyDateFolder);
    expect(path.basename(secondApplication.folderName)).toBe(
      "IT_Support_Spezialist",
    );

    const third = await store.createApplication(applicationInput("Siemens"));
    const thirdApplication = third.applications[0];
    expect(path.dirname(thirdApplication.folderName)).toBe(companyDateFolder);
    expect(path.basename(thirdApplication.folderName)).toBe(
      "Softwareentwickler_2",
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
    expect(store.getApplicationAnschreibenPath(firstApplication.id)).toBe(
      path.join(
        store.files.paths.anschreibenDocuments,
        firstApplication.folderName,
      ),
    );
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

  it("maps the current cover-letter fields to Word placeholders", async () => {
    const created = await store.createApplication({
      ...applicationInput("Beispiel GmbH"),
      sentAt: "2024-05-17T09:00:00.000Z",
      contact: {
        salutation: "Herr",
        firstName: "Andreas",
        lastName: "Steck",
        position: "",
        email: "andreas@example.com",
        phone: "",
      },
    });
    const application = created.applications[0];
    application.documents = {
      ...application.documents,
      coverMotivation: "Motivation aus dem Editor.",
      coverQualification: "Fachliche Eignung aus dem Editor.",
      coverCompanyFit: "Unternehmensbezug aus dem Editor.",
    };
    await store.saveApplication(application);

    const context = store.getTemplateDocumentContext(application.id);

    expect(context.targetDirectories.anschreiben).toBe(
      path.join(
        store.files.paths.anschreibenDocuments,
        application.folderName,
      ),
    );
    expect(path.dirname(application.folderName)).toBe(
      "Beispiel_GmbH_2024-05-17",
    );
    expect(context.data).toMatchObject({
      ANSPRECHPARTNER: "Herrn Andreas Steck",
      BEWERBUNGSDATUM: "17.5.2024",
      MOTIVATION: "Motivation aus dem Editor.",
      FACHLICHE_EIGNUNG: "Fachliche Eignung aus dem Editor.",
      UNTERNEHMENSBEZUG: "Unternehmensbezug aus dem Editor.",
      ZUSATZABSATZ: "",
    });
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
    const rejectionEvent = rejected.events.find(
      (event) =>
        event.applicationId === application.id &&
        event.type === "application-rejected",
    );
    expect(rejectionEvent).toMatchObject({
      title: "Absage GmbH · Absage",
      startAt: rejectedApplication?.rejectionAt,
      allDay: true,
      cancelled: false,
    });

    await writeFile(
      path.join(store.dataPath, "Settings", "workspace.json"),
      JSON.stringify({
        ...rejected,
        events: rejected.events.filter(
          (event) => event.type !== "application-rejected",
        ),
      }),
      "utf8",
    );
    const reloadedStore = new DataStore(root);
    await reloadedStore.initialize();
    expect(
      reloadedStore
        .getWorkspace()
        .events.find((event) => event.type === "application-rejected"),
    ).toMatchObject({
      applicationId: application.id,
      startAt: rejectedApplication?.rejectionAt,
    });
    const rejectedDirectories = store.files.documentDirectories(
      rejectedApplication!,
    );
    expect(store.getApplicationAnschreibenPath(application.id)).toBe(
      rejectedDirectories.anschreiben,
    );
    await expect(
      readFile(
        path.join(rejectedDirectories.lebenslauf, "Lebenslauf.docx"),
        "utf8",
      ),
    ).resolves.toBe("resume");
  });

  it("deletes the application record and its generated folders", async () => {
    const created = await store.createApplication(
      {
        ...applicationInput("Löschen GmbH"),
        sentAt: new Date().toISOString(),
      },
    );
    const application = created.applications[0];
    const activeDirectories = store.files.documentDirectories(application);
    const dataDirectory = store.files.applicationDataPath(application.folderName);
    const rejectionDirectory = store.files.rejectionPath(application.folderName);
    await Promise.all([
      mkdir(activeDirectories.lebenslauf, { recursive: true }),
      mkdir(path.join(dataDirectory, "Deckblatt"), { recursive: true }),
      mkdir(rejectionDirectory, { recursive: true }),
    ]);
    await Promise.all([
      writeFile(path.join(activeDirectories.anschreiben, "Anschreiben.docx"), "letter"),
      writeFile(path.join(activeDirectories.lebenslauf, "Lebenslauf.docx"), "resume"),
      writeFile(path.join(rejectionDirectory, "Absage.pdf"), "rejection"),
    ]);
    const certificatePath = path.join(
      store.files.paths.zertifikateArchive,
      "Loeschen-Zertifikat.pdf",
    );
    await writeFile(certificatePath, "certificate");
    const withAttachment = await store.addAttachment(
      application.id,
      "Zertifikate",
      certificatePath,
    );
    const attachment = withAttachment.attachments.find(
      (item) => item.applicationId === application.id,
    );

    const workspace = await store.removeApplication(application.id);

    expect(workspace.applications).toHaveLength(0);
    const deletedArchive = JSON.parse(
      await readFile(
        path.join(store.dataPath, "Silinenler", "silinenler.json"),
        "utf8",
      ),
    );
    expect(deletedArchive.deletedApplications).toHaveLength(1);
    expect(deletedArchive.deletedApplications[0]).toMatchObject({
      application: {
        id: application.id,
        company: { name: "Löschen GmbH" },
      },
      events: expect.arrayContaining([
        expect.objectContaining({ applicationId: application.id }),
      ]),
      attachments: [
        expect.objectContaining({ id: attachment?.id }),
      ],
    });
    expect(deletedArchive.deletedApplications[0].deletedAt).toBeTruthy();
    await expect(readFile(certificatePath, "utf8")).resolves.toBe("certificate");
    await Promise.all(
      [
        activeDirectories.anschreiben,
        activeDirectories.lebenslauf,
        dataDirectory,
        rejectionDirectory,
      ].map((target) => expect(access(target)).rejects.toThrow()),
    );
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
