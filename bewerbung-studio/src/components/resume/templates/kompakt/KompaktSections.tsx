import type { ApplicantProfile } from "../../../../shared/schema";
import {
  formatTemplateDateRange,
  getTemplateKnowledge,
  parseTemplateLanguage,
  parseTemplateStrengths,
  toTemplateExternalHref,
  uniqueTemplateValues,
  type TemplateCareerItem,
} from "../resume-template-data";

export function KompaktHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="kompakt-section__title">{children}</h2>;
}

export function KompaktCareer({
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
      className="kompakt-section kompakt-career"
      data-element-id={`kompakt.${title === "Erfahrung" ? "experience" : "education"}`}
    >
      <KompaktHeading>
        {title}
        {continuation ? " · Fortsetzung" : ""}
      </KompaktHeading>
      <div className="kompakt-career__list">
        {items.map((item) => (
          <article className="kompakt-career-entry" key={item.id}>
            <h3>{item.title}</h3>
            <div className="kompakt-career-entry__meta">
              <strong>{item.organization}</strong>
              <time>{formatTemplateDateRange(item.from, item.to)}</time>
              {item.city ? <span>{item.city}</span> : null}
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

const contactRows = (profile: ApplicantProfile | undefined) => {
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const linkedin = profile?.linkedin
    ? toTemplateExternalHref(profile.linkedin)
    : "";
  const websiteSource = profile?.portfolio || profile?.github || "";
  const website = websiteSource
    ? toTemplateExternalHref(websiteSource)
    : "";
  const birth =
    profile?.birthDate || profile?.birthPlace
      ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
      : "";
  return [
    {
      icon: "☎",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: "✉",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: "∞",
      value: linkedin,
      href: linkedin,
    },
    {
      icon: "⌖",
      value: website,
      href: website,
    },
    { icon: "◆", value: location, href: "" },
    { icon: "★", value: birth, href: "" },
  ].filter((item) => item.value?.trim());
};

export function KompaktRightColumn({
  profile,
  summary,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  summary: string;
  sections: ApplicantProfile["resumeSections"];
}) {
  const contacts = contactRows(profile);
  const strengths = parseTemplateStrengths(profile, 4);
  const achievements = uniqueTemplateValues(
    profile?.certifications ?? [],
  ).slice(0, 2);
  const skills = getTemplateKnowledge(profile);
  return (
    <aside className="kompakt-right">
      {contacts.length ? (
        <section
          className="kompakt-section kompakt-contacts"
          data-element-id="kompakt.contacts"
        >
          <KompaktHeading>Kontaktdaten</KompaktHeading>
          <address>
            {contacts.map((contact, index) => (
              <div key={`${contact.value}-${index}`}>
                <i aria-hidden="true">{contact.icon}</i>
                {contact.href ? (
                  <a href={contact.href}>{contact.value}</a>
                ) : (
                  <span>{contact.value}</span>
                )}
              </div>
            ))}
          </address>
        </section>
      ) : null}
      {sections.profile && summary ? (
        <section
          className="kompakt-section"
          data-element-id="kompakt.summary"
        >
          <KompaktHeading>Zusammenfassung</KompaktHeading>
          <p className="kompakt-summary">{summary}</p>
        </section>
      ) : null}
      {sections.skills && strengths.length ? (
        <section
          className="kompakt-section kompakt-strengths"
          data-element-id="kompakt.strengths"
        >
          <KompaktHeading>Stärken</KompaktHeading>
          {strengths.slice(0, 2).map((strength, index) => (
            <article key={strength.title}>
              <i aria-hidden="true">{index ? "⚑" : "★"}</i>
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
      {sections.certifications && achievements.length ? (
        <section
          className="kompakt-section kompakt-strengths"
          data-element-id="kompakt.achievements"
        >
          <KompaktHeading>Erfolge</KompaktHeading>
          {achievements.map((achievement, index) => (
            <article key={achievement}>
              <i aria-hidden="true">{index ? "★" : "♜"}</i>
              <div>
                <h3>{achievement}</h3>
              </div>
            </article>
          ))}
        </section>
      ) : null}
      {sections.skills && skills.length ? (
        <section
          className="kompakt-section"
          data-element-id="kompakt.skills"
        >
          <KompaktHeading>Fähigkeiten</KompaktHeading>
          <div className="kompakt-skills">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  );
}

export function KompaktLanguages({
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
      className="kompakt-section kompakt-languages"
      data-element-id="kompakt.languages"
    >
      <KompaktHeading>Sprachen</KompaktHeading>
      <div>
        {languages.map((language) => (
          <article key={language.raw}>
            {atsMode ? (
              <p>{language.raw}</p>
            ) : (
              <>
                <strong>{language.name}</strong>
                <span>{language.level}</span>
                <span className="kompakt-language__dots" aria-hidden="true">
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

export function KompaktAtsExtras({
  profile,
  sections,
}: {
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
}) {
  const skills = getTemplateKnowledge(profile);
  const strengths = parseTemplateStrengths(profile, 4);
  const achievements = uniqueTemplateValues(
    profile?.certifications ?? [],
  );
  return (
    <>
      {sections.skills && skills.length ? (
        <section className="kompakt-section">
          <KompaktHeading>Kenntnisse</KompaktHeading>
          <p>{skills.join(" · ")}</p>
        </section>
      ) : null}
      {sections.languages ? (
        <KompaktLanguages profile={profile} atsMode />
      ) : null}
      {sections.skills && strengths.length ? (
        <section className="kompakt-section">
          <KompaktHeading>Stärken</KompaktHeading>
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
      {sections.certifications && achievements.length ? (
        <section className="kompakt-section">
          <KompaktHeading>Erfolge und Zertifikate</KompaktHeading>
          <ul>
            {achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
