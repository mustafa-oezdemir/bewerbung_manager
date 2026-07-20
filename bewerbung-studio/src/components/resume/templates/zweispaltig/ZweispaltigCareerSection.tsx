import { formatZweispaltigDateRange } from "./zweispaltig.model";
import type { ZweispaltigCareerSectionProps } from "./zweispaltig.types";

export function ZweispaltigCareerSection({
  title,
  items,
  continuation = false,
}: ZweispaltigCareerSectionProps) {
  if (!items.length) return null;

  return (
    <section
      className="zweispaltig-section zweispaltig-career"
      data-element-id={`zweispaltig.${title === "Ausbildung" ? "education" : "experience"}`}
    >
      <h2 className="zweispaltig-section__title">
        {title}
        {continuation ? <small>Fortsetzung</small> : null}
      </h2>
      <div className="zweispaltig-career__list">
        {items.map((item) => (
          <article className="zweispaltig-career-entry" key={item.id}>
            <div className="zweispaltig-career-entry__heading">
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
              </div>
              <p className="zweispaltig-career-entry__meta">
                <strong>
                  {formatZweispaltigDateRange(item.from, item.to)}
                </strong>
                {item.city ? <span>{item.city}</span> : null}
              </p>
            </div>
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
