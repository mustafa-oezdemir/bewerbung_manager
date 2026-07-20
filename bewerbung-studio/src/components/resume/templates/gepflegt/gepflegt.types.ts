/**
 * Gepflegt template type definitions
 */

import type { ApplicantProfile } from "../../../../shared/schema";

export interface GepflegtPageProps {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
  pageNumber: number;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
}

export interface GepflegtHeaderProps {
  name: string;
  profile: ApplicantProfile | undefined;
  accentColor: string;
  photoSource: string | null;
  atsMode: boolean;
}

export interface GepflegtSidebarProps {
  profile: ApplicantProfile | undefined;
  accentColor: string;
  sidebarBackground: string;
  sidebarText: string;
  atsMode: boolean;
  photoSource?: string | null;
  name?: string;
}

export interface GepflegtMainContentProps {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
}
