import { describe, expect, it } from "vitest";
import { parseHTML } from "linkedom";
import { profileSchema } from "./schema";
import { applyManagedResumeOutput } from "./resumeManagedOutput";

const profile = profileSchema.parse({
  id: crypto.randomUUID(), isDefault: true, firstName: "Mina", lastName: "Kaya", updatedAt: new Date().toISOString(),
  strengths: Array.from({ length: 10 }, (_, index) => ({ id: crypto.randomUUID(), title: `Stärke ${index + 1}`, description: index === 0 ? "<script>Text</script>" : "" })),
});
const page = '<section class="cv-sheet"><main><section><h2>Stärken</h2><p>Old content</p></section></main></section>';

describe("shared strengths output", () => {
  it("keeps every record, escapes user text and renders the block only once across pages", () => {
    const { document } = parseHTML(applyManagedResumeOutput(page + page, profile, "klassisch"));
    expect(document.querySelectorAll(".managed-strengths-grid")).toHaveLength(1);
    expect(document.querySelectorAll(".managed-strength-card")).toHaveLength(10);
    expect(document.querySelector("script")).toBeNull();
    expect(document.querySelector(".managed-strength-card p")?.textContent).toBe("<script>Text</script>");
    expect(applyManagedResumeOutput(page, profile, "klassisch", 2, 2)).not.toContain("managed-strength-card");
  });

  it("honors section visibility", () => {
    const hidden = { ...profile, resumeSections: { ...profile.resumeSections, strengths: false } };
    expect(applyManagedResumeOutput(page, hidden, "klassisch")).not.toContain("Stärken");
  });
});
