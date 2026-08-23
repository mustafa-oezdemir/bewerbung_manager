import {
  BadgeCheck,
  UsersRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { getResumeSectionTitle } from "../../../../features/resume-sections/resume-sections";
import { parseTemplateStrengths } from "../resume-template-data";
import type { ZweispaltigStrengthsProps } from "./zweispaltig.types";

const strengthIcons: LucideIcon[] = [UsersRound, WandSparkles, BadgeCheck];

export function ZweispaltigStrengths({
  profile,
  variant,
}: ZweispaltigStrengthsProps) {
  const strengths = parseTemplateStrengths(profile, 3);
  if (!strengths.length) return null;

  return (
    <section
      className={`zweispaltig-section zweispaltig-strengths zweispaltig-strengths--${variant}`}
      data-element-id="zweispaltig.strengths"
    >
      <h2 className="zweispaltig-section__title">{getResumeSectionTitle(profile, "strengths")}</h2>
      {variant === "ats" ? (
        <ul>
          {strengths.map((strength) => (
            <li key={strength.title}>
              {strength.title}
              {strength.description.trim()
                ? ` – ${strength.description}`
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        <div className="zweispaltig-strengths__list">
          {strengths.map((strength, index) => {
            const StrengthIcon = strengthIcons[index] ?? BadgeCheck;

            return (
              <article className="zweispaltig-strength" key={strength.title}>
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
