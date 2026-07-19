import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  Sparkles,
  XCircle,
} from "lucide-react";
import { formatDate, statusTone } from "../lib/format";
import { useAppStore } from "../store/useAppStore";

type Props = {
  onOpenApplications: () => void;
  onOpenCalendar: () => void;
};

export function DashboardView({
  onOpenApplications,
  onOpenCalendar,
}: Props) {
  const { applications, events } = useAppStore((state) => state.workspace);
  const selectApplication = useAppStore((state) => state.selectApplication);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const active = applications.filter(
    (application) =>
      !["Absage", "Zurückgezogen", "Archiviert"].includes(application.status),
  );
  const interviews = applications.filter((application) =>
    ["Vorstellungsgespräch", "Zweites Gespräch"].includes(application.status),
  );
  const rejections = applications.filter(
    (application) => application.status === "Absage",
  );
  const offers = applications.filter(
    (application) => application.status === "Zusage",
  );
  const thisMonth = applications.filter(
    (application) =>
      application.sentAt && new Date(application.sentAt) >= monthStart,
  );
  const resolved = rejections.length + offers.length;
  const successRate = resolved
    ? Math.round((offers.length / resolved) * 100)
    : 0;
  const upcoming = events
    .filter(
      (event) =>
        !event.cancelled &&
        !event.completed &&
        new Date(event.startAt) >= now,
    )
    .sort(
      (left, right) =>
        new Date(left.startAt).getTime() - new Date(right.startAt).getTime(),
    )
    .slice(0, 5);
  const due = events
    .filter(
      (event) =>
        !event.cancelled &&
        !event.completed &&
        new Date(event.startAt) < now,
    )
    .slice(0, 4);
  const recent = [...applications]
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
    )
    .slice(0, 5);

  const openApplication = (id?: string) => {
    selectApplication(id);
    onOpenApplications();
  };

  return (
    <div className="view-stack">
      <section className="welcome-panel">
        <div>
          <p className="eyebrow">Guten Überblick</p>
          <h2>Ihre Bewerbungen, klar im Blick.</h2>
          <p>
            Termine, Fristen und nächste Schritte werden aus einem zentralen
            Datensatz automatisch zusammengeführt.
          </p>
        </div>
        <div className="month-summary">
          <Sparkles size={19} />
          <span>Diesen Monat</span>
          <strong>{thisMonth.length} Bewerbungen</strong>
        </div>
      </section>

      <section className="metric-grid">
        {[
          {
            label: "Aktiv",
            value: active.length,
            icon: FileText,
            tone: "blue",
          },
          {
            label: "Gespräche",
            value: interviews.length,
            icon: MessageSquareText,
            tone: "amber",
          },
          {
            label: "Zusagen",
            value: offers.length,
            icon: CheckCircle2,
            tone: "green",
          },
          {
            label: "Absagen",
            value: rejections.length,
            icon: XCircle,
            tone: "rose",
          },
        ].map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className={`metric-icon ${metric.tone}`}>
              <metric.icon size={19} />
            </span>
            <div>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-columns">
        <article className="surface">
          <header className="section-header">
            <div>
              <p className="eyebrow">Als Nächstes</p>
              <h3>Termine & Fristen</h3>
            </div>
            <button className="text-button" onClick={onOpenCalendar}>
              Kalender <ArrowUpRight size={15} />
            </button>
          </header>
          <div className="event-list">
            {upcoming.length ? (
              upcoming.map((event) => (
                <button
                  className="event-row"
                  key={event.id}
                  onClick={() => openApplication(event.applicationId)}
                >
                  <span className="date-tile">
                    <strong>
                      {new Date(event.startAt)
                        .toLocaleDateString("de-DE", { day: "2-digit" })}
                    </strong>
                    <small>
                      {new Date(event.startAt)
                        .toLocaleDateString("de-DE", { month: "short" })}
                    </small>
                  </span>
                  <span>
                    <strong>{event.title}</strong>
                    <small>{formatDate(event.startAt, !event.allDay)}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </button>
              ))
            ) : (
              <EmptyState text="Keine anstehenden Termine." />
            )}
          </div>
        </article>

        <article className="surface insight-card">
          <p className="eyebrow">Erfolgsquote</p>
          <div className="rate">
            <strong>{successRate}%</strong>
            <span>auf Basis abgeschlossener Verfahren</span>
          </div>
          <div className="rate-track">
            <i style={{ width: `${successRate}%` }} />
          </div>
          <dl className="compact-stats">
            <div>
              <dt>Antworten</dt>
              <dd>{resolved}</dd>
            </div>
            <div>
              <dt>Offen</dt>
              <dd>{active.length}</dd>
            </div>
            <div>
              <dt>Gesamt</dt>
              <dd>{applications.length}</dd>
            </div>
          </dl>
          <div className="due-box">
            <Clock3 size={18} />
            <div>
              <strong>{due.length} fällige Aufgaben</strong>
              <span>Auch verpasste Erinnerungen bleiben hier sichtbar.</span>
            </div>
          </div>
        </article>
      </section>

      <section className="surface">
        <header className="section-header">
          <div>
            <p className="eyebrow">Zuletzt bearbeitet</p>
            <h3>Bewerbungen</h3>
          </div>
          <button className="text-button" onClick={onOpenApplications}>
            Alle anzeigen <ArrowUpRight size={15} />
          </button>
        </header>
        {recent.length ? (
          <div className="application-table">
            <div className="table-head">
              <span>Unternehmen</span>
              <span>Position</span>
              <span>Status</span>
              <span>Aktualisiert</span>
            </div>
            {recent.map((application) => (
              <button
                className="table-row"
                key={application.id}
                onClick={() => openApplication(application.id)}
              >
                <span><b>{application.company.name.slice(0, 1)}</b>{application.company.name}</span>
                <span>{application.job.title}</span>
                <span><i className={`status-dot ${statusTone(application.status)}`} />{application.status}</span>
                <span>{formatDate(application.updatedAt)}</span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState text="Legen Sie Ihre erste Bewerbung an." />
        )}
      </section>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="empty-state">
      <CalendarClock size={22} />
      <p>{text}</p>
    </div>
  );
}
