import {
  createIvyLeaguePageData,
  resolveIvyLeagueSummary,
  uniqueIvyLeagueValues,
} from "./ivy-league.model";
import type { IvyLeaguePageProps } from "./ivy-league.types";
import { IvyLeagueBackground } from "./IvyLeagueBackground";
import { IvyLeagueCareerSection } from "./IvyLeagueCareerSection";
import { IvyLeagueFooter } from "./IvyLeagueFooter";
import { IvyLeagueHeader } from "./IvyLeagueHeader";
import { IvyLeagueKnowledgeSection } from "./IvyLeagueKnowledgeSection";
import { IvyLeagueLanguagesSection } from "./IvyLeagueLanguagesSection";
import { IvyLeagueSectionHeading } from "./IvyLeagueSectionHeading";
import { IvyLeagueStrengthsSection } from "./IvyLeagueStrengthsSection";

export function IvyLeaguePage({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  backgroundId,
  resumeProfile,
  sections,
}: IvyLeaguePageProps) {
  const { education, experiences, isContinuation } =
    createIvyLeaguePageData(profile, plan);
  const summary = resolveIvyLeagueSummary(profile, resumeProfile);
  const certifications = uniqueIvyLeagueValues(
    profile?.certifications ?? [],
  );
  const isLastPage = plan.pageNumber === totalPages;
  const showWatercolor =
    backgroundId === "pastel-gradient" && !atsMode;

  const certificationSection =
    sections.certifications && certifications.length ? (
      <section
        className="ivy-league-section ivy-league-certifications"
        data-element-id="ivy-league.certifications"
      >
        <IvyLeagueSectionHeading>Zertifikate</IvyLeagueSectionHeading>
        <ul>
          {certifications.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
        </ul>
      </section>
    ) : null;

  if (atsMode) {
    return (
      <main className="ivy-league-ats" data-renderer="ats">
        <IvyLeagueHeader
          profile={profile}
          name={name}
          compact={isContinuation}
          atsMode
        />
        {sections.profile && summary && !isContinuation ? (
          <section
            className="ivy-league-section"
            data-element-id="ivy-league.summary"
          >
            <IvyLeagueSectionHeading>
              Zusammenfassung
            </IvyLeagueSectionHeading>
            <p className="ivy-league-summary">{summary}</p>
          </section>
        ) : null}
        {sections.experience ? (
          <IvyLeagueCareerSection
            title="Berufserfahrung"
            items={experiences}
            continuation={isContinuation}
            atsMode
          />
        ) : null}
        {sections.education ? (
          <IvyLeagueCareerSection
            title="Ausbildung"
            items={education}
            atsMode
          />
        ) : null}
        {isLastPage && sections.skills ? (
          <IvyLeagueKnowledgeSection profile={profile} />
        ) : null}
        {isLastPage && sections.languages ? (
          <IvyLeagueLanguagesSection profile={profile} atsMode />
        ) : null}
        {isLastPage && sections.skills ? (
          <IvyLeagueStrengthsSection profile={profile} atsMode />
        ) : null}
        {isLastPage ? certificationSection : null}
      </main>
    );
  }

  return (
    <div className="ivy-league-page__visual" data-renderer="visual">
      {showWatercolor ? <IvyLeagueBackground /> : null}
      <div className="ivy-league-content">
        <IvyLeagueHeader
          profile={profile}
          name={name}
          compact={isContinuation}
        />
        {sections.profile && summary && !isContinuation ? (
          <section
            className="ivy-league-section"
            data-element-id="ivy-league.summary"
          >
            <IvyLeagueSectionHeading>
              Zusammenfassung
            </IvyLeagueSectionHeading>
            <p className="ivy-league-summary">{summary}</p>
          </section>
        ) : null}
        {!isContinuation && sections.skills ? (
          <IvyLeagueStrengthsSection profile={profile} />
        ) : null}
        {sections.experience ? (
          <IvyLeagueCareerSection
            title="Berufserfahrung"
            items={experiences}
            continuation={isContinuation}
          />
        ) : null}
        {sections.education ? (
          <IvyLeagueCareerSection
            title="Ausbildung"
            items={education}
          />
        ) : null}
        {isLastPage && sections.skills ? (
          <IvyLeagueKnowledgeSection profile={profile} />
        ) : null}
        {isLastPage && sections.languages ? (
          <IvyLeagueLanguagesSection profile={profile} />
        ) : null}
        {isLastPage ? certificationSection : null}
        {!experiences.length &&
        !education.length &&
        plan.pageNumber === 1 ? (
          <p className="ivy-league-empty">
            Berufserfahrung und Ausbildung im Profil ergänzen.
          </p>
        ) : null}
      </div>
      <IvyLeagueFooter
        profile={profile}
        pageNumber={plan.pageNumber}
        totalPages={totalPages}
      />
    </div>
  );
}
