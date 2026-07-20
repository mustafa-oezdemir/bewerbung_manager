import type { ApplicantProfile } from "../../../../shared/schema";
import { TabellarischKnowledge } from "./TabellarischKnowledge";

export function TabellarischAdditionalSections({
  profile,
  sections,
  atsMode,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
  atsMode: boolean;
}) {
  const languages = Array.from(
    new Set((profile?.languages ?? []).map((item) => item.trim()).filter(Boolean)),
  );
  const certifications = Array.from(
    new Set(
      (profile?.certifications ?? [])
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );

  return (
    <>
      {sections.skills ? (
        <TabellarischKnowledge profile={profile} atsMode={atsMode} />
      ) : null}

      {sections.certifications && certifications.length > 0 ? (
        <section
          className="tabellarisch-section tabellarisch-list-section"
          data-element-id="tabellarisch.certifications"
        >
          <h2 className="tabellarisch-section__title">
            Zertifikate und Weiterbildungen
          </h2>
          <ul>
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {sections.languages && languages.length > 0 ? (
        <section
          className="tabellarisch-section tabellarisch-list-section"
          data-element-id="tabellarisch.languages"
        >
          <h2 className="tabellarisch-section__title">Sprachen</h2>
          <ul className="tabellarisch-list-section__inline">
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
