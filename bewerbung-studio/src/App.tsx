import {
  Archive,
  CalendarDays,
  ChevronDown,
  FileText,
  FolderArchive,
  Home,
  LayoutTemplate,
  Menu,
  MessageSquareText,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  Sun,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NewApplicationWizard } from "./components/NewApplicationWizard";
import { ApplicationsView } from "./views/ApplicationsView";
import { CalendarView } from "./views/CalendarView";
import { DashboardView } from "./views/DashboardView";
import { DocumentsView } from "./views/DocumentsView";
import { LibraryView } from "./views/LibraryView";
import { ProfileView } from "./views/ProfileView";
import { SettingsView } from "./views/SettingsView";
import { TemplatesView } from "./views/TemplatesView";
import { useAppStore } from "./store/useAppStore";

type View =
  | "home"
  | "active"
  | "interviews"
  | "rejections"
  | "calendar"
  | "resume"
  | "cover"
  | "documents"
  | "templates"
  | "profile"
  | "settings";

const titles: Record<View, string> = {
  home: "Übersicht",
  active: "Aktive Bewerbungen",
  interviews: "Vorstellungsgespräche",
  rejections: "Absagen",
  calendar: "Kalender",
  resume: "Lebenslauf",
  cover: "Anschreiben",
  documents: "Dokumente",
  templates: "Muster",
  profile: "Profil",
  settings: "Einstellungen",
};

