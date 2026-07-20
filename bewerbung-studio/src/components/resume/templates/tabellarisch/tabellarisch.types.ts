/**
 * Tabellarisch Template - TypeScript Types
 */

import type { ApplicantProfile } from "../../../../shared/schema";

export interface TabellarischPageProps {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
  pageNumber: number;
  totalPages: number;
  accentColor: string;
  primaryColor: string;
  photoSource: string | null;
  isContinuation?: boolean;
}

export interface TabellarischHeaderProps {
  name: string;
  profile: ApplicantProfile | undefined;
  primaryColor: string;
  accentColor: string;
  photoSource: string | null;
  atsMode: boolean;
}

export interface TabellarischSummaryProps {
  profile: ApplicantProfile | undefined;
  textColor: string;
}

export interface TabellarischStrengthsProps {
  profile: ApplicantProfile | undefined;
  primaryColor: string;
  accentColor: string;
  atsMode: boolean;
}

export interface TabellarischTimelineProps {
  items: Array<{
    id: string;
    from: string;
    to: string;
    role: string;
    organization: string;
    city?: string;
    summary?: string;
    achievements?: string[];
  }>;
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export interface TabellarischTimelineEntryProps {
  from: string;
  to: string;
  role: string;
  organization: string;
  city?: string;
  summary?: string;
  achievements?: string[];
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export interface TabellarischFooterProps {
  profile: ApplicantProfile | undefined;
  pageNumber: number;
  totalPages: number;
  atsMode: boolean;
  mutedColor: string;
  accentColor: string;
}
