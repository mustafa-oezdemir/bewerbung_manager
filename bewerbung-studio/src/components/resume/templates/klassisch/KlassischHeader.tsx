import type { ApplicantProfile } from "../../../../shared/schema";
import {
  parseTemplateStrengths,
  toTemplateExternalHref,
} from "../resume-template-data";

export function KlassischHeader({
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
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      kind: "email",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      kind: "linkedin",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toTemplateExternalHref(profile.linkedin)
        : "",
    },
    { kind: "location", value: location, href: "" },
    { kind: "birth", value: birth, href: "" },
  ].filter((item) => item.value?.trim());

  return (
    <header
      className={`klassisch-header ${compact ? "klassisch-header--compact" : ""} ${!photoSource || atsMode ? "klassisch-header--no-photo" : ""}`}
      data-element-id="klassisch.header"
    >
      <div className="klassisch-header__identity">
        {compact ? <p>Lebenslauf · Fortsetzung</p> : null}
        <h1>{name}</h1>
        {profession ? <h2>{profession}</h2> : null}
        {!compact && !atsMode && contacts.length ? (
          <address>
            {contacts.map((contact, index) => (
              <span
                data-contact-kind={contact.kind}
                key={`${contact.value}-${index}`}
              >
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
        <figure data-element-id="klassisch.photo">
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
