import {
  copyFile,
  mkdir,
  rm,
  stat,
} from "node:fs/promises";
import path from "node:path";
import type { ApplicationPaths } from "../../src/config/application-paths";
import {
  maximumTemplateFileSize,
} from "../../src/features/templates/template.constants";
import type {
  CreatedDocumentResult,
  DocumentTemplate,
  TemplateDocumentType,
} from "../../src/features/templates/template.types";
import { TemplateError } from "../../src/features/templates/template.errors";
import {
  createUniqueFilePath,
  sanitizeTemplateFileName,
  templateTimestamp,
} from "./template-filename.service";
import { TemplatePlaceholderService } from "./template-placeholder.service";
import { TemplateRepository } from "./template.repository";
import { metadataPathFor } from "./template-scanner";
import {
  assertAllowedTemplatePath,
  getTemplateExtension,
  isPathInside,
  validateTemplateFile,
  withOneDriveRetry,
} from "./template-validator";

export class TemplateService {
  readonly repository: TemplateRepository;
  private readonly placeholderService = new TemplatePlaceholderService();

  constructor(private readonly paths: ApplicationPaths) {
    this.repository = new TemplateRepository(paths);
  }

  initialize() {
    return this.repository.initialize();
  }

  scanAllTemplates() {
    return this.repository.refresh();
  }

  scanTemplatesByType(documentType: TemplateDocumentType) {
    return this.repository.listByType(documentType);
  }

  scanExistingAnschreiben() {
    return this.repository.listExistingDocuments();
  }

  getTemplateById(templateId: string) {
    return this.repository.getById(templateId);
  }

  private rootForType(documentType: TemplateDocumentType) {
    if (documentType === "anschreiben")
      return this.paths.anschreibenTemplates;
    if (documentType === "deckblatt") return this.paths.deckblattTemplates;
    return this.paths.lebenslaufTemplates;
  }

  async addExternalTemplate(
    sourceFilePath: string,
    documentType: TemplateDocumentType,
    requestedTemplateName?: string,
  ) {
    const extension = getTemplateExtension(sourceFilePath);
    const sourceInfo = await stat(sourceFilePath);
    if (!sourceInfo.isFile()) {
      throw new TemplateError("Die ausgewählte Vorlage ist keine Datei.", "INVALID_FORMAT");
    }
    if (sourceInfo.size > maximumTemplateFileSize) {
      throw new TemplateError(
        "Die Vorlage darf höchstens 25 MB groß sein.",
        "FILE_TOO_LARGE",
      );
    }
    const targetRoot = this.rootForType(documentType);
    await mkdir(targetRoot, { recursive: true });
    const requestedName =
      requestedTemplateName || path.basename(sourceFilePath, extension);
    const targetPath = await createUniqueFilePath(
      targetRoot,
      requestedName,
      extension,
    );
    await withOneDriveRetry(() => copyFile(sourceFilePath, targetPath));
    await this.repository.writeMetadata(targetPath, {
      name: requestedName.replaceAll("_", " "),
      documentType,
      tags: [],
      isFavorite: false,
      isSystemTemplate: false,
    });
    await this.repository.refresh();
    const created = this.repository
      .list()
      .find((template) => template.filePath === targetPath);
    if (!created)
      throw new TemplateError("Die Vorlage konnte nicht hinzugefügt werden.", "NOT_FOUND");
    return created;
  }

  async copyExistingDocumentToTemplates(
    sourceFilePath: string,
    requestedTemplateName?: string,
  ) {
    assertAllowedTemplatePath(this.paths, sourceFilePath);
    const source = this.repository
      .list()
      .find(
        (template) =>
          template.filePath === sourceFilePath &&
          template.source === "existing-document",
      );
    if (!source) {
      throw new TemplateError(
        "Das Anschreiben wurde nicht in den eigenen Dokumenten gefunden.",
        "NOT_FOUND",
      );
    }
    return this.addExternalTemplate(
      source.filePath,
      "anschreiben",
      requestedTemplateName || source.name,
    );
  }

  async copyExistingTemplateById(
    templateId: string,
    requestedTemplateName?: string,
  ) {
    const template = await this.requireTemplate(templateId);
    if (template.source !== "existing-document") {
      throw new TemplateError(
        "Nur eigene Anschreiben können zu Muster hinzugefügt werden.",
        "INVALID_PATH",
      );
    }
    return this.copyExistingDocumentToTemplates(
      template.filePath,
      requestedTemplateName,
    );
  }

  async duplicateTemplate(templateId: string) {
    const template = await this.requireTemplate(templateId);
    const targetRoot =
      template.source === "existing-document"
        ? this.paths.anschreibenDocuments
        : path.dirname(template.filePath);
    const targetPath = await createUniqueFilePath(
      targetRoot,
      `${path.basename(template.fileName, template.extension)}_Kopie`,
      template.extension,
    );
    await withOneDriveRetry(() => copyFile(template.filePath, targetPath));
    if (template.source === "muster-folder") {
      await this.repository.writeMetadata(targetPath, {
        ...(await this.repository.readMetadata(template.filePath)),
        name: `${template.name} Kopie`,
        isSystemTemplate: false,
      });
    }
    await this.repository.refresh();
    return (
      this.repository
        .list()
        .find((candidate) => candidate.filePath === targetPath) ?? null
    );
  }

  async createDocumentFromTemplate(
    templateId: string,
    targetDirectory: string,
    requestedBaseName: string,
    data: Record<string, string>,
  ): Promise<CreatedDocumentResult> {
    const template = await this.requireTemplate(templateId);
    if (
      !isPathInside(path.join(this.paths.dataRoot, "Bewerbungen"), targetDirectory)
    ) {
      throw new TemplateError("Ungültiger Zielordner.", "INVALID_PATH");
    }
    await validateTemplateFile(this.paths, template.filePath);
    await mkdir(targetDirectory, { recursive: true });
    const outputExtension =
      template.extension === ".doc" ? ".doc" : ".docx";
    const targetPath = await createUniqueFilePath(
      targetDirectory,
      `${sanitizeTemplateFileName(requestedBaseName)}_${templateTimestamp()}`,
      outputExtension,
    );
    return withOneDriveRetry(() =>
      this.placeholderService.createDocument(template, targetPath, data),
    );
  }

  async toggleTemplateFavorite(templateId: string) {
    const template = await this.requireTemplate(templateId);
    await this.repository.writeMetadata(template.filePath, {
      isFavorite: !template.isFavorite,
    });
    return this.repository.refresh();
  }

  async deleteCustomTemplate(templateId: string) {
    const template = await this.requireTemplate(templateId);
    if (template.isSystemTemplate) {
      throw new TemplateError(
        "Systemvorlagen können nicht gelöscht werden.",
        "SYSTEM_TEMPLATE",
      );
    }
    if (template.source !== "muster-folder") {
      throw new TemplateError(
        "Eigene Dokumente werden an dieser Stelle nicht gelöscht.",
        "INVALID_PATH",
      );
    }
    await rm(template.filePath);
    await rm(metadataPathFor(template.filePath), { force: true });
    return this.repository.refresh();
  }

  async generateTemplatePreview(templateId: string) {
    const template = await this.requireTemplate(templateId);
    return template.previewDataUrl ?? null;
  }

  private async requireTemplate(templateId: string): Promise<DocumentTemplate> {
    const template = await this.repository.getById(templateId);
    if (!template) {
      throw new TemplateError("Vorlage wurde nicht gefunden.", "NOT_FOUND");
    }
    return template;
  }
}
