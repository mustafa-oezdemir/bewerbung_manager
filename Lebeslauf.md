# Aufgabe: Lebenslauf 2026 – Grundregeln für die Electron Desktop App

Du arbeitest an einer bereits bestehenden **Electron Desktop App zur Erstellung professioneller deutscher Lebensläufe**.

Diese Aufgabe ist ein Teil eines schrittweise aufgebauten Projekts. Ändere nur die Bereiche, die für diese konkrete Aufgabe erforderlich sind. Bestehende funktionierende Features dürfen nicht unnötig umgebaut oder entfernt werden.

## Ziel

Implementiere beziehungsweise berücksichtige die grundlegenden Regeln für die Erstellung eines **modernen, professionellen, tabellarischen Lebenslaufs nach deutschen Bewerbungsstandards 2026**.

Der Lebenslauf muss:

* professionell,
* übersichtlich,
* modern,
* ATS-freundlich,
* gut lesbar,
* konsistent,
* druckfähig,
* PDF-tauglich

sein.

Die folgenden Regeln bilden die verbindliche Grundlage für alle weiteren Lebenslauf-Funktionen der Anwendung.

---

# 1. Grundstruktur des Lebenslaufs

Der Lebenslauf wird grundsätzlich als **tabellarischer Lebenslauf** aufgebaut.

Die einzelnen Stationen werden **antichronologisch** dargestellt:

> Aktuellste Station zuerst, ältere Stationen danach.

Typische Bereiche sind beispielsweise:

* Persönliche Daten
* Berufserfahrung
* Ausbildung
* Weiterbildung
* Projekte
* Fachkenntnisse
* Technologien
* Sprachkenntnisse
* Zertifikate
* Zusatzkenntnisse
* Interessen / Hobbys

Die konkrete Reihenfolge darf später abhängig vom Profil angepasst werden.

Keine unnötigen Bereiche erzeugen, wenn dafür keine Daten vorhanden sind.

---

# 2. Zeitangaben

Zeiträume müssen einheitlich dargestellt werden.

Bevorzugtes Format:

```text
MM/JJJJ – MM/JJJJ
```

Beispiel:

```text
03/2022 – 08/2025
```

Bei aktuellen Tätigkeiten:

```text
03/2022 – heute
```

Innerhalb eines Lebenslaufs darf das Datumsformat nicht wechseln.

---

# 3. Lücken im Lebenslauf

Zeitliche Unterbrechungen dürfen nicht automatisch als Fehler behandelt werden.

Regel:

* 1–2 Monate Unterbrechung → normalerweise keine problematische Lücke
* ab mehr als 3 Monaten → als mögliche Lebenslauflücke erkennen

Die Anwendung darf **niemals selbstständig einen Grund für eine Lücke erfinden**.

Wenn eine längere Lücke erkannt wird, soll sie lediglich darauf hinweisen, dass der Zeitraum eventuell erklärt werden sollte.

Mögliche Erklärungen dürfen nur verwendet werden, wenn sie vom Benutzer tatsächlich angegeben wurden.

Beispiele:

* berufliche Orientierung
* Arbeitssuche
* Weiterbildung
* private Projekte
* Pflege von Angehörigen
* Sprachkurs

Keine Vermutungen erzeugen.

---

# 4. Inhalt einer Station

Berufliche Stationen sollen möglichst kompakt und aussagekräftig aufgebaut sein.

Wo sinnvoll:

```text
Position
Unternehmen | Ort
MM/JJJJ – MM/JJJJ

• Aufgabe / Verantwortungsbereich
• eingesetzte Technologien
• konkrete Tätigkeit
• messbares Ergebnis
```

Bevorzuge Stichpunkte gegenüber langen Fließtexten.

Wenn konkrete Zahlen, Ergebnisse oder Erfolge vom Benutzer angegeben wurden, können diese hervorgehoben werden.

Beispiele:

```text
• Entwicklung einer REST-API mit Go und PostgreSQL
• Implementierung automatisierter Unit- und Integrationstests
• Reduzierung manueller Verarbeitungsschritte um 30 %
```

Keine Zahlen, Erfolge oder Tätigkeiten erfinden.

---

# 5. Inhaltsqualität

Alle Lebenslaufdaten müssen:

* relevant,
* nachvollziehbar,
* präzise,
* konsistent,
* wahrheitsgemäß

sein.

Vermeide:

* unnötig lange Beschreibungen
* Wiederholungen
* übertriebene Selbstdarstellung
* unbelegte Behauptungen
* erfundene Erfahrungen
* erfundene Kenntnisse
* erfundene Zahlen
* kryptische Berufsbezeichnungen

Wenn eine Berufsbezeichnung unverständlich ist, soll eine verständliche Bezeichnung bevorzugt werden, ohne den tatsächlichen beruflichen Inhalt zu verfälschen.

---

# 6. Seitenumfang

Der Lebenslauf darf grundsätzlich maximal:

```text
3 DIN-A4-Seiten
```

umfassen.

Orientierung:

### Berufseinsteiger / Junior

Bevorzugt:

```text
1 Seite
```

Falls relevante Projekte, Ausbildung und Kenntnisse mehr Platz benötigen:

```text
maximal 2 Seiten
```

### Berufserfahrene Bewerber

Bevorzugt:

```text
1–2 Seiten
```

Nur bei umfangreicher relevanter Berufserfahrung:

```text
maximal 3 Seiten
```

