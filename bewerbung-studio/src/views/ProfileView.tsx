import {
  ArrowDown,
  ArrowUp,
  BriefcaseBusiness,
  GraduationCap,
  GripVertical,
  ImagePlus,
  PenLine,
  Plus,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { KnowledgeSectionEditor } from "../components/knowledge/KnowledgeSectionEditor";
import { defaultKnowledgeSection } from "../features/knowledge/knowledge.constants";
import {
  cloneKnowledgeCategory,
  ensureKnowledgeSection,
  syncLegacySkills,
} from "../features/knowledge/knowledge.service";
import { validateKnowledgeSection } from "../features/knowledge/knowledge.validation";
import type { ProfileMediaKind } from "../shared/ipc";
import { getProfileMediaSource } from "../shared/profileMedia";
import type { ApplicantProfile } from "../shared/schema";
import { useAppStore } from "../store/useAppStore";

const defaultSections: ApplicantProfile["resumeSections"] = {
  profile: true,
  experience: true,
  education: true,
  skills: true,
  languages: true,
  certifications: true,
};

const newProfile = (): ApplicantProfile => ({
  id: crypto.randomUUID(),
  isDefault: true,
  firstName: "",
  lastName: "",
  title: "",
  street: "",
  postalCode: "",
  city: "",
  country: "Deutschland",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  portfolio: "",
  birthDate: "",
  birthPlace: "",
  nationality: "",
  photoPath: "",
  signaturePath: "",
  summary: "",
  skills: [],
  knowledgeSection: structuredClone(defaultKnowledgeSection),
  experiences: [],
  education: [],
  languages: [],
  certifications: [],
  resumeSections: defaultSections,
  updatedAt: new Date().toISOString(),
});

type DragItem = {
  type: "experience" | "education";
  id: string;
};

const moveItem = <T extends { id: string }>(
  items: T[],
  id: string,
  direction: -1 | 1,
) => {
  const index = items.findIndex((item) => item.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
};

const reorderItem = <T extends { id: string }>(
  items: T[],
  sourceId: string,
  targetId: string,
) => {
  const source = items.findIndex((item) => item.id === sourceId);
  const target = items.findIndex((item) => item.id === targetId);
  if (source < 0 || target < 0 || source === target) return items;
  const next = [...items];
  const [moved] = next.splice(source, 1);
  next.splice(target, 0, moved);
  return next;
};

export function ProfileView({ onSaved }: { onSaved: () => void }) {
  const profiles = useAppStore((state) => state.workspace.profiles);
  const saveProfile = useAppStore((state) => state.saveProfile);
  const initial =
    profiles.find((profile) => profile.isDefault) ??
    profiles[0] ??
    newProfile();
  const [draft, setDraft] = useState<ApplicantProfile>(() => ({
    ...structuredClone(initial),
    knowledgeSection: ensureKnowledgeSection(
      initial.knowledgeSection,
      initial.skills,
    ),
  }));
  const [dragged, setDragged] = useState<DragItem>();
  const photoSource = getProfileMediaSource(draft.photoPath);
  const signatureSource = getProfileMediaSource(draft.signaturePath);

  const selectProfile = (profile: ApplicantProfile) =>
    setDraft({
      ...structuredClone(profile),
      knowledgeSection: ensureKnowledgeSection(
        profile.knowledgeSection,
        profile.skills,
      ),
    });

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const issues = validateKnowledgeSection(draft.knowledgeSection);
    if (issues.length) {
      window.alert(issues[0].message);
      return;
    }
    await saveProfile({
      ...draft,
      skills: syncLegacySkills(draft.knowledgeSection),
      updatedAt: new Date().toISOString(),
    });
    onSaved();
  };

  const copyKnowledgeCategory = async (categoryId: string) => {
    const source = draft.knowledgeSection.categories.find(
      (category) => category.id === categoryId,
    );
    if (!source) return;
    const targets = profiles.filter((profile) => profile.id !== draft.id);
    if (!targets.length) {
      window.alert("Es ist kein weiteres Profil vorhanden.");
      return;
    }
    const selection = window.prompt(
      `Kategorie in welches Profil kopieren?\n${targets
        .map(
          (profile, index) =>
            `${index + 1}. ${profile.firstName} ${profile.lastName}`.trim(),
        )
        .join("\n")}`,
      "1",
    );
    if (!selection) return;
    const target = targets[Number(selection) - 1];
    if (!target) {
      window.alert("Bitte eine gültige Profilnummer eingeben.");
      return;
    }
    const targetSection = ensureKnowledgeSection(
      target.knowledgeSection,
      target.skills,
    );
    const knowledgeSection = {
      ...targetSection,
      categories: [
        ...targetSection.categories,
        cloneKnowledgeCategory(source, targetSection.categories.length),
      ],
    };
    await saveProfile({
      ...target,
      knowledgeSection,
      skills: syncLegacySkills(knowledgeSection),
      updatedAt: new Date().toISOString(),
    });
    window.alert("Kategorie wurde in das ausgewählte Profil kopiert.");
  };

  const pickMedia = async (kind: ProfileMediaKind) => {
    if (!window.bewerbungsManager) return;
    const selected =
      await window.bewerbungsManager.media.pickProfileImage(kind);
    if (!selected) return;
    setDraft((current) => ({
      ...current,
      [kind === "photo" ? "photoPath" : "signaturePath"]: selected.dataUrl,
    }));
  };

  const removeMedia = (kind: ProfileMediaKind) =>
    setDraft((current) => ({
      ...current,
      [kind === "photo" ? "photoPath" : "signaturePath"]: "",
    }));

  const addExperience = () =>
    setDraft((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        {
          id: crypto.randomUUID(),
          from: "",
          to: "heute",
          role: "",
          company: "",
          city: "",
          achievements: [""],
        },
      ],
    }));

  const addEducation = () =>
    setDraft((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          id: crypto.randomUUID(),
          from: "",
          to: "",
          degree: "",
          institution: "",
          city: "",
        },
      ],
    }));

  const drop = (
    type: DragItem["type"],
    targetId: string,
  ) => {
    if (!dragged || dragged.type !== type) return;
    if (type === "experience") {
      setDraft((current) => ({
        ...current,
        experiences: reorderItem(
          current.experiences,
          dragged.id,
          targetId,
        ),
      }));
    } else {
      setDraft((current) => ({
        ...current,
        education: reorderItem(current.education, dragged.id, targetId),
      }));
    }
    setDragged(undefined);
  };

  return (
    <div className="profile-layout">
      <aside className="surface profile-list">
        <header>
          <p className="eyebrow">Absender</p>
          <h3>Profile</h3>
        </header>
        {profiles.map((profile) => (
          <button
            key={profile.id}
            className={profile.id === draft.id ? "active" : ""}
            onClick={() => selectProfile(profile)}
          >
            <span>
              <UserRound size={18} />
            </span>
            <div>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
              <small>
                {profile.title || "Kein Titel"}
                {profile.isDefault ? " · Standard" : ""}
              </small>
            </div>
          </button>
        ))}
        <button
          className="button secondary"
          onClick={() => setDraft(newProfile())}
        >
          <Plus size={17} /> Neues Profil
        </button>
      </aside>

      <main className="surface profile-editor">
        <header className="section-header">
          <div>
            <p className="eyebrow">Lebenslauf-Stammdaten</p>
            <h2>
              {draft.firstName
                ? `${draft.firstName} ${draft.lastName}`
                : "Neues Profil"}
            </h2>
          </div>
          <span className="large-icon">
            <BriefcaseBusiness />
          </span>
        </header>

        <form onSubmit={(event) => void save(event)}>
          <EditorSection title="Persönliche Daten">
            <div className="form-grid">
              <TextField
                label="Vorname *"
                value={draft.firstName}
                required
                onChange={(firstName) =>
                  setDraft((current) => ({ ...current, firstName }))
                }
              />
              <TextField
                label="Nachname *"
                value={draft.lastName}
                required
                onChange={(lastName) =>
                  setDraft((current) => ({ ...current, lastName }))
                }
              />
              <TextField
                label="Berufsbezeichnung"
                value={draft.title}
                full
                onChange={(title) =>
                  setDraft((current) => ({ ...current, title }))
                }
              />
              <TextField
                label="Straße"
                value={draft.street}
                onChange={(street) =>
                  setDraft((current) => ({ ...current, street }))
                }
              />
              <div className="split-fields">
                <TextField
                  label="PLZ"
                  value={draft.postalCode}
                  onChange={(postalCode) =>
                    setDraft((current) => ({ ...current, postalCode }))
                  }
                />
                <TextField
                  label="Ort"
                  value={draft.city}
                  onChange={(city) =>
                    setDraft((current) => ({ ...current, city }))
                  }
                />
              </div>
              <TextField
                label="Telefon"
                value={draft.phone}
                onChange={(phone) =>
                  setDraft((current) => ({ ...current, phone }))
                }
              />
              <TextField
                label="E-Mail"
                value={draft.email}
                type="email"
                onChange={(email) =>
                  setDraft((current) => ({ ...current, email }))
                }
              />
              <TextField
                label="LinkedIn"
                value={draft.linkedin}
                onChange={(linkedin) =>
                  setDraft((current) => ({ ...current, linkedin }))
                }
              />
              <TextField
                label="GitHub"
                value={draft.github}
                onChange={(github) =>
                  setDraft((current) => ({ ...current, github }))
                }
              />
              <TextField
                label="Portfolio"
                value={draft.portfolio}
                full
                onChange={(portfolio) =>
                  setDraft((current) => ({ ...current, portfolio }))
                }
              />
              <label className="field full">
                <span>Kurzprofil</span>
                <textarea
                  rows={5}
                  value={draft.summary}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      summary: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
          </EditorSection>

          <EditorSection title="Bewerbungsfoto & Unterschrift">
            <div className="profile-media-grid">
              <ProfileMediaCard
                kind="photo"
                label="Lebenslauf-Foto"
                description="PNG, JPG oder WebP · maximal 8 MB"
                source={photoSource}
                onPick={() => void pickMedia("photo")}
                onRemove={() => removeMedia("photo")}
              />
              <ProfileMediaCard
                kind="signature"
                label="Unterschrift"
                description="Am besten als transparente PNG-Datei"
                source={signatureSource}
                onPick={() => void pickMedia("signature")}
                onRemove={() => removeMedia("signature")}
              />
            </div>
          </EditorSection>

          <EditorSection
            title="Berufserfahrung"
            action={
              <button
                type="button"
                className="button secondary small-button"
                onClick={addExperience}
              >
                <Plus size={15} /> Station hinzufügen
              </button>
            }
          >
            <div className="resume-editor-list">
              {draft.experiences.map((experience, index) => (
                <article
                  className="resume-editor-card"
                  draggable
                  key={experience.id}
                  onDragStart={() =>
                    setDragged({ type: "experience", id: experience.id })
                  }
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => drop("experience", experience.id)}
                >
                  <div className="drag-handle" title="Zum Sortieren ziehen">
                    <GripVertical size={18} />
                  </div>
                  <div className="resume-card-fields">
                    <div className="split-fields">
                      <TextField
                        label="Von"
                        value={experience.from}
                        onChange={(from) =>
                          setDraft((current) => ({
                            ...current,
                            experiences: current.experiences.map((item) =>
                              item.id === experience.id
                                ? { ...item, from }
                                : item,
                            ),
                          }))
                        }
                      />
                      <TextField
                        label="Bis"
                        value={experience.to}
                        onChange={(to) =>
                          setDraft((current) => ({
                            ...current,
                            experiences: current.experiences.map((item) =>
                              item.id === experience.id ? { ...item, to } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div className="form-grid">
                      <TextField
                        label="Position"
                        value={experience.role}
                        onChange={(role) =>
                          setDraft((current) => ({
                            ...current,
                            experiences: current.experiences.map((item) =>
                              item.id === experience.id
                                ? { ...item, role }
                                : item,
                            ),
                          }))
                        }
                      />
                      <TextField
                        label="Unternehmen"
                        value={experience.company}
                        onChange={(company) =>
                          setDraft((current) => ({
                            ...current,
                            experiences: current.experiences.map((item) =>
                              item.id === experience.id
                                ? { ...item, company }
                                : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <TextField
                      label="Ort"
                      value={experience.city}
                      onChange={(city) =>
                        setDraft((current) => ({
                          ...current,
                          experiences: current.experiences.map((item) =>
                            item.id === experience.id ? { ...item, city } : item,
                          ),
                        }))
                      }
                    />
                    <label className="field">
                      <span>Erfolge – eine Zeile je Punkt</span>
                      <textarea
                        rows={4}
                        value={experience.achievements.join("\n")}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            experiences: current.experiences.map((item) =>
                              item.id === experience.id
                                ? {
                                    ...item,
                                    achievements: event.target.value.split("\n"),
                                  }
                                : item,
                            ),
                          }))
                        }
                      />
                    </label>
                  </div>
                  <SortActions
                    index={index}
                    length={draft.experiences.length}
                    onMove={(direction) =>
                      setDraft((current) => ({
                        ...current,
                        experiences: moveItem(
                          current.experiences,
                          experience.id,
                          direction,
                        ),
                      }))
                    }
                    onRemove={() =>
                      setDraft((current) => ({
                        ...current,
                        experiences: current.experiences.filter(
                          (item) => item.id !== experience.id,
                        ),
                      }))
                    }
                  />
                </article>
              ))}
              {!draft.experiences.length && (
                <EditorEmpty text="Noch keine Berufserfahrung erfasst." />
              )}
            </div>
          </EditorSection>

          <EditorSection
            title="Ausbildung"
            action={
              <button
                type="button"
                className="button secondary small-button"
                onClick={addEducation}
              >
                <Plus size={15} /> Ausbildung hinzufügen
              </button>
            }
          >
            <div className="resume-editor-list">
              {draft.education.map((education, index) => (
                <article
                  className="resume-editor-card"
                  draggable
                  key={education.id}
                  onDragStart={() =>
                    setDragged({ type: "education", id: education.id })
                  }
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => drop("education", education.id)}
                >
                  <div className="drag-handle" title="Zum Sortieren ziehen">
                    <GripVertical size={18} />
                  </div>
                  <div className="resume-card-fields">
                    <div className="split-fields">
                      <TextField
                        label="Von"
                        value={education.from}
                        onChange={(from) =>
                          setDraft((current) => ({
                            ...current,
                            education: current.education.map((item) =>
                              item.id === education.id ? { ...item, from } : item,
                            ),
                          }))
                        }
                      />
                      <TextField
                        label="Bis"
                        value={education.to}
                        onChange={(to) =>
                          setDraft((current) => ({
                            ...current,
                            education: current.education.map((item) =>
                              item.id === education.id ? { ...item, to } : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div className="form-grid">
                      <TextField
                        label="Abschluss"
                        value={education.degree}
                        onChange={(degree) =>
                          setDraft((current) => ({
                            ...current,
                            education: current.education.map((item) =>
                              item.id === education.id
                                ? { ...item, degree }
                                : item,
                            ),
                          }))
                        }
                      />
                      <TextField
                        label="Institution"
                        value={education.institution}
                        onChange={(institution) =>
                          setDraft((current) => ({
                            ...current,
                            education: current.education.map((item) =>
                              item.id === education.id
                                ? { ...item, institution }
                                : item,
                            ),
                          }))
                        }
                      />
                    </div>
                    <TextField
                      label="Ort"
                      value={education.city}
                      onChange={(city) =>
                        setDraft((current) => ({
                          ...current,
                          education: current.education.map((item) =>
                            item.id === education.id ? { ...item, city } : item,
                          ),
                        }))
                      }
                    />
                  </div>
                  <SortActions
                    index={index}
                    length={draft.education.length}
                    onMove={(direction) =>
                      setDraft((current) => ({
                        ...current,
                        education: moveItem(
                          current.education,
                          education.id,
                          direction,
                        ),
                      }))
                    }
                    onRemove={() =>
                      setDraft((current) => ({
                        ...current,
                        education: current.education.filter(
                          (item) => item.id !== education.id,
                        ),
                      }))
                    }
                  />
                </article>
              ))}
              {!draft.education.length && (
                <EditorEmpty text="Noch keine Ausbildung erfasst." />
              )}
            </div>
          </EditorSection>

          <EditorSection title="Kenntnisse & Zusatzangaben">
            <KnowledgeSectionEditor
              value={draft.knowledgeSection}
              onChange={(knowledgeSection) =>
                setDraft((current) => ({ ...current, knowledgeSection }))
              }
              onCopyCategory={copyKnowledgeCategory}
            />
            <div className="form-grid knowledge-additional-grid">
              <ListField
                label="Sprachen"
                values={draft.languages}
                onChange={(languages) =>
                  setDraft((current) => ({ ...current, languages }))
                }
              />
              <ListField
                label="Zertifikate"
                values={draft.certifications}
                full
                onChange={(certifications) =>
                  setDraft((current) => ({ ...current, certifications }))
                }
              />
            </div>
          </EditorSection>

          <EditorSection title="Sichtbare Lebenslauf-Abschnitte">
            <div className="section-toggle-grid">
              {(
                [
                  ["profile", "Profil"],
                  ["experience", "Berufserfahrung"],
                  ["education", "Ausbildung"],
                  ["skills", "Kenntnisse"],
                  ["languages", "Sprachen"],
                  ["certifications", "Zertifikate"],
                ] as const
              ).map(([key, label]) => (
                <label className="checkbox-field" key={key}>
                  <input
                    type="checkbox"
                    checked={draft.resumeSections[key]}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        resumeSections: {
                          ...current.resumeSections,
                          [key]: event.target.checked,
                        },
                      }))
                    }
                  />
                  <span>{label} anzeigen</span>
                </label>
              ))}
            </div>
          </EditorSection>

          <label className="checkbox-field full profile-default">
            <input
              type="checkbox"
              checked={draft.isDefault}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  isDefault: event.target.checked,
                }))
              }
            />
            <span>Als Standardprofil verwenden</span>
          </label>

          <div className="save-bar sticky-save">
            <span>
              Reihenfolge und Sichtbarkeit werden direkt in Lebenslauf und PDF
              übernommen.
            </span>
            <button className="button primary" type="submit">
              <Save size={17} /> Profil speichern
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function EditorSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="profile-editor-section">
      <header>
        <h3>{title}</h3>
        {action}
      </header>
      {children}
    </section>
  );
}

