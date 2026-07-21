import type { CSSProperties } from "react";
import {
  getTemplateKnowledge,
  parseTemplateStrengths,
  resolveTemplateSummary,
  uniqueTemplateValues,
} from "../resume-template-data";
import type { ModernResumeProps } from "./modern.types";
import { ModernContactSection } from "./ModernContactSection";
import { ModernEducationSection } from "./ModernEducationSection";
import { ModernExperienceSection } from "./ModernExperienceSection";
import { ModernFooter } from "./ModernFooter";
import { ModernHeader } from "./ModernHeader";
import { ModernLanguagesSection } from "./ModernLanguagesSection";
import { ModernLeftColumn } from "./ModernLeftColumn";
import { ModernRightColumn } from "./ModernRightColumn";
import { ModernStrengthsSection } from "./ModernStrengthsSection";
import { ModernSummarySection } from "./ModernSummarySection";
import "./modern.css";

export function ModernResume({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  accentColor,
  secondaryColor,
  photoSource,
  resumeProfile,
  sections,
}: ModernResumeProps) {
  const isContinuation = plan.pageNumber > 1;
  const isLastPage = plan.pageNumber === totalPages;
  const experienceIds = new Set(
    plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => item.id),
  );
  const educationIds = new Set(
    plan.items
      .filter((item) => item.kind === "education")
      .map((item) => item.id),
  );
  const pageProfile = profile
    ? {
        ...profile,
        summary: sections.profile
          ? resolveTemplateSummary(profile, resumeProfile)
          : "",
        experiences: sections.experience
          ? profile.experiences.filter((item) => experienceIds.has(item.id))
          : [],
        education: sections.education
          ? profile.education.filter((item) => educationIds.has(item.id))
          : [],
        skills: sections.skills ? profile.skills : [],
        languages: sections.languages ? profile.languages : [],
        certifications: sections.certifications
          ? profile.certifications
          : [],
      }
    : undefined;
  const cssVariables = {
    "--modern-primary": accentColor,
    "--modern-primary-soft": secondaryColor,
  } as CSSProperties;
  const portfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  if (atsMode) {
    const knowledge = getTemplateKnowledge(profile);
    const strengths = parseTemplateStrengths(profile, 4);
    const certifications = uniqueTemplateValues(
      profile?.certifications ?? [],
    );
    return (
      <article
        className="modern-resume-page modern-resume-page--ats"
        data-ats-mode="true"
        data-continuation={isContinuation}
        data-density={plan.density}
        style={cssVariables}
      >
        <div className="modern-resume-container">
          <main className="modern-resume-content modern-resume-ats">
            <ModernHeader
              name={name}
              profile={profile}
              accentColor={accentColor}
              atsMode
              compact={isContinuation}
            />
            {!isContinuation ? (
              <>
                <ModernContactSection
                  profile={profile}
                  accentColor={accentColor}
                  atsMode
                />
                {sections.profile ? (
                  <ModernSummarySection profile={pageProfile} />
                ) : null}
              </>
            ) : null}
            {sections.experience ? (
              <ModernExperienceSection profile={pageProfile} />
            ) : null}
            {sections.education ? (
              <ModernEducationSection profile={pageProfile} />
            ) : null}
            {isLastPage && sections.skills && knowledge.length ? (
              <section className="modern-section">
                <h2 className="modern-section__title">Kenntnisse</h2>
                <p className="modern-summary-text">{knowledge.join(" · ")}</p>
              </section>
            ) : null}
            {isLastPage && sections.languages ? (
              <ModernLanguagesSection
                profile={pageProfile}
                accentColor={accentColor}
                atsMode
              />
            ) : null}
            {isLastPage && sections.skills && strengths.length ? (
              <ModernStrengthsSection profile={pageProfile} />
            ) : null}
            {isLastPage && sections.certifications && certifications.length ? (
              <section className="modern-section">
                <h2 className="modern-section__title">Zertifikate</h2>
                <ul className="modern-ats-list">
                  {certifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </main>
          <ModernFooter
            pageNumber={plan.pageNumber}
            totalPages={totalPages}
            portfolio={portfolio}
            atsMode
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className="modern-resume-page"
      data-ats-mode="false"
      data-continuation={isContinuation}
      data-density={plan.density}
      style={cssVariables}
    >
      <div className="modern-resume-container">
        <div className="modern-resume-content">
          <ModernHeader
            name={name}
            profile={profile}
            accentColor={accentColor}
            photoSource={photoSource}
            atsMode={false}
            compact={isContinuation}
          />
          {!isContinuation ? (
            <ModernContactSection
              profile={profile}
              accentColor={accentColor}
              atsMode={false}
              inline
            />
          ) : null}
          <div
            className="modern-resume-main"
            data-continuation={isContinuation}
          >
            <ModernLeftColumn
              profile={pageProfile}
              atsMode={false}
              showSummary={!isContinuation && sections.profile}
            />
            {!isContinuation ? (
              <ModernRightColumn
                profile={pageProfile}
                accentColor={accentColor}
                atsMode={false}
              />
            ) : null}
          </div>
        </div>
        <ModernFooter
          pageNumber={plan.pageNumber}
          totalPages={totalPages}
          portfolio={portfolio}
          atsMode={false}
        />
      </div>
    </article>
  );
}
