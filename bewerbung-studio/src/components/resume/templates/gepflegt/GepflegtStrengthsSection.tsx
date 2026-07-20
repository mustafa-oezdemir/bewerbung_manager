/**
 * Gepflegt template Strengths section
 * Renders core competencies/strengths in sidebar style
 */

import type { ApplicantProfile } from "../../../../shared/schema";

export interface GepflegtStrengthsSectionProps {
  profile: ApplicantProfile | undefined;
  atsMode: boolean;
}

export function GepflegtStrengthsSection({
  profile,
  atsMode,
}: GepflegtStrengthsSectionProps) {
  // Use skills as strengths - take top 5
  const strengths = profile?.skills?.slice(0, 5) || [];

  if (strengths.length === 0) {
    return null;
  }

  if (atsMode) {
    // ATS mode: render as simple list with line breaks
    return (
      <section className="gepflegt-sidebar__section">
        <h3 className="gepflegt-sidebar__section-title">Stärken</h3>
        <p
          className="gepflegt-sidebar__strengths-list-ats"
          style={{
            margin: 0,
            fontSize: "var(--gepflegt-body-font-size, 9.2pt)",
            lineHeight: "var(--gepflegt-line-height, 1.4)",
          }}>
          {strengths.join(" • ")}
        </p>
      </section>
    );
  }

  // Visual mode: render as visual list with separators
  return (
    <section className="gepflegt-sidebar__section">
      <h3 className="gepflegt-sidebar__section-title">Stärken</h3>
      <div className="gepflegt-strengths-list">
        {strengths.map((strength, idx) => (
          <div key={idx} className="gepflegt-strength-item">
            <span className="gepflegt-strength-item__bullet">●</span>
            <span className="gepflegt-strength-item__text">{strength}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
