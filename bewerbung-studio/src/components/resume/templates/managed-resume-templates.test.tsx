import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  einspaltigLebenslaufTemplateConfig,
  klassischLebenslaufTemplateConfig,
  stilvollLebenslaufTemplateConfig,
} from "../../../features/templates/template.constants";
import type { ResumePagePlan } from "../../../shared/documentPagination";
import { profileSchema } from "../../../shared/schema";
import { getTemplate } from "../../../shared/templates";
import { EinspaltigResume } from "./einspaltig/EinfachResume";
import { einspaltigDefaults } from "./einspaltig/einfach.defaults";
import { KlassischResume } from "./klassisch/KlassischResume";
import { klassischDefaults } from "./klassisch/klassisch.defaults";
import { MehrspaltigResume } from "./mehrspaltig/MehrspaltigResume";
import { KompaktResume } from "./kompakt/KompaktResume";
import { kompaktDefaults } from "./kompakt/kompakt.defaults";
import { StilvollResume } from "./stilvoll/StilvollResume";
import { stilvollDefaults } from "./stilvoll/stilvoll.defaults";

const firstExperienceId = "71000000-0000-4000-8000-000000000001";
const secondExperienceId = "71000000-0000-4000-8000-000000000002";
const educationId = "72000000-0000-4000-8000-000000000001";

const profile = profileSchema.parse({
  id: "73000000-0000-4000-8000-000000000001",
  isDefault: true,
  firstName: "Lena",
  lastName: "Hoffmann",
  title: "IT-Projektmanagerin",
  city: "München",
  country: "Deutschland",
  phone: "+49 30 12345678",
  email: "lena@example.de",
  linkedin: "linkedin.com/in/lena",
  portfolio: "lena.example.com",
  birthDate: "01.03.1990",
  birthPlace: "München",
  summary: "Erfahrene Projektmanagerin für digitale Produkte.",
  skills: [
    "Teamführung – Führung interdisziplinärer Teams",
    "Prozessqualität – Abläufe messbar verbessert",
    "Projektmanagement",
    "Jira",
  ],
  experiences: [
    {
      id: firstExperienceId,
      from: "2019",
      to: "2023",
      role: "Senior IT-Projektmanagerin",
      company: "Beispiel AG",
      city: "Berlin",
      achievements: ["Projektdauer um 15 % reduziert."],
    },
    {
      id: secondExperienceId,
      from: "2016",
      to: "2019",
      role: "IT-Projektmanagerin",
      company: "Zukunft GmbH",
      city: "Hamburg",
      achievements: ["Einführung erfolgreich koordiniert."],
    },
  ],
  education: [
    {
      id: educationId,
      from: "2011",
      to: "2015",
      degree: "M.Sc. Wirtschaftsinformatik",
      institution: "Technische Universität München",
      city: "München",
    },
  ],
  languages: ["Deutsch – Muttersprache", "Englisch – B2"],
  certifications: ["Professional Scrum Master I"],
  updatedAt: "2026-07-20T10:00:00.000Z",
});

const firstPagePlan: ResumePagePlan = {
  pageNumber: 1,
  density: "standard",
  items: [{ kind: "experience", id: firstExperienceId, weight: 6 }],
};
const secondPagePlan: ResumePagePlan = {
  pageNumber: 2,
  density: "compact",
  items: [
    { kind: "experience", id: secondExperienceId, weight: 6 },
    { kind: "education", id: educationId, weight: 3 },
  ],
};
const singlePagePlan: ResumePagePlan = {
  pageNumber: 1,
  density: "standard",
  items: [
    { kind: "experience", id: firstExperienceId, weight: 6 },
    { kind: "experience", id: secondExperienceId, weight: 6 },
    { kind: "education", id: educationId, weight: 3 },
  ],
};

const commonProps = {
  profile,
  name: "Lena Hoffmann",
  totalPages: 1,
  accentColor: "",
  secondaryColor: "",
  resumeProfile: "Stellenspezifisches Kurzprofil",
  sections: profile.resumeSections,
};