Die Anwendung soll unnötigen Inhalt reduzieren, bevor Schriftgröße oder Lesbarkeit geopfert werden.

---

# 7. Seitenlayout

Orientiere dich an professionellen deutschen Bewerbungsstandards und DIN-5008-Prinzipien.

Als Ausgangswerte verwenden:

```text
Oben:   4,5 cm
Unten:  2,5 cm
Links:  2,5 cm
Rechts: 2,0 cm
```

Diese Werte müssen technisch so umgesetzt werden, dass der Lebenslauf weiterhin modern und optisch ausgewogen bleibt.

Wenn das konkrete Lebenslaufdesign begründet geringfügig davon abweicht, muss:

* ausreichend Weißraum vorhanden sein,
* nichts abgeschnitten werden,
* PDF-Export korrekt funktionieren,
* DIN-A4-Druck problemlos möglich sein.

---

# 8. Zeilenabstand

Zulässiger Bereich:

```text
1.0 – 1.5
```

Bevorzugt:

```text
1.15
```

Der Lebenslauf darf weder gedrängt noch unnötig weit auseinandergezogen wirken.

---

# 9. Schriftarten

Maximal:

```text
2 Schriftarten
```

verwenden.

Geeignete Schriftarten für Fließtext:

* Roboto
* Arial
* Helvetica
* Calibri
* Georgia
* Times New Roman

Geeignete Überschriftenschriften:

* Arial
* Helvetica
* Calibri
* Roboto

Bevorzuge für die Desktop-Anwendung moderne, sehr gut lesbare Schriftarten.

Keine dekorativen oder unseriösen Fonts verwenden.

---

# 10. Schriftgrößen

Orientierung:

### Überschriften

```text
13–15 pt
```

### Fließtext

```text
11–12 pt
```

Kleinere Schrift darf nicht als primäre Methode verwendet werden, um zu viel Inhalt auf eine Seite zu pressen.

Lesbarkeit hat Priorität.

---

# 11. Überschriften

Abschnittsüberschriften müssen:

* visuell klar erkennbar,
* konsistent,
* gut voneinander unterscheidbar

sein.

Beispiele:

```text
BERUFSERFAHRUNG

AUSBILDUNG

PROJEKTE

KENNTNISSE

SPRACHEN
```

oder eine moderne Variante mit normaler Groß-/Kleinschreibung.

Innerhalb eines Templates muss jedoch immer dieselbe Darstellungslogik verwendet werden.

---

# 12. Hervorhebungen

Fett- und Kursivschrift sparsam und einheitlich verwenden.

Beispielsweise:

* Position → fett
* Unternehmen → normal oder leicht hervorgehoben
* Datum → konsistent
* wichtige Technologie → nur bei echtem Mehrwert hervorheben

Keine zufälligen Hervorhebungen.

Keine übermäßige Verwendung von:

```text
BOLD
ITALIC
UNDERLINE
```

---

# 13. Farben

Für einen professionellen Lebenslauf:

```text
maximal eine Akzentfarbe
```

zusätzlich zu neutralen Textfarben verwenden.

Geeignet sind beispielsweise dezente:

* Blau
* Dunkelblau
* Grau
* Grün
* Unternehmensfarben

Keine:

* Neonfarben
* großen Farbflächen
* starken Verläufe
* übermäßig bunten Designs

verwenden.

Der Lebenslauf muss auch in Schwarz-Weiß gut lesbar bleiben.

---

# 14. ATS-Kompatibilität

Der Lebenslauf muss möglichst gut von **Applicant Tracking Systems (ATS)** verarbeitet werden können.

Deshalb:

* semantisch klare Struktur verwenden
* echte Texte statt Textbilder verwenden
* relevante Überschriften eindeutig benennen
* keine wichtigen Daten ausschließlich über Icons darstellen
* keine wichtigen Informationen als Hintergrundgrafik speichern
* keine komplizierten Tabellenkonstruktionen für Kerninformationen verwenden
* keine unnötigen dekorativen Elemente verwenden
* PDF-Text muss auswählbar und durchsuchbar bleiben

Icons dürfen nur ergänzend eingesetzt werden.

Beispiel:

Nicht nur:

```text
📞
```

sondern:

```text
Telefon: +49 ...
```

oder eine semantisch gleichwertige technische Umsetzung.

---

# 15. Bewerbungsfoto

Ein Bewerbungsfoto darf optional unterstützt werden.

Es ist:

```text
optional
```

und darf niemals zwingend erforderlich sein.

Wenn ein Foto verwendet wird:

* professionelles Format
* gute Auflösung
* saubere Positionierung
* kein Verzerren
* korrektes Seitenverhältnis
* keine unseriösen Filter

Die Anwendung muss auch einen vollständig professionellen Lebenslauf **ohne Foto** erzeugen können.

---

# 16. Persönliche Daten

Nur relevante Informationen verwenden.

Keine unnötigen Angaben zu:

* Eltern
* Geschwistern
* familiären Verhältnissen

automatisch aufnehmen.

Persönliche Daten müssen vom Benutzer kontrolliert werden.

Keine privaten Angaben automatisch ergänzen oder vermuten.

---

# 17. Kenntnisse

Kenntnisse müssen realistisch angegeben werden.

Keine Kenntnisse hochstufen oder übertreiben.

Beispiele:

```text
Deutsch – B2
Englisch – B1
Türkisch – Muttersprache
```

oder:

