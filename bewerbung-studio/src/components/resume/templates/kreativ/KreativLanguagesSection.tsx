import type { ApplicantProfile } from "../../../../shared/schema";
import {
  parseKreativLanguage,
  uniqueKreativValues,
} from "./kreativ.model";
import { KreativSectionHeading } from "./KreativSectionHeading";

export function KreativLanguagesSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const languages = uniqueKreativValues(profile?.languages ?? []).map(
    parseKreativLanguage,
  );
  if (!languages.length) return null;

  return (
    <section
      className={`kreativ-section kreativ-languages ${atsMode ? "kreativ-languages--ats" : ""}`}
      data-element-id="kreativ.languages"
    >
      <KreativSectionHeading title="Sprachen" />
      <div className="kreativ-languages__list">
        {languages.map((language) => (
          <article className="kreativ-language" key={language.raw}>
            {atsMode ? (
              <p>{language.raw}</p>
            ) : (
              <>
                <h3>{language.name}</h3>
                <div>
                  <span>{language.level}</span>
                  <span
                    className="kreativ-language__dots"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        className={
                          index < language.score ? "is-filled" : ""
                        }
                        key={index}
                      />
                    ))}
                  </span>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