describe("Stilvoll rendering", () => {
  const renderResume = ({
    atsMode = false,
    plan = singlePagePlan,
    totalPages = 1,
    backgroundId = "geometric" as const,
    photoSource = "data:image/png;base64,AA==" as string | null,
    resumeProfile = commonProps.resumeProfile,
  } = {}) =>
    renderToStaticMarkup(
      <StilvollResume
        {...commonProps}
        atsMode={atsMode}
        plan={plan}
        totalPages={totalPages}
        backgroundId={backgroundId}
        photoSource={photoSource}
        resumeProfile={resumeProfile}
      />,
    );

  it("renders photo, geometric pattern, and the asymmetric visual grid", () => {
    const markup = renderResume();
    expect(markup).toContain('data-renderer="visual"');
    expect(markup).toContain("stilvoll-background");
    expect(markup).toContain("stilvoll-left");
    expect(markup).toContain("stilvoll-main");
    expect(markup).toContain('href="https://linkedin.com/in/lena"');
    expect(markup).toContain("https://lena.example.com");
    expect(markup).not.toContain("Seite 1 / 1");
    expect(markup).toContain("<img");
  });

  it("uses a linear, decoration-free ATS order and escapes user input", () => {
    const markup = renderResume({
      atsMode: true,
      resumeProfile: '<img src=x onerror="alert(1)">',
    });
    const order = [
      "Zusammenfassung",
      "Erfahrung",
      "Ausbildung",
      "Kenntnisse",
      "Sprachen",
      "Stärken",
      "Zertifikate",
    ].map((title) => markup.indexOf(title));

    expect(markup).toContain('data-renderer="ats"');
    expect(markup).not.toContain("stilvoll-background");
    expect(markup).not.toContain("<img");
    expect(markup).toContain("&lt;img");
    expect(
      order.every(
        (index, position) =>
          index >= 0 && (position === 0 || index > order[position - 1]),
      ),
    ).toBe(true);
  });

  it("uses a compact continuation without the sidebar or photo", () => {
    const markup = renderResume({
      plan: secondPagePlan,
      totalPages: 2,
    });
    expect(markup).toContain('data-continuation="true"');
    expect(markup).toContain("stilvoll-header--compact");
    expect(markup).toContain("Zukunft GmbH");
    expect(markup).not.toContain("stilvoll-left");
    expect(markup).not.toContain("<img");
  });
});

describe("Kompakt rendering", () => {
  const renderResume = ({
    atsMode = false,
    plan = singlePagePlan,
    totalPages = 1,
    backgroundId = "abstract" as const,
    resumeProfile = commonProps.resumeProfile,
  } = {}) =>
    renderToStaticMarkup(
      <KompaktResume
        {...commonProps}
        atsMode={atsMode}
        plan={plan}
        totalPages={totalPages}
        backgroundId={backgroundId}
        resumeProfile={resumeProfile}
      />,
    );

  it("renders a dense photo-free grid with original flow-line decoration", () => {
    const markup = renderResume();
    expect(markup).toContain('data-renderer="visual"');
    expect(markup).toContain("kompakt-background");
    expect(markup).toContain("kompakt-left");
    expect(markup).toContain("kompakt-right");
    expect(markup).toContain("kompakt-skills");
    expect(markup).toContain('href="https://linkedin.com/in/lena"');
    expect(markup).toContain("https://lena.example.com");
    expect(markup).not.toContain("Seite 1 / 1");
    expect(markup).not.toContain("<img");
  });

  it("uses a linear ATS order without flow lines, tags, or rating dots", () => {
    const markup = renderResume({ atsMode: true });
    const order = [
      "Zusammenfassung",
      "Erfahrung",
      "Ausbildung",
      "Kenntnisse",
      "Sprachen",
      "Stärken",
      "Erfolge und Zertifikate",
    ].map((title) => markup.indexOf(title));

    expect(markup).toContain('data-renderer="ats"');
    expect(markup).not.toContain("kompakt-background");
    expect(markup).not.toContain("kompakt-skills");
    expect(markup).not.toContain("kompakt-language__dots");
    expect(
      order.every(
        (index, position) =>
          index >= 0 && (position === 0 || index > order[position - 1]),
      ),
    ).toBe(true);
  });

  it("keeps only planned career entries on a continuation page", () => {
    const markup = renderResume({
      plan: firstPagePlan,
      totalPages: 2,
    });
    expect(markup).toContain("Beispiel AG");
    expect(markup).not.toContain("Zukunft GmbH");
    expect(markup).not.toContain("Technische Universität München");
  });
});

