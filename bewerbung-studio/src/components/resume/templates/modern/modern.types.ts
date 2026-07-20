/**
 * Modern template TypeScript type definitions
 */

import type { ApplicantProfile } from "../../../../shared/schema";

export interface ModernResumeProps {
  profile?: ApplicantProfile;
  name: string;
  atsMode: boolean;
  pageNumber: number;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
  photoSource?: string;
  isContinuation?: boolean;
}

export interface ModernHeaderProps {
  name: string;
  profile?: ApplicantProfile;
  accentColor: string;
  photoSource?: string;
  atsMode: boolean;
}

export interface ModernLeftColumnProps {
  profile?: ApplicantProfile;
  atsMode: boolean;
}

export interface ModernRightColumnProps {
  profile?: ApplicantProfile;
  accentColor: string;
  atsMode: boolean;
}

export interface ModernContactSectionProps {
  profile?: ApplicantProfile;
  accentColor: string;
  atsMode: boolean;
}

export interface ModernSummarySectionProps {
  profile?: ApplicantProfile;
}

export interface ModernStrengthsSectionProps {
  profile?: ApplicantProfile;
}

export interface ModernLanguagesSectionProps {
  profile?: ApplicantProfile;
  accentColor: string;
  atsMode: boolean;
}

export interface ModernExperienceSectionProps {
  profile?: ApplicantProfile;
}

export interface ModernEducationSectionProps {
  profile?: ApplicantProfile;
}

export interface ModernFooterProps {
  pageNumber: number;
  totalPages: number;
  portfolio?: string;
  atsMode: boolean;
}
