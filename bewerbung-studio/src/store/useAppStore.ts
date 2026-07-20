import { create } from "zustand";
import {
  defaultSettings,
  type ApplicantProfile,
  type Application,
  type ApplicationInput,
  type ApplicationStatus,
  type AppSettings,
  type Attachment,
  type AttachmentCategory,
  type CalendarEvent,
  type RejectionReason,
  type Workspace,
} from "../shared/schema";

const emptyWorkspace: Workspace = {
  schemaVersion: 1,
  applications: [],
  profiles: [],
  events: [],
  attachments: [],
  settings: defaultSettings,
  updatedAt: new Date().toISOString(),
};

type StoreState = {
  workspace: Workspace;
  selectedApplicationId?: string;
  loading: boolean;
  error?: string;
  notice?: string;
  hydrate: () => Promise<void>;
  selectApplication: (id?: string) => void;
  createApplication: (input: ApplicationInput) => Promise<void>;
  saveApplication: (application: Application) => Promise<void>;
  removeApplication: (id: string) => Promise<void>;
  duplicateApplication: (id: string) => Promise<void>;
  changeStatus: (
    id: string,
    status: ApplicationStatus,
    reason?: RejectionReason,
  ) => Promise<void>;
  saveProfile: (profile: ApplicantProfile) => Promise<void>;
  saveSettings: (settings: AppSettings) => Promise<void>;
  saveEvent: (event: CalendarEvent) => Promise<void>;
  addAttachment: (
    applicationId: string,
    category: AttachmentCategory,
  ) => Promise<void>;
  saveAttachment: (attachment: Attachment) => Promise<void>;
  moveAttachment: (id: string, direction: -1 | 1) => Promise<void>;
  removeAttachment: (id: string) => Promise<void>;
  openAttachment: (id: string) => Promise<void>;
  exportPdf: (
    applicationId: string,
    target: "deckblatt" | "anschreiben" | "lebenslauf" | "mappe",
    application?: Application,
  ) => Promise<void>;
  exportBackup: () => Promise<void>;
  importBackup: () => Promise<void>;
  exportSettings: () => Promise<void>;
  importSettings: () => Promise<void>;
  openFolder: (id: string) => Promise<void>;
  clearMessage: () => void;
};

const apiAvailable = () => typeof window.bewerbungsManager !== "undefined";

