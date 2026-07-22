import { toElegantExternalHref } from "./elegant.model";
import type { ElegantHeaderProps } from "./elegant.types";

export function ElegantHeader({
  profile,
  name,
  compact = false,
}: ElegantHeaderProps) {
  const cityAndCountry = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const location = [profile?.postalCode, cityAndCountry]
    .filter(Boolean)
    .join(" ");
  const birth =
    profile?.birthDate || profile?.birthPlace
      ? `${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
      : "";
  const website = profile?.portfolio || profile?.github || "";
  const contacts = [
    {
      icon: "☎",
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: "@",
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: "↗",
      value: profile?.linkedin
        ? toElegantExternalHref(profile.linkedin)
        : "",
      href: profile?.linkedin
        ? toElegantExternalHref(profile.linkedin)
        : "",
    },
    {
      icon: "⌖",
      value: website ? toElegantExternalHref(website) : "",
      href: website ? toElegantExternalHref(website) : "",
    },
    { icon: "◆", value: location, href: "" },
    { icon: "☆", value: birth, href: "" },
  ].filter((contact) => contact.value.trim());

  return (
    <header
      className={`elegant-header ${compact ? "elegant-header--compact" : ""}`}
      data-element-id="elegant.header"
    >
      {compact ? (
        <p className="elegant-header__kicker">
          Lebenslauf · Fortsetzung
        </p>
      ) : null}
      <h1 className="elegant-header__name">{name}</h1>
      {profile?.title ? (
        <p className="elegant-header__title">{profile.title}</p>
      ) : null}

      {!compact && contacts.length ? (
        <address className="elegant-header__contacts">
          {contacts.map((contact, index) => {
            const content = (
              <>
                <i aria-hidden="true">{contact.icon}</i>
                <span>{contact.value}</span>
              </>
            );
            return contact.href ? (
              <a href={contact.href} key={`${contact.value}-${index}`}>
                {content}
              </a>
            ) : (
              <span key={`${contact.value}-${index}`}>{content}</span>
            );
          })}
        </address>
      ) : null}
    </header>
  );
}
