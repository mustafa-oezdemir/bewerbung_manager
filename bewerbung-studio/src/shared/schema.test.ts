import { describe, expect, it } from "vitest";
import {
  appSettingsSchema,
  applicationDraftSchema,
  applicationInputSchema,
  attachmentSchema,
  profileSchema,
  workspaceSchema,
} from "./schema";

describe("BewerbungsManager schemas", () => {
  it("accepts a complete minimal application input", () => {
    const result = applicationInputSchema.safeParse({
      company: {
        name: "Beispiel GmbH",
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
        source: "Karriereseite",
        url: "",
        fullText: "",
        workModel: "Hybrid",
        contractType: "Unbefristet",
        salaryExpectation: "",
      },
      templateId: "classic-professional",
      accentColor: "#155e58",
      notes: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.secondaryColor).toBe("#244766");
      expect(result.data.designSettings.columnLayout).toBe("template");
      expect(result.data.designSettings.resumeOutputMode).toBe("visual");
      expect(result.data.designSettings.marginLevel).toBe(3);
    }
  });

  it("rejects unsafe or incomplete application input", () => {
    const result = applicationInputSchema.safeParse({
      company: { name: "", city: "" },
      job: { title: "", url: "javascript:alert(1)" },
      templateId: "",
      accentColor: "red",
    });
    expect(result.success).toBe(false);
  });

  it("requires a versioned central workspace", () => {
    expect(workspaceSchema.safeParse({ schemaVersion: 99 }).success).toBe(
      false,
    );
  });

  it("adds an empty dynamic knowledge section to older profiles", () => {
    const profile = profileSchema.parse({
      id: crypto.randomUUID(),
      isDefault: true,
      firstName: "Mina",
      lastName: "Kaya",
      title: "",
      street: "",
      postalCode: "",
      city: "",
      country: "Deutschland",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      portfolio: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      photoPath: "",
      signaturePath: "",
      summary: "",
      skills: ["React"],
      experiences: [],
      education: [],
      languages: [],
      certifications: [],
      updatedAt: new Date().toISOString(),
    });
    expect(profile.knowledgeSection.title).toBe(
      "Kenntnisse & Zusatzangaben",
    );
    expect(profile.knowledgeSection.categories).toEqual([]);
  });

  it("migrates existing attachments into the PDF package by default", () => {
    const attachment = attachmentSchema.parse({
      id: crypto.randomUUID(),
      applicationId: crypto.randomUUID(),
      category: "Zeugnisse",
      fileName: "Arbeitszeugnis.pdf",
      storedName: "20260719_Arbeitszeugnis.pdf",
      description: "",
      documentDate: "",
      order: 0,
      createdAt: new Date().toISOString(),
    });
    expect(attachment.includedInPackage).toBe(true);
  });

  it("fills new data-safety settings when older settings are loaded", () => {
    const settings = appSettingsSchema.parse({
      followUpDays: 14,
      notificationsEnabled: true,
      theme: "system",
      archiveAccepted: false,
      language: "de",
    });
    expect(settings.autoBackupEnabled).toBe(true);
    expect(settings.backupRetention).toBe(10);
    expect(settings.autoSaveDelaySeconds).toBe(2);
  });

  it("rejects unsafe backup retention values", () => {
    expect(
      appSettingsSchema.safeParse({
        followUpDays: 14,
        notificationsEnabled: true,
        theme: "system",
        archiveAccepted: false,
        autoBackupEnabled: true,
        backupRetention: 500,
        autoSaveDelaySeconds: 2,
        language: "de",
      }).success,
    ).toBe(false);
  });

  it("validates partial wizard drafts without requiring completed fields", () => {
    const result = applicationDraftSchema.safeParse({
      company: { name: "Beispiel GmbH" },
      job: { title: "" },
      templateId: "classic-professional",
      accentColor: "#155e58",
    });
    expect(result.success).toBe(true);
  });
});
