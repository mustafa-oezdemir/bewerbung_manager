import { describe, expect, it } from "vitest";
import { getTechnologyBrandIconMarkup } from "./technologyBrand";

describe("technology brand icons", () => {
  it("renders distinct marks for Go, PHP, and C#", () => {
    const go = getTechnologyBrandIconMarkup("Go");
    const php = getTechnologyBrandIconMarkup("PHP");
    const csharp = getTechnologyBrandIconMarkup("C#");

    expect(go).toContain(">GO<");
    expect(php).toContain(">php<");
    expect(php).toContain("<ellipse");
    expect(csharp).toContain(">C#<");
    expect(csharp).toContain("<path");
    expect(new Set([go, php, csharp]).size).toBe(3);
  });

  it("provides stable SVG marks for common programming languages", () => {
    const languages = [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "PHP",
      "C#",
      "C++",
      "Go",
      "Rust",
      "Kotlin",
      "Swift",
      "Ruby",
      "SQL",
      "Bash",
      "PowerShell",
    ];

    for (const language of languages) {
      const first = getTechnologyBrandIconMarkup(language);
      expect(first).toContain('class="technology-brand-svg"');
      expect(getTechnologyBrandIconMarkup(language)).toBe(first);
    }
  });
});
