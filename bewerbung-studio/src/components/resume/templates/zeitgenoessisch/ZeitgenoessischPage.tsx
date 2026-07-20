import {
  createZeitgenoessischPageData,
  resolveZeitgenoessischSummary,
} from "./zeitgenoessisch.model";
import type { ZeitgenoessischPageProps } from "./zeitgenoessisch.types";
import { ZeitgenoessischAdditionalSections } from "./ZeitgenoessischAdditionalSections";
import { ZeitgenoessischCareerSection } from "./ZeitgenoessischCareerSection";
import { ZeitgenoessischFooter } from "./ZeitgenoessischFooter";
import { ZeitgenoessischHeader } from "./ZeitgenoessischHeader";
import { ZeitgenoessischLeftColumn } from "./ZeitgenoessischLeftColumn";
import { ZeitgenoessischSectionHeading } from "./ZeitgenoessischSectionHeading";

export function ZeitgenoessischPage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  photoSource,
  resumeProfile,
  sections,
}: ZeitgenoessischPageProps) {
  const { education, experiences, isContinuation } =
    createZeitgenoessischPageData(profile, plan);
  const summary = resolveZeitgenoessischSummary(profile, resumeProfile);
  const isLastPage = plan.pageNumber === totalPages;

  if (atsMode) {
    return (
      <main className="zeitgenoessisch-ats" data-renderer="ats">
        <ZeitgenoessischHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {sections.profile && summary && !isContinuation ? (
          <section
            className="zeitgenoessisch-section"
            data-element-id="zeitgenoessisch.summary"
          >
            <ZeitgenoessischSectionHeading
              title="Zusammenfassung"
              icon="summary"
            />
            <p className="zeitgenoessisch-summary">{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <ZeitgenoessischCareerSection
            title="Berufserfahrung"
            items={experiences}
            continuation={isContinuation}
            atsMode
          />
        ) : null}
        {sections.education ? (
          <ZeitgenoessischCareerSection
            title="Ausbildung"
            items={education}
            atsMode
          />
        ) : null}
        {isLastPage ? (
          <ZeitgenoessischAdditionalSections
            profile={profile}
            sections={sections}
          />
        ) : null}
      </main>
    );
  }

  return (
    <div className="zeitgenoessisch-page__visual" data-renderer="visual">
      <ZeitgenoessischHeader
        profile={profile}
        name={name}
        photoSource={photoSource}
        compact={isContinuation}
      />
      <div
        className={`zeitgenoessisch-columns ${isContinuation ? "zeitgenoessisch-columns--continuation" : ""}`}
      >
        {!isContinuation ? (
          <ZeitgenoessischLeftColumn
            profile={profile}
            sections={sections}
          />
        ) : null}
        <main className="zeitgenoessisch-main-column">
          {sections.profile && summary && !isContinuation ? (
            <section
              className="zeitgenoessisch-section"
              data-element-id="zeitgenoessisch.summary"
            >
              <ZeitgenoessischSectionHeading
                title="Zusammenfassung"
                icon="summary"
              />
              <p className="zeitgenoessisch-summary">{summary}</p>
            </section>
          ) : null}
          {sections.experience ? (
            <ZeitgenoessischCareerSection
              title="Berufserfahrung"
              items={experiences}
              continuation={isContinuation}
            />
          ) : null}
          {sections.education ? (
            <ZeitgenoessischCareerSection
              title="Ausbildung"
              items={education}
            />
          ) : null}
          {!experiences.length &&
          !education.length &&
          plan.pageNumber === 1 ? (
            <p className="zeitgenoessisch-empty">
              Berufserfahrung und Ausbildung im Profil ergänzen.
            </p>
          ) : null}
        </main>
      </div>
      <ZeitgenoessischFooter
        profile={profile}
        pageNumber={plan.pageNumber}
        totalPages={totalPages}
        atsMode={atsMode}
      />
    </div>
  );
}