describe("Einspaltig rendering", () => {
  const renderResume = ({
    atsMode = false,
    plan = singlePagePlan,
    totalPages = 1,
    backgroundId = "geometric" as const,
    photoSource = "data:image/png;base64,AA==" as string | null,
    resumeProfile = commonProps.resumeProfile,
  } = {}) =>
    renderToStaticMarkup(
      <EinspaltigResume
        {...commonProps}
        atsMode={atsMode}
        plan={plan}
        totalPages={totalPages}
        backgroundId={backgroundId}
        photoSource={photoSource}
        resumeProfile={resumeProfile}
      />,
    );

  it("renders the one-column layout with circular photo and geometry", () => {
    const markup = renderResume();
    expect(markup).toContain('data-template="einspaltig"');
    expect(markup).toContain('data-renderer="visual"');
    expect(markup).toContain("einfach-background");
    expect(markup).toContain("einfach-content");
    expect(markup).toContain("einfach-strengths");
    expect(markup).toContain("<img");
    expect(markup).not.toContain("Seite 1 / 1");
  });

  it("uses a linear ATS order without photo, geometry, or rating dots", () => {
    const markup = renderResume({ atsMode: true });
    const order = [
      "Zusammenfassung",
      "Erfahrung",
      "Ausbildung",
      "Kenntnisse",
      "Sprachen",
      "Stärken",
      "Zertifikate",
    ].map((title) => markup.indexOf(title));

    expect(markup).toContain('data-renderer="ats"');
    expect(markup).not.toContain("einfach-background");
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain('aria-hidden="true"><i');
    expect(
      order.every(
        (index, position) =>
          index >= 0 && (position === 0 || index > order[position - 1]),
      ),
    ).toBe(true);
  });

  it("removes identity extras from continuation pages", () => {
    const markup = renderResume({
      plan: secondPagePlan,
      totalPages: 2,
    });
    expect(markup).toContain('data-continuation="true"');
    expect(markup).toContain("einfach-header--compact");
    expect(markup).toContain("Zukunft GmbH");
    expect(markup).not.toContain("Stellenspezifisches Kurzprofil");
    expect(markup).not.toContain("<img");
  });
});

describe("Klassisch rendering", () => {
  const renderResume = ({
    atsMode = false,
    plan = singlePagePlan,
    totalPages = 1,
    backgroundId = "classic-soft-blue-waves" as const,
    photoSource = "data:image/png;base64,AA==" as string | null,
    resumeProfile = commonProps.resumeProfile,
  } = {}) =>
    renderToStaticMarkup(
      <KlassischResume
        {...commonProps}
        atsMode={atsMode}
        plan={plan}
        totalPages={totalPages}
        backgroundId={backgroundId}
        photoSource={photoSource}
        resumeProfile={resumeProfile}
      />,
    );

  it("renders waves, a round photo, and horizontal strengths", () => {
    const markup = renderResume();
    expect(markup).toContain('data-template="klassisch"');
    expect(markup).toContain('data-renderer="visual"');
    expect(markup).toContain("klassisch-background");
    expect(markup).toContain("klassisch-strengths");
    expect(markup).toContain("klassisch-career__heading");
    expect(markup).toContain("<img");
  });

  it("renders a linear ATS version without waves or photo", () => {
    const markup = renderResume({ atsMode: true });
    const order = [
      "Zusammenfassung",
      "Erfahrung",
      "Ausbildung",
      "Kenntnisse",
      "Sprachen",
      "Stärken",
      "Zertifikate",
    ].map((title) => markup.indexOf(title));

    expect(markup).toContain('data-renderer="ats"');
    expect(markup).not.toContain("klassisch-background");
    expect(markup).not.toContain("<img");
    expect(
      order.every(
        (index, position) =>
          index >= 0 && (position === 0 || index > order[position - 1]),
      ),
    ).toBe(true);
  });

  it("uses a compact continuation header without profile extras", () => {
    const markup = renderResume({
      plan: secondPagePlan,
      totalPages: 2,
    });
    expect(markup).toContain('data-continuation="true"');
    expect(markup).toContain("klassisch-header--compact");
    expect(markup).toContain("Zukunft GmbH");
    expect(markup).not.toContain("klassisch-background");
    expect(markup).not.toContain("<img");
  });
});

