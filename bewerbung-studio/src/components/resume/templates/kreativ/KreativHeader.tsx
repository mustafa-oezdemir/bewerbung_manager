import { toKreativExternalHref } from "./kreativ.model";
import type { KreativHeaderProps } from "./kreativ.types";

export function KreativHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: KreativHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
  const birth = [profile?.birthDate, profile?.birthPlace]
    .filter(Boolean)
    .join(", ");
  const contacts = [
    {
      label: "Telefon",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      label: "E-Mail",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      label: "LinkedIn",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toKreativExternalHref(profile.linkedin)
        : "",
    },
    { label: "Wohnort", value: location, href: "" },
    { label: "Geboren", value: birth, href: "" },
  ].filter((contact) => contact.value?.trim());

  return (
    <header
      className={`kreativ-header ${compact ? "kreativ-header--compact" : ""} ${!photoSource || atsMode ? "kreativ-header--no-photo" : ""}`}
      data-element-id="kreativ.header"
    >
      <div className="kreativ-header__identity">
        {compact ? (
          <p className="kreativ-header__kicker">
            Lebenslauf · Fortsetzung
          </p>
        ) : null}
        <h1>{name}</h1>
        {profile?.title ? <h2>{profile.title}</h2> : null}
        {!compact && contacts.length ? (
          <address className="kreativ-header__contacts">
            {contacts.map((contact) =>
              contact.href ? (
                <a href={contact.href} key={contact.label}>
                  <strong>{contact.label}</strong>
                  <span>{contact.value}</span>
                </a>
              ) : (
                <span key={contact.label}>
                  <strong>{contact.label}</strong>
                  <span>{contact.value}</span>
                </span>
              ),
            )}
          </address>
        ) : null}
      </div>
      {!compact && !atsMode && photoSource ? (
        <figure
          className="kreativ-header__photo"
          data-element-id="kreativ.photo"
        >
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
