import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
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
});