```text
Go – gute Kenntnisse
PostgreSQL – gute Kenntnisse
Docker – Grundkenntnisse
```

Nur verwenden, wenn die Angaben vom Benutzer stammen.

Keine automatische Behauptung von:

```text
Experte
fließend
verhandlungssicher
Senior
```

ohne entsprechende Benutzerdaten.

---

# 18. Hobbys und Interessen

Wenn Hobbys verwendet werden:

```text
2–4 relevante Interessen
```

bevorzugen.

Sie sollen idealerweise etwas über Persönlichkeit oder Soft Skills aussagen.

Keine riskanten oder möglicherweise negativ wirkenden Hobbys automatisch empfehlen.

Hobbys sind optional.

Bei Platzmangel sind sie weniger wichtig als:

* Berufserfahrung
* Ausbildung
* Projekte
* relevante Kenntnisse.

---

# 19. Rechtschreibung

Vor der finalen Ausgabe muss der Lebenslauf auf:

* Rechtschreibung
* Grammatik
* Zeichensetzung
* Datumsformat
* Groß-/Kleinschreibung
* konsistente Begriffe

geprüft werden.

Besonders deutsche Sonderzeichen korrekt behandeln:

```text
ä
ö
ü
Ä
Ö
Ü
ß
```

UTF-8 muss über die komplette Anwendung hinweg korrekt funktionieren.

---

# 20. Typische Fehler vermeiden

Die Anwendung darf keine Lebenslaufgestaltung erzeugen, die folgende Probleme enthält:

## Inhalt

* Eltern oder Geschwister ohne relevanten Grund
* kryptische Berufsbezeichnungen
* falsche chronologische Reihenfolge
* übertriebene Kenntnisse
* erfundene Erfahrungen
* irrelevante Informationen
* unnötig lange Texte

## Layout

* chaotische Struktur
* überladenes Design
* veraltetes Design
* zu viel Text
* schlechte Lesbarkeit
* inkonsistente Abstände
* inkonsistente Schriftgrößen
* zu viele Farben
* mehr als drei Seiten
* Elemente außerhalb der DIN-A4-Druckfläche

---

# 21. Qualitätsprüfung

Vor der finalen Ausgabe muss intern geprüft werden:

* Ist der berufliche Werdegang logisch aufgebaut?
* Sind Stationen antichronologisch sortiert?
* Sind Datumsangaben einheitlich?
* Gibt es ungeklärte Zeiträume von mehr als drei Monaten?
* Enthalten relevante Stationen Tätigkeiten oder Ergebnisse?
* Sind Zusatzkenntnisse für den Lebenslauf relevant?
* Ist die Gestaltung konsistent?
* Ist die Schrift gut lesbar?
* Ist der Lebenslauf ATS-freundlich?
* Ist der Lebenslauf DIN-A4-tauglich?
* Funktioniert der PDF-Export?
* Gibt es Rechtschreibfehler?
* Gibt es erfundene oder nicht belegte Angaben?
* Bleibt der Lebenslauf innerhalb des vorgesehenen Seitenumfangs?

---

# 22. Technische Umsetzung im bestehenden Electron-Projekt

Arbeite innerhalb der vorhandenen Projektarchitektur.

Bevor du Änderungen machst:

1. Analysiere die vorhandene Projektstruktur.
2. Identifiziere die relevanten Komponenten, Views, Styles, Models und Services.
3. Verwende bestehende Architektur- und Naming-Konventionen.
4. Vermeide unnötige neue Dependencies.
5. Vermeide doppelte Logik.
6. Zerlege größere Funktionen in nachvollziehbare Komponenten.
7. Halte UI, Datenmodell und Business-Logik sauber getrennt.
8. Bestehende funktionierende Funktionen dürfen nicht entfernt werden.

Erstelle keine zweite parallele Implementierung, wenn bereits eine passende Struktur existiert.

---

# 23. Datenintegrität

Zentrale Regel:

> Keine Lebenslaufdaten erfinden.

Wenn Informationen fehlen:

* Feld leer lassen,
* optional kennzeichnen,
* Benutzer darauf hinweisen,
* oder Eingabe ermöglichen.

Niemals selbstständig ergänzen:

* Arbeitgeber
* Positionen
* Beschäftigungszeiten
* Abschlüsse
* Zertifikate
* Sprachlevel
* Technologien
* Projekte
* Erfolge
* Zahlen
* Adressen
* Kontaktdaten.

---

# 24. UX-Prinzip

Die Desktop-App soll den Benutzer beim Erstellen des Lebenslaufs unterstützen, ohne ihm die Kontrolle über seine Daten zu nehmen.

Bevorzuge:

```text
Eingabe → Vorschau → Validierung → Korrektur → Export
```

Der Benutzer muss jederzeit erkennen können:

* welche Daten gespeichert sind,
* welcher Lebenslaufabschnitt daraus entsteht,
* welche Warnungen existieren,
* wie das finale Dokument aussieht.

Warnungen dürfen den Benutzer informieren, aber keine unbelegten Inhalte automatisch hinzufügen.

---

# 25. Wichtig für diese Aufgabe

Dies ist die **Grundlage für die folgenden Entwicklungsschritte**.

Implementiere deshalb keine zukünftigen Features auf Verdacht.

Konzentriere dich auf die oben definierten Lebenslaufregeln und integriere sie sauber in die bestehende Architektur.

Wenn im bestehenden Projekt bereits vergleichbare Regeln oder Funktionen vorhanden sind:

