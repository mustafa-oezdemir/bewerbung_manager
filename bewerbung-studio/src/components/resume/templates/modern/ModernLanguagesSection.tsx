/**
 * ModernLanguagesSection component
 * Renders languages with proficiency levels (dots in visual mode, text in ATS mode)
 */

import type { ModernLanguagesSectionProps } from "./modern.types";

const languageLevelMap: Record<string, { dots: number; label: string }> = {
  Muttersprache: { dots: 5, label: "Muttersprache" },
  Native: { dots: 5, label: "Native" },
  Verhandlungssicher: { dots: 5, label: "Verhandlungssicher" },
  Fortgeschritten: { dots: 4, label: "Fortgeschritten" },
  Proficient: { dots: 4, label: "Proficient" },
  Gut: { dots: 3, label: "Gut" },
  "Intermedi ate": { dots: 3, label: "Intermediate" },
  Grundlagen: { dots: 2, label: "Grundlagen" },
  Elementary: { dots: 2, label: "Elementary" },
};

export function ModernLanguagesSection({
  profile,
  accentColor,
  atsMode,
}: ModernLanguagesSectionProps) {
  if (!profile?.languages || profile.languages.length === 0) {
    return null;
  }

  return (
    <section className="modern-section">
      <h2 className="modern-section__title">Sprachen</h2>
      <ul className="modern-languages-list">
        {profile.languages.map((lang: string, idx: number) => {
          const parts = lang.split("–").map((p: string) => p.trim());
          const language = parts[0] || lang;
          const proficiency = parts[1] || "Fortgeschritten";
          const levelInfo =
            languageLevelMap[proficiency] ||
            languageLevelMap["Fortgeschritten"];

          return (
            <li key={idx} className="modern-languages-item">
              <div className="modern-languages-item__header">
                <span className="modern-languages-item__name">{language}</span>
                {!atsMode && (
                  <span className="modern-languages-item__level">
                    {proficiency}
                  </span>
                )}
              </div>
              {!atsMode && (
                <div
                  className="modern-languages-item__dots"
                  style={{ color: accentColor }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < levelInfo.dots ? "●" : "○"}</span>
                  ))}
                </div>
              )}
              {atsMode && (
                <span className="modern-languages-item__level">
                  {proficiency}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
