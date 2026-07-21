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

export function EinfachHeading({
  children,
}: {
  children: ReactNode;
}) {
  return <h2 className="einfach-section__title">{children}</h2>;
}

export function EinfachStrengths({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const strengths = parseTemplateStrengths(profile, 4);
  if (!strengths.length) return null;
  return (
    <section
      className={`einfach-section einfach-strengths ${atsMode ? "einfach-strengths--ats" : ""}`}
      data-element-id="einfach.strengths"
    >
      <EinfachHeading>Stärken</EinfachHeading>
      <div>
        {strengths.map((strength, index) =>
          atsMode ? (
            <p key={strength.title}>
              <strong>{strength.title}</strong>
              {strength.description ? ` – ${strength.description}` : ""}
            </p>
          ) : (
            <article key={strength.title}>
              <i aria-hidden="true">{index % 2 ? "⚑" : "✣"}</i>
              <div>
                <h3>{strength.title}</h3>
                {strength.description ? (
                  <p>{strength.description}</p>
                ) : null}
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}

export function EinfachCareer({
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
      className="einfach-section einfach-career"
      data-element-id={`einfach.${title === "Erfahrung" ? "experience" : "education"}`}
    >
      <EinfachHeading>
        {title}
        {continuation ? " · Fortsetzung" : ""}
      </EinfachHeading>
      <div>
        {items.map((item) => (
          <article key={item.id}>
            <h3>{item.title}</h3>
            <h4>{item.organization}</h4>
            <p className="einfach-career__meta">
              <time>{formatTemplateDateRange(item.from, item.to)}</time>
              {item.city ? <span>{item.city}</span> : null}
            </p>
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

export function EinfachLanguages({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const languages = uniqueTemplateValues(
    profile?.languages ?? [],
  ).map(parseTemplateLanguage);
  if (!languages.length) return null;
  return (
    <section
      className={`einfach-section einfach-languages ${atsMode ? "einfach-languages--ats" : ""}`}
      data-element-id="einfach.languages"
    >
      <EinfachHeading>Sprachen</EinfachHeading>
      <div>
        {languages.map((language) => (
          <article key={language.raw}>
            {atsMode ? (
              <p>{language.raw}</p>
            ) : (
              <>
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
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function EinfachKnowledge({
  profile,
}: {
  profile: ApplicantProfile | undefined;
}) {
  const knowledge = getTemplateKnowledge(profile);
  if (!knowledge.length) return null;
  return (
    <section className="einfach-section" data-element-id="einfach.skills">
      <EinfachHeading>Kenntnisse</EinfachHeading>
      <p className="einfach-knowledge">{knowledge.join(" · ")}</p>
    </section>
  );
}

export function EinfachCertifications({
  profile,
}: {
  profile: ApplicantProfile | undefined;
}) {
  const certifications = uniqueTemplateValues(
    profile?.certifications ?? [],
  );
  if (!certifications.length) return null;
  return (
    <section className="einfach-section">
      <EinfachHeading>Zertifikate</EinfachHeading>
      <ul>
        {certifications.map((certification) => (
          <li key={certification}>{certification}</li>
        ))}
      </ul>
    </section>
  );
}
