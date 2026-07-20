import { formatKreativDateRange } from "./kreativ.model";
import type { KreativCareerSectionProps } from "./kreativ.types";
import { KreativSectionHeading } from "./KreativSectionHeading";

export function KreativCareerSection({
  title,
  items,
  continuation = false,
}: KreativCareerSectionProps) {
  if (!items.length) return null;

  return (
    <section
      className="kreativ-section kreativ-career"
      data-element-id={`kreativ.${title === "Ausbildung" ? "education" : "experience"}`}
    >
      <KreativSectionHeading
        title={title === "Berufserfahrung" ? "Erfahrung" : title}
        continuation={continuation}
      />
      <div className="kreativ-career__list">
        {items.map((item) => (
          <article className="kreativ-career-entry" key={item.id}>
            <h3>{item.title}</h3>
            <h4>{item.organization}</h4>
            <p className="kreativ-career-entry__meta">
              <span>{formatKreativDateRange(item.from, item.to)}</span>
              {item.city ? <span>{item.city}</span> : null}
            </p>
            {item.achievements?.length ? (
              <ul>
                {item.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