* wiederverwenden,
* vereinheitlichen,
* verbessern,

statt sie doppelt zu implementieren.

Behalte die bestehende Electron-Anwendung funktionsfähig und vermeide unnötige Änderungen außerhalb des aktuellen Aufgabenbereichs.

# Aufgabe: Lebenslauf 2026 – Bereiche 2 bis 9 implementieren

Du arbeitest an einer bereits bestehenden **Electron Desktop App zur Erstellung professioneller deutscher Lebensläufe**.

Die grundlegenden Lebenslauf-Regeln wurden bereits definiert und müssen weiterhin vollständig gelten. Bestehende funktionierende Komponenten, Datenmodelle, Preview-Funktionen und Export-Funktionen dürfen nicht unnötig ersetzt oder neu aufgebaut werden.

Implementiere in diesem Schritt ausschließlich die folgenden Lebenslaufbereiche:

1. Persönliche Daten
2. Bewerbungsfoto
3. Kurzprofil
4. Beruflicher Werdegang
5. Bildungsweg
6. Besondere Kenntnisse
7. Interessen und Hobbys
8. Ort, Datum und Unterschrift

Die Anwendung soll nach dem Prinzip arbeiten:

```text
Eingabe → Datenmodell → Validierung → Live-Vorschau → PDF-Export
```

Alle eingegebenen Informationen müssen vollständig vom Benutzer kontrollierbar bleiben.

> Niemals persönliche, berufliche oder fachliche Informationen automatisch erfinden.

---

# 1. Vor Beginn

Analysiere zuerst die bestehende Projektstruktur.

Prüfe insbesondere vorhandene:

* React-/Frontend-Komponenten
* Electron-Struktur
* Formulare
* State-Verwaltung
* Types / Interfaces
* Datenmodelle
* Validation
* Preview
* Templates
* PDF-Export
* Dateiverwaltung
* Bildverarbeitung
* Styling
* Persistenz

Verwende vorhandene Strukturen weiter.

Keine zweite parallele Lebenslauf-Architektur erstellen.

Keine funktionierenden Features entfernen.

Keine unnötigen Dependencies installieren.

---

# 2. Persönliche Daten

Erstelle beziehungsweise erweitere den Bereich:

```text
Persönliche Daten
```

Unterstützte Felder:

## Pflicht beziehungsweise zentrale Kontaktdaten

* Vollständiger Name
* Anschrift
* Telefonnummer
* E-Mail-Adresse

## Optionale Angaben

* LinkedIn
* GitHub
* Portfolio
* persönliche Website
* sonstiges professionelles Online-Profil
* Geburtsdatum
* Geburtsort
* Staatsangehörigkeit
* Familienstand
* Kinder

Optionale Angaben dürfen nicht zwingend verlangt werden.

---

## Telefonnummer

Die Eingabe muss internationale Telefonnummern unterstützen.

Beispiel:

```text
(+49) 170 1234567
```

Die Anwendung darf Telefonnummern nicht auf ein ausschließlich deutsches Format beschränken.

---

## E-Mail

Für E-Mail-Adressen mindestens eine grundlegende Formatvalidierung implementieren.

Ungültige Eingaben sollen als Hinweis im Formular erscheinen.

Die Anwendung darf die Eingabe nicht eigenständig durch eine andere Adresse ersetzen.

---

## Online-Profile

Online-Profile müssen dynamisch verwaltet werden können.

Der Benutzer soll beispielsweise hinzufügen können:

```text
LinkedIn
GitHub
Portfolio
Website
```

Jeder Eintrag benötigt mindestens:

```text
Typ / Bezeichnung
URL
```

Es muss möglich sein:

* Eintrag hinzuzufügen
* Eintrag zu bearbeiten
* Eintrag zu löschen
* Reihenfolge zu verändern, falls die bestehende UI dies unterstützt

Leere Profile nicht im Lebenslauf rendern.

---

# 3. Bewerbungsfoto

Das Bewerbungsfoto ist:

```text
OPTIONAL
```

Der Lebenslauf muss auch ohne Foto vollständig funktionieren.

Unterstütze das Hochladen eines Bewerbungsfotos aus einer lokalen Datei.

Geeignete Bildformate können entsprechend der bestehenden technischen Architektur unterstützt werden, beispielsweise:

```text
JPG
JPEG
PNG
WEBP
```

---

## Anforderungen

Das Foto darf:

* nicht verzerrt werden
* nicht gestaucht werden
* nicht außerhalb des vorgesehenen Bereichs laufen

Seitenverhältnis erhalten.

Geeignete Darstellung beispielsweise über:

```css
object-fit: cover;
```

sofern dies zur vorhandenen Architektur passt.

Der Benutzer muss das Foto wieder:

```text
ändern
entfernen
```

können.

---

## Layout

Das Foto darf nicht so dominant dargestellt werden, dass Kontaktinformationen oder Berufserfahrung verdrängt werden.

Es soll sich professionell in das jeweilige Template integrieren.

Keine automatische Bildbearbeitung vornehmen, die das tatsächliche Erscheinungsbild der Person verändert.

---

# 4. Kurzprofil

Implementiere einen optionalen Bereich:

```text
Über mich
```

alternativ intern:

```text
Kurzprofil
```

Dieser Bereich dient einer kurzen Zusammenfassung wichtiger:

* Qualifikationen
* Schwerpunkte
* Stärken
* beruflichen Ziele

