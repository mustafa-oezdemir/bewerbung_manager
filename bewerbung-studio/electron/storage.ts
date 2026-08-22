import {
  copyFile,
  mkdir,
  open,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import type { ApplicationPaths } from "../src/config/application-paths";
import { resolveApplicationPaths } from "../src/config/application-paths";
import {
  applicationInputSchema,
  applicationDraftSchema,
  applicationSchema,
  appSettingsSchema,
  attachmentSchema,
  deletedApplicationsArchiveSchema,
  defaultSettings,
  profileSchema,
  workspaceSchema,
  type ApplicantProfile,
  type Application,
  type ApplicationInput,
  type ApplicationDraft,
  type ApplicationStatus,
  type AppSettings,
  type Attachment,
  type AttachmentCategory,
  type CalendarEvent,
  type CalendarEventType,
  type DeletedApplicationsArchive,
  type RejectionReason,
  type Workspace,
} from "../src/shared/schema";
import { templates } from "../src/shared/templates";
import { getApplicationDate } from "../src/shared/applicationDate";
import {
  compactWordMarginLevelToMm,
  getDocumentFont,
} from "../src/shared/documentDesign";
import { ensureKnowledgeSection } from "../src/features/knowledge/knowledge.service";
import { formatKnowledgeSectionAsText } from "../src/features/knowledge/knowledge.utils";
import { buildDocumentHtml } from "./documents";
import {
  FileManagementService,
  sanitizeFileName,
} from "./file-management";
import { LegacyMigrationService } from "./legacy-migration";

const nowIso = () => new Date().toISOString();
const createId = () => crypto.randomUUID();
const terminalStatuses = new Set<ApplicationStatus>([
  "Zusage",
  "Absage",
  "Zurückgezogen",
  "Archiviert",
]);

const templateContactLine = (
  label: string,
  value: string | undefined,
) => (value?.trim() ? `${label}: ${value.trim()}` : "");

const languagePoints = (level: string) => {
  const normalized = level.toLocaleLowerCase("de-DE");
  const score =
    /muttersprache|c2|native/.test(normalized)
      ? 5
      : /c1|verhandlungssicher|versiert|fließend/.test(normalized)
        ? 4
        : /b2|gute kenntnisse/.test(normalized)
          ? 4
          : /b1|grundkenntnisse/.test(normalized)
            ? 3
            : /a2/.test(normalized)
              ? 2
              : /a1/.test(normalized)
                ? 1
                : level
                  ? 3
                  : 0;
  return `${"●".repeat(score)}${"○".repeat(5 - score)}`;
};

const wordFontName = (fontId: Application["designSettings"]["fontId"]) =>
  getDocumentFont(fontId).family.match(/"([^"]+)"|([^,]+)/)?.[1] ??
  getDocumentFont(fontId).family.match(/"([^"]+)"|([^,]+)/)?.[2]?.trim() ??
  "Arial";

