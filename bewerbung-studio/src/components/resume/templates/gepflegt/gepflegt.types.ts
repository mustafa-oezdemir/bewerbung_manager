import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";

export interface GepflegtResumeProps {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
  plan: ResumePagePlan;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
  photoSource: string | null;
  resumeProfile: string;
  sections: ApplicantProfile["resumeSections"];
}

export interface GepflegtHeaderProps {
  name: string;
  profile: ApplicantProfile | undefined;
  atsMode: boolean;
  compact?: boolean;
}

export interface GepflegtSidebarProps {
  profile: ApplicantProfile | undefined;
  name: string;
  summary: string;
  sections: ApplicantProfile["resumeSections"];
  atsMode: boolean;
  photoSource: string | null;
  isContinuation: boolean;
  pageNumber: number;
  totalPages: number;
}

export interface GepflegtMainContentProps {
  profile: ApplicantProfile | undefined;
  atsMode: boolean;
  isContinuation: boolean;
}

export interface GepflegtFooterProps {
  profile: ApplicantProfile | undefined;
  pageNumber: number;
  totalPages: number;
  atsMode: boolean;
}
