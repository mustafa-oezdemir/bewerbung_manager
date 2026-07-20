/**
 * Gepflegt template sidebar photo component
 * Square photo with optional border and responsive sizing
 */

export interface GepflegtSidebarPhotoProps {
  photoSource: string | null;
  name: string;
  atsMode: boolean;
}

export function GepflegtSidebarPhoto({
  photoSource,
  name,
  atsMode,
}: GepflegtSidebarPhotoProps) {
  // Hide photo in ATS mode
  if (atsMode || !photoSource) {
    return null;
  }

  return (
    <div className="gepflegt-sidebar__photo">
      <img src={photoSource} alt={`Foto von ${name}`} />
    </div>
  );
}
