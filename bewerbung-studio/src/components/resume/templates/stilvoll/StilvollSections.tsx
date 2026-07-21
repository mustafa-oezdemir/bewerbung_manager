import type { ReactNode } from "react";
import type { ApplicantProfile } from "../../../../shared/schema";
import {
  formatTemplateDateRange,
  getTemplateKnowledge,
  parseTemplateLanguage,
  parseTemplateStrengths,
  uniqueTemplateValues,
  type TemplateCareerItem,
} from "../resume-template-data";

export function StilvollHeading({
  children,
}: {
  children: ReactNode;
}) {
  return <h2 className="stilvoll-section__title">{children}</h2>;
}

export function StilvollCareer({
  title,
  items,
  continuation = false,
}: {
  title: "Erfahrung" | "Ausbildung";
  items: TemplateCareerItem[];
  continuation?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section
      className="stilvoll-section stilvoll-career"
      data-element-id={`stilvoll.${title === "Erfahrung" ? "experience" : "education"}`}
    >
      <StilvollHeading>
        {title}
        {continuation ? " · Fortsetzung" : ""}
      </StilvollHeading>
      <div className="stilvoll-career__list">
        {items.map((item) => (
          <article key={item.id}>
            <h3>{item.title}</h3>
            <div className="stilvoll-career__meta">
              <strong>{item.organization}</strong>
              <span>
                {formatTemplateDateRange(item.from, item.to)}
                {item.city ? ` · ${item.city}` : ""}
              </span>
            </div>
            {item.achievements.length ? (
              <ul>
                {item.achievements.map((achievement, index) => (
                  <li key={`${item.id}-${index}`}>{achievement}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function StilvollLeftColumn({
  profile,
  summary,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  summary: string;
  sections: ApplicantProfile["resumeSections"];
}) {
  const strengths = parseTemplateStrengths(profile, 4);
  const languages = uniqueTemplateValues(
    profile?.languages ?? [],
  ).map(parseTemplateLanguage);
  return (
    <aside className="stilvoll-left">
      {sections.profile && summary ? (
        <section
          className="stilvoll-section"
          data-element-id="stilvoll.summary"
        >
          <StilvollHeading>Zusammenfassung</StilvollHeading>
          <p className="stilvoll-summary">{summary}</p>
        </section>
      ) : null}
      {sections.skills && strengths.length ? (
        <section
          className="stilvoll-section stilvoll-strengths"
          data-element-id="stilvoll.strengths"
        >
          <StilvollHeading>Stärken</StilvollHeading>
          {strengths.map((strength, index) => (
            <article key={strength.title}>
              <i aria-hidden="true">
                {["♛", "♥", "↗", "◇"][index]}
              </i>
              <div>
                <h3>{strength.title}</h3>
                {strength.description ? (
                  <p>{strength.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      ) : null}
      {sections.languages && languages.length ? (
        <section
          className="stilvoll-section stilvoll-languages"
          data-element-id="stilvoll.languages"
        >
          <StilvollHeading>Sprachen</StilvollHeading>
          {languages.map((language) => (
            <article key={language.raw}>
              <strong>{language.name}</strong>
              <span>{language.level}</span>
              <span aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    className={index < language.score ? "filled" : ""}
                    key={index}
                  />
                ))}
              </span>
            </article>
          ))}
        </section>
      ) : null}
    </aside>
  );
}

export function StilvollAtsExtras({
  profile,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
}) {
  const knowledge = getTemplateKnowledge(profile);
  const languages = uniqueTemplateValues(profile?.languages ?? []);
  const strengths = parseTemplateStrengths(profile, 4);
  const certifications = uniqueTemplateValues(
    profile?.certifications ?? [],
  );
  return (
    <>
      {sections.skills && knowledge.length ? (
        <section className="stilvoll-section">
          <StilvollHeading>Kenntnisse</StilvollHeading>
          <p>{knowledge.join(" · ")}</p>
        </section>
      ) : null}
      {sections.languages && languages.length ? (
        <section className="stilvoll-section">
          <StilvollHeading>Sprachen</StilvollHeading>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {sections.skills && strengths.length ? (
        <section className="stilvoll-section">
          <StilvollHeading>Stärken</StilvollHeading>
          <ul>
            {strengths.map((strength) => (
              <li key={strength.title}>
                <strong>{strength.title}</strong>
                {strength.description
                  ? ` – ${strength.description}`
                  : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {sections.certifications && certifications.length ? (
        <section className="stilvoll-section">
          <StilvollHeading>Zertifikate</StilvollHeading>
          <ul>
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
