import { Flag, Trophy, type LucideIcon } from "lucide-react";
import type { ApplicantProfile } from "../../../../shared/schema";
import { parseTemplateStrengths } from "../resume-template-data";
import { getResumeSectionTitle } from "../../../../features/resume-sections/resume-sections";

const strengthIcons: LucideIcon[] = [Flag, Trophy];

export function TabellarischStrengths({
  profile,
  atsMode,
}: {
  profile: ApplicantProfile | undefined;
  atsMode: boolean;
}) {
  const strengths = parseTemplateStrengths(profile, 2);

  if (!strengths.length) return null;

  return (
    <section
      className={`tabellarisch-section tabellarisch-strengths-section ${atsMode ? "tabellarisch-strengths-section--ats" : ""}`}
      data-element-id="tabellarisch.strengths"
    >
      <h2 className="tabellarisch-section__title">{getResumeSectionTitle(profile, "strengths")}</h2>
      {atsMode ? (
        <ul className="tabellarisch-strengths-ats">
          {strengths.map((strength) => (
            <li key={strength.title}>
              <strong>{strength.title}</strong>
              {strength.description.trim()
                ? ` - ${strength.description}`
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        <div className="tabellarisch-strengths">
          {strengths.map((strength, index) => {
            const StrengthIcon = strengthIcons[index] ?? Trophy;
            return (
              <article className="tabellarisch-strength" key={strength.title}>
                <StrengthIcon aria-hidden="true" />
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
      )}
    </section>
  );
}
