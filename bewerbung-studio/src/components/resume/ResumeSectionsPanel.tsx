import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  GripVertical,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getTemplateSectionCapabilities,
  getProfileResumeSectionLayout,
  isResumeSectionVisible,
  moveResumeSection,
  resolveResumeSectionLayout,
  resumeSectionLabels,
  type ResumeSectionPlacement,
  type ResumeSectionType,
  type SectionZone,
} from "../../features/resume-sections/resume-sections";
import type { ApplicantProfile } from "../../shared/schema";

type ResumeSectionsPanelProps = {
  profile: ApplicantProfile;
  templateId: string;
  singlePageExceeded: boolean;
  onSave: (profile: ApplicantProfile) => Promise<void>;
};

const editableSectionTypes: readonly ResumeSectionType[] = [
  "summary",
  "strengths",
  "experience",
  "education",
  "knowledge",
  "certifications",
  "languages",
];

const zoneLabels: Record<SectionZone, string> = {
  main: "Hauptspalte",
  sidebar: "Seitenleiste",
  full: "Gesamte Breite",
  "left-sidebar": "Linke Seitenleiste",
  "right-sidebar": "Rechte Seitenleiste",
};

const updateVisibility = (
  profile: ApplicantProfile,
  type: ResumeSectionType,
  visible: boolean,
) => {
  const key =
    type === "summary"
      ? "profile"
      : type === "strengths" || type === "knowledge"
        ? "skills"
        : type;
  if (!(key in profile.resumeSections)) return profile;
  return {
    ...profile,
    resumeSections: {
      ...profile.resumeSections,
      [key]: visible,
    },
  };
};

export function ResumeSectionsPanel({
  profile,
  templateId,
  singlePageExceeded,
  onSave,
}: ResumeSectionsPanelProps) {
  const capabilities = getTemplateSectionCapabilities(templateId);
  const [draftLayout, setDraftLayout] = useState<ResumeSectionPlacement[]>(
    () => getProfileResumeSectionLayout(profile, templateId),
  );
  const [draftProfile, setDraftProfile] = useState(profile);
  const [draggedType, setDraggedType] = useState<ResumeSectionType | null>(null);

  useEffect(() => {
    setDraftLayout(getProfileResumeSectionLayout(profile, templateId));
    setDraftProfile(profile);
  }, [profile, templateId]);

  const visibleLayout = useMemo(
    () => draftLayout.filter((item) => editableSectionTypes.includes(item.type)),
    [draftLayout],
  );

  const updatePlacement = (
    type: ResumeSectionType,
    zone: SectionZone,
    index: number,
  ) => {
    setDraftLayout((current) => moveResumeSection(templateId, current, type, zone, index));
  };

  const restoreDefaults = () => {
    setDraftLayout(resolveResumeSectionLayout(templateId, []));
    setDraftProfile(profile);
  };

  const cancel = () => {
    setDraftLayout(getProfileResumeSectionLayout(profile, templateId));
    setDraftProfile(profile);
  };

  const apply = async () => {
    await onSave({
      ...draftProfile,
      resumeSectionLayout: draftLayout,
      resumeSectionLayouts: {
        ...draftProfile.resumeSectionLayouts,
        [templateId]: draftLayout,
      },
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <section className="resume-sections-panel" aria-label="Abschnitte neu ordnen">
      <div className="resume-sections-heading">
        <div>
          <strong>Abschnitte neu ordnen</strong>
          <small>
            Ziehen Sie Abschnitte oder verwenden Sie die Pfeiltasten. Nicht
            erlaubte Positionen werden nicht angeboten.
          </small>
        </div>
      </div>

      {capabilities.compactSinglePage && singlePageExceeded ? (
        <p className="resume-sections-warning" role="status">
          Die neue Abschnittsreihenfolge überschreitet eine Seite. Bitte
          reduzieren Sie Inhalte oder erlauben Sie eine zweite Seite.
        </p>
      ) : null}

      <div className="resume-section-zones">
        {capabilities.availableZones.map((zone) => {
          const zoneItems = visibleLayout.filter((item) => item.zone === zone);
          return (
            <div
              className="resume-section-zone"
              key={zone}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (draggedType) updatePlacement(draggedType, zone, zoneItems.length);
                setDraggedType(null);
              }}>
              <span>{zoneLabels[zone]}</span>
              <div className="resume-section-list">
                {zoneItems.map((placement, index) => {
                  const allowedZones =
                    capabilities.allowedZonesBySection[placement.type] ?? ["main"];
                  const isVisible = isResumeSectionVisible(draftProfile, placement.type);
                  return (
                    <article
                      className="resume-section-card"
                      draggable
                      key={placement.type}
                      onDragEnd={() => setDraggedType(null)}
                      onDragStart={() => setDraggedType(placement.type)}
                      onDrop={(event) => {
                        event.preventDefault();
                        if (draggedType && draggedType !== placement.type) {
                          updatePlacement(draggedType, zone, index);
                        }
                        setDraggedType(null);
                      }}>
                      <GripVertical aria-hidden="true" size={16} />
                      <span className="resume-section-card-title">
                        {resumeSectionLabels[placement.type]}
                      </span>
                      <button
                        aria-label={`${resumeSectionLabels[placement.type]} ${isVisible ? "ausblenden" : "anzeigen"}`}
                        className="icon-button"
                        type="button"
                        onClick={() =>
                          setDraftProfile((current) =>
                            updateVisibility(current, placement.type, !isVisible),
                          )
                        }>
                        {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button
                        aria-label={`${resumeSectionLabels[placement.type]} nach oben`}
                        className="icon-button"
                        disabled={index === 0}
                        type="button"
                        onClick={() => updatePlacement(placement.type, zone, index - 1)}>
                        <ArrowUp size={15} />
                      </button>
                      <button
                        aria-label={`${resumeSectionLabels[placement.type]} nach unten`}
                        className="icon-button"
                        disabled={index === zoneItems.length - 1}
                        type="button"
                        onClick={() => updatePlacement(placement.type, zone, index + 1)}>
                        <ArrowDown size={15} />
                      </button>
                      {allowedZones.length > 1 ? (
                        <select
                          aria-label={`${resumeSectionLabels[placement.type]} Position`}
                          value={placement.zone}
                          onChange={(event) =>
                            updatePlacement(
                              placement.type,
                              event.target.value as SectionZone,
                              zoneItems.length,
                            )
                          }>
                          {allowedZones.map((allowedZone) => (
                            <option key={allowedZone} value={allowedZone}>
                              {zoneLabels[allowedZone]}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="resume-section-actions">
        <button className="button secondary" type="button" onClick={restoreDefaults}>
          <RotateCcw size={15} /> Standardreihenfolge wiederherstellen
        </button>
        <button className="button secondary" type="button" onClick={cancel}>
          Abbrechen
        </button>
        <button className="button" type="button" onClick={() => void apply()}>
          Änderungen übernehmen
        </button>
      </div>
    </section>
  );
}
