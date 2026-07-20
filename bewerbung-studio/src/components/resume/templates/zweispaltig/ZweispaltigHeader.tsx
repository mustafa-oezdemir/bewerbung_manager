import {
  toZweispaltigExternalHref,
  uniqueZweispaltigValues,
} from "./zweispaltig.model";
import type { ZweispaltigHeaderProps } from "./zweispaltig.types";

export function ZweispaltigHeader({
  profile,
  name,
  photoSource,
  compact = false,
  atsMode = false,
}: ZweispaltigHeaderProps) {
  const location = [profile?.postalCode, profile?.city, profile?.country]
    .filter(Boolean)
    .join(" ");
  const specializations = uniqueZweispaltigValues(
    profile?.skills ?? [],
  ).slice(0, 3);

  return (
    <header
      className={`zweispaltig-header ${compact ? "zweispaltig-header--compact" : ""}`}
      data-element-id="zweispaltig.header"
    >
      <div className="zweispaltig-header__identity">
        {compact ? (
          <p className="zweispaltig-header__kicker">
            Lebenslauf · Fortsetzung
          </p>
        ) : null}
        <h1>{name}</h1>
        {profile?.title ? <h2>{profile.title}</h2> : null}
        {!compact && specializations.length ? (
          <p className="zweispaltig-header__specializations">
            {specializations.join(" | ")}
          </p>
        ) : null}

        {!compact ? (
          <address className="zweispaltig-header__contacts">
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
            {location ? (
              <span>
                <strong>Wohnort</strong>
                <span>{location}</span>
              </span>
            ) : null}
            {profile?.linkedin ? (
              <a href={toZweispaltigExternalHref(profile.linkedin)}>
                <strong>LinkedIn</strong>
                <span>{profile.linkedin}</span>
              </a>
            ) : null}
            {profile?.github ? (
              <a href={toZweispaltigExternalHref(profile.github)}>
                <strong>GitHub</strong>
                <span>{profile.github}</span>
              </a>
            ) : null}
            {profile?.portfolio ? (
              <a href={toZweispaltigExternalHref(profile.portfolio)}>
                <strong>Portfolio</strong>
                <span>{profile.portfolio}</span>
              </a>
            ) : null}
            {profile?.birthDate || profile?.birthPlace ? (
              <span>
                <strong>Geboren</strong>
                <span>
                  {[profile?.birthDate, profile?.birthPlace]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </span>
            ) : null}
          </address>
        ) : null}
      </div>

      {!compact && !atsMode && photoSource ? (
        <figure
          className="zweispaltig-header__photo"
          data-element-id="zweispaltig.photo"
        >
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </figure>
      ) : null}
    </header>
  );
}
