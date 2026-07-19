export const templateDocumentTypes = [
  "anschreiben",
  "deckblatt",
  "lebenslauf",
] as const;

export const templateSources = [
  "muster-folder",
  "existing-document",
] as const;

export const templateExtensions = [".docx", ".dotx", ".doc"] as const;

export type TemplateDocumentType = (typeof templateDocumentTypes)[number];
export type TemplateSource = (typeof templateSources)[number];
export type TemplateExtension = (typeof templateExtensions)[number];

export interface DocumentTemplate {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  extension: TemplateExtension;
  documentType: TemplateDocumentType;
  source: TemplateSource;
  createdAt?: string;
  modifiedAt?: string;
  fileSize: number;
  previewImagePath?: string;
  previewDataUrl?: string;
  description?: string;
  tags: string[];
  isFavorite: boolean;
  isSystemTemplate: boolean;
}

export interface CreatedDocumentResult {
  templateId: string;
  fileName: string;
  filePath: string;
  extension: TemplateExtension;
  replacedPlaceholders: string[];
  warning?: string;
}

export interface TemplateScanResult {
  templates: DocumentTemplate[];
  scannedAt: string;
  warnings: string[];
}

export interface AddTemplateInput {
  documentType: TemplateDocumentType;
  requestedName?: string;
}

export interface UseTemplateInput {
  templateId: string;
  applicationId: string;
}

export interface TemplateMetadata {
  name?: string;
  documentType?: TemplateDocumentType;
  description?: string;
  tags?: string[];
  isFavorite?: boolean;
  isSystemTemplate?: boolean;
}

