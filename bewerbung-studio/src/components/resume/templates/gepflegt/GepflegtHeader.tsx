/**
 * Gepflegt template header component
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import type { GepflegtHeaderProps } from "./gepflegt.types";

export function GepflegtHeader({
  name,
  profile,
  accentColor,
  photoSource,
  atsMode,
}: GepflegtHeaderProps) {
  return (
    <header className="gepflegt-header">
      <div className="gepflegt-header__identity">
        <h1 className="gepflegt-header__name">{name}</h1>
        {profile?.title && (
          <p
            className="gepflegt-header__title"
            style={
              { "--gepflegt-accent-color": accentColor } as React.CSSProperties
            }>
            {profile.title}
          </p>
        )}
        {profile?.summary && (
          <p
            className="gepflegt-header__subtitle"
            dangerouslySetInnerHTML={{ __html: profile.summary.slice(0, 120) }}
          />
        )}
      </div>

      {!atsMode && photoSource && (
        <div className="gepflegt-header__photo">
          <img src={photoSource} alt={`Foto von ${name}`} />
        </div>
      )}

      <div className="gepflegt-header__contact">
        {profile?.phone && (
          <div className="gepflegt-header__contact-item">
            <span>{profile.phone}</span>
          </div>
        )}
        {profile?.email && (
          <div className="gepflegt-header__contact-item">
            <span>{profile.email}</span>
          </div>
        )}
        {profile?.city && (
          <div className="gepflegt-header__contact-item">
            <span>{profile.city}</span>
          </div>
        )}
        {profile?.linkedin && (
          <div className="gepflegt-header__contact-item">
            <span>{profile.linkedin}</span>
          </div>
        )}
      </div>
    </header>
  );
}
