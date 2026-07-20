/**
 * ModernStrengthsSection component
 * Renders strengths/key competencies with descriptions
 */

import type { ModernStrengthsSectionProps } from "./modern.types";

export function ModernStrengthsSection({
  profile,
}: ModernStrengthsSectionProps) {
  // For now, we can render skills as strengths if available
  if (!profile?.skills || profile.skills.length === 0) {
    return null;
  }

  // Split skills into groups of title and potential description
  // In a real implementation, this might come from a separate strengths field
  const strengthItems = profile.skills.slice(0, 4).map((skill: string) => ({
    title: skill,
    description: "Mehrjährige praktische Erfahrung und nachgewiesene Erfolge.",
  }));

  if (strengthItems.length === 0) {
    return null;
  }

  return (
    <section className="modern-section">
      <h2 className="modern-section__title">Stärken</h2>
      <div className="modern-strengths-list">
        {strengthItems.map(
          (item: { title: string; description: string }, idx: number) => (
            <div key={idx} className="modern-strengths-item">
              <h3 className="modern-strengths-item__title">{item.title}</h3>
              <p className="modern-strengths-item__description">
                {item.description}
              </p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
