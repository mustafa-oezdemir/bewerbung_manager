import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";
import {
  getLanguageLevelScore,
  parseLanguageEntry,
} from "../../../../features/languages/language-levels";
import type {
  KreativCareerItem,
  KreativLanguage,
} from "./kreativ.types";

export type KreativPageData = {
  education: KreativCareerItem[];
  experiences: KreativCareerItem[];
  isContinuation: boolean;
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

export const createKreativPageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
): KreativPageData => {
  const experienceIds = selectedIds(plan, "experience");
  const educationIds = selectedIds(plan, "education");

  return {
    experiences: (profile?.experiences ?? [])
      .filter((entry) => experienceIds.has(entry.id))
      .map((entry) => ({
        id: entry.id,
        from: entry.from,
        to: entry.to,
        title: entry.role,
        organization: entry.company,
        city: entry.city,
        achievements: entry.achievements.filter(Boolean),
      })),
    education: (profile?.education ?? [])
      .filter((entry) => educationIds.has(entry.id))
      .map((entry) => ({
        id: entry.id,
        from: entry.from,
        to: entry.to,
        title: entry.degree,
        organization: entry.institution,
        city: entry.city,
      })),
    isContinuation: plan.pageNumber > 1,
  };
};

export const resolveKreativSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatKreativDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toKreativExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withoutScheme = trimmed.replace(
    /^[a-z][a-z\d+.-]*:(?:\/\/)?/i,
    "",
  );
  return `https://${withoutScheme}`;
};

export const uniqueKreativValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

export const parseKreativLanguage = (raw: string): KreativLanguage => {
  const { raw: normalized, name, level } = parseLanguageEntry(raw);
  return {
    raw: normalized,
    name,
    level,
    score: getLanguageLevelScore(level),
  };
};
