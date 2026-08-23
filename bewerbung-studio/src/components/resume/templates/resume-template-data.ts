import { ensureKnowledgeSection } from "../../../features/knowledge/knowledge.service";
import {
  formatKnowledgeItem,
  visibleKnowledgeItems,
} from "../../../features/knowledge/knowledge.utils";
import type { ResumePagePlan } from "../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../shared/schema";
import {
  getLanguageLevelScore,
  parseLanguageEntry,
} from "../../../features/languages/language-levels";

export type TemplateCareerItem = {
  id: string;
  from: string;
  to: string;
  title: string;
  organization: string;
  city?: string;
  achievements: string[];
};

export type TemplateLanguage = {
  raw: string;
  name: string;
  level: string;
  score: number;
};

export type TemplateStrength = {
  title: string;
  description: string;
};

const selectedIds = (
  plan: ResumePagePlan,
  kind: ResumePagePlan["items"][number]["kind"],
) =>
  new Set(
    plan.items
      .filter((item) => item.kind === kind)
      .map((item) => item.id),
  );

export const createTemplatePageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
) => {
  const experienceIds = selectedIds(plan, "experience");
  const educationIds = selectedIds(plan, "education");
  return {
    experiences: (profile?.experiences ?? [])
      .filter((entry) => experienceIds.has(entry.id))
      .map(
        (entry): TemplateCareerItem => ({
          id: entry.id,
          from: entry.from,
          to: entry.to,
          title: entry.role,
          organization: entry.company,
          city: entry.city,
          achievements: entry.achievements.filter(Boolean),
        }),
      ),
    education: (profile?.education ?? [])
      .filter((entry) => educationIds.has(entry.id))
      .map(
        (entry): TemplateCareerItem => ({
          id: entry.id,
          from: entry.from,
          to: entry.to,
          title: entry.degree,
          organization: entry.institution,
          city: entry.city,
          achievements: [],
        }),
      ),
    isContinuation: plan.pageNumber > 1,
  };
};

export const resolveTemplateSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatTemplateDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toTemplateExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "")}`;
};

export const uniqueTemplateValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

export const parseTemplateStrengths = (
  profile: ApplicantProfile | undefined,
  maximum = 4,
): TemplateStrength[] => {
  const explicitStrengths = (profile?.strengths ?? [])
    .map((strength) => ({
      title: strength.title.trim(),
      description: strength.description.trim(),
    }))
    .filter((strength) => strength.title);
  if (explicitStrengths.length) return explicitStrengths.slice(0, maximum);

  return uniqueTemplateValues(profile?.skills ?? [])
    .slice(0, maximum)
    .map((value) => {
      const [title, ...description] = value.split(/\s+(?:–|—|:)\s+/);
      return {
        title: title.trim(),
        description: description.join(" – ").trim(),
      };
    });
};

export const parseTemplateLanguage = (raw: string): TemplateLanguage => {
  const { raw: normalized, name, level } = parseLanguageEntry(raw);
  return {
    raw: normalized,
    name,
    level,
    score: getLanguageLevelScore(level),
  };
};

export const getTemplateKnowledge = (
  profile: ApplicantProfile | undefined,
) => {
  const knowledge = ensureKnowledgeSection(
    profile?.knowledgeSection,
    profile?.skills ?? [],
  );
  if (!knowledge.isVisible) return [];
  return uniqueTemplateValues(
    knowledge.categories
      .filter((category) => category.isVisible)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .flatMap((category) => [
        ...visibleKnowledgeItems(category.items).map((item) =>
          formatKnowledgeItem(
            item,
            category.showLevels,
            category.showYearsOfExperience,
            "comma-separated",
          ),
        ),
        ...category.subcategories
          .filter((subcategory) => subcategory.isVisible)
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .flatMap((subcategory) =>
            visibleKnowledgeItems(subcategory.items).map((item) =>
              formatKnowledgeItem(
                item,
                category.showLevels,
                category.showYearsOfExperience,
                "comma-separated",
              ),
            ),
          ),
      ]),
  );
};
