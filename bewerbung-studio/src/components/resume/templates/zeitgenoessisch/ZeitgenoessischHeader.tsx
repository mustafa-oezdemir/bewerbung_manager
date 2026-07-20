import {
  toZeitgenoessischExternalHref,
} from "./zeitgenoessisch.model";
import type { ZeitgenoessischHeaderProps } from "./zeitgenoessisch.types";
import { ZeitgenoessischPhoto } from "./ZeitgenoessischPhoto";

export function ZeitgenoessischHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: ZeitgenoessischHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
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
    { label: "Wohnort", value: location, href: "" },
    {
      label: "LinkedIn",
      value: profile?.linkedin,
      href: profile?.linkedin
        ? toZeitgenoessischExternalHref(profile.linkedin)
        : "",
    },
    {
      label: "Portfolio",
      value: profile?.portfolio,
      href: profile?.portfolio
        ? toZeitgenoessischExternalHref(profile.portfolio)
        : "",
    },
  ].filter((contact) => contact.value?.trim());

  return (
    <header
      className={`zeitgenoessisch-header ${compact ? "zeitgenoessisch-header--compact" : ""} ${!photoSource || atsMode ? "zeitgenoessisch-header--no-photo" : ""}`}
      data-element-id="zeitgenoessisch.header"
    >
      {!compact && !atsMode ? (
        <ZeitgenoessischPhoto photoSource={photoSource} name={name} />
      ) : null}
      <div className="zeitgenoessisch-header__identity">
        {compact ? (
          <p className="zeitgenoessisch-header__kicker">
            Lebenslauf · Fortsetzung
          </p>
        ) : null}
        <h1>{name}</h1>
        {profile?.title ? <p>{profile.title}</p> : null}
        {atsMode && !compact && contacts.length ? (
          <address className="zeitgenoessisch-header__contacts">
            {contacts.map((contact) =>
              contact.href ? (
                <a href={contact.href} key={contact.label}>
                  <strong>{contact.label}:</strong> {contact.value}
                </a>
              ) : (
                <span key={contact.label}>
                  <strong>{contact.label}:</strong> {contact.value}
                </span>
              ),
            )}
          </address>
        ) : null}
      </div>
    </header>
  );
}
