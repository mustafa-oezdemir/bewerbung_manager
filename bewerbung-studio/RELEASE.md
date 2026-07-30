# Windows-Release

## Vollständigen Release erstellen

```powershell
npm run dist:win
```

Der Befehl führt Typprüfung, Tests und Produktions-Build aus und erzeugt
anschließend unter `windows-release/`:

- `BewerbungsManager-<Version>-x64-Setup.exe`
- `BewerbungsManager-<Version>-x64-Portable.exe`
- `SHA256SUMS.txt`

## Vor der Weitergabe

- Versionsnummer in `package.json` aktualisieren.
- Typprüfung, Tests und Build müssen ohne Fehler durchlaufen.
- Setup auf einem sauberen Windows-Benutzerkonto installieren.
- Startmenüeintrag und optionalen Desktop-Link prüfen.
- Eine Bewerbung anlegen und die Anwendung schließen.
- Neue Version über die vorhandene Installation installieren.
- Prüfen, dass Daten unter dem konfigurierten `BEWERBUNG_ROOT_PATH` erhalten
  bleiben; Standard ist `D:\bewerbung_mustafa`.
- Eine Migration nur über die bestätigte Funktion in den Einstellungen
  ausführen. Die bisherige Quelle muss nach dem Kopieren unverändert bleiben.
- Portable Ausgabe starten und denselben Datenbestand prüfen.
- PDF-Export und JSON-Wiederherstellung testen.
- SHA-256-Prüfsummen mit den ausgelieferten Dateien veröffentlichen.

## Signierung

Lokale Test-Builds sind nicht signiert. Für einen signierten Release werden
Zertifikat und Passwort ausschließlich für die aktuelle PowerShell-Sitzung
gesetzt:

```powershell
$env:WIN_CSC_LINK = 'C:\sicherer-ordner\codesigning.pfx'
$env:WIN_CSC_KEY_PASSWORD = '<Passwort lokal eingeben>'
npm run dist:win:signed
```

`dist:win:signed` verwendet SHA-256 und einen RFC-3161-Zeitstempel. Der Build
schlägt fehl, wenn keine Signatur erzeugt wurde. Anschließend werden Setup und
Portable-Ausgabe mit `Get-AuthenticodeSignature` geprüft.

Zertifikate, private Schlüssel und Passwörter dürfen nicht in dieses Repository
kopiert oder eingecheckt werden.
