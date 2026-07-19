import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {
  templatePlaceholderKeys,
} from "../../src/features/templates/template.constants";
import type {
  CreatedDocumentResult,
  DocumentTemplate,
} from "../../src/features/templates/template.types";
import { TemplateError, toTemplateError } from "../../src/features/templates/template.errors";

export class TemplatePlaceholderService {
  async createDocument(
    template: DocumentTemplate,
    targetPath: string,
    data: Record<string, string>,
  ): Promise<CreatedDocumentResult> {
    if (template.extension === ".doc") {
      await copyFile(template.filePath, targetPath);
      return {
        templateId: template.id,
        fileName: path.basename(targetPath),
        filePath: targetPath,
        extension: ".doc",
        replacedPlaceholders: [],
        warning:
          "Das ältere DOC-Format wurde sicher kopiert. Platzhalter werden in DOC-Dateien nicht automatisch ersetzt.",
      };
    }
    try {
      const bytes = await readFile(template.filePath);
      const zip = new PizZip(bytes);
      if (template.extension === ".dotx") {
        const contentTypes = zip.file("[Content_Types].xml");
        if (contentTypes) {
          zip.file(
            "[Content_Types].xml",
            contentTypes
              .asText()
              .replace(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
              ),
          );
        }
      }
      const document = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" },
        nullGetter: (part) => `{{${part.value}}}`,
      });
      const fullText = document.getFullText();
      const normalizedData = Object.fromEntries(
        templatePlaceholderKeys.map((key) => [key, data[key] ?? ""]),
      );
      const replacedPlaceholders = templatePlaceholderKeys.filter((key) =>
        fullText.includes(`{{${key}}}`),
      );
      document.render(normalizedData);
      const output = document
        .getZip()
        .generate({ type: "nodebuffer", compression: "DEFLATE" });
      await writeFile(targetPath, output);
      return {
        templateId: template.id,
        fileName: path.basename(targetPath),
        filePath: targetPath,
        extension: ".docx",
        replacedPlaceholders,
      };
    } catch (error) {
      if (error instanceof TemplateError) throw error;
      const templateError = toTemplateError(error);
      throw new TemplateError(
        `Die Word-Vorlage ist beschädigt oder enthält ungültige Platzhalter. ${templateError.message}`,
        "CORRUPT",
      );
    }
  }
}

