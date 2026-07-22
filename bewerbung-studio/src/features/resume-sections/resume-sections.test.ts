import { describe, expect, it } from "vitest";
import {
  getTemplateSectionCapabilities,
  moveResumeSection,
  resolveResumeSectionLayout,
} from "./resume-sections";

describe("resume section capabilities", () => {
  it("keeps single-column templates in their natural flow", () => {
    const layout = resolveResumeSectionLayout("ivy-league", [
      { type: "languages", zone: "sidebar" },
      { type: "experience", zone: "main" },
    ]);

    expect(layout.find((item) => item.type === "languages")).toEqual({
      type: "languages",
      zone: "main",
    });
  });

  it("rejects unsupported two-column moves without dropping content", () => {
    const moved = moveResumeSection(
      "elegant",
      [{ type: "experience", zone: "main" }],
      "experience",
      "sidebar",
      0,
    );

    expect(moved.find((item) => item.type === "experience")).toEqual({
      type: "experience",
      zone: "main",
    });
  });

  it("defines three protected layout zones for Mehrspaltig", () => {
    expect(getTemplateSectionCapabilities("mehrspaltig").availableZones).toEqual([
      "main",
      "left-sidebar",
      "right-sidebar",
    ]);
  });
});
