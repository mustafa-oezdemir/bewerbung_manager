import type { ApplicantProfile } from "../../../../shared/schema";
import {
  parseZeitgenoessischLanguage,
  uniqueZeitgenoessischValues,
} from "./zeitgenoessisch.model";
import { ZeitgenoessischSectionHeading } from "./ZeitgenoessischSectionHeading";

export function ZeitgenoessischLanguagesSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const languages = uniqueZeitgenoessischValues(
    profile?.languages ?? [],
  ).map(parseZeitgenoessischLanguage);
  if (!languages.length) return null;

  return (
    <section
      className={`zeitgenoessisch-section zeitgenoessisch-languages ${atsMode ? "zeitgenoessisch-languages--ats" : ""}`}
      data-element-id="zeitgenoessisch.languages"
    >
      <ZeitgenoessischSectionHeading title="Sprachen" icon="languages" />
      <div className="zeitgenoessisch-languages__list">
        {languages.map((language) => (
          <article
            className="zeitgenoessisch-language"
            key={language.raw}
          >
            {atsMode ? (
              <p>{language.raw}</p>
            ) : (
              <div>
                <h3>{language.name}</h3>
                <span>{language.level}</span>
                <span
                  className="zeitgenoessisch-language__dots"
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
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
