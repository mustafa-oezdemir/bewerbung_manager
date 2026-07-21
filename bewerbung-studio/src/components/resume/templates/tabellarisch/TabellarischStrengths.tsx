import { Flag, Trophy, type LucideIcon } from "lucide-react";
import { ensureKnowledgeSection } from "../../../../features/knowledge/knowledge.service";
import { visibleKnowledgeItems } from "../../../../features/knowledge/knowledge.utils";
import type { ApplicantProfile } from "../../../../shared/schema";

const strengthIcons: LucideIcon[] = [Flag, Trophy];

export function TabellarischStrengths({
  profile,
  atsMode,
}: {
  profile: ApplicantProfile | undefined;
  atsMode: boolean;
}) {
  const knowledge = ensureKnowledgeSection(
    profile?.knowledgeSection,
    profile?.skills ?? [],
  );
  const strengths = knowledge.categories
    .filter((category) => category.isVisible)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .flatMap((category) => [
      ...visibleKnowledgeItems(category.items),
      ...category.subcategories
        .filter((subcategory) => subcategory.isVisible)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .flatMap((subcategory) =>
          visibleKnowledgeItems(subcategory.items),
        ),
    ])
    .slice(0, 2);

  if (!strengths.length) return null;

  return (
    <section
      className={`tabellarisch-section tabellarisch-strengths-section ${atsMode ? "tabellarisch-strengths-section--ats" : ""}`}
      data-element-id="tabellarisch.strengths"
    >
      <h2 className="tabellarisch-section__title">Stärken</h2>
      {atsMode ? (
        <ul className="tabellarisch-strengths-ats">
          {strengths.map((strength) => (
            <li key={strength.id}>
              <strong>{strength.name}</strong>
              {strength.description?.trim()
                ? ` - ${strength.description}`
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        <div className="tabellarisch-strengths">
          {strengths.map((strength, index) => {
            const StrengthIcon = strengthIcons[index] ?? Trophy;
            return (
              <article className="tabellarisch-strength" key={strength.id}>
                <StrengthIcon aria-hidden="true" />
                <div>
                  <h3>{strength.name}</h3>
                  {strength.description?.trim() ? (
                    <p>{strength.description}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
