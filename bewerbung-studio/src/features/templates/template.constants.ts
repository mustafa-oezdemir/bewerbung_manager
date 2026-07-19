import type {
  TemplateDocumentType,
  TemplateExtension,
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

export const templatePlaceholderKeys = [
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
