import { describe, expect, it } from "vitest";
import { applicationSchema, profileSchema } from "../src/shared/schema";
import { buildDocumentHtml } from "./documents";

const now = new Date("2026-07-19T10:00:00.000Z").toISOString();

const application = applicationSchema.parse({
  schemaVersion: 1,
  id: "d50ac50f-cafe-4ca3-b06b-a98b0bb1fa11",
  folderName: "Beispiel-GmbH",
  company: {
    name: "Beispiel GmbH",
    city: "Berlin",
  },
  contact: {},
  job: {
    title: "Senior Softwareentwickler",
  },
  status: "Entwurf",
  templateId: "modern-sidebar",
  accentColor: "#ff5a00",
  secondaryColor: "#9e0000",
  documents: {
    resumeProfile: "Mehrjährige Erfahrung in skalierbaren Plattformen.",
  },
  statusHistory: [],
  createdAt: now,
  updatedAt: now,
});

const profile = profileSchema.parse({
  id: "f42f1006-799c-48bc-a705-4fa4533b8ac8",
  isDefault: true,
  firstName: "Mina",
  lastName: "Kaya",
  title: "Softwareentwicklerin",
  city: "Berlin",
  email: "mina@example.com",
  skills: ["TypeScript", "React"],
  experiences: [
    {
      id: "0f15f341-0b0d-49de-8b14-d53d517577f2",
      from: "01/2022",
      to: "Heute",
      role: "Senior Entwicklerin",
      company: "Beispiel GmbH",
      city: "Berlin",
      achievements: ["Ladezeiten um 30 % reduziert."],
    },
  ],
  education: [],
  languages: ["Deutsch", "Englisch"],
  certifications: [],
  updatedAt: now,
});

