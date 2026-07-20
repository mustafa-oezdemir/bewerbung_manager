import { copyFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {
  kreativLebenslaufTemplateConfig,
  templatePlaceholderAliases,
  templatePlaceholderKeys,
  zeitgenoessischLebenslaufTemplateConfig,
} from "../../src/features/templates/template.constants";
import type {
  CreatedDocumentResult,
  DocumentTemplate,
} from "../../src/features/templates/template.types";
import { TemplateError, toTemplateError } from "../../src/features/templates/template.errors";

const profilePhotoDataUrl =
  /^data:image\/png;base64,([a-z0-9+/=\s]+)$/i;

const decodeXmlText = (value: string) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");

const removeEmptyParagraphs = (documentXml: string) =>
  documentXml.replace(
    /<w:p\b[\s\S]*?<\/w:p>/g,
    (paragraph) => {
      if (
        paragraph.includes('w:pStyle w:val="CellTerminator"') ||
        paragraph.includes("<w:drawing")
      ) {
        return paragraph;
      }
      const text = Array.from(
        paragraph.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/g),
        (match) => decodeXmlText(match[1]).trim(),
      ).join("");
      return text ? paragraph : "";
    },
  );

const centeredSquareCrop = (bytes: Buffer) => {
  if (
    bytes.length < 24 ||
    bytes.toString("ascii", 1, 4) !== "PNG"
  ) {
    return { left: 0, top: 0, right: 0, bottom: 0 };
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (!width || !height || width === height) {
    return { left: 0, top: 0, right: 0, bottom: 0 };
  }
  if (width > height) {
    const crop = Math.round(((width - height) / (2 * width)) * 100_000);
    return { left: crop, top: 0, right: crop, bottom: 0 };
  }
  const crop = Math.round(((height - width) / (2 * height)) * 100_000);
  return { left: 0, top: crop, right: 0, bottom: crop };
};

const normalizedHex = (value: string | undefined, fallback: string) => {
  const candidate = value?.replace("#", "").toUpperCase();
  return candidate && /^[0-9A-F]{6}$/.test(candidate)
    ? candidate
    : fallback;
};

const applyManagedResumeDesignTokens = (
  templateId: string,
  zip: PizZip,
  data: Record<string, string>,
) => {
  const replacements =
    templateId === kreativLebenslaufTemplateConfig.id
      ? new Map([
          [
            "154F45",
            normalizedHex(data.DESIGN_PRIMARY, "154F45"),
          ],
          [
            "39B774",
            normalizedHex(data.DESIGN_PRIMARY, "39B774"),
          ],
          [
            "E4EBE8",
            normalizedHex(data.DESIGN_SOFT_ACCENT, "E4EBE8"),
          ],
        ])
      : new Map([
          [
            "0F5B4A",
            normalizedHex(data.DESIGN_PRIMARY, "0F5B4A"),
          ],
          [
            "36B779",
            normalizedHex(data.DESIGN_ACCENT, "36B779"),
          ],
          [
            "CDEEDF",
            normalizedHex(data.DESIGN_SOFT_ACCENT, "CDEEDF"),
          ],
          [
            "9DDBB9",
            normalizedHex(
              data.DESIGN_TITLE_BACKGROUND,
              "9DDBB9",
            ),
          ],
        ]);
  const font = data.DESIGN_FONT?.trim() || "Arial";
  for (const fileName of Object.keys(zip.files)) {
    if (!/^word\/.*\.xml$/i.test(fileName)) continue;
    const part = zip.file(fileName);
    if (!part) continue;
    let xml = part.asText();
    for (const [source, target] of replacements) {
      xml = xml.replaceAll(source, target);
    }
    xml = xml
      .replaceAll('w:ascii="Arial"', `w:ascii="${font}"`)
      .replaceAll('w:hAnsi="Arial"', `w:hAnsi="${font}"`)
      .replaceAll('w:cs="Arial"', `w:cs="${font}"`);
    zip.file(fileName, xml);
  }
};

const replaceProfilePhoto = (
  zip: PizZip,
  dataUrl: string,
) => {
  const documentPart = zip.file("word/document.xml");
  const relationshipsPart = zip.file(
    "word/_rels/document.xml.rels",
  );
  if (!documentPart || !relationshipsPart) {
    return { found: false };
  }
  let documentXml = documentPart.asText();
  const drawing = documentXml
    .match(/<w:drawing>[\s\S]*?<\/w:drawing>/g)
    ?.find((candidate) =>
      /<wp:docPr\b[^>]*(?:descr|title)="PROFILFOTO"[^>]*\/>/.test(
        candidate,
      ),
    );
  if (!drawing) return { found: false };

  const relationshipId = drawing.match(
    /<a:blip\b[^>]*r:embed="([^"]+)"/,
  )?.[1];
  const encodedPhoto = dataUrl.match(profilePhotoDataUrl)?.[1];
  if (!relationshipId || !encodedPhoto) {
    documentXml = documentXml.replace(drawing, "");
    zip.file(
      "word/document.xml",
      removeEmptyParagraphs(documentXml),
    );
    return { found: true };
  }

  const relationshipsXml = relationshipsPart.asText();
  const escapedId = relationshipId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const target = relationshipsXml.match(
    new RegExp(
      `<Relationship\\b(?=[^>]*\\bId="${escapedId}")(?=[^>]*\\bTarget="([^"]+)")[^>]*/>`,
    ),
  )?.[1];
  if (!target) {
    documentXml = documentXml.replace(drawing, "");
    zip.file(
      "word/document.xml",
      removeEmptyParagraphs(documentXml),
    );
    return { found: true };
  }

  const photoBytes = Buffer.from(
    encodedPhoto.replace(/\s/g, ""),
    "base64",
  );
  zip.file(path.posix.join("word", target), photoBytes);
  const crop = centeredSquareCrop(photoBytes);
  const cropElement =
    `<a:srcRect l="${crop.left}" t="${crop.top}" ` +
    `r="${crop.right}" b="${crop.bottom}"/>`;
  const updatedDrawing = drawing.replace(
    /(<a:blip\b[^>]*\/>)(?:<a:srcRect\b[^>]*\/>)?/,
    `$1${cropElement}`,
  );
  documentXml = documentXml.replace(drawing, updatedDrawing);
  zip.file(
    "word/document.xml",
    removeEmptyParagraphs(documentXml),
  );
  return { found: true };
};

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
      const aliasKeys = Object.keys(templatePlaceholderAliases) as Array<
        keyof typeof templatePlaceholderAliases
      >;
      const normalizedData = Object.fromEntries(
        [
          ...Object.entries(data),
          ...templatePlaceholderKeys.map(
            (key) => [key, data[key] ?? ""] as const,
          ),
          ...aliasKeys.map(
            (alias) =>
              [
                alias,
                data[alias] ??
                  data[templatePlaceholderAliases[alias]] ??
                  "",
              ] as const,
          ),
        ],
      );
      const replacedPlaceholders = [
        ...templatePlaceholderKeys,
        ...aliasKeys,
      ].filter((key) => fullText.includes(`{{${key}}}`));
      document.render(normalizedData);
      const renderedZip = document.getZip();
      if (
        template.id === zeitgenoessischLebenslaufTemplateConfig.id ||
        template.id === kreativLebenslaufTemplateConfig.id
      ) {
        applyManagedResumeDesignTokens(
          template.id,
          renderedZip,
          data,
        );
      }
      const photoResult = replaceProfilePhoto(
        renderedZip,
        data.PROFILFOTO ?? "",
      );
      if (!photoResult.found) {
        const documentPart = renderedZip.file("word/document.xml");
        if (documentPart) {
          renderedZip.file(
            "word/document.xml",
            removeEmptyParagraphs(documentPart.asText()),
          );
        }
      } else {
        replacedPlaceholders.push("PROFILFOTO");
      }
      const output = renderedZip
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
