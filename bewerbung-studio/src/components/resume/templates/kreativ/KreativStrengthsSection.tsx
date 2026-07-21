import {
  Lightbulb,
  RefreshCw,
  Shuffle,
  type LucideIcon,
} from "lucide-react";
import { ensureKnowledgeSection } from "../../../../features/knowledge/knowledge.service";
import { visibleKnowledgeItems } from "../../../../features/knowledge/knowledge.utils";
import type { ApplicantProfile } from "../../../../shared/schema";
import { uniqueKreativValues } from "./kreativ.model";
import { KreativSectionHeading } from "./KreativSectionHeading";

const strengthIcons: LucideIcon[] = [Shuffle, Lightbulb, RefreshCw];

export function KreativStrengthsSection({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const knowledge = ensureKnowledgeSection(
    profile?.knowledgeSection,
    uniqueKreativValues(profile?.skills ?? []),
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
    .slice(0, 3);
  if (!strengths.length) return null;

  return (
    <section
      className={`kreativ-section kreativ-strengths ${atsMode ? "kreativ-strengths--ats" : ""}`}
      data-element-id="kreativ.strengths"
    >
      <KreativSectionHeading title="Stärken" />
      <div className="kreativ-strengths__list">
        {strengths.map((strength, index) => {
          const StrengthIcon = strengthIcons[index] ?? Lightbulb;

          return (
            <article className="kreativ-strength" key={strength.id}>
              {!atsMode ? (
                <StrengthIcon aria-hidden="true" />
              ) : null}
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
    </section>
  );
}
