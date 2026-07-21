/**
 * ModernStrengthsSection component
 * Renders strengths/key competencies with descriptions
 */

import type { ModernStrengthsSectionProps } from "./modern.types";
import { parseTemplateStrengths } from "../resume-template-data";

export function ModernStrengthsSection({
  profile,
}: ModernStrengthsSectionProps) {
  const strengthItems = parseTemplateStrengths(profile, 4).filter(
    (item) => item.description,
  );

  if (strengthItems.length === 0) {
    return null;
  }

  return (
    <section className="modern-section">
      <h2 className="modern-section__title">Stärken</h2>
      <div className="modern-strengths-list">
        {strengthItems.map(
          (item, idx: number) => (
            <div key={idx} className="modern-strengths-item">
              <span className="modern-strengths-item__icon" aria-hidden="true">
                {idx % 2 === 0 ? "✓" : "⚑"}
              </span>
              <div>
                <h3 className="modern-strengths-item__title">{item.title}</h3>
                <p className="modern-strengths-item__description">
                  {item.description}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
