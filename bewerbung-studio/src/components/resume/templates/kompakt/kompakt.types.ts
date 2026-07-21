import type { DocumentBackgroundId } from "../../../../shared/documentDesign";
import type { ResumePagePlan } from "../../../../shared/documentPagination";
import type { ApplicantProfile } from "../../../../shared/schema";

export type KompaktResumeProps = {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
  plan: ResumePagePlan;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
  backgroundId: DocumentBackgroundId;
  resumeProfile: string;
  sections: ApplicantProfile["resumeSections"];
};