---

## Eingabe

Der Benutzer soll den Text selbst eingeben können.

Beispielstruktur:

```text
Kreative BWL-Studentin mit Schwerpunkt Marketing. Begeistert von digitalem
Marketing und Conversion-Rates. Analytisches Denken, Kommunikationsstärke
und hohe Affinität zu Social Media.
```

Das Beispiel ist ausschließlich eine Strukturreferenz.

Nicht automatisch in echte Lebensläufe übernehmen.

---

## Regeln

Das Kurzprofil muss:

* optional sein
* kompakt bleiben
* keinen unnötig langen Fließtext erzeugen
* in der Vorschau vollständig editierbar sein

Wenn kein Kurzprofil vorhanden ist:

```text
Bereich nicht rendern
```

Keine Qualifikationen oder Stärken erfinden.

---

# 5. Beruflicher Werdegang

Der Bereich:

```text
Beruflicher Werdegang
```

ist einer der wichtigsten Bestandteile des Lebenslaufs.

Die Darstellung soll sich funktional an folgendem Prinzip orientieren:

```text
LINKS:
MM/JJJJ – MM/JJJJ

RECHTS:
Position / Jobtitel
Unternehmen, Ort

• Tätigkeit
• Projekt
• Erfolg
```

Die bereitgestellten Referenzbilder dienen als visuelle und strukturelle Orientierung.

Nicht blind Pixel für Pixel kopieren.

Die bestehende Design-Sprache der Anwendung beibehalten.

---

# 5.1 Datenmodell einer Station

Eine berufliche Station soll mindestens folgende Informationen unterstützen:

```text
Startdatum
Enddatum
Aktuell beschäftigt
Berufsbezeichnung
Unternehmen
Ort
Rechtsform optional
Beschreibung optional
Teamgröße optional
Aufgaben
Projekte
Erfolge
```

Aufgaben, Projekte und Erfolge sollen dynamische Listen sein.

---

# 5.2 Datumsformat

Verbindliches Darstellungsformat:

```text
MM/JJJJ – MM/JJJJ
```

Beispiel:

```text
05/2024 – 09/2025
```

Bei laufender Tätigkeit:

```text
05/2024 – heute
```

Optional kann die Eingabe intern über getrennte Monats- und Jahreswerte erfolgen.

Die Darstellung muss jedoch konsistent sein.

Einstellige Monate mit führender Null:

```text
01/2026
02/2026
...
09/2026
```

nicht:

```text
1/2026
2/2026
```

---

# 5.3 Sortierung

Berufliche Stationen grundsätzlich:

```text
antichronologisch
```

darstellen.

Also:

```text
neueste Station zuerst
älteste Station zuletzt
```

Die Sortierung darf gespeicherte Daten nicht zerstören.

---

# 5.4 Berufsbezeichnung

Die Berufsbezeichnung visuell hervorheben.

Beispiel:

```text
Key Account Managerin
```

beziehungsweise:

```text
Softwareentwickler
```

Ungewöhnliche Jobtitel dürfen zusätzlich eine verständliche Bezeichnung erhalten.

Beispiel:

```text
Customer Success Ninja (Customer Success Manager)
```

Eine solche Übersetzung darf jedoch nur erfolgen, wenn der Benutzer sie selbst eingibt oder bestätigt.

---

# 5.5 Arbeitgeber

Unterhalb beziehungsweise passend zur Position darstellen:

```text
Beispiel GmbH, Musterstadt
```

Optional können zusätzliche Unternehmensinformationen unterstützt werden:

```text
Mitarbeiterzahl
Jahresumsatz
Branche
```

Diese Daten niemals automatisch erfinden.

---

# 5.6 Aufgaben, Projekte und Erfolge

Pro beruflicher Station maximal ungefähr:

```text
6 relevante Stichpunkte
```

in der finalen Darstellung bevorzugen.

Der Editor darf gegebenenfalls mehr Eingaben erlauben, aber bei übermäßig vielen Punkten einen UX-Hinweis anzeigen.

Dynamische Listen ermöglichen:

```text
+ Tätigkeit hinzufügen
+ Projekt hinzufügen
+ Erfolg hinzufügen
```

sowie:

```text
bearbeiten
löschen
sortieren
```

---

## Zahlen und Erfolge

Zahlen sind besonders aussagekräftig.

Beispiel:

```text
• Erstellung von Marktanalysen
• 8 % Neukunden gewonnen
• Umsatzsteigerung um 14 %
```

Zahlen ausschließlich verwenden, wenn sie vom Benutzer eingegeben wurden.

Niemals automatisch Erfolgszahlen generieren.

---

# 5.7 Interner Jobwechsel

Unterstütze einen Arbeitgeber mit mehreren Positionen.

Beispielstruktur:

```text
05/2024 – 09/2025
Beispiel GmbH, Musterstadt

01/2025 – 09/2025
Position / Jobtitel

• Tätigkeit
• Projekt
• Erfolg

05/2024 – 12/2024
Position / Jobtitel

• Tätigkeit
• Projekt
• Erfolg
```

Hierbei gibt es:

```text
einen Arbeitgeber
+
mehrere Positionen innerhalb dieses Arbeitgebers
```

Das Datenmodell soll dies sauber abbilden.

Nicht dieselbe Firma unnötig mehrfach als völlig unabhängige Arbeitgeberstation speichern, wenn es sich um interne Positionswechsel handelt.

---

