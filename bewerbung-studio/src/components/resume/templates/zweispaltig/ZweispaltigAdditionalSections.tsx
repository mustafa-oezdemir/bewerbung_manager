import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueZweispaltigValues } from "./zweispaltig.model";
import { ZweispaltigKnowledge } from "./ZweispaltigKnowledge";
import { ZweispaltigStrengths } from "./ZweispaltigStrengths";

export function ZweispaltigAdditionalSections({
  profile,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
}) {
  const languages = uniqueZweispaltigValues(profile?.languages ?? []);
  const certifications = uniqueZweispaltigValues(
    profile?.certifications ?? [],
  );

  return (
    <>
      {sections.skills ? (
        <ZweispaltigKnowledge profile={profile} variant="ats" />
      ) : null}
      {sections.languages && languages.length ? (
        <section
          className="zweispaltig-section zweispaltig-ats-list"
          data-element-id="zweispaltig.languages"
        >
          <h2 className="zweispaltig-section__title">Sprachen</h2>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {sections.skills ? (
        <ZweispaltigStrengths profile={profile} variant="ats" />
      ) : null}
      {sections.certifications && certifications.length ? (
        <section
          className="zweispaltig-section zweispaltig-ats-list"
          data-element-id="zweispaltig.certifications"
        >
          <h2 className="zweispaltig-section__title">Weiterbildungen</h2>
          <ul>
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
