import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getTemplateSectionCapabilities,
  getProfileResumeSectionLayout,
  getResumeSectionTitle,
  isResumeSectionVisible,
  moveResumeSection,
  resolveResumeSectionLayout,
  type ResumeSectionPlacement,
  type ResumeSectionType,
  type SectionZone,
} from "../../features/resume-sections/resume-sections";
import {
  defaultResumePersonalFieldVisibility,
  resolveKnowledgeGroups,
  resolveResumeSectionInstances,
  resumePersonalFieldKeys,
  resumePersonalFieldLabels,
  resumeSectionDefinitions,
  type ResumeSemanticType,
} from "../../features/resume-sections/resume-section-system";
import type { ApplicantProfile } from "../../shared/schema";

type ResumeSectionsPanelProps = {
  profile: ApplicantProfile;
  templateId: string;
  singlePageExceeded: boolean;
  onSave: (profile: ApplicantProfile) => Promise<void>;
  onPreview: (
    templateId: string,
    profile: ApplicantProfile | null,
  ) => void;
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
  if (!visible && (type === "experience" || type === "education")) {
    return profile;
  }
  const key =
    type === "summary"
      ? "profile"
      : type === "strengths"
        ? "strengths"
        : type === "knowledge"
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

const requirementLabels = {
  required: "Pflicht",
  recommended: "Empfohlen",
  optional: "Optional",
} as const;

const legacyTypeBySemantic: Partial<Record<ResumeSemanticType, ResumeSectionType>> = {
  summary: "summary",
  career: "experience",
  education: "education",
  knowledge: "knowledge",
  interests: "additional",
};

export function ResumeSectionsPanel({
  profile,
  templateId,
  singlePageExceeded,
  onSave,
  onPreview,
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
  const previewProfile = useMemo(
    () => ({
      ...draftProfile,
      resumeSectionLayout: draftLayout,
      resumeSectionLayouts: {
        ...draftProfile.resumeSectionLayouts,
        [templateId]: draftLayout,
      },
    }),
    [draftLayout, draftProfile, templateId],
  );

  useEffect(() => {
    onPreview(templateId, previewProfile);
  }, [onPreview, previewProfile, templateId]);

  useEffect(
    () => () => onPreview(templateId, null),
    [onPreview, templateId],
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
    setDraftProfile({
      ...profile,
      resumeSemanticSections: resolveResumeSectionInstances([]),
      resumePersonalFieldVisibility: defaultResumePersonalFieldVisibility,
      resumeKnowledgeGroups: resolveKnowledgeGroups(templateId, []),
      resumeClosing: { showPlace: true, showDate: true, showSignature: true },
    });
  };

  const cancel = () => {
    setDraftLayout(getProfileResumeSectionLayout(profile, templateId));
    setDraftProfile(profile);
  };

  const apply = async () => {
    if (draftProfile.specialSections.some((section) => !section.title.trim())) {
      window.alert("Bitte jedem Lebenslauf-Abschnitt eine Überschrift geben.");
      return;
    }
    await onSave({
      ...previewProfile,
      updatedAt: new Date().toISOString(),
    });
  };

  const semanticSections = resolveResumeSectionInstances(
    draftProfile.resumeSemanticSections,
  );
  const knowledgeGroups = resolveKnowledgeGroups(
    templateId,
    draftProfile.resumeKnowledgeGroups,
  );

  const updateSemanticSection = (
    semanticType: ResumeSemanticType,
    change: Partial<(typeof semanticSections)[number]>,
  ) => {
    const definition = resumeSectionDefinitions.find(
      (item) => item.semanticType === semanticType,
    )!;
    setDraftProfile((current) => {
      const resolved = resolveResumeSectionInstances(current.resumeSemanticSections);
      const nextVisible = definition.requirement === "required"
        ? true
        : (change.visible ?? resolved.find((item) => item.semanticType === semanticType)?.visible ?? true);
      let next = {
        ...current,
        resumeSemanticSections: resolved.map((item) =>
          item.semanticType === semanticType
            ? {
                ...item,
                ...change,
                visible: nextVisible,
                enabled: definition.requirement === "required" ? true : (change.enabled ?? item.enabled),
              }
            : item,
        ),
      };
      const legacyType = legacyTypeBySemantic[semanticType];
      if (legacyType) next = updateVisibility(next, legacyType, nextVisible);
      return next;
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

      <div className="resume-semantic-system">
        <header>
          <strong>9 Lebenslauf-Bereiche</strong>
          <small>Semantik und Inhalte bleiben beim Wechsel der Vorlage erhalten.</small>
        </header>
        <div className="resume-semantic-list">
          {semanticSections.map((section) => {
            const definition = resumeSectionDefinitions.find(
              (item) => item.semanticType === section.semanticType,
            )!;
            return (
              <article className="resume-semantic-card" key={section.semanticType}>
                <div>
                  <b>{definition.defaultTitle}</b>
                  <span className={`requirement-badge requirement-${definition.requirement}`}>
                    {requirementLabels[definition.requirement]}
                  </span>
                </div>
                {definition.renamable ? (
                  <input
                    aria-label={`${definition.defaultTitle} umbenennen`}
                    placeholder={definition.defaultTitle}
                    value={section.customTitle}
                    onChange={(event) => updateSemanticSection(section.semanticType, { customTitle: event.target.value })}
                  />
                ) : null}
                <label className="checkbox-field compact">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    disabled={!definition.hideable}
                    onChange={(event) => updateSemanticSection(section.semanticType, { visible: event.target.checked, enabled: event.target.checked })}
                  />
                  <span>{definition.hideable ? "Sichtbar" : "Immer sichtbar"}</span>
                </label>
              </article>
            );
          })}
        </div>
      </div>

      <div className="resume-personal-fields-panel">
        <header>
          <strong>Persönliche Daten</strong>
          <small>Die Auswahl gilt für den Lebenslauf und ist unabhängig vom Deckblatt.</small>
        </header>
        <div className="visibility-checkbox-grid">
          {resumePersonalFieldKeys.map((key) => (
            <label className="checkbox-field compact" key={key}>
              <input
                type="checkbox"
                checked={draftProfile.resumePersonalFieldVisibility?.[key] ?? defaultResumePersonalFieldVisibility[key]}
                onChange={(event) =>
                  setDraftProfile((current) => ({
                    ...current,
                    resumePersonalFieldVisibility: {
                      ...defaultResumePersonalFieldVisibility,
                      ...current.resumePersonalFieldVisibility,
                      [key]: event.target.checked,
                    },
                  }))
                }
              />
              <span>{resumePersonalFieldLabels[key]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="resume-knowledge-groups-panel">
        <header>
          <strong>Besondere Kenntnisse</strong>
          <small>Bereiche umbenennen, bearbeiten, sortieren oder ausblenden.</small>
        </header>
        <div className="resume-knowledge-group-list">
          {knowledgeGroups.map((group, index) => (
            <article className={group.visible ? "" : "is-hidden"} key={group.id}>
              <input
                aria-label={`${group.title} Titel`}
                value={group.title}
                onChange={(event) => setDraftProfile((current) => ({
                  ...current,
                  resumeKnowledgeGroups: resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups).map((item) => item.id === group.id ? { ...item, title: event.target.value } : item),
                }))}
              />
              <textarea
                aria-label={`${group.title} Inhalte`}
                rows={3}
                placeholder="Ein Eintrag pro Zeile"
                value={group.items.join("\n")}
                onChange={(event) => setDraftProfile((current) => ({
                  ...current,
                  resumeKnowledgeGroups: resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups).map((item) => item.id === group.id ? { ...item, items: event.target.value.split(/\r?\n/).map((value) => value.trim()).filter(Boolean) } : item),
                }))}
              />
              <div className="resume-knowledge-group-actions">
                <button className="icon-button" type="button" aria-label={`${group.title} ${group.visible ? "ausblenden" : "anzeigen"}`} onClick={() => setDraftProfile((current) => ({ ...current, resumeKnowledgeGroups: resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups).map((item) => item.id === group.id ? { ...item, visible: !item.visible } : item) }))}>{group.visible ? <Eye size={15} /> : <EyeOff size={15} />}</button>
                <button className="icon-button" type="button" disabled={index === 0} aria-label={`${group.title} nach oben`} onClick={() => setDraftProfile((current) => { const next = [...resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups)]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return { ...current, resumeKnowledgeGroups: next.map((item, order) => ({ ...item, order })) }; })}><ArrowUp size={15} /></button>
                <button className="icon-button" type="button" disabled={index === knowledgeGroups.length - 1} aria-label={`${group.title} nach unten`} onClick={() => setDraftProfile((current) => { const next = [...resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups)]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; return { ...current, resumeKnowledgeGroups: next.map((item, order) => ({ ...item, order })) }; })}><ArrowDown size={15} /></button>
                <button className="icon-button danger" type="button" aria-label={`${group.title} löschen`} onClick={() => setDraftProfile((current) => ({ ...current, resumeKnowledgeGroups: resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups).filter((item) => item.id !== group.id).map((item, order) => ({ ...item, order })) }))}><Trash2 size={15} /></button>
              </div>
            </article>
          ))}
        </div>
        <button className="button secondary" type="button" onClick={() => setDraftProfile((current) => { const groups = resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups); return { ...current, resumeKnowledgeGroups: [...groups, { id: crypto.randomUUID(), title: "Eigener Bereich", semanticType: "custom", visible: true, order: groups.length, items: [], rendererType: "list" }] }; })}><Plus size={15} /> Eigenen Bereich hinzufügen</button>
      </div>

      <div className="resume-closing-panel">
        <header><strong>Ort, Datum und Unterschrift</strong><small>Bestandteile einzeln auswählen.</small></header>
        <div className="visibility-checkbox-grid">
          {([['showPlace', 'Ort'], ['showDate', 'Datum'], ['showSignature', 'Unterschrift']] as const).map(([key, label]) => (
            <label className="checkbox-field compact" key={key}>
              <input type="checkbox" checked={draftProfile.resumeClosing?.[key] ?? true} onChange={(event) => setDraftProfile((current) => ({ ...current, resumeClosing: { ...(current.resumeClosing ?? { showPlace: true, showDate: true, showSignature: true }), [key]: event.target.checked } }))} />
              <span>{label}</span>
            </label>
          ))}
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
                  const isRequired = placement.type === "experience" || placement.type === "education";
                  const sectionTitle = getResumeSectionTitle(
                    draftProfile,
                    placement.type,
                  );
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
                      <span
                        className="resume-section-card-title"
                        title={sectionTitle}>
                        {sectionTitle}
                      </span>
                      <button
                        aria-label={`${sectionTitle} ${isVisible ? "ausblenden" : "anzeigen"}`}
                        className="icon-button"
                        disabled={isRequired}
                        type="button"
                        onClick={() =>
                          setDraftProfile((current) =>
                            updateVisibility(current, placement.type, !isVisible),
                          )
                        }>
                        {isRequired || isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button
                        aria-label={`${sectionTitle} nach oben`}
                        className="icon-button"
                        disabled={index === 0}
                        type="button"
                        onClick={() => updatePlacement(placement.type, zone, index - 1)}>
                        <ArrowUp size={15} />
                      </button>
                      <button
                        aria-label={`${sectionTitle} nach unten`}
                        className="icon-button"
                        disabled={index === zoneItems.length - 1}
                        type="button"
                        onClick={() => updatePlacement(placement.type, zone, index + 1)}>
                        <ArrowDown size={15} />
                      </button>
                      {allowedZones.length > 1 ? (
                        <select
                          aria-label={`${sectionTitle} Position`}
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
      {draftProfile.specialSections.length ? (
        <div className="resume-special-sections-panel">
          <span>Weitere Profilabschnitte</span>
          <small>
            Jeder im Profil angelegte Abschnitt bleibt eigenständig und kann
            hier umbenannt oder ein- und ausgeblendet werden.
          </small>
          <div className="resume-section-list">
            {draftProfile.specialSections.map((section, index) => (
              <article className="resume-section-card resume-special-section-card" key={section.id}>
                <GripVertical aria-hidden="true" size={16} />
                <input
                  aria-label={`${section.title} Überschrift`}
                  value={section.title}
                  onChange={(event) =>
                    setDraftProfile((current) => ({
                      ...current,
                      specialSections: current.specialSections.map((item) =>
                        item.id === section.id
                          ? { ...item, title: event.target.value }
                          : item,
                      ),
                    }))
                  }
                />
                <button
                  aria-label={`${section.title} ${section.isVisible ? "ausblenden" : "anzeigen"}`}
                  className="icon-button"
                  type="button"
                  onClick={() =>
                    setDraftProfile((current) => ({
                      ...current,
                      specialSections: current.specialSections.map((item) =>
                        item.id === section.id
                          ? { ...item, isVisible: !item.isVisible }
                          : item,
                      ),
                    }))
                  }
                >
                  {section.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  aria-label={`${section.title} nach oben`}
                  className="icon-button"
                  disabled={index === 0}
                  type="button"
                  onClick={() =>
                    setDraftProfile((current) => {
                      const next = [...current.specialSections];
                      [next[index - 1], next[index]] = [next[index], next[index - 1]];
                      return { ...current, specialSections: next };
                    })
                  }
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  aria-label={`${section.title} nach unten`}
                  className="icon-button"
                  disabled={index === draftProfile.specialSections.length - 1}
                  type="button"
                  onClick={() =>
                    setDraftProfile((current) => {
                      const next = [...current.specialSections];
                      [next[index], next[index + 1]] = [next[index + 1], next[index]];
                      return { ...current, specialSections: next };
                    })
                  }
                >
                  <ArrowDown size={15} />
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}
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