# 5.8 Elternzeit bei bestehendem Beschäftigungsverhältnis

Elternzeit muss unterstützt werden.

Wenn während eines bestehenden Beschäftigungsverhältnisses Elternzeit genommen wurde, soll diese als Ergänzung innerhalb der Station dargestellt werden können.

Beispiel:

```text
05/2024 – heute
Key Account Managerin
Beispiel GmbH, Musterstadt

Besondere Projekte:
• Erstellen von Marktanalysen
• Erfolge: 8 % Neukunden, 14 % Umsatzplus

Elternzeit seit 04/2025
• Unterstützung bei der Neukundenakquise
  (Teilzeit: 10 Stunden pro Woche)
```

Alle Inhalte müssen vom Benutzer stammen.

---

# 5.9 Elternzeit ohne bestehendes Beschäftigungsverhältnis

Wenn kein Beschäftigungsverhältnis besteht, soll eine eigenständige Station möglich sein:

```text
Familienphase
```

oder:

```text
Elternzeit
```

mit Zeitraum.

Optional können relevante Aktivitäten ergänzt werden.

Beispiel:

```text
04/2024 – 08/2025
Familienphase

• Weiterbildung ...
• privates Projekt ...
```

Keine Aktivitäten automatisch erfinden.

---

# 6. Bildungsweg

Implementiere beziehungsweise erweitere:

```text
Bildungsweg
```

Unterstützte Typen:

* Schule
* Berufsausbildung
* Studium
* Weiterbildung
* Auslandssemester

---

## Daten einer Bildungsstation

Mindestens:

```text
Startdatum
Enddatum
Bezeichnung
Institution
Ort
Abschluss
Studiengang / Fachrichtung
Note optional
Beschreibung optional
```

Nur relevante Felder anzeigen.

---

## Darstellung

Antichronologische Reihenfolge verwenden.

Beispiel:

```text
10/2019 – 09/2023
Bachelor of Science – Informatik
Universität Beispielstadt
Abschlussnote: 1,9
```

---

# 6.1 Abgebrochene Ausbildung oder Studium

Auch nicht abgeschlossene Bildungsstationen müssen einen Zeitraum besitzen.

Wenn keine Abschlussqualifikation erreicht wurde:

* keinen Abschluss erfinden
* keine Abschlussnote erfinden
* keinen akademischen Titel hinzufügen

Optional kann ein Status unterstützt werden:

```text
abgeschlossen
laufend
ohne Abschluss
```

Die Wortwahl im finalen Lebenslauf bleibt unter Kontrolle des Benutzers.

---

# 6.2 Auslandserfahrung

Ein Auslandssemester beziehungsweise Bildungsaufenthalt soll beispielsweise erfassen können:

```text
Land
Stadt
Universität / Institution
Zeitraum
Studienbereich
```

Keine zusätzlichen Aussagen wie:

```text
hohe interkulturelle Kompetenz
```

automatisch erzeugen.

---

# 6.3 Grundschule

Grundschule standardmäßig nicht als relevante Lebenslaufstation empfehlen.

Sie kann jedoch technisch unterstützt werden, wenn der Benutzer beispielsweise einen:

```text
Schüler-Lebenslauf
```

erstellt.

Nicht automatisch entfernen, wenn der Benutzer die Information ausdrücklich eingetragen hat.

---

# 7. Praktika

Ermögliche optional einen eigenen Bereich:

```text
Praktika
```

Alternativ darf dieser Bereich entsprechend der vorhandenen Architektur in den beruflichen Werdegang integriert werden.

Eine Praktikumsstation soll mindestens enthalten:

```text
Zeitraum
Position / Praktikum
Unternehmen
Ort
Aufgaben
Projekte
Ergebnisse optional
```

Besonders bei:

```text
Schülern
Berufseinsteigern
Junior-Bewerbern
```

sind relevante Praktika wichtig.

Die Software soll jedoch nicht entscheiden, welche Praktika inhaltlich wahr oder relevant sind.

---

# 8. Besondere Kenntnisse

Implementiere einen modularen Bereich:

```text
Besondere Kenntnisse
```

Unterstütze insbesondere:

* Sprachkenntnisse
* IT-Kenntnisse
* Fortbildungen
* Weiterbildungen
* Auslandserfahrungen
* Stipendien
* Auszeichnungen
* Publikationen
* eigene Projekte
* Führerschein

---

# 8.1 Anzahl

Für einen fokussierten Lebenslauf vorzugsweise:

```text
5–7 besonders relevante Kenntnisse
```

darstellen.

Dies ist eine Empfehlung und keine harte Datenbegrenzung.

Bei mehr Einträgen darf die App einen Hinweis anzeigen.

Keine Benutzerdaten automatisch löschen.

---

# 8.2 Sprachkenntnisse

Für Sprache mindestens:

```text
Sprache
Niveau
```

unterstützen.

Beispiele:

```text
Deutsch – B2
Englisch – B1
Türkisch – Muttersprache
```

Alternativ vom Benutzer gewählte Beschreibungen:

```text
Grundkenntnisse
gute Kenntnisse
fließend
verhandlungssicher
Muttersprache
```

Keine Einstufung automatisch hochsetzen.

Wenn der Benutzer:

```text
B1
```

eingibt, darf daraus nicht:

```text
fließend
```

werden.

---

# 8.3 IT-Kenntnisse

IT-Kenntnisse sollen als strukturierte Einträge gespeichert werden.

