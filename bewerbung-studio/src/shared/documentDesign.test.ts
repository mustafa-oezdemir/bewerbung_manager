import { describe, expect, it } from "vitest";
import {
  documentBackgrounds,
  programmingLanguageBackgroundTokens,
} from "./documentDesign";

describe("Dokumenthintergründe", () => {
  it("registers the programming-languages background as a printable technical option", () => {
    const background = documentBackgrounds.find(
      (item) => item.id === "programming-languages-bg",
    );

    expect(background).toMatchObject({
      name: "Programmiersprachen",
      category: "technical",
      previewType: "css",
      previewValue: "corner-cluster",
      supportsPrint: true,
      atsFriendly: false,
    });
    expect(programmingLanguageBackgroundTokens).toContain("Java");
    expect(programmingLanguageBackgroundTokens).toContain("C++");
    expect(programmingLanguageBackgroundTokens).toContain("Go");
    expect(programmingLanguageBackgroundTokens).toContain("PHP");
    expect(programmingLanguageBackgroundTokens).toHaveLength(14);
  });
});
