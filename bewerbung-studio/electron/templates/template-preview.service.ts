import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ApplicationPaths } from "../../src/config/application-paths";
import type { DocumentTemplate } from "../../src/features/templates/template.types";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export class TemplatePreviewService {
  constructor(private readonly paths: ApplicationPaths) {}

  async generate(template: DocumentTemplate) {
    await mkdir(this.paths.previewCache, { recursive: true });
    const version = new Date(template.modifiedAt ?? 0).getTime();
    const fileName = `${template.id}-${version}.svg`;
    const previewPath = path.join(this.paths.previewCache, fileName);
    const typeLabel =
      template.documentType === "anschreiben"
        ? "ANSCHREIBEN"
        : template.documentType === "deckblatt"
          ? "DECKBLATT"
          : "LEBENSLAUF";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="594" viewBox="0 0 420 594">
      <rect width="420" height="594" rx="8" fill="#fff"/>
      <rect x="34" y="38" width="352" height="5" rx="2.5" fill="#36b99a"/>
      <text x="34" y="76" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#36b99a">${typeLabel}</text>
      <text x="34" y="112" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#1d2927">${escapeXml(template.name.slice(0, 26))}</text>
      <rect x="34" y="140" width="260" height="8" rx="4" fill="#cfd8d5"/>
      <rect x="34" y="160" width="330" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="174" width="310" height="6" rx="3" fill="#e5ebe9"/>
      <rect x="34" y="218" width="170" height="9" rx="4" fill="#9aaba6"/>
      ${Array.from({ length: 12 }, (_, index) => `<rect x="34" y="${246 + index * 20}" width="${index % 3 === 0 ? 330 : 300}" height="6" rx="3" fill="#e5ebe9"/>`).join("")}
      <text x="34" y="558" font-family="Arial,sans-serif" font-size="12" fill="#71807c">${escapeXml(template.extension.toUpperCase())} · ${escapeXml(template.source === "existing-document" ? "Eigenes Dokument" : "Muster")}</text>
    </svg>`;
    try {
      await readFile(previewPath);
    } catch {
      await writeFile(previewPath, svg, "utf8");
      const files = await import("node:fs/promises").then((fs) =>
        fs.readdir(this.paths.previewCache),
      );
      await Promise.all(
        files
          .filter(
            (entry) =>
              entry.startsWith(`${template.id}-`) && entry !== fileName,
          )
          .map((entry) =>
            rm(path.join(this.paths.previewCache, entry), { force: true }),
          ),
      );
    }
    return {
      previewImagePath: previewPath,
      previewDataUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    };
  }
}

