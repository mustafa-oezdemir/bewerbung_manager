import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import PizZip from "pizzip";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveApplicationPaths } from "../../src/config/application-paths";
import { TemplateError } from "../../src/features/templates/template.errors";
import { TemplateService } from "./template.service";

const createDocx = async (
  filePath: string,
  body = `<w:p><w:r><w:rPr><w:b/></w:rPr><w:t>{{FIRMA_</w:t></w:r><w:r><w:t>NAME}}</w:t></w:r></w:p>`,
) => {
  const zip = new PizZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    </Types>`,
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
      <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
    </Relationships>`,
  );
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:body>${body}<w:sectPr/></w:body>
    </w:document>`,
  );
  zip.file(
    "word/_rels/document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`,
  );
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(
    filePath,
    zip.generate({ type: "nodebuffer", compression: "DEFLATE" }),
  );
};

describe("Musterverwaltung", () => {
  let root: string;
  let paths: ReturnType<typeof resolveApplicationPaths>;
  let service: TemplateService;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), "bewerbung-templates-"));
    paths = resolveApplicationPaths(root);
    service = new TemplateService(paths);
    await service.initialize();
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("creates missing folders and scans each Muster folder with the correct type", async () => {
    await createDocx(path.join(paths.anschreibenTemplates, "Brief.docx"));
    await createDocx(path.join(paths.deckblattTemplates, "Titel.docx"));
    await createDocx(path.join(paths.lebenslaufTemplates, "CV.docx"));

    const result = await service.scanAllTemplates();

    expect(result.templates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fileName: "Brief.docx",
          documentType: "anschreiben",
          source: "muster-folder",
        }),
        expect.objectContaining({
          fileName: "Titel.docx",
          documentType: "deckblatt",
        }),
        expect.objectContaining({
          fileName: "CV.docx",
          documentType: "lebenslauf",
        }),
      ]),
    );
    await expect(stat(paths.previewCache)).resolves.toBeDefined();
  });

  it("shows Word files from data/Anschreiben as Eigene Dokumente", async () => {
    await createDocx(
      path.join(paths.anschreibenDocuments, "Mein_Anschreiben.docx"),
    );

    await service.scanAllTemplates();
    const documents = await service.scanExistingAnschreiben();

    expect(documents).toHaveLength(1);
    expect(documents[0]).toMatchObject({
      source: "existing-document",
      documentType: "anschreiben",
    });
  });

  it("copies an existing Anschreiben to Muster without changing the original or overwriting collisions", async () => {
    const sourcePath = path.join(
      paths.anschreibenDocuments,
      "Anschreiben_Muster.docx",
    );
    await createDocx(sourcePath);
    const original = await readFile(sourcePath);
    await service.scanAllTemplates();
    const source = (await service.scanExistingAnschreiben())[0];

    const first = await service.copyExistingTemplateById(source.id);
    const second = await service.copyExistingTemplateById(source.id);

    expect(first.filePath).not.toBe(second.filePath);
    expect(await readFile(sourcePath)).toEqual(original);
    await expect(stat(first.filePath)).resolves.toBeDefined();
    await expect(stat(second.filePath)).resolves.toBeDefined();
  });

  it("creates a new DOCX, replaces split-run placeholders and preserves run formatting", async () => {
    const templatePath = path.join(
      paths.anschreibenTemplates,
      "Formatiert.docx",
    );
    await createDocx(templatePath);
    const result = await service.scanAllTemplates();
    const template = result.templates.find(
      (item) => item.fileName === "Formatiert.docx",
    )!;
    const targetDirectory = path.join(
      paths.dataRoot,
      "Bewerbungen",
      "Siemens",
      "Anschreiben",
    );

    const created = await service.createDocumentFromTemplate(
      template.id,
      targetDirectory,
      "Siemens AG",
      { FIRMA_NAME: "Siemens AG" },
    );
    const outputZip = new PizZip(await readFile(created.filePath));
    const documentXml = outputZip.file("word/document.xml")!.asText();

    expect(created.fileName).toMatch(/^Siemens_AG_\d{8}_\d{6}\.docx$/);
    expect(documentXml).toContain("Siemens AG");
    expect(documentXml).toContain("<w:b/>");
    expect(await readFile(templatePath)).not.toEqual(
      await readFile(created.filePath),
    );
  });

  it("does not list unsupported extensions and reports corrupt DOCX files without crashing", async () => {
    await writeFile(path.join(paths.anschreibenTemplates, "Notiz.txt"), "x");
    await writeFile(
      path.join(paths.anschreibenTemplates, "Defekt.docx"),
      "not-a-zip",
    );

    const result = await service.scanAllTemplates();
    const corrupt = result.templates.find(
      (item) => item.fileName === "Defekt.docx",
    )!;

    expect(result.templates.some((item) => item.fileName === "Notiz.txt")).toBe(
      false,
    );
    await expect(
      service.createDocumentFromTemplate(
        corrupt.id,
        path.join(paths.dataRoot, "Bewerbungen", "Test", "Anschreiben"),
        "Test",
        {},
      ),
    ).rejects.toMatchObject({ code: "CORRUPT" });
  });

  it("persists favorites in sidecar metadata and protects system templates from deletion", async () => {
    const templatePath = path.join(
      paths.lebenslaufTemplates,
      "System.docx",
    );
    await createDocx(templatePath);
    await writeFile(
      path.join(paths.lebenslaufTemplates, "System.template.json"),
      JSON.stringify({ isSystemTemplate: true }),
      "utf8",
    );
    const result = await service.scanAllTemplates();
    const template = result.templates[0];

    await expect(service.deleteCustomTemplate(template.id)).rejects.toEqual(
      expect.objectContaining<Partial<TemplateError>>({
        code: "SYSTEM_TEMPLATE",
      }),
    );
    await expect(stat(templatePath)).resolves.toBeDefined();
  });

  it("invalidates the preview cache when the source modification time changes", async () => {
    const templatePath = path.join(paths.deckblattTemplates, "Cache.docx");
    await createDocx(templatePath);
    const first = await service.scanAllTemplates();
    const firstPreview = first.templates[0].previewImagePath;
    await new Promise((resolve) => setTimeout(resolve, 12));
    await createDocx(
      templatePath,
      `<w:p><w:r><w:t>Neue Version</w:t></w:r></w:p>`,
    );

    const second = await service.scanAllTemplates();

    expect(second.templates[0].previewImagePath).not.toBe(firstPreview);
    await expect(stat(second.templates[0].previewImagePath!)).resolves.toBeDefined();
  });
});

