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
  it("renders Deckblatt information from the actual profile data", () => {
    const deckblattProfile = profileSchema.parse({
      ...profile,
      street: "Musterstraße 1",
      postalCode: "10115",
      phone: "+49 30 123456",
      linkedin: "linkedin.com/in/mina-kaya",
      photoPath: "data:image/png;base64,AA==",
    });
    const html = buildDocumentHtml(application, deckblattProfile, "deckblatt", [
      {
        id: "50f9a46a-f5f6-4101-9eb0-bbef5b9dc557",
        applicationId: application.id,
        category: "Zeugnisse",
        fileName: "Arbeitszeugnis.pdf",
        description: "",
        documentDate: "",
        order: 0,
        includedInPackage: true,
        createdAt: now,
      },
    ]);

    expect(html).toContain("Standort: Berlin");
    expect(html).toContain("Musterstraße 1, 10115 Berlin");
    expect(html).toContain('href="mailto:mina@example.com"');
    expect(html).toContain('href="https://linkedin.com/in/mina-kaya"');
    expect(html).toContain('class="cover-photo"');
    expect(html).toContain("Kernkompetenzen");
    expect(html).toContain("Bewerbungsunterlagen");
    expect(html).toContain("<li>Lebenslauf</li>");
    expect(html).toContain("<li>Arbeitszeugnis.pdf</li>");
  });

  it("keeps the signature directly below the final cover-letter paragraph", () => {
    const html = buildDocumentHtml(application, profile, "anschreiben");

    expect(html).toContain(
      ".signature{display:flex;flex-direction:column;align-items:flex-start;margin-top:0;padding-bottom:6mm}",
    );
    expect(html).toContain(".letter-compact .signature{margin-top:0}");
    expect(html).toContain(".letter-dense .signature{margin-top:0}");
    expect(html).toContain(".letter-content>.letter-closing{margin-bottom:0}");
    expect(html).toContain('class="letter-body letter-closing"');
    expect(html).toContain('.letter-page[data-resume-template="stilvoll"] .letter-content{padding-bottom:calc(var(--doc-margin) + 5mm)}');
    expect(html).toContain('.letter-page[data-resume-template="stilvoll"] .letter-content>p:not(.subject),.letter-page[data-resume-template="stilvoll"] .signature{line-height:1.28}');
    expect(html).toContain('.letter-page[data-resume-template="kompakt"] .letter-content{padding-bottom:calc(var(--doc-margin) + 5mm)}');
    expect(html).toContain('.letter-page[data-resume-template="kompakt"] .letter-content>p:not(.subject),.letter-page[data-resume-template="kompakt"] .signature{line-height:1.28}');
  });

  it("exports long LinkedIn contacts in two columns for every requested template", () => {
    const linkedin =
      "https://www.linkedin.com/in/mustafa-oezdemir/";
    const github = "https://github.com/mustafa-oezdemir";
    const contactProfile = profileSchema.parse({
      ...profile,
      linkedin,
      github,
      email: "mustafa.ozdemir1408@gmail.com",
      phone: "+49 176 93153406",
      postalCode: "35039",
      city: "Marburg",
      country: "Deutschland",
    });
    const templateIds = [
      "kreativ",
      "zweispaltig",
      "einspaltig",
      "klassisch",
      "modern",
      "tabellarisch",
    ] as const;

    for (const templateId of templateIds) {
      const contactApplication = applicationSchema.parse({
        ...application,
        templateId,
        designSettings: {
          ...application.designSettings,
          resumeOutputMode: "visual",
        },
      });
      const html = buildDocumentHtml(
        contactApplication,
        contactProfile,
        "lebenslauf",
      );
      const body = html.slice(html.indexOf("<body>"));

      expect(body).toContain('data-contact-kind="linkedin"');
      expect(body).toContain(linkedin);
      if (templateId === "zweispaltig") {
        expect(body).toContain('data-contact-kind="github"');
        expect(body).toContain(github);
      }
    }

    const cssHtml = buildDocumentHtml(
      applicationSchema.parse({ ...application, templateId: "kreativ" }),
      contactProfile,
      "lebenslauf",
    );
    expect(cssHtml).toContain(
      "grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)",
    );
    expect(cssHtml).toContain(
      '[data-contact-kind="linkedin"] i{overflow:hidden;text-overflow:ellipsis;white-space:nowrap',
    );

    const zweispaltigCssHtml = buildDocumentHtml(
      applicationSchema.parse({ ...application, templateId: "zweispaltig" }),
      contactProfile,
      "lebenslauf",
    );
    expect(zweispaltigCssHtml).toContain(
      ".zweispaltig-pdf-contacts{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:1.1mm 8mm;width:100%;max-width:132mm",
    );
    expect(zweispaltigCssHtml).toContain(
      '[data-contact-kind="github"]>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;overflow-wrap:normal}',
    );
  });

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

  it("uses the entered application date in the exported cover letter", () => {
    const datedApplication = applicationSchema.parse({
      ...application,
      sentAt: "2024-05-17T09:00:00.000Z",
    });

    const html = buildDocumentHtml(datedApplication, profile, "anschreiben");

    expect(html).toContain("Berlin, den 17. Mai 2024");
  });

  it("renders both contacts in the cover-letter recipient and greeting", () => {
    const twoContactApplication = applicationSchema.parse({
      ...application,
      contact: {
        salutation: "Frau",
        firstName: "Anna",
        lastName: "Müller",
      },
      additionalContacts: [
        {
          salutation: "Herr",
          firstName: "Mehmet",
          lastName: "Yılmaz",
        },
      ],
    });

    const html = buildDocumentHtml(
      twoContactApplication,
      profile,
      "anschreiben",
    );

    expect(html).toContain("Frau Anna Müller<br>Herrn Mehmet Yılmaz");
    expect(html).toContain(
      "<p>Sehr geehrte Frau Müller, sehr geehrter Herr Yılmaz,</p>",
    );
  });

  it("justifies only the body paragraphs of exported cover letters", () => {
    const html = buildDocumentHtml(application, profile, "anschreiben");

    expect(html).toContain(
      ".letter-body{text-align:justify;text-justify:inter-word;hyphens:auto;overflow-wrap:break-word}",
    );
    expect(html.match(/<p class="letter-body(?: letter-closing)?">/g)).toHaveLength(5);
    expect(html).toContain("<p>Sehr geehrte Damen und Herren,</p>");
  });

  it("places the applicant contact details above the cover letter rule", () => {
    const html = buildDocumentHtml(application, profile, "anschreiben");

    expect(html).toContain('<span class="sender-name">Mina Kaya</span>');
    expect(html).toContain(
      '<span class="sender-title">Softwareentwicklerin</span>',
    );
    expect(html).toContain(
      '<span class="sender-contact">Berlin · mina@example.com</span>',
    );
    expect(html).toContain(
      ".sender-name{color:var(--ink);font-size:15pt;font-weight:700;line-height:1.2}",
    );
    expect(html).toContain(
      ".sender-contact{margin-top:.8mm;font-size:11pt;line-height:1.25}",
    );
    expect(html).toContain(
      ".sender{margin-bottom:2mm;color:var(--muted);text-align:center}",
    );
    expect(html.indexOf('<div class="sender">')).toBeLessThan(
      html.indexOf('<div class="rule"></div>'),
    );
    expect(html.indexOf('<div class="rule"></div>')).toBeLessThan(
      html.indexOf('<div class="recipient">'),
    );
  });

  it("uses the resume template style and consistent letter typography in the PDF", () => {
    const html = buildDocumentHtml(application, profile, "anschreiben");
    const splitCleanHtml = buildDocumentHtml(
      applicationSchema.parse({ ...application, templateId: "zweispaltig" }),
      profile,
      "anschreiben",
    );
    const zeitgenoessischHtml = buildDocumentHtml(
      applicationSchema.parse({ ...application, templateId: "zeitgenoessisch" }),
      profile,
      "anschreiben",
    );
    const kreativHtml = buildDocumentHtml(
      applicationSchema.parse({ ...application, templateId: "kreativ" }),
      profile,
      "anschreiben",
    );

    expect(html).toContain(
      'class="page letter-page letter-standard layout-sidebar-right',
    );
    expect(html).toContain('data-resume-template="modern-sidebar"');
    expect(html).toContain(
      ".subject{color:var(--accent);font-weight:800;font-size:14pt",
    );
    expect(html).toContain(
      ".letter-content>p:not(.subject){font-size:11pt;line-height:1.32}",
    );
    expect(html).toContain(
      ".letter-compact .letter-content>p:not(.subject){font-size:11pt;line-height:1.3}",
    );
    expect(html).toContain(
      ".letter-dense .letter-content>p:not(.subject){font-size:11pt;line-height:1.26}",
    );
    expect(html).toContain(
      ".letter-page.layout-sidebar-right .letter-content{padding-right:calc(var(--doc-margin) + 7mm);border-right:5mm solid var(--secondary)}",
    );
    expect(splitCleanHtml).toContain("layout-split-clean");
    expect(splitCleanHtml).not.toContain(
      ".letter-page.layout-split-clean .sender{text-align:left}",
    );
    expect(zeitgenoessischHtml).toContain(
      'data-resume-template="zeitgenoessisch"',
    );
    expect(zeitgenoessischHtml).toContain(
      '.letter-page[data-resume-template="zeitgenoessisch"].layout-sidebar-left .letter-content{padding-left:var(--doc-margin);border-left:0}',
    );
    expect(zeitgenoessischHtml).toContain(
      '.letter-page.letter-compact[data-resume-template="zeitgenoessisch"].layout-sidebar-left .letter-content{padding-left:20mm}',
    );
    expect(zeitgenoessischHtml).toContain(
      '.letter-page.letter-dense[data-resume-template="zeitgenoessisch"].layout-sidebar-left .letter-content{padding-left:18mm}',
    );
    expect(kreativHtml).toContain('data-resume-template="kreativ"');
    expect(kreativHtml).toContain(
      '.letter-page[data-resume-template="kreativ"].layout-bold-grid .rule{height:4px}',
    );
    expect(kreativHtml).toContain(
      ".letter-page.layout-split-clean .rule{height:4px}",
    );
    expect(kreativHtml).toContain(
      ".letter-page.layout-bold-grid .rule{height:4px}",
    );
    expect(kreativHtml).toContain(
      ".letter-page.layout-minimal .rule{height:4px;background:var(--line)}",
    );
    expect(kreativHtml).toContain(
      ".letter-dense .rule{height:4px;margin-bottom:10mm}",
    );
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
    expect(html).toContain(">GO<");
    expect(html).toContain(">php<");
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
    expect(letterHtml).toContain(
      '<span class="signature-name">Mina Kaya</span>',
    );
    expect(letterHtml).not.toContain("<strong>Mina Kaya</strong>");
    expect(letterHtml).toContain(
      ".signature p{margin:0;font-size:11pt}.signature-image",
    );
    expect(letterHtml).toContain(
      ".signature-name{font-size:11pt;font-weight:400;line-height:1.2}",
    );
  });

  it("renders the Elegant PDF with a full-height right sidebar and no empty photo placeholder", () => {
    const elegantApplication = applicationSchema.parse({
      ...application,
      templateId: "elegant",
      accentColor: "#FE6201",
      secondaryColor: "#8A0202",
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
    expect(html).toContain("box-shadow:inset 0 3.5mm 0 #600101");
    expect(html).toContain(
      "grid-template-columns:minmax(0,140mm) 70mm",
    );
    expect(html).toContain("Zusammenfassung");
    expect(html).toContain("Stärken");
    expect(html).not.toContain('<img class="elegant-pdf-photo"');
    expect(html).not.toContain("elegant-pdf-monogram");
    expect(html).not.toContain("Seite 1 von 1");
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
    const mainStart = body.indexOf('<main class="zweispaltig-pdf-main">');
    const sidebarStart = body.indexOf(
      '<aside class="zweispaltig-pdf-sidebar">',
    );
    const mainMarkup = body.slice(mainStart, sidebarStart);
    const sidebarMarkup = body.slice(
      sidebarStart,
      body.indexOf("</aside>", sidebarStart),
    );

    expect(body).toContain('data-template="zweispaltig"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain('class="zweispaltig-pdf-columns"');
    expect(body).toContain('<aside class="zweispaltig-pdf-sidebar">');
    expect(html).toContain(
      "grid-template-columns:minmax(0,62fr) minmax(0,38fr);column-gap:11mm",
    );
    expect(html).toContain("width:30mm;height:30mm");
    expect(body).toContain('class="zweispaltig-pdf-entry-meta"');
    expect(body).toContain('viewBox="0 0 24 24"');
    expect(body).toContain('class="zweispaltig-pdf-language-dots"');
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Stärken");
    expect(mainMarkup).not.toContain("Zusammenfassung");
    expect(sidebarMarkup).toContain("Zusammenfassung");
    expect(body).not.toContain('<img class="zweispaltig-pdf-photo"');
    expect(body).not.toContain("monogram");
  });

  it("keeps a sidebar summary in the right Zweispaltig PDF column", () => {
    const zweispaltigApplication = applicationSchema.parse({
      ...application,
      templateId: "zweispaltig",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "visual",
      },
    });
    const sidebarSummaryProfile = profileSchema.parse({
      ...profile,
      resumeSectionLayouts: {
        zweispaltig: [
          { type: "experience", zone: "main" },
          { type: "education", zone: "main" },
          { type: "summary", zone: "sidebar" },
          { type: "strengths", zone: "sidebar" },
          { type: "knowledge", zone: "sidebar" },
          { type: "languages", zone: "sidebar" },
          { type: "certifications", zone: "sidebar" },
        ],
      },
    });
    const html = buildDocumentHtml(
      zweispaltigApplication,
      sidebarSummaryProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));
    const mainStart = body.indexOf('<main class="zweispaltig-pdf-main">');
    const sidebarStart = body.indexOf(
      '<aside class="zweispaltig-pdf-sidebar">',
    );
    const sidebarEnd = body.indexOf("</aside>", sidebarStart);
    const mainMarkup = body.slice(mainStart, sidebarStart);
    const sidebarMarkup = body.slice(sidebarStart, sidebarEnd);

    expect(mainStart).toBeGreaterThan(-1);
    expect(sidebarStart).toBeGreaterThan(mainStart);
    expect(mainMarkup).not.toContain("Zusammenfassung");
    expect(sidebarMarkup).toContain("Zusammenfassung");
    expect(sidebarMarkup).toContain("Mehrjährige Erfahrung");
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
      skills: [],
      strengths: [
        {
          id: "80000000-0000-4000-8000-000000000001",
          title: "Java",
          description: "Maven, Spring Boot",
        },
        {
          id: "80000000-0000-4000-8000-000000000002",
          title: "PHP",
          description: "Laravel, Symfony",
        },
        {
          id: "80000000-0000-4000-8000-000000000003",
          title: "Go",
          description: "Echo, Gin",
        },
      ],
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
    expect(body).toContain(">Java<");
    expect(body).toContain("Maven, Spring Boot");
    expect(body).toContain(">PHP<");
    expect(body).toContain("Laravel, Symfony");
    expect(body).toContain(">Go<");
    expect(body).toContain("Echo, Gin");
    expect(html).toContain(
      ".zeit-pdf-strength{display:grid;grid-template-columns:5.5mm minmax(0,1fr);gap:1.5mm",
    );
    expect(body).toContain("zeit-pdf-heading");
    expect(body).toContain("<svg");
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

  it("renders the Kreativ PDF with green banner, photo, circles, and two columns", () => {
    const kreativApplication = applicationSchema.parse({
      ...application,
      templateId: "kreativ",
      accentColor: "#37B978",
      secondaryColor: "#D9F2E5",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        columnLayout: "two-column-left-wide",
        resumeOutputMode: "visual",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
      strengths: [
        {
          id: "81000000-0000-4000-8000-000000000001",
          title: "Java",
          description: "Maven, Spring Boot",
        },
        {
          id: "81000000-0000-4000-8000-000000000002",
          title: "PHP",
          description: "Laravel, Symfony",
        },
        {
          id: "81000000-0000-4000-8000-000000000003",
          title: "Go",
          description: "Echo, Gin",
        },
      ],
      experiences: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `01/202${index}`,
        to: `12/202${index}`,
        role: `Softwareentwicklerin ${index + 1}`,
        company: `Beispielunternehmen ${index + 1}`,
        city: "Berlin",
        achievements: [
          "Automatisierte Abläufe entwickelt und zuverlässig eingeführt.",
          "Qualität und Bearbeitungszeit messbar verbessert.",
          "Technische Ergebnisse nachvollziehbar dokumentiert.",
        ],
      })),
      education: [
        {
          id: crypto.randomUUID(),
          from: "10/2016",
          to: "09/2020",
          degree: "B.Sc. Informatik",
          institution: "Technische Universität Berlin",
          city: "Berlin",
        },
      ],
    });

    const html = buildDocumentHtml(
      kreativApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="kreativ"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain('<img class="kreativ-pdf-photo"');
    expect(body).toContain("kreativ-pdf-background");
    expect(body).toContain('<main class="kreativ-pdf-left">');
    expect(body).toContain('<aside class="kreativ-pdf-right">');
    expect(body.match(/data-resume-page=/g)).toHaveLength(1);
    expect(body).toContain('data-density="standard"');
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Erfahrung");
    expect(body).not.toContain(">Fähigkeiten<");
    expect(body).toContain("Stärken");
    expect(body).toContain(">Java<");
    expect(body).toContain("Maven, Spring Boot");
    expect(body).toContain(">PHP<");
    expect(body).toContain("Laravel, Symfony");
    expect(body).toContain(">Go<");
    expect(body).toContain("Echo, Gin");
    expect(body).toContain('class="kreativ-pdf-entry-heading"');
    expect(body).toContain('class="kreativ-pdf-entry-subheading"');
    expect(body).toContain('class="kreativ-pdf-entry-meta">01/2020 – 12/2020</p>');
    expect(body).toContain('class="kreativ-pdf-entry-location">Berlin</p>');
  });

  it("removes the Kreativ PDF photo placeholder when no photo exists", () => {
    const kreativApplication = applicationSchema.parse({
      ...application,
      templateId: "kreativ",
      accentColor: "#37B978",
      secondaryColor: "#D9F2E5",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        columnLayout: "two-column-left-wide",
        resumeOutputMode: "visual",
      },
    });
    const html = buildDocumentHtml(
      kreativApplication,
      profile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("kreativ-pdf-header no-photo");
    expect(body).not.toContain('<img class="kreativ-pdf-photo"');
    expect(body).not.toContain("monogram");
  });

  it("uses a separate linear Kreativ ATS renderer in logical order", () => {
    const kreativAtsApplication = applicationSchema.parse({
      ...application,
      templateId: "kreativ",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        columnLayout: "two-column-left-wide",
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
      kreativAtsApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain(
      'class="page-content kreativ-pdf kreativ-pdf-ats"',
    );
    expect(body).not.toContain("kreativ-pdf-background");
    expect(body).not.toContain('<img class="kreativ-pdf-photo"');
    expect(body).not.toContain('<aside class="kreativ-pdf-right');
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

  it("renders Ivy League PDF as a centered watercolor single column", () => {
    const ivyApplication = applicationSchema.parse({
      ...application,
      templateId: "ivy-league",
      accentColor: "#073C8C",
      secondaryColor: "#FF6A00",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        sectionSpacingLevel: 4,
        columnLayout: "single",
        resumeOutputMode: "visual",
        backgroundId: "pastel-gradient",
        showBackgroundInPrint: true,
      },
    });
    const ivyProfile = profileSchema.parse({
      ...profile,
      linkedin: "linkedin.com/in/mina-kaya",
      portfolio: "mina.example.com",
      languages: ["Deutsch", "Englisch", "Türkisch", "Französisch"],
      skills: [
        "Analysefähigkeit – Präzise Bewertung komplexer Systeme",
        "Teamführung – Führung interdisziplinärer Teams",
        "Kundenbetreuung – Verlässliche Beratung",
      ],
      education: [
        {
          id: crypto.randomUUID(),
          from: "2012",
          to: "2016",
          degree: "M.Sc. Maschinenbau",
          institution: "Technische Universität München",
          city: "München",
        },
      ],
      certifications: ["TÜV Functional Safety Engineer"],
    });
    const html = buildDocumentHtml(
      ivyApplication,
      ivyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="ivy-league"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain("ivy-pdf-watercolor");
    expect(body).toContain("ivy-pdf-strengths");
    expect(body).toContain("ivy-pdf-languages");
    expect(body).toContain("ivy-pdf-languages--columns-3");
    expect(html).toContain("grid-template-columns:auto auto;justify-content:start;gap:2mm");
    expect(body).toContain("Erfahrung");
    expect(body).toContain('<div class="ivy-pdf-entry-role"><h4>Senior Entwicklerin</h4><span>01/2022 – Heute</span></div>');
    expect(body).toContain('<div class="ivy-pdf-entry-top"><h3>Beispiel GmbH</h3><span>Berlin</span></div>');
    expect(body).toContain(
      'href="https://linkedin.com/in/mina-kaya"',
    );
    expect(body).toContain("https://mina.example.com");
    expect(body).not.toContain("Seite 1 / 1");
    expect(body).not.toContain("Powered by");
    expect(body).not.toContain("<img");
  });

  it("keeps Ivy League strengths when the knowledge section is disabled", () => {
    const ivyApplication = applicationSchema.parse({
      ...application,
      templateId: "ivy-league",
      designSettings: {
        ...application.designSettings,
        columnLayout: "single",
        resumeOutputMode: "visual",
      },
    });
    const strengthsOnlyProfile = profileSchema.parse({
      ...profile,
      strengths: [
        {
          id: crypto.randomUUID(),
          title: "Analytisches Denken",
          description: "Komplexe Zusammenhänge sicher bewerten",
        },
      ],
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
    });
    const html = buildDocumentHtml(
      ivyApplication,
      strengthsOnlyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("ivy-pdf-strengths");
    expect(body).toContain("Analytisches Denken");
    expect(body).not.toContain(">Kenntnisse<");
  });

  it("removes the Ivy League watercolor with the white background option", () => {
    const ivyApplication = applicationSchema.parse({
      ...application,
      templateId: "ivy-league",
      accentColor: "#073C8C",
      secondaryColor: "#FF6A00",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        columnLayout: "single",
        resumeOutputMode: "visual",
        backgroundId: "white",
      },
    });
    const html = buildDocumentHtml(
      ivyApplication,
      profile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="ivy-league"');
    expect(body).not.toContain("ivy-pdf-watercolor");
  });

  it("uses a separate linear Ivy League ATS renderer in logical order", () => {
    const ivyAtsApplication = applicationSchema.parse({
      ...application,
      templateId: "ivy-league",
      accentColor: "#073C8C",
      secondaryColor: "#FF6A00",
      designSettings: {
        ...application.designSettings,
        marginLevel: 2,
        columnLayout: "single",
        resumeOutputMode: "ats",
        backgroundId: "pastel-gradient",
      },
    });
    const ivyProfile = profileSchema.parse({
      ...profile,
      education: [
        {
          id: crypto.randomUUID(),
          from: "2012",
          to: "2016",
          degree: "M.Sc. Maschinenbau",
          institution: "Technische Universität München",
          city: "München",
        },
      ],
      certifications: ["TÜV Functional Safety Engineer"],
    });
    const html = buildDocumentHtml(
      ivyAtsApplication,
      ivyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain(
      'class="page-content ivy-pdf ivy-pdf-ats"',
    );
    expect(body).not.toContain("ivy-pdf-watercolor");
    expect(body).not.toContain("ivy-pdf-dots");
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

  it("renders Stilvoll with photo, chevrons, and the asymmetric visual grid", () => {
    const stilvollApplication = applicationSchema.parse({
      ...application,
      templateId: "stilvoll",
      accentColor: "#36B873",
      secondaryColor: "#075E50",
      designSettings: {
        ...application.designSettings,
        columnLayout: "two-column-right-wide",
        resumeOutputMode: "visual",
        backgroundId: "geometric",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      linkedin: "linkedin.com/in/mina-kaya",
      portfolio: "mina.example.com",
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      stilvollApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="stilvoll"');
    expect(body).toContain("stilvoll-pdf-columns");
    expect(body).toContain("stilvoll-pdf-chevron");
    expect(body).toContain('<img class="stilvoll-pdf-photo"');
    expect(body).toContain("<h2>Softwareentwicklerin</h2>");
    expect(body).not.toContain("Softwareentwicklerin | TypeScript");
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Erfahrung");
    expect(body).toContain('<div class="stilvoll-pdf-heading"><h3>Senior Entwicklerin</h3><span>01/2022 – Heute</span></div>');
    expect(body).toContain('<p class="stilvoll-pdf-meta"><strong>Beispiel GmbH</strong><span>Berlin</span></p>');
    expect(body).toContain(
      'href="https://linkedin.com/in/mina-kaya"',
    );
    expect(body).toContain("https://mina.example.com");
    expect(body).not.toContain("Seite 1 / 1");
  });

  it("keeps Stilvoll strengths when the knowledge section is disabled", () => {
    const stilvollApplication = applicationSchema.parse({
      ...application,
      templateId: "stilvoll",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "visual",
      },
    });
    const strengthsOnlyProfile = profileSchema.parse({
      ...profile,
      strengths: [
        {
          id: crypto.randomUUID(),
          title: "Analytisches Denkvermögen",
          description: "Komplexe Zusammenhänge strukturiert bewerten",
        },
      ],
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
    });
    const html = buildDocumentHtml(
      stilvollApplication,
      strengthsOnlyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("stilvoll-pdf-strengths");
    expect(body).toContain("Analytisches Denkvermögen");
    expect(body).not.toContain(">Kenntnisse<");
  });

  it("renders Stilvoll ATS linearly without photo, chevrons, or rating dots", () => {
    const stilvollApplication = applicationSchema.parse({
      ...application,
      templateId: "stilvoll",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "ats",
        backgroundId: "geometric",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      education: [
        {
          id: crypto.randomUUID(),
          from: "2015",
          to: "2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      stilvollApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("managed-pdf-ats");
    expect(body).not.toContain("stilvoll-pdf-chevron");
    expect(body).not.toContain("<img");
    expect(body).not.toContain("managed-pdf-dots");
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
  });

  it("renders Kompakt as a photo-free high-density two-column document", () => {
    const kompaktApplication = applicationSchema.parse({
      ...application,
      templateId: "kompakt",
      accentColor: "#073D96",
      secondaryColor: "#FF6200",
      designSettings: {
        ...application.designSettings,
        columnLayout: "two-column-left-wide",
        resumeOutputMode: "visual",
        backgroundId: "abstract",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
      strengths: [
        {
          id: "82000000-0000-4000-8000-000000000001",
          title: "Java",
          description: "Maven, Spring Boot",
        },
      ],
      linkedin: "linkedin.com/in/mina-kaya",
      portfolio: "mina.example.com",
      certifications: ["Prozessqualität verbessert"],
    });
    const html = buildDocumentHtml(
      kompaktApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="kompakt"');
    expect(html).toContain(
      ".kompakt-pdf .managed-pdf-background{z-index:-1",
    );
    expect(body).toContain("kompakt-pdf-columns");
    expect(body).toContain('class="managed-pdf-background"');
    expect(body).not.toContain("kompakt-pdf-skills");
    expect(body).toContain('class="kompakt-pdf-strength"');
    expect(body).toContain("<h2>Softwareentwicklerin</h2>");
    expect(body).toContain("Java");
    expect(body).toContain("&#9733;");
    expect(body).not.toContain("&#9873;");
    expect(body).toContain('<div class="kompakt-pdf-entry-heading"><h3>Senior Entwicklerin</h3><time>01/2022 – Heute</time></div>');
    expect(body).toContain('<p class="kompakt-pdf-meta"><strong>Beispiel GmbH</strong><span>Berlin</span></p>');
    expect(html).toContain(".kompakt-pdf .managed-pdf-title{padding-bottom:1mm;border-bottom:.3mm solid var(--managed-divider)}");
    expect(body).toContain('href="https://linkedin.com/in/mina-kaya"');
    expect(body).toContain("https://mina.example.com");
    expect(body).not.toContain("Seite 1 / 1");
    expect(body).not.toContain("<img");
  });

  it("omits empty Kompakt sidebar sections instead of leaving headings behind", () => {
    const kompaktApplication = applicationSchema.parse({
      ...application,
      templateId: "kompakt",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "visual",
        backgroundId: "abstract",
      },
    });
    const emptySidebarProfile = profileSchema.parse({
      ...profile,
      skills: [],
      certifications: [],
    });
    const html = buildDocumentHtml(
      kompaktApplication,
      emptySidebarProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).not.toContain("Stärken");
    expect(body).not.toContain("Erfolge");
    expect(body).not.toContain("Fähigkeiten");
  });

  it("renders Kompakt ATS without flow lines, skill tags, or rating dots", () => {
    const kompaktApplication = applicationSchema.parse({
      ...application,
      templateId: "kompakt",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "ats",
        backgroundId: "abstract",
      },
    });
    const html = buildDocumentHtml(
      kompaktApplication,
      profile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("managed-pdf-ats");
    expect(body).not.toContain("kompakt-pdf-background");
    expect(body).not.toContain("kompakt-pdf-skills");
    expect(body).not.toContain("managed-pdf-dots");
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Berufserfahrung"),
    );
    expect(body.indexOf("Berufserfahrung")).toBeLessThan(
      body.indexOf("Kenntnisse"),
    );
  });

  it("renders Einspaltig as a geometric one-column document with a round photo", () => {
    const einspaltigApplication = applicationSchema.parse({
      ...application,
      templateId: "einspaltig",
      accentColor: "#0B3485",
      secondaryColor: "#4AAAF4",
      designSettings: {
        ...application.designSettings,
        columnLayout: "single",
        resumeOutputMode: "visual",
        backgroundId: "geometric",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      einspaltigApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="einspaltig"');
    expect(body).toContain("einfach-pdf-inner");
    expect(html).toContain(".einfach-pdf .managed-pdf-background{z-index:-1");
    expect(body).toContain('class="managed-pdf-background"');
    expect(body).toContain('<img class="einfach-pdf-photo"');
    expect(body).toContain("einfach-pdf-strengths");
  });

  it("keeps strengths but omits Kenntnisse when the knowledge section is disabled", () => {
    const einspaltigApplication = applicationSchema.parse({
      ...application,
      templateId: "einspaltig",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "visual",
        backgroundId: "geometric",
      },
    });
    const profileWithoutKnowledge = profileSchema.parse({
      ...profile,
      skills: [
        "Führungskompetenz – Ein Team erfolgreich entwickelt.",
        "Vertriebsstrategie – Den Umsatz messbar gesteigert.",
      ],
      knowledgeSection: {
        title: "Kenntnisse",
        isVisible: false,
        categories: [],
      },
    });
    const html = buildDocumentHtml(
      einspaltigApplication,
      profileWithoutKnowledge,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("Stärken");
    expect(body).not.toContain(">Kenntnisse<");
  });

  it("renders Einspaltig ATS in logical order without photo or geometry", () => {
    const einspaltigApplication = applicationSchema.parse({
      ...application,
      templateId: "einspaltig",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "ats",
        backgroundId: "geometric",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      education: [
        {
          id: crypto.randomUUID(),
          from: "2015",
          to: "2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      einspaltigApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("managed-pdf-ats");
    expect(body).toContain('data-template="einspaltig"');
    expect(body).not.toContain("einfach-pdf-background");
    expect(body).not.toContain("<img");
    expect(body).not.toContain("managed-pdf-dots");
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

  it("renders Klassisch with background waves, round photo, and horizontal strengths", () => {
    const klassischApplication = applicationSchema.parse({
      ...application,
      templateId: "klassisch",
      accentColor: "#2B2F32",
      secondaryColor: "#00AFC5",
      designSettings: {
        ...application.designSettings,
        columnLayout: "single",
        resumeOutputMode: "visual",
        backgroundId: "classic-soft-blue-waves",
        showBackgroundInPrint: true,
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      skills: [
        "Teamleitung – Führung interdisziplinärer Teams",
        "Kommunikation – Abstimmung mit Fachbereichen",
        "Konfliktmanagement – Nachhaltige Lösungen",
      ],
      languages: ["Deutsch – Muttersprache", "Englisch – Versiert"],
    });
    const html = buildDocumentHtml(
      klassischApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="klassisch"');
    expect(body).toContain('class="klassisch-pdf-background"');
    expect(body).toContain('<img class="klassisch-pdf-photo"');
    expect(body).toContain("klassisch-pdf-strengths");
    expect(body).toContain("klassisch-pdf-entry-head");
    expect(html).toContain(".klassisch-pdf-background{position:absolute;inset:0;z-index:-1");
    expect(body).not.toContain("Seite 1 / 1");
  });

  it("renders Klassisch ATS in logical order without photo or wave decoration", () => {
    const klassischApplication = applicationSchema.parse({
      ...application,
      templateId: "klassisch",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "ats",
        backgroundId: "classic-soft-blue-waves",
      },
    });
    const atsProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      skills: [
        "Teamführung – Führung interdisziplinärer Teams",
        "Kommunikation – Abstimmung mit Fachbereichen",
        "Konfliktmanagement – Nachhaltige Lösungen",
        "Jira",
      ],
      education: [
        {
          id: crypto.randomUUID(),
          from: "2015",
          to: "2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      klassischApplication,
      atsProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("klassisch-pdf-ats");
    expect(body).not.toContain("klassisch-pdf-background");
    expect(body).not.toContain("<img");
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Erfahrung"),
    );
    expect(body.indexOf("Erfahrung")).toBeLessThan(
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

  it("renders Modern with a clean contact header, round photo, and two columns", () => {
    const modernApplication = applicationSchema.parse({
      ...application,
      templateId: "modern",
      accentColor: "#06B6C9",
      secondaryColor: "#C7F1F5",
      designSettings: {
        ...application.designSettings,
        columnLayout: "two-column-left-wide",
        resumeOutputMode: "visual",
        backgroundId: "white",
        showBackgroundInPrint: false,
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      birthDate: "01.03.1990",
      birthPlace: "München",
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      modernApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain('data-template="modern"');
    expect(body).not.toContain("modern-pdf-background");
    expect(body).toContain("modern-pdf-contacts inline");
    expect(body).toContain("modern-pdf-columns");
    expect(body).toContain('<img class="modern-pdf-photo"');
    expect(body).toContain("Zusammenfassung");
    expect(body).toContain("Erfahrung");
    expect(body).toContain("Fähigkeiten");
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Erfahrung"),
    );
    expect(body).not.toContain("cv-sidebar-right");
  });

  it("uses the saved Modern section order in the PDF HTML", () => {
    const modernApplication = applicationSchema.parse({
      ...application,
      templateId: "modern",
    });
    const reorderedProfile = profileSchema.parse({
      ...profile,
      education: [
        {
          id: crypto.randomUUID(),
          from: "2018",
          to: "2021",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
      resumeSectionLayouts: {
        modern: [
          { type: "education", zone: "main" },
          { type: "experience", zone: "main" },
          { type: "summary", zone: "sidebar" },
          { type: "strengths", zone: "sidebar" },
          { type: "languages", zone: "sidebar" },
          { type: "knowledge", zone: "sidebar" },
          { type: "certifications", zone: "sidebar" },
        ],
      },
    });
    const html = buildDocumentHtml(
      modernApplication,
      reorderedProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));
    const mainStart = body.indexOf('class="modern-pdf-left"');

    expect(body.indexOf("Ausbildung", mainStart)).toBeLessThan(
      body.indexOf("Erfahrung", mainStart),
    );
  });

  it("keeps Modern strengths visible when Kenntnisse is disabled", () => {
    const modernApplication = applicationSchema.parse({
      ...application,
      templateId: "modern",
    });
    const strengthsOnlyProfile = profileSchema.parse({
      ...profile,
      strengths: [
        {
          id: crypto.randomUUID(),
          title: "Java",
          description: "Maven, Spring Boot",
        },
      ],
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
      resumeSectionLayouts: {
        modern: [{ type: "strengths", zone: "sidebar" }],
      },
    });
    const html = buildDocumentHtml(
      modernApplication,
      strengthsOnlyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("Stärken");
    expect(body).toContain("modern-pdf-strength");
    expect(body).toContain("Maven, Spring Boot");
    expect(body).not.toContain(">Fähigkeiten<");
  });

  it("renders Modern ATS linearly without waves, photo, icons, or rating dots", () => {
    const modernApplication = applicationSchema.parse({
      ...application,
      templateId: "modern",
      designSettings: {
        ...application.designSettings,
        resumeOutputMode: "ats",
        backgroundId: "waves",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      education: [
        {
          id: crypto.randomUUID(),
          from: "2015",
          to: "2019",
          degree: "B.Sc. Informatik",
          institution: "Beispiel Universität",
          city: "Berlin",
        },
      ],
      certifications: ["Professional Scrum Master I"],
    });
    const html = buildDocumentHtml(
      modernApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("modern-pdf-ats");
    expect(body).not.toContain("modern-pdf-background");
    expect(body).not.toContain("<img");
    expect(body).not.toContain("modern-pdf-dots");
    expect(body.indexOf("Persönliche Daten")).toBeLessThan(
      body.indexOf("Zusammenfassung"),
    );
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

  it("keeps a reference-density Modern resume on one A4 page", () => {
    const modernApplication = applicationSchema.parse({
      ...application,
      templateId: "modern",
      designSettings: {
        ...application.designSettings,
        columnLayout: "two-column-left-wide",
        resumeOutputMode: "visual",
        backgroundId: "waves",
      },
    });
    const denseProfile = profileSchema.parse({
      ...profile,
      experiences: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2012 + index * 4}`,
        to: `${2016 + index * 4}`,
        role: `Projektrolle ${index + 1}`,
        company: `Unternehmen ${index + 1}`,
        city: "Berlin",
        achievements: Array.from(
          { length: 3 },
          (_, achievementIndex) =>
            `Messbares Projektergebnis ${achievementIndex + 1} erfolgreich erreicht.`,
        ),
      })),
      education: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2006 + index * 2}`,
        to: `${2008 + index * 2}`,
        degree: `Abschluss ${index + 1}`,
        institution: `Hochschule ${index + 1}`,
        city: "Berlin",
      })),
    });
    const html = buildDocumentHtml(
      modernApplication,
      denseProfile,
      "lebenslauf",
    );

    expect(html.match(/data-resume-page="/g)).toHaveLength(1);
  });

  it("renders the Tabellarisch PDF as a one-column timeline with strengths", () => {
    const tabellarischApplication = applicationSchema.parse({
      ...application,
      templateId: "tabellarisch",
      accentColor: "#C78300",
      secondaryColor: "#17263D",
      designSettings: {
        ...application.designSettings,
        columnLayout: "timeline",
        resumeOutputMode: "visual",
        backgroundId: "white",
      },
    });
    const timelineProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      linkedin: "linkedin.com/in/mina-kaya",
      birthDate: "01.03.1990",
      birthPlace: "Berlin",
      experiences: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2012 + index * 4}`,
        to: `${2016 + index * 4}`,
        role: `Projektrolle ${index + 1}`,
        company: `Unternehmen ${index + 1}`,
        city: "Berlin",
        achievements: Array.from(
          { length: 3 },
          (_, achievementIndex) =>
            `Messbares Projektergebnis ${achievementIndex + 1} erfolgreich erreicht.`,
        ),
      })),
      education: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2006 + index * 2}`,
        to: `${2008 + index * 2}`,
        degree: `Abschluss ${index + 1}`,
        institution: `Hochschule ${index + 1}`,
        city: "Berlin",
      })),
    });
    const html = buildDocumentHtml(
      tabellarischApplication,
      timelineProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body.match(/data-resume-page="/g)).toHaveLength(1);
    expect(body).toContain('data-template="tabellarisch"');
    expect(body).toContain('data-no-fit="true"');
    expect(body).toContain("tabellarisch-pdf-background");
    expect(body).toContain("tabellarisch-pdf-strengths");
    expect(body).toContain("tabellarisch-pdf-timeline");
    expect(html).toContain(
      '.tabellarisch-pdf-rail:before{position:absolute;top:2.5mm;bottom:-1mm',
    );
    expect(html).not.toContain(
      ".tabellarisch-pdf-entry:last-child .tabellarisch-pdf-rail:before{bottom:auto;height:1mm}",
    );
    expect(body).toContain('<img class="tabellarisch-pdf-photo"');
    expect(body.indexOf(">Zusammenfassung<")).toBeLessThan(
      body.indexOf(">Stärken<"),
    );
    expect(body.indexOf(">Stärken<")).toBeLessThan(
      body.indexOf(">Erfahrung<"),
    );
    expect(body).not.toContain("column-timeline");
  });

  it("keeps Tabellarisch strengths when the knowledge section is disabled", () => {
    const tabellarischApplication = applicationSchema.parse({
      ...application,
      templateId: "tabellarisch",
    });
    const strengthsOnlyProfile = profileSchema.parse({
      ...profile,
      skills: [],
      knowledgeSection: {
        title: "Kenntnisse",
        isVisible: true,
        categories: [],
      },
      strengths: [
        {
          id: crypto.randomUUID(),
          title: "Java",
          description: "Maven, Spring Boot",
        },
        {
          id: crypto.randomUUID(),
          title: "PHP",
          description: "Laravel, Symfony",
        },
      ],
      resumeSections: {
        ...profile.resumeSections,
        strengths: true,
        skills: false,
      },
    });
    const html = buildDocumentHtml(
      tabellarischApplication,
      strengthsOnlyProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain(">Stärken<");
    expect(body).toContain("tabellarisch-pdf-strengths");
    expect(body).toContain(">Java<");
    expect(body).toContain("Maven, Spring Boot");
    expect(body).toContain(">php<");
  });

  it("renders Tabellarisch ATS without photo, geometry, or timeline rail", () => {
    const tabellarischApplication = applicationSchema.parse({
      ...application,
      templateId: "tabellarisch",
      designSettings: {
        ...application.designSettings,
        columnLayout: "compact-ats",
        resumeOutputMode: "ats",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
    });
    const html = buildDocumentHtml(
      tabellarischApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("tabellarisch-pdf-ats");
    expect(body).not.toContain("tabellarisch-pdf-background");
    expect(body).not.toContain("tabellarisch-pdf-rail");
    expect(body).not.toContain("<img");
    expect(body.indexOf("Zusammenfassung")).toBeLessThan(
      body.indexOf("Erfahrung"),
    );
  });

  it("renders Gepflegt with its dedicated teal sidebar PDF layout", () => {
    const gepflegtApplication = applicationSchema.parse({
      ...application,
      templateId: "gepflegt",
      accentColor: "#00B8B5",
      secondaryColor: "#087875",
      designSettings: {
        ...application.designSettings,
        columnLayout: "left-sidebar",
        resumeOutputMode: "visual",
        backgroundId: "white",
      },
    });
    const gepflegtProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
      linkedin: "https://www.linkedin.com/in/mina-kaya/",
      skills: [
        "Kundenorientierung: Anforderungen in belastbare Lösungen übersetzt",
        "Mentorship: Neue Teammitglieder strukturiert eingearbeitet",
      ],
      experiences: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2012 + index * 4}`,
        to: `${2016 + index * 4}`,
        role: `Projektrolle ${index + 1}`,
        company: `Unternehmen ${index + 1}`,
        city: "Berlin",
        achievements: Array.from(
          { length: 3 },
          (_, achievementIndex) =>
            `Messbares Projektergebnis ${achievementIndex + 1} erfolgreich erreicht.`,
        ),
      })),
      education: Array.from({ length: 3 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2006 + index * 2}`,
        to: `${2008 + index * 2}`,
        degree: `Abschluss ${index + 1}`,
        institution: `Hochschule ${index + 1}`,
        city: "Berlin",
      })),
    });
    const html = buildDocumentHtml(
      gepflegtApplication,
      gepflegtProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body.match(/data-resume-page="/g)).toHaveLength(1);
    expect(body).toContain('data-template="gepflegt"');
    expect(body).toContain("gepflegt-pdf-sidebar");
    expect(body).toContain("gepflegt-pdf-photo");
    expect(body).toContain("gepflegt-pdf-contacts");
    expect(body).toContain("gepflegt-pdf-strengths");
    expect(body).toContain("https://www.linkedin.com/in/mina-kaya/");
    expect(body.indexOf(">Zusammenfassung<")).toBeLessThan(
      body.indexOf(">Stärken<"),
    );
    expect(body.indexOf(">Erfahrung<")).toBeLessThan(
      body.indexOf(">Ausbildung<"),
    );
  });

  it("renders Gepflegt ATS without a sidebar, photo, or icons", () => {
    const gepflegtApplication = applicationSchema.parse({
      ...application,
      templateId: "gepflegt",
      designSettings: {
        ...application.designSettings,
        columnLayout: "compact-ats",
        resumeOutputMode: "ats",
      },
    });
    const mediaProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,iVBORw0KGgo=",
    });
    const html = buildDocumentHtml(
      gepflegtApplication,
      mediaProfile,
      "lebenslauf",
    );
    const body = html.slice(html.indexOf("<body>"));

    expect(body).toContain("gepflegt-pdf-ats");
    expect(body).not.toContain("gepflegt-pdf-sidebar");
    expect(body).not.toContain("gepflegt-pdf-photo");
    expect(body).not.toContain("<svg");
  });
});
