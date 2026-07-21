import {
  parseZweispaltigLanguage,
  uniqueZweispaltigValues,
} from "./zweispaltig.model";
import type { ZweispaltigSidebarProps } from "./zweispaltig.types";
import { ZweispaltigKnowledge } from "./ZweispaltigKnowledge";
import { ZweispaltigStrengths } from "./ZweispaltigStrengths";

export function ZweispaltigSidebar({
  profile,
  sections,
}: ZweispaltigSidebarProps) {
  const languages = uniqueZweispaltigValues(
    profile?.languages ?? [],
  ).map(parseZweispaltigLanguage);
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
          <div className="zweispaltig-languages__list">
            {languages.map((language) => (
              <article className="zweispaltig-language" key={language.raw}>
                <div>
                  <h3>{language.name}</h3>
                  {language.level ? <p>{language.level}</p> : null}
                </div>
                <span
                  className="zweispaltig-language__dots"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <i
                      className={index < language.score ? "is-filled" : ""}
                      key={index}
                    />
                  ))}
                </span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      {sections.certifications && certifications.length ? (
        <section
          className="zweispaltig-section"
          data-element-id="zweispaltig.certifications"
        >
          <h2 className="zweispaltig-section__title">Weiterbildungen</h2>
          <ul className="zweispaltig-sidebar__list zweispaltig-sidebar__list--accent">
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
