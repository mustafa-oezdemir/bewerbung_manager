import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";
import type { ElegantCareerItem } from "./elegant.types";

export type ElegantPageData = {
  education: ElegantCareerItem[];
  experiences: ElegantCareerItem[];
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

export const createElegantPageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
): ElegantPageData => {
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

export const resolveElegantSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatElegantDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();

  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toElegantExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withoutScheme = trimmed.replace(
    /^[a-z][a-z\d+.-]*:(?:\/\/)?/i,
    "",
  );
  return `https://${withoutScheme}`;
};

export const uniqueElegantValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
