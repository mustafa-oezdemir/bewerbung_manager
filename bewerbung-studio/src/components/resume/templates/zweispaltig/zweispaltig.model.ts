import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";
import type {
  ZweispaltigCareerItem,
  ZweispaltigLanguage,
} from "./zweispaltig.types";

export type ZweispaltigPageData = {
  education: ZweispaltigCareerItem[];
  experiences: ZweispaltigCareerItem[];
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

export const createZweispaltigPageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
): ZweispaltigPageData => {
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

export const resolveZweispaltigSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatZweispaltigDateRange = (
  from: string,
  to: string,
) => {
  const start = from.trim();
  const end = to.trim();
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toZweispaltigExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withoutScheme = trimmed.replace(
    /^[a-z][a-z\d+.-]*:(?:\/\/)?/i,
    "",
  );
  return `https://${withoutScheme}`;
};

export const uniqueZweispaltigValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

const languageScore = (level: string) => {
  const normalized = level.toLocaleLowerCase("de-DE");
  if (/muttersprache|native|c2/.test(normalized)) return 5;
  if (/verhandlung|fließ|fliess|c1/.test(normalized)) return 4;
  if (/b2|fortgeschritten|versiert/.test(normalized)) return 3;
  if (/b1|a2|grundkennt/.test(normalized)) return 2;
  if (/a1|anfänger|anfaenger/.test(normalized)) return 1;
  return 3;
};

export const parseZweispaltigLanguage = (
  raw: string,
): ZweispaltigLanguage => {
  const normalized = raw.trim();
  const [name, ...levelParts] = normalized.split(/\s+[–—-]\s+/);
  const level = levelParts.join(" – ").trim();
  return {
    raw: normalized,
    name: name.trim() || normalized,
    level,
    score: languageScore(level),
  };
};
