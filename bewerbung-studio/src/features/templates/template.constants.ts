import type {
  TemplateDocumentType,
  TemplateExtension,
  TemplateSource,
} from "./template.types";

export const allowedTemplateExtensions = new Set<TemplateExtension>([
  ".docx",
  ".dotx",
  ".doc",
]);

export const maximumTemplateFileSize = 25 * 1024 * 1024;

export const templateTypeLabels: Record<TemplateDocumentType, string> = {
  anschreiben: "Anschreiben",
  deckblatt: "Deckblatt",
  lebenslauf: "Lebenslauf",
};

export const templateSourceLabels: Record<TemplateSource, string> = {
  "muster-folder": "Musterordner",
  "existing-document": "Eigenes Dokument",
  "uploaded-word-template": "Eigene Word-Vorlage",
  "system-word-template": "System Word-Vorlage",
};

export const defaultTemplateSortOrder = 1_000;

export const wordMusterTemplateConfig = {
  id: "word-muster-anschreiben",
  fileName: "Anschreiben_Muster.docx",
  name: "Word Muster",
  documentType: "anschreiben",
  format: "docx",
  source: "uploaded-word-template",
  sortOrder: 2,
  isSystemTemplate: false,
  supportsPreview: true,
  supportsPlaceholders: true,
  editableInWord: true,
  isProtected: true,
  description:
    "Eigene Word-Vorlage für Anschreiben. Beim Verwenden wird immer eine neue, ausgefüllte Kopie erstellt.",
  tags: ["Word", "DOCX", "Anschreiben"],
} as const;

export const elegantLebenslaufTemplateConfig = {
  id: "word-lebenslauf-elegant",
  fileName: "Elegant_Lebenslauf_Muster.docx",
  atsFileName: "Elegant_Lebenslauf_ATS.docx",
  previewFileName: "Elegant_Lebenslauf_Muster.preview.png",
  name: "Elegant",
  documentType: "lebenslauf",
  format: "docx",
  source: "system-word-template",
  sortOrder: 5,
  category: "elegant",
  layout: "two-column-right-sidebar",
  atsFriendly: true,
  supportsPhoto: true,
  supportsPlaceholders: true,
  supportsPreview: true,
  supportsAtsMode: true,
  editableInWord: true,
  isSystemTemplate: true,
  isProtected: true,
  description:
    "Zweispaltige Word-Lebenslaufvorlage mit breiter Hauptspalte für Berufserfahrung und blauer Seitenleiste für persönliche Highlights.",
  tags: ["Elegant", "Word", "DOCX", "Lebenslauf", "ATS", "Foto"],
  cardHighlights: [
    "Breite Hauptspalte für Berufserfahrung",
    "Blaue Seitenleiste für persönliche Highlights",
  ],
} as const;

export const zeitgenoessischLebenslaufTemplateConfig = {
  id: "word-lebenslauf-zeitgenoessisch",
  fileName: "Zeitgenoessisch_Lebenslauf_Muster.docx",
  atsFileName: "Zeitgenoessisch_Lebenslauf_ATS.docx",
  previewFileName: "Zeitgenoessisch_Lebenslauf_Muster.preview.png",
  name: "Zeitgenössisch",
  documentType: "lebenslauf",
  format: "docx",
  source: "system-word-template",
  sortOrder: 3,
  category: "contemporary",
  layout: "two-column-left-sidebar",
  atsFriendly: true,
  supportsPhoto: true,
  supportsPlaceholders: true,
  supportsPreview: true,
  supportsAtsMode: true,
  editableInWord: true,
  isSystemTemplate: true,
  isProtected: true,
  description:
    "Grüne moderne Word-Lebenslaufvorlage. Saubere zweispaltige Struktur mit Foto, Stärken, Zusammenfassung und Erfahrung.",
  tags: [
    "Zeitgenössisch",
    "Word",
    "DOCX",
    "Lebenslauf",
    "ATS",
    "Foto",
    "Grün",
  ],
  cardHighlights: [
    "Grüne moderne Word-Lebenslaufvorlage",
    "Foto, Stärken, Zusammenfassung und Erfahrung",
  ],
} as const;

