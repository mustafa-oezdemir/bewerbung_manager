/**
 * Tabellarisch Template - Timeline Entry Component
 * Single timeline entry with date, timeline rail, and content
 */

import type { TabellarischTimelineEntryProps } from "./tabellarisch.types";

export function TabellarischTimelineEntry({
  from,
  to,
  role,
  organization,
  city,
  summary,
  achievements,
  primaryColor,
  accentColor,
  textColor,
}: TabellarischTimelineEntryProps) {
  return (
    <div className="tabellarisch-timeline-entry">
      {/* Date & Location Column */}
      <div className="tabellarisch-timeline-entry__meta">
        <div
          className="tabellarisch-timeline-entry__date"
          style={{ color: primaryColor }}>
          {from}–{to}
        </div>
        {city && (
          <div
            className="tabellarisch-timeline-entry__location"
            style={{ color: textColor }}>
            {city}
          </div>
        )}
      </div>

      {/* Timeline Rail (Line + Dot) */}
      <div className="tabellarisch-timeline-entry__rail" />

      {/* Content Column */}
      <div className="tabellarisch-timeline-entry__content">
        <h3
          className="tabellarisch-timeline-entry__role"
          style={{ color: primaryColor }}>
          {role}
        </h3>
        <p
          className="tabellarisch-timeline-entry__organization"
          style={{ color: accentColor }}>
          {organization}
        </p>

        {summary && (
          <p
            className="tabellarisch-timeline-entry__summary"
            style={{ color: textColor }}>
            {summary}
          </p>
        )}

        {achievements && achievements.length > 0 && (
          <ul
            className="tabellarisch-timeline-entry__achievements"
            style={{ color: textColor }}>
            {achievements.map((achievement, idx) => (
              <li key={idx}>{achievement}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