Beispiel:

```text
Go – gute Kenntnisse
Docker – gute Kenntnisse
PostgreSQL – Grundkenntnisse
Git – gute Kenntnisse
```

Mögliche Felder:

```text
Technologie / Tool
Kenntnisstand
optional Kategorie
```

Keine Skill-Werte erfinden.

---

# 8.4 Zertifikate und Weiterbildungen

Unterstütze mindestens:

```text
Bezeichnung
Anbieter / Institution
Datum
optional Zertifikats-ID
optional URL
```

Nur vom Benutzer eingetragene Zertifikate verwenden.

---

# 8.5 Führerschein

Führerschein optional unterstützen.

Beispiel:

```text
Führerschein Klasse B
```

Mehrere Klassen müssen möglich sein.

Beispiel:

```text
B
BE
C1
```

Die Angabe darf vollständig weggelassen werden.

---

# 9. Interessen und Hobbys

Implementiere einen optionalen Bereich:

```text
Interessen und Hobbys
```

Bevorzugte Anzahl:

```text
maximal 3–4
```

Dies soll als UX-Empfehlung und nicht als harte technische Begrenzung behandelt werden.

---

## Datenstruktur

Ein Hobby beziehungsweise Interesse kann beispielsweise enthalten:

```text
Bezeichnung
optionale kurze Beschreibung
```

Beispiele:

```text
Fußball – Mannschaftssport
Open-Source-Projekte
Fotografie
Ehrenamt
```

Der Benutzer entscheidet selbst, was aufgenommen wird.

Keine Hobbys automatisch hinzufügen.

---

## Ehrenamt

Ehrenamt kann entweder:

```text
unter Interessen
```

oder als:

```text
eigener Abschnitt
```

unterstützt werden.

Orientiere dich an der bestehenden Architektur.

---

# 10. Ort, Datum und Unterschrift

Der Lebenslauf soll optional mit folgendem Bereich abschließen:

```text
Ort, Datum
Unterschrift
```

Beispiel:

```text
Marburg, 23.08.2026
```

Die Unterschrift ist optional.

---

# 10.1 Ort

Ort als editierbares Textfeld.

Nicht automatisch aus Adresse oder GPS ableiten.

---

# 10.2 Datum

Das Datum muss editierbar sein.

Optional darf eine Funktion angeboten werden:

```text
Aktuelles Datum verwenden
```

Das gespeicherte Datum darf jedoch nicht bei jedem Programmstart unbemerkt verändert werden.

Der Benutzer muss die Kontrolle behalten.

---

# 10.3 Unterschrift

Unterstütze optional eine digitale Unterschrift als Bild.

Geeignete Formate entsprechend der bestehenden Bildverarbeitung:

```text
PNG
JPG
JPEG
WEBP
```

Besonders transparente PNG-Dateien sollen sauber dargestellt werden können.

Die Unterschrift muss:

* proportional dargestellt werden
* skalierbar sein
* entfernbar sein
* austauschbar sein

Keine automatische Unterschrift generieren.

---

# 11. Dynamische Abschnitte

Die genannten Bereiche müssen möglichst modular sein.

Für optionale Bereiche gilt:

```text
keine Daten vorhanden
→ Abschnitt nicht im finalen Lebenslauf anzeigen
```

Beispiele:

```text
kein Foto
→ kein leerer Fotoplatz

keine Hobbys
→ keine Überschrift „Hobbys“

kein Kurzprofil
→ kein leerer Kurzprofilbereich

keine Unterschrift
→ kein leerer Unterschriftsrahmen
```

---

# 12. Live-Vorschau

Jede Änderung im Editor soll entsprechend der bestehenden Architektur möglichst direkt in der Lebenslauf-Vorschau sichtbar sein.

Besonders prüfen:

* lange Namen
* lange Berufsbezeichnungen
* lange Firmennamen
* viele Stichpunkte
* mehrere Positionen bei demselben Arbeitgeber
* Elternzeit
* lange URLs
* mehrere Sprachkenntnisse
* Foto
* Unterschrift

Die Vorschau darf nicht durch einzelne lange Inhalte zerstört werden.

---

# 13. PDF-Export

Alle neu implementierten Bereiche müssen ebenfalls korrekt im bestehenden PDF-Export funktionieren.

Prüfe insbesondere:

* DIN-A4
* Seitenumbrüche
* Schriftarten
* deutsche Sonderzeichen
* Bilder
* Foto
* Unterschrift
* URLs
* Stichpunkte
* lange Texte
* mehrere berufliche Stationen
* mehrere Seiten

Text muss nach Möglichkeit:

```text
markierbar
durchsuchbar
ATS-lesbar
```

bleiben.

Keine vollständigen Lebenslaufseiten als Rasterbild exportieren.

---

# 14. Seitenumbrüche

Verhindere nach Möglichkeit unsaubere Trennungen.

Beispielsweise soll nicht:

```text
Berufsbezeichnung
```

auf Seite 1 stehen und die zugehörige Firma beziehungsweise der komplette Inhalt erst auf Seite 2 beginnen.

Eine Station soll nach Möglichkeit als logische Einheit behandelt werden.

Bei umfangreichen Stationen darf ein sinnvoller Seitenumbruch erfolgen.

---

# 15. Validierung

Implementiere benutzerfreundliche Validierung.

Unterscheide zwischen:

```text
Fehler
Warnung
Hinweis
```

Beispiele:

### Fehler

