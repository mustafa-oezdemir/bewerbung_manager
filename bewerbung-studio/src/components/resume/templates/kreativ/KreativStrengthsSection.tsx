import {
  Lightbulb,
  RefreshCw,
  Shuffle,
  type LucideIcon,
} from "lucide-react";
import type { ApplicantProfile } from "../../../../shared/schema";
import { KreativSectionHeading } from "./KreativSectionHeading";
import { parseTemplateStrengths } from "../resume-template-data";
import { getResumeSectionTitle } from "../../../../features/resume-sections/resume-sections";

const strengthIcons: LucideIcon[] = [Shuffle, Lightbulb, RefreshCw];

export function KreativStrengthsSection({
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
      className={`kreativ-section kreativ-strengths ${atsMode ? "kreativ-strengths--ats" : ""}`}
      data-element-id="kreativ.strengths"
    >
      <KreativSectionHeading title={getResumeSectionTitle(profile, "strengths")} />
      <div className="kreativ-strengths__list">
        {strengths.map((strength, index) => {
          const StrengthIcon = strengthIcons[index] ?? Lightbulb;

          return (
            <article className="kreativ-strength" key={strength.title}>
              {!atsMode ? (
                <StrengthIcon aria-hidden="true" />
              ) : null}
              <div>
                <h3>{strength.title}</h3>
                {strength.description.trim() ? (
                  <p>{strength.description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
