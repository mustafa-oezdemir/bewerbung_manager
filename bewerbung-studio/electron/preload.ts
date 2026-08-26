import { contextBridge, ipcRenderer } from "electron";
import type { BewerbungsManagerApi } from "../src/shared/ipc";

const api: BewerbungsManagerApi = {
  workspace: {
    get: () => ipcRenderer.invoke("workspace:get"),
  },
  applicationDraft: {
    get: () => ipcRenderer.invoke("application-draft:get"),
    save: (draft) => ipcRenderer.invoke("application-draft:save", draft),
    clear: () => ipcRenderer.invoke("application-draft:clear"),
  },
  applications: {
    create: (input) => ipcRenderer.invoke("applications:create", input),
    save: (application) => ipcRenderer.invoke("applications:save", application),
    remove: (id) => ipcRenderer.invoke("applications:remove", id),
    duplicate: (id) => ipcRenderer.invoke("applications:duplicate", id),
    changeStatus: (id, status, reason) =>
      ipcRenderer.invoke("applications:change-status", id, status, reason),
    openFolder: (id) => ipcRenderer.invoke("applications:open-folder", id),
  },
  profiles: {
    save: (profile) => ipcRenderer.invoke("profiles:save", profile),
    remove: (id) => ipcRenderer.invoke("profiles:remove", id),
  },
  templates: {
    scan: () => ipcRenderer.invoke("templates:scan"),
    add: (input) => ipcRenderer.invoke("templates:add", input),
    use: (input) => ipcRenderer.invoke("templates:use", input),
    syncAnschreiben: (applicationId) =>
      ipcRenderer.invoke("templates:sync-anschreiben", applicationId),
    duplicate: (templateId) =>
      ipcRenderer.invoke("templates:duplicate", templateId),
    copyToMuster: (templateId) =>
      ipcRenderer.invoke("templates:copy-to-muster", templateId),
    toggleFavorite: (templateId) =>
      ipcRenderer.invoke("templates:toggle-favorite", templateId),
    remove: (templateId) =>
      ipcRenderer.invoke("templates:remove", templateId),
    open: (templateId) => ipcRenderer.invoke("templates:open", templateId),
    openFolder: (templateId) =>
      ipcRenderer.invoke("templates:open-folder", templateId),
  },
  media: {
    pickProfileImage: (kind) =>
      ipcRenderer.invoke("media:pick-profile-image", kind),
  },
  settings: {
    save: (settings) => ipcRenderer.invoke("settings:save", settings),
  },
  events: {
    save: (event) => ipcRenderer.invoke("events:save", event),
  },
  attachments: {
    add: (applicationId, category) =>
      ipcRenderer.invoke("attachments:add", applicationId, category),
    save: (attachment) => ipcRenderer.invoke("attachments:save", attachment),
    move: (id, direction) =>
      ipcRenderer.invoke("attachments:move", id, direction),
    remove: (id) => ipcRenderer.invoke("attachments:remove", id),
    open: (id) => ipcRenderer.invoke("attachments:open", id),
  },
  export: {
    pdf: (applicationId, target, application) =>
      ipcRenderer.invoke(
        "export:pdf",
        applicationId,
        target,
        application,
      ),
    backup: () => ipcRenderer.invoke("export:backup"),
    importBackup: () => ipcRenderer.invoke("export:import-backup"),
    settings: () => ipcRenderer.invoke("export:settings"),
    importSettings: () => ipcRenderer.invoke("export:import-settings"),
  },
  migration: {
    importLegacy: () => ipcRenderer.invoke("migration:import-legacy"),
  },
  system: {
    openExternal: (url) => ipcRenderer.invoke("system:open-external", url),
    dataPath: () => ipcRenderer.invoke("system:data-path"),
  },
};

contextBridge.exposeInMainWorld("bewerbungsManager", api);
