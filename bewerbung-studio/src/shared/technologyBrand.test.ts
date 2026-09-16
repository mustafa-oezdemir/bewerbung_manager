import { describe, expect, it } from "vitest";
import { getTechnologyBrandIconMarkup } from "./technologyBrand";

describe("technology brand icons", () => {
  it("renders branded marks for Go, JavaScript, and PHP", () => {
    const go = getTechnologyBrandIconMarkup("Golang");
    const javascript = getTechnologyBrandIconMarkup("JavaScript");
    const php = getTechnologyBrandIconMarkup("PHP");

    expect(go).toContain('data-brand="go"');
    expect(go).toContain("#00add8");
    expect(javascript).toContain('data-brand="javascript"');
    expect(javascript).toContain("#ffd92f");
    expect(php).toContain('data-brand="php"');
    expect(php).toContain("<ellipse");
    expect(new Set([go, javascript, php]).size).toBe(3);
  });

  it("uses dedicated icons for requested web technologies and frameworks", () => {
    const expectedBrands = {
      HTML: "html",
      CSS: "css",
      React: "react",
      TypeScript: "typescript",
      Java: "java",
      Framework: "framework",
    };

    for (const [technology, brand] of Object.entries(expectedBrands)) {
      expect(getTechnologyBrandIconMarkup(technology)).toContain(
        `data-brand="${brand}"`,
      );
    }
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
