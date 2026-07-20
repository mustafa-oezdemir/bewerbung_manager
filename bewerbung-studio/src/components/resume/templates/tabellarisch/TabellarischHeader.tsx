/**
 * Tabellarisch Template - Header Component
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import { toExternalHref } from "./tabellarisch.model";
import type { TabellarischHeaderProps } from "./tabellarisch.types";

export function TabellarischHeader({
  name,
  profile,
  photoSource,
  atsMode,
}: TabellarischHeaderProps) {
  const expertise = Array.from(
    new Set((profile?.skills ?? []).map((skill) => skill.trim()).filter(Boolean)),
  ).slice(0, 3);

  return (
    <header
      className={`tabellarisch-header ${!photoSource || atsMode ? "tabellarisch-header--without-photo" : ""}`}
      data-element-id="tabellarisch.header"
    >
      <div className="tabellarisch-header__identity">
        <p className="tabellarisch-header__kicker">Lebenslauf</p>
        <h1 className="tabellarisch-header__name">{name}</h1>

        {profile?.title && (
          <p className="tabellarisch-header__title">
            {profile.title}
          </p>
        )}

        {expertise.length > 0 && (
          <p className="tabellarisch-header__expertise">
            {expertise.join(" · ")}
          </p>
        )}

        {(profile?.phone ||
          profile?.email ||
          profile?.linkedin ||
          profile?.github ||
          profile?.city) && (
          <address className="tabellarisch-header__contacts">
            {profile?.phone && (
              <p className="tabellarisch-header__contact-item">
                <strong>Telefon</strong>
                <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
                  {profile.phone}
                </a>
              </p>
            )}
            {profile?.email && (
              <p className="tabellarisch-header__contact-item">
                <strong>E-Mail</strong>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
            {profile?.linkedin && (
              <p className="tabellarisch-header__contact-item">
                <strong>LinkedIn</strong>
                <a href={toExternalHref(profile.linkedin)}>
                  {profile.linkedin}
                </a>
              </p>
            )}
            {profile?.github && (
              <p className="tabellarisch-header__contact-item">
                <strong>GitHub</strong>
                <a href={toExternalHref(profile.github)}>{profile.github}</a>
              </p>
            )}
            {profile?.city && (
              <p className="tabellarisch-header__contact-item">
                <strong>Ort</strong>
                <span>
                  {profile.city}
                  {profile.country ? `, ${profile.country}` : ""}
                </span>
              </p>
            )}
          </address>
        )}
      </div>

      {photoSource && !atsMode && (
        <div className="tabellarisch-header__photo">
          <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
        </div>
      )}
    </header>
  );
}
