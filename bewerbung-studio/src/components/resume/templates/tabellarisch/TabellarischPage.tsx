/**
 * Tabellarisch Template - Page Component
 * Wrapper for a single A4 page
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import { DocumentBackgroundLayer } from "../../../document/DocumentBackgroundLayer";
import { TabellarischHeader } from "./TabellarischHeader";
import { TabellarischSummary } from "./TabellarischSummary";
import { TabellarischStrengths } from "./TabellarischStrengths";
import { TabellarischTimeline } from "./TabellarischTimeline";
import { TabellarischContinuationHeader } from "./TabellarischContinuationHeader";
import { TabellarischFooter } from "./TabellarischFooter";
import { tabellarischDefaults } from "./tabellarisch.defaults";
import type { TabellarischPageProps } from "./tabellarisch.types";

export function TabellarischPage({
  profile,
  name,
  atsMode,
  pageNumber,
  totalPages,
  accentColor,
  primaryColor,
  photoSource,
  isContinuation = false,
}: TabellarischPageProps) {
  // Prepare experience items
  const experienceItems =
    profile?.experiences?.map((exp) => ({
      id: exp.id,
      from: exp.from,
      to: exp.to,
      role: exp.role,
      organization: exp.company,
      city: exp.city,
      summary: undefined,
      achievements: exp.achievements,
    })) || [];

  // Prepare education items
  const educationItems =
    profile?.education?.map((edu) => ({
      id: edu.id,
      from: edu.from,
      to: edu.to,
      role: edu.degree,
      organization: edu.institution,
      city: edu.city,
      summary: undefined,
      achievements: undefined,
    })) || [];

  return (
    <div className="tabellarisch-page__wrapper">
      {/* Background Layer (hidden in ATS) */}
      {!atsMode && (
        <DocumentBackgroundLayer backgroundId="white" atsMode={false} />
      )}

      {/* Content */}
      <div className="tabellarisch-page__content">
        {/* Continuation Header for Page 2+ */}
        {isContinuation && (
          <TabellarischContinuationHeader name={name} title={profile?.title} />
        )}

        {/* Main Header - only on first page */}
        {!isContinuation && (
          <TabellarischHeader
            name={name}
            profile={profile}
            primaryColor={primaryColor}
            accentColor={accentColor}
            photoSource={photoSource}
            atsMode={atsMode}
          />
        )}

        {/* Zusammenfassung */}
        {profile?.summary && !isContinuation && (
          <section className="tabellarisch-section tabellarisch-summary">
            <TabellarischSummary profile={profile} textColor="#3f4850" />
          </section>
        )}

        {/* Stärken - only on first page */}
        {profile?.skills && profile.skills.length > 0 && !isContinuation && (
          <section className="tabellarisch-section">
            <h2 className="tabellarisch-section__title">Stärken</h2>
            <TabellarischStrengths
              profile={profile}
              primaryColor={primaryColor}
              accentColor={accentColor}
              atsMode={atsMode}
            />
          </section>
        )}

        {/* Berufserfahrung */}
        {experienceItems.length > 0 && (
          <section className="tabellarisch-section">
            <h2 className="tabellarisch-section__title">Berufserfahrung</h2>
            <TabellarischTimeline
              items={experienceItems}
              primaryColor={primaryColor}
              accentColor={accentColor}
              textColor="#3f4850"
            />
          </section>
        )}

        {/* Ausbildung */}
        {educationItems.length > 0 && (
          <section className="tabellarisch-section">
            <h2 className="tabellarisch-section__title">Ausbildung</h2>
            <TabellarischTimeline
              items={educationItems}
              primaryColor={primaryColor}
              accentColor={accentColor}
              textColor="#3f4850"
            />
          </section>
        )}
      </div>

      {/* Footer */}
      <TabellarischFooter
        profile={profile}
        pageNumber={pageNumber}
        totalPages={totalPages}
        atsMode={atsMode}
        mutedColor="#6d747a"
        accentColor={accentColor}
      />
    </div>
  );
}
