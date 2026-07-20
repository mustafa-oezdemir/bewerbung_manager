/**
 * ModernHeader component
 * Renders header with name, profession, and optional profile photo
 */

import type { ModernHeaderProps } from "./modern.types";

export function ModernHeader({
  name,
  profile,
  accentColor,
  photoSource,
  atsMode,
}: ModernHeaderProps) {
  const hasPhoto = !atsMode && photoSource;
  const profession = profile?.title || "Professional";

  return (
    <header className="modern-resume-header" data-no-photo={!hasPhoto}>
      <div className="modern-resume-header__identity">
        <h1 className="modern-resume-header__name">{name}</h1>
        <p className="modern-resume-header__profession">{profession}</p>
      </div>
      {hasPhoto && (
        <div className="modern-resume-header__photo">
          <img src={photoSource} alt={`Profilfoto von ${name}`} />
        </div>
      )}
    </header>
  );
}
