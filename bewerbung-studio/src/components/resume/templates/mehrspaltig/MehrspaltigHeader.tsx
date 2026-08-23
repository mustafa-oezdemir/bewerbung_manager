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
      kind: "phone",
      icon: "☎",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      kind: "email",
      icon: "@",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      kind: "linkedin",
      icon: "in",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toTemplateExternalHref(profile.linkedin)
        : "",
    },
    { kind: "location", icon: "⌖", value: location, href: "" },
    { kind: "birth", icon: "☆", value: birth, href: "" },
    {
      kind: "portfolio",
      icon: "↗",
      value: profile?.portfolio,
      href: profile?.portfolio
        ? toTemplateExternalHref(profile.portfolio)
        : "",
    },
    {
      kind: "github",
      icon: "⌂",
      value: profile?.github,
      href: profile?.github ? toTemplateExternalHref(profile.github) : "",
    },
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
              <span
                className="mehrspaltig-header__contact"
                data-contact-kind={contact.kind}
                key={`${contact.value}-${index}`}
              >
                <i aria-hidden="true">{contact.icon}</i>
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
