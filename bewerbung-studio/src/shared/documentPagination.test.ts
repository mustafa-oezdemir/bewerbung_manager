import { describe, expect, it } from "vitest";
import { profileSchema } from "./schema";
import {
  createResumePagePlan,
  getLetterPageStatus,
} from "./documentPagination";

const now = new Date("2026-07-19T10:00:00.000Z").toISOString();

describe("A4 document pagination", () => {
  it("keeps compact resumes on one page", () => {
    const profile = profileSchema.parse({
      id: crypto.randomUUID(),
      isDefault: true,
      firstName: "Mina",
      lastName: "Kaya",
      experiences: [
        {
          id: crypto.randomUUID(),
          from: "2022",
          to: "Heute",
          role: "Entwicklerin",
          company: "Beispiel GmbH",
          achievements: ["Ladezeit um 30 % reduziert."],
        },
      ],
      education: [],
      updatedAt: now,
    });

    expect(createResumePagePlan(profile)).toHaveLength(1);
  });

  it("moves whole resume entries to a second page and never creates a third", () => {
    const profile = profileSchema.parse({
      id: crypto.randomUUID(),
      isDefault: true,
      firstName: "Mina",
      lastName: "Kaya",
      experiences: Array.from({ length: 9 }, (_, index) => ({
        id: crypto.randomUUID(),
        from: `${2010 + index}`,
        to: `${2011 + index}`,
        role: `Position ${index + 1}`,
        company: `Unternehmen ${index + 1}`,
        achievements: Array.from(
          { length: 5 },
          (_, itemIndex) =>
            `Ergebnis ${itemIndex + 1} mit einer messbaren Verbesserung der Arbeitsabläufe.`,
        ),
      })),
      education: [],
      updatedAt: now,
    });

    const plan = createResumePagePlan(profile);
    const allIds = plan.flatMap((page) =>
      page.items.map((item) => item.id),
    );

    expect(plan).toHaveLength(2);
    expect(new Set(allIds).size).toBe(profile.experiences.length);
    expect(allIds).toHaveLength(profile.experiences.length);
  });

  it("marks long cover letters for dense one-page rendering", () => {
    const status = getLetterPageStatus({
      coverSubject: "Bewerbung",
      coverIntroduction: "A".repeat(900),
      coverMotivation: "B".repeat(900),
      coverQualification: "C".repeat(900),
      coverCompanyFit: "D".repeat(900),
      coverClosing: "E".repeat(900),
      resumeProfile: "",
      deckblattStatement: "",
    });

    expect(status.density).toBe("dense");
    expect(status.isOverRecommendedLength).toBe(true);
  });
});
