import type { ApplicantProfile } from "../../../../shared/schema";
import {
  parseIvyLeagueLanguage,
  uniqueIvyLeagueValues,
} from "./ivy-league.model";
import { IvyLeagueSectionHeading } from "./IvyLeagueSectionHeading";

export function IvyLeagueLanguagesSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const languages = uniqueIvyLeagueValues(profile?.languages ?? []).map(
    parseIvyLeagueLanguage,
  );
  if (!languages.length) return null;

  return (
    <section
      className="ivy-league-section ivy-league-languages-section"
      data-element-id="ivy-league.languages"
    >
      <IvyLeagueSectionHeading>Sprachen</IvyLeagueSectionHeading>
      {atsMode ? (
        <ul className="ivy-league-languages--ats">
          {languages.map((language) => (
            <li key={language.raw}>
              {language.name}
              {language.level ? ` – ${language.level}` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <div className="ivy-league-languages">
          {languages.map((language) => (
            <article className="ivy-league-language" key={language.raw}>
              <strong>{language.name}</strong>
              <span>{language.level}</span>
              <span className="ivy-league-language__dots" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    className={
                      index < language.score
                        ? "ivy-league-language__dot--active"
                        : ""
                    }
                    key={index}
                  />
                ))}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
