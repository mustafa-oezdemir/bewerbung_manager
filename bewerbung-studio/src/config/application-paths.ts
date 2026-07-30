import path from "node:path";

export const DEFAULT_BEWERBUNG_ROOT_PATH = "D:\\bewerbung_mustafa";
export const BEWERBUNG_ROOT_PATH_ENV = "BEWERBUNG_ROOT_PATH";

export interface ApplicationPaths {
  root: string;
  dataRoot: string;
  applicationsData: string;
  musterRoot: string;
  anschreibenTemplates: string;
  deckblattTemplates: string;
  lebenslaufTemplates: string;
  anschreibenDocuments: string;
  lebenslaufDocuments: string;
  zeugnisseArchive: string;
  zertifikateArchive: string;
  absagenRoot: string;
  previewCache: string;
  systemTemplateCache: string;
  bundledTemplatesRoot?: string;
}

export const resolveBewerbungRootPath = (
  environment: Record<string, string | undefined> = process.env,
) => {
  const configured = environment[BEWERBUNG_ROOT_PATH_ENV]?.trim();
  return path.resolve(configured || DEFAULT_BEWERBUNG_ROOT_PATH);
};

export const resolveApplicationPaths = (
  rootPath = resolveBewerbungRootPath(),
  bundledTemplatesRoot?: string,
): ApplicationPaths => {
  const root = path.resolve(rootPath);
  const dataRoot = path.join(root, "data");
  const musterRoot = path.join(dataRoot, "Muster");
  return {
    root,
    dataRoot,
    applicationsData: path.join(dataRoot, "Bewerbungen"),
    musterRoot,
    anschreibenTemplates: path.join(musterRoot, "Anschreiben"),
    deckblattTemplates: path.join(musterRoot, "Deckblatt"),
    lebenslaufTemplates: path.join(musterRoot, "Lebenslauf"),
    anschreibenDocuments: path.join(root, "Anschreiben"),
    lebenslaufDocuments: path.join(root, "Lebenslauf"),
    zeugnisseArchive: path.join(root, "Zeugnisse"),
    zertifikateArchive: path.join(root, "Zertifikate"),
    absagenRoot: path.join(root, "Absagen"),
    previewCache: path.join(dataRoot, "cache", "template-previews"),
    systemTemplateCache: path.join(dataRoot, "cache", "system-templates"),
    bundledTemplatesRoot,
  };
};