export const kreativLebenslaufTemplateConfig = {
  id: "word-lebenslauf-kreativ",
  fileName: "Kreativ_Lebenslauf_Muster.docx",
  atsFileName: "Kreativ_Lebenslauf_ATS.docx",
  previewFileName: "Kreativ_Lebenslauf_Muster.preview.png",
  name: "Kreativ",
  documentType: "lebenslauf",
  format: "docx",
  source: "system-word-template",
  sortOrder: 4,
  category: "creative",
  layout: "two-column-header-banner",
  atsFriendly: true,
  supportsPhoto: true,
  supportsBackground: true,
  supportsPlaceholders: true,
  supportsPreview: true,
  supportsAtsMode: true,
  editableInWord: true,
  isSystemTemplate: true,
  isProtected: true,
  emphasis: "compact-information",
  description:
    "Kompakte, kreative Word-Lebenslaufvorlage. Ideal, um viele Informationen übersichtlich auf einer Seite unterzubringen.",
  tags: [
    "Kreativ",
    "Word",
    "DOCX",
    "Lebenslauf",
    "ATS",
    "Foto",
    "Zweispaltig",
    "Kompakt",
  ],
  colorVariants: {
    gruen: "#39B774",
    schwarz: "#111111",
    dunkelblau: "#244766",
    tuerkis: "#159F9B",
    violett: "#7052B5",
    orange: "#D97706",
  },
  cardHighlights: [
    "Viele Informationen übersichtlich auf einer Seite",
    "Zweispaltig · Mit Foto · DOCX",
  ],
} as const;

const coreTemplatePlaceholderKeys = [
  "BEWERBER_NAME",
  "BEWERBER_VORNAME",
  "BEWERBER_NACHNAME",
  "BEWERBER_ADRESSE",
  "BEWERBER_PLZ",
  "BEWERBER_ORT",
  "BEWERBER_TELEFON",
  "BEWERBER_EMAIL",
  "FIRMA_NAME",
  "FIRMA_ADRESSE",
  "FIRMA_PLZ",
  "FIRMA_ORT",
  "ANSPRECHPARTNER",
  "STELLENBEZEICHNUNG",
  "STELLENNUMMER",
  "BEWERBUNGSDATUM",
  "BETREFF",
  "ANREDE",
  "EINLEITUNG",
  "HAUPTTEXT",
  "SCHLUSSTEXT",
  "GRUSSFORMEL",
  "UNTERSCHRIFT",
  "KENNTNISSE",
] as const;

export type TemplatePlaceholderKey =
  (typeof coreTemplatePlaceholderKeys)[number];

export const templatePlaceholderAliases = {
  FIRMA_ADI: "FIRMA_NAME",
  FIRMA_ADRESI: "FIRMA_ADRESSE",
  POSTA_KODU: "FIRMA_PLZ",
  SEHIR: "FIRMA_ORT",
  TARIH: "BEWERBUNGSDATUM",
  STELLE: "STELLENBEZEICHNUNG",
  REFERENZNUMMER: "STELLENNUMMER",
  ANSCHREIBEN_METNI: "HAUPTTEXT",
  KAPANIS: "SCHLUSSTEXT",
} as const satisfies Record<string, TemplatePlaceholderKey>;

