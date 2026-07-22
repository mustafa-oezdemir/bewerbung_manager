import { parseTemplateStrengths } from "../resume-template-data";
import type { ElegantStrengthsProps } from "./elegant.types";

export function ElegantStrengths({
  profile,
  variant,
}: ElegantStrengthsProps) {
  const strengths = parseTemplateStrengths(profile, 3);

  if (!strengths.length) return null;

  if (variant === "ats") {
    return (
      <section
        className="elegant-section elegant-ats-list"
        data-element-id="elegant.strengths"
      >
        <h2 className="elegant-section__title">Stärken</h2>
        <ul>
          {strengths.map((strength) => (
            <li key={strength.title}>
              <strong>{strength.title}</strong>
              {strength.description ? ` – ${strength.description}` : ""}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      className="elegant-sidebar__section elegant-strengths"
      data-element-id="elegant.strengths"
    >
      <h2 className="elegant-sidebar__title">Stärken</h2>
      <div className="elegant-strengths__list">
        {strengths.map((strength, index) => (
          <article className="elegant-strength" key={strength.title}>
            <span className="elegant-strength__icon" aria-hidden="true">
              {index ? "♥" : "◉"}
            </span>
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
