import {
  createTemplatePageData,
  resolveTemplateSummary,
  toTemplateExternalHref,
} from "../resume-template-data";
import { KlassischBackground } from "./KlassischBackground";
import { KlassischHeader } from "./KlassischHeader";
import {
  KlassischCareer,
  KlassischCertifications,
  KlassischHeading,
  KlassischKnowledge,
  KlassischLanguages,
  KlassischStrengths,
} from "./KlassischSections";
import type { KlassischResumeProps } from "./klassisch.types";

type Props = Omit<KlassischResumeProps, "accentColor" | "secondaryColor">;

export function KlassischPage({
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
  const portfolio = profile?.portfolio || profile?.github || profile?.linkedin || "";
  const visualBody = (
    <div className={`klassisch-columns ${isContinuation ? "klassisch-columns--continuation" : ""}`}>
      {!isContinuation ? <aside className="klassisch-column klassisch-column--left">
        {sections.profile && summary ? <section className="klassisch-section" data-element-id="klassisch.summary"><KlassischHeading>Zusammenfassung</KlassischHeading><p className="klassisch-summary">{summary}</p></section> : null}
        {sections.skills ? <KlassischKnowledge profile={profile} /> : null}
        {isLastPage && sections.languages ? <KlassischLanguages profile={profile} /> : null}
      </aside> : null}
      <main className="klassisch-column klassisch-column--main">
        {sections.experience ? <KlassischCareer title="Erfahrung" items={experiences} continuation={isContinuation} /> : null}
        {sections.education ? <KlassischCareer title="Ausbildung" items={education} /> : null}
        {isLastPage && sections.certifications ? <KlassischCertifications profile={profile} /> : null}
      </main>
      {!isContinuation ? <aside className="klassisch-column klassisch-column--right">
        {sections.skills ? <KlassischStrengths profile={profile} /> : null}
      </aside> : null}
    </div>
  );
  if (atsMode) {
    return (
      <main className="klassisch-ats" data-renderer="ats">
        <KlassischHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {!isContinuation && profile ? (
          <section className="klassisch-section">
            <KlassischHeading>Persönliche Daten</KlassischHeading>
            <p>
              {[
                profile.phone,
                profile.email,
                profile.linkedin,
                [profile.city, profile.country].filter(Boolean).join(", "),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </section>
        ) : null}
        {sections.profile && summary && !isContinuation ? (
          <section className="klassisch-section">
            <KlassischHeading>Zusammenfassung</KlassischHeading>
            <p>{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <KlassischCareer
            title="Erfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <KlassischCareer title="Ausbildung" items={education} />
        ) : null}
        {isLastPage && sections.skills ? (
          <KlassischKnowledge profile={profile} />
        ) : null}
        {isLastPage && sections.languages ? (
          <KlassischLanguages profile={profile} atsMode />
        ) : null}
        {isLastPage && sections.skills ? (
          <KlassischStrengths profile={profile} atsMode />
        ) : null}
        {isLastPage && sections.certifications ? (
          <KlassischCertifications profile={profile} />
        ) : null}
      </main>
    );
  }
  return (
    <div className="klassisch-page__visual" data-renderer="visual">
      {!isContinuation && backgroundId === "classic-soft-blue-waves" ? (
        <KlassischBackground />
      ) : null}
      <div className="klassisch-content">
        <KlassischHeader
          profile={profile}
          name={name}
          photoSource={photoSource}
          compact={isContinuation}
        />
        {visualBody}
      </div>
      <footer className="klassisch-footer" data-element-id="klassisch.footer">
        {portfolio ? (
          <a href={toTemplateExternalHref(portfolio)}>{portfolio}</a>
        ) : (
          <span />
        )}
        {totalPages > 1 ? (
          <span>Seite {plan.pageNumber} / {totalPages}</span>
        ) : null}
      </footer>
    </div>
  );
}
