/**
 * Tabellarisch Template - Summary Component
 */

import type { TabellarischSummaryProps } from "./tabellarisch.types";

export function TabellarischSummary({ text }: TabellarischSummaryProps) {
  if (!text) return null;

  return (
    <section
      className="tabellarisch-section tabellarisch-summary"
      data-element-id="tabellarisch.summary"
    >
      <h2 className="tabellarisch-section__title">Kurzprofil</h2>
      <p className="tabellarisch-summary__text">{text}</p>
    </section>
  );
}