const elegantStaticPlaceholderKeys = [
  "VORNAME",
  "NACHNAME",
  "BERUFSBEZEICHNUNG",
  "FACHGEBIET_1",
  "FACHGEBIET_2",
  "FACHGEBIETE",
  "TELEFON",
  "EMAIL",
  "WEBSITE",
  "LINKEDIN",
  "ORT",
  "GEBURTSDATUM",
  "GEBURTSORT",
  "KONTAKT_ZEILE_1",
  "KONTAKT_ZEILE_2",
  "KONTAKT_ZEILE_3",
  "KONTAKTE_TITEL",
  "HEADER_KONTAKT_1",
  "HEADER_KONTAKT_2",
  "HEADER_KONTAKT_3",
  "HEADER_KONTAKT_4",
  "HEADER_KONTAKT_5",
  "HEADER_KONTAKT_6",
  "TELEFON_ZEILE",
  "EMAIL_ZEILE",
  "WEBSITE_ZEILE",
  "LINKEDIN_ZEILE",
  "ORT_ZEILE",
  "PROFILFOTO",
  "ZUSAMMENFASSUNG_TITEL",
  "ZUSAMMENFASSUNG",
  "STAERKEN_TITEL",
  "KENNTNISSE_TITEL",
  "SPRACHEN_TITEL",
  "SPRACHEN_ATS",
  "BERUFSERFAHRUNG_TITEL",
  "ERFAHRUNG_TITEL",
  "AUSBILDUNG_TITEL",
  "PROJEKTE_TITEL",
  "PROJEKTE",
  "WEITERBILDUNGEN_TITEL",
  "WEITERBILDUNGEN",
  "ZERTIFIKATE_TITEL",
  "ZERTIFIKATE",
  "VEROEFFENTLICHUNGEN_TITEL",
  "VEROEFFENTLICHUNGEN",
  "EHRENAMT_TITEL",
  "EHRENAMT",
  "SOFTWARE_TITEL",
  "SOFTWARE",
  "ZUSATZANGABEN_TITEL",
  "ZUSATZANGABEN",
  "FUEHRERSCHEIN_TITEL",
  "FUEHRERSCHEIN",
  "INTERESSEN_TITEL",
  "INTERESSEN",
  "ATS_MODUS",
] as const;

const numberedPlaceholderKeys = (
  count: number,
  fields: readonly string[],
) =>
  Array.from({ length: count }, (_, offset) =>
    fields.map((field) => `${field}_${offset + 1}`),
  ).flat();

export const elegantTemplatePlaceholderKeys: readonly string[] = [
  ...elegantStaticPlaceholderKeys,
  ...numberedPlaceholderKeys(6, [
    "POSITION",
    "UNTERNEHMEN",
    "STARTDATUM",
    "DATUM_TRENNER",
    "ENDDATUM",
    "ARBEITSORT",
    "BESCHREIBUNG",
    "METADATA_TRENNER",
    "TECHNOLOGIEN",
    "ERFAHRUNG_TRENNER",
  ]),
  ...Array.from({ length: 6 }, (_, experienceOffset) =>
    Array.from(
      { length: 5 },
      (_, achievementOffset) =>
        `ERFOLG_${experienceOffset + 1}_${achievementOffset + 1}`,
    ),
  ).flat(),
  ...numberedPlaceholderKeys(3, [
    "ABSCHLUSS",
    "FACHRICHTUNG",
    "HOCHSCHULE",
    "AUSBILDUNG_START",
    "AUSBILDUNG_DATUM_TRENNER",
    "AUSBILDUNG_ENDE",
    "AUSBILDUNG_ORT",
    "AUSBILDUNG_METADATA_TRENNER",
  ]),
  ...numberedPlaceholderKeys(3, ["SPRACHE", "SPRACHNIVEAU"]),
  ...Array.from(
    { length: 3 },
    (_, offset) => `SPRACHE_${offset + 1}_PUNKTE`,
  ),
  ...Array.from({ length: 3 }, (_, offset) => [
    `STAERKE_${offset + 1}_TITEL`,
    `STAERKE_${offset + 1}_BESCHREIBUNG`,
  ]).flat(),
  ...numberedPlaceholderKeys(5, [
    "KENNTNIS_KATEGORIE",
    "KENNTNIS_EINTRAEGE",
  ]),
];

export const templatePlaceholderKeys: readonly string[] = [
  ...coreTemplatePlaceholderKeys,
  ...elegantTemplatePlaceholderKeys,
];
