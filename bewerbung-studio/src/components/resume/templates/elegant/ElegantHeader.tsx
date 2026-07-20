import { toElegantExternalHref } from "./elegant.model";
import type { ElegantHeaderProps } from "./elegant.types";

export function ElegantHeader({
  profile,
  name,
  compact = false,
}: ElegantHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={`elegant-header ${compact ? "elegant-header--compact" : ""}`}
      data-element-id="elegant.header"
    >
      <p className="elegant-header__kicker">
        {compact ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}
      </p>
      <h1 className="elegant-header__name">{name}</h1>
      {profile?.title ? (
        <p className="elegant-header__title">{profile.title}</p>
      ) : null}

      {!compact &&
      (profile?.phone ||
        profile?.email ||
        profile?.linkedin ||
        profile?.github ||
        profile?.portfolio ||
        location) ? (
        <address className="elegant-header__contacts">
          {profile?.phone ? (
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
              <strong>Telefon</strong>
              <span>{profile.phone}</span>
            </a>
          ) : null}
          {profile?.email ? (
            <a href={`mailto:${profile.email}`}>
              <strong>E-Mail</strong>
              <span>{profile.email}</span>
            </a>
          ) : null}
          {profile?.linkedin ? (
            <a href={toElegantExternalHref(profile.linkedin)}>
              <strong>LinkedIn</strong>
              <span>{profile.linkedin}</span>
            </a>
          ) : null}
          {profile?.github ? (
            <a href={toElegantExternalHref(profile.github)}>
              <strong>GitHub</strong>
              <span>{profile.github}</span>
            </a>
          ) : null}
          {profile?.portfolio ? (
            <a href={toElegantExternalHref(profile.portfolio)}>
              <strong>Portfolio</strong>
              <span>{profile.portfolio}</span>
            </a>
          ) : null}
          {location ? (
            <span>
              <strong>Ort</strong>
              <span>{location}</span>
            </span>
          ) : null}
        </address>
      ) : null}
    </header>
  );
}
