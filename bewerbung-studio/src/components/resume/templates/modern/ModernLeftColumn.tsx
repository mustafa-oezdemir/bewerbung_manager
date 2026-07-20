/**
 * ModernLeftColumn component
 * Renders left column: Experience and Education
 */

import type { ModernLeftColumnProps } from "./modern.types";
import { ModernExperienceSection } from "./ModernExperienceSection";
import { ModernEducationSection } from "./ModernEducationSection";

export function ModernLeftColumn({
  profile,
  atsMode,
}: ModernLeftColumnProps) {
  return (
    <div
      className="modern-resume-left-column"
      data-ats-mode={atsMode}
    >
      <ModernExperienceSection profile={profile} />
      <ModernEducationSection profile={profile} />
    </div>
  );
}
