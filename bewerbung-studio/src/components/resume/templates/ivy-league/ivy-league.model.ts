import { ensureKnowledgeSection } from "../../../../features/knowledge/knowledge.service";
import {
  formatKnowledgeItem,
  visibleKnowledgeItems,
} from "../../../../features/knowledge/knowledge.utils";
import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";
import {
  getLanguageLevelScore,
  parseLanguageEntry,
} from "../../../../features/languages/language-levels";
import type {
  IvyLeagueCareerItem,
  IvyLeagueLanguage,
  IvyLeagueStrength,
} from "./ivy-league.types";

const selectedIds = (
  plan: ResumePagePlan,
  kind: ResumePagePlan["items"][number]["kind"],
) =>
  new Set(
    plan.items
      .filter((item) => item.kind === kind)
      .map((item) => item.id),
  );

export const createIvyLeaguePageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
) => {
  const experienceIds = selectedIds(plan, "experience");
  const educationIds = selectedIds(plan, "education");
  const mapCareer = (
    entry:
      | ApplicantProfile["experiences"][number]
      | ApplicantProfile["education"][number],
    education: boolean,
  ): IvyLeagueCareerItem => ({
    id: entry.id,
    from: entry.from,
    to: entry.to,
    title: education
      ? (entry as ApplicantProfile["education"][number]).degree
      : (entry as ApplicantProfile["experiences"][number]).role,
    organization: education
      ? (entry as ApplicantProfile["education"][number]).institution
      : (entry as ApplicantProfile["experiences"][number]).company,
    city: entry.city,
    achievements: education
      ? []
      : (entry as ApplicantProfile["experiences"][number]).achievements.filter(
          Boolean,
        ),
  });

  return {
    experiences: (profile?.experiences ?? [])
      .filter((entry) => experienceIds.has(entry.id))
      .map((entry) => mapCareer(entry, false)),
    education: (profile?.education ?? [])
      .filter((entry) => educationIds.has(entry.id))
      .map((entry) => mapCareer(entry, true)),
    isContinuation: plan.pageNumber > 1,
  };
};

export const resolveIvyLeagueSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatIvyLeagueDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toIvyLeagueExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "")}`;
};

export const uniqueIvyLeagueValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

export const parseIvyLeagueStrengths = (
  profile: ApplicantProfile | undefined,
): IvyLeagueStrength[] => {
  const explicitStrengths = (profile?.strengths ?? [])
    .map(({ title, description }) => ({
      title: title.trim(),
      description: description.trim(),
    }))
    .filter(({ title }) => title);
  if (explicitStrengths.length) return explicitStrengths.slice(0, 6);
  return uniqueIvyLeagueValues(profile?.skills ?? [])
    .slice(0, 6)
    .map((value) => {
      const [title, ...description] = value.split(/\s+(?:–|—|:)\s+/);
      return {
        title: title.trim(),
        description: description.join(" – ").trim(),
      };
    });
};

export const parseIvyLeagueLanguage = (
  raw: string,
): IvyLeagueLanguage => {
  const { raw: normalized, name, level } = parseLanguageEntry(raw);
  return {
    raw: normalized,
    name,
    level,
    score: getLanguageLevelScore(level),
  };
};

export const getIvyLeagueKnowledge = (
  profile: ApplicantProfile | undefined,
) => {
  const knowledge = ensureKnowledgeSection(
    profile?.knowledgeSection,
    profile?.skills ?? [],
  );
  if (!knowledge.isVisible) return [];
  return knowledge.categories
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
    ])
    .filter(Boolean);
};
