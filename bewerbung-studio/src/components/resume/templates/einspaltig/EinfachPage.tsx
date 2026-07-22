import {
  createTemplatePageData,
  resolveTemplateSummary,
  toTemplateExternalHref,
} from "../resume-template-data";
import type { EinspaltigResumeProps } from "./einfach.types";
import { EinfachBackground } from "./EinfachBackground";
import { EinfachHeader } from "./EinfachHeader";
import {
  EinfachCareer,
  EinfachCertifications,
  EinfachHeading,
  EinfachKnowledge,
  EinfachLanguages,
  EinfachStrengths,
} from "./EinfachSections";

type Props = Omit<EinspaltigResumeProps, "accentColor" | "secondaryColor">;

export function EinfachPage({
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
  const body = (
    <>
      {sections.profile && summary && !isContinuation ? (
        <section className="einfach-section" data-element-id="einspaltig.summary">
          <EinfachHeading>Zusammenfassung</EinfachHeading>
          <p className="einfach-summary">{summary}</p>
        </section>
      ) : null}
      {!atsMode && !isContinuation && sections.skills ? (
        <EinfachStrengths profile={profile} />
      ) : null}
      {sections.experience ? (
        <EinfachCareer
          title="Erfahrung"
          items={experiences}
          continuation={isContinuation}
        />
      ) : null}
      {sections.education ? (
        <EinfachCareer title="Ausbildung" items={education} />
      ) : null}
      {isLastPage && sections.skills ? (
        <EinfachKnowledge profile={profile} />
      ) : null}
      {isLastPage && sections.languages ? (
        <EinfachLanguages profile={profile} atsMode={atsMode} />
      ) : null}
      {atsMode && isLastPage && sections.skills ? (
        <EinfachStrengths profile={profile} atsMode />
      ) : null}
      {isLastPage && sections.certifications ? (
        <EinfachCertifications profile={profile} />
      ) : null}
    </>
  );
  if (atsMode) {
    return (
      <main className="einfach-ats" data-renderer="ats">
        <EinfachHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {!isContinuation ? (
          <section className="einfach-section">
            <EinfachHeading>Persönliche Daten</EinfachHeading>
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
        {body}
      </main>
    );
  }
  return (
    <div className="einfach-page__visual" data-renderer="visual">
      {backgroundId === "geometric" ? <EinfachBackground /> : null}
      <div className="einfach-content">
        <EinfachHeader
          profile={profile}
          name={name}
          photoSource={photoSource}
          compact={isContinuation}
        />
        {body}
      </div>
      <footer className="einfach-footer" data-element-id="einspaltig.footer">
        {portfolio ? (
          <a href={toTemplateExternalHref(portfolio)}>{portfolio}</a>
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
