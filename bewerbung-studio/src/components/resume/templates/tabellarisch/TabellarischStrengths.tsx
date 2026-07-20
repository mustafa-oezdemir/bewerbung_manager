/**
 * Tabellarisch Template - Strengths Component
 * 2-column card layout for core competencies
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import type { TabellarischStrengthsProps } from "./tabellarisch.types";

export function TabellarischStrengths({
  profile,
  primaryColor,
  accentColor,
  atsMode,
}: TabellarischStrengthsProps) {
  const skills = profile?.skills || [];
  if (skills.length === 0) return null;

  if (atsMode) {
    // ATS mode: simple comma-separated list
    return (
      <p style={{ margin: 0, color: primaryColor }}>{skills.join(" • ")}</p>
    );
  }

  // Visual mode: 2-column card layout with icons
  return (
    <div className="tabellarisch-strengths">
      {skills.map((skill, idx) => (
        <div key={idx} className="tabellarisch-strength">
          <div
            className="tabellarisch-strength__icon"
            style={{ color: accentColor }}>
            ●
          </div>
          <div>
            <h4
              className="tabellarisch-strength__title"
              style={{ color: primaryColor }}>
              {skill}
            </h4>
            {/* Optional: Add description from knowledgeSection */}
          </div>
        </div>
      ))}
    </div>
  );
}
