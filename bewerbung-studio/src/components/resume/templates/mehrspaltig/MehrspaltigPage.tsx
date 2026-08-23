import {
  createTemplatePageData,
  resolveTemplateSummary,
  toTemplateExternalHref,
} from "../resume-template-data";
import { MehrspaltigBackground } from "./MehrspaltigBackground";
import { MehrspaltigHeader } from "./MehrspaltigHeader";
import { ResumeSpecialSections } from "../../ResumeSpecialSections";
import {
  MehrspaltigCareer,
  MehrspaltigCertifications,
  MehrspaltigHeading,
  MehrspaltigKnowledge,
  MehrspaltigLanguages,
  MehrspaltigStrengths,
} from "./MehrspaltigSections";
import type { MehrspaltigResumeProps } from "./mehrspaltig.types";
import {
  getProfileResumeSectionLayout,
  getResumeSectionTitle,
  hasSavedTemplateSectionLayout,
  type ResumeSectionType,
  type SectionZone,
} from "../../../../features/resume-sections/resume-sections";

type Props = Omit<MehrspaltigResumeProps, "accentColor" | "secondaryColor">;

export function MehrspaltigPage({
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
  const hasCustomLayout = hasSavedTemplateSectionLayout(profile, "mehrspaltig");
  const savedLayout = getProfileResumeSectionLayout(profile, "mehrspaltig");
  const visualLayout = hasCustomLayout
    ? savedLayout
    : [
        { type: "summary", zone: "left-sidebar" },
        { type: "knowledge", zone: "left-sidebar" },
        { type: "languages", zone: "left-sidebar" },
        { type: "experience", zone: "main" },
        { type: "education", zone: "main" },
        { type: "certifications", zone: "main" },
        { type: "strengths", zone: "right-sidebar" },
      ] as const;
  const renderSection = (type: ResumeSectionType, mode: "visual" | "ats") => {
    if (type === "summary") return sections.profile && summary && !isContinuation ? <section key={type} className="mehrspaltig-section" data-element-id="mehrspaltig.summary"><MehrspaltigHeading>{getResumeSectionTitle(profile, "summary")}</MehrspaltigHeading><p className="mehrspaltig-summary">{summary}</p></section> : null;
    if (type === "strengths") return sections.strengths && !isContinuation ? <MehrspaltigStrengths key={type} profile={profile} atsMode={mode === "ats"} /> : null;
    if (type === "experience") return sections.experience ? <MehrspaltigCareer key={type} kind="experience" title={getResumeSectionTitle(profile, "experience")} items={experiences} continuation={isContinuation} /> : null;
    if (type === "education") return sections.education ? <MehrspaltigCareer key={type} kind="education" title={getResumeSectionTitle(profile, "education")} items={education} /> : null;
    if (type === "knowledge") return isLastPage && sections.skills ? <MehrspaltigKnowledge key={type} profile={profile} /> : null;
    if (type === "languages") return isLastPage && sections.languages ? <MehrspaltigLanguages key={type} profile={profile} atsMode={mode === "ats"} /> : null;
    if (type === "certifications") return isLastPage && sections.certifications ? <MehrspaltigCertifications key={type} profile={profile} /> : null;
    return null;
  };
  const renderZone = (zone: SectionZone) => visualLayout.filter((item) => item.zone === zone).map(({ type }) => renderSection(type, "visual"));
  const visualBody = (
    <div className={`mehrspaltig-columns ${isContinuation ? "mehrspaltig-columns--continuation" : ""}`}>
      {!isContinuation ? <aside className="mehrspaltig-column mehrspaltig-column--left">
        {renderZone("left-sidebar")}
      </aside> : null}
      <main className="mehrspaltig-column mehrspaltig-column--main">
        {isContinuation ? (["experience", "education"] as const).map((type) => renderSection(type, "visual")) : renderZone("main")}
      </main>
      {!isContinuation ? <aside className="mehrspaltig-column mehrspaltig-column--right">
        {renderZone("right-sidebar")}
      </aside> : null}
    </div>
  );
  if (atsMode) {
    return (
      <main className="mehrspaltig-ats" data-renderer="ats">
        <MehrspaltigHeader
          profile={profile}
          name={name}
          photoSource={null}
          compact={isContinuation}
          atsMode
        />
        {!isContinuation && profile ? (
          <section className="mehrspaltig-section">
            <MehrspaltigHeading>Persönliche Daten</MehrspaltigHeading>
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
        {(hasCustomLayout ? savedLayout.map(({ type }) => type) : ["summary", "experience", "education", "knowledge", "languages", "strengths", "certifications"]).map((type) => renderSection(type as ResumeSectionType, "ats"))}
        {isLastPage ? <ResumeSpecialSections profile={profile} sectionClassName="mehrspaltig-section" headingClassName="mehrspaltig-section__title" /> : null}
      </main>
    );
  }
  return (
    <div className="mehrspaltig-page__visual" data-renderer="visual">
      {!isContinuation && backgroundId === "classic-soft-blue-waves" ? (
        <MehrspaltigBackground />
      ) : null}
      <div className="mehrspaltig-content">
        <MehrspaltigHeader
          profile={profile}
          name={name}
          photoSource={photoSource}
          compact={isContinuation}
        />
        {visualBody}
        {isLastPage ? <ResumeSpecialSections profile={profile} sectionClassName="mehrspaltig-section" headingClassName="mehrspaltig-section__title" /> : null}
      </div>
      <footer className="mehrspaltig-footer" data-element-id="mehrspaltig.footer">
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
