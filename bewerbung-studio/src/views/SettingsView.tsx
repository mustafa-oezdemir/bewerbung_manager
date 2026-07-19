import {
  Bell,
  Database,
  Download,
  History,
  Moon,
  Save,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AppSettings } from "../shared/schema";
import { useAppStore } from "../store/useAppStore";

export function SettingsView() {
  const settings = useAppStore((state) => state.workspace.settings);
  const saveSettings = useAppStore((state) => state.saveSettings);
  const exportBackup = useAppStore((state) => state.exportBackup);
  const importBackup = useAppStore((state) => state.importBackup);
  const exportSettings = useAppStore((state) => state.exportSettings);
  const importSettings = useAppStore((state) => state.importSettings);
  const [dataPath, setDataPath] = useState("Wird geladen …");
  useEffect(() => {
    if (window.bewerbungsManager) {
      void window.bewerbungsManager.system.dataPath().then(setDataPath);
    }
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mode = String(data.get("followUp"));
    const next: AppSettings = {
      ...settings,
      followUpDays: mode === "off" ? null : Number(mode),
      notificationsEnabled: data.get("notificationsEnabled") === "on",
      archiveAccepted: data.get("archiveAccepted") === "on",
      theme: String(data.get("theme")) as AppSettings["theme"],
      autoBackupEnabled: data.get("autoBackupEnabled") === "on",
      backupRetention: Number(data.get("backupRetention")),
      autoSaveDelaySeconds: Number(data.get("autoSaveDelaySeconds")),
    };
    await saveSettings(next);
  };

  return (
    <div className="settings-layout">
      <form className="view-stack" onSubmit={(event) => void submit(event)}>
        <section className="surface settings-section">
          <header><span className="large-icon"><Bell /></span><div><h3>Erinnerungen</h3><p>Automatische Nachfass-Termine und native Desktop-Benachrichtigungen.</p></div></header>
          <div className="form-grid">
            <label className="field">
              <span>Nach Bewerbung nachfassen</span>
              <select name="followUp" defaultValue={settings.followUpDays ?? "off"}>
                <option value="7">nach 7 Tagen</option>
                <option value="10">nach 10 Tagen</option>
                <option value="14">nach 14 Tagen</option>
                <option value="21">nach 21 Tagen</option>
                <option value="off">keine automatische Erinnerung</option>
              </select>
            </label>
            <label className="checkbox-field"><input type="checkbox" name="notificationsEnabled" defaultChecked={settings.notificationsEnabled} /><span>Desktop-Benachrichtigungen aktivieren</span></label>
          </div>
        </section>
        <section className="surface settings-section">
          <header><span className="large-icon"><Moon /></span><div><h3>Darstellung</h3><p>Das Erscheinungsbild wird lokal gespeichert.</p></div></header>
          <div className="form-grid">
            <label className="field"><span>Farbschema</span><select name="theme" defaultValue={settings.theme}><option value="system">Systemeinstellung</option><option value="light">Hell</option><option value="dark">Dunkel</option></select></label>
            <label className="checkbox-field"><input type="checkbox" name="archiveAccepted" defaultChecked={settings.archiveAccepted} /><span>Zusagen nach Abschluss archivieren</span></label>
          </div>
        </section>
        <section className="surface settings-section">
          <header><span className="large-icon"><Database /></span><div><h3>Daten & Sicherung</h3><p>Alle Daten liegen lokal. JSON wird versioniert, validiert und mit Sicherung geschrieben.</p></div></header>
          <div className="path-box"><small>Datenordner</small><code>{dataPath}</code></div>
          <div className="form-grid">
            <label className="checkbox-field">
              <input
                type="checkbox"
                name="autoBackupEnabled"
                defaultChecked={settings.autoBackupEnabled}
              />
              <span>Tägliche automatische JSON-Sicherung</span>
            </label>
            <label className="field">
              <span>Anzahl aufzubewahrender Sicherungen</span>
              <input
                name="backupRetention"
                type="number"
                min="3"
                max="50"
                defaultValue={settings.backupRetention}
              />
            </label>
            <label className="field">
              <span>Automatisches Speichern nach Sekunden</span>
              <input
                name="autoSaveDelaySeconds"
                type="number"
                min="1"
                max="30"
                defaultValue={settings.autoSaveDelaySeconds}
              />
            </label>
          </div>
          <div className="settings-action-grid">
            <button className="button secondary" type="button" onClick={() => void exportBackup()}>
              <Download size={17} /> JSON-Sicherung exportieren
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Eine Sicherung wiederherstellen? Der aktuelle Stand wird vorher automatisch gesichert.",
                  )
                ) {
                  void importBackup();
                }
              }}
            >
              <History size={17} /> Sicherung wiederherstellen
            </button>
            <button className="button secondary" type="button" onClick={() => void exportSettings()}>
              <Download size={17} /> Einstellungen exportieren
            </button>
            <button className="button secondary" type="button" onClick={() => void importSettings()}>
              <Upload size={17} /> Einstellungen importieren
            </button>
          </div>
        </section>
        <div className="save-bar sticky-save"><span>Änderungen gelten sofort für neue Status- und Kalenderereignisse.</span><button className="button primary" type="submit"><Save size={17} /> Einstellungen speichern</button></div>
      </form>
    </div>
  );
}
