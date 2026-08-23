import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueElegantValues } from "./elegant.model";
import { ElegantKnowledge } from "./ElegantKnowledge";
import { ElegantStrengths } from "./ElegantStrengths";
import { getResumeSectionTitle } from "../../../../features/resume-sections/resume-sections";

export function ElegantAdditionalSections({
  profile,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
}) {
  const languages = uniqueElegantValues(profile?.languages ?? []);
  const certifications = uniqueElegantValues(profile?.certifications ?? []);

  return (
    <>
      {sections.skills ? (
        <ElegantKnowledge profile={profile} variant="ats" />
      ) : null}

      {sections.languages && languages.length ? (
        <section
          className="elegant-section elegant-ats-list"
          data-element-id="elegant.languages"
        >
          <h2 className="elegant-section__title">{getResumeSectionTitle(profile, "languages")}</h2>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {sections.strengths ? (
        <ElegantStrengths profile={profile} variant="ats" />
      ) : null}

      {sections.certifications && certifications.length ? (
        <section
          className="elegant-section elegant-ats-list"
          data-element-id="elegant.certifications"
        >
          <h2 className="elegant-section__title">{getResumeSectionTitle(profile, "certifications")}</h2>
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
