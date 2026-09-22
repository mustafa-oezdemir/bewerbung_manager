import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { profileSchema } from "../../../../shared/schema";
import { resolveResumeSectionInstances } from "../../../../features/resume-sections/resume-section-system";
import type { ResumePagePlan } from "../../../../shared/documentPagination";
import { PehlioneResume } from "./PehlioneResume";

const experienceId = "81000000-0000-4000-8000-000000000001";
const educationId = "82000000-0000-4000-8000-000000000001";
const profile = profileSchema.parse({
  id: "83000000-0000-4000-8000-000000000001",
  isDefault: true,
  firstName: "Mina",
  lastName: "Kaya",
  title: "Software Developer",
  city: "Marburg",
  country: "Deutschland",
  phone: "+49 176 123456",
  email: "mina@example.com",
  linkedin: "linkedin.com/in/mina",
  summary: "Strukturiert arbeitende Entwicklerin mit technischem Verständnis.",
  strengths: [{ id: "84000000-0000-4000-8000-000000000001", title: "API-Integration", description: "Robuste Schnittstellen", iconId: "" }],
  skills: ["TypeScript", "Golang", "Grafana"],
  experiences: [{
    id: experienceId,
    from: "11/2024",
    to: "06/2025",
    role: "Praktikum Softwareentwicklung",
    company: "Universitätsstadt Marburg",
    city: "Marburg",
    projects: ["Grafana Datasource Plugin für PRTG"],
    technologies: ["Go", "Grafana", "PRTG"],
    achievements: ["Monitoring-Daten über eine sichere API integriert."],
  }],
  education: [{
    id: educationId,
    from: "2022",
    to: "2025",
    degree: "Fachinformatiker für Anwendungsentwicklung",
    institution: "IHK Kassel-Marburg",
    city: "Marburg",
  }],
  certifications: ["IBM Full Stack JavaScript"],
  updatedAt: "2026-09-21T12:00:00.000Z",
});

const plan: ResumePagePlan = {
  pageNumber: 1,
  density: "standard",
  items: [
    { kind: "experience", id: experienceId, weight: 5 },
    { kind: "education", id: educationId, weight: 3 },
  ],
};

describe("Pehlione White Blue", () => {
  it("groups the signature above the printed name beside place and date", () => {
    const signedProfile = profileSchema.parse({
      ...profile,
      applicationPlace: "Marburg",
      applicationDate: "22.09.2026",
      signaturePath: "data:image/png;base64,AA==",
    });
    const html = renderToStaticMarkup(
      <PehlioneResume
        profile={signedProfile}
        name="Mina Kaya"
        atsMode={false}
        plan={plan}
        totalPages={1}
        accentColor="#0B3D86"
        secondaryColor="#1F66B3"
        resumeProfile=""
        sections={signedProfile.resumeSections}
      />,
    );

    expect(html).toContain("<p>Marburg, 22.09.2026</p>");
    expect(html).toContain('<div class="pehlione-closing__signer"><img');
    expect(html).toContain('alt="Unterschrift"/><strong>Mina Kaya</strong></div>');
  });

  it("shows an enabled photo over the hero circle only on the first visual page", () => {
    const photoProfile = profileSchema.parse({
      ...profile,
      photoPath: "data:image/png;base64,AA==",
      resumeSemanticSections: resolveResumeSectionInstances([]).map((section) =>
        section.semanticType === "photo"
          ? { ...section, visible: true, enabled: true }
          : section,
      ),
    });
    const render = (atsMode: boolean, pageNumber: 1 | 2) => renderToStaticMarkup(
      <PehlioneResume
        profile={photoProfile}
        name="Mina Kaya"
        atsMode={atsMode}
        plan={{ ...plan, pageNumber }}
        totalPages={2}
        accentColor="#0B3D86"
        secondaryColor="#1F66B3"
        resumeProfile=""
        sections={photoProfile.resumeSections}
      />,
    );

    expect(render(false, 1)).toContain('class="pehlione-hero__photo"');
    expect(render(false, 1)).toContain('src="data:image/png;base64,AA=="');
    expect(render(true, 1)).not.toContain("pehlione-hero__photo");
    expect(render(false, 2)).not.toContain("pehlione-hero__photo");
  });

  it("keeps the original circle when the photo section is hidden", () => {
    const html = renderToStaticMarkup(
      <PehlioneResume
        profile={{ ...profile, photoPath: "data:image/png;base64,AA==" }}
        name="Mina Kaya"
        atsMode={false}
        plan={plan}
        totalPages={1}
        accentColor="#0B3D86"
        secondaryColor="#1F66B3"
        resumeProfile=""
        sections={profile.resumeSections}
      />,
    );
    expect(html).not.toContain("pehlione-hero__photo");
    expect(html).toContain("◉");
  });

  it("renders the technical sidebar and structured main content", () => {
    const html = renderToStaticMarkup(
      <PehlioneResume
        profile={profile}
        name="Mina Kaya"
        atsMode={false}
        plan={plan}
        totalPages={1}
        accentColor="#0B3D86"
        secondaryColor="#1F66B3"
        resumeProfile=""
        sections={profile.resumeSections}
      />,
    );

    expect(html).toContain("pehlione-sidebar");
    expect(html).toContain("Technische Schwerpunkte");
    expect(html).toContain("Projekt-Highlight");
    expect(html).toContain("Grafana Datasource Plugin für PRTG");
  });

  it("keeps the reading order text-first in ATS mode", () => {
    const html = renderToStaticMarkup(
      <PehlioneResume
        profile={profile}
        name="Mina Kaya"
        atsMode
        plan={plan}
        totalPages={1}
        accentColor="#0B3D86"
        secondaryColor="#1F66B3"
        resumeProfile=""
        sections={profile.resumeSections}
      />,
    );

    expect(html).not.toContain("pehlione-sidebar");
    expect(html).toContain("Kontakt:");
    expect(html).toContain("Praktikum Softwareentwicklung");
  });
});
