/**
 * Gepflegt template main content component
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import type { GepflegtMainContentProps } from "./gepflegt.types";

export function GepflegtMainContent({
  profile,
  name,
  atsMode,
}: GepflegtMainContentProps) {
  const experiences = profile?.experiences || [];
  const education = profile?.education || [];

  return (
    <main className="gepflegt-main">
      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="gepflegt-section">
          <h2 className="gepflegt-section__title">Berufserfahrung</h2>
          {experiences.map((entry) => (
            <article key={entry.id} className="gepflegt-entry">
              <div className="gepflegt-entry__header">
                <div>
                  <h3 className="gepflegt-entry__title">{entry.role}</h3>
                  <p className="gepflegt-entry__organization">
                    {entry.company}
                  </p>
                </div>
                <div className="gepflegt-entry__meta">
                  <span className="gepflegt-entry__date">
                    {entry.from} – {entry.to}
                  </span>
                </div>
              </div>
              {entry.city && (
                <p
                  className="gepflegt-entry__location"
                  style={{
                    margin: "0.5mm 0 1mm",
                    fontSize: "var(--gepflegt-small-font-size, 8.4pt)",
                    opacity: 0.8,
                  }}>
                  {entry.city}
                </p>
              )}
              {entry.achievements &&
                entry.achievements.filter(Boolean).length > 0 && (
                  <ul className="gepflegt-entry__achievements">
                    {entry.achievements
                      .filter(Boolean)
                      .map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                  </ul>
                )}
            </article>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="gepflegt-section">
          <h2 className="gepflegt-section__title">Ausbildung</h2>
          {education.map((entry) => (
            <article key={entry.id} className="gepflegt-entry">
              <div className="gepflegt-entry__header">
                <div>
                  <h3 className="gepflegt-entry__title">{entry.degree}</h3>
                  <p className="gepflegt-entry__organization">
                    {entry.institution}
                  </p>
                </div>
                <div className="gepflegt-entry__meta">
                  <span className="gepflegt-entry__date">
                    {entry.from} – {entry.to}
                  </span>
                </div>
              </div>
              {entry.city && (
                <p
                  className="gepflegt-entry__location"
                  style={{
                    margin: "0.5mm 0 1mm",
                    fontSize: "var(--gepflegt-small-font-size, 8.4pt)",
                    opacity: 0.8,
                  }}>
                  {entry.city}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      {/* Empty state */}
      {!experiences.length && !education.length && (
        <p
          style={{
            color: "var(--gepflegt-body-text-color, #3f494e)",
            opacity: 0.6,
            fontSize: "var(--gepflegt-body-font-size, 9.2pt)",
          }}>
          Berufserfahrung und Ausbildung im Profil ergänzen.
        </p>
      )}
    </main>
  );
}
