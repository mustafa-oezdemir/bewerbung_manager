import { ContactIcon } from "../ContactIcon";
import type { ApplicantProfile } from "../../../../shared/schema";
import { toTemplateExternalHref } from "../resume-template-data";

export function EinfachHeader({
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
  const profession = profile?.title.trim() ?? "";
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
      icon: "↗",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toTemplateExternalHref(profile.linkedin)
        : "",
    },
    {
      kind: "website",
      icon: "⌖",
      value: profile?.portfolio || profile?.github,
      href:
        profile?.portfolio || profile?.github
          ? toTemplateExternalHref(
              profile?.portfolio || profile?.github || "",
            )
          : "",
    },
    { kind: "location", icon: "⌾", value: location, href: "" },
    { kind: "birth", icon: "☆", value: birth, href: "" },
  ].filter((item) => item.value?.trim());
  return (
    <header
      className={`einfach-header ${compact ? "einfach-header--compact" : ""} ${!photoSource || atsMode ? "einfach-header--no-photo" : ""}`}
      data-element-id="einspaltig.header"
    >
      <div>
        {compact ? <p>Lebenslauf · Fortsetzung</p> : null}
        <h1>{name}</h1>
        {profession ? <h2>{profession}</h2> : null}
        {!compact && contacts.length ? (
          <address>
            {contacts.map((contact, index) => (
              <span
                data-contact-kind={contact.kind}
                key={`${contact.value}-${index}`}
              >
                <i aria-hidden="true"><ContactIcon {...contact} /></i>
                {contact.href ? (
                  <a href={contact.href}>{contact.value}</a>
                ) : (
                  <span>{contact.value}</span>
                )}
              </span>
            ))}
          </address>
        ) : null}
      </div>
      {!compact && !atsMode && photoSource ? (
        <figure data-element-id="einspaltig.photo">
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
