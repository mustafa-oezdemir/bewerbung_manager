import type { ApplicantProfile } from "../../../../shared/schema";
import { parseTemplateStrengths } from "../resume-template-data";
import { ZeitgenoessischSectionHeading } from "./ZeitgenoessischSectionHeading";
import { getResumeSectionTitle } from "../../../../features/resume-sections/resume-sections";

export function ZeitgenoessischStrengthsSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const strengths = parseTemplateStrengths(profile, 3);
  if (!strengths.length) return null;

  return (
    <section
      className={`zeitgenoessisch-section zeitgenoessisch-strengths ${atsMode ? "zeitgenoessisch-strengths--ats" : ""}`}
      data-element-id="zeitgenoessisch.strengths"
    >
      <ZeitgenoessischSectionHeading title={getResumeSectionTitle(profile, "strengths")} icon="strengths" />
      <div className="zeitgenoessisch-strengths__list">
        {strengths.map((strength) => (
          <article
            className="zeitgenoessisch-strength"
            key={`${strength.title}-${strength.description}`}
          >
            <span
              className="zeitgenoessisch-strength__bullet"
              aria-hidden="true"
            />
            <div>
              <h3>{strength.title}</h3>
              {strength.description ? <p>{strength.description}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
