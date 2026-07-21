import {
  createTemplatePageData,
  resolveTemplateSummary,
  toTemplateExternalHref,
} from "../resume-template-data";
import type { KompaktResumeProps } from "./kompakt.types";
import { KompaktBackground } from "./KompaktBackground";
import { KompaktHeader } from "./KompaktHeader";
import {
  KompaktAtsExtras,
  KompaktCareer,
  KompaktLanguages,
  KompaktRightColumn,
  KompaktHeading,
} from "./KompaktSections";

type Props = Omit<KompaktResumeProps, "accentColor" | "secondaryColor">;

export function KompaktPage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  backgroundId,
  resumeProfile,
  sections,
}: Props) {
  const { experiences, education, isContinuation } =
    createTemplatePageData(profile, plan);
  const summary = resolveTemplateSummary(profile, resumeProfile);
  const isLastPage = plan.pageNumber === totalPages;
  const portfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  if (atsMode) {
    return (
      <main className="kompakt-ats" data-renderer="ats">
        <KompaktHeader
          name={name}
          title={profile?.title}
          compact={isContinuation}
        />
        {!isContinuation ? (
          <section className="kompakt-section" data-element-id="kompakt.contacts">
            <KompaktHeading>Persönliche Daten</KompaktHeading>
            <p>
              {[
                profile?.phone,
                profile?.email,
                profile?.linkedin,
                [profile?.city, profile?.country].filter(Boolean).join(", "),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </section>
        ) : null}
        {sections.profile && summary && !isContinuation ? (
          <section className="kompakt-section" data-element-id="kompakt.summary">
            <KompaktHeading>Zusammenfassung</KompaktHeading>
            <p>{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <KompaktCareer
            title="Erfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <KompaktCareer title="Ausbildung" items={education} />
        ) : null}
        {isLastPage ? (
          <KompaktAtsExtras profile={profile} sections={sections} />
        ) : null}
      </main>
    );
  }

  return (
    <div className="kompakt-page__visual" data-renderer="visual">
      {backgroundId === "abstract" ? <KompaktBackground /> : null}
      <KompaktHeader
        name={name}
        title={profile?.title}
        compact={isContinuation}
      />
      <div
        className={`kompakt-content ${isContinuation ? "kompakt-content--continuation" : ""}`}
      >
        <main className="kompakt-left">
          {sections.experience ? (
            <KompaktCareer
              title="Erfahrung"
              items={experiences}
              continuation={isContinuation}
            />
          ) : null}
          {sections.education ? (
            <KompaktCareer title="Ausbildung" items={education} />
          ) : null}
          {isLastPage && sections.languages ? (
            <KompaktLanguages profile={profile} />
          ) : null}
        </main>
        {!isContinuation ? (
          <KompaktRightColumn
            profile={profile}
            summary={summary}
            sections={sections}
          />
        ) : null}
      </div>
      <footer className="kompakt-footer" data-element-id="kompakt.footer">
        {portfolio ? (
          <a href={toTemplateExternalHref(portfolio)}>{portfolio}</a>
        ) : (
          <span />
        )}
        <span>
          Seite {plan.pageNumber} / {totalPages}
        </span>
      </footer>
    </div>
  );
}
