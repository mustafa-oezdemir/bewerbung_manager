/**
 * ModernSummarySection component
 * Renders brief professional summary
 */

import type { ModernSummarySectionProps } from "./modern.types";

export function ModernSummarySection({ profile }: ModernSummarySectionProps) {
  if (!profile?.summary) {
    return null;
  }

  return (
    <section className="modern-section">
      <h2 className="modern-section__title">Zusammenfassung</h2>
      <p className="modern-summary-text">{profile.summary}</p>
    </section>
  );
}
