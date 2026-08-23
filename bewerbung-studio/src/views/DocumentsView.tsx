import {
  Download,
  FileDown,
  FileText,
  FolderOpen,
  ImagePlus,
  Palette,
  PenLine,
  Save,
  UserRound,
  X,
} from "lucide-react";
import {
  useEffect,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { TemplateThumbnail } from "../components/TemplateThumbnail";
import { KnowledgeSectionRenderer } from "../components/document/KnowledgeSectionRenderer";
import { DocumentBackgroundLayer } from "../components/document/DocumentBackgroundLayer";
import { ResumeDataEditor } from "../components/resume/ResumeDataEditor";
import { ResumeSectionsPanel } from "../components/resume/ResumeSectionsPanel";
import { ElegantResume } from "../components/resume/templates/elegant";
import { EinspaltigResume } from "../components/resume/templates/einspaltig";
import { GepflegtResume } from "../components/resume/templates/gepflegt";
import { KlassischResume } from "../components/resume/templates/klassisch";
import { MehrspaltigResume } from "../components/resume/templates/mehrspaltig";
import { KompaktResume } from "../components/resume/templates/kompakt";
import { KreativResume } from "../components/resume/templates/kreativ";
import { IvyLeagueResume } from "../components/resume/templates/ivy-league";
import { ModernResume } from "../components/resume/templates/modern";
import { StilvollResume } from "../components/resume/templates/stilvoll";
import { TabellarischResume } from "../components/resume/templates/tabellarisch";
import { ZeitgenoessischResume } from "../components/resume/templates/zeitgenoessisch";
import { ZweispaltigResume } from "../components/resume/templates/zweispaltig";
import { analyzeKeywordMatch } from "../lib/keywordMatch";
import { formatApplicationDateLong } from "../shared/applicationDate";
import {
  createResumePagePlan,
  einspaltigPaginationOptions,
  elegantPaginationOptions,
  getLetterPageStatus,
  ivyLeaguePaginationOptions,
  klassischPaginationOptions,
  mehrspaltigPaginationOptions,
  kompaktPaginationOptions,
  kreativPaginationOptions,
  gepflegtPaginationOptions,
  modernPaginationOptions,
  stilvollPaginationOptions,
  tabellarischPaginationOptions,
  type ResumePagePlan,
  zeitgenoessischPaginationOptions,
  zweispaltigPaginationOptions,
} from "../shared/documentPagination";
import {
  columnLayoutOptions,
  defaultDocumentDesign,
  documentBackgrounds,
  documentFonts,
  getDocumentDesignVariables,
  programmingLanguageBackgroundTokens,
  type DocumentDesignSettings,
} from "../shared/documentDesign";
import type { ProfileMediaKind } from "../shared/ipc";
import { getProfileMediaSource } from "../shared/profileMedia";
import type {
  ApplicantProfile,
  Application,
  DocumentDraft,
} from "../shared/schema";
import {
  colorPresets,
  getReadableTextColor,
  getTemplate,
  templates,
} from "../shared/templates";
import {
  selectCurrentApplication,
  useAppStore,
} from "../store/useAppStore";

type Tab = "deckblatt" | "anschreiben" | "lebenslauf";

type ResumePreviewPageProps = {
  application: Application;
  atsMode: boolean;
  documents: DocumentDraft;
  name: string;
  plan: ResumePagePlan;
  profile: ApplicantProfile | undefined;
  sections: ApplicantProfile["resumeSections"];
  totalPages: number;
};

function ResumePreviewPage({
  application,
  atsMode,
  documents,
  name,
  plan,
  profile,
  sections,
  totalPages,
}: ResumePreviewPageProps) {
  const experienceIds = new Set(
    plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => item.id),
  );
  const educationIds = new Set(
    plan.items
      .filter((item) => item.kind === "education")
      .map((item) => item.id),
  );
  const experiences = (profile?.experiences ?? []).filter((entry) =>
    experienceIds.has(entry.id),
  );
  const education = (profile?.education ?? []).filter((entry) =>
    educationIds.has(entry.id),
  );
  const isContinuation = plan.pageNumber === 2;
  const initials = profile
    ? `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`
    : "VN";
  const photoSource = getProfileMediaSource(profile?.photoPath);
  const showResumeAvatar = !atsMode;
  const avatar = (
    <span className={`cv-avatar ${photoSource ? "has-image" : ""}`}>
      {photoSource ? (
        <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
      ) : (
        initials
      )}
    </span>
  );

  return (
    <div
      className={`resume-preview cv-${plan.density} ${isContinuation ? "cv-continuation" : ""}`}
      data-resume-page={plan.pageNumber}>
      <header className="cv-preview-header">
        <div>
          <p className="paper-kicker">
            {isContinuation ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}
          </p>
          <h1>{name}</h1>
          <h2>{profile?.title || application.job.title}</h2>
          <p className="cv-contact-line">
            {profile?.phone || "Telefon"} · {profile?.email || "E-Mail"} ·{" "}
            {profile?.city || "Ort"}
            {profile?.linkedin ? ` · ${profile.linkedin}` : ""}
          </p>
        </div>
        {showResumeAvatar ? avatar : null}
      </header>
      {atsMode && !isContinuation ? (
        <aside className="cv-preview-side">
          {sections.profile && (
            <section>
              <h3>Zusammenfassung</h3>
              <p>
                {documents.resumeProfile ||
                  profile?.summary ||
                  "Kurzprofil ergänzen …"}
              </p>
            </section>
          )}
          {sections.skills && (
            <KnowledgeSectionRenderer
              section={profile?.knowledgeSection}
              legacySkills={profile?.skills}
              atsMode={atsMode}
            />
          )}
          {sections.languages && profile?.languages.length ? (
            <section>
              <h3>Sprachen</h3>
              <div className="language-list">
                {profile.languages.map((language) => (
                  <p className="language-plain" key={language}>
                    <span>{language}</span>
                  </p>
                ))}
              </div>
            </section>
          ) : null}
          {sections.certifications && profile?.certifications.length ? (
            <section>
              <h3>Zertifikate</h3>
              <ul>
                {profile.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      ) : null}
      <main className="cv-preview-main">
        {sections.experience && experiences.length ? (
          <section>
            <h3>Berufserfahrung{isContinuation ? " · Fortsetzung" : ""}</h3>
            {experiences.map((entry) => (
              <article className="resume-entry" key={entry.id}>
                <div className="resume-entry-title">
                  <div>
                    <strong>{entry.role}</strong>
                    <p>{entry.company}</p>
                  </div>
                  <small>
                    {entry.from} – {entry.to}
                    <br />
                    {entry.city}
                  </small>
                </div>
                <ul>
                  {entry.achievements.filter(Boolean).map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        ) : null}
        {sections.education && education.length ? (
          <section>
            <h3>Ausbildung</h3>
            {education.map((entry) => (
              <article className="resume-entry education-entry" key={entry.id}>
                <div className="resume-entry-title">
                  <div>
                    <strong>{entry.degree}</strong>
                    <p>{entry.institution}</p>
                  </div>
                  <small>
                    {entry.from} – {entry.to}
                    <br />
                    {entry.city}
                  </small>
                </div>
              </article>
            ))}
          </section>
        ) : null}
        {!experiences.length && !education.length && plan.pageNumber === 1 ? (
          <p className="paper-muted">
            Berufserfahrung und Ausbildung im Profil ergänzen.
          </p>
        ) : null}
      </main>
      {!isContinuation && !atsMode ? (
        <aside className="cv-preview-side">
          <span
            className={`side-avatar cv-avatar ${photoSource ? "has-image" : ""}`}>
            {photoSource ? (
              <img src={photoSource} alt={`Bewerbungsfoto von ${name}`} />
            ) : (
              initials
            )}
          </span>
          {sections.profile && (
            <section>
              <h3>Zusammenfassung</h3>
              <p>
                {documents.resumeProfile ||
                  profile?.summary ||
                  "Kurzprofil ergänzen …"}
              </p>
            </section>
          )}
          {sections.skills && (
            <KnowledgeSectionRenderer
              section={profile?.knowledgeSection}
              legacySkills={profile?.skills}
              atsMode={atsMode}
            />
          )}
          {sections.languages && profile?.languages.length ? (
            <section>
              <h3>Sprachen</h3>
              <div className="language-list">
                {profile.languages.map((language) => (
                  <p key={language}>
                    <span>{language}</span>
                    {atsMode ? null : <i>●●●●○</i>}
                  </p>
                ))}
              </div>
            </section>
          ) : null}
          {sections.certifications && profile?.certifications.length ? (
            <section>
              <h3>Zertifikate</h3>
              <ul>
                {profile.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      ) : null}
      <span className="preview-page-number">
        {plan.pageNumber} / {totalPages}
      </span>
    </div>
  );
}

export function DocumentsView({ initialTab = "anschreiben" }: { initialTab?: Tab }) {
  const application = useAppStore(selectCurrentApplication);
  const profiles = useAppStore((state) => state.workspace.profiles);
  const saveApplication = useAppStore((state) => state.saveApplication);
  const syncCoverLetter = useAppStore((state) => state.syncCoverLetter);
  const saveProfile = useAppStore((state) => state.saveProfile);
  const exportPdf = useAppStore((state) => state.exportPdf);
  const openFolder = useAppStore((state) => state.openFolder);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [designPanelOpen, setDesignPanelOpen] = useState(true);
  const [resumeSectionPreview, setResumeSectionPreview] = useState<{
    templateId: string;
    profile: ApplicantProfile;
  } | null>(null);
  const [documentPreview, setDocumentPreview] = useState<{
    applicationId: string;
    documents: DocumentDraft;
  } | null>(null);
  const handleResumeSectionPreview = useCallback(
    (templateId: string, previewProfile: ApplicantProfile | null) => {
      setResumeSectionPreview((current) => {
        if (!previewProfile) return null;
        const base =
          current?.templateId === templateId &&
          current.profile.id === previewProfile.id
            ? current.profile
            : previewProfile;
        return {
          templateId,
          profile: {
            ...base,
            resumeSections: previewProfile.resumeSections,
            resumeSectionLayout: previewProfile.resumeSectionLayout,
            resumeSectionLayouts: previewProfile.resumeSectionLayouts,
          },
        };
      });
    },
    [],
  );
  const handleResumeDataPreview = useCallback(
    (previewProfile: ApplicantProfile | null) => {
      setResumeSectionPreview((current) => {
        if (!previewProfile) return null;
        const preservedLayout =
          current?.profile.id === previewProfile.id
            ? {
                resumeSections: current.profile.resumeSections,
                resumeSectionLayout: current.profile.resumeSectionLayout,
                resumeSectionLayouts: current.profile.resumeSectionLayouts,
              }
            : {};
        return {
          templateId: current?.templateId ?? "",
          profile: { ...previewProfile, ...preservedLayout },
        };
      });
    },
    [],
  );
  const [design, setDesign] = useState({
    applicationId: "",
    templateId: templates[0].id,
    accentColor: templates[0].accent,
    secondaryColor: templates[0].secondary,
    settings: defaultDocumentDesign,
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => setTab(initialTab), [initialTab]);
  useEffect(() => {
    if (!application || application.id === design.applicationId) return;
    setDesign({
      applicationId: application.id,
      templateId: application.templateId,
      accentColor: application.accentColor,
      secondaryColor: application.secondaryColor,
      settings: application.designSettings,
    });
  }, [application, design.applicationId]);
  useEffect(() => {
    if (!application) {
      setDocumentPreview(null);
      return;
    }
    setDocumentPreview({
      applicationId: application.id,
      documents: application.documents,
    });
  }, [application]);

  if (!application) {
    return (
      <section className="surface empty-detail">
        <div className="empty-state">
          <FileText size={28} />
          <h3>Noch keine Bewerbung</h3>
          <p>Legen Sie zuerst eine Bewerbung an, um Unterlagen zu erstellen.</p>
        </div>
      </section>
    );
  }
  const profile =
    profiles.find((item) => item.id === application.profileId) ??
    profiles.find((item) => item.isDefault);
  const photoSource = getProfileMediaSource(profile?.photoPath);
  const signatureSource = getProfileMediaSource(profile?.signaturePath);
  const template = getTemplate(design.templateId);
  const renderProfile =
    resumeSectionPreview?.templateId === template.id &&
    resumeSectionPreview.profile.id === profile?.id
      ? resumeSectionPreview.profile
      : profile;
  const docs =
    documentPreview?.applicationId === application.id
      ? documentPreview.documents
      : application.documents;
  const sections = renderProfile?.resumeSections ?? {
    profile: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
  };
  const keywordMatch = analyzeKeywordMatch(application, renderProfile);
  const name = renderProfile
    ? `${renderProfile.firstName} ${renderProfile.lastName}`
    : "Vorname Nachname";
  const senderContactDetails = renderProfile
    ? [
        renderProfile.street,
        `${renderProfile.postalCode} ${renderProfile.city}`.trim(),
        renderProfile.email,
        renderProfile.phone,
      ]
        .filter(Boolean)
        .join(" · ")
    : "Adresse · E-Mail · Telefon";
  const recipientName = [
    application.contact.firstName,
    application.contact.lastName,
  ]
    .filter(Boolean)
    .join(" ");
  const recipientContactLine = recipientName
    ? application.contact.salutation === "Herr"
      ? `Herrn ${recipientName}`
      : application.contact.salutation === "Frau"
        ? `Frau ${recipientName}`
        : recipientName
    : "";
  const paginatedProfile = renderProfile
    ? {
        ...renderProfile,
        experiences: sections.experience ? renderProfile.experiences : [],
        education: sections.education ? renderProfile.education : [],
      }
    : undefined;
  const resumePlan = createResumePagePlan(
    paginatedProfile,
    docs.resumeProfile,
    template.id === "elegant"
      ? elegantPaginationOptions
      : template.id === "zweispaltig"
        ? zweispaltigPaginationOptions
        : template.id === "kompakt"
          ? kompaktPaginationOptions
          : template.id === "kreativ"
            ? kreativPaginationOptions
            : template.id === "gepflegt"
              ? gepflegtPaginationOptions
              : template.id === "zeitgenoessisch"
                ? zeitgenoessischPaginationOptions
                : template.id === "ivy-league"
                  ? ivyLeaguePaginationOptions
                  : template.id === "stilvoll"
                    ? stilvollPaginationOptions
                    : template.id === "einspaltig"
                      ? einspaltigPaginationOptions
                      : template.id === "klassisch"
                        ? klassischPaginationOptions
                        : template.id === "mehrspaltig"
                          ? mehrspaltigPaginationOptions
                        : template.id === "tabellarisch"
                          ? tabellarischPaginationOptions
                          : template.id === "modern"
                            ? modernPaginationOptions
                            : undefined,
  );
  const letterStatus = getLetterPageStatus(docs);
  const isAtsMode =
    design.settings.resumeOutputMode === "ats" ||
    design.settings.columnLayout === "compact-ats";
  const effectiveColumnLayout = isAtsMode
    ? "compact-ats"
    : design.settings.columnLayout;
  const paperStyle = {
    "--doc-accent": design.accentColor,
    "--doc-secondary": design.secondaryColor,
    "--doc-on-secondary": getReadableTextColor(design.secondaryColor),
    ...getDocumentDesignVariables(design.settings),
  } as CSSProperties;
  const designClassName = `column-${effectiveColumnLayout} background-${design.settings.backgroundId} ${
    design.settings.showBackgroundInPrint
      ? "print-background"
      : "no-print-background"
  }`;

  const updateDesignSetting = <
    Key extends keyof DocumentDesignSettings,
  >(
    key: Key,
    value: DocumentDesignSettings[Key],
  ) => {
    setDesign((current) => ({
      ...current,
      settings: {
        ...current.settings,
        [key]: value,
      },
    }));
  };

  const saveResumeData = async (changedProfile: ApplicantProfile) => {
    const preview =
      resumeSectionPreview?.profile.id === changedProfile.id
        ? resumeSectionPreview.profile
        : undefined;
    await saveProfile({
      ...changedProfile,
      ...(preview
        ? {
            resumeSections: preview.resumeSections,
            resumeSectionLayout: preview.resumeSectionLayout,
            resumeSectionLayouts: preview.resumeSectionLayouts,
          }
        : {}),
      updatedAt: new Date().toISOString(),
    });
  };

  const saveResumeSections = async (changedProfile: ApplicantProfile) => {
    const preview =
      resumeSectionPreview?.profile.id === changedProfile.id
        ? resumeSectionPreview.profile
        : changedProfile;
    await saveProfile({
      ...preview,
      resumeSections: changedProfile.resumeSections,
      resumeSectionLayout: changedProfile.resumeSectionLayout,
      resumeSectionLayouts: changedProfile.resumeSectionLayouts,
      updatedAt: new Date().toISOString(),
    });
  };

  const pickProfileMedia = async (kind: ProfileMediaKind) => {
    if (!profile || !window.bewerbungsManager) return;
    const selected =
      await window.bewerbungsManager.media.pickProfileImage(kind);
    if (!selected) return;
    await saveProfile({
      ...profile,
      [kind === "photo" ? "photoPath" : "signaturePath"]: selected.dataUrl,
      updatedAt: new Date().toISOString(),
    });
  };

  const removeProfileMedia = async (kind: ProfileMediaKind) => {
    if (!profile) return;
    await saveProfile({
      ...profile,
      [kind === "photo" ? "photoPath" : "signaturePath"]: "",
      updatedAt: new Date().toISOString(),
    });
  };

  const applicationSnapshot = (
    form: HTMLFormElement | null,
  ): Application => {
    const data = form ? new FormData(form) : null;
    const value = (name: string, fallback: string) => {
      const current = data?.get(name);
      return typeof current === "string" ? current : fallback;
    };
    return {
      ...application,
      templateId: design.templateId,
      accentColor: design.accentColor,
      secondaryColor: design.secondaryColor,
      designSettings: design.settings,
      documents: {
        coverSubject: value("coverSubject", docs.coverSubject),
        coverIntroduction: value(
          "coverIntroduction",
          docs.coverIntroduction,
        ),
        coverMotivation: value(
          "coverMotivation",
          docs.coverMotivation,
        ),
        coverQualification: value(
          "coverQualification",
          docs.coverQualification,
        ),
        coverCompanyFit: value(
          "coverCompanyFit",
          docs.coverCompanyFit,
        ),
        coverExtraParagraph: value(
          "coverExtraParagraph",
          docs.coverExtraParagraph,
        ),
        coverClosing: value("coverClosing", docs.coverClosing),
        resumeProfile: value("resumeProfile", docs.resumeProfile),
        deckblattStatement: value(
          "deckblattStatement",
          docs.deckblattStatement,
        ),
      },
    };
  };

  const previewDocumentInput = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    const target = event.target;
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLTextAreaElement)
    ) {
      return;
    }
    const name = target.name as keyof DocumentDraft;
    if (!name || !(name in docs)) return;
    setDocumentPreview({
      applicationId: application.id,
      documents: { ...docs, [name]: target.value },
    });
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snapshot = applicationSnapshot(event.currentTarget);
    await saveApplication(snapshot);
    if (tab === "anschreiben") {
      await syncCoverLetter(snapshot.id);
    }
  };

  const exportCurrentPdf = async (
    target: "deckblatt" | "anschreiben" | "lebenslauf" | "mappe",
  ) => {
    const snapshot = applicationSnapshot(formRef.current);
    await saveApplication(snapshot);
    await exportPdf(snapshot.id, target, snapshot);
  };

  return (
    <div className="document-workspace">
      <section className="document-toolbar surface">
        <div>
          <p className="eyebrow">Synchronisiertes Bewerbungsset</p>
          <h2>{application.company.name}</h2>
          <p>
            {template.name} · {application.job.title}
          </p>
        </div>
        <div className="toolbar-buttons">
          <button
            className="button secondary"
            onClick={() => void openFolder(application.id)}>
            <FolderOpen size={17} /> Ordner
          </button>
          <button
            className="button secondary"
            onClick={() => void exportCurrentPdf(tab)}>
            <FileDown size={17} />{" "}
            {tab === "deckblatt"
              ? "Deckblatt"
              : tab === "anschreiben"
                ? "Anschreiben"
                : "Lebenslauf"}{" "}
            PDF
          </button>
          <button
            className="button primary"
            onClick={() => void exportCurrentPdf("mappe")}>
            <Download size={17} /> Bewerbungsmappe
          </button>
        </div>
      </section>
      <section className="document-layout">
        <aside className="document-editor surface">
          <div className="document-tabs">
            <button
              className={tab === "deckblatt" ? "active" : ""}
              onClick={() => setTab("deckblatt")}>
              Deckblatt
            </button>
            <button
              className={tab === "anschreiben" ? "active" : ""}
              onClick={() => setTab("anschreiben")}>
              Anschreiben
            </button>
            <button
              className={tab === "lebenslauf" ? "active" : ""}
              onClick={() => setTab("lebenslauf")}>
              Lebenslauf
            </button>
          </div>
          <form
            key={application.id}
            ref={formRef}
            onInput={previewDocumentInput}
            onSubmit={(event) => void save(event)}>
            {tab === "deckblatt" && (
              <label className="field">
                <span>Kurzprofil auf dem Deckblatt</span>
                <textarea
                  name="deckblattStatement"
                  rows={8}
                  defaultValue={docs.deckblattStatement}
                  placeholder="Prägnante Positionierung in zwei bis drei Sätzen …"
                />
              </label>
            )}
            {tab === "anschreiben" && (
              <>
                <label className="field">
                  <span>Betreff</span>
                  <input name="coverSubject" defaultValue={docs.coverSubject} />
                </label>
                <label className="field">
                  <span>Einleitung</span>
                  <textarea
                    name="coverIntroduction"
                    rows={4}
                    defaultValue={docs.coverIntroduction}
                  />
                </label>
                <label className="field">
                  <span>Motivation</span>
                  <textarea
                    name="coverMotivation"
                    rows={5}
                    defaultValue={docs.coverMotivation}
                  />
                </label>
                <label className="field">
                  <span>Fachliche Eignung</span>
                  <textarea
                    name="coverQualification"
                    rows={5}
                    defaultValue={docs.coverQualification}
                  />
                </label>
                <label className="field">
                  <span>Unternehmensbezug</span>
                  <textarea
                    name="coverCompanyFit"
                    rows={5}
                    defaultValue={docs.coverCompanyFit}
                  />
                </label>
                <label className="field">
                  <span>Zusätzlicher Absatz (optional)</span>
                  <textarea
                    name="coverExtraParagraph"
                    rows={4}
                    defaultValue={docs.coverExtraParagraph}
                    placeholder="Optionaler zusätzlicher Absatz – leer lassen, wenn er nicht benötigt wird."
                  />
                </label>
                <label className="field">
                  <span>Schluss</span>
                  <textarea
                    name="coverClosing"
                    rows={5}
                    defaultValue={docs.coverClosing}
                  />
                </label>
                <div className="document-media-inline">
                  <span>Unterschrift</span>
                  <DocumentMediaCard
                    kind="signature"
                    label="Unterschrift"
                    source={signatureSource}
                    disabled={!profile}
                    onPick={() => void pickProfileMedia("signature")}
                    onRemove={() => void removeProfileMedia("signature")}
                  />
                </div>
                <section
                  className={`page-limit-status ${letterStatus.isOverRecommendedLength ? "warning" : "ok"}`}>
                  <strong>Anschreiben: 1 A4-Seite</strong>
                  <span>
                    {letterStatus.characterCount.toLocaleString("de-DE")} /{" "}
                    {letterStatus.recommendedMaximum.toLocaleString("de-DE")}{" "}
                    empfohlene Zeichen
                  </span>
                  <small>
                    {letterStatus.isOverRecommendedLength
                      ? "Der Text wird für den PDF-Export automatisch verkleinert. Kürzen verbessert die Lesbarkeit."
                      : "Der aktuelle Text liegt im gut lesbaren Ein-Seiten-Bereich."}
                  </small>
                </section>
                <p className="word-sync-note">
                  Beim Speichern wird die Word-Datei aus der persönlichen
                  Anschreiben-Vorlage im Bewerbungsordner erstellt oder
                  aktualisiert.
                </p>
              </>
            )}
            {tab === "lebenslauf" && (
              <>
                <section className="page-limit-status ok">
                  <strong>Lebenslauf: {resumePlan.length} / 2 A4-Seiten</strong>
                  <span>
                    Einträge werden vollständig und ohne mitten im Eintrag
                    umzubrechen verteilt.
                  </span>
                </section>
                {profile ? (
                  <>
                    <ResumeDataEditor
                      profile={profile}
                      onPreview={handleResumeDataPreview}
                      onSave={saveResumeData}
                    />
                    <ResumeSectionsPanel
                      profile={profile}
                      singlePageExceeded={
                        template.id === "kompakt" && resumePlan.length > 1
                      }
                      templateId={template.id}
                      onSave={saveResumeSections}
                      onPreview={handleResumeSectionPreview}
                    />
                  </>
                ) : null}
                <button
                  className="design-panel-trigger"
                  type="button"
                  aria-expanded={designPanelOpen}
                  onClick={() => setDesignPanelOpen((current) => !current)}>
                  <Palette size={18} />
                  <span>
                    <strong>Design und Schriftart</strong>
                    <small>
                      Farben, Abstände, Schrift, Spalten und Hintergrund
                    </small>
                  </span>
                </button>
                <section
                  className={`document-design-panel ${designPanelOpen ? "" : "collapsed"}`}>
                  <div className="design-panel-heading">
                    <div>
                      <span>Design und Schriftart</span>
                      <small>
                        Modell und Farben gelten auch für den PDF-Export.
                      </small>
                    </div>
                    <div className="design-panel-heading-actions">
                      <strong>{template.name}</strong>
                      <button
                        className="icon-button"
                        type="button"
                        aria-label="Designpanel schließen"
                        onClick={() => setDesignPanelOpen(false)}>
                        <X size={17} />
                      </button>
                    </div>
                  </div>
                  <div className="compact-template-grid">
                    {templates.map((item) => (
                      <button
                        className={item.id === template.id ? "selected" : ""}
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setDesign((current) => ({
                            ...current,
                            templateId: item.id,
                            accentColor: item.accent,
                            secondaryColor: item.secondary,
                            settings: {
                              ...current.settings,
                              ...(item.designDefaults ?? {}),
                            },
                          }))
                        }>
                        <TemplateThumbnail
                          template={item}
                          accent={
                            item.id === template.id
                              ? design.accentColor
                              : item.accent
                          }
                          secondary={
                            item.id === template.id
                              ? design.secondaryColor
                              : item.secondary
                          }
                        />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="document-color-controls">
                    <div className="color-preset-row">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          title={preset.name}
                          aria-label={preset.name}
                          style={
                            {
                              "--preset-accent": preset.accent,
                              "--preset-secondary": preset.secondary,
                            } as CSSProperties
                          }
                          onClick={() =>
                            setDesign((current) => ({
                              ...current,
                              accentColor: preset.accent,
                              secondaryColor: preset.secondary,
                            }))
                          }
                        />
                      ))}
                    </div>
                    <label>
                      <span>Akzent</span>
                      <input
                        type="color"
                        value={design.accentColor}
                        onChange={(event) =>
                          setDesign((current) => ({
                            ...current,
                            accentColor: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      <span>Fläche</span>
                      <input
                        type="color"
                        value={design.secondaryColor}
                        onChange={(event) =>
                          setDesign((current) => ({
                            ...current,
                            secondaryColor: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>
                  <div className="advanced-design-grid">
                    <label className="design-range">
                      <span>
                        Seitenränder
                        <b>{design.settings.marginLevel}</b>
                      </span>
                      <input
                        aria-label="Seitenränder"
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={design.settings.marginLevel}
                        onChange={(event) =>
                          updateDesignSetting(
                            "marginLevel",
                            Number(
                              event.target.value,
                            ) as DocumentDesignSettings["marginLevel"],
                          )
                        }
                      />
                      <small>
                        <i>schmal</i>
                        <i>breit</i>
                      </small>
                    </label>
                    <label className="design-range">
                      <span>
                        Abschnittsabstand
                        <b>{design.settings.sectionSpacingLevel}</b>
                      </span>
                      <input
                        aria-label="Abschnittsabstand"
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={design.settings.sectionSpacingLevel}
                        onChange={(event) =>
                          updateDesignSetting(
                            "sectionSpacingLevel",
                            Number(
                              event.target.value,
                            ) as DocumentDesignSettings["sectionSpacingLevel"],
                          )
                        }
                      />
                      <small>
                        <i>kompakt</i>
                        <i>mehr Platz</i>
                      </small>
                    </label>
                    <label className="design-range">
                      <span>
                        Zeilenhöhe
                        <b>{design.settings.lineHeightLevel}</b>
                      </span>
                      <input
                        aria-label="Zeilenhöhe"
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={design.settings.lineHeightLevel}
                        onChange={(event) =>
                          updateDesignSetting(
                            "lineHeightLevel",
                            Number(
                              event.target.value,
                            ) as DocumentDesignSettings["lineHeightLevel"],
                          )
                        }
                      />
                      <small>
                        <i>komprimiert</i>
                        <i>geräumig</i>
                      </small>
                    </label>
                  </div>
                  <div className="design-option-group">
                    <span>Schriftgröße</span>
                    <div className="segmented-design-control">
                      {(["small", "medium", "large"] as const).map((size) => (
                        <button
                          className={
                            design.settings.fontSize === size ? "selected" : ""
                          }
                          key={size}
                          type="button"
                          onClick={() => updateDesignSetting("fontSize", size)}>
                          {size === "small"
                            ? "Small"
                            : size === "medium"
                              ? "Medium"
                              : "Large"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="design-font-grid">
                    <label className="field">
                      <span>Textschrift</span>
                      <select
                        value={design.settings.fontId}
                        onChange={(event) =>
                          updateDesignSetting(
                            "fontId",
                            event.target
                              .value as DocumentDesignSettings["fontId"],
                          )
                        }>
                        {documentFonts.map((font) => (
                          <option key={font.id} value={font.id}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>Überschrift</span>
                      <select
                        value={design.settings.headingFontId}
                        onChange={(event) =>
                          updateDesignSetting(
                            "headingFontId",
                            event.target
                              .value as DocumentDesignSettings["headingFontId"],
                          )
                        }>
                        {documentFonts.map((font) => (
                          <option key={font.id} value={font.id}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="design-option-group">
                    <span>Ausgabemodus</span>
                    <div className="segmented-design-control">
                      {(["visual", "ats"] as const).map((mode) => (
                        <button
                          className={
                            design.settings.resumeOutputMode === mode
                              ? "selected"
                              : ""
                          }
                          key={mode}
                          type="button"
                          onClick={() =>
                            updateDesignSetting("resumeOutputMode", mode)
                          }>
                          {mode === "visual" ? "Visual" : "ATS optimiert"}
                        </button>
                      ))}
                    </div>
                    {isAtsMode ? (
                      <p className="design-ats-background-note">
                        ATS-Modus nutzt automatisch ein lineares, einspaltiges
                        Layout mit reduzierter Visualisierung.
                      </p>
                    ) : null}
                  </div>
                  <div className="design-option-group">
                    <span>Spaltenanordnung</span>
                    <div className="column-layout-picker">
                      {columnLayoutOptions.map((option) => (
                        <button
                          className={
                            design.settings.columnLayout === option.id
                              ? "selected"
                              : ""
                          }
                          key={option.id}
                          title={option.description}
                          type="button"
                          onClick={() =>
                            updateDesignSetting("columnLayout", option.id)
                          }>
                          <i
                            className={`column-icon column-icon-${option.id}`}
                          />
                          <b>{option.name}</b>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="design-option-group">
                    <span>Hintergründe</span>
                    <div className="background-picker">
                      {documentBackgrounds.map((background) => (
                        <button
                          className={`${design.settings.backgroundId === background.id ? "selected" : ""} background-swatch background-${background.id}`}
                          key={background.id}
                          title={background.description}
                          type="button"
                          onClick={() =>
                            updateDesignSetting("backgroundId", background.id)
                          }>
                          <i>
                            {background.id === "programming-languages-bg"
                              ? programmingLanguageBackgroundTokens
                                  .slice(0, 5)
                                  .map((token) => (
                                    <span key={token}>{token}</span>
                                  ))
                              : null}
                          </i>
                          <b>{background.name}</b>
                        </button>
                      ))}
                    </div>
                  </div>
                  {design.settings.backgroundId ===
                    "programming-languages-bg" && isAtsMode ? (
                    <p className="design-ats-background-note">
                      Im kompakten ATS-Modus wird dieser dekorative Hintergrund
                      automatisch ausgeblendet.
                    </p>
                  ) : null}
                  {template.atsInfo ? (
                    <p className="design-ats-background-note">
                      {template.atsInfo}
                    </p>
                  ) : null}
                  <label className="design-print-toggle">
                    <input
                      type="checkbox"
                      checked={design.settings.showBackgroundInPrint}
                      onChange={(event) =>
                        updateDesignSetting(
                          "showBackgroundInPrint",
                          event.target.checked,
                        )
                      }
                    />
                    <span>Hintergrund auch im PDF anzeigen</span>
                  </label>
                  <div className="design-option-group">
                    <span>Dokumentmedien</span>
                    <div className="document-media-grid">
                      <DocumentMediaCard
                        kind="photo"
                        label="Lebenslauf-Foto"
                        source={photoSource}
                        disabled={!profile}
                        onPick={() => void pickProfileMedia("photo")}
                        onRemove={() => void removeProfileMedia("photo")}
                      />
                      <DocumentMediaCard
                        kind="signature"
                        label="Unterschrift"
                        source={signatureSource}
                        disabled={!profile}
                        onPick={() => void pickProfileMedia("signature")}
                        onRemove={() => void removeProfileMedia("signature")}
                      />
                    </div>
                    <small className="design-option-hint">
                      Die Auswahl wird im Profil gespeichert und direkt in
                      Vorschau und PDF übernommen.
                    </small>
                  </div>
                  <button
                    className="button secondary design-reset-button"
                    type="button"
                    onClick={() =>
                      setDesign((current) => ({
                        ...current,
                        settings: defaultDocumentDesign,
                      }))
                    }>
                    Designwerte zurücksetzen
                  </button>
                </section>
                <label className="field">
                  <span>Kurzprofil</span>
                  <textarea
                    name="resumeProfile"
                    rows={9}
                    defaultValue={docs.resumeProfile}
                    placeholder="Rolle, Erfahrungsschwerpunkt und konkreter Mehrwert …"
                  />
                </label>
                <section className="match-analysis">
                  <header>
                    <div>
                      <span>Stellenanzeigen-Match</span>
                      <strong>{keywordMatch.score}%</strong>
                    </div>
                    <i>
                      <b style={{ width: `${keywordMatch.score}%` }} />
                    </i>
                  </header>
                  <div>
                    <p>Gefundene Kenntnisse</p>
                    <div className="match-chips positive">
                      {keywordMatch.matchedSkills.length ? (
                        keywordMatch.matchedSkills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))
                      ) : (
                        <small>Noch keine Profil-Kenntnis gefunden.</small>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>Begriffe aus der Stellenanzeige prüfen</p>
                    <div className="match-chips suggestions">
                      {keywordMatch.suggestions.length ? (
                        keywordMatch.suggestions.map((keyword) => (
                          <span key={keyword}>{keyword}</span>
                        ))
                      ) : (
                        <small>
                          Stellenanzeigentext für Vorschläge ergänzen.
                        </small>
                      )}
                    </div>
                  </div>
                  <small>
                    Vorschläge werden niemals automatisch in Ihren Lebenslauf
                    übernommen.
                  </small>
                </section>
              </>
            )}
            <div className="editor-note">
              <UserRound size={17} />
              <p>
                Berufserfahrung, Ausbildung und Kenntnisse kommen aus dem
                ausgewählten Profil. Eigene Fähigkeiten werden niemals
                automatisch erfunden.
              </p>
            </div>
            <button className="button primary full-button" type="submit">
              <Save size={17} />{" "}
              {tab === "anschreiben"
                ? "Texte speichern & Word aktualisieren"
                : "Texte speichern"}
            </button>
          </form>
        </aside>
        <main className="paper-stage">
          {tab === "deckblatt" && (
            <div
              className={`document-paper document-deckblatt layout-${template.layout} ${designClassName}`}
              style={paperStyle}>
              <DocumentBackgroundLayer
                backgroundId={design.settings.backgroundId}
                atsMode={isAtsMode}
              />
              <i className="paper-rule" />
              <div className="deckblatt-preview">
                <p className="paper-kicker">Bewerbung</p>
                <h1>{application.job.title}</h1>
                <p className="paper-muted">bei {application.company.name}</p>
                <h2>{name}</h2>
                <p>
                  {docs.deckblattStatement ||
                    profile?.summary ||
                    "Kurzprofil im Editor ergänzen."}
                </p>
                <footer>
                  {profile?.email || "E-Mail"} · {profile?.phone || "Telefon"} ·{" "}
                  {profile?.city || "Ort"}
                </footer>
              </div>
            </div>
          )}
          {tab === "anschreiben" && (
            <div
              className={`document-paper document-anschreiben letter-${letterStatus.density} layout-${template.layout} ${designClassName}`}
              style={paperStyle}>
              <DocumentBackgroundLayer
                backgroundId={design.settings.backgroundId}
                atsMode={isAtsMode}
              />
              <div className="letter-preview">
                <p className="sender-line">
                  <span className="sender-name">{name}</span>
                  <span className="sender-title">
                    {profile?.title || application.job.title}
                  </span>
                  <span className="sender-contact">
                    {senderContactDetails}
                  </span>
                </p>
                <i className="paper-rule" />
                <address>
                  {application.company.name}
                  <br />
                  {recipientContactLine ? (
                    <>
                      {recipientContactLine}
                      <br />
                    </>
                  ) : null}
                  {application.company.street}
                  <br />
                  {application.company.postalCode} {application.company.city}
                </address>
                <p className="paper-date">
                  {profile?.city ? `${profile.city}, den ` : ""}
                  {formatApplicationDateLong(application)}
                </p>
                <h3>
                  {docs.coverSubject ||
                    `Bewerbung als ${application.job.title}`}
                </h3>
                <p>
                  {application.contact.lastName
                    ? `Sehr geehrte${application.contact.salutation === "Herr" ? "r" : ""} ${application.contact.salutation} ${application.contact.lastName},`
                    : "Sehr geehrte Damen und Herren,"}
                </p>
                <p className="letter-body">{docs.coverIntroduction}</p>
                <p className="letter-body">
                  {docs.coverMotivation || "Motivation ergänzen …"}
                </p>
                <p className="letter-body">
                  {docs.coverQualification ||
                    profile?.summary ||
                    "Fachliche Eignung ergänzen …"}
                </p>
                <p className="letter-body">
                  {docs.coverCompanyFit || "Unternehmensbezug ergänzen …"}
                </p>
                {docs.coverExtraParagraph ? (
                  <p className="letter-body">{docs.coverExtraParagraph}</p>
                ) : null}
                <p className="letter-body">{docs.coverClosing}</p>
                <p className="letter-signature">
                  <span>Mit freundlichen Grüßen</span>
                  {signatureSource ? (
                    <img
                      className="signature-image"
                      src={signatureSource}
                      alt={`Unterschrift von ${name}`}
                    />
                  ) : null}
                  <span className="signature-name">{name}</span>
                </p>
              </div>
            </div>
          )}
          {tab === "lebenslauf" &&
            resumePlan.map((plan) => (
              <div
                className={`document-paper document-lebenslauf layout-${template.layout} ${designClassName}`}
                key={plan.pageNumber}
                style={paperStyle}>
                <DocumentBackgroundLayer
                  backgroundId={design.settings.backgroundId}
                  atsMode={isAtsMode}
                />
                {template.id === "stilvoll" ? (
                  <StilvollResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "kompakt" ? (
                  <KompaktResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "einspaltig" ? (
                  <EinspaltigResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "klassisch" ? (
                  <KlassischResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "mehrspaltig" ? (
                  <MehrspaltigResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "ivy-league" ? (
                  <IvyLeagueResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    backgroundId={design.settings.backgroundId}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "kreativ" ? (
                  <KreativResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "zeitgenoessisch" ? (
                  <ZeitgenoessischResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "zweispaltig" ? (
                  <ZweispaltigResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "gepflegt" ? (
                  <GepflegtResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "elegant" ? (
                  <ElegantResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "tabellarisch" ? (
                  <TabellarischResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : template.id === "modern" ? (
                  <ModernResume
                    profile={renderProfile}
                    name={name}
                    atsMode={isAtsMode}
                    plan={plan}
                    totalPages={resumePlan.length}
                    accentColor={design.accentColor}
                    secondaryColor={design.secondaryColor}
                    photoSource={getProfileMediaSource(renderProfile?.photoPath)}
                    resumeProfile={docs.resumeProfile}
                    sections={sections}
                  />
                ) : (
                  <ResumePreviewPage
                    application={application}
                    atsMode={isAtsMode}
                    documents={docs}
                    name={name}
                    plan={plan}
                    profile={renderProfile}
                    sections={sections}
                    totalPages={resumePlan.length}
                  />
                )}
              </div>
            ))}
        </main>
      </section>
    </div>
  );
}

function DocumentMediaCard({
  kind,
  label,
  source,
  disabled,
  onPick,
  onRemove,
}: {
  kind: ProfileMediaKind;
  label: string;
  source: string;
  disabled: boolean;
  onPick: () => void;
  onRemove: () => void;
}) {
  const Icon = kind === "photo" ? ImagePlus : PenLine;
  return (
    <article className={`document-media-card media-${kind}`}>
      <button
        className="document-media-preview"
        type="button"
        disabled={disabled}
        aria-label={`${label} ${source ? "ersetzen" : "auswählen"}`}
        onClick={onPick}
      >
        {source ? (
          <img src={source} alt={`${label} Vorschau`} />
        ) : (
          <Icon size={25} />
        )}
      </button>
      <div>
        <strong>{label}</strong>
        <small>
          {disabled
            ? "Zuerst ein Profil auswählen"
            : source
              ? "Ausgewählt · anklicken zum Ersetzen"
              : "Neu hinzufügen"}
        </small>
      </div>
      {source ? (
        <button
          className="icon-button danger"
          type="button"
          aria-label={`${label} entfernen`}
          onClick={onRemove}
        >
          <X size={14} />
        </button>
      ) : null}
    </article>
  );
}
