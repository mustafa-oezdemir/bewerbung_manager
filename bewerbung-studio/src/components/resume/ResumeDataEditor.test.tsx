import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { profileSchema } from "../../shared/schema";
import {
  normalizeResumeDataDraft,
  ResumeDataEditor,
} from "./ResumeDataEditor";

const profile = profileSchema.parse({
  id: "50000000-0000-4000-8000-000000000001",
  isDefault: true,
  firstName: "Mina",
  lastName: "Kaya",
  title: "Softwareentwicklerin",
  email: "mina@example.com",
  linkedin: "linkedin.com/in/minakaya",
  github: "github.com/minakaya",
  portfolio: "mina.example.com",
  summary: "Kurzprofil",
  experiences: [
    {
      id: "30000000-0000-4000-8000-000000000001",
      from: "01/2024",
      to: "heute",
      role: "Entwicklerin",
      company: "Beispiel GmbH",
      city: "Berlin",
      achievements: ["  Plattform modernisiert.  ", ""],
    },
  ],
  education: [
    {
      id: "40000000-0000-4000-8000-000000000001",
      from: "10/2018",
      to: "09/2022",
      degree: "B.Sc. Informatik",
      institution: "Beispiel Universität",
      city: "Berlin",
    },
  ],
  languages: [" Deutsch – fließend ", ""],
  certifications: [" Scrum Master ", ""],
  updatedAt: "2026-07-20T10:00:00.000Z",
});

describe("ResumeDataEditor", () => {
  it("renders direct CRUD controls for all resume data groups", () => {
    const markup = renderToStaticMarkup(
      <ResumeDataEditor
        profile={profile}
        onPreview={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(markup).toContain("Lebenslaufdaten bearbeiten");
    expect(markup).toContain("Station hinzufügen");
    expect(markup).toContain("Ausbildung hinzufügen");
    expect(markup).toContain("Berufserfahrung löschen");
    expect(markup).toContain("Profildaten speichern");
    expect(markup).toContain('value="Mina"');
  });

  it("normalizes lists and profile links before persisting", () => {
    const normalized = normalizeResumeDataDraft(profile);

    expect(normalized.linkedin).toBe("https://linkedin.com/in/minakaya");
    expect(normalized.github).toBe("https://github.com/minakaya");
    expect(normalized.portfolio).toBe("https://mina.example.com");
    expect(normalized.experiences[0].achievements).toEqual([
      "Plattform modernisiert.",
    ]);
    expect(normalized.languages).toEqual(["Deutsch – fließend"]);
    expect(normalized.certifications).toEqual(["Scrum Master"]);
  });
});