function TextField({
  label,
  value,
  type = "text",
  required = false,
  full = false,
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ListField({
  label,
  values,
  full = false,
  onChange,
}: {
  label: string;
  values: string[];
  full?: boolean;
  onChange: (values: string[]) => void;
}) {
  return (
    <label className={`field ${full ? "full" : ""}`}>
      <span>{label} – Komma oder eine Zeile je Eintrag</span>
      <textarea
        rows={4}
        value={values.join(", ")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split(/[\n,]/)
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
      />
    </label>
  );
}

function SortActions({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <div className="sort-actions">
      <button
        type="button"
        className="icon-button"
        disabled={index === 0}
        aria-label="Nach oben verschieben"
        onClick={() => onMove(-1)}
      >
        <ArrowUp size={15} />
      </button>
      <button
        type="button"
        className="icon-button"
        disabled={index === length - 1}
        aria-label="Nach unten verschieben"
        onClick={() => onMove(1)}
      >
        <ArrowDown size={15} />
      </button>
      <button
        type="button"
        className="icon-button danger"
        aria-label="Eintrag löschen"
        onClick={onRemove}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function EditorEmpty({ text }: { text: string }) {
  return (
    <div className="editor-empty">
      <GraduationCap size={20} />
      <span>{text}</span>
    </div>
  );
}

function ProfileMediaCard({
  kind,
  label,
  description,
  source,
  onPick,
  onRemove,
}: {
  kind: ProfileMediaKind;
  label: string;
  description: string;
  source: string;
  onPick: () => void;
  onRemove: () => void;
}) {
  const Icon = kind === "photo" ? ImagePlus : PenLine;
  return (
    <article className={`profile-media-card media-${kind}`}>
      <div className="profile-media-preview">
        {source ? (
          <img src={source} alt={`${label} Vorschau`} />
        ) : (
          <Icon size={28} />
        )}
      </div>
      <div>
        <strong>{label}</strong>
        <small>{description}</small>
        <div className="profile-media-actions">
          <button
            className="button secondary small-button"
            type="button"
            onClick={onPick}
          >
            <Icon size={15} /> {source ? "Ersetzen" : "Auswählen"}
          </button>
          {source ? (
            <button
              className="icon-button danger"
              type="button"
              aria-label={`${label} entfernen`}
              onClick={onRemove}
            >
              <X size={15} />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
