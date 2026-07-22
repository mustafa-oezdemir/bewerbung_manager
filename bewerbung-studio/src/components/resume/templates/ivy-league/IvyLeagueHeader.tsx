import {
  toIvyLeagueExternalHref,
  uniqueIvyLeagueValues,
} from "./ivy-league.model";
import type { ApplicantProfile } from "../../../../shared/schema";

export function IvyLeagueHeader({
  profile,
  name,
  compact = false,
  atsMode = false,
}: {
  profile: ApplicantProfile | undefined;
  name: string;
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
  const specializations = uniqueIvyLeagueValues(profile?.skills ?? [])
    .slice(0, 3)
    .map((value) => value.split(/\s+(?:–|—|:)\s+/)[0])
    .join(" | ");
  const profession = [profile?.title, specializations]
    .filter(Boolean)
    .join(" | ");
  const professionalLink =
    profile?.linkedin || profile?.portfolio || profile?.github || "";
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
      value: professionalLink
        ? toIvyLeagueExternalHref(professionalLink)
        : "",
      href: professionalLink
        ? toIvyLeagueExternalHref(professionalLink)
        : "",
    },
    { value: location, href: "" },
    { value: birth, href: "" },
  ].filter((contact) => contact.value?.trim());

  return (
    <header
      className={`ivy-league-header ${compact ? "ivy-league-header--compact" : ""} ${atsMode ? "ivy-league-header--ats" : ""}`}
      data-element-id="ivy-league.header"
    >
      {compact ? <p>Lebenslauf · Fortsetzung</p> : null}
      <h1>{name}</h1>
      {profession ? <h2>{profession}</h2> : null}
      {!compact && contacts.length ? (
        <address className="ivy-league-header__contacts">
          {contacts.map((contact, index) => (
            <span
              className="ivy-league-header__contact"
              key={`${contact.value}-${index}`}
            >
              {index ? <i aria-hidden="true">•</i> : null}
              {contact.href ? (
                <a href={contact.href}>{contact.value}</a>
              ) : (
                <span>{contact.value}</span>
              )}
            </span>
          ))}
        </address>
      ) : null}
    </header>
  );
}