export default function App() {
  const [view, setView] = useState<View>("home");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hydrate = useAppStore((state) => state.hydrate);
  const workspace = useAppStore((state) => state.workspace);
  const saveSettings = useAppStore((state) => state.saveSettings);
  const sidebarCollapsed = workspace.settings.sidebarCollapsed;
  const loading = useAppStore((state) => state.loading);
  const error = useAppStore((state) => state.error);
  const notice = useAppStore((state) => state.notice);
  const clearMessage = useAppStore((state) => state.clearMessage);
  const selectApplication = useAppStore((state) => state.selectApplication);
  const [darkOverride, setDarkOverride] = useState(false);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const theme = workspace.settings.theme;
    const dark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      darkOverride;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [workspace.settings.theme, darkOverride]);

  useEffect(() => {
    if (!error && !notice) return;
    const timeout = window.setTimeout(clearMessage, 4200);
    return () => window.clearTimeout(timeout);
  }, [clearMessage, error, notice]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setView("active");
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [view]);

  const counts = useMemo(
    () => ({
      active: workspace.applications.filter(
        (application) =>
          !["Absage", "Zurückgezogen", "Archiviert"].includes(
            application.status,
          ),
      ).length,
      interviews: workspace.applications.filter((application) =>
        ["Vorstellungsgespräch", "Zweites Gespräch"].includes(
          application.status,
        ),
      ).length,
      rejections: workspace.applications.filter(
        (application) => application.status === "Absage",
      ).length,
    }),
    [workspace.applications],
  );

  const goToApplication = (id?: string) => {
    selectApplication(id);
    setView("active");
  };

  return (
    <div className="app-shell">
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="brand">
          <span>BM</span>
          <div><strong>Bewerbungs</strong><small>Manager</small></div>
          <button className="mobile-close" aria-label="Navigation schließen" onClick={() => setSidebarOpen(false)}><X size={18} /></button>
        </div>
        <button
          className="sidebar-collapse"
          type="button"
          aria-label={sidebarCollapsed ? "Navigation ausklappen" : "Navigation einklappen"}
          aria-expanded={!sidebarCollapsed}
          title={sidebarCollapsed ? "Navigation ausklappen" : "Navigation einklappen"}
          onClick={() =>
            void saveSettings({
              ...workspace.settings,
              sidebarCollapsed: !sidebarCollapsed,
            })
          }>
          {sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
        </button>
        <button
          className="button primary new-button"
          type="button"
          aria-label="Neue Bewerbung"
          title="Neue Bewerbung"
          onClick={() => setWizardOpen(true)}>
          <Plus size={18} /> <span>Neue Bewerbung</span>
        </button>
        <nav>
          <p>Übersicht</p>
          <NavItem icon={Home} label="Home" active={view === "home"} onClick={() => setView("home")} />
          <NavItem icon={CalendarDays} label="Kalender" active={view === "calendar"} onClick={() => setView("calendar")} />
          <p>Bewerbungen</p>
          <NavItem icon={FileText} label="Aktive Bewerbungen" badge={counts.active} active={view === "active"} onClick={() => setView("active")} />
          <NavItem icon={MessageSquareText} label="Vorstellungsgespräche" badge={counts.interviews} active={view === "interviews"} onClick={() => setView("interviews")} />
          <NavItem icon={XCircle} label="Absagen" badge={counts.rejections} active={view === "rejections"} onClick={() => setView("rejections")} />
          <p>Unterlagen</p>
          <NavItem icon={UserRound} label="Lebenslauf" active={view === "resume"} onClick={() => setView("resume")} />
          <NavItem icon={FileText} label="Anschreiben" active={view === "cover"} onClick={() => setView("cover")} />
          <NavItem icon={FolderArchive} label="Dokumente" active={view === "documents"} onClick={() => setView("documents")} />
          <NavItem icon={LayoutTemplate} label="Muster" active={view === "templates"} onClick={() => setView("templates")} />
        </nav>
        <div className="sidebar-footer">
          <NavItem icon={UserRound} label="Profil" active={view === "profile"} onClick={() => setView("profile")} />
          <NavItem icon={Settings} label="Einstellungen" active={view === "settings"} onClick={() => setView("settings")} />
        </div>
      </aside>
      <div className={`main-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <header className="topbar">
          <div className="topbar-title">
            <button className="menu-button" aria-label="Navigation öffnen" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div><p className="eyebrow">BewerbungsManager</p><h1>{titles[view]}</h1></div>
          </div>
          <div className="topbar-actions">
            <button className="global-search" onClick={() => setView("active")}><Search size={16} /><span>Suchen</span><kbd>Ctrl K</kbd></button>
            <button className="icon-button" onClick={() => setDarkOverride((value) => !value)} title="Farbschema wechseln">
              {document.documentElement.dataset.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="profile-chip" onClick={() => setView("profile")}>
              <span>{workspace.profiles[0]?.firstName?.[0] || "P"}</span>
              <div><strong>{workspace.profiles[0] ? `${workspace.profiles[0].firstName} ${workspace.profiles[0].lastName}` : "Profil anlegen"}</strong><small>{workspace.profiles[0]?.title || "Absenderdaten"}</small></div>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <main className="content">
          {loading && !workspace.updatedAt ? <Loading /> : (
            <>
              {view === "home" && <DashboardView onOpenApplications={() => setView("active")} onOpenCalendar={() => setView("calendar")} />}
              {view === "active" && <ApplicationsView initialFilter="active" />}
              {view === "interviews" && <ApplicationsView key="interviews" initialFilter="interviews" />}
              {view === "rejections" && <ApplicationsView key="rejections" initialFilter="rejections" />}
              {view === "calendar" && <CalendarView onOpenApplication={goToApplication} />}
              {view === "resume" && <DocumentsView initialTab="lebenslauf" />}
              {view === "cover" && <DocumentsView initialTab="anschreiben" />}
              {view === "documents" && <LibraryView />}
              {view === "templates" && <TemplatesView />}
              {view === "profile" && (
                <ProfileView onSaved={() => setView("home")} />
              )}
              {view === "settings" && <SettingsView />}
            </>
          )}
        </main>
      </div>
      {wizardOpen && <NewApplicationWizard onClose={() => setWizardOpen(false)} />}
      {loading && <div className="loading-line" />}
      {(error || notice) && (
        <button className={`toast ${error ? "error" : "success"}`} onClick={clearMessage}>
          {error || notice}<X size={16} />
        </button>
      )}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  badge,
  active,
  onClick,
}: {
  icon: typeof Archive;
  label: string;
  badge?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      title={label}
      onClick={onClick}>
      <Icon size={18} />
      <span>{label}</span>
      {badge !== undefined && <em>{badge}</em>}
    </button>
  );
}

function Loading() {
  return <div className="loading-state"><span /><p>Daten werden sicher geladen …</p></div>;
}
