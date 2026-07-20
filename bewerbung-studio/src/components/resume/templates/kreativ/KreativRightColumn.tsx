import { uniqueKreativValues } from "./kreativ.model";
import type { KreativColumnProps } from "./kreativ.types";
import { KreativLanguagesSection } from "./KreativLanguagesSection";
import { KreativSectionHeading } from "./KreativSectionHeading";
import { KreativSkillsSection } from "./KreativSkillsSection";
import { KreativStrengthsSection } from "./KreativStrengthsSection";

export function KreativRightColumn({
  profile,
  sections,
  summary = "",
}: KreativColumnProps) {
  const certifications = uniqueKreativValues(
    profile?.certifications ?? [],
  );

  return (
    <aside className="kreativ-right-column">
      {sections.profile && summary ? (
        <section
          className="kreativ-section"
          data-element-id="kreativ.summary"
        >
          <KreativSectionHeading title="Zusammenfassung" />
          <p className="kreativ-summary">{summary}</p>
        </section>
      ) : null}
      {sections.skills ? (
        <KreativStrengthsSection profile={profile} />
      ) : null}
      {sections.languages ? (
        <KreativLanguagesSection profile={profile} />
      ) : null}
      {sections.skills ? (
        <KreativSkillsSection profile={profile} />
      ) : null}
      {sections.certifications && certifications.length ? (
        <section
          className="kreativ-section kreativ-certifications"
          data-element-id="kreativ.certifications"
        >
          <KreativSectionHeading title="Zertifikate" />
          <ul>
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
