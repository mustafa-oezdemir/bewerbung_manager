import { uniqueZweispaltigValues } from "./zweispaltig.model";
import type { ZweispaltigStrengthsProps } from "./zweispaltig.types";

export function ZweispaltigStrengths({
  profile,
  variant,
}: ZweispaltigStrengthsProps) {
  const strengths = uniqueZweispaltigValues(profile?.skills ?? []).slice(
    0,
    3,
  );
  if (!strengths.length) return null;

  return (
    <section
      className={`zweispaltig-section zweispaltig-strengths zweispaltig-strengths--${variant}`}
      data-element-id="zweispaltig.strengths"
    >
      <h2 className="zweispaltig-section__title">Stärken</h2>
      {variant === "ats" ? (
        <ul>
          {strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
      ) : (
        <div className="zweispaltig-strengths__list">
          {strengths.map((strength) => (
            <div className="zweispaltig-strength" key={strength}>
              <span aria-hidden="true">✓</span>
              <p>{strength}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
