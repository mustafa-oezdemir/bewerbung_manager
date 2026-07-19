# BewerbungsManager

Lokale Desktop-Anwendung zur Verwaltung deutscher Bewerbungsverfahren und zur
Erstellung eines konsistenten Sets aus Deckblatt, Anschreiben und Lebenslauf.

## Technik

- Electron Main Process für Dateisystem, Dialoge, PDF-Export und Benachrichtigungen
- React + TypeScript (Strict Mode) für die Oberfläche
- Vite für Entwicklung und Build
- Zustand für den zentralen UI-Zustand
- Zod für IPC- und JSON-Validierung
- Tailwind CSS 4 als CSS-Toolchain
- Vitest für Schema- und Validierungstests

## Sicherheitsmodell

- `contextIsolation: true`
- `nodeIntegration: false`
- `sandbox: true`
- ausschließlich freigegebene, typisierte IPC-Methoden im Preload
- keine freien Dateipfade aus dem Renderer
- Dateinamen werden normalisiert und bereinigt
- externe Links sind auf HTTP/HTTPS beschränkt
- Nutzereingaben werden für Dokument-HTML maskiert
- JSON wird in eine temporäre Datei geschrieben, synchronisiert und mit
  Sicherung ersetzt

## Datenablage

Die Anwendung legt ihre Daten unter
`Dokumente/BewerbungsManager/data` an. Für jede Bewerbung entsteht:

```text
Bewerbungen/Firma_YYYYMMDDHHmmss/
├── bewerbung.json
├── Stellenanzeige/
│   ├── stellenanzeige.json
│   └── stellenanzeige.txt
├── Anschreiben/
├── Deckblatt/
├── Lebenslauf/
├── Zeugnisse/
├── Zertifikate/
└── Export/
```

`Settings/workspace.json` ist der zentrale, versionierte Datensatz. Aktive
Bewerbungen, Gespräche und Absagen sind gefilterte Ansichten dieses Datensatzes
und keine separaten Kopien.

## Befehle

```powershell
npm install
npm run dev
npm run typecheck
npm test
npm run build
npm start
npm run dist:win
```

Für eine reine Renderer-Vorschau ohne Electron:

```powershell
$env:VITE_RENDERER_ONLY="1"
npm run dev
```

`npm run dist:win` prüft den Quellcode und erzeugt unter `windows-release/` einen
Windows-Installer, eine portable Ausgabe und `SHA256SUMS.txt`. Die vollständige
Release-Checkliste steht in [RELEASE.md](./RELEASE.md). Öffentliche Builds
sollten vor der Weitergabe mit einem Windows-Code-Signing-Zertifikat signiert
werden.

## Enthaltene Funktionen

- Dashboard mit Statuszahlen, Erfolgsquote, Fristen und fälligen Aufgaben
- zentrale Bewerbungslisten mit Suche und Statusfiltern
- automatische Übergänge für Absage, Gespräch, Zusage und Archiv
- Monatskalender und Agenda
- automatische Termine aus Bewerbungs-, Gesprächs- und Vertragsdaten
- Follow-up nach 7, 10, 14 oder 21 Tagen
- native Desktop-Benachrichtigungen
- Bewerbungswizard mit Validierung
- sechs abgestimmte Dokumentdesigns
- editierbare Anschreiben-, Lebenslauf- und Deckblatttexte
- PDF-Ausgabe einzelner Dokumente oder der Bewerbungsmappe
- sichere PDF-Ablage für Zeugnisse und Zertifikate
- editierbare Dokumentmetadaten, Kategorien und Bewerbungsmappe-Reihenfolge
- Vorschau, Ein-/Ausschluss und sicheres Löschen verwalteter PDF-Kopien
- echte PDF-Zusammenführung in der Reihenfolge Deckblatt, Anschreiben,
  Lebenslauf, Zeugnisse und Zertifikate
- Profile, Theme-Einstellungen und JSON-Sicherung
- tägliche automatische JSON-Sicherungen mit einstellbarer Aufbewahrung
- validierte Wiederherstellung kompletter Sicherungen mit Notfallsicherung
- separater Export und Import der Programmeinstellungen
- lokal zwischengespeicherter Bewerbungswizard mit automatischer Wiederherstellung
- strukturierter Lebenslauf-Editor für Berufserfahrung und Ausbildung
- Drag-and-drop sowie barrierearme Auf/Ab-Sortierung der Stationen
- ein- und ausblendbare Lebenslauf-Abschnitte
- Stellenanzeigen-Matching gegen die tatsächlich hinterlegten Kenntnisse
