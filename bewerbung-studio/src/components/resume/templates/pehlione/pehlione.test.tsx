import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { profileSchema } from "../../../../shared/schema";
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
