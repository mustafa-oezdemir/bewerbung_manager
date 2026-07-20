import {
  createZweispaltigPageData,
  resolveZweispaltigSummary,
} from "./zweispaltig.model";
import type { ZweispaltigPageProps } from "./zweispaltig.types";
import { ZweispaltigAdditionalSections } from "./ZweispaltigAdditionalSections";
import { ZweispaltigCareerSection } from "./ZweispaltigCareerSection";
import { ZweispaltigFooter } from "./ZweispaltigFooter";
import { ZweispaltigHeader } from "./ZweispaltigHeader";
import { ZweispaltigSidebar } from "./ZweispaltigSidebar";

export function ZweispaltigPage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  photoSource,
  resumeProfile,
  sections,
}: ZweispaltigPageProps) {
  const { education, experiences, isContinuation } =
    createZweispaltigPageData(profile, plan);
  const summary = resolveZweispaltigSummary(profile, resumeProfile);
  const isLastPage = plan.pageNumber === totalPages;

  if (atsMode) {
    return (
      <main className="zweispaltig-ats" data-renderer="ats">
        <ZweispaltigHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {sections.profile && summary && !isContinuation ? (
          <section
            className="zweispaltig-section"
            data-element-id="zweispaltig.summary"
          >
            <h2 className="zweispaltig-section__title">
              Berufliches Profil
            </h2>
            <p>{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <ZweispaltigCareerSection
            title="Berufserfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <ZweispaltigCareerSection title="Ausbildung" items={education} />
        ) : null}
        {isLastPage ? (
          <ZweispaltigAdditionalSections
            profile={profile}
            sections={sections}
          />
        ) : null}
      </main>
    );
  }

  return (
    <div className="zweispaltig-page__visual" data-renderer="visual">
      <ZweispaltigHeader
        profile={profile}
        name={name}
        photoSource={photoSource}
        compact={isContinuation}
      />
      <div
        className={`zweispaltig-columns ${isContinuation ? "zweispaltig-columns--continuation" : ""}`}
      >
        <main className="zweispaltig-main">
          {sections.profile && summary && !isContinuation ? (
            <section
              className="zweispaltig-section"
              data-element-id="zweispaltig.summary"
            >
              <h2 className="zweispaltig-section__title">
                Zusammenfassung
              </h2>
              <p className="zweispaltig-summary">{summary}</p>
            </section>
          ) : null}
          {sections.experience ? (
            <ZweispaltigCareerSection
              title="Berufserfahrung"
              items={experiences}
              continuation={isContinuation}
            />
          ) : null}
          {sections.education ? (
            <ZweispaltigCareerSection title="Ausbildung" items={education} />
          ) : null}
          {!experiences.length &&
          !education.length &&
          plan.pageNumber === 1 ? (
            <p className="zweispaltig-empty">
              Berufserfahrung und Ausbildung im Profil ergänzen.
            </p>
          ) : null}
        </main>
        {!isContinuation ? (
          <ZweispaltigSidebar profile={profile} sections={sections} />
        ) : null}
      </div>
      <ZweispaltigFooter
        profile={profile}
        pageNumber={plan.pageNumber}
        totalPages={totalPages}
        atsMode={atsMode}
      />
    </div>
  );
}
