import {
  ChevronDown,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ensureKnowledgeSection, syncLegacySkills } from "../../features/knowledge/knowledge.service";
import { validateKnowledgeSection } from "../../features/knowledge/knowledge.validation";
import type { ApplicantProfile } from "../../shared/schema";
import { KnowledgeSectionEditor } from "../knowledge/KnowledgeSectionEditor";

type Props = {
  profile: ApplicantProfile;
  onPreview: (profile: ApplicantProfile | null) => void;
  onSave: (profile: ApplicantProfile) => Promise<void>;
};

const cloneProfile = (profile: ApplicantProfile): ApplicantProfile => ({
  ...structuredClone(profile),
  knowledgeSection: ensureKnowledgeSection(
    profile.knowledgeSection,
    profile.skills,
  ),
});

const normalizeProfileUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "")}`;
};

export const normalizeResumeDataDraft = (
  draft: ApplicantProfile,
): ApplicantProfile => ({
  ...draft,
  linkedin: normalizeProfileUrl(draft.linkedin),
  github: normalizeProfileUrl(draft.github),
  portfolio: normalizeProfileUrl(draft.portfolio),
  experiences: draft.experiences.map((item) => ({
    ...item,
    achievements: item.achievements.map((value) => value.trim()).filter(Boolean),
  })),
  languages: draft.languages.map((value) => value.trim()).filter(Boolean),
  certifications: draft.certifications.map((value) => value.trim()).filter(Boolean),
  skills: syncLegacySkills(draft.knowledgeSection),
  updatedAt: new Date().toISOString(),
});

export function ResumeDataEditor({ profile, onPreview, onSave }: Props) {
  const [draft, setDraft] = useState<ApplicantProfile>(() => cloneProfile(profile));
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setDraft(cloneProfile(profile));
  }, [profile.id, profile.updatedAt]);

  useEffect(() => {
    onPreview(draft);
  }, [draft, onPreview]);

  useEffect(() => () => onPreview(null), [onPreview]);

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
          achievements: [],
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

  const reset = () => setDraft(cloneProfile(profile));

  const save = async () => {
    const issues = validateKnowledgeSection(draft.knowledgeSection);
    if (issues.length) {
      window.alert(issues[0].message);
      return;
    }
    const normalized = normalizeResumeDataDraft(draft);
    setDraft(normalized);
    await onSave(normalized);
  };

  return (
    <section className="resume-data-editor">
      <button
        className="resume-data-editor-trigger"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}>
        <span>
          <strong>Lebenslaufdaten bearbeiten</strong>
          <small>Einträge hinzufügen, ändern oder löschen</small>
        </span>
        <ChevronDown className={open ? "is-open" : ""} size={18} />
      </button>

      {open ? (
        <div className="resume-data-editor-body">
          <p className="resume-data-editor-hint">
            Diese Daten gehören zum ausgewählten Profil und werden in allen
            damit verbundenen Bewerbungen verwendet.
          </p>

          <details className="resume-data-group" open>
            <summary>Profil</summary>
            <div className="resume-data-field-grid resume-personal-fields">
              <EditorInput label="Vorname" value={draft.firstName} onChange={(firstName) => setDraft((current) => ({ ...current, firstName }))} />
              <EditorInput label="Nachname" value={draft.lastName} onChange={(lastName) => setDraft((current) => ({ ...current, lastName }))} />
              <EditorInput label="Berufsbezeichnung" value={draft.title} onChange={(title) => setDraft((current) => ({ ...current, title }))} />
              <EditorInput label="Telefon" value={draft.phone} onChange={(phone) => setDraft((current) => ({ ...current, phone }))} />
              <EditorInput label="E-Mail" value={draft.email} onChange={(email) => setDraft((current) => ({ ...current, email }))} />
              <EditorInput label="Straße" value={draft.street} onChange={(street) => setDraft((current) => ({ ...current, street }))} />
              <EditorInput label="PLZ" value={draft.postalCode} onChange={(postalCode) => setDraft((current) => ({ ...current, postalCode }))} />
              <EditorInput label="Ort" value={draft.city} onChange={(city) => setDraft((current) => ({ ...current, city }))} />
              <EditorInput label="Land" value={draft.country} onChange={(country) => setDraft((current) => ({ ...current, country }))} />
              <EditorInput label="LinkedIn" value={draft.linkedin} onChange={(linkedin) => setDraft((current) => ({ ...current, linkedin }))} />
              <EditorInput label="GitHub" value={draft.github} onChange={(github) => setDraft((current) => ({ ...current, github }))} />
              <EditorInput label="Portfolio" value={draft.portfolio} onChange={(portfolio) => setDraft((current) => ({ ...current, portfolio }))} />
              <EditorInput label="Geburtsdatum" value={draft.birthDate} onChange={(birthDate) => setDraft((current) => ({ ...current, birthDate }))} />
              <EditorInput label="Geburtsort" value={draft.birthPlace} onChange={(birthPlace) => setDraft((current) => ({ ...current, birthPlace }))} />
              <EditorInput label="Nationalität" value={draft.nationality} onChange={(nationality) => setDraft((current) => ({ ...current, nationality }))} />
            </div>
            <label className="field">
              <span>Allgemeine Zusammenfassung</span>
              <textarea
                rows={5}
                value={draft.summary}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, summary: event.target.value }))
                }
              />
            </label>
          </details>

          <details className="resume-data-group" open>
            <summary>
              <span>Berufserfahrung ({draft.experiences.length})</span>
            </summary>
            <button className="button secondary small-button" type="button" onClick={addExperience}>
              <Plus size={15} /> Station hinzufügen
            </button>
            <div className="resume-data-list">
              {draft.experiences.map((experience) => (
                <article className="resume-data-card" key={experience.id}>
                  <div className="resume-data-card-heading">
                    <strong>{experience.role || "Neue Station"}</strong>
                    <button
                      className="icon-button danger"
                      type="button"
                      aria-label="Berufserfahrung löschen"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          experiences: current.experiences.filter((item) => item.id !== experience.id),
                        }))
                      }>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="resume-data-field-grid">
                    <EditorInput label="Von" value={experience.from} onChange={(from) => setDraft((current) => ({ ...current, experiences: current.experiences.map((item) => item.id === experience.id ? { ...item, from } : item) }))} />
                    <EditorInput label="Bis" value={experience.to} onChange={(to) => setDraft((current) => ({ ...current, experiences: current.experiences.map((item) => item.id === experience.id ? { ...item, to } : item) }))} />
                    <EditorInput label="Position" value={experience.role} onChange={(role) => setDraft((current) => ({ ...current, experiences: current.experiences.map((item) => item.id === experience.id ? { ...item, role } : item) }))} />
                    <EditorInput label="Unternehmen" value={experience.company} onChange={(company) => setDraft((current) => ({ ...current, experiences: current.experiences.map((item) => item.id === experience.id ? { ...item, company } : item) }))} />
                    <EditorInput label="Ort" value={experience.city} onChange={(city) => setDraft((current) => ({ ...current, experiences: current.experiences.map((item) => item.id === experience.id ? { ...item, city } : item) }))} />
                  </div>
                  <label className="field">
                    <span>Aufgaben und Erfolge – eine Zeile je Punkt</span>
                    <textarea
                      rows={5}
                      value={experience.achievements.join("\n")}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          experiences: current.experiences.map((item) =>
                            item.id === experience.id
                              ? { ...item, achievements: event.target.value.split("\n") }
                              : item,
                          ),
                        }))
                      }
                    />
                  </label>
                </article>
              ))}
            </div>
          </details>

          <details className="resume-data-group">
            <summary>
              <span>Ausbildung ({draft.education.length})</span>
            </summary>
            <button className="button secondary small-button" type="button" onClick={addEducation}>
              <Plus size={15} /> Ausbildung hinzufügen
            </button>
            <div className="resume-data-list">
              {draft.education.map((education) => (
                <article className="resume-data-card" key={education.id}>
                  <div className="resume-data-card-heading">
                    <strong>{education.degree || "Neue Ausbildung"}</strong>
                    <button
                      className="icon-button danger"
                      type="button"
                      aria-label="Ausbildung löschen"
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          education: current.education.filter((item) => item.id !== education.id),
                        }))
                      }>
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="resume-data-field-grid">
                    <EditorInput label="Von" value={education.from} onChange={(from) => setDraft((current) => ({ ...current, education: current.education.map((item) => item.id === education.id ? { ...item, from } : item) }))} />
                    <EditorInput label="Bis" value={education.to} onChange={(to) => setDraft((current) => ({ ...current, education: current.education.map((item) => item.id === education.id ? { ...item, to } : item) }))} />
                    <EditorInput label="Abschluss" value={education.degree} onChange={(degree) => setDraft((current) => ({ ...current, education: current.education.map((item) => item.id === education.id ? { ...item, degree } : item) }))} />
                    <EditorInput label="Institution" value={education.institution} onChange={(institution) => setDraft((current) => ({ ...current, education: current.education.map((item) => item.id === education.id ? { ...item, institution } : item) }))} />
                    <EditorInput label="Ort" value={education.city} onChange={(city) => setDraft((current) => ({ ...current, education: current.education.map((item) => item.id === education.id ? { ...item, city } : item) }))} />
                  </div>
                </article>
              ))}
            </div>
          </details>

          <details className="resume-data-group">
            <summary>Kenntnisse</summary>
            <KnowledgeSectionEditor
              value={draft.knowledgeSection}
              onChange={(knowledgeSection) =>
                setDraft((current) => ({ ...current, knowledgeSection }))
              }
            />
          </details>

          <details className="resume-data-group">
            <summary>Sprachen und Zertifikate</summary>
            <label className="field">
              <span>Sprachen – eine Zeile je Eintrag</span>
              <textarea rows={5} value={draft.languages.join("\n")} onChange={(event) => setDraft((current) => ({ ...current, languages: event.target.value.split("\n") }))} />
            </label>
            <label className="field">
              <span>Zertifikate – eine Zeile je Eintrag</span>
              <textarea rows={5} value={draft.certifications.join("\n")} onChange={(event) => setDraft((current) => ({ ...current, certifications: event.target.value.split("\n") }))} />
            </label>
          </details>

          <div className="resume-data-actions">
            <button className="button secondary" type="button" onClick={reset}>
              <RotateCcw size={15} /> Verwerfen
            </button>
            <button className="button primary" type="button" onClick={() => void save()}>
              <Save size={15} /> Profildaten speichern
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function EditorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
