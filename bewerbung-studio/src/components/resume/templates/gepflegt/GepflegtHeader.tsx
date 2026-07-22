import { AtSign, Link2, MapPin, Phone } from "lucide-react";
import { toTemplateExternalHref } from "../resume-template-data";
import type { GepflegtHeaderProps } from "./gepflegt.types";

export function GepflegtHeader({
  name,
  profile,
  atsMode,
  compact = false,
}: GepflegtHeaderProps) {
  const location = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const professionalLink =
    profile?.linkedin || profile?.github || profile?.portfolio || "";
  const professionalLinkDisplay = professionalLink
    ? toTemplateExternalHref(professionalLink)
    : "";

  return (
    <header
      className={`gepflegt-header ${compact ? "gepflegt-header--compact" : ""}`}
      data-element-id="gepflegt.header"
    >
      {compact ? (
        <p className="gepflegt-header__kicker">Lebenslauf · Fortsetzung</p>
      ) : null}
      <h1 className="gepflegt-header__name">{name}</h1>
      {profile?.title ? (
        <p className="gepflegt-header__title">{profile.title}</p>
      ) : null}

      {!compact &&
      (profile?.phone ||
        profile?.email ||
        professionalLink ||
        location) ? (
        <address className="gepflegt-header__contacts">
          {profile?.phone ? (
            <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
              {!atsMode ? <Phone aria-hidden="true" /> : null}
              <span>{profile.phone}</span>
            </a>
          ) : null}
          {profile?.email ? (
            <a href={`mailto:${profile.email}`}>
              {!atsMode ? <AtSign aria-hidden="true" /> : null}
              <span>{profile.email}</span>
            </a>
          ) : null}
          {professionalLink ? (
            <a href={toTemplateExternalHref(professionalLink)}>
              {!atsMode ? <Link2 aria-hidden="true" /> : null}
              <span>{professionalLinkDisplay}</span>
            </a>
          ) : null}
          {location ? (
            <span>
              {!atsMode ? <MapPin aria-hidden="true" /> : null}
              <span>{location}</span>
            </span>
          ) : null}
        </address>
      ) : null}
    </header>
  );
}
