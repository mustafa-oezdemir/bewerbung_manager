import {
  createTemplatePageData,
  resolveTemplateSummary,
  toTemplateExternalHref,
} from "../resume-template-data";
import type { StilvollResumeProps } from "./stilvoll.types";
import { StilvollBackground } from "./StilvollBackground";
import { StilvollHeader } from "./StilvollHeader";
import {
  StilvollAtsExtras,
  StilvollCareer,
  StilvollHeading,
  StilvollLeftColumn,
} from "./StilvollSections";

type Props = Omit<StilvollResumeProps, "accentColor" | "secondaryColor">;

export function StilvollPage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  backgroundId,
  photoSource,
  resumeProfile,
  sections,
}: Props) {
  const { experiences, education, isContinuation } =
    createTemplatePageData(profile, plan);
  const summary = resolveTemplateSummary(profile, resumeProfile);
  const isLastPage = plan.pageNumber === totalPages;
  const portfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";
  const portfolioHref = portfolio
    ? toTemplateExternalHref(portfolio)
    : "";
  if (atsMode) {
    return (
      <main className="stilvoll-ats" data-renderer="ats">
        <StilvollHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {!isContinuation ? (
          <section className="stilvoll-section">
            <StilvollHeading>Persönliche Daten</StilvollHeading>
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
          <section className="stilvoll-section" data-element-id="stilvoll.summary">
            <StilvollHeading>Zusammenfassung</StilvollHeading>
            <p>{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <StilvollCareer
            title="Erfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <StilvollCareer title="Ausbildung" items={education} />
        ) : null}
        {isLastPage ? (
          <StilvollAtsExtras profile={profile} sections={sections} />
        ) : null}
      </main>
    );
  }
  return (
    <div className="stilvoll-page__visual" data-renderer="visual">
      {backgroundId === "geometric" ? <StilvollBackground /> : null}
      <StilvollHeader
        profile={profile}
        name={name}
        photoSource={photoSource}
        compact={isContinuation}
      />
      <div
        className={`stilvoll-content ${isContinuation ? "stilvoll-content--continuation" : ""}`}
      >
        {!isContinuation ? (
          <StilvollLeftColumn
            profile={profile}
            summary={summary}
            sections={sections}
          />
        ) : null}
        <main className="stilvoll-main">
          {sections.experience ? (
            <StilvollCareer
              title="Erfahrung"
              items={experiences}
              continuation={isContinuation}
            />
          ) : null}
          {sections.education ? (
            <StilvollCareer title="Ausbildung" items={education} />
          ) : null}
        </main>
      </div>
      <footer className="stilvoll-footer" data-element-id="stilvoll.footer">
        {portfolio ? (
          <a href={portfolioHref}>{portfolioHref}</a>
        ) : (
          <span />
        )}
        {totalPages > 1 ? (
          <span>
            Seite {plan.pageNumber} / {totalPages}
          </span>
        ) : null}
      </footer>
    </div>
  );
}
