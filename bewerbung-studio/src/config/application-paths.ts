import path from "node:path";

export interface ApplicationPaths {
  dataRoot: string;
  musterRoot: string;
  anschreibenTemplates: string;
  deckblattTemplates: string;
  lebenslaufTemplates: string;
  anschreibenDocuments: string;
  previewCache: string;
}

export const resolveApplicationPaths = (
  documentsPath: string,
): ApplicationPaths => {
  const dataRoot = path.join(documentsPath, "BewerbungsManager", "data");
  const musterRoot = path.join(dataRoot, "Muster");
  return {
    dataRoot,
    musterRoot,
    anschreibenTemplates: path.join(musterRoot, "Anschreiben"),
    deckblattTemplates: path.join(musterRoot, "Deckblatt"),
    lebenslaufTemplates: path.join(musterRoot, "Lebenslauf"),
    anschreibenDocuments: path.join(dataRoot, "Anschreiben"),
    previewCache: path.join(dataRoot, "cache", "template-previews"),
  };
};

