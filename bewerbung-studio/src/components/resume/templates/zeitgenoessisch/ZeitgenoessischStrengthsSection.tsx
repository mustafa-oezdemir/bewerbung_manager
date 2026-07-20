import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueZeitgenoessischValues } from "./zeitgenoessisch.model";
import { ZeitgenoessischSectionHeading } from "./ZeitgenoessischSectionHeading";

export function ZeitgenoessischStrengthsSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const strengths = uniqueZeitgenoessischValues(profile?.skills ?? []);
  if (!strengths.length) return null;

  return (
    <section
      className={`zeitgenoessisch-section zeitgenoessisch-strengths ${atsMode ? "zeitgenoessisch-strengths--ats" : ""}`}
      data-element-id="zeitgenoessisch.strengths"
    >
      <ZeitgenoessischSectionHeading title="Stärken" icon="strengths" />
      <div className="zeitgenoessisch-strengths__list">
        {strengths.map((strength) => (
          <article className="zeitgenoessisch-strength" key={strength}>
            <span
              className="zeitgenoessisch-strength__bullet"
              aria-hidden="true"
            />
            <h3>{strength}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