const blendHexColor = (
  foreground: string,
  background: string,
  backgroundWeight: number,
) => {
  const parse = (value: string) =>
    [1, 3, 5].map((offset) =>
      Number.parseInt(value.replace("#", "").slice(offset - 1, offset + 1), 16),
    );
  const left = parse(foreground);
  const right = parse(background);
  return `#${left
    .map((channel, index) =>
      Math.round(
        channel * (1 - backgroundWeight) +
          right[index] * backgroundWeight,
      )
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
};

const eventReminders: Record<CalendarEventType, number[]> = {
  "application-sent": [],
  "application-rejected": [],
  "application-deadline": [4320, 1440],
  interview: [1440, 60],
  "second-interview": [1440, 60],
  "phone-interview": [1440, 60],
  "online-interview": [1440, 60],
  "trial-work": [1440],
  assessment: [1440],
  "follow-up-call": [0],
  "follow-up-email": [0],
  "contract-start": [1440],
  "contract-end": [10080],
  "fixed-term-end": [20160],
  "probation-end": [20160],
  custom: [],
};

const emptyWorkspace = (): Workspace => ({
  schemaVersion: 1,
  applications: [],
  profiles: [],
  events: [],
  attachments: [],
  settings: defaultSettings,
  updatedAt: nowIso(),
});

const emptyDeletedApplicationsArchive = (): DeletedApplicationsArchive => ({
  schemaVersion: 1,
  deletedApplications: [],
  updatedAt: nowIso(),
});

const timestamp = () =>
  new Date().toISOString().replace(/\D/g, "").slice(0, 14);

const addDaysAtNine = (value: string, days: number) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  date.setHours(9, 0, 0, 0);
  return date.toISOString();
};

const joinTemplateValues = (
  values: Array<string | undefined>,
  separator = " | ",
) => values.map((value) => value?.trim()).filter(Boolean).join(separator);

const splitLanguage = (value: string) => {
  const [name, ...levelParts] = value
    .split(/\s+(?:\||–|—|:)\s+|\s+-\s+/)
    .map((part) => part.trim());
  return {
    name: name ?? "",
    level: levelParts.join(" – "),
  };
};

export class DataStore {
  readonly dataPath: string;
  readonly files: FileManagementService;
  readonly migration: LegacyMigrationService;
  private readonly workspacePath: string;
  private readonly applicationDraftPath: string;
  private readonly deletedApplicationsPath: string;
  private workspace: Workspace = emptyWorkspace();

  constructor(rootOrPaths: string | ApplicationPaths) {
    const paths =
      typeof rootOrPaths === "string"
        ? resolveApplicationPaths(rootOrPaths)
        : rootOrPaths;
    this.files = new FileManagementService(paths);
    this.migration = new LegacyMigrationService(paths);
    this.dataPath = paths.dataRoot;
    this.workspacePath = path.join(this.dataPath, "Settings", "workspace.json");
    this.applicationDraftPath = path.join(
      this.dataPath,
      "Settings",
      "new-application-draft.json",
    );
    this.deletedApplicationsPath = path.join(
      this.dataPath,
      "Silinenler",
      "silinenler.json",
    );
  }

  async initialize() {
    await this.files.initialize();
    this.workspace = await this.loadWorkspace();
    this.workspace.applications.forEach((application) =>
      this.syncEvents(application),
    );
    await this.persist();
  }

  getWorkspace() {
    return structuredClone(this.workspace);
  }

  async getApplicationDraft() {
    try {
      const parsed: unknown = JSON.parse(
        await readFile(this.applicationDraftPath, "utf8"),
      );
      return applicationDraftSchema.parse(parsed);
    } catch {
      return null;
    }
  }

  async saveApplicationDraft(draft: ApplicationDraft) {
    const validated = applicationDraftSchema.parse(draft);
    await this.atomicWrite(
      this.applicationDraftPath,
      JSON.stringify(validated, null, 2),
    );
  }

  async clearApplicationDraft() {
    await rm(this.applicationDraftPath, { force: true });
    await rm(`${this.applicationDraftPath}.bak`, { force: true });
  }

  private async loadWorkspace() {
    for (const candidate of [this.workspacePath, `${this.workspacePath}.bak`]) {
      try {
        const parsed: unknown = JSON.parse(await readFile(candidate, "utf8"));
        const result = workspaceSchema.safeParse(parsed);
        if (result.success) return result.data;
      } catch {
        // Try the next safe candidate.
      }
    }
    return emptyWorkspace();
  }

  private async loadDeletedApplicationsArchive() {
    let archiveFound = false;
    for (const candidate of [
      this.deletedApplicationsPath,
      `${this.deletedApplicationsPath}.bak`,
    ]) {
      try {
        const parsed: unknown = JSON.parse(await readFile(candidate, "utf8"));
        archiveFound = true;
        const result = deletedApplicationsArchiveSchema.safeParse(parsed);
        if (result.success) return result.data;
      } catch (error) {
        const code =
          typeof error === "object" && error && "code" in error
            ? String(error.code)
            : "";
        if (code !== "ENOENT") archiveFound = true;
      }
    }
    if (archiveFound) {
      throw new Error(
        "Das Archiv der gelöschten Bewerbungen konnte nicht gelesen werden.",
      );
    }
    return emptyDeletedApplicationsArchive();
  }

  private async archiveDeletedApplication(application: Application) {
    const archive = await this.loadDeletedApplicationsArchive();
    const record = {
      deletedAt: nowIso(),
      application: structuredClone(application),
      events: structuredClone(
        this.workspace.events.filter(
          (event) => event.applicationId === application.id,
        ),
      ),
      attachments: structuredClone(
        this.workspace.attachments.filter(
          (attachment) => attachment.applicationId === application.id,
        ),
      ),
    };
    archive.deletedApplications = [
      record,
      ...archive.deletedApplications.filter(
        (item) => item.application.id !== application.id,
      ),
    ];
    archive.updatedAt = record.deletedAt;
    const validated = deletedApplicationsArchiveSchema.parse(archive);
    await this.atomicWrite(
      this.deletedApplicationsPath,
      JSON.stringify(validated, null, 2),
    );
  }

  private async atomicWrite(filePath: string, content: string) {
    await mkdir(path.dirname(filePath), { recursive: true });
    const temporaryPath = `${filePath}.${createId()}.tmp`;
    const backupPath = `${filePath}.bak`;
    const handle = await open(temporaryPath, "w");
    try {
      await handle.writeFile(content, "utf8");
      await handle.sync();
    } finally {
      await handle.close();
    }
    try {
      await copyFile(filePath, backupPath);
    } catch {
      // A first write has no previous version.
    }
    try {
      await rename(temporaryPath, filePath);
    } catch {
      await rm(filePath, { force: true });
      await rename(temporaryPath, filePath);
    }
  }

  private async persist(applicationsToPersist: readonly Application[] = []) {
    // Application documents are snapshots. Unrelated workspace saves must not
    // rewrite older application folders or their modification timestamps.
    this.workspace.updatedAt = nowIso();
    const validated = workspaceSchema.parse(this.workspace);
    await this.atomicWrite(
      this.workspacePath,
      JSON.stringify(validated, null, 2),
    );
    await Promise.all(
      applicationsToPersist.map((application) =>
        this.persistApplicationFiles(applicationSchema.parse(application)),
      ),
    );
    await this.createAutomaticBackup();
  }

  private async createAutomaticBackup() {
    if (!this.workspace.settings.autoBackupEnabled) return;
    const backupRoot = path.join(this.dataPath, "Backups");
    await mkdir(backupRoot, { recursive: true });
    const date = new Date().toISOString().slice(0, 10);
    const backupPath = path.join(backupRoot, `workspace-${date}.json`);
    try {
      await stat(backupPath);
    } catch {
      await copyFile(this.workspacePath, backupPath);
    }
    const backups = (await readdir(backupRoot, { withFileTypes: true }))
      .filter(
        (entry) =>
          entry.isFile() && /^workspace-\d{4}-\d{2}-\d{2}\.json$/.test(entry.name),
      )
      .map((entry) => entry.name)
      .sort()
      .reverse();
    for (const fileName of backups.slice(
      this.workspace.settings.backupRetention,
    )) {
      const target = path.resolve(backupRoot, fileName);
      if (!target.startsWith(`${path.resolve(backupRoot)}${path.sep}`))
        throw new Error("Ungültiger Sicherungspfad.");
      await rm(target, { force: true });
    }
  }

  private applicationPath(application: Application) {
    return this.files.applicationDataPath(application.folderName);
  }

  getApplicationAnschreibenPath(id: string) {
    const application = this.workspace.applications.find((item) => item.id === id);
    if (!application) throw new Error("Bewerbung wurde nicht gefunden.");
    return this.files.documentDirectories(application).anschreiben;
  }

  private async ensureApplicationDataDirectories(application: Application) {
    return this.files.ensureApplicationDataDirectories(application);
  }

  private async persistApplicationFiles(application: Application) {
    const documents = this.files.documentDirectories(application);
    await mkdir(documents.anschreiben, { recursive: true });
    const { dataRoot } =
      await this.ensureApplicationDataDirectories(application);
    await Promise.all([
      this.atomicWrite(
        path.join(dataRoot, "bewerbung.json"),
        JSON.stringify(applicationSchema.parse(application), null, 2),
      ),
      this.atomicWrite(
        path.join(dataRoot, "Stellenanzeige", "stellenanzeige.json"),
        JSON.stringify(application.job, null, 2),
      ),
      this.atomicWrite(
        path.join(dataRoot, "Stellenanzeige", "stellenanzeige.txt"),
        application.job.fullText,
      ),
    ]);
  }

  private createEvent(
    applicationId: string,
    type: CalendarEventType,
    title: string,
    startAt: string,
    allDay: boolean,
  ): CalendarEvent {
    const now = nowIso();
    return {
      id: createId(),
      applicationId,
      type,
      title,
      description: "",
      startAt,
      allDay,
      completed: false,
      cancelled: false,
      reminderMinutes: eventReminders[type],
      createdAt: now,
      updatedAt: now,
    };
  }

  private ensureEvent(
    application: Application,
    type: CalendarEventType,
    title: string,
    startAt?: string,
    allDay = false,
  ) {
    const existing = this.workspace.events.find(
      (event) =>
        event.applicationId === application.id && event.type === type,
    );
    if (!startAt) {
      if (existing) {
        existing.cancelled = true;
        existing.updatedAt = nowIso();
      }
      return;
    }
    if (existing) {
      Object.assign(existing, {
        title,
        startAt,
        allDay,
        cancelled: false,
        updatedAt: nowIso(),
      });
      return;
    }
    this.workspace.events.push(
      this.createEvent(application.id, type, title, startAt, allDay),
    );
  }

  private syncEvents(application: Application) {
    const company = application.company.name;
    this.ensureEvent(
      application,
      "application-sent",
      `${company} · Bewerbung gesendet`,
      application.sentAt,
      true,
    );
    this.ensureEvent(
      application,
      "application-rejected",
      `${company} · Absage`,
      application.status === "Absage" ? application.rejectionAt : undefined,
      true,
    );
    this.ensureEvent(
      application,
      "application-deadline",
      `Bewerbungsfrist · ${company}`,
      application.deadlineAt,
      true,
    );
    this.ensureEvent(
      application,
      "interview",
      `Vorstellungsgespräch · ${company}`,
      application.interviewAt,
    );
    this.ensureEvent(
      application,
      "second-interview",
      `Zweites Gespräch · ${company}`,
      application.secondInterviewAt,
    );
    this.ensureEvent(
      application,
      "contract-start",
      `Vertragsbeginn · ${company}`,
      application.startAt,
      true,
    );
    this.ensureEvent(
      application,
      "contract-end",
      `Vertragsende · ${company}`,
      application.contractEndAt,
      true,
    );
    this.ensureEvent(
      application,
      "fixed-term-end",
      `Befristungsende · ${company}`,
      application.fixedTermEndAt,
      true,
    );
    this.ensureEvent(
      application,
      "probation-end",
      `Probezeitende · ${company}`,
      application.probationEndAt,
      true,
    );
    const followUp =
      (application.status === "Beworben" || application.status === "Gesendet") &&
      application.sentAt &&
      this.workspace.settings.followUpDays !== null
        ? addDaysAtNine(application.sentAt, this.workspace.settings.followUpDays)
        : undefined;
    this.ensureEvent(
      application,
      "follow-up-call",
      `${company} · Nachfassen`,
      followUp,
    );
    if (terminalStatuses.has(application.status)) {
      const preserved = new Set<CalendarEventType>([
        "application-sent",
        "application-rejected",
        "contract-start",
        "contract-end",
        "fixed-term-end",
        "probation-end",
      ]);
      this.workspace.events.forEach((event) => {
        if (
          event.applicationId === application.id &&
          !preserved.has(event.type) &&
          new Date(event.startAt) > new Date()
        ) {
          event.cancelled = true;
          event.updatedAt = nowIso();
        }
      });
    }
  }

  async createApplication(rawInput: ApplicationInput) {
    const input = applicationInputSchema.parse(rawInput);
    const now = nowIso();
    const folderName = await this.files.allocateApplicationFolderName(
      input.company.name,
      input.job.title,
      input.sentAt ? new Date(input.sentAt) : new Date(),
    );
    const application: Application = {
      schemaVersion: 1,
      id: createId(),
      folderName,
      ...input,
      status: input.sentAt ? "Beworben" : "Entwurf",
      documents: {
        coverSubject: `Bewerbung als ${input.job.title}`,
        coverIntroduction: `die Position als ${input.job.title} bei ${input.company.name} verbindet genau die Aufgaben, in denen ich meine Erfahrung gezielt einbringen möchte.`,
        coverMotivation: "",
        coverQualification: "",
        coverCompanyFit: "",
        coverExtraParagraph: "",
        coverClosing:
          "Gerne überzeuge ich Sie in einem persönlichen Gespräch von meiner Motivation und Eignung. Auf Ihren Terminvorschlag freue ich mich.",
        resumeProfile: "",
        deckblattStatement: "",
      },
      attachmentIds: [],
      statusHistory: [
        {
          at: now,
          to: input.sentAt ? "Beworben" : "Entwurf",
          note: "Bewerbung angelegt",
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    this.workspace.applications.unshift(applicationSchema.parse(application));
    this.syncEvents(application);
    await this.persist([application]);
    return this.getWorkspace();
  }

  async saveApplication(rawApplication: Application) {
    const application = applicationSchema.parse(rawApplication);
    const index = this.workspace.applications.findIndex(
      (item) => item.id === application.id,
    );
    if (index < 0) throw new Error("Bewerbung wurde nicht gefunden.");
    application.updatedAt = nowIso();
    this.workspace.applications[index] = application;
    this.syncEvents(application);
    await this.persist([application]);
    return this.getWorkspace();
  }

  async changeStatus(
    id: string,
    status: ApplicationStatus,
    reason?: RejectionReason,
  ) {
    const application = this.workspace.applications.find((item) => item.id === id);
    if (!application) throw new Error("Bewerbung wurde nicht gefunden.");
    if (application.status !== status) {
      const now = nowIso();
      const previous = application.status;
      await this.files.transitionApplicationDocuments(application, status);
      application.status = status;
      application.updatedAt = now;
      application.statusHistory.push({ at: now, from: previous, to: status, note: "" });
      if (status === "Absage") {
        application.rejectionAt = now;
        application.rejectionReason = reason ?? "Keine Begründung";
      }
      if (status === "Zusage") application.acceptedAt = now;
      if (status === "Zurückgezogen") application.withdrawnAt = now;
      if (status === "Archiviert") application.archivedAt = now;
      this.syncEvents(application);
      await this.persist([application]);
    }
    return this.getWorkspace();
  }

  async removeApplication(id: string) {
    const application = this.workspace.applications.find(
      (item) => item.id === id,
    );
    if (!application) throw new Error("Bewerbung wurde nicht gefunden.");

    await this.archiveDeletedApplication(application);
    await this.files.removeApplicationArtifacts(application);
    this.workspace.applications = this.workspace.applications.filter(
      (application) => application.id !== id,
    );
    this.workspace.events = this.workspace.events.filter(
      (event) => event.applicationId !== id,
    );
    this.workspace.attachments = this.workspace.attachments.filter(
      (attachment) => attachment.applicationId !== id,
    );
    await this.persist();
    return this.getWorkspace();
  }

  async duplicateApplication(id: string) {
    const source = this.workspace.applications.find((item) => item.id === id);
    if (!source) throw new Error("Bewerbung wurde nicht gefunden.");
    const now = nowIso();
    const folderName = await this.files.allocateApplicationFolderName(
      source.company.name,
      source.job.title,
    );
    const duplicate: Application = {
      ...structuredClone(source),
      id: createId(),
      folderName,
      status: "Entwurf",
      sentAt: undefined,
      rejectionAt: undefined,
      rejectionReason: undefined,
      acceptedAt: undefined,
      attachmentIds: [],
      statusHistory: [{ at: now, to: "Entwurf", note: "Bewerbung dupliziert" }],
      createdAt: now,
      updatedAt: now,
    };
    this.workspace.applications.unshift(duplicate);
    this.syncEvents(duplicate);
    await this.persist([duplicate]);
    return this.getWorkspace();
  }

  async saveProfile(rawProfile: ApplicantProfile) {
    const profile = profileSchema.parse(rawProfile);
    if (profile.isDefault) {
      this.workspace.profiles.forEach((item) => {
        item.isDefault = false;
      });
    }
    const index = this.workspace.profiles.findIndex(
      (item) => item.id === profile.id,
    );
    if (index >= 0) this.workspace.profiles[index] = profile;
    else this.workspace.profiles.push(profile);
    await this.persist();
    return this.getWorkspace();
  }

  async saveSettings(settings: AppSettings) {
    this.workspace.settings = appSettingsSchema.parse(settings);
    this.workspace.applications.forEach((application) =>
      this.syncEvents(application),
    );
    await this.persist();
    return this.getWorkspace();
  }

  async saveEvent(event: CalendarEvent) {
    const index = this.workspace.events.findIndex((item) => item.id === event.id);
    if (index < 0) throw new Error("Termin wurde nicht gefunden.");
    this.workspace.events[index] = event;
    await this.persist();
    return this.getWorkspace();
  }

  async addAttachment(
    applicationId: string,
    category: AttachmentCategory,
    sourcePath: string,
  ) {
    const application = this.workspace.applications.find(
      (item) => item.id === applicationId,
    );
    if (!application) throw new Error("Bewerbung wurde nicht gefunden.");
    const sourceName = path.basename(sourcePath);
    const archiveRelativePath = this.files.archiveRelativePath(
      category,
      sourcePath,
    );
    const attachment = {
      id: createId(),
      applicationId,
      category,
      fileName: sourceName,
      archiveRelativePath,
      description: "",
      documentDate: "",
      order: application.attachmentIds.length,
      includedInPackage: true,
      createdAt: nowIso(),
    };
    this.workspace.attachments.push(attachment);
    application.attachmentIds.push(attachment.id);
    await this.persist([application]);
    return this.getWorkspace();
  }

  private getAttachmentPath(attachment: Attachment) {
    if (attachment.archiveRelativePath) {
      return this.files.resolveArchivePath(
        attachment.category,
        attachment.archiveRelativePath,
      );
    }
    if (!attachment.storedName) {
      throw new Error("Der Dokumentverweis ist unvollständig.");
    }
    const application = this.getApplication(attachment.applicationId);
    if (path.basename(attachment.storedName) !== attachment.storedName)
      throw new Error("Ungültiger gespeicherter Dateiname.");
    const categoryRoot = path.resolve(
      this.applicationPath(application),
      attachment.category,
    );
    const filePath = path.resolve(categoryRoot, attachment.storedName);
    if (!filePath.startsWith(`${categoryRoot}${path.sep}`))
      throw new Error("Ungültiger Dokumentpfad.");
    return filePath;
  }

  getAttachmentPathById(id: string) {
    const attachment = this.workspace.attachments.find((item) => item.id === id);
    if (!attachment) throw new Error("Dokument wurde nicht gefunden.");
    return this.getAttachmentPath(attachment);
  }

  async saveAttachment(rawAttachment: Attachment) {
    const attachment = attachmentSchema.parse(rawAttachment);
    const index = this.workspace.attachments.findIndex(
      (item) => item.id === attachment.id,
    );
    if (index < 0) throw new Error("Dokument wurde nicht gefunden.");
    const existing = this.workspace.attachments[index];
    if (existing.applicationId !== attachment.applicationId)
      throw new Error("Die Zuordnung einer Datei kann nicht frei geändert werden.");
    if (existing.category !== attachment.category) {
      if (existing.archiveRelativePath) {
        throw new Error(
          "Die Kategorie eines Archivdokuments kann nicht nachträglich geändert werden.",
        );
      }
      const oldPath = this.getAttachmentPath(existing);
      const newPath = this.getAttachmentPath(attachment);
      await mkdir(path.dirname(newPath), { recursive: true });
      await rename(oldPath, newPath);
    }
    this.workspace.attachments[index] = attachment;
    await this.persist();
    return this.getWorkspace();
  }

  async moveAttachment(id: string, direction: -1 | 1) {
    const attachment = this.workspace.attachments.find((item) => item.id === id);
    if (!attachment) throw new Error("Dokument wurde nicht gefunden.");
    const siblings = this.workspace.attachments
      .filter(
        (item) =>
          item.applicationId === attachment.applicationId &&
          item.category === attachment.category,
      )
      .sort((left, right) => left.order - right.order);
    const index = siblings.findIndex((item) => item.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= siblings.length)
      return this.getWorkspace();
    const other = siblings[target];
    const currentOrder = attachment.order;
    attachment.order = other.order;
    other.order = currentOrder;
    await this.persist();
    return this.getWorkspace();
  }

  async removeAttachment(id: string) {
    const attachment = this.workspace.attachments.find((item) => item.id === id);
    if (!attachment) throw new Error("Dokument wurde nicht gefunden.");
    if (!attachment.archiveRelativePath) {
      await rm(this.getAttachmentPath(attachment), { force: true });
    }
    this.workspace.attachments = this.workspace.attachments.filter(
      (item) => item.id !== id,
    );
    const application = this.getApplication(attachment.applicationId);
    application.attachmentIds = application.attachmentIds.filter(
      (attachmentId) => attachmentId !== id,
    );
    await this.persist([application]);
    return this.getWorkspace();
  }

  getPackageAttachmentPaths(applicationId: string) {
    const categoryOrder: Record<AttachmentCategory, number> = {
      Zeugnisse: 0,
      Zertifikate: 1,
    };
    return this.workspace.attachments
      .filter(
        (attachment) =>
          attachment.applicationId === applicationId &&
          attachment.includedInPackage,
      )
      .sort(
        (left, right) =>
          categoryOrder[left.category] - categoryOrder[right.category] ||
          left.order - right.order,
      )
      .map((attachment) => ({
        fileName: attachment.fileName,
        path: this.getAttachmentPath(attachment),
      }));
  }

  getProfileForApplication(application: Application) {
    return this.workspace.profiles.find(
      (profile) =>
        profile.id === application.profileId ||
        (!application.profileId && profile.isDefault),
    );
  }

  getApplication(id: string) {
    const application = this.workspace.applications.find((item) => item.id === id);
    if (!application) throw new Error("Bewerbung wurde nicht gefunden.");
    return application;
  }

  getTemplateDocumentContext(id: string) {
    const application = this.getApplication(id);
    const profile = this.getProfileForApplication(application);
    const applicantName = profile
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "";
    const contactName = [
      application.contact.firstName,
      application.contact.lastName,
    ]
      .filter(Boolean)
      .join(" ");
    const postalContactName = contactName
      ? application.contact.salutation === "Herr"
        ? `Herrn ${contactName}`
        : application.contact.salutation === "Frau"
          ? `Frau ${contactName}`
          : contactName
      : "";
    const greeting = application.contact.lastName
      ? application.contact.salutation === "Herr"
        ? `Sehr geehrter Herr ${application.contact.lastName},`
        : application.contact.salutation === "Frau"
          ? `Sehr geehrte Frau ${application.contact.lastName},`
          : `Guten Tag ${contactName},`
      : "Sehr geehrte Damen und Herren,";
    const knowledgeSection = ensureKnowledgeSection(
      profile?.knowledgeSection,
      profile?.skills ?? [],
    );
    const knowledgeText = formatKnowledgeSectionAsText(
      knowledgeSection,
      false,
    );
    const elegantData: Record<string, string> = {
      VORNAME: profile?.firstName ?? "",
      NACHNAME: profile?.lastName ?? "",
      BERUFSBEZEICHNUNG:
        profile?.title || application.job.title,
      FACHGEBIET_1: profile?.skills[0] ?? "",
      FACHGEBIET_2: profile?.skills[1] ?? "",
      FACHGEBIETE: (profile?.skills ?? []).slice(0, 3).join(" | "),
      TELEFON: profile?.phone ?? "",
      EMAIL: profile?.email ?? "",
      WEBSITE: profile?.portfolio || profile?.github || "",
      GITHUB: profile?.github ?? "",
      LINKEDIN: profile?.linkedin ?? "",
      ORT: profile?.city ?? "",
      GEBURTSDATUM: profile?.birthDate ?? "",
      GEBURTSORT: profile?.birthPlace ?? "",
      GEBURTSZEILE:
        profile?.birthDate || profile?.birthPlace
          ? `Geb. ${profile?.birthDate ?? ""}${
              profile?.birthDate && profile?.birthPlace ? " in " : ""
            }${profile?.birthPlace ?? ""}`
          : "",
      KONTAKT_ZEILE_1: joinTemplateValues([
        profile?.phone,
        profile?.email,
      ]),
      KONTAKT_ZEILE_2: joinTemplateValues([
        profile?.portfolio || profile?.github,
        profile?.linkedin,
      ]),
      KONTAKT_ZEILE_3: joinTemplateValues([
        profile?.city,
        profile?.birthDate,
        profile?.birthPlace,
      ]),
      KONTAKTE_TITEL:
        profile?.phone ||
        profile?.email ||
        profile?.portfolio ||
        profile?.github ||
        profile?.linkedin ||
        profile?.city
          ? "KONTAKTE"
          : "",
      KONTAKTDATEN_TITEL:
        profile?.phone ||
        profile?.email ||
        profile?.portfolio ||
        profile?.github ||
        profile?.linkedin ||
        profile?.city ||
        profile?.birthDate ||
        profile?.birthPlace
          ? "KONTAKTDATEN"
          : "",
      TELEFON_ZEILE: templateContactLine("Telefon", profile?.phone),
      EMAIL_ZEILE: templateContactLine("E-Mail", profile?.email),
      WEBSITE_ZEILE: templateContactLine(
        "Website",
        profile?.portfolio || profile?.github,
      ),
      LINKEDIN_ZEILE: templateContactLine(
        "LinkedIn",
        profile?.linkedin,
      ),
      ORT_ZEILE: templateContactLine("Ort", profile?.city),
      HEADER_KONTAKT_1: profile?.phone ?? "",
      HEADER_KONTAKT_2: profile?.email ?? "",
      HEADER_KONTAKT_3: profile?.linkedin ?? "",
      HEADER_KONTAKT_4: joinTemplateValues([
        profile?.city,
        profile?.country,
      ]),
      HEADER_KONTAKT_5:
        profile?.birthDate || profile?.birthPlace
          ? `Geb. ${profile?.birthDate ?? ""}${
              profile?.birthDate && profile?.birthPlace ? " in " : ""
            }${profile?.birthPlace ?? ""}`
          : "",
      HEADER_KONTAKT_6: profile?.portfolio || profile?.github || "",
      PROFILFOTO: profile?.photoPath ?? "",
      ZUSAMMENFASSUNG_TITEL:
        application.documents.resumeProfile || profile?.summary
          ? "ZUSAMMENFASSUNG"
          : "",
      ZUSAMMENFASSUNG:
        application.documents.resumeProfile || profile?.summary || "",
      STAERKEN_TITEL: profile?.skills.length ? "STÄRKEN" : "",
      STAERKEN_ATS: (profile?.skills ?? []).slice(0, 3).join("\n"),
      ERFOLGE_TITEL: "",
      ERFOLGE_ATS: "",
      ERFOLG_HIGHLIGHT_1_TITEL: "",
      ERFOLG_HIGHLIGHT_1_BESCHREIBUNG: "",
      ERFOLG_HIGHLIGHT_2_TITEL: "",
      ERFOLG_HIGHLIGHT_2_BESCHREIBUNG: "",
      KENNTNISSE_TITEL: knowledgeText ? "FÄHIGKEITEN" : "",
      KENNTNISSE: knowledgeText,
      SPRACHEN_TITEL: profile?.languages.length ? "SPRACHEN" : "",
      SPRACHEN_ATS: (profile?.languages ?? []).join("\n"),
      BERUFSERFAHRUNG_TITEL: profile?.experiences.length
        ? "BERUFSERFAHRUNG"
        : "",
      ERFAHRUNG_TITEL: profile?.experiences.length
        ? "ERFAHRUNG"
        : "",
      AUSBILDUNG_TITEL: profile?.education.length
        ? "AUSBILDUNG"
        : "",
      PROJEKTE_TITEL: "",
      PROJEKTE: "",
      WEITERBILDUNGEN_TITEL: "",
      WEITERBILDUNGEN: "",
      ZERTIFIKATE_TITEL: profile?.certifications.length
        ? "ZERTIFIKATE"
        : "",
      ZERTIFIKATE: (profile?.certifications ?? []).join("\n"),
      VEROEFFENTLICHUNGEN_TITEL: "",
      VEROEFFENTLICHUNGEN: "",
      EHRENAMT_TITEL: "",
      EHRENAMT: "",
      SOFTWARE_TITEL: "",
      SOFTWARE: "",
      ZUSATZANGABEN_TITEL: "",
      ZUSATZANGABEN: "",
      FUEHRERSCHEIN_TITEL: "",
      FUEHRERSCHEIN: "",
      INTERESSEN_TITEL: "",
      INTERESSEN: "",
      DESIGN_PRIMARY: application.accentColor,
      DESIGN_ACCENT: application.secondaryColor,
      DESIGN_SOFT_ACCENT: blendHexColor(
        application.accentColor,
        "#ffffff",
        0.78,
      ),
      DESIGN_TITLE_BACKGROUND: blendHexColor(
        application.accentColor,
        "#ffffff",
        0.62,
      ),
      DESIGN_FONT: wordFontName(application.designSettings.fontId),
      DESIGN_MARGIN_VERTICAL_MM: String(
        compactWordMarginLevelToMm[
          application.designSettings.marginLevel
        ].vertical,
      ),
      DESIGN_MARGIN_HORIZONTAL_MM: String(
        compactWordMarginLevelToMm[
          application.designSettings.marginLevel
        ].horizontal,
      ),
      DEKORATION_AKTIV: application.designSettings.showBackgroundInPrint
        ? "true"
        : "false",
      ATS_MODUS:
        application.designSettings.columnLayout === "compact-ats"
          ? "true"
          : "",
    };
    const lastExperienceIndex = Math.min(
      (profile?.experiences.length ?? 0) - 1,
      7,
    );
    for (let index = 0; index < 8; index += 1) {
      const number = index + 1;
      const experience = profile?.experiences[index];
      elegantData[`POSITION_${number}`] = experience?.role ?? "";
      elegantData[`UNTERNEHMEN_${number}`] =
        experience?.company ?? "";
      elegantData[`STARTDATUM_${number}`] = experience?.from ?? "";
      elegantData[`DATUM_TRENNER_${number}`] =
        experience?.from && experience.to ? " – " : "";
      elegantData[`ENDDATUM_${number}`] = experience?.to ?? "";
      elegantData[`ARBEITSORT_${number}`] = experience?.city ?? "";
      elegantData[`BESCHREIBUNG_${number}`] = "";
      elegantData[`METADATA_TRENNER_${number}`] =
        (experience?.from || experience?.to) && experience?.city
          ? "·"
          : "";
      elegantData[`TECHNOLOGIEN_${number}`] = "";
      elegantData[`ERFAHRUNG_TRENNER_${number}`] =
        experience && index < lastExperienceIndex ? "\u200B" : "";
      for (let achievementIndex = 0; achievementIndex < 5; achievementIndex += 1) {
        elegantData[`ERFOLG_${number}_${achievementIndex + 1}`] =
          experience?.achievements[achievementIndex] ?? "";
      }
    }
    for (let index = 0; index < 3; index += 1) {
      const number = index + 1;
      const education = profile?.education[index];
      elegantData[`ABSCHLUSS_${number}`] = education?.degree ?? "";
      elegantData[`FACHRICHTUNG_${number}`] = "";
      elegantData[`HOCHSCHULE_${number}`] =
        education?.institution ?? "";
      elegantData[`AUSBILDUNG_START_${number}`] =
        education?.from ?? "";
      elegantData[`AUSBILDUNG_DATUM_TRENNER_${number}`] =
        education?.from && education.to ? " – " : "";
      elegantData[`AUSBILDUNG_ENDE_${number}`] = education?.to ?? "";
      elegantData[`AUSBILDUNG_ORT_${number}`] = education?.city ?? "";
      elegantData[`AUSBILDUNG_METADATA_TRENNER_${number}`] =
        (education?.from || education?.to) && education?.city
          ? "·"
          : "";

      const strength = profile?.skills[index] ?? "";
      elegantData[`STAERKE_${number}_TITEL`] = strength;
      elegantData[`STAERKE_${number}_BESCHREIBUNG`] = "";

      const language = splitLanguage(profile?.languages[index] ?? "");
      elegantData[`SPRACHE_${number}`] = language.name;
      elegantData[`SPRACHNIVEAU_${number}`] = language.level;
      elegantData[`SPRACHE_${number}_PUNKTE`] = languagePoints(
        language.level,
      );
    }
    knowledgeSection.categories
      .filter((category) => category.isVisible)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .slice(0, 6)
      .forEach((category, index) => {
        const entries = [
          ...category.items
            .filter((item) => item.isVisible && item.name.trim())
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map((item) => item.name),
          ...category.subcategories
            .filter((subcategory) => subcategory.isVisible)
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .flatMap((subcategory) =>
              subcategory.items
                .filter((item) => item.isVisible && item.name.trim())
                .sort((left, right) => left.sortOrder - right.sortOrder)
                .map((item) => item.name),
            ),
        ];
        elegantData[`KENNTNIS_KATEGORIE_${index + 1}`] =
          entries.length ? category.title : "";
        elegantData[`KENNTNIS_EINTRAEGE_${index + 1}`] =
          entries.join(" · ");
      });
    const templateData: Record<string, string> = {
      BEWERBER_NAME: applicantName,
      BEWERBER_VORNAME: profile?.firstName ?? "",
      BEWERBER_NACHNAME: profile?.lastName ?? "",
      BEWERBER_ADRESSE: profile?.street ?? "",
      BEWERBER_PLZ: profile?.postalCode ?? "",
      BEWERBER_ORT: profile?.city ?? "",
      BEWERBER_TELEFON: profile?.phone ?? "",
      BEWERBER_EMAIL: profile?.email ?? "",
      FIRMA_NAME: application.company.name,
      FIRMA_ADRESSE: application.company.street,
      FIRMA_PLZ: application.company.postalCode,
      FIRMA_ORT: application.company.city,
      ANSPRECHPARTNER: postalContactName,
      STELLENBEZEICHNUNG: application.job.title,
      STELLENNUMMER: "",
      BEWERBUNGSDATUM: new Intl.DateTimeFormat("de-DE").format(
        getApplicationDate(application),
      ),
      BETREFF:
        application.documents.coverSubject ||
        `Bewerbung als ${application.job.title}`,
      ANREDE: greeting,
      EINLEITUNG: application.documents.coverIntroduction,
      MOTIVATION: application.documents.coverMotivation,
      FACHLICHE_EIGNUNG: application.documents.coverQualification,
      UNTERNEHMENSBEZUG: application.documents.coverCompanyFit,
      ZUSATZABSATZ: application.documents.coverExtraParagraph,
      HAUPTTEXT: [
        application.documents.coverMotivation,
        application.documents.coverQualification,
        application.documents.coverCompanyFit,
      ]
        .filter(Boolean)
        .join("\n\n"),
      SCHLUSSTEXT: application.documents.coverClosing,
      GRUSSFORMEL: "Mit freundlichen Grüßen",
      UNTERSCHRIFT: applicantName,
      KENNTNISSE: knowledgeText,
      ...elegantData,
    };
    const documentDirectories = this.files.documentDirectories(application);
    return {
      application,
      targetDirectories: {
        anschreiben: documentDirectories.anschreiben,
        deckblatt: documentDirectories.deckblatt,
        lebenslauf: documentDirectories.lebenslauf,
      },
      requestedBaseName: application.company.name,
      data: templateData,
    };
  }

  getExportHtml(
    id: string,
    target: "deckblatt" | "anschreiben" | "lebenslauf" | "mappe",
    applicationSnapshot?: Application,
  ) {
    const application = applicationSnapshot
      ? applicationSchema.parse(applicationSnapshot)
      : this.getApplication(id);
    if (application.id !== id) {
      throw new Error(
        "Die Exportdaten gehören nicht zur ausgewählten Bewerbung.",
      );
    }
    return buildDocumentHtml(
      application,
      this.getProfileForApplication(application),
      target,
    );
  }

  getExportDefaultName(id: string, target: string) {
    const application = this.getApplication(id);
    return `${sanitizeFileName(application.company.name)}_${sanitizeFileName(application.job.title)}_${target}.pdf`;
  }

  async writeBackup(filePath: string) {
    await writeFile(
      filePath,
      JSON.stringify(workspaceSchema.parse(this.workspace), null, 2),
      "utf8",
    );
  }

  previewLegacyMigration(sourcePath: string) {
    return this.migration.preview(sourcePath);
  }

  async migrateLegacyData(sourcePath: string) {
    const hasUserData =
      this.workspace.applications.length > 0 ||
      this.workspace.profiles.length > 0 ||
      this.workspace.events.length > 0 ||
      this.workspace.attachments.length > 0;
    if (hasUserData) {
      throw new Error(
        "Eine Migration ist nur möglich, solange der neue Datenbestand leer ist.",
      );
    }
    const emergencyPath = path.join(
      this.dataPath,
      "Backups",
      `vor-migration-${timestamp()}-${createId()}.json`,
    );
    await copyFile(this.workspacePath, emergencyPath);
    const preview = await this.migration.preview(sourcePath);
    const previous = this.workspace;
    try {
      this.workspace = await this.migration.migrate(sourcePath);
      await this.persist(this.workspace.applications);
      await this.atomicWrite(
        path.join(
          this.dataPath,
          "Backups",
          `migration-${timestamp()}-${createId()}.json`,
        ),
        JSON.stringify(
          {
            migratedAt: nowIso(),
            sourcePath: preview.sourcePath,
            targetPath: this.dataPath,
            fileCount: preview.fileCount,
            totalBytes: preview.totalBytes,
            applications: preview.applications,
            attachments: preview.attachments,
            sourceFilesDeleted: false,
          },
          null,
          2,
        ),
      );
      return this.getWorkspace();
    } catch (error) {
      this.workspace = previous;
      throw error;
    }
  }

  async importBackup(filePath: string) {
    const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
    const imported = workspaceSchema.parse(parsed);
    const emergencyPath = path.join(
      this.dataPath,
      "Backups",
      `vor-import-${timestamp()}.json`,
    );
    await copyFile(this.workspacePath, emergencyPath);
    const previous = this.workspace;
    try {
      this.workspace = imported;
      const availableAttachments = [];
      for (const attachment of this.workspace.attachments) {
        try {
          await stat(this.getAttachmentPath(attachment));
          availableAttachments.push(attachment);
        } catch {
          // A JSON backup cannot recreate a missing binary attachment.
        }
      }
      this.workspace.attachments = availableAttachments;
      const availableIds = new Set(
        availableAttachments.map((attachment) => attachment.id),
      );
      this.workspace.applications.forEach((application) => {
        application.attachmentIds = application.attachmentIds.filter((id) =>
          availableIds.has(id),
        );
      });
      await this.persist(this.workspace.applications);
      return this.getWorkspace();
    } catch (error) {
      this.workspace = previous;
      try {
        await this.persist();
      } catch {
        // Preserve and report the original import error.
      }
      throw error;
    }
  }

  async writeSettings(filePath: string) {
    await writeFile(
      filePath,
      JSON.stringify(appSettingsSchema.parse(this.workspace.settings), null, 2),
      "utf8",
    );
  }

  async importSettings(filePath: string) {
    const parsed: unknown = JSON.parse(await readFile(filePath, "utf8"));
    this.workspace.settings = appSettingsSchema.parse(parsed);
    this.workspace.applications.forEach((application) =>
      this.syncEvents(application),
    );
    await this.persist();
    return this.getWorkspace();
  }

  getTemplateIds() {
    return new Set(templates.map((template) => template.id));
  }
}
