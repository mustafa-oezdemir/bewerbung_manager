import {
  Copy,
  ExternalLink,
  FolderOpen,
  Link2,
  Mail,
  MapPin,
  Phone,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  applicationStatuses,
  rejectionReasons,
  type Application,
  type ApplicationStatus,
  type RejectionReason,
} from "../shared/schema";
import { templates } from "../shared/templates";
import {
  formatDate,
  fromDateInput,
  fromDateTimeInput,
  statusTone,
  toDateInput,
  toDateTimeInput,
} from "../lib/format";
import {
  selectCurrentApplication,
  useAppStore,
} from "../store/useAppStore";

type Filter = "active" | "interviews" | "rejections" | "offers" | "all";

export function ApplicationsView({
  initialFilter = "active",
}: {
  initialFilter?: Filter;
}) {
  const workspace = useAppStore((state) => state.workspace);
  const selected = useAppStore(selectCurrentApplication);
  const selectedId = useAppStore((state) => state.selectedApplicationId);
  const selectApplication = useAppStore((state) => state.selectApplication);
  const saveApplication = useAppStore((state) => state.saveApplication);
  const changeStatus = useAppStore((state) => state.changeStatus);
  const removeApplication = useAppStore((state) => state.removeApplication);
  const duplicateApplication = useAppStore((state) => state.duplicateApplication);
  const openFolder = useAppStore((state) => state.openFolder);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const queryLower = query.trim().toLocaleLowerCase("de-DE");
    return workspace.applications.filter((application) => {
      const matchesSearch =
        !queryLower ||
        [
          application.company.name,
          application.job.title,
          application.company.city,
          application.status,
        ].some((value) =>
          value.toLocaleLowerCase("de-DE").includes(queryLower),
        );
      if (!matchesSearch) return false;
      if (filter === "active")
        return !["Absage", "Zurückgezogen", "Archiviert"].includes(
          application.status,
        );
      if (filter === "interviews")
        return ["Vorstellungsgespräch", "Zweites Gespräch"].includes(
          application.status,
        );
      if (filter === "rejections") return application.status === "Absage";
      if (filter === "offers") return application.status === "Zusage";
      return true;
    });
  }, [filter, query, workspace.applications]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const data = new FormData(event.currentTarget);
    const status = String(data.get("status")) as ApplicationStatus;
    const rejectionReason = String(data.get("rejectionReason") || "") as
      | RejectionReason
      | "";
    const updated: Application = {
      ...selected,
      templateId: String(data.get("templateId")),
      accentColor: String(data.get("accentColor")),
      secondaryColor: String(data.get("secondaryColor")),
      company: {
        ...selected.company,
        name: String(data.get("company")),
        street: String(data.get("street")),
        postalCode: String(data.get("postalCode")),
        city: String(data.get("city")),
        website: String(data.get("website")),
      },
      contact: {
        ...selected.contact,
        firstName: String(data.get("contactFirstName")),
        lastName: String(data.get("contactLastName")),
        email: String(data.get("contactEmail")),
        phone: String(data.get("contactPhone")),
      },
      job: {
        ...selected.job,
        title: String(data.get("role")),
        url: String(data.get("jobUrl")),
        source: String(data.get("source")),
        fullText: String(data.get("fullText")),
        salaryExpectation: String(data.get("salaryExpectation")),
      },
      sentAt: fromDateInput(String(data.get("sentAt"))),
      deadlineAt: fromDateInput(String(data.get("deadlineAt"))),
      interviewAt: fromDateTimeInput(String(data.get("interviewAt"))),
      secondInterviewAt: fromDateTimeInput(
        String(data.get("secondInterviewAt")),
      ),
      startAt: fromDateInput(String(data.get("startAt"))),
      contractEndAt: fromDateInput(String(data.get("contractEndAt"))),
      fixedTermEndAt: fromDateInput(String(data.get("fixedTermEndAt"))),
      probationEndAt: fromDateInput(String(data.get("probationEndAt"))),
      notes: String(data.get("notes")),
    };
    await saveApplication(updated);
    if (status !== selected.status) {
      await changeStatus(
        selected.id,
        status,
        rejectionReason || undefined,
      );
    }
  };

  return (
    <div className="manager-grid">
      <aside className="application-sidebar surface">
        <div className="search-box">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bewerbungen suchen …"
          />
        </div>
        <div className="filter-tabs">
          {[
            ["active", "Aktiv"],
            ["interviews", "Gespräche"],
            ["rejections", "Absagen"],
            ["offers", "Zusagen"],
            ["all", "Alle"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={filter === value ? "active" : ""}
              onClick={() => setFilter(value as Filter)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="application-list">
          {filtered.map((application) => (
            <button
              key={application.id}
              className={`application-item ${selectedId === application.id ? "active" : ""}`}
              onClick={() => selectApplication(application.id)}
            >
              <span className="company-mark">
                {application.company.name.slice(0, 2).toUpperCase()}
              </span>
              <span>
                <strong>{application.company.name}</strong>
                <small>{application.job.title}</small>
                <em className={statusTone(application.status)}>
                  {application.status}
                </em>
              </span>
              <small>{formatDate(application.updatedAt)}</small>
            </button>
          ))}
          {!filtered.length && (
            <div className="empty-state compact">
              <p>Keine passenden Bewerbungen.</p>
            </div>
          )}
        </div>
      </aside>
      {selected ? (
        <main className="detail-surface surface" key={selected.id}>
          <header className="detail-title">
            <div className="company-identity">
              <span>{selected.company.name.slice(0, 2).toUpperCase()}</span>
              <div>
                <p className="eyebrow">Bewerbungsdetail</p>
                <h2>{selected.job.title}</h2>
                <p>{selected.company.name} · {selected.company.city}</p>
              </div>
            </div>
            <div className="detail-actions">
              <button className="icon-button" title="Duplizieren" onClick={() => void duplicateApplication(selected.id)}>
                <Copy size={17} />
              </button>
              <button className="icon-button" title="Ordner öffnen" onClick={() => void openFolder(selected.id)}>
                <FolderOpen size={17} />
              </button>
              <button
                className="icon-button danger"
                title="Aus Übersicht entfernen"
                onClick={() => {
                  if (window.confirm("Bewerbung aus der Übersicht entfernen? Der gespeicherte Ordner bleibt erhalten.")) {
                    void removeApplication(selected.id);
                  }
                }}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </header>
          <div className="contact-strip">
            <span><MapPin size={15} /> {selected.company.city || "Ort offen"}</span>
            <span><Mail size={15} /> {selected.contact.email || "E-Mail offen"}</span>
            <span><Phone size={15} /> {selected.contact.phone || "Telefon offen"}</span>
            {selected.job.url && (
              <button onClick={() => void window.bewerbungsManager.system.openExternal(selected.job.url)}>
                <Link2 size={15} /> Stellenanzeige <ExternalLink size={13} />
              </button>
            )}
          </div>
          <form className="detail-form" onSubmit={(event) => void submit(event)}>
            <FormSection title="Status & Gestaltung">
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={selected.status}>
                  {applicationStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Absagegrund</span>
                <select name="rejectionReason" defaultValue={selected.rejectionReason || ""}>
                  <option value="">Nicht gesetzt</option>
                  {rejectionReasons.map((reason) => (
                    <option key={reason}>{reason}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Vorlage</span>
                <select name="templateId" defaultValue={selected.templateId}>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Akzentfarbe</span>
                <input name="accentColor" type="color" defaultValue={selected.accentColor} />
              </label>
              <label className="field">
                <span>Seiten-/Flächenfarbe</span>
                <input name="secondaryColor" type="color" defaultValue={selected.secondaryColor} />
              </label>
            </FormSection>
            <FormSection title="Unternehmen & Position">
              <label className="field"><span>Unternehmen</span><input name="company" defaultValue={selected.company.name} required /></label>
              <label className="field"><span>Position</span><input name="role" defaultValue={selected.job.title} required /></label>
              <label className="field"><span>Straße</span><input name="street" defaultValue={selected.company.street} /></label>
              <div className="split-fields">
                <label className="field"><span>PLZ</span><input name="postalCode" defaultValue={selected.company.postalCode} /></label>
                <label className="field"><span>Ort</span><input name="city" defaultValue={selected.company.city} /></label>
              </div>
              <label className="field"><span>Website</span><input name="website" type="url" defaultValue={selected.company.website} /></label>
              <label className="field"><span>Stellen-URL</span><input name="jobUrl" type="url" defaultValue={selected.job.url} /></label>
              <label className="field"><span>Quelle</span><input name="source" defaultValue={selected.job.source} /></label>
              <label className="field"><span>Gehaltsvorstellung</span><input name="salaryExpectation" defaultValue={selected.job.salaryExpectation} /></label>
            </FormSection>
            <FormSection title="Ansprechpartner">
              <label className="field"><span>Vorname</span><input name="contactFirstName" defaultValue={selected.contact.firstName} /></label>
              <label className="field"><span>Nachname</span><input name="contactLastName" defaultValue={selected.contact.lastName} /></label>
              <label className="field"><span>E-Mail</span><input name="contactEmail" type="email" defaultValue={selected.contact.email} /></label>
              <label className="field"><span>Telefon</span><input name="contactPhone" defaultValue={selected.contact.phone} /></label>
            </FormSection>
            <FormSection title="Termine">
              <label className="field"><span>Gesendet</span><input name="sentAt" type="date" defaultValue={toDateInput(selected.sentAt)} /></label>
              <label className="field"><span>Bewerbungsfrist</span><input name="deadlineAt" type="date" defaultValue={toDateInput(selected.deadlineAt)} /></label>
              <label className="field"><span>Vorstellungsgespräch</span><input name="interviewAt" type="datetime-local" defaultValue={toDateTimeInput(selected.interviewAt)} /></label>
              <label className="field"><span>Zweites Gespräch</span><input name="secondInterviewAt" type="datetime-local" defaultValue={toDateTimeInput(selected.secondInterviewAt)} /></label>
              <label className="field"><span>Vertragsbeginn</span><input name="startAt" type="date" defaultValue={toDateInput(selected.startAt)} /></label>
              <label className="field"><span>Vertragsende</span><input name="contractEndAt" type="date" defaultValue={toDateInput(selected.contractEndAt)} /></label>
              <label className="field"><span>Befristungsende</span><input name="fixedTermEndAt" type="date" defaultValue={toDateInput(selected.fixedTermEndAt)} /></label>
              <label className="field"><span>Probezeitende</span><input name="probationEndAt" type="date" defaultValue={toDateInput(selected.probationEndAt)} /></label>
            </FormSection>
            <FormSection title="Inhalt">
              <label className="field full"><span>Vollständige Stellenanzeige</span><textarea name="fullText" rows={8} defaultValue={selected.job.fullText} /></label>
              <label className="field full"><span>Persönliche Notizen</span><textarea name="notes" rows={4} defaultValue={selected.notes} /></label>
            </FormSection>
            <div className="save-bar">
              <span>Zuletzt geändert: {formatDate(selected.updatedAt, true)}</span>
              <button className="button primary" type="submit"><Save size={17} /> Änderungen speichern</button>
            </div>
          </form>
          <section className="history-section">
            <h3>Statusverlauf</h3>
            <div>
              {[...selected.statusHistory].reverse().map((entry) => (
                <article key={`${entry.at}-${entry.to}`}>
                  <i className={`status-dot ${statusTone(entry.to)}`} />
                  <span><strong>{entry.to}</strong><small>{formatDate(entry.at, true)}{entry.from ? ` · von ${entry.from}` : ""}</small></span>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="surface empty-detail">
          <FileEmpty />
        </main>
      )}
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="form-section">
      <legend>{title}</legend>
      <div className="form-grid">{children}</div>
    </fieldset>
  );
}

function FileEmpty() {
  return (
    <div className="empty-state">
      <Search size={24} />
      <h3>Keine Bewerbung ausgewählt</h3>
      <p>Wählen Sie links eine Bewerbung aus oder legen Sie eine neue an.</p>
    </div>
  );
}