```text
ungültige E-Mail-Struktur
ungültiges Datumsformat
Enddatum liegt vor Startdatum
```

### Warnung

```text
mehr als 6 Stichpunkte
sehr langer Kurzprofiltext
ungeklärter Zeitraum von mehr als 3 Monaten
sehr viele Kenntnisse
```

### Hinweis

```text
LinkedIn-Profil optional
Bewerbungsfoto optional
Unterschrift optional
```

Warnungen dürfen den PDF-Export nicht unnötig blockieren.

---

# 16. Kein Erfinden von Daten

Diese Regel ist zwingend:

```text
NO HALLUCINATED CV DATA
```

Die Anwendung darf niemals automatisch erfinden:

* Namen
* Anschrift
* Telefonnummer
* E-Mail
* LinkedIn
* GitHub
* Geburtsdatum
* Familienstand
* Unternehmen
* Firmenstandort
* Rechtsform
* Jobtitel
* Tätigkeiten
* Projekte
* Teamgröße
* Umsätze
* Erfolge
* Prozentwerte
* Elternzeit
* Ausbildung
* Studienabschluss
* Noten
* Sprachen
* Sprachlevel
* Technologien
* Skill-Level
* Zertifikate
* Führerschein
* Hobbys
* Ort
* Unterschrift

Fehlende Angaben bleiben leer oder werden dem Benutzer als fehlende beziehungsweise optionale Eingabe angezeigt.

---

# 17. UX-Anforderungen

Der Editor muss insbesondere ermöglichen:

```text
Hinzufügen
Bearbeiten
Löschen
Sortieren
Optional ein-/ausblenden
```

wo dies fachlich sinnvoll ist.

Für wiederholbare Daten bevorzugt wiederverwendbare UI-Komponenten verwenden.

Beispiele:

```text
EmploymentEntry
EmploymentPosition
EducationEntry
SkillEntry
LanguageEntry
OnlineProfileEntry
HobbyEntry
```

Die tatsächlichen Namen müssen sich jedoch an den bestehenden Naming-Konventionen des Projekts orientieren.

---

# 18. Datenmodell

Vermeide eine einzige große unstrukturierte Lebenslauf-Komponente.

Die Daten sollen semantisch strukturiert sein.

Sinngemäß:

```text
Resume
├── PersonalData
├── Photo
├── Summary
├── Employment[]
│   └── Positions[]
├── Education[]
├── Internships[]
├── Skills
│   ├── Languages[]
│   ├── ITSkills[]
│   ├── Certifications[]
│   └── DrivingLicenses[]
├── Interests[]
└── Signature
```

Dies ist eine fachliche Orientierung.

Passe das tatsächliche Datenmodell an die bereits vorhandene Architektur an.

Nicht unnötig bestehende Types ersetzen.

---

# 19. Persistenz

Alle neuen Felder müssen mit der bereits bestehenden Speicherlogik kompatibel sein.

Nach:

```text
Speichern → Anwendung schließen → erneut öffnen
```

dürfen keine eingegebenen Daten verloren gehen.

Bei Änderungen des Datenmodells bestehende Lebenslaufdaten soweit möglich rückwärtskompatibel behandeln.

---

# 20. Qualitätsprüfung

Nach der Implementierung gezielt prüfen:

* Persönliche Daten vollständig editierbar
* optionale Angaben funktionieren
* Foto hinzufügen/ändern/löschen
* Kurzprofil ein-/ausblenden
* mehrere Arbeitgeber
* mehrere Positionen bei einem Arbeitgeber
* laufende Beschäftigung
* Elternzeit
* Bildungsstationen
* abgebrochene Ausbildung
* Praktika
* Sprachkenntnisse
* IT-Kenntnisse
* Zertifikate
* Führerschein
* Hobbys
* Ort und Datum
* Unterschrift
* antichronologische Sortierung
* konsistente Datumsformate
* Live-Vorschau
* Speicherung
* Neustart
* PDF-Export
* Mehrseitigkeit
* ATS-lesbarer Text
* keine abgeschnittenen Elemente

---

# 21. Bestehendes Projekt schützen

Während dieser Aufgabe gilt:

* keine komplette Neuimplementierung
* keine unnötige Architekturänderung
* keine Entfernung funktionierender Features
* keine erfundenen Anforderungen
* keine Dummy-Daten dauerhaft in Produktivkomponenten
* keine unnötigen Dependencies
* keine unnötigen Änderungen außerhalb dieses Arbeitsschritts

Bestehende wiederverwendbare Komponenten bevorzugen.

---

# 22. Abschluss

Implementiere ausschließlich die für diese Aufgabe erforderlichen Änderungen.

Nach Abschluss:

1. Fasse kurz zusammen, welche Dateien geändert oder neu erstellt wurden.
2. Beschreibe kurz die implementierten Funktionen.
3. Nenne gegebenenfalls notwendige technische Entscheidungen.
4. Liste offene Punkte nur dann auf, wenn sie tatsächlich noch bestehen.
5. Gib die zum Ausführen beziehungsweise Starten der Electron-App notwendigen CLI-Befehle an, sofern sie sich gegenüber dem bestehenden Projekt geändert haben.

Arbeite auf der vorhandenen Anwendung weiter und behalte die bereits definierten **Lebenslauf-2026-Grundregeln** vollständig bei.

![](file:///C:/Users/musta/AppData/Local/Temp/jg5jwxes.5gq.png)
