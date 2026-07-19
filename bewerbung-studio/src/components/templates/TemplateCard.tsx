import {
  Copy,
  FileOutput,
  FolderOpen,
  Heart,
  Info,
  LibraryBig,
  Trash2,
} from "lucide-react";
import { templateTypeLabels } from "../../features/templates/template.constants";
import type { DocumentTemplate } from "../../features/templates/template.types";

const fileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function TemplateCard({
  template,
  onUse,
  onDetails,
  onOpen,
  onOpenFolder,
  onDuplicate,
  onFavorite,
  onCopyToMuster,
  onRemove,
}: {
  template: DocumentTemplate;
  onUse: () => void;
  onDetails: () => void;
  onOpen: () => void;
  onOpenFolder: () => void;
  onDuplicate: () => void;
  onFavorite: () => void;
  onCopyToMuster: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="surface managed-template-card">
      <button
        className="managed-template-preview"
        type="button"
        aria-label={`${template.name} Vorschau öffnen`}
        onClick={onDetails}
      >
        {template.previewDataUrl ? (
          <img src={template.previewDataUrl} alt={`${template.name} Vorschau`} />
        ) : (
          <FileOutput size={38} />
        )}
        <span>{template.extension.slice(1).toUpperCase()}</span>
      </button>
      <div className="managed-template-body">
        <header>
          <div>
            <small>
              {templateTypeLabels[template.documentType]} ·{" "}
              {template.source === "existing-document"
                ? "Eigenes Dokument"
                : "Muster"}
            </small>
            <h3>{template.name}</h3>
          </div>
          <button
            className={`icon-button ${template.isFavorite ? "favorite" : ""}`}
            type="button"
            title={
              template.isFavorite
                ? "Aus Favoriten entfernen"
                : "Als Favorit markieren"
            }
            onClick={onFavorite}
          >
            <Heart size={17} fill={template.isFavorite ? "currentColor" : "none"} />
          </button>
        </header>
        <p>
          {template.description ||
            `${template.extension.toUpperCase()} · ${fileSize(template.fileSize)}`}
        </p>
        {template.tags.length ? (
          <div className="managed-template-tags">
            {template.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
        <div className="managed-template-primary-actions">
          <button className="button primary small-button" type="button" onClick={onUse}>
            <FileOutput size={15} /> Vorlage verwenden
          </button>
          <button className="button secondary small-button" type="button" onClick={onOpen}>
            Öffnen
          </button>
        </div>
        <div className="managed-template-secondary-actions">
          <button type="button" onClick={onDuplicate}>
            <Copy size={14} /> Duplizieren
          </button>
          <button type="button" onClick={onOpenFolder}>
            <FolderOpen size={14} /> Dateipfad öffnen
          </button>
          <button type="button" onClick={onDetails}>
            <Info size={14} /> Details
          </button>
          {template.source === "existing-document" ? (
            <button type="button" onClick={onCopyToMuster}>
              <LibraryBig size={14} /> Zu Muster hinzufügen
            </button>
          ) : null}
          {template.source === "muster-folder" && !template.isSystemTemplate ? (
            <button className="danger-link" type="button" onClick={onRemove}>
              <Trash2 size={14} /> Löschen
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
