/**
 * ModernRightColumn component
 * Renders right column: Contact, Summary, Strengths, Languages
 */

import type { ModernRightColumnProps } from "./modern.types";
import { ModernContactSection } from "./ModernContactSection";
import { ModernSummarySection } from "./ModernSummarySection";
import { ModernStrengthsSection } from "./ModernStrengthsSection";
import { ModernLanguagesSection } from "./ModernLanguagesSection";

export function ModernRightColumn({
  profile,
  accentColor,
  atsMode,
}: ModernRightColumnProps) {
  return (
    <div
      className="modern-resume-right-column"
      data-ats-mode={atsMode}
    >
      <ModernContactSection
        profile={profile}
        accentColor={accentColor}
        atsMode={atsMode}
      />
      <ModernSummarySection profile={profile} />
      <ModernStrengthsSection profile={profile} />
      <ModernLanguagesSection
        profile={profile}
        accentColor={accentColor}
        atsMode={atsMode}
      />
    </div>
  );
}
