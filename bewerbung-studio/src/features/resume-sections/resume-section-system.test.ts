import { describe, expect, it } from "vitest";
import {
  getDefaultKnowledgeGroups,
  resolveResumeSectionInstances,
  resumeSectionDefinitions,
  validateRequiredResumeSections,
} from "./resume-section-system";

describe("resume section system", () => {
  it("provides all nine semantic sections", () => {
    expect(resumeSectionDefinitions).toHaveLength(9);
  });

  it("keeps required sections visible", () => {
    const resolved = resolveResumeSectionInstances([
      { semanticType: "career", customTitle: "Praxis", visible: false, enabled: false, order: 4 },
    ]);
    expect(resolved.find((item) => item.semanticType === "career")).toMatchObject({
      visible: true,
      enabled: true,
      customTitle: "Praxis",
    });
    expect(validateRequiredResumeSections(resolved)).toEqual([]);
  });

  it("maps Pehlione knowledge groups", () => {
    expect(getDefaultKnowledgeGroups("pehlione_white_blue").map((item) => item.title)).toEqual([
      "Kernkompetenzen",
      "Technische Schwerpunkte",
    ]);
  });
});
