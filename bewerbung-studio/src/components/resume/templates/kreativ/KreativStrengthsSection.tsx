import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueKreativValues } from "./kreativ.model";
import { KreativSectionHeading } from "./KreativSectionHeading";

export function KreativStrengthsSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const strengths = uniqueKreativValues(profile?.skills ?? []).slice(0, 3);
  if (!strengths.length) return null;

  return (
    <section
      className={`kreativ-section kreativ-strengths ${atsMode ? "kreativ-strengths--ats" : ""}`}
      data-element-id="kreativ.strengths"
    >
      <KreativSectionHeading title="Stärken" />
      <div className="kreativ-strengths__list">
        {strengths.map((strength) => (
          <article className="kreativ-strength" key={strength}>
            {!atsMode ? <span aria-hidden="true">◆</span> : null}
            <h3>{strength}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
