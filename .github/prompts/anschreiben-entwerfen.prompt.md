---
name: "Anschreiben entwerfen"
description: "Erstellt ein individuelles deutsches Anschreiben aus Rolle, Unternehmen und Stellenanzeige unter Nutzung des Workspace-Kontexts."
argument-hint: "Rolle, Unternehmen, Stellenanzeige, optionale Schwerpunkte"
agent: "agent"
---

Erstelle ein individuelles deutschsprachiges Anschreiben fuer eine Bewerbung.

Verwende diese Referenzen als festen Workspace-Kontext:

- [lebenslauf.md](../../lebenslauf.md) fuer Profil, Stationen und ATS-taugliche Formulierungen
- [todo.md](../../todo.md) fuer Struktur, Ton und Argumentationslogik des Anschreibens

Nutze die vom Nutzer uebergebenen Angaben als variable Eingaben, insbesondere:

- Zielrolle
- Unternehmen
- Stellenanzeige oder Auszug daraus
- Optionale Prioritaeten wie fachliche Schwerpunkte, Tonalitaet, Motivation oder relevante Erfolge

Arbeite nach diesen Regeln:

- Schreibe originellen Text statt Passagen aus den Referenzdateien zu uebernehmen.
- Nutze deutsche Business-Sprache und eine knappe, praezise Ausdrucksweise.
- Stelle den Bezug zwischen Profil und Stellenanforderungen konkret her.
- Hebe nur Erfahrungen hervor, die fuer die Zielrolle wirklich relevant sind.
- Vermeide generische Floskeln und unbelegte Adjektive.
- Halte das Anschreiben auf etwa eine Seite.
- Wenn wichtige Angaben fehlen, nenne zuerst knapp die fehlenden Informationen und triff keine riskanten Annahmen.

Ausgabeformat:

1. Eine kurze Liste mit den 3 bis 5 staerksten Argumentationslinien fuer diese Bewerbung.
2. Danach das vollstaendige Anschreiben in sauberem Markdown mit einer klaren Anrede, einem ueberzeugenden Hauptteil und einem knappen Schluss.
3. Wenn sinnvoll, schliesse mit einem kurzen Abschnitt "Offene Punkte" fuer fehlende oder unsichere Angaben.
