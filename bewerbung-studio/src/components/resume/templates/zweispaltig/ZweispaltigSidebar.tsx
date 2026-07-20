import { uniqueZweispaltigValues } from "./zweispaltig.model";
import type { ZweispaltigSidebarProps } from "./zweispaltig.types";
import { ZweispaltigKnowledge } from "./ZweispaltigKnowledge";
import { ZweispaltigStrengths } from "./ZweispaltigStrengths";

export function ZweispaltigSidebar({
  profile,
  sections,
}: ZweispaltigSidebarProps) {
  const languages = uniqueZweispaltigValues(profile?.languages ?? []);
  const certifications = uniqueZweispaltigValues(
    profile?.certifications ?? [],
  );

  return (
    <aside className="zweispaltig-sidebar">
      {sections.skills ? (
        <ZweispaltigStrengths profile={profile} variant="sidebar" />
      ) : null}
      {sections.skills ? (
        <ZweispaltigKnowledge profile={profile} variant="sidebar" />
      ) : null}
      {sections.languages && languages.length ? (
        <section
          className="zweispaltig-section"
          data-element-id="zweispaltig.languages"
        >
          <h2 className="zweispaltig-section__title">Sprachen</h2>
          <ul className="zweispaltig-sidebar__list">
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {sections.certifications && certifications.length ? (
        <section
          className="zweispaltig-section"
          data-element-id="zweispaltig.certifications"
        >
          <h2 className="zweispaltig-section__title">
            Zertifikate und Weiterbildungen
          </h2>
          <ul className="zweispaltig-sidebar__list">
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
