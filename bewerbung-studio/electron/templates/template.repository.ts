import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { ApplicationPaths } from "../../src/config/application-paths";
import type {
  DocumentTemplate,
  TemplateDocumentType,
  TemplateMetadata,
  TemplateScanResult,
} from "../../src/features/templates/template.types";
import { TemplatePreviewService } from "./template-preview.service";
import { metadataPathFor, TemplateScanner } from "./template-scanner";

export class TemplateRepository {
  private templates: DocumentTemplate[] = [];
  private readonly scanner: TemplateScanner;
  private readonly previewService: TemplatePreviewService;

  constructor(private readonly paths: ApplicationPaths) {
    this.scanner = new TemplateScanner(paths);
    this.previewService = new TemplatePreviewService(paths);
  }

  async initialize() {
    await Promise.all(
      [
        this.paths.musterRoot,
        this.paths.anschreibenTemplates,
        this.paths.deckblattTemplates,
        this.paths.lebenslaufTemplates,
        this.paths.anschreibenDocuments,
        this.paths.previewCache,
      ].map((directory) => mkdir(directory, { recursive: true })),
    );
    return this.refresh();
  }

  async refresh(): Promise<TemplateScanResult> {
    const result = await this.scanner.scanAllTemplates();
    this.templates = await Promise.all(
      result.templates.map(async (template) => ({
        ...template,
        ...(await this.previewService.generate(template)),
      })),
    );
    return {
      templates: structuredClone(this.templates),
      scannedAt: new Date().toISOString(),
      warnings: result.warnings,
    };
  }

  list() {
    return structuredClone(this.templates);
  }

  async getById(templateId: string) {
    let template = this.templates.find((item) => item.id === templateId);
    if (!template) {
      await this.refresh();
      template = this.templates.find((item) => item.id === templateId);
    }
    return template ? structuredClone(template) : null;
  }

  async listByType(documentType: TemplateDocumentType) {
    if (!this.templates.length) await this.refresh();
    return structuredClone(
      this.templates.filter(
        (template) => template.documentType === documentType,
      ),
    );
  }

  async listExistingDocuments() {
    if (!this.templates.length) await this.refresh();
    return structuredClone(
      this.templates.filter(
        (template) => template.source === "existing-document",
      ),
    );
  }

  async readMetadata(filePath: string): Promise<TemplateMetadata> {
    try {
      return JSON.parse(
        await readFile(metadataPathFor(filePath), "utf8"),
      ) as TemplateMetadata;
    } catch {
      return {};
    }
  }

  async writeMetadata(
    filePath: string,
    changes: TemplateMetadata,
  ) {
    const metadata = {
      ...(await this.readMetadata(filePath)),
      ...changes,
    };
    await writeFile(
      metadataPathFor(filePath),
      JSON.stringify(metadata, null, 2),
      "utf8",
    );
  }
}

