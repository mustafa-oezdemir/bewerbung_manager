/**
 * Tabellarisch Template - Summary Component
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import type { TabellarischSummaryProps } from "./tabellarisch.types";

export function TabellarischSummary({
  profile,
  textColor,
}: TabellarischSummaryProps) {
  if (!profile?.summary) return null;

  return (
    <div className="tabellarisch-summary">
      <p
        className="tabellarisch-summary__text"
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: profile.summary }}
      />
    </div>
  );
}
