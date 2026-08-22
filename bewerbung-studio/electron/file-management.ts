import { access, mkdir, readdir, rename, rm, rmdir } from "node:fs/promises";
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

export const applicationFolderLockedMessage =
  "Bitte schließen Sie alle geöffneten Word-, PDF- oder sonstigen Dateien dieser Bewerbung und speichern Sie den Bereich „Termine“ anschließend erneut.";

export class ApplicationFolderLockedError extends Error {
  readonly code = "APPLICATION_FOLDER_LOCKED";

  constructor() {
    super(applicationFolderLockedMessage);
    this.name = "ApplicationFolderLockedError";
  }
}

export const isApplicationFolderLockError = (error: unknown) => {
  if (!error || typeof error !== "object" || !("code" in error)) return false;
  return ["EACCES", "EBUSY", "EPERM"].includes(String(error.code));
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

  async allocateApplicationFolderName(
    companyName: string,
    positionName: string,
    date = new Date(),
  ) {
    const companyDateFolder = `${sanitizeFileName(companyName)}_${formatLocalDate(date)}`;
    const positionFolder = sanitizeFileName(positionName);
    for (let suffix = 1; suffix < 10_000; suffix += 1) {
      const uniquePositionFolder =
        suffix === 1 ? positionFolder : `${positionFolder}_${suffix}`;
      const folderName = path.join(companyDateFolder, uniquePositionFolder);
      const occupied = await Promise.all([
        pathExists(this.applicationDataPath(folderName)),
        pathExists(path.join(this.paths.anschreibenDocuments, folderName)),
        pathExists(path.join(this.paths.lebenslaufDocuments, folderName)),
        pathExists(this.rejectionPath(folderName)),
      ]);
      if (occupied.some(Boolean)) continue;
      try {
        await mkdir(path.join(this.paths.anschreibenDocuments, folderName), {
          recursive: true,
        });
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

  private applicationArtifactPaths(folderName: string) {
    const roots = [
      this.paths.applicationsData,
      this.paths.anschreibenDocuments,
      this.paths.lebenslaufDocuments,
      this.paths.absagenRoot,
    ];
    return roots.map((root) => {
      const resolvedRoot = path.resolve(root);
      const candidate = path.resolve(resolvedRoot, folderName);
      if (candidate === resolvedRoot || !isPathInside(resolvedRoot, candidate)) {
        throw new Error("Ungültiger Bewerbungsordner.");
      }
      return { root: resolvedRoot, path: candidate };
    });
  }

  private async applicationFolderOccupied(folderName: string) {
    const occupied = await Promise.all(
      this.applicationArtifactPaths(folderName).map(({ path: candidate }) =>
        pathExists(candidate),
      ),
    );
    return occupied.some(Boolean);
  }

  async relocateApplicationFolders(application: Application, date: Date) {
    const companyDateFolder = `${sanitizeFileName(application.company.name)}_${formatLocalDate(date)}`;
    const positionFolder = sanitizeFileName(application.job.title);
    let targetFolderName = "";
    for (let suffix = 1; suffix < 10_000; suffix += 1) {
      const uniquePositionFolder =
        suffix === 1 ? positionFolder : `${positionFolder}_${suffix}`;
      const candidate = path.join(companyDateFolder, uniquePositionFolder);
      if (candidate === application.folderName) return application.folderName;
      if (!(await this.applicationFolderOccupied(candidate))) {
        targetFolderName = candidate;
        break;
      }
    }
    if (!targetFolderName) {
      throw new Error("Für die Bewerbung konnte kein eindeutiger Ordner erstellt werden.");
    }

    const sources = this.applicationArtifactPaths(application.folderName);
    const targets = this.applicationArtifactPaths(targetFolderName);
    const moves = (
      await Promise.all(
        sources.map(async (source, index) => ({
          source,
          target: targets[index],
          exists: await pathExists(source.path),
        })),
      )
    ).filter((move) => move.exists);
    const completed: typeof moves = [];

    try {
      for (const move of moves) {
        if (await pathExists(move.target.path)) {
          throw new Error(`Der Zielordner existiert bereits: ${move.target.path}`);
        }
        await mkdir(path.dirname(move.target.path), { recursive: true });
        await rename(move.source.path, move.target.path);
        completed.push(move);
      }
    } catch (error) {
      for (const move of completed.reverse()) {
        try {
          await mkdir(path.dirname(move.source.path), { recursive: true });
          await rename(move.target.path, move.source.path);
        } catch {
          // The original rename error remains the primary failure.
        }
      }
      await this.removeEmptyArtifactParents(targets);
      if (isApplicationFolderLockError(error)) {
        throw new ApplicationFolderLockedError();
      }
      throw error;
    }

    await this.removeEmptyArtifactParents(sources);
    return targetFolderName;
  }

  private async removeEmptyArtifactParents(
    artifacts: Array<{ root: string; path: string }>,
  ) {
    const parents = new Map(
      artifacts.map(({ root, path: artifactPath }) => [
        path.dirname(artifactPath),
        root,
      ]),
    );
    await Promise.all(
      [...parents].map(async ([parent, root]) => {
        if (parent === root || !isPathInside(root, parent)) return;
        try {
          await rmdir(parent);
        } catch (error) {
          const code =
            typeof error === "object" && error && "code" in error
              ? String(error.code)
              : "";
          if (
            !["ENOENT", "ENOTEMPTY", "EEXIST", "EACCES", "EBUSY", "EPERM"].includes(
              code,
            )
          ) {
            throw error;
          }
        }
      }),
    );
  }

  private async containsNestedApplications(folderName: string) {
    const dataRoot = this.applicationDataPath(folderName);
    let entries;
    try {
      entries = await readdir(dataRoot, { withFileTypes: true });
    } catch (error) {
      const code =
        typeof error === "object" && error && "code" in error
          ? String(error.code)
          : "";
      if (code === "ENOENT") return false;
      throw error;
    }
    const nestedApplications = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map((entry) =>
          pathExists(path.join(dataRoot, entry.name, "bewerbung.json")),
        ),
    );
    return nestedApplications.some(Boolean);
  }

  async ensureApplicationDataDirectories(application: Application) {
    const dataRoot = this.applicationDataPath(application.folderName);
    await mkdir(path.join(dataRoot, "Stellenanzeige"), { recursive: true });
    return { dataRoot };
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
    if (await this.containsNestedApplications(application.folderName)) {
      throw new Error(
        "Dieser ältere Bewerbungsordner enthält weitere positionsbezogene Bewerbungen und kann nicht als Ganzes verschoben werden.",
      );
    }

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

  async removeApplicationArtifacts(
    application: Pick<Application, "folderName">,
  ) {
    const folderName = application.folderName;
    if (await this.containsNestedApplications(folderName)) {
      throw new Error(
        "Dieser ältere Bewerbungsordner enthält weitere positionsbezogene Bewerbungen und kann nicht als Ganzes gelöscht werden.",
      );
    }
    const roots = [
      this.paths.applicationsData,
      this.paths.anschreibenDocuments,
      this.paths.lebenslaufDocuments,
      this.paths.absagenRoot,
    ];
    const targets = roots.map((root) => {
      const resolvedRoot = path.resolve(root);
      const candidate = path.resolve(root, folderName);
      if (candidate === resolvedRoot || !isPathInside(resolvedRoot, candidate)) {
        throw new Error("Ungültiger Bewerbungsordner.");
      }
      return candidate;
    });

    await Promise.all(
      targets.map((target) => rm(target, { recursive: true, force: true })),
    );
  }
}
