import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { profileSchema } from "../../shared/schema";
import { getDefaultKnowledgeGroups } from "../../features/resume-sections/resume-section-system";
import { ResumeSectionsPanel } from "./ResumeSectionsPanel";

describe("ResumeSectionsPanel flexible blocks", () => {
  it("renders editable Pehlione blocks, placement, renderer and item controls", () => {
    const profile = profileSchema.parse({
      id: crypto.randomUUID(),
      isDefault: true,
      firstName: "Mina",
      lastName: "Kaya",
      resumeKnowledgeGroups: getDefaultKnowledgeGroups("pehlione_white_blue"),
      updatedAt: new Date().toISOString(),
    });

    const html = renderToStaticMarkup(
      <ResumeSectionsPanel
        profile={profile}
        templateId="pehlione_white_blue"
        singlePageExceeded={false}
        onSave={vi.fn()}
        onPreview={vi.fn()}
      />,
    );

    expect(html).toContain('<details class="resume-semantic-system"><summary>');
    expect(html).not.toContain('<details class="resume-semantic-system" open');
    const sectionTable = html.split('<table class="resume-semantic-table">')[1].split('</table>')[0];
    expect(sectionTable.match(/role="switch"/g)).toHaveLength(9);
    expect(sectionTable).not.toContain("disabled");
    expect(html).toContain("Besondere Kenntnisse · Bausteine");
    expect(html).toContain("Kernkompetenzen");
    expect(html).toContain("Technische Schwerpunkte");
    expect(html).toContain("Position");
    expect(html).toContain("Darstellung");
    expect(html).toContain("Bereiche hinzufügen");
    expect(html).toContain("Eigenen Bereich hinzufügen");
    expect(html).toContain("Punkt hinzufügen");
  });
});
