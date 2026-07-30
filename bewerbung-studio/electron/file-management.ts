import { access, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import type { Application, ApplicationStatus } from "../src/shared/schema";
import type { ApplicationPaths } from "../src/config/application-paths";

const reservedWindowsNames =
  /^(?:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i;

export const sanitizeFileName = (value: string) => {
  const sanitized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[<>:"/\\|?*\u0000-\u001F]+/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/^[. ]+|[. ]+$/g, "")
    .slice(0, 80);
  if (!sanitized) return "Bewerbung";
  return reservedWindowsNames.test(sanitized) ? `_${sanitized}` : sanitized;
};

export const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isPathInside = (root: string, candidate: string) => {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);
  return (
    resolvedCandidate === resolvedRoot ||
    resolvedCandidate.startsWith(`${resolvedRoot}${path.sep}`)
  );
};

const pathExists = async (candidate: string) => {
  try {
    await access(candidate);
    return true;
  } catch {
    return false;
  }
};

type DocumentDirectories = {
  anschreiben: string;
  lebenslauf: string;
  deckblatt: string;
};

export class FileManagementService {
  constructor(readonly paths: ApplicationPaths) {}

  async initialize() {
    const directories = [
      this.paths.root,
      this.paths.dataRoot,
      this.paths.applicationsData,
      this.paths.anschreibenDocuments,
      this.paths.lebenslaufDocuments,
      this.paths.zeugnisseArchive,
      this.paths.zertifikateArchive,
      this.paths.absagenRoot,
      this.paths.anschreibenTemplates,
      this.paths.deckblattTemplates,
      this.paths.lebenslaufTemplates,
      this.paths.previewCache,
      this.paths.systemTemplateCache,
      path.join(this.paths.dataRoot, "Profile"),
      path.join(this.paths.dataRoot, "Settings"),
      path.join(this.paths.dataRoot, "Backups"),
    ];
    await Promise.all(
      directories.map((directory) => mkdir(directory, { recursive: true })),
    );
  }

  applicationDataPath(folderName: string) {
    const candidate = path.resolve(this.paths.applicationsData, folderName);
    if (!isPathInside(this.paths.applicationsData, candidate)) {
      throw new Error("Ungültiger Bewerbungsordner.");
    }
    return candidate;
  }

  rejectionPath(folderName: string) {
    const candidate = path.resolve(this.paths.absagenRoot, folderName);
    if (!isPathInside(this.paths.absagenRoot, candidate)) {
      throw new Error("Ungültiger Absageordner.");
    }
    return candidate;
  }

  documentDirectories(
    application: Pick<Application, "folderName" | "status">,
  ): DocumentDirectories {
    const applicationData = this.applicationDataPath(application.folderName);
    if (application.status === "Absage") {
      const rejectionRoot = this.rejectionPath(application.folderName);
      return {
        anschreiben: path.join(rejectionRoot, "Anschreiben"),
        lebenslauf: path.join(rejectionRoot, "Lebenslauf"),
        deckblatt: path.join(applicationData, "Deckblatt"),
      };
    }
    return {
      anschreiben: path.join(
        this.paths.anschreibenDocuments,
        application.folderName,
      ),
      lebenslauf: path.join(
        this.paths.lebenslaufDocuments,
        application.folderName,
      ),
      deckblatt: path.join(applicationData, "Deckblatt"),
    };
  }

  async allocateApplicationFolderName(companyName: string, date = new Date()) {
    const baseName = `${sanitizeFileName(companyName)}_${formatLocalDate(date)}`;
    for (let suffix = 1; suffix < 10_000; suffix += 1) {
      const folderName = suffix === 1 ? baseName : `${baseName}_${suffix}`;
      const occupied = await Promise.all([
        pathExists(this.applicationDataPath(folderName)),
        pathExists(path.join(this.paths.anschreibenDocuments, folderName)),
        pathExists(path.join(this.paths.lebenslaufDocuments, folderName)),
        pathExists(this.rejectionPath(folderName)),
      ]);
      if (occupied.some(Boolean)) continue;
      try {
        await mkdir(this.applicationDataPath(folderName));
        return folderName;
      } catch (error) {
        const code =
          typeof error === "object" && error && "code" in error
            ? String(error.code)
            : "";
        if (code !== "EEXIST") throw error;
      }
    }
    throw new Error("Für die Bewerbung konnte kein eindeutiger Ordner erstellt werden.");
  }

  async ensureApplicationDirectories(application: Application) {
    const dataRoot = this.applicationDataPath(application.folderName);
    const documents = this.documentDirectories(application);
    await Promise.all([
      mkdir(path.join(dataRoot, "Stellenanzeige"), { recursive: true }),
      mkdir(documents.anschreiben, { recursive: true }),
      mkdir(documents.deckblatt, { recursive: true }),
      mkdir(documents.lebenslauf, { recursive: true }),
      mkdir(path.join(dataRoot, "Export"), { recursive: true }),
    ]);
    return { dataRoot, documents };
  }

  archiveRootForCategory(category: "Zeugnisse" | "Zertifikate") {
    return category === "Zeugnisse"
      ? this.paths.zeugnisseArchive
      : this.paths.zertifikateArchive;
  }

  archiveRelativePath(
    category: "Zeugnisse" | "Zertifikate",
    selectedPath: string,
  ) {
    const root = this.archiveRootForCategory(category);
    const absolute = path.resolve(selectedPath);
    if (!isPathInside(root, absolute) || absolute === path.resolve(root)) {
      throw new Error(
        `Bitte wählen Sie eine Datei aus dem zentralen Ordner „${category}“.`,
      );
    }
    return path.relative(root, absolute);
  }

  resolveArchivePath(
    category: "Zeugnisse" | "Zertifikate",
    relativePath: string,
  ) {
    const root = this.archiveRootForCategory(category);
    const absolute = path.resolve(root, relativePath);
    if (!isPathInside(root, absolute) || absolute === path.resolve(root)) {
      throw new Error("Ungültiger Dokumentpfad.");
    }
    return absolute;
  }

  async transitionApplicationDocuments(
    application: Application,
    nextStatus: ApplicationStatus,
  ) {
    const wasRejected = application.status === "Absage";
    const willBeRejected = nextStatus === "Absage";
    if (wasRejected === willBeRejected) return;

    const current = this.documentDirectories(application);
    const next = this.documentDirectories({
      ...application,
      status: nextStatus,
    });
    const moves = [
      [current.anschreiben, next.anschreiben],
      [current.lebenslauf, next.lebenslauf],
    ] as const;
    const completed: Array<readonly [string, string]> = [];
    try {
      for (const [source, target] of moves) {
        if (!(await pathExists(source))) continue;
        if (await pathExists(target)) {
          throw new Error(`Der Zielordner existiert bereits: ${target}`);
        }
        await mkdir(path.dirname(target), { recursive: true });
        await rename(source, target);
        completed.push([source, target]);
      }
    } catch (error) {
      for (const [source, target] of completed.reverse()) {
        try {
          await rename(target, source);
        } catch {
          // The original transition error remains the primary failure.
        }
      }
      throw error;
    }
  }
}