describe("Mehrspaltig rendering", () => {
  it("keeps the three-column executive layout separate from Klassisch", () => {
    const markup = renderToStaticMarkup(
      <MehrspaltigResume
        {...commonProps}
        atsMode={false}
        plan={singlePagePlan}
        totalPages={1}
        backgroundId="classic-soft-blue-waves"
        photoSource="data:image/png;base64,AA=="
        resumeProfile={commonProps.resumeProfile}
      />,
    );

    expect(markup).toContain('data-template="mehrspaltig"');
    expect(markup).toContain("mehrspaltig-columns");
    expect(markup).toContain("mehrspaltig-background");
    expect(markup).toContain("mehrspaltig-column--right");
  });

  it("applies the saved per-template section order", () => {
    const orderedProfile = profileSchema.parse({
      ...profile,
      resumeSectionLayouts: {
        mehrspaltig: [
          { type: "education", zone: "main" },
          { type: "experience", zone: "main" },
          { type: "summary", zone: "left-sidebar" },
          { type: "strengths", zone: "right-sidebar" },
        ],
      },
    });
    const markup = renderToStaticMarkup(
      <MehrspaltigResume
        {...commonProps}
        profile={orderedProfile}
        atsMode
        plan={singlePagePlan}
        totalPages={1}
        backgroundId="classic-soft-blue-waves"
        photoSource={null}
        resumeProfile={commonProps.resumeProfile}
      />,
    );

    expect(markup.indexOf("Ausbildung")).toBeLessThan(
      markup.indexOf("Erfahrung"),
    );
  });
});

describe("managed resume registration", () => {
  it("registers app metadata, exact grids, and Word asset names", () => {
    expect(getTemplate("stilvoll")).toMatchObject({
      name: "Stilvoll",
      category: "modern-professional",
      supportsAtsMode: true,
      supportsPhoto: true,
      supportsMultiplePages: true,
    });
    expect(getTemplate("kompakt")).toMatchObject({
      name: "Kompakt",
      category: "compact-professional",
      supportsAtsMode: true,
      supportsPhoto: false,
      supportsMultiplePages: true,
    });
    expect(getTemplate("einspaltig")).toMatchObject({
      id: "einspaltig",
      name: "Einspaltig",
      accent: "#0B3485",
      secondary: "#4AAAF4",
      category: "simple-professional",
      supportsAtsMode: true,
      supportsPhoto: true,
      supportsMultiplePages: true,
    });
    expect(getTemplate("klassisch")).toMatchObject({
      id: "klassisch",
      name: "Klassisch",
      accent: "#2B2F32",
      secondary: "#00AFC5",
      category: "classic-professional",
      supportsAtsMode: true,
      supportsPhoto: true,
      supportsMultiplePages: true,
    });
    expect(getTemplate("mehrspaltig")).toMatchObject({
      id: "mehrspaltig",
      name: "Mehrspaltig",
      category: "executive",
      supportsAtsMode: true,
      supportsPhoto: true,
      supportsMultiplePages: true,
    });
    expect(stilvollDefaults.layout).toMatchObject({
      leftColumnWidthMm: 54,
      columnGapMm: 11,
      rightColumnWidthMm: 115,
    });
    expect(kompaktDefaults.layout).toMatchObject({
      leftColumnWidthMm: 108,
      columnGapMm: 10,
      rightColumnWidthMm: 66,
    });
    expect(getTemplate("einfach")).toMatchObject({
      id: "einspaltig",
      name: "Einspaltig",
    });
    expect(einspaltigDefaults.page).toMatchObject({
      widthMm: 210,
      heightMm: 297,
      marginLeftMm: 15,
      marginRightMm: 15,
    });
    expect(einspaltigDefaults.colors).toMatchObject({
      primary: "#0B3485",
      accent: "#4AAAF4",
      text: "#3E484E",
      pattern: "#EAF5FD",
    });
    expect(stilvollLebenslaufTemplateConfig).toMatchObject({
      fileName: "Stilvoll_Lebenslauf_Muster.docx",
      atsFileName: "Stilvoll_Lebenslauf_ATS.docx",
      previewFileName: "Stilvoll_Lebenslauf_Muster.preview.png",
    });
    expect(einspaltigLebenslaufTemplateConfig).toMatchObject({
      id: "word-lebenslauf-einspaltig",
      name: "Einspaltig",
      category: "single-column",
      emphasis: "simple-ats-readable",
      fileName: "Einfach_Lebenslauf_Muster.docx",
      atsFileName: "Einfach_Lebenslauf_ATS.docx",
      previewFileName: "Einfach_Lebenslauf_Muster.preview.png",
    });
    expect(klassischDefaults.colors).toMatchObject({
      primary: "#2B2F32",
      accent: "#00AFC5",
      softBackground: "#CDEFF3",
    });
    expect(klassischLebenslaufTemplateConfig).toMatchObject({
      id: "word-lebenslauf-klassisch",
      name: "Klassisch",
      sortOrder: 8,
      category: "classic",
      layout: "single-column-classic",
      emphasis: "traditional-professional",
      fileName: "Klassisch_Lebenslauf_Muster.docx",
      atsFileName: "Klassisch_Lebenslauf_ATS.docx",
      previewFileName: "Klassisch_Lebenslauf_Muster.preview.png",
    });
  });
});
