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

  it("renders the Elegant PDF with a full-height right sidebar and no empty photo placeholder", () => {
    const elegantApplication = applicationSchema.parse({
      ...application,
      templateId: "elegant",
      accentColor: "#0788FF",
      secondaryColor: "#264A68",
      designSettings: {
        ...application.designSettings,
        columnLayout: "right-sidebar",
        resumeOutputMode: "visual",
      },
    });

    const html = buildDocumentHtml(
      elegantApplication,
      profile,
      "lebenslauf",
    );

    expect(html).toContain('data-template="elegant"');
    expect(html).toContain('data-no-fit="true"');
    expect(html).toContain('<aside class="elegant-pdf-sidebar">');
    expect(html).toContain(
      "grid-template-columns:minmax(0,140mm) 70mm",
    );
    expect(html).toContain("Zusammenfassung");
    expect(html).toContain("Stärken");
    expect(html).not.toContain('<img class="elegant-pdf-photo"');
    expect(html).not.toContain("elegant-pdf-monogram");
  });

  it("uses a separate linear Elegant ATS renderer in logical section order", () => {
    const elegantAtsApplication = applicationSchema.parse({
      ...application,
      templateId: "elegant",
      designSettings: {
        ...application.designSettings,
        columnLayout: "right-sidebar",
        resumeOutputMode: "ats",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
    });

    const html = buildDocumentHtml(
      elegantAtsApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('class="page-content elegant-pdf-ats"');
    expect(body).not.toContain('<aside class="elegant-pdf-sidebar');
    expect(body).not.toContain('<img class="elegant-pdf-photo"');
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Berufserfahrung"),
    );
    expect(body.indexOf("Berufserfahrung")).toBeLessThan(
      body.indexOf("Kenntnisse"),
    );
    expect(body.indexOf("Kenntnisse")).toBeLessThan(
      body.indexOf("Sprachen"),
    );
    expect(body.indexOf("Sprachen")).toBeLessThan(
      body.indexOf("Stärken"),
    );
  });

  it("renders the Zweispaltig PDF with a clean 62/38 composition", () => {
    const zweispaltigApplication = applicationSchema.parse({
      ...application,
      templateId: "zweispaltig",
      accentColor: "#165DAA",
      secondaryColor: "#EAF2FA",
      designSettings: {
        ...application.designSettings,
        columnLayout: "template",
        resumeOutputMode: "visual",
      },
    });

    const html = buildDocumentHtml(
      zweispaltigApplication,
      profile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="zweispaltig"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain('class="zweispaltig-pdf-columns"');
    expect(body).toContain('<aside class="zweispaltig-pdf-sidebar">');
    expect(html).toContain(
      "grid-template-columns:minmax(0,62%) minmax(0,38%)",
    );
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Stärken");
    expect(body).not.toContain('<img class="zweispaltig-pdf-photo"');
    expect(body).not.toContain("monogram");
  });

  it("uses a separate linear Zweispaltig ATS renderer in logical order", () => {
    const zweispaltigAtsApplication = applicationSchema.parse({
      ...application,
      templateId: "zweispaltig",
      designSettings: {
        ...application.designSettings,
        columnLayout: "template",
        resumeOutputMode: "ats",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      education: [
        {
          id: crypto.randomUUID(),
          from: "10/2015",
          to: "09/2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
    });

    const html = buildDocumentHtml(
      zweispaltigAtsApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain(
      'class="page-content zweispaltig-pdf zweispaltig-pdf-ats"',
    );
    expect(body).not.toContain('<aside class="zweispaltig-pdf-sidebar');
    expect(body).not.toContain('<img class="zweispaltig-pdf-photo"');
    expect(body.indexOf("Berufliches Profil")).toBeLessThan(
      body.indexOf("Berufserfahrung"),
    );
    expect(body.indexOf("Berufserfahrung")).toBeLessThan(
      body.indexOf("Ausbildung"),
    );
    expect(body.indexOf("Ausbildung")).toBeLessThan(
      body.indexOf("Kenntnisse"),
    );
    expect(body.indexOf("Kenntnisse")).toBeLessThan(
      body.indexOf("Sprachen"),
    );
    expect(body.indexOf("Sprachen")).toBeLessThan(
      body.indexOf("Stärken"),
    );
  });

  it("renders the Zeitgenössisch PDF with organic photo shapes and left sidebar", () => {
    const zeitgenoessischApplication = applicationSchema.parse({
      ...application,
      templateId: "zeitgenoessisch",
      accentColor: "#2FB478",
      secondaryColor: "#CBECDD",
      designSettings: {
        ...application.designSettings,
        columnLayout: "left-sidebar",
        resumeOutputMode: "visual",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
    });

    const html = buildDocumentHtml(
      zeitgenoessischApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="zeitgenoessisch"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain("zeit-pdf-photo-composition");
    expect(body).toContain("zeit-pdf-photo-pale");
    expect(body).toContain('<aside class="zeit-pdf-left">');
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Erfahrung");
    expect(body).toContain("Stärken");
    expect(body).not.toContain("monogram");
  });

  it("removes the Zeitgenössisch photo composition without a photo", () => {
    const zeitgenoessischApplication = applicationSchema.parse({
      ...application,
      templateId: "zeitgenoessisch",
      accentColor: "#2FB478",
      secondaryColor: "#CBECDD",
      designSettings: {
        ...application.designSettings,
        columnLayout: "left-sidebar",
        resumeOutputMode: "visual",
      },
    });
    const html = buildDocumentHtml(
      zeitgenoessischApplication,
      profile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("zeit-pdf-header no-photo");
    expect(body).not.toContain("zeit-pdf-photo-composition");
    expect(body).not.toContain('<img class="zeit-pdf-photo"');
  });

  it("uses a separate linear Zeitgenössisch ATS renderer in logical order", () => {
    const zeitgenoessischAtsApplication = applicationSchema.parse({
      ...application,
      templateId: "zeitgenoessisch",
      designSettings: {
        ...application.designSettings,
        columnLayout: "left-sidebar",
        resumeOutputMode: "ats",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      certifications: ["Professional Scrum Master I"],
      education: [
        {
          id: crypto.randomUUID(),
          from: "10/2015",
          to: "09/2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
    });

    const html = buildDocumentHtml(
      zeitgenoessischAtsApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain(
      'class="page-content zeit-pdf zeit-pdf-ats"',
    );
    expect(body).not.toContain('<aside class="zeit-pdf-left');
    expect(body).not.toContain("zeit-pdf-photo-composition");
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Berufserfahrung"),
    );
    expect(body.indexOf("Berufserfahrung")).toBeLessThan(
      body.indexOf("Ausbildung"),
    );
    expect(body.indexOf("Ausbildung")).toBeLessThan(
      body.indexOf("Kenntnisse"),
    );
    expect(body.indexOf("Kenntnisse")).toBeLessThan(
      body.indexOf("Sprachen"),
    );
    expect(body.indexOf("Sprachen")).toBeLessThan(
      body.indexOf("Stärken"),
    );
    expect(body.indexOf("Stärken")).toBeLessThan(
      body.indexOf("Zertifikate"),
    );
  });
});
