/**
 * Tabellarisch Template - Timeline Component
 * Container for timeline entries (experience/education)
 */

import { TabellarischTimelineEntry } from "./TabellarischTimelineEntry";
import type { TabellarischTimelineProps } from "./tabellarisch.types";

export function TabellarischTimeline({
  items,
  primaryColor,
  accentColor,
  textColor,
}: TabellarischTimelineProps) {
  return (
    <div className="tabellarisch-timeline">
      {items.map((item) => (
        <TabellarischTimelineEntry
          key={item.id}
          from={item.from}
          to={item.to}
          role={item.role}
          organization={item.organization}
          city={item.city}
          summary={item.summary}
          achievements={item.achievements}
          primaryColor={primaryColor}
          accentColor={accentColor}
          textColor={textColor}
        />
      ))}
    </div>
  );
}
