import type { CSSProperties, ReactNode } from "react";
import type { ApplicantProfile } from "../../../../shared/schema";
import {
  formatTemplateDateRange,
  getTemplateKnowledge,
  parseTemplateLanguage,
  parseTemplateStrengths,
  uniqueTemplateValues,
  type TemplateCareerItem,
} from "../resume-template-data";

export function MehrspaltigHeading({ children }: { children: ReactNode }) {
  return <h2 className="mehrspaltig-section__title">{children}</h2>;
}

export function MehrspaltigStrengths({
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
      className={`mehrspaltig-section mehrspaltig-strengths ${atsMode ? "mehrspaltig-strengths--ats" : ""}`}
      data-element-id="mehrspaltig.strengths"
    >
      <MehrspaltigHeading>Stärken</MehrspaltigHeading>
      <div>
        {strengths.map((strength, index) => (
          <article key={`${strength.title}-${strength.description}`}>
            {!atsMode ? <i aria-hidden="true">{["✦", "⚑", "♡", "↗"][index % 4]}</i> : null}
            <h3>{strength.title}</h3>
            {strength.description ? <p>{strength.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function MehrspaltigCareer({
  title,
  items,
  continuation = false,
}: {
  title: "Erfahrung" | "Ausbildung";
  items: TemplateCareerItem[];
  continuation?: boolean;
}) {
  if (!items.length) return null;
  const isEducation = title === "Ausbildung";
  return (
    <section
      className={`mehrspaltig-section mehrspaltig-career ${isEducation ? "mehrspaltig-career--education" : ""}`}
      data-element-id={`mehrspaltig.${isEducation ? "education" : "experience"}`}
    >
      <MehrspaltigHeading>
        {title}
        {continuation ? " · Fortsetzung" : ""}
      </MehrspaltigHeading>
      <div>
        {items.map((item) => (
          <article key={item.id}>
            <div className="mehrspaltig-career__heading">
              <div>
                <h3>{item.title}</h3>
                <h4>{item.organization}</h4>
              </div>
              <p>{item.city ? <span>⌖ {item.city}</span> : null}<time>▣ {formatTemplateDateRange(item.from, item.to)}</time></p>
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

export function MehrspaltigKnowledge({
  profile,
}: {
  profile: ApplicantProfile | undefined;
}) {
  const promotedStrengths = new Set(
    uniqueTemplateValues(profile?.skills ?? []).slice(0, 3),
  );
  const knowledge = getTemplateKnowledge(profile).filter(
    (item) => !promotedStrengths.has(item),
  );
  if (!knowledge.length) return null;
  return (
    <section className="mehrspaltig-section" data-element-id="mehrspaltig.skills">
      <MehrspaltigHeading>Fähigkeiten</MehrspaltigHeading>
      <div className="mehrspaltig-knowledge">{knowledge.map((item) => <strong key={item}>{item}</strong>)}</div>
    </section>
  );
}

export function MehrspaltigLanguages({
  profile,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  atsMode?: boolean;
}) {
  const languages = uniqueTemplateValues(profile?.languages ?? []).map(
    parseTemplateLanguage,
  );
  if (!languages.length) return null;
  return (
    <section
      className={`mehrspaltig-section mehrspaltig-languages ${atsMode ? "mehrspaltig-languages--ats" : ""}`}
      data-element-id="mehrspaltig.languages"
    >
      <MehrspaltigHeading>Sprachen</MehrspaltigHeading>
      <div>
        {languages.map((language) => (
          <p key={language.raw}>
            <strong>{language.name}</strong>
            {language.level ? <span>{language.level}</span> : null}
            {!atsMode ? <em aria-label={`${language.score} von 5`}><i style={{ "--score": language.score } as CSSProperties} /></em> : null}
          </p>
        ))}
      </div>
    </section>
  );
}

export function MehrspaltigCertifications({
  profile,
}: {
  profile: ApplicantProfile | undefined;
}) {
  const certifications = uniqueTemplateValues(profile?.certifications ?? []);
  if (!certifications.length) return null;
  return (
    <section className="mehrspaltig-section" data-element-id="mehrspaltig.certifications">
      <MehrspaltigHeading>Zertifikate</MehrspaltigHeading>
      <ul>
        {certifications.map((certification) => (
          <li key={certification}>{certification}</li>
        ))}
      </ul>
    </section>
  );
}

