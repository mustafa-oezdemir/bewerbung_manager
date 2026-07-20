import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";
import type { TabellarischTimelineItem } from "./tabellarisch.types";

export type TabellarischPageData = {
  education: TabellarischTimelineItem[];
  experiences: TabellarischTimelineItem[];
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

export const createTabellarischPageData = (
  profile: ApplicantProfile | undefined,
  plan: ResumePagePlan,
): TabellarischPageData => {
  const experienceIds = selectedIds(plan, "experience");
  const educationIds = selectedIds(plan, "education");

  return {
    experiences: (profile?.experiences ?? [])
      .filter((experience) => experienceIds.has(experience.id))
      .map((experience) => ({
        id: experience.id,
        from: experience.from,
        to: experience.to,
        role: experience.role,
        organization: experience.company,
        city: experience.city,
        achievements: experience.achievements.filter(Boolean),
      })),
    education: (profile?.education ?? [])
      .filter((education) => educationIds.has(education.id))
      .map((education) => ({
        id: education.id,
        from: education.from,
        to: education.to,
        role: education.degree,
        organization: education.institution,
        city: education.city,
      })),
    isContinuation: plan.pageNumber > 1,
  };
};

export const resolveTabellarischSummary = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => resumeProfile.trim() || profile?.summary.trim() || "";

export const formatTabellarischDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();

  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

export const toExternalHref = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};