describe("Lebenslauf-Dokumente", () => {
  it("uses the selected composition and both custom colors in exported HTML", () => {
    const html = buildDocumentHtml(application, profile, "lebenslauf");

    expect(html).toContain("cv-sidebar-right");
    expect(html).toContain("--accent:#ff5a00");
    expect(html).toContain("--secondary:#9e0000");
    expect(html).toContain("Zusammenfassung");
    expect(html).toContain("TypeScript");
    expect(html).not.toContain("Enhancv");
  });

  it("renders dynamic knowledge categories and hides disabled entries", () => {
    const dynamicProfile = profileSchema.parse({
      ...profile,
      knowledgeSection: {
        title: "Kenntnisse & Zusatzangaben",
        isVisible: true,
        categories: [
          {
            id: crypto.randomUUID(),
            title: "Backend",
            type: "it",
            subtitle: "Serverseitige Entwicklung",
            displayMode: "level-dots",
            showLevels: true,
            showYearsOfExperience: true,
            isVisible: true,
            sortOrder: 0,
            items: [
              {
                id: crypto.randomUUID(),
                name: "Node.js",
                level: "advanced",
                yearsOfExperience: 4,
                isVisible: true,
                sortOrder: 0,
              },
              {
                id: crypto.randomUUID(),
                name: "Versteckt",
                level: "none",
                isVisible: false,
                sortOrder: 1,
              },
            ],
            subcategories: [],
          },
        ],
      },
    });
    const html = buildDocumentHtml(
      application,
      dynamicProfile,
      "lebenslauf",
    );

    expect(html).toContain("Kenntnisse &amp; Zusatzangaben");
    expect(html).toContain("Backend");
    expect(html).toContain("Node.js");
    expect(html).toContain("Fortgeschrittene Kenntnisse");
    expect(html).not.toContain("Versteckt");
  });

  it("keeps the same resume composition in the complete application package", () => {
    const html = buildDocumentHtml(application, profile, "mappe");

    expect(html.match(/class="page /g)).toHaveLength(3);
    expect(html).toContain("cv-sidebar-right");
  });

  it("always exports the cover letter as exactly one A4 page", () => {
    const longApplication = applicationSchema.parse({
      ...application,
      documents: {
        ...application.documents,
        coverIntroduction: "Einleitung ".repeat(100),
        coverMotivation: "Motivation ".repeat(100),
        coverQualification: "Qualifikation ".repeat(100),
        coverCompanyFit: "Unternehmensbezug ".repeat(100),
        coverClosing: "Abschluss ".repeat(100),
      },
    });
    const html = buildDocumentHtml(longApplication, profile, "anschreiben");

    expect(html.match(/class="page /g)).toHaveLength(1);
    expect(html).toContain("letter-page letter-dense");
    expect(html).toContain("@page{size:A4;margin:0}");
    expect(html).toContain("content.dataset.fitScale");
  });

  it("limits a long resume to two complete A4 sheets", () => {
    const denseProfile = profileSchema.parse({
      ...profile,
      experiences: Array.from({ length: 8 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `01/20${10 + index}`,
        to: `12/20${10 + index}`,
        role: `Softwareentwicklerin ${index + 1}`,
        company: `Unternehmen ${index + 1}`,
        city: "Berlin",
        achievements: Array.from(
          { length: 6 },
          (_, achievementIndex) =>
            `Messbares Projektergebnis ${achievementIndex + 1} mit verbesserter Qualität und kürzeren Bearbeitungszeiten.`,
        ),
      })),
    });
    const html = buildDocumentHtml(
      application,
      denseProfile,
      "lebenslauf",
    );

    expect(html.match(/data-resume-page="/g)).toHaveLength(2);
    expect(html).toContain('data-resume-page="1"');
    expect(html).toContain('data-resume-page="2"');
    expect(html).not.toContain('data-resume-page="3"');
    expect(html).toContain("cv-continuation");
  });

  it("maps persisted design alternatives to shared PDF variables and classes", () => {
    const customizedApplication = applicationSchema.parse({
      ...application,
      designSettings: {
        ...application.designSettings,
        marginLevel: 5,
        sectionSpacingLevel: 1,
        fontSize: "large",
        lineHeightLevel: 4,
        fontId: "georgia",
        headingFontId: "montserrat",
        columnLayout: "timeline",
        backgroundId: "dots",
        showBackgroundInPrint: false,
      },
    });
    const html = buildDocumentHtml(
      customizedApplication,
      profile,
      "lebenslauf",
    );

    expect(html).toContain("--doc-margin:23mm");
    expect(html).toContain("--section-gap:3.5mm");
    expect(html).toContain("--body-size:10pt");
    expect(html).toContain("column-timeline");
    expect(html).toContain("background-dots");
    expect(html).toContain("no-print-background");
  });

  it("renders the programming-languages background in preview and PDF HTML", () => {
    const technicalApplication = applicationSchema.parse({
      ...application,
      designSettings: {
        ...application.designSettings,
        backgroundId: "programming-languages-bg",
        showBackgroundInPrint: true,
      },
    });
    const html = buildDocumentHtml(
      technicalApplication,
      profile,
      "lebenslauf",
    );

    expect(html).toContain("background-programming-languages-bg");
    expect(html).toContain("programming-languages-layer");
    expect(html).toContain(">TypeScript<");
    expect(html).toContain(">Electron<");
    expect(html).toContain("print-background");
  });

  it("automatically omits decorative technology tags in compact ATS mode", () => {
    const atsApplication = applicationSchema.parse({
      ...application,
      designSettings: {
        ...application.designSettings,
        backgroundId: "programming-languages-bg",
        columnLayout: "compact-ats",
      },
    });
    const html = buildDocumentHtml(
      atsApplication,
      profile,
      "lebenslauf",
    );

    expect(html).toContain("background-programming-languages-bg");
    expect(html).not.toContain(">TypeScript<");
    expect(html).not.toContain(
      'class="document-background-layer programming-languages-layer"',
    );
  });

  it("forces ATS rendering even when a visual column layout is selected", () => {
    const atsApplication = applicationSchema.parse({
      ...application,
      designSettings: {
        ...application.designSettings,
        columnLayout: "right-sidebar",
        resumeOutputMode: "ats",
        backgroundId: "programming-languages-bg",
      },
    });
    const html = buildDocumentHtml(atsApplication, profile, "lebenslauf");

    expect(html).toContain("column-compact-ats");
    expect(html).not.toContain(
      'class="document-background-layer programming-languages-layer"',
    );
    expect(html).toContain("knowledge-comma");
    expect(html).toContain("<h3>Kenntnisse</h3>");
    expect(html).not.toContain("●●●●○");
    expect(html.indexOf("Zusammenfassung")).toBeLessThan(
      html.indexOf("Berufserfahrung"),
    );
  });

  it("renders the selected profile photo and signature in exported documents", () => {
    const imageData = "data:image/png;base64,iVBORw0KGgo=";
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: imageData,
      signaturePath: imageData,
    });

    const resumeHtml = buildDocumentHtml(
      application,
      mediaProfile,
      "lebenslauf",
    );
    const letterHtml = buildDocumentHtml(
      application,
      mediaProfile,
      "anschreiben",
    );

    expect(resumeHtml).toContain("cv-avatar-image");
    expect(resumeHtml).toContain(imageData);
    expect(letterHtml).toContain("signature-image");
    expect(letterHtml).toContain(imageData);
  });
});
