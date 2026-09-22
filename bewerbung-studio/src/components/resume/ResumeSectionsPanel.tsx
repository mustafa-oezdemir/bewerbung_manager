import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
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
import {
  createKnowledgeBlock,
  createResumeBlockItem,
  getResumeBlockDefinition,
  getTemplateKnowledgeSlots,
  rendererTypeLabels,
  resumeBlockRegistry,
  type ResumeBlockRendererType,
  type ResumeKnowledgeSlot,
} from "../../features/resume-sections/knowledge-block-registry";
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
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [blockPickerOpen, setBlockPickerOpen] = useState(false);
  const [blockSearch, setBlockSearch] = useState("");

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
      resumeKnowledgeContainer: { showTitle: false },
      resumeColumnRatio: 30,
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
  const knowledgeSlots = getTemplateKnowledgeSlots(templateId);
  const filteredBlockRegistry = resumeBlockRegistry.filter((definition) =>
    `${definition.title} ${definition.category}`
      .toLocaleLowerCase("de-DE")
      .includes(blockSearch.trim().toLocaleLowerCase("de-DE")),
  );

  const updateKnowledgeGroups = (
    update: (groups: typeof knowledgeGroups) => typeof knowledgeGroups,
  ) => setDraftProfile((current) => ({
    ...current,
    resumeKnowledgeGroups: update(
      resolveKnowledgeGroups(templateId, current.resumeKnowledgeGroups),
    ).map((group, order) => ({ ...group, order })),
  }));

  const updateKnowledgeGroup = (
    id: string,
    change: Partial<(typeof knowledgeGroups)[number]>,
  ) => updateKnowledgeGroups((groups) => groups.map((group) =>
    group.id === id ? { ...group, ...change } : group,
  ));

  const moveKnowledgeGroup = (id: string, direction: -1 | 1) =>
    updateKnowledgeGroups((groups) => {
      const index = groups.findIndex((group) => group.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= groups.length) return groups;
      const next = [...groups];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const changeKnowledgeSlot = (id: string, slot: ResumeKnowledgeSlot) => {
    const group = knowledgeGroups.find((item) => item.id === id);
    const definition = group ? getResumeBlockDefinition(group.semanticType) : undefined;
    if (definition?.requiresMainColumn && slot === "sidebar") return;
    if (!knowledgeSlots.some((item) => item.id === slot)) return;
    updateKnowledgeGroup(id, {
      slot,
      slotOverrides: { ...group?.slotOverrides, [templateId]: slot },
    });
  };

  const addRegistryBlock = (semanticType: string) => {
    const definition = getResumeBlockDefinition(semanticType);
    if (!definition) return;
    if (!definition.allowMultiple && knowledgeGroups.some((group) => group.semanticType === semanticType)) {
      updateKnowledgeGroup(
        knowledgeGroups.find((group) => group.semanticType === semanticType)!.id,
        { visible: true },
      );
      return;
    }
    updateKnowledgeGroups((groups) => [
      ...groups,
      createKnowledgeBlock(templateId, definition, groups.length),
    ]);
  };

  const addCustomBlock = () => updateKnowledgeGroups((groups) => [
    ...groups,
    {
      id: crypto.randomUUID(),
      title: "Eigener Bereich",
      semanticType: `custom-${crypto.randomUUID()}`,
      visible: true,
      order: groups.length,
      items: [],
      rendererType: "bullet-list" as const,
      slot: knowledgeSlots[0]?.id ?? "main",
      slotOverrides: {},
      pageBreakBefore: false,
    },
  ]);

  const updateSemanticSection = (
    semanticType: ResumeSemanticType,
    change: Partial<(typeof semanticSections)[number]>,
  ) => {
    setDraftProfile((current) => {
      const resolved = resolveResumeSectionInstances(current.resumeSemanticSections);
      const nextVisible = change.visible ?? resolved.find((item) => item.semanticType === semanticType)?.visible ?? true;
      let next = {
        ...current,
        resumeSemanticSections: resolved.map((item) =>
          item.semanticType === semanticType
            ? {
                ...item,
                ...change,
                visible: nextVisible,
                enabled: change.enabled ?? item.enabled,
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

      <details className="resume-semantic-system">
        <summary>
          <strong>{semanticSections.length} Lebenslauf-Bereiche</strong>
          <small>Überschriften bearbeiten und Bereiche ein- oder ausblenden. Ihre Inhalte bleiben beim Vorlagenwechsel erhalten.</small>
        </summary>
        <div className="resume-semantic-table-scroll" tabIndex={0} role="region" aria-label="Lebenslauf-Bereiche bearbeiten">
        <table className="resume-semantic-table">
          <caption className="sr-only">Bereiche, Überschriften und Sichtbarkeit im Lebenslauf</caption>
          <thead><tr><th scope="col">Bereich</th><th scope="col">Überschrift</th><th scope="col">Sichtbarkeit</th></tr></thead>
          <tbody>
          {semanticSections.map((section) => {
            const definition = resumeSectionDefinitions.find(
              (item) => item.semanticType === section.semanticType,
            )!;
            return (
              <tr className={section.visible ? "" : "is-hidden"} key={section.semanticType}>
                <th scope="row"><div className="resume-semantic-name">
                  <b>{definition.defaultTitle}</b>
                  <span className={`requirement-badge requirement-${definition.requirement}`}>
                    {requirementLabels[definition.requirement]}
                  </span>
                </div></th>
                <td>
                {definition.renamable ? (
                  <input
                    aria-label={`${definition.defaultTitle} umbenennen`}
                    placeholder={definition.defaultTitle}
                    value={section.customTitle}
                    onChange={(event) => updateSemanticSection(section.semanticType, { customTitle: event.target.value })}
                  />
                ) : <span className="resume-semantic-fixed-title">—</span>}
                </td>
                <td>
                <label className="resume-semantic-visibility">
                  <input
                    type="checkbox"
                    role="switch"
                    aria-label={`${definition.defaultTitle} sichtbar`}
                    checked={section.visible}
                    onChange={(event) => updateSemanticSection(section.semanticType, { visible: event.target.checked, enabled: event.target.checked })}
                  />
                  <span>{section.visible ? "Sichtbar" : "Ausgeblendet"}</span>
                </label>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        </div>
      </details>

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
          <strong>Besondere Kenntnisse · Bausteine</strong>
          <small>Bereiche, Inhalte, Darstellung und Position bleiben beim Vorlagenwechsel erhalten.</small>
        </header>
        <div className="resume-knowledge-container-settings">
          <label className="checkbox-field compact">
            <input
              type="checkbox"
              checked={draftProfile.resumeKnowledgeContainer?.showTitle ?? false}
              onChange={(event) => setDraftProfile((current) => ({
                ...current,
                resumeKnowledgeContainer: { showTitle: event.target.checked },
              }))}
            />
            <span>Übergeordneten Titel „Besondere Kenntnisse“ anzeigen</span>
          </label>
          {knowledgeSlots.length > 1 ? (
            <label className="field compact-field">
              <span>Breite der linken Spalte</span>
              <select
                value={draftProfile.resumeColumnRatio ?? 30}
                onChange={(event) => setDraftProfile((current) => ({
                  ...current,
                  resumeColumnRatio: Number(event.target.value) as 25 | 30 | 35 | 40,
                }))}>
                {[25, 30, 35, 40].map((ratio) => <option key={ratio} value={ratio}>{ratio}% / {100 - ratio}%</option>)}
              </select>
            </label>
          ) : null}
        </div>
        <div className="resume-knowledge-group-list">
          {knowledgeGroups.map((group, index) => {
            const definition = getResumeBlockDefinition(group.semanticType);
            const renderers = definition?.allowedRenderers ?? Object.keys(rendererTypeLabels) as ResumeBlockRendererType[];
            const slotIndex = knowledgeSlots.findIndex((slot) => slot.id === group.slot);
            return (
              <article
                className={group.visible ? "" : "is-hidden"}
                draggable
                key={group.id}
                onDragStart={() => setDraggedBlockId(group.id)}
                onDragEnd={() => setDraggedBlockId(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (!draggedBlockId || draggedBlockId === group.id) return;
                  updateKnowledgeGroups((groups) => {
                    const source = groups.findIndex((item) => item.id === draggedBlockId);
                    const target = groups.findIndex((item) => item.id === group.id);
                    if (source < 0 || target < 0) return groups;
                    const next = [...groups];
                    const [moved] = next.splice(source, 1);
                    next.splice(target, 0, moved);
                    return next;
                  });
                  setDraggedBlockId(null);
                }}>
                <div className="resume-block-title-row">
                  <GripVertical aria-hidden="true" size={16} />
                  <input aria-label={`${group.title} Titel`} value={group.title} onChange={(event) => updateKnowledgeGroup(group.id, { title: event.target.value })} />
                  <button className="icon-button" type="button" aria-label={`${group.title} ${group.visible ? "ausblenden" : "anzeigen"}`} onClick={() => updateKnowledgeGroup(group.id, { visible: !group.visible })}>{group.visible ? <Eye size={15} /> : <EyeOff size={15} />}</button>
                  <button className="icon-button danger" type="button" aria-label={`${group.title} löschen`} onClick={() => updateKnowledgeGroups((groups) => groups.filter((item) => item.id !== group.id))}><Trash2 size={15} /></button>
                </div>

                <div className="resume-block-config-grid">
                  <label><span>Position</span><select value={group.slot} onChange={(event) => changeKnowledgeSlot(group.id, event.target.value as ResumeKnowledgeSlot)}>{knowledgeSlots.map((slot) => <option disabled={definition?.requiresMainColumn && slot.id === "sidebar"} key={slot.id} value={slot.id}>{slot.label}</option>)}</select></label>
                  <label><span>Darstellung</span><select value={group.rendererType} onChange={(event) => updateKnowledgeGroup(group.id, { rendererType: event.target.value as ResumeBlockRendererType })}>{renderers.map((renderer) => <option key={renderer} value={renderer}>{rendererTypeLabels[renderer]}</option>)}</select></label>
                </div>

                <div className="resume-block-items">
                  {group.items.map((item, itemIndex) => (
                    <div className={item.visible ? "resume-block-item" : "resume-block-item is-hidden"} key={item.id}>
                      <input
                        aria-label={`${group.title} Punkt ${itemIndex + 1}`}
                        placeholder="Inhalt"
                        value={item.text}
                        onChange={(event) => updateKnowledgeGroup(group.id, { items: group.items.map((candidate) => candidate.id === item.id ? { ...candidate, text: event.target.value } : candidate) })}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter") return;
                          event.preventDefault();
                          updateKnowledgeGroup(group.id, { items: [...group.items, createResumeBlockItem(group.items.length)] });
                        }}
                      />
                      <input aria-label={`${group.title} Punkt ${itemIndex + 1} Beschreibung`} placeholder="Beschreibung (optional)" value={item.description} onChange={(event) => updateKnowledgeGroup(group.id, { items: group.items.map((candidate) => candidate.id === item.id ? { ...candidate, description: event.target.value } : candidate) })} />
                      <button className="icon-button" type="button" aria-label={`Punkt ${item.visible ? "ausblenden" : "anzeigen"}`} onClick={() => updateKnowledgeGroup(group.id, { items: group.items.map((candidate) => candidate.id === item.id ? { ...candidate, visible: !candidate.visible } : candidate) })}>{item.visible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
                      <button className="icon-button" disabled={itemIndex === 0} type="button" aria-label="Punkt nach oben" onClick={() => { const items = [...group.items]; [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]]; updateKnowledgeGroup(group.id, { items: items.map((entry, order) => ({ ...entry, order })) }); }}><ArrowUp size={14} /></button>
                      <button className="icon-button" disabled={itemIndex === group.items.length - 1} type="button" aria-label="Punkt nach unten" onClick={() => { const items = [...group.items]; [items[itemIndex], items[itemIndex + 1]] = [items[itemIndex + 1], items[itemIndex]]; updateKnowledgeGroup(group.id, { items: items.map((entry, order) => ({ ...entry, order })) }); }}><ArrowDown size={14} /></button>
                      <button className="icon-button danger" type="button" aria-label="Punkt löschen" onClick={() => updateKnowledgeGroup(group.id, { items: group.items.filter((candidate) => candidate.id !== item.id).map((entry, order) => ({ ...entry, order })) })}><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button className="button tertiary compact-button" type="button" onClick={() => updateKnowledgeGroup(group.id, { items: [...group.items, createResumeBlockItem(group.items.length)] })}><Plus size={14} /> Punkt hinzufügen</button>
                </div>

                <div className="resume-knowledge-group-actions">
                  <button className="icon-button" title="In vorherige Spalte verschieben" type="button" disabled={slotIndex <= 0 || (definition?.requiresMainColumn && knowledgeSlots[slotIndex - 1]?.id === "sidebar")} onClick={() => changeKnowledgeSlot(group.id, knowledgeSlots[slotIndex - 1]?.id ?? group.slot)}><ArrowLeft size={15} /></button>
                  <button className="icon-button" title="Nach oben" type="button" disabled={index === 0} onClick={() => moveKnowledgeGroup(group.id, -1)}><ArrowUp size={15} /></button>
                  <button className="icon-button" title="Nach unten" type="button" disabled={index === knowledgeGroups.length - 1} onClick={() => moveKnowledgeGroup(group.id, 1)}><ArrowDown size={15} /></button>
                  <button className="icon-button" title="In nächste Spalte verschieben" type="button" disabled={slotIndex < 0 || slotIndex >= knowledgeSlots.length - 1} onClick={() => changeKnowledgeSlot(group.id, knowledgeSlots[slotIndex + 1]?.id ?? group.slot)}><ArrowRight size={15} /></button>
                  <label className="checkbox-field compact"><input type="checkbox" checked={group.pageBreakBefore} onChange={(event) => updateKnowledgeGroup(group.id, { pageBreakBefore: event.target.checked })} /><span>Seitenumbruch davor</span></label>
                </div>
              </article>
            );
          })}
        </div>
        <div className="resume-block-add-actions">
          <button className="button secondary" type="button" onClick={() => setBlockPickerOpen((open) => !open)}><Plus size={15} /> Bereiche hinzufügen</button>
          <button className="button tertiary" type="button" onClick={addCustomBlock}><Plus size={15} /> Eigenen Bereich hinzufügen</button>
        </div>
        {blockPickerOpen ? (
          <section className="resume-block-picker" aria-label="Bereich hinzufügen">
            <input aria-label="Bereiche suchen" placeholder="Bereiche suchen …" value={blockSearch} onChange={(event) => setBlockSearch(event.target.value)} />
            {(["Empfohlen", "Fachlich", "Karriere", "Persönlich"] as const).map((category) => {
              const definitions = filteredBlockRegistry.filter((definition) => definition.category === category);
              return definitions.length ? <div key={category}><strong>{category}</strong><div>{definitions.map((definition) => {
                const active = knowledgeGroups.some((group) => group.semanticType === definition.id);
                return <button className={active ? "active" : ""} key={definition.id} type="button" onClick={() => addRegistryBlock(definition.id)}><Plus size={13} /> {definition.title}{active && !definition.allowMultiple ? " · aktiv" : ""}</button>;
              })}</div></div> : null;
            })}
          </section>
        ) : null}
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
                        type="button"
                        onClick={() =>
                          setDraftProfile((current) =>
                            updateVisibility(current, placement.type, !isVisible),
                          )
                        }>
                        {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
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
