import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueKreativValues } from "./kreativ.model";
import { KreativLanguagesSection } from "./KreativLanguagesSection";
import { KreativSectionHeading } from "./KreativSectionHeading";
import { KreativSkillsSection } from "./KreativSkillsSection";
import { KreativStrengthsSection } from "./KreativStrengthsSection";

export function KreativAdditionalSections({
  profile,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
}) {
  const certifications = uniqueKreativValues(
    profile?.certifications ?? [],
  );

  return (
    <>
      {sections.skills ? (
        <KreativSkillsSection profile={profile} atsMode />
      ) : null}
      {sections.languages ? (
        <KreativLanguagesSection profile={profile} atsMode />
      ) : null}
      {sections.skills ? (
        <KreativStrengthsSection profile={profile} atsMode />
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
    </>
  );
}
