import { uniqueElegantValues } from "./elegant.model";
import type { ElegantStrengthsProps } from "./elegant.types";

export function ElegantStrengths({
  profile,
  variant,
}: ElegantStrengthsProps) {
  const strengths = uniqueElegantValues(profile?.skills ?? []).slice(0, 3);

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
            <li key={strength}>{strength}</li>
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
        {strengths.map((strength) => (
          <div className="elegant-strength" key={strength}>
            <span className="elegant-strength__icon" aria-hidden="true">
              ✓
            </span>
            <p>{strength}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