export const useAppStore = create<StoreState>((set, get) => {
  const perform = async (
    action: () => Promise<Workspace>,
    notice: string,
  ) => {
    set({ loading: true, error: undefined });
    try {
      const workspace = await action();
      set({ workspace, loading: false, notice });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Ein Fehler ist aufgetreten.",
      });
      throw error;
    }
  };

  return {
    workspace: emptyWorkspace,
    loading: true,
    async hydrate() {
      if (!apiAvailable()) {
        set({ workspace: emptyWorkspace, loading: false });
        return;
      }
      try {
        const workspace = await window.bewerbungsManager.workspace.get();
        set({
          workspace,
          loading: false,
          selectedApplicationId: workspace.applications[0]?.id,
        });
      } catch (error) {
        set({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Daten konnten nicht geladen werden.",
        });
      }
    },
    selectApplication: (id) => set({ selectedApplicationId: id }),
    async createApplication(input) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.applications.create(input),
        "Bewerbung wurde angelegt.",
      );
      set({
        selectedApplicationId: get().workspace.applications[0]?.id,
      });
    },
    async saveApplication(application) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.applications.save(application),
        "Änderungen wurden gespeichert.",
      );
    },
    async removeApplication(id) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.applications.remove(id),
        "Bewerbung wurde aus der Übersicht entfernt. Der Ordner bleibt erhalten.",
      );
      set({
        selectedApplicationId: get().workspace.applications[0]?.id,
      });
    },
    async duplicateApplication(id) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.applications.duplicate(id),
        "Bewerbung wurde als Entwurf dupliziert.",
      );
      set({
        selectedApplicationId: get().workspace.applications[0]?.id,
      });
    },
    async changeStatus(id, status, reason) {
      if (!apiAvailable()) return;
      await perform(
        () =>
          window.bewerbungsManager.applications.changeStatus(
            id,
            status,
            reason,
          ),
        `Status wurde auf „${status}“ gesetzt.`,
      );
    },
    async saveProfile(profile) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.profiles.save(profile),
        "Profil wurde gespeichert.",
      );
    },
    async saveSettings(settings) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.settings.save(settings),
        "Einstellungen wurden gespeichert.",
      );
    },
    async saveEvent(event) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.events.save(event),
        "Kalendereintrag wurde aktualisiert.",
      );
    },
    async addAttachment(applicationId, category) {
      if (!apiAvailable()) return;
      await perform(
        () =>
          window.bewerbungsManager.attachments.add(applicationId, category),
        "Dokument wurde sicher kopiert.",
      );
    },
    async saveAttachment(attachment) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.attachments.save(attachment),
        "Dokumentdaten wurden gespeichert.",
      );
    },
    async moveAttachment(id, direction) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.attachments.move(id, direction),
        "Reihenfolge wurde aktualisiert.",
      );
    },
    async removeAttachment(id) {
      if (!apiAvailable()) return;
      await perform(
        () => window.bewerbungsManager.attachments.remove(id),
        "Verwaltete Dokumentkopie wurde entfernt.",
      );
    },
    async openAttachment(id) {
      if (!apiAvailable()) return;
      try {
        await window.bewerbungsManager.attachments.open(id);
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Dokument konnte nicht geöffnet werden.",
        });
      }
    },
    async exportPdf(applicationId, target, application) {
      if (!apiAvailable()) return;
      set({ loading: true, error: undefined });
      try {
        const result = await window.bewerbungsManager.export.pdf(
          applicationId,
          target,
          application,
        );
        set({
          loading: false,
          notice: result ? "PDF wurde exportiert." : undefined,
        });
      } catch (error) {
        set({
          loading: false,
          error: error instanceof Error ? error.message : "Export fehlgeschlagen.",
        });
      }
    },
    async exportBackup() {
      if (!apiAvailable()) return;
      const result = await window.bewerbungsManager.export.backup();
      if (result) set({ notice: "JSON-Sicherung wurde exportiert." });
    },
    async importBackup() {
      if (!apiAvailable()) return;
      set({ loading: true, error: undefined });
      try {
        const workspace =
          await window.bewerbungsManager.export.importBackup();
        if (workspace) {
          set({
            workspace,
            selectedApplicationId: workspace.applications[0]?.id,
            loading: false,
            notice: "JSON-Sicherung wurde geprüft und wiederhergestellt.",
          });
        } else {
          set({ loading: false });
        }
      } catch (error) {
        set({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Sicherung konnte nicht importiert werden.",
        });
      }
    },
    async exportSettings() {
      if (!apiAvailable()) return;
      const result = await window.bewerbungsManager.export.settings();
      if (result) set({ notice: "Einstellungen wurden exportiert." });
    },
    async importSettings() {
      if (!apiAvailable()) return;
      set({ loading: true, error: undefined });
      try {
        const workspace =
          await window.bewerbungsManager.export.importSettings();
        if (workspace) {
          set({
            workspace,
            loading: false,
            notice: "Einstellungen wurden geprüft und importiert.",
          });
        } else {
          set({ loading: false });
        }
      } catch (error) {
        set({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Einstellungen konnten nicht importiert werden.",
        });
      }
    },
    async openFolder(id) {
      if (!apiAvailable()) return;
      await window.bewerbungsManager.applications.openFolder(id);
    },
    clearMessage: () => set({ error: undefined, notice: undefined }),
  };
});

export const selectCurrentApplication = (state: StoreState) =>
  state.workspace.applications.find(
    (application) => application.id === state.selectedApplicationId,
  ) ?? state.workspace.applications[0];
