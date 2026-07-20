/**
 * Tabellarisch Template - Header Component
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import type { TabellarischHeaderProps } from "./tabellarisch.types";

export function TabellarischHeader({
  name,
  profile,
  primaryColor,
  accentColor,
  photoSource,
  atsMode,
}: TabellarischHeaderProps) {
  return (
    <header
      className={`tabellarisch-header ${!photoSource ? "tabellarisch-header--without-photo" : ""}`}>
      <div className="tabellarisch-header__identity">
        <h1 className="tabellarisch-header__name">{name}</h1>

        {profile?.title && (
          <p
            className="tabellarisch-header__title"
            style={{ color: accentColor }}>
            {profile.title}
          </p>
        )}

        {profile?.skills && profile.skills.length > 0 && (
          <p className="tabellarisch-header__expertise">
            {profile.skills.slice(0, 3).join(" • ")}
          </p>
        )}

        {(profile?.phone ||
          profile?.email ||
          profile?.linkedin ||
          profile?.github ||
          profile?.city) && (
          <div className="tabellarisch-header__contacts">
            {profile?.phone && (
              <div className="tabellarisch-header__contact-item">
                <strong>Tel:</strong> {profile.phone}
              </div>
            )}
            {profile?.email && (
              <div className="tabellarisch-header__contact-item">
                <strong>E-Mail:</strong> {profile.email}
              </div>
            )}
            {profile?.linkedin && (
              <div className="tabellarisch-header__contact-item">
                <strong>LinkedIn:</strong> {profile.linkedin}
              </div>
            )}
            {profile?.github && (
              <div className="tabellarisch-header__contact-item">
                <strong>GitHub:</strong> {profile.github}
              </div>
            )}
            {profile?.city && (
              <div className="tabellarisch-header__contact-item">
                <strong>Ort:</strong> {profile.city}
                {profile?.country ? `, ${profile.country}` : ""}
              </div>
            )}
          </div>
        )}
      </div>

      {photoSource && !atsMode && (
        <div className="tabellarisch-header__photo">
          <img src={photoSource} alt={name} />
        </div>
      )}
    </header>
  );
}
