import { describe, expect, it } from "vitest";
import { buildApplicationEmailMarkdown, getApplicationEmail } from "./applicationEmail";
import { applicationSchema } from "./schema";
import { defaultDocumentDesign } from "./documentDesign";

const application = applicationSchema.parse({
  schemaVersion: 1,
  id: "f15bec4f-d0b0-4d6b-9033-061ff56ae881",
  folderName: "Muster_GmbH_08.09.2026/Softwareentwickler",
  company: {
    name: "Muster GmbH",
    street: "",
    postalCode: "10115",
    city: "Berlin",
    country: "Deutschland",
    website: "",
  },
  contact: {
    salutation: "Frau",
    firstName: "Erika",
    lastName: "Musterfrau",
    position: "Recruiting",
    email: "erika@example.com",
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
  status: "Beworben",
  templateId: "classic-professional",
  accentColor: "#155e58",
  secondaryColor: "#244766",
  designSettings: defaultDocumentDesign,
  notes: "",
  sentAt: "2026-09-08T09:00:00.000Z",
  documents: {
    coverSubject: "",
    coverIntroduction: "",
    coverMotivation: "",
    coverQualification: "",
    coverCompanyFit: "",
    coverExtraParagraph: "",
    coverClosing: "",
    resumeProfile: "",
    deckblattStatement: "",
    emailSubject: "Bewerbung Softwareentwicklung",
    emailMessage: "Guten Tag, anbei erhalten Sie meine Bewerbung.",
    emailAttachmentNote: "Anlagen: Anschreiben und Lebenslauf",
  },
  attachmentIds: [],
  statusHistory: [],
  createdAt: "2026-09-08T08:00:00.000Z",
  updatedAt: "2026-09-08T08:00:00.000Z",
});

describe("application email", () => {
  it("derives recipient, company, role, and central date without inventing data", () => {
    expect(getApplicationEmail(application)).toMatchObject({
      applicationDate: "08.09.2026",
      companyName: "Muster GmbH",
      jobTitle: "Softwareentwickler",
      recipientName: "Frau Erika Musterfrau",
      recipientEmail: "erika@example.com",
    });
    expect(buildApplicationEmailMarkdown(application)).toContain(
      "- Bewerbungsdatum: 08.09.2026",
    );
  });

  it("leaves missing recipient details explicitly unfilled", () => {
    const withoutContact = {
      ...application,
      contact: { ...application.contact, firstName: "", lastName: "", email: "", salutation: "" as const },
    };
    const markdown = buildApplicationEmailMarkdown(withoutContact);
    expect(markdown).toContain("- Empfänger: Nicht angegeben");
    expect(markdown).toContain("- E-Mail-Adresse: Nicht angegeben");
  });
});
