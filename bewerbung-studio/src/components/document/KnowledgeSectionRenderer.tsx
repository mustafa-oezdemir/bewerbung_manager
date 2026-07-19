import {
  knowledgeLevelLabels,
  knowledgeLevelScores,
} from "../../features/knowledge/knowledge.constants";
import { ensureKnowledgeSection } from "../../features/knowledge/knowledge.service";
import type {
  KnowledgeCategory,
  KnowledgeDisplayMode,
  KnowledgeItem,
  KnowledgeSection,
} from "../../features/knowledge/knowledge.types";
import {
  formatKnowledgeItem,
  visibleKnowledgeItems,
} from "../../features/knowledge/knowledge.utils";

const ItemList = ({
  items,
  category,
  mode,
}: {
  items: KnowledgeItem[];
  category: KnowledgeCategory;
  mode: KnowledgeDisplayMode;
}) => {
  const visible = visibleKnowledgeItems(items);
  if (!visible.length) return null;
  if (mode === "comma-separated")
    return (
      <p className="knowledge-comma">
        {visible
          .map((item) =>
            formatKnowledgeItem(
              item,
              category.showLevels,
              category.showYearsOfExperience,
              mode,
            ),
          )
          .join(", ")}
      </p>
    );
  if (mode === "tags")
    return (
      <div className="knowledge-tags">
        {visible.map((item) => (
          <span key={item.id}>
            {formatKnowledgeItem(
              item,
              category.showLevels,
              category.showYearsOfExperience,
              mode,
            )}
          </span>
        ))}
      </div>
    );
  if (mode === "level-bars" || mode === "level-dots")
    return (
      <div className={`knowledge-level-list ${mode}`}>
        {visible.map((item) => {
          const score = knowledgeLevelScores[item.level];
          return (
            <div className="knowledge-level-row" key={item.id}>
              <span>{item.name}</span>
              {mode === "level-bars" ? (
                <i className="knowledge-level-bar" aria-hidden="true">
                  <b style={{ width: `${score * 20}%` }} />
                </i>
              ) : (
                <i className="knowledge-level-dots" aria-hidden="true">
                  {"●".repeat(score)}
                  <em>{"○".repeat(5 - score)}</em>
                </i>
              )}
              <small>
                {item.level === "none"
                  ? ""
                  : knowledgeLevelLabels[item.level]}
                {category.showYearsOfExperience &&
                item.yearsOfExperience !== undefined
                  ? ` · ${item.yearsOfExperience} Jahre`
                  : ""}
              </small>
            </div>
          );
        })}
      </div>
    );
  const Tag = mode === "bullets" ? "ul" : "div";
  return (
    <Tag className={`knowledge-lines ${mode}`}>
      {visible.map((item) =>
        mode === "bullets" ? (
          <li key={item.id}>
            {formatKnowledgeItem(
              item,
              category.showLevels,
              category.showYearsOfExperience,
              mode,
            )}
          </li>
        ) : (
          <p key={item.id}>
            {formatKnowledgeItem(
              item,
              category.showLevels,
              category.showYearsOfExperience,
              mode,
            )}
          </p>
        ),
      )}
    </Tag>
  );
};

export function KnowledgeSectionRenderer({
  section,
  legacySkills = [],
  atsMode = false,
}: {
  section: KnowledgeSection | undefined;
  legacySkills?: string[];
  atsMode?: boolean;
}) {
  const normalized = ensureKnowledgeSection(section, legacySkills);
  if (!normalized.isVisible) return null;
  const categories = normalized.categories
    .filter((category) => category.isVisible)
    .sort((left, right) => left.sortOrder - right.sortOrder);
  if (!categories.length) return null;
  return (
    <section className="knowledge-section-renderer">
      <h3>{normalized.title}</h3>
      {categories.map((category) => {
        const mode = atsMode ? "comma-separated" : category.displayMode;
        return (
          <div className="knowledge-category-output" key={category.id}>
            <h4>{category.title}</h4>
            {category.subtitle ? <small>{category.subtitle}</small> : null}
            <ItemList items={category.items} category={category} mode={mode} />
            {category.subcategories
              .filter((subcategory) => subcategory.isVisible)
              .sort((left, right) => left.sortOrder - right.sortOrder)
              .map((subcategory) => (
                <div className="knowledge-subcategory-output" key={subcategory.id}>
                  <h5>{subcategory.title}</h5>
                  <ItemList
                    items={subcategory.items}
                    category={category}
                    mode={
                      atsMode
                        ? "comma-separated"
                        : subcategory.displayMode ?? mode
                    }
                  />
                </div>
              ))}
          </div>
        );
      })}
    </section>
  );
}
