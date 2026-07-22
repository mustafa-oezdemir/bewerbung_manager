import type { ApplicantProfile } from "../../../../shared/schema";
import {
  parseTemplateStrengths,
  toTemplateExternalHref,
} from "../resume-template-data";

export function MehrspaltigHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  name: string;
  photoSource: string | null;
  compact?: boolean;
  atsMode?: boolean;
}) {
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const birth =
    profile?.birthDate || profile?.birthPlace
      ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
      : "";
  const profession = [
    profile?.title,
    ...parseTemplateStrengths(profile, 2).map((strength) => strength.title),
  ]
    .filter(Boolean)
    .join(" | ");
  const contacts = [
    {
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      value: profile?.portfolio || profile?.linkedin || profile?.github,
      href: profile?.portfolio || profile?.linkedin || profile?.github
        ? toTemplateExternalHref(profile.portfolio || profile.linkedin || profile.github || "")
        : "",
    },
    { value: location, href: "" },
    { value: birth, href: "" },
  ].filter((item) => item.value?.trim());

  return (
    <header
      className={`mehrspaltig-header ${compact ? "mehrspaltig-header--compact" : ""} ${!photoSource || atsMode ? "mehrspaltig-header--no-photo" : ""}`}
      data-element-id="mehrspaltig.header"
    >
      <div className="mehrspaltig-header__identity">
        {compact ? <p>Lebenslauf · Fortsetzung</p> : null}
        <h1>{name}</h1>
        {profession ? <h2>{profession}</h2> : null}
        {!compact && !atsMode && contacts.length ? (
          <address>
            {contacts.map((contact, index) => (
              <span className="mehrspaltig-header__contact" key={`${contact.value}-${index}`}>
                <i aria-hidden="true">{["☎", "@", "⌂", "⌖", "☆"][index]}</i>
                {contact.href ? (
                  <a href={contact.href}>{contact.value}</a>
                ) : (
                  contact.value
                )}
              </span>
            ))}
          </address>
        ) : null}
      </div>
      {!compact && !atsMode && photoSource ? (
        <figure data-element-id="mehrspaltig.photo">
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}

