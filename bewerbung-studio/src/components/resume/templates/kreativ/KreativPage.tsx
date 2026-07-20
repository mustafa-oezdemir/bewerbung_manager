import {
  createKreativPageData,
  resolveKreativSummary,
} from "./kreativ.model";
import type { KreativPageProps } from "./kreativ.types";
import { KreativAdditionalSections } from "./KreativAdditionalSections";
import { KreativBackground } from "./KreativBackground";
import { KreativCareerSection } from "./KreativCareerSection";
import { KreativFooter } from "./KreativFooter";
import { KreativHeader } from "./KreativHeader";
import { KreativLeftColumn } from "./KreativLeftColumn";
import { KreativRightColumn } from "./KreativRightColumn";
import { KreativSectionHeading } from "./KreativSectionHeading";

export function KreativPage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  photoSource,
  resumeProfile,
  sections,
}: KreativPageProps) {
  const { education, experiences, isContinuation } =
    createKreativPageData(profile, plan);
  const summary = resolveKreativSummary(profile, resumeProfile);
  const isLastPage = plan.pageNumber === totalPages;

  if (atsMode) {
    return (
      <main className="kreativ-ats" data-renderer="ats">
        <KreativHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {sections.profile && summary && !isContinuation ? (
          <section
            className="kreativ-section"
            data-element-id="kreativ.summary"
          >
            <KreativSectionHeading title="Zusammenfassung" />
            <p className="kreativ-summary">{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <KreativCareerSection
            title="Berufserfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <KreativCareerSection title="Ausbildung" items={education} />
        ) : null}
        {isLastPage ? (
          <KreativAdditionalSections
            profile={profile}
            sections={sections}
          />
        ) : null}
      </main>
    );
  }

  return (
    <div className="kreativ-page__visual" data-renderer="visual">
      {!isContinuation ? <KreativBackground /> : null}
      <KreativHeader
        profile={profile}
        name={name}
        photoSource={photoSource}
        compact={isContinuation}
      />
      <div
        className={`kreativ-content ${isContinuation ? "kreativ-content--continuation" : ""}`}
      >
        <KreativLeftColumn
          experiences={experiences}
          education={education}
          continuation={isContinuation}
        />
        {!isContinuation ? (
          <KreativRightColumn
            profile={profile}
            sections={sections}
            summary={summary}
          />
        ) : null}
        {!experiences.length &&
        !education.length &&
        plan.pageNumber === 1 ? (
          <p className="kreativ-empty">
            Berufserfahrung und Ausbildung im Profil ergänzen.
          </p>
        ) : null}
      </div>
      <KreativFooter
        profile={profile}
        pageNumber={plan.pageNumber}
        totalPages={totalPages}
        atsMode={atsMode}
      />
    </div>
  );
}
