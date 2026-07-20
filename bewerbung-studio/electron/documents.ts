import type { ApplicantProfile, Application } from "../src/shared/schema";
import {
  createResumePagePlan,
  getLetterPageStatus,
  type ResumePagePlan,
  zweispaltigPaginationOptions,
} from "../src/shared/documentPagination";
import {
  fontSizeToPt,
  getDocumentFont,
  lineHeightLevelToValue,
  marginLevelToMm,
  programmingLanguageBackgroundTokens,
  sectionSpacingLevelToMm,
  type DocumentDesignSettings,
} from "../src/shared/documentDesign";
import { getProfileMediaSource } from "../src/shared/profileMedia";
import { getReadableTextColor, getTemplate } from "../src/shared/templates";
import {
  knowledgeLevelLabels,
  knowledgeLevelScores,
} from "../src/features/knowledge/knowledge.constants";
import { ensureKnowledgeSection } from "../src/features/knowledge/knowledge.service";
import type {
  KnowledgeCategory,
  KnowledgeDisplayMode,
  KnowledgeItem,
} from "../src/features/knowledge/knowledge.types";
import {
  formatKnowledgeItem,
  visibleKnowledgeItems,
} from "../src/features/knowledge/knowledge.utils";

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const externalHref = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const withoutScheme = trimmed.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "");
  return `https://${withoutScheme}`;
};

const uniqueValues = (values: string[]) =>
  Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));

const formatDateRange = (from: string, to: string) => {
  const start = from.trim();
  const end = to.trim();
  if (!start) return end;
  if (!end) return start;
  return `${start} – ${end}`;
};

const programmingBackgroundMarkup = (
  settings: DocumentDesignSettings,
  atsMode: boolean,
) =>
  settings.backgroundId === "programming-languages-bg" && !atsMode
    ? `<div class="document-background-layer programming-languages-layer" aria-hidden="true">${programmingLanguageBackgroundTokens
        .map((token) => `<span>${escapeHtml(token)}</span>`)
        .join("")}</div>`
    : "";

const renderKnowledgeItems = (
  items: KnowledgeItem[],
  category: KnowledgeCategory,
  mode: KnowledgeDisplayMode,
) => {
  const visible = visibleKnowledgeItems(items);
  if (!visible.length) return "";
  const formatted = visible.map((item) =>
    formatKnowledgeItem(
      item,
      category.showLevels,
      category.showYearsOfExperience,
      mode,
    ),
  );
  if (mode === "comma-separated")
    return `<p class="knowledge-comma">${formatted.map(escapeHtml).join(", ")}</p>`;
  if (mode === "tags")
    return `<div class="knowledge-tags">${formatted.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`;
  if (mode === "level-bars" || mode === "level-dots")
    return `<div class="knowledge-level-list ${mode}">${visible
      .map((item) => {
        const score = knowledgeLevelScores[item.level];
        const label =
          item.level === "none" ? "" : knowledgeLevelLabels[item.level];
        const years =
          category.showYearsOfExperience &&
          item.yearsOfExperience !== undefined
            ? ` · ${item.yearsOfExperience} Jahre`
            : "";
        const indicator =
          mode === "level-bars"
            ? `<i class="knowledge-level-bar"><b style="width:${score * 20}%"></b></i>`
            : `<i class="knowledge-level-dots">${"●".repeat(score)}<em>${"○".repeat(5 - score)}</em></i>`;
        return `<div class="knowledge-level-row"><span>${escapeHtml(item.name)}</span>${indicator}<small>${escapeHtml(label + years)}</small></div>`;
      })
      .join("")}</div>`;
  const tag = mode === "bullets" ? "ul" : "div";
  const entries = formatted
    .map((item) =>
      mode === "bullets"
        ? `<li>${escapeHtml(item)}</li>`
        : `<p>${escapeHtml(item)}</p>`,
    )
    .join("");
  return `<${tag} class="knowledge-lines ${mode}">${entries}</${tag}>`;
};

const renderKnowledgeSection = (
  profile: ApplicantProfile | undefined,
  atsMode: boolean,
) => {
  if (!profile) return "";
  const section = ensureKnowledgeSection(
    profile.knowledgeSection,
    profile.skills,
  );
  if (!section.isVisible) return "";
  const categories = section.categories
    .filter((category) => category.isVisible)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((category) => {
      const mode = atsMode ? "comma-separated" : category.displayMode;
      const direct = renderKnowledgeItems(category.items, category, mode);
      const subcategories = category.subcategories
        .filter((subcategory) => subcategory.isVisible)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map((subcategory) => {
          const items = renderKnowledgeItems(
            subcategory.items,
            category,
            atsMode
              ? "comma-separated"
              : subcategory.displayMode ?? mode,
          );
          return items
            ? `<div class="knowledge-subcategory"><h5>${escapeHtml(subcategory.title)}</h5>${items}</div>`
            : "";
        })
        .join("");
      if (!direct && !subcategories) return "";
      return `<div class="knowledge-category"><h4>${escapeHtml(category.title)}</h4>${category.subtitle ? `<small>${escapeHtml(category.subtitle)}</small>` : ""}${direct}${subcategories}</div>`;
    })
    .join("");
  const sectionTitle = atsMode ? "Kenntnisse" : section.title;
  return categories
    ? `<section class="knowledge-section"><h3>${escapeHtml(sectionTitle)}</h3>${categories}</section>`
    : "";
};

const fullName = (profile?: ApplicantProfile) =>
  profile ? `${profile.firstName} ${profile.lastName}`.trim() : "Vorname Nachname";

const contactName = (application: Application) =>
  [application.contact.firstName, application.contact.lastName]
    .filter(Boolean)
    .join(" ");

const salutation = (application: Application) => {
  const name = contactName(application);
  if (!name) return "Sehr geehrte Damen und Herren";
  if (application.contact.salutation === "Frau") return `Sehr geehrte Frau ${application.contact.lastName}`;
  if (application.contact.salutation === "Herr") return `Sehr geehrter Herr ${application.contact.lastName}`;
  return `Guten Tag ${name}`;
};

const addressBlock = (application: Application) =>
  [
    application.company.name,
    contactName(application),
    application.company.street,
    `${application.company.postalCode} ${application.company.city}`.trim(),
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>");

const senderLine = (profile?: ApplicantProfile) =>
  profile
    ? [
        fullName(profile),
        profile.street,
        `${profile.postalCode} ${profile.city}`.trim(),
        profile.phone,
        profile.email,
      ]
        .filter(Boolean)
        .map(escapeHtml)
        .join(" · ")
    : "Bitte unter Profile Ihre Absenderdaten ergänzen.";

const documentCss = (
  accent: string,
  secondary: string,
  onSecondary: string,
  settings: DocumentDesignSettings,
) => {
  const bodyFont = getDocumentFont(settings.fontId);
  const headingFont = getDocumentFont(settings.headingFontId);
  const margin = marginLevelToMm[settings.marginLevel];
  const sectionGap = sectionSpacingLevelToMm[settings.sectionSpacingLevel];
  const bodySize = fontSizeToPt[settings.fontSize];
  const lineHeight = lineHeightLevelToValue[settings.lineHeightLevel];

  return `
  :root{--accent:${accent};--secondary:${secondary};--on-secondary:${onSecondary};--ink:#172026;--muted:#5c6870;--line:#d9e0e3;--doc-margin:${margin}mm;--section-gap:${sectionGap}mm;--body-size:${bodySize}pt;--body-line:${lineHeight};--body-font:${bodyFont.family};--heading-font:${headingFont.family};--heading-weight:${headingFont.headingWeight}}
  @page{size:A4;margin:0}
  *{box-sizing:border-box}body{margin:0;background:#eef1f1;color:var(--ink);font-family:var(--body-font)}
  .page{width:210mm;height:297mm;min-height:297mm;max-height:297mm;margin:0 auto 8mm;overflow:hidden;background:#fff;break-after:page;page-break-after:always;position:relative;print-color-adjust:exact;-webkit-print-color-adjust:exact}
  .page:last-child{break-after:auto;page-break-after:auto}.page-content{position:relative;z-index:1;width:100%;height:100%;transform-origin:top left}.standard-page-content{padding:var(--doc-margin)}
  .document-background-layer{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;user-select:none}.programming-languages-layer{color:color-mix(in srgb,var(--accent),#70808a 45%);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;opacity:.105}.programming-languages-layer:before,.programming-languages-layer:after{position:absolute;border:1px solid currentColor;border-radius:4mm;content:""}.programming-languages-layer:before{width:54mm;height:37mm;right:-15mm;top:-9mm}.programming-languages-layer:after{width:61mm;height:42mm;left:-20mm;bottom:-12mm}.programming-languages-layer span{position:absolute;padding:1.2mm 2.3mm;border:1px solid currentColor;border-radius:2.5mm;font-size:7.8pt;font-weight:650;letter-spacing:.025em;white-space:nowrap}.programming-languages-layer span:nth-child(1){right:9mm;top:12mm}.programming-languages-layer span:nth-child(2){right:31mm;top:23mm}.programming-languages-layer span:nth-child(3){right:7mm;top:38mm}.programming-languages-layer span:nth-child(4){right:26mm;top:52mm}.programming-languages-layer span:nth-child(5){right:8mm;top:68mm}.programming-languages-layer span:nth-child(6){left:8mm;bottom:77mm}.programming-languages-layer span:nth-child(7){left:25mm;bottom:62mm}.programming-languages-layer span:nth-child(8){left:7mm;bottom:47mm}.programming-languages-layer span:nth-child(9){left:31mm;bottom:33mm}.programming-languages-layer span:nth-child(10){left:8mm;bottom:18mm}.programming-languages-layer span:nth-child(11){left:51mm;bottom:13mm}.programming-languages-layer span:nth-child(12){right:8mm;bottom:16mm}.programming-languages-layer span:nth-child(13){right:26mm;bottom:31mm}
  .rule{height:4px;background:var(--accent);margin-bottom:22mm}
  .kicker{color:var(--accent);font-size:10pt;text-transform:uppercase;letter-spacing:.16em;font-weight:700}
  h1,h2,h3{font-family:var(--heading-font);font-weight:var(--heading-weight)}h1{font-size:29pt;line-height:1.05;margin:8mm 0 4mm}h2{font-size:14pt;color:var(--accent);margin:8mm 0 3mm}
  h3{font-size:11pt;margin:0 0 1mm}.muted{color:var(--muted)}p,li{font-size:var(--body-size);line-height:var(--body-line)}
  .cover-content{display:flex;flex-direction:column;justify-content:flex-end}.cover-content h1{font-size:36pt;max-width:145mm}
  .contact{padding-top:8mm;border-top:1px solid var(--line)}.sender{font-size:8.5pt;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:2mm}
  .recipient{margin-top:13mm;min-height:35mm}.date{text-align:right}.subject{font-weight:800;font-size:12pt;margin:8mm 0 5mm}
  .signature{margin-top:8mm}.signature-image{display:block;width:auto;max-width:48mm;height:auto;max-height:16mm;margin:2mm 0 1mm;object-fit:contain;object-position:left center}
  .letter-content{padding:var(--doc-margin)}.letter-content>p:not(.date,.subject){margin:0 0 calc(var(--section-gap) * .72)}
  .letter-compact .letter-content{padding:16mm 20mm}.letter-compact .rule{margin-bottom:15mm}.letter-compact .recipient{margin-top:10mm;min-height:30mm}.letter-compact p{font-size:9.6pt;line-height:1.42}.letter-compact .signature{margin-top:6mm}
  .letter-dense .letter-content{padding:14mm 18mm}.letter-dense .rule{height:3px;margin-bottom:10mm}.letter-dense .recipient{margin-top:7mm;min-height:24mm}.letter-dense p{font-size:9pt;line-height:1.32}.letter-dense .letter-content>p:not(.date,.subject){margin-bottom:2.6mm}.letter-dense .subject{margin:5mm 0 3mm}.letter-dense .signature{margin-top:4mm}
  .cv-page{padding:0;display:grid;grid-template:"header header" auto "main side" 1fr/64% 36%;overflow:hidden}
  .cv-header{grid-area:header;display:flex;align-items:center;justify-content:space-between;gap:9mm;padding:var(--doc-margin) var(--doc-margin) calc(var(--doc-margin) * .6)}
  .cv-header h1{margin:1mm 0 0;font-size:25pt;line-height:1;letter-spacing:.015em;text-transform:uppercase}
  .cv-header h2{margin:2mm 0;color:var(--accent);font-size:14pt;font-weight:500}
  .cv-contact-line{margin:0;color:var(--muted);font-size:8.4pt}
  .cv-avatar{display:grid;width:24mm;height:24mm;flex:0 0 auto;place-items:center;border:2px solid color-mix(in srgb,var(--accent),white 60%);border-radius:50%;color:var(--accent);background:color-mix(in srgb,var(--accent),white 89%);font-size:16pt;font-weight:800}.cv-avatar.has-image{overflow:hidden;padding:0}.cv-avatar-image{display:block;width:100%;height:100%;object-fit:cover}
  .cv-primary{grid-area:main;min-width:0;padding:0 calc(var(--doc-margin) * .65) var(--doc-margin) var(--doc-margin)}
  .cv-secondary{grid-area:side;min-width:0;padding:2mm calc(var(--doc-margin) * .75) var(--doc-margin) calc(var(--doc-margin) * .35)}
  .cv-page section{margin-top:var(--section-gap)}.cv-page section>h3{margin:0 0 3mm;padding-bottom:2mm;border-bottom:1px solid #aeb6b5;color:#535c5b;font-size:11pt;font-weight:600;letter-spacing:.025em;text-transform:uppercase}
  .cv-page p,.cv-page li{font-size:var(--body-size);line-height:var(--body-line)}.cv-entry{margin:0 0 calc(var(--section-gap) * .8)}.cv-entry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:5mm}
  .cv-entry-head strong{color:color-mix(in srgb,var(--accent),#172125 24%);font-size:11.5pt}.cv-entry-head p{margin:1mm 0;color:var(--accent);font-weight:600}
  .cv-entry-head small{flex:0 0 31mm;color:var(--muted);font-size:8pt;line-height:1.35;text-align:right}.cv-entry ul,.cv-secondary ul{margin:1mm 0;padding-left:5mm}
  .skills,.knowledge-tags{display:flex;flex-wrap:wrap;gap:1.5mm}.chip,.knowledge-tags span{padding:1mm 2mm;border-bottom:1px solid #b6bdbc;color:color-mix(in srgb,var(--accent),#202827 25%);font-size:8.2pt}
  .knowledge-category{margin-bottom:3mm}.knowledge-category h4,.knowledge-subcategory h5{font-size:9pt;margin:0 0 1mm;color:var(--accent)}.knowledge-category>small{display:block;margin:-.5mm 0 1mm}.knowledge-comma,.knowledge-lines p{margin:0 0 1mm}.knowledge-lines{margin:0;padding-left:4mm}.knowledge-subcategory{margin-top:1.5mm}.knowledge-level-row{display:grid;grid-template-columns:minmax(20mm,1fr) 18mm;gap:.8mm 2mm;margin-bottom:1mm}.knowledge-level-row small{grid-column:1/-1;font-size:7pt}.knowledge-level-bar{height:1.4mm;background:#dfe5e4;align-self:center}.knowledge-level-bar b{display:block;height:100%;background:var(--accent)}.knowledge-level-dots{font-style:normal;color:var(--accent);letter-spacing:.4mm}.knowledge-level-dots em{font-style:normal;color:#c9cfce}
  .language{display:flex;justify-content:space-between;gap:4mm;margin:2mm 0}.language i{color:var(--accent);font-size:7pt;font-style:normal;letter-spacing:1px;white-space:nowrap}.language-plain{justify-content:flex-start}
  .side-avatar{display:none;margin:0 auto 8mm}
  .cv-sidebar-right{grid-template:"header side" auto "main side" 1fr/66% 34%}.cv-sidebar-left{grid-template:"side header" auto "side main" 1fr/35% 65%}
  .cv-sidebar-right .cv-secondary,.cv-sidebar-left .cv-secondary{padding:17mm 10mm 14mm;color:var(--on-secondary);background:var(--secondary)}
  .cv-sidebar-right .cv-secondary section>h3,.cv-sidebar-left .cv-secondary section>h3{border-bottom-color:color-mix(in srgb,var(--on-secondary),transparent 25%);color:var(--on-secondary)}
  .cv-sidebar-right .cv-secondary p,.cv-sidebar-right .cv-secondary li,.cv-sidebar-left .cv-secondary p,.cv-sidebar-left .cv-secondary li{color:var(--on-secondary)}
  .cv-sidebar-right .cv-secondary .chip,.cv-sidebar-left .cv-secondary .chip{border-color:color-mix(in srgb,var(--on-secondary),transparent 45%);color:var(--on-secondary)}
  .cv-sidebar-right .language i,.cv-sidebar-left .language i{color:var(--on-secondary)}
  .cv-sidebar-right .cv-header>.cv-avatar,.cv-sidebar-left .cv-header>.cv-avatar{display:none}.cv-sidebar-right .side-avatar,.cv-sidebar-left .side-avatar{display:grid;border-color:color-mix(in srgb,var(--on-secondary),transparent 35%);color:var(--on-secondary);background:color-mix(in srgb,var(--on-secondary),transparent 83%)}
  .cv-sidebar-right .cv-header{padding-right:9mm}.cv-sidebar-left .cv-header{padding-left:10mm}.cv-sidebar-left .cv-primary{padding-right:14mm;padding-left:10mm}
  .cv-centered,.cv-minimal{grid-template:"header" auto "side" auto "main" 1fr/1fr}.cv-centered .cv-header{justify-content:center;text-align:center}.cv-centered .cv-contact-line{text-align:center}
  .cv-centered .cv-header>.cv-avatar,.cv-minimal .cv-header>.cv-avatar{display:none}.cv-centered .cv-secondary{display:grid;grid-template-columns:repeat(3,1fr);gap:6mm;padding:0 15mm 3mm}.cv-centered .cv-secondary section{margin-top:3mm}.cv-centered .cv-secondary section:first-of-type{grid-column:1/-1}
  .cv-centered .cv-primary,.cv-minimal .cv-primary{padding:0 15mm 14mm}.cv-minimal .cv-header{padding-bottom:5mm;border-bottom:1px solid #cfd4d3}.cv-minimal .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:7mm;padding:0 15mm 2mm}.cv-minimal .cv-secondary section{margin-top:5mm}
  .cv-split-clean .cv-secondary,.cv-bold-grid .cv-secondary{margin:0 12mm 14mm 0;padding:0 0 0 6mm;border-left:1px solid #d8dddc}.cv-split-clean .cv-secondary{background:linear-gradient(180deg,var(--secondary),white 70%)}
  .cv-bold-grid section>h3{border-bottom:2px solid var(--accent);color:color-mix(in srgb,var(--accent),#14202a 15%);font-size:13pt;font-weight:800}.cv-bold-grid .cv-header h1{color:color-mix(in srgb,var(--accent),#15202a 15%);font-weight:850}
  .cv-compact .cv-header{padding-top:11mm;padding-bottom:6mm}.cv-compact section{margin-top:5mm}.cv-compact .cv-entry{margin-bottom:3.5mm}.cv-compact p,.cv-compact li{font-size:8.15pt;line-height:1.3}
  .cv-dense .cv-header{padding-top:9mm;padding-bottom:4mm}.cv-dense .cv-header h1{font-size:22pt}.cv-dense .cv-header h2{font-size:12pt}.cv-dense section{margin-top:3.5mm}.cv-dense section>h3{margin-bottom:2mm;padding-bottom:1mm;font-size:10pt}.cv-dense .cv-entry{margin-bottom:2.5mm}.cv-dense p,.cv-dense li{font-size:7.6pt;line-height:1.24}.cv-dense .cv-entry-head strong{font-size:10pt}
  .cv-continuation{grid-template:"header" auto "main" 1fr/1fr}.cv-continuation .cv-header{padding:11mm 15mm 6mm;border-bottom:1px solid var(--line)}.cv-continuation .cv-header h1{font-size:18pt;margin:0}.cv-continuation .cv-header h2,.cv-continuation .cv-avatar{display:none}.cv-continuation .cv-primary{padding:0 15mm 14mm}.cv-continuation .cv-secondary{display:none}
  .column-single{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-single .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:5mm;padding:0 var(--doc-margin)}.column-single .cv-secondary section{margin-top:3mm}.column-single .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}
  .column-two-column-left-wide{grid-template:"header header" auto "main side" 1fr/65% 35%}.column-two-column-right-wide{grid-template:"side header" auto "side main" 1fr/36% 64%}.column-two-column-right-wide .cv-secondary{padding:var(--doc-margin) calc(var(--doc-margin) * .55);background:var(--secondary);color:var(--on-secondary)}.column-two-column-right-wide .cv-secondary h3,.column-two-column-right-wide .cv-secondary p,.column-two-column-right-wide .cv-secondary li,.column-two-column-right-wide .cv-secondary .chip{color:var(--on-secondary)}
  .column-two-column-equal{grid-template:"header header" auto "main side" 1fr/50% 50%}.column-left-sidebar{grid-template:"side header" auto "side main" 1fr/35% 65%}.column-right-sidebar{grid-template:"header side" auto "main side" 1fr/65% 35%}.column-left-sidebar .cv-secondary,.column-right-sidebar .cv-secondary{padding:var(--doc-margin) calc(var(--doc-margin) * .55);background:var(--secondary);color:var(--on-secondary)}.column-left-sidebar .cv-secondary h3,.column-left-sidebar .cv-secondary p,.column-left-sidebar .cv-secondary li,.column-left-sidebar .cv-secondary .chip,.column-right-sidebar .cv-secondary h3,.column-right-sidebar .cv-secondary p,.column-right-sidebar .cv-secondary li,.column-right-sidebar .cv-secondary .chip{color:var(--on-secondary)}
  .column-three-column{grid-template:"header header" auto "main side" 1fr/56% 44%}.column-three-column .cv-secondary{display:grid;grid-template-columns:1fr 1fr;align-content:start;gap:0 5mm}.column-three-column .cv-secondary section:first-of-type{grid-column:1/-1}
  .column-timeline{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-timeline .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:5mm;padding:0 var(--doc-margin)}.column-timeline .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}.column-timeline .cv-entry{padding-left:6mm;border-left:2px solid var(--accent);position:relative}.column-timeline .cv-entry:before{position:absolute;left:-2.3mm;top:1mm;width:3.5mm;height:3.5mm;border:1mm solid white;border-radius:50%;background:var(--accent);content:""}
  .column-compact-ats{grid-template:"header" auto "side" auto "main" 1fr/1fr}.column-compact-ats .cv-avatar{display:none}.column-compact-ats .cv-header{padding-bottom:5mm;border-bottom:1px solid var(--line)}.column-compact-ats .cv-secondary{display:grid;grid-template-columns:2fr 1fr 1fr;gap:4mm;padding:0 var(--doc-margin)}.column-compact-ats .cv-primary{padding:0 var(--doc-margin) var(--doc-margin)}.column-compact-ats section{margin-top:3.5mm}.column-compact-ats p,.column-compact-ats li{font-size:8.2pt;line-height:1.28}
  .background-soft{background:color-mix(in srgb,var(--accent),white 96%)}.background-geometric{background-color:#fff;background-image:linear-gradient(135deg,color-mix(in srgb,var(--accent),transparent 95%) 25%,transparent 25%),linear-gradient(315deg,color-mix(in srgb,var(--accent),transparent 96%) 25%,transparent 25%);background-size:28mm 28mm}.background-hexagons{background-color:#fff;background-image:radial-gradient(circle at 25% 25%,color-mix(in srgb,var(--accent),transparent 92%) 1px,transparent 1.5px);background-size:8mm 8mm}.background-waves{background:radial-gradient(ellipse at 100% 0,color-mix(in srgb,var(--accent),transparent 88%) 0 18%,transparent 18.2% 25%,color-mix(in srgb,var(--accent),transparent 95%) 25.2% 31%,transparent 31.2%),#fff}.background-lines{background-color:#fff;background-image:linear-gradient(color-mix(in srgb,var(--accent),transparent 96%) 1px,transparent 1px);background-size:100% 8mm}.background-dots{background-color:#fff;background-image:radial-gradient(color-mix(in srgb,var(--accent),transparent 88%) .55px,transparent .7px);background-size:5mm 5mm}.background-abstract{background:radial-gradient(ellipse at 105% 15%,color-mix(in srgb,var(--accent),transparent 86%) 0 12%,transparent 12.2% 18%,color-mix(in srgb,var(--secondary),transparent 94%) 18.2% 24%,transparent 24.2%),#fff}.background-corner{background:linear-gradient(135deg,color-mix(in srgb,var(--accent),white 28%) 0 13%,transparent 13.2%),#fff}.background-pastel-gradient{background:linear-gradient(145deg,color-mix(in srgb,var(--accent),white 93%),#fff 52%,color-mix(in srgb,var(--secondary),white 94%))}.background-top-band{background:linear-gradient(180deg,color-mix(in srgb,var(--accent),white 80%) 0 24mm,#fff 24.2mm)}.background-bottom-band{background:linear-gradient(0deg,color-mix(in srgb,var(--accent),white 82%) 0 18mm,#fff 18.2mm)}
  .page-number{position:absolute;right:10mm;bottom:7mm;color:var(--muted);font-size:7.5pt}
  .cv-entry,.cv-page section,.signature{break-inside:avoid;page-break-inside:avoid}.cv-page section>h3{break-after:avoid;page-break-after:avoid}
  @media print{body{background:#fff}.page{margin:0}.no-print-background{background:#fff!important}.no-print-background .document-background-layer{display:none!important}}
`;
};

const elegantDocumentCss = `
  .elegant-pdf{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;--elegant-sidebar-muted:#e2e9ef;display:grid;grid-template-columns:minmax(0,140mm) 70mm;width:100%;height:100%;color:var(--elegant-text);background:#fff;font-family:var(--body-font)}
  .elegant-pdf *{box-sizing:border-box}
  .elegant-pdf-main{position:relative;min-width:0;height:100%;padding:max(14mm,calc(var(--doc-margin) - 2mm)) max(10mm,calc(var(--doc-margin) - 6mm)) max(13mm,calc(var(--doc-margin) - 4mm)) var(--doc-margin);overflow:hidden;background:#fff}
  .elegant-pdf-header{position:relative;padding-bottom:5mm;border-bottom:.35mm solid var(--elegant-line)}
  .elegant-pdf-header:after{position:absolute;bottom:-.35mm;left:0;width:27mm;height:.7mm;background:var(--accent);content:""}
  .elegant-pdf-header .kicker{margin:0 0 2.2mm;font-size:7.7pt}
  .elegant-pdf-header h1{margin:0;color:var(--elegant-heading);font-size:22pt;font-weight:500;letter-spacing:.01em;line-height:1.05;text-transform:uppercase;overflow-wrap:anywhere}
  .elegant-pdf-header h2{margin:2mm 0 0;color:var(--accent);font-size:12pt;font-weight:400;line-height:1.25;overflow-wrap:anywhere}
  .elegant-pdf-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2mm 6mm;margin:3.3mm 0 0;color:var(--elegant-text);font-size:8pt;font-style:normal;line-height:1.3}
  .elegant-pdf-contacts a,.elegant-pdf-contacts span{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:1.5mm;min-width:0;color:inherit;text-decoration:none}
  .elegant-pdf-contacts strong{color:var(--elegant-heading)}
  .elegant-pdf-contacts i{min-width:0;font-style:normal;overflow-wrap:anywhere}
  .elegant-pdf-section{margin-top:var(--section-gap)}
  .elegant-pdf-section>h3,.elegant-pdf-ats .knowledge-section>h3{display:flex;align-items:baseline;gap:2.5mm;margin:0 0 3.2mm;color:var(--elegant-heading);font-size:12pt;font-weight:500;letter-spacing:.055em;line-height:1.1;text-transform:uppercase}
  .elegant-pdf-section>h3:after,.elegant-pdf-ats .knowledge-section>h3:after{flex:1;height:.3mm;background:linear-gradient(90deg,var(--accent),var(--elegant-line));content:""}
  .elegant-pdf-list{display:flex;flex-direction:column;gap:5mm}
  .elegant-pdf-entry{break-inside:avoid;page-break-inside:avoid}
  .elegant-pdf-entry-head{display:grid;grid-template-columns:minmax(0,1fr) max-content;gap:5mm;align-items:start}
  .elegant-pdf-entry-head h4{margin:0;color:var(--elegant-heading);font-family:var(--heading-font);font-size:11pt;font-weight:500;line-height:1.2;overflow-wrap:anywhere}
  .elegant-pdf-entry-head p{margin:.8mm 0 0;color:var(--accent);font-size:11pt;font-weight:400;line-height:1.2;overflow-wrap:anywhere}
  .elegant-pdf-entry-meta{min-width:24mm;color:var(--elegant-muted);font-size:8pt;line-height:1.3;text-align:right}
  .elegant-pdf-entry-meta strong,.elegant-pdf-entry-meta span{display:block}
  .elegant-pdf-entry-meta span{margin-top:.6mm;overflow-wrap:anywhere}
  .elegant-pdf-entry ul{margin:1.8mm 0 0;padding-left:4.5mm}
  .elegant-pdf-entry li{margin:.6mm 0;padding-left:.4mm;color:var(--elegant-text);font-size:var(--body-size);line-height:var(--body-line)}
  .elegant-pdf-entry li::marker{color:var(--accent)}
  .elegant-pdf-sidebar{display:flex;flex-direction:column;gap:var(--section-gap);min-width:0;height:100%;padding:max(13mm,calc(var(--doc-margin) - 3mm)) max(12mm,calc(var(--doc-margin) - 5mm));overflow:hidden;color:#fff;background:var(--secondary)}
  .elegant-pdf-photo{display:block;width:27mm;height:27mm;margin:0 auto 12mm;overflow:hidden;border-radius:1.5mm;background:color-mix(in srgb,var(--secondary),white 12%);object-fit:cover}
  .elegant-pdf-sidebar section{margin:0;break-inside:avoid;page-break-inside:avoid}
  .elegant-pdf-sidebar section>h3{position:relative;margin:0 0 2.4mm;padding-bottom:1.6mm;border:0;color:#fff;font-size:11.5pt;font-weight:400;letter-spacing:.075em;line-height:1.15;text-transform:uppercase}
  .elegant-pdf-sidebar section>h3:after{position:absolute;bottom:0;left:0;width:14mm;height:.45mm;background:var(--accent);content:""}
  .elegant-pdf-sidebar section p,.elegant-pdf-sidebar section li{color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line)}
  .elegant-pdf-sidebar section p{margin:0}
  .elegant-pdf-sidebar section ul{margin:0;padding-left:4mm}
  .elegant-pdf-sidebar .knowledge-category{margin-bottom:2.5mm}
  .elegant-pdf-sidebar .knowledge-category h4,.elegant-pdf-sidebar .knowledge-subcategory h5{color:#fff;font-size:8.7pt}
  .elegant-pdf-sidebar .knowledge-tags span{border-color:color-mix(in srgb,white,transparent 50%);color:#fff}
  .elegant-pdf-strengths{display:grid;gap:3mm}
  .elegant-pdf-strength{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:2mm;align-items:start}
  .elegant-pdf-strength i{display:grid;width:4mm;height:4mm;place-items:center;border:.25mm solid color-mix(in srgb,white,transparent 45%);border-radius:50%;color:#fff;font-size:7pt;font-style:normal;line-height:1}
  .elegant-pdf-strength span{color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line);overflow-wrap:anywhere}
  .elegant-pdf-continuation .kicker{color:var(--accent);font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
  .elegant-pdf-continuation h2{margin:3.5mm 0 0;color:#fff;font-size:18pt;line-height:1.05;overflow-wrap:anywhere}
  .elegant-pdf-continuation p{margin:1.8mm 0 0;color:var(--elegant-sidebar-muted)}
  .elegant-pdf-continuation hr{width:18mm;height:.6mm;margin:6mm 0;border:0;background:var(--accent)}
  .elegant-pdf-continuation a{display:block;margin-top:1.7mm;color:#fff;font-size:8.3pt;text-decoration:none;overflow-wrap:anywhere}
  .elegant-pdf-footer{position:absolute;right:max(10mm,calc(var(--doc-margin) - 6mm));bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;padding-top:1.7mm;border-top:.25mm solid var(--elegant-line);color:var(--elegant-muted);font-size:7.2pt}
  .elegant-pdf-footer a{color:var(--accent);text-decoration:none}
  .elegant-pdf-footer span:last-child{margin-left:auto}
  .elegant-pdf-ats{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--elegant-text);background:#fff}
  .elegant-pdf-ats .elegant-pdf-header:after{display:none}
  .elegant-pdf-ats .elegant-pdf-contacts{display:block}
  .elegant-pdf-ats .elegant-pdf-contacts a,.elegant-pdf-ats .elegant-pdf-contacts span{display:block;margin-top:.8mm}
  .elegant-pdf-ats .elegant-pdf-contacts strong{margin-right:1.5mm}
  .elegant-pdf-ats .elegant-pdf-entry-head{display:block}
  .elegant-pdf-ats .elegant-pdf-entry-meta{margin-top:.8mm;text-align:left}
  .elegant-pdf-ats .elegant-pdf-entry-meta strong,.elegant-pdf-ats .elegant-pdf-entry-meta span{display:inline}
  .elegant-pdf-ats .elegant-pdf-entry-meta span:before{content:" · "}
  .elegant-pdf-ats .knowledge-section{margin-top:var(--section-gap)}
  .elegant-pdf-ats .knowledge-category h4,.elegant-pdf-ats .knowledge-subcategory h5{color:var(--elegant-heading)}
`;

const zweispaltigDocumentCss = `
  .zweispaltig-pdf{--zweispaltig-heading:#253746;--zweispaltig-text:#3f4d59;--zweispaltig-muted:#6b7782;--zweispaltig-divider:#9db7d1;position:relative;width:100%;height:100%;padding:max(14mm,calc(var(--doc-margin) - 3mm)) var(--doc-margin) max(13mm,calc(var(--doc-margin) - 4mm));overflow:hidden;color:var(--zweispaltig-text);background:#fff;font-family:var(--body-font)}
  .zweispaltig-pdf *{box-sizing:border-box}
  .zweispaltig-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:8mm;padding-bottom:4.5mm;border-bottom:.4mm solid var(--zweispaltig-divider)}
  .zweispaltig-pdf-header h1{margin:0;color:var(--accent);font-size:24pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
  .zweispaltig-pdf-header h2{margin:1.5mm 0 0;color:var(--zweispaltig-heading);font-size:10.5pt;font-weight:650;letter-spacing:.055em;line-height:1.2;text-transform:uppercase;overflow-wrap:anywhere}
  .zweispaltig-pdf-specializations{margin:1.4mm 0 0;color:color-mix(in srgb,var(--accent),#123f72 48%);font-size:8pt;font-weight:650;letter-spacing:.035em;line-height:1.25}
  .zweispaltig-pdf-contacts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.1mm 5mm;margin:3.2mm 0 0;color:var(--zweispaltig-muted);font-size:7.5pt;font-style:normal;line-height:1.2}
  .zweispaltig-pdf-contacts a,.zweispaltig-pdf-contacts span{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:1.2mm;min-width:0;color:inherit;text-decoration:none}
  .zweispaltig-pdf-contacts strong{color:var(--zweispaltig-heading)}
  .zweispaltig-pdf-contacts i{min-width:0;font-style:normal;overflow-wrap:anywhere}
  .zweispaltig-pdf-photo{display:block;width:23mm;height:23mm;overflow:hidden;border:.45mm solid var(--accent);border-radius:50%;background:color-mix(in srgb,var(--accent),white 90%);object-fit:cover}
  .zweispaltig-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.5mm 4mm;padding-bottom:3.5mm}
  .zweispaltig-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--accent);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
  .zweispaltig-pdf-header.compact h1{font-size:15pt}
  .zweispaltig-pdf-header.compact h2{margin:0;color:var(--zweispaltig-muted);font-size:8.6pt}
  .zweispaltig-pdf-columns{display:grid;grid-template-columns:minmax(0,62%) minmax(0,38%)}
  .zweispaltig-pdf-columns.continuation{grid-template-columns:minmax(0,1fr)}
  .zweispaltig-pdf-main{min-width:0;padding-right:8mm}
  .zweispaltig-pdf-sidebar{min-width:0;padding-left:8mm;border-left:.35mm solid var(--zweispaltig-divider)}
  .zweispaltig-pdf-section,.zweispaltig-pdf-sidebar>section,.zweispaltig-pdf-sidebar>.knowledge-section{margin-top:var(--section-gap);break-inside:avoid;page-break-inside:avoid}
  .zweispaltig-pdf-section>h3,.zweispaltig-pdf-sidebar section>h3,.zweispaltig-pdf-ats section>h3,.zweispaltig-pdf-ats .knowledge-section>h3{margin:0 0 2.5mm;padding-bottom:1.2mm;border-bottom:.45mm solid var(--accent);color:var(--accent);font-size:10.5pt;font-weight:750;letter-spacing:.075em;line-height:1.1;text-transform:uppercase}
  .zweispaltig-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}
  .zweispaltig-pdf-list{display:flex;flex-direction:column;gap:4.5mm}
  .zweispaltig-pdf-entry{break-inside:avoid;page-break-inside:avoid}
  .zweispaltig-pdf-entry-head{display:grid;grid-template-columns:minmax(0,1fr) max-content;align-items:start;gap:4mm}
  .zweispaltig-pdf-entry-head h4{margin:0;color:var(--zweispaltig-heading);font-size:9.7pt;font-weight:750;line-height:1.18;overflow-wrap:anywhere}
  .zweispaltig-pdf-entry-head p{margin:.7mm 0 0;color:var(--accent);font-size:8.5pt;font-weight:650;line-height:1.18;overflow-wrap:anywhere}
  .zweispaltig-pdf-entry-meta{min-width:25mm;color:var(--zweispaltig-muted);font-size:7.5pt;line-height:1.25;text-align:right}
  .zweispaltig-pdf-entry-meta strong,.zweispaltig-pdf-entry-meta span{display:block}
  .zweispaltig-pdf-entry-meta span{margin-top:.5mm;overflow-wrap:anywhere}
  .zweispaltig-pdf-entry ul,.zweispaltig-pdf-sidebar ul,.zweispaltig-pdf-ats ul{margin:1.5mm 0 0;padding-left:4.5mm}
  .zweispaltig-pdf-entry li,.zweispaltig-pdf-sidebar li,.zweispaltig-pdf-ats li{margin:.5mm 0;padding-left:.3mm;hyphens:auto;overflow-wrap:break-word}
  .zweispaltig-pdf-entry li::marker,.zweispaltig-pdf-sidebar li::marker,.zweispaltig-pdf-ats li::marker{color:var(--accent)}
  .zweispaltig-pdf-sidebar .knowledge-category{margin-bottom:2.3mm}
  .zweispaltig-pdf-sidebar .knowledge-category h4,.zweispaltig-pdf-sidebar .knowledge-subcategory h5{color:var(--zweispaltig-heading);font-size:8.4pt}
  .zweispaltig-pdf-sidebar .knowledge-section p,.zweispaltig-pdf-sidebar .knowledge-section li{font-size:var(--body-size);line-height:var(--body-line)}
  .zweispaltig-pdf-strengths{display:grid;gap:2.2mm}
  .zweispaltig-pdf-strength{display:grid;grid-template-columns:4.2mm minmax(0,1fr);align-items:start;gap:1.7mm}
  .zweispaltig-pdf-strength i{display:grid;width:3.8mm;height:3.8mm;place-items:center;border-radius:50%;color:#fff;background:var(--accent);font-size:6.8pt;font-style:normal;font-weight:800;line-height:1}
  .zweispaltig-pdf-strength span{color:var(--zweispaltig-heading);font-size:var(--body-size);font-weight:650;line-height:1.25;overflow-wrap:anywhere}
  .zweispaltig-pdf-footer{position:absolute;right:var(--doc-margin);bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;padding-top:1.4mm;border-top:.25mm solid var(--zweispaltig-divider);color:var(--zweispaltig-muted);font-size:7pt}
  .zweispaltig-pdf-footer a{color:var(--accent);text-decoration:none;overflow-wrap:anywhere}
  .zweispaltig-pdf-footer span:last-child{margin-left:auto}
  .zweispaltig-pdf-ats{--zweispaltig-heading:#263641;--zweispaltig-text:#303c44;--zweispaltig-muted:#6b7782;--zweispaltig-divider:#c8d0d6;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--zweispaltig-text);background:#fff}
  .zweispaltig-pdf-ats .zweispaltig-pdf-header{display:block}
  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts{display:block}
  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts a,.zweispaltig-pdf-ats .zweispaltig-pdf-contacts span{display:block;margin-top:.7mm}
  .zweispaltig-pdf-ats .zweispaltig-pdf-contacts strong{margin-right:1.3mm}
  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-head{display:block}
  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta{margin-top:.7mm;text-align:left}
  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta strong,.zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta span{display:inline}
  .zweispaltig-pdf-ats .zweispaltig-pdf-entry-meta span:before{content:" · "}
  .zweispaltig-pdf-ats .zweispaltig-pdf-section>h3,.zweispaltig-pdf-ats section>h3,.zweispaltig-pdf-ats .knowledge-section>h3{border-bottom-color:var(--zweispaltig-divider)}
`;

const zeitgenoessischDocumentCss = `
  .zeit-pdf{--zeit-dark:#075e4e;--zeit-soft:#cbeccd;--zeit-pale:#e5f5ec;--zeit-heading:#374247;--zeit-text:#434d52;--zeit-muted:#687277;--zeit-divider:#d5deda;position:relative;width:100%;height:100%;padding:max(15mm,calc(var(--doc-margin) - 2mm)) var(--doc-margin) max(14mm,calc(var(--doc-margin) - 3mm));overflow:hidden;color:var(--zeit-text);background:#fff;font-family:var(--body-font)}
  .zeit-pdf *{box-sizing:border-box}
  .zeit-pdf-header{display:grid;grid-template-columns:minmax(0,28.4%) minmax(0,6.25%) minmax(0,65.35%);min-height:42mm;margin-bottom:5.5mm}
  .zeit-pdf-identity{grid-column:3;min-width:0;padding-top:4mm}
  .zeit-pdf-identity h1{margin:0;color:var(--zeit-heading);font-size:25pt;font-weight:350;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
  .zeit-pdf-identity h2{display:inline-block;max-width:100%;margin:4mm 0 0;padding:2.6mm 4mm;border-radius:3.8mm;color:var(--zeit-dark);background:var(--zeit-soft);font-size:12.5pt;font-weight:600;letter-spacing:.045em;line-height:1.15;text-transform:uppercase;overflow-wrap:anywhere}
  .zeit-pdf-photo-composition{position:relative;grid-column:1;width:50mm;max-width:100%;height:42mm}
  .zeit-pdf-photo-composition span{position:absolute;display:block}
  .zeit-pdf-photo-pale{top:1mm;left:0;width:42mm;height:39mm;border-radius:48% 52% 45% 55%/57% 40% 60% 43%;background:var(--zeit-pale);transform:rotate(-13deg)}
  .zeit-pdf-photo-soft{top:-2mm;right:0;width:31mm;height:30mm;border-radius:58% 42% 62% 38%/44% 62% 38% 56%;background:color-mix(in srgb,var(--zeit-soft),var(--accent) 15%);transform:rotate(17deg)}
  .zeit-pdf-photo-accent{right:2mm;bottom:0;width:24mm;height:23mm;border-radius:54% 46% 44% 56%/41% 55% 45% 59%;background:var(--accent);opacity:.92;transform:rotate(-11deg)}
  .zeit-pdf-photo{position:absolute;top:3mm;left:5mm;z-index:2;display:block;width:36mm;height:36mm;border:1.8mm solid #fff;border-radius:50%;object-fit:cover}
  .zeit-pdf-header.no-photo{min-height:29mm}.zeit-pdf-header.no-photo .zeit-pdf-identity{grid-column:1/-1;padding-top:0}
  .zeit-pdf-header.compact{display:block;min-height:auto;margin-bottom:5mm;padding-bottom:3mm;border-bottom:.35mm solid var(--zeit-divider)}
  .zeit-pdf-header.compact .zeit-pdf-identity{padding:0}.zeit-pdf-header.compact .kicker{margin:0 0 1.5mm;color:var(--zeit-dark);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
  .zeit-pdf-header.compact h1{font-size:15pt;font-weight:600}.zeit-pdf-header.compact h2{margin:0 0 0 3mm;padding:0;color:var(--zeit-muted);background:transparent;font-size:8.5pt}
  .zeit-pdf-columns{position:relative;display:grid;grid-template-columns:minmax(0,28.4%) minmax(0,6.25%) minmax(0,65.35%)}
  .zeit-pdf-columns:before{position:absolute;top:0;bottom:0;left:31.525%;width:.3mm;background:color-mix(in srgb,var(--accent),transparent 64%);content:""}
  .zeit-pdf-columns.continuation{display:block}.zeit-pdf-columns.continuation:before{display:none}
  .zeit-pdf-left{grid-column:1;min-width:0}.zeit-pdf-main{grid-column:3;min-width:0}
  .zeit-pdf-section,.zeit-pdf-left>section{margin-top:var(--section-gap);break-inside:avoid;page-break-inside:avoid}
  .zeit-pdf-left>section:first-child,.zeit-pdf-main>.zeit-pdf-section:first-child{margin-top:0}
  .zeit-pdf-heading{display:flex;align-items:center;gap:2mm;margin:0 0 3mm;padding-bottom:1.4mm;border-bottom:.45mm solid var(--accent)}
  .zeit-pdf-heading i{display:grid;flex:none;width:6.5mm;height:6.5mm;place-items:center;border-radius:1.5mm;color:var(--zeit-dark);background:var(--zeit-soft);font-size:8pt;font-style:normal;font-weight:700}
  .zeit-pdf-heading h3{margin:0;color:var(--zeit-dark);font-size:11pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
  .zeit-pdf-summary{margin:0;color:var(--zeit-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .zeit-pdf-contacts{display:grid;gap:2.3mm}
  .zeit-pdf-contact{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;min-width:0;color:inherit;font-size:var(--body-size);line-height:1.25;text-decoration:none}
  .zeit-pdf-contact i{color:var(--zeit-dark);font-size:7.2pt;font-style:normal;font-weight:750;text-align:center}.zeit-pdf-contact span{overflow-wrap:anywhere}
  .zeit-pdf-strengths{display:grid;gap:2.5mm}.zeit-pdf-strength{display:grid;grid-template-columns:3.5mm minmax(0,1fr);gap:1.5mm;align-items:start}
  .zeit-pdf-strength i{width:2mm;height:2mm;margin-top:1.2mm;border-radius:50%;background:var(--accent)}.zeit-pdf-strength span{color:var(--zeit-heading);font-size:9pt;font-weight:700;line-height:1.2;overflow-wrap:anywhere}
  .zeit-pdf-languages{display:grid;gap:3mm}.zeit-pdf-language h4{margin:0;color:var(--zeit-dark);font-size:8.8pt;font-weight:750;text-transform:uppercase}.zeit-pdf-language>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2mm;margin-top:1mm;color:var(--zeit-muted);font-size:7.8pt}
  .zeit-pdf-dots{display:flex;gap:.7mm}.zeit-pdf-dots i{display:block;width:1.35mm;height:1.35mm;border:.25mm solid var(--zeit-muted);border-radius:50%}.zeit-pdf-dots i.filled{border-color:var(--zeit-dark);background:var(--zeit-dark)}
  .zeit-pdf-list{display:flex;flex-direction:column;gap:5mm}.zeit-pdf-entry{break-inside:avoid;page-break-inside:avoid}
  .zeit-pdf-entry-top,.zeit-pdf-entry-role{display:grid;grid-template-columns:minmax(0,1fr) minmax(25mm,35mm);gap:5mm;align-items:start}
  .zeit-pdf-entry-top h4,.zeit-pdf-entry-role h5{margin:0;overflow-wrap:anywhere}.zeit-pdf-entry-top h4{color:var(--zeit-dark);font-size:10.5pt;font-weight:750;line-height:1.2;text-transform:uppercase}
  .zeit-pdf-entry-top span,.zeit-pdf-entry-role span{color:var(--zeit-muted);font-size:7.8pt;line-height:1.2;text-align:right;overflow-wrap:anywhere}
  .zeit-pdf-entry-role{margin-top:.8mm}.zeit-pdf-entry-role h5{color:var(--zeit-heading);font-size:9.2pt;font-weight:600;line-height:1.2}
  .zeit-pdf-entry ul,.zeit-pdf-left ul,.zeit-pdf-ats ul{margin:1.5mm 0 0;padding-left:4.5mm}.zeit-pdf-entry li,.zeit-pdf-left li,.zeit-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.zeit-pdf-entry li::marker,.zeit-pdf-left li::marker,.zeit-pdf-ats li::marker{color:var(--accent)}
  .zeit-pdf-footer{position:absolute;right:var(--doc-margin);bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;color:var(--zeit-muted);font-size:7.2pt}.zeit-pdf-footer a{color:var(--zeit-dark);text-decoration:none}.zeit-pdf-footer span:last-child{margin-left:auto}
  .zeit-pdf-ats{--zeit-dark:#075e4e;--zeit-heading:#263a35;--zeit-text:#303c39;--zeit-muted:#687277;--zeit-divider:#ccd6d2;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--zeit-text);background:#fff}
  .zeit-pdf-ats .zeit-pdf-header{display:block;min-height:auto;margin:0;padding-bottom:4mm;border-bottom:.35mm solid var(--zeit-divider)}.zeit-pdf-ats .zeit-pdf-identity{padding:0}.zeit-pdf-ats .zeit-pdf-identity h1{font-size:20pt;font-weight:600}.zeit-pdf-ats .zeit-pdf-identity h2{margin:1.5mm 0 0;padding:0;background:transparent;font-size:10pt}
  .zeit-pdf-ats-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 5mm;margin-top:3mm;font-size:7.8pt;font-style:normal}.zeit-pdf-ats-contacts a,.zeit-pdf-ats-contacts span{color:inherit;text-decoration:none;overflow-wrap:anywhere}
  .zeit-pdf-ats .zeit-pdf-heading i{display:none}.zeit-pdf-ats .zeit-pdf-heading{gap:0;border-bottom-color:var(--zeit-divider)}
  .zeit-pdf-ats>section,.zeit-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.zeit-pdf-ats>section>h3,.zeit-pdf-ats .knowledge-section>h3{margin:0 0 3mm;padding-bottom:1.4mm;border-bottom:.45mm solid var(--zeit-divider);color:var(--zeit-dark);font-size:11pt;font-weight:750;text-transform:uppercase}
`;

const kreativDocumentCss = `
  .kreativ-pdf{--kreativ-dark:#075d4e;--kreativ-text:#465156;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;--kreativ-light:#d7dfdc;--kreativ-inactive:#e1e5e3;--kreativ-margin:calc(var(--doc-margin) + 1mm);position:relative;width:100%;height:100%;overflow:hidden;color:var(--kreativ-text);background:#fff;font-family:var(--body-font)}
  .kreativ-pdf *{box-sizing:border-box}
  .kreativ-pdf-header{position:relative;z-index:3;display:grid;grid-template-columns:minmax(0,1fr) 28mm;align-items:center;gap:10mm;width:100%;height:46mm;padding:8mm var(--kreativ-margin) 6mm;color:#fff;background:var(--accent)}
  .kreativ-pdf-identity{min-width:0}.kreativ-pdf-identity h1{margin:0;color:inherit;font-size:23pt;font-weight:750;letter-spacing:.015em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.kreativ-pdf-identity h2{margin:1.5mm 0 0;color:inherit;font-size:11.5pt;font-weight:650;line-height:1.15;overflow-wrap:anywhere}
  .kreativ-pdf-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 8mm;max-width:118mm;margin:2.5mm 0 0;font-size:7.4pt;font-style:normal;line-height:1.15}.kreativ-pdf-contacts a,.kreativ-pdf-contacts span{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:1.2mm;min-width:0;color:inherit;text-decoration:none}.kreativ-pdf-contacts i{font-style:normal;overflow-wrap:anywhere}
  .kreativ-pdf-photo{display:block;width:28mm;height:29mm;overflow:hidden;border:1.8mm solid rgba(255,255,255,.88);border-radius:1.8mm;background:rgba(255,255,255,.18);object-fit:cover}
  .kreativ-pdf-header.no-photo{grid-template-columns:minmax(0,1fr)}
  .kreativ-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.5mm 4mm;height:auto;min-height:24mm;padding:12mm var(--kreativ-margin) 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}
  .kreativ-pdf-header.compact .kreativ-pdf-identity{display:contents}.kreativ-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--accent);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.kreativ-pdf-header.compact h1{font-size:15pt}.kreativ-pdf-header.compact h2{margin:0;color:var(--kreativ-muted);font-size:8.7pt}
  .kreativ-pdf-background{position:absolute;top:49mm;right:-13mm;z-index:1;width:78mm;height:78mm;fill:none;stroke:color-mix(in srgb,var(--accent),transparent 83%);stroke-width:1.2;pointer-events:none}
  .kreativ-pdf-content{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,58.333%) minmax(0,6.111%) minmax(0,35.556%);align-items:start;padding:8mm var(--kreativ-margin) max(13mm,calc(var(--kreativ-margin) - 2mm))}
  .kreativ-pdf-content.continuation{display:block;padding-top:7mm}.kreativ-pdf-left{grid-column:1;min-width:0}.kreativ-pdf-right{position:relative;grid-column:3;min-width:0}.kreativ-pdf-right:before{position:absolute;top:0;bottom:0;left:-5.5mm;width:.3mm;background:var(--kreativ-divider);content:""}
  .kreativ-pdf-section,.kreativ-pdf-right>section{margin:0 0 var(--section-gap);break-inside:avoid;page-break-inside:avoid}
  .kreativ-pdf-title,.kreativ-pdf-right section>h3,.kreativ-pdf-ats>section>h3,.kreativ-pdf-ats .knowledge-section>h3{margin:0 0 3.5mm;padding-bottom:1.2mm;border-bottom:.65mm solid var(--kreativ-dark);color:var(--kreativ-dark);font-size:11pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase}
  .kreativ-pdf-summary{margin:0;color:var(--kreativ-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .kreativ-pdf-list{display:flex;flex-direction:column;gap:4.5mm}.kreativ-pdf-entry{padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light);break-inside:avoid;page-break-inside:avoid}.kreativ-pdf-entry:last-child{padding-bottom:0;border-bottom:0}
  .kreativ-pdf-entry h4,.kreativ-pdf-entry h5{margin:0;overflow-wrap:anywhere}.kreativ-pdf-entry h4{color:var(--kreativ-dark);font-size:11pt;font-weight:600;line-height:1.15}.kreativ-pdf-entry h5{margin-top:1mm;color:var(--accent);font-size:9.5pt;font-weight:750;line-height:1.2}
  .kreativ-pdf-entry-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm;color:var(--kreativ-muted);font-size:7.8pt;line-height:1.2}.kreativ-pdf-entry-meta span+span:before{margin-right:1.5mm;color:var(--accent);content:"·"}
  .kreativ-pdf-entry ul,.kreativ-pdf-right ul,.kreativ-pdf-ats ul{margin:0;padding-left:4.5mm}.kreativ-pdf-entry li,.kreativ-pdf-right li,.kreativ-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.kreativ-pdf-entry li::marker,.kreativ-pdf-right li::marker,.kreativ-pdf-ats li::marker{color:var(--accent)}
  .kreativ-pdf-strengths{display:grid}.kreativ-pdf-strength{display:grid;grid-template-columns:6mm minmax(0,1fr);gap:2mm;margin-bottom:3mm;padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light)}.kreativ-pdf-strength:last-child{margin:0;padding:0;border:0}.kreativ-pdf-strength i{color:var(--accent);font-size:11pt;font-style:normal}.kreativ-pdf-strength span{color:var(--kreativ-dark);font-size:9.4pt;font-weight:750;line-height:1.2;overflow-wrap:anywhere}
  .kreativ-pdf-languages{display:grid;gap:3mm}.kreativ-pdf-language h4{margin:0;color:var(--kreativ-dark);font-size:8.8pt;font-weight:750;text-transform:uppercase}.kreativ-pdf-language>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2mm;margin-top:1mm;color:var(--kreativ-muted);font-size:7.6pt}.kreativ-pdf-dots{display:flex;gap:.8mm}.kreativ-pdf-dots i{display:block;width:1.6mm;height:1.6mm;border-radius:50%;background:var(--kreativ-inactive)}.kreativ-pdf-dots i.filled{background:var(--accent)}
  .kreativ-pdf-skills{display:flex;flex-wrap:wrap;gap:2.5mm 4mm}.kreativ-pdf-skill{max-width:100%;padding:0 1.5mm 1.2mm;border-bottom:.3mm solid var(--kreativ-divider);color:var(--kreativ-text);font-size:8.4pt;font-weight:700;overflow-wrap:anywhere}
  .kreativ-pdf-footer{position:absolute;right:var(--kreativ-margin);bottom:6mm;left:var(--kreativ-margin);z-index:3;display:flex;justify-content:space-between;gap:6mm;color:var(--kreativ-muted);font-size:7.2pt}.kreativ-pdf-footer a{color:var(--kreativ-dark);text-decoration:none}.kreativ-pdf-footer span:last-child{margin-left:auto}
  .kreativ-pdf-ats{--kreativ-dark:#173b33;--kreativ-text:#303d3a;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--kreativ-text);background:#fff}
  .kreativ-pdf-ats .kreativ-pdf-header{display:block;height:auto;min-height:auto;padding:0 0 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}.kreativ-pdf-ats .kreativ-pdf-identity h1{font-size:20pt}.kreativ-pdf-ats .kreativ-pdf-identity h2{font-size:10pt}.kreativ-pdf-ats .kreativ-pdf-contacts{color:var(--kreativ-text)}
  .kreativ-pdf-ats>section,.kreativ-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.kreativ-pdf-ats .knowledge-category h4,.kreativ-pdf-ats .knowledge-subcategory h5{color:var(--kreativ-dark)}
`;

const pageFitScript = `
  <script>
    (() => {
      const fit = (page) => {
        const content = page.querySelector(".page-content");
        if (!content) return;
        if (page.dataset.noFit === "true") {
          content.dataset.fitScale = "1.000";
          return;
        }
        content.style.transform = "";
        content.style.width = "100%";
        const heightRatio = page.clientHeight / Math.max(content.scrollHeight, 1);
        const widthRatio = page.clientWidth / Math.max(content.scrollWidth, 1);
        const scale = Math.min(1, heightRatio, widthRatio);
        if (scale < 0.999) {
          content.style.transform = "scale(" + scale + ")";
          content.style.width = 100 / scale + "%";
          content.dataset.fitScale = scale.toFixed(3);
        } else {
          content.dataset.fitScale = "1.000";
        }
      };
      document.querySelectorAll(".page").forEach(fit);
    })();
  </script>`;

export const buildDocumentHtml = (
  application: Application,
  profile: ApplicantProfile | undefined,
  target: "deckblatt" | "anschreiben" | "lebenslauf" | "mappe",
) => {
  const template = getTemplate(application.templateId);
  const accent = application.accentColor || template.accent;
  const secondary = application.secondaryColor || template.secondary;
  const onSecondary = getReadableTextColor(secondary);
  const designSettings = application.designSettings;
  const atsMode =
    designSettings.resumeOutputMode === "ats" ||
    designSettings.columnLayout === "compact-ats";
  const effectiveColumnLayout = atsMode
    ? "compact-ats"
    : designSettings.columnLayout;
  const designClasses = `background-${designSettings.backgroundId} ${
    designSettings.showBackgroundInPrint
      ? "print-background"
      : "no-print-background"
  }`;
  const backgroundLayer = programmingBackgroundMarkup(designSettings, atsMode);
  const docs = application.documents;
  const sections = profile?.resumeSections ?? {
    profile: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
  };
  const name = fullName(profile);
  const role = application.job.title;
  const company = application.company.name;
  const initials = profile
    ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
    : "VN";
  const photoSource = getProfileMediaSource(profile?.photoPath);
  const signatureSource = getProfileMediaSource(profile?.signaturePath);
  const avatarMarkup = (side = false) =>
    atsMode
      ? ""
      : photoSource
        ? `<span class="cv-avatar${side ? " side-avatar" : ""} has-image"><img class="cv-avatar-image" src="${escapeHtml(photoSource)}" alt=""></span>`
        : `<span class="cv-avatar${side ? " side-avatar" : ""}">${escapeHtml(initials)}</span>`;
  const resumeContacts = profile
    ? [profile.phone, profile.email, profile.city, profile.linkedin]
        .filter(Boolean)
        .map(escapeHtml)
        .join(" · ")
    : "Telefon · E-Mail · Ort";
  const today = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());
  const letterStatus = getLetterPageStatus(docs);
  const cover = `
    <section class="page cover-page ${designClasses}">
      ${backgroundLayer}
      <div class="page-content standard-page-content cover-content">
        <div class="rule"></div>
        <p class="kicker">Bewerbung</p>
        <h1>${escapeHtml(role)}</h1>
        <p class="muted">bei ${escapeHtml(company)}</p>
        <h2>${escapeHtml(name)}</h2>
        <p>${escapeHtml(docs.deckblattStatement || profile?.summary || "Motiviert, strukturiert und bereit für die nächste berufliche Aufgabe.")}</p>
        <div class="contact"><p>${senderLine(profile)}</p></div>
      </div>
    </section>`;
  const letter = `
    <section class="page letter-page letter-${letterStatus.density} ${designClasses}">
      ${backgroundLayer}
      <div class="page-content letter-content">
        <div class="rule"></div>
        <div class="sender">${senderLine(profile)}</div>
        <div class="recipient">${addressBlock(application)}</div>
        <p class="date">${escapeHtml(profile?.city || application.company.city)}, ${today}</p>
        <p class="subject">${escapeHtml(docs.coverSubject || `Bewerbung als ${role}`)}</p>
        <p>${escapeHtml(salutation(application))},</p>
        <p>${escapeHtml(docs.coverIntroduction || `die ausgeschriebene Position als ${role} bei ${company} spricht mich besonders an, weil sie fachliche Verantwortung mit konkretem Gestaltungsspielraum verbindet.`)}</p>
        <p>${escapeHtml(docs.coverMotivation || "Meine Motivation entsteht aus der Möglichkeit, vorhandene Erfahrung gezielt einzusetzen, mich fachlich weiterzuentwickeln und gemeinsam mit Ihrem Team messbare Ergebnisse zu erzielen.")}</p>
        <p>${escapeHtml(docs.coverQualification || profile?.summary || "Ich arbeite strukturiert, zuverlässig und lösungsorientiert. Neue Anforderungen erfasse ich schnell und überführe sie in nachvollziehbare, belastbare Ergebnisse.")}</p>
        <p>${escapeHtml(docs.coverCompanyFit || `An ${company} überzeugt mich besonders die Verbindung aus professionellem Anspruch und zukunftsorientierter Arbeitsweise.`)}</p>
        <p>${escapeHtml(docs.coverClosing || "Gerne überzeuge ich Sie in einem persönlichen Gespräch davon, welchen konkreten Beitrag ich in Ihrem Team leisten kann. Auf Ihren Terminvorschlag freue ich mich.")}</p>
        <div class="signature"><p>Mit freundlichen Grüßen</p>${signatureSource ? `<img class="signature-image" src="${escapeHtml(signatureSource)}" alt="">` : ""}<strong>${escapeHtml(name)}</strong></div>
      </div>
    </section>`;
  const experienceById = new Map(
    (profile?.experiences ?? []).map((item) => [item.id, item]),
  );
  const educationById = new Map(
    (profile?.education ?? []).map((item) => [item.id, item]),
  );
  const summarySection = sections.profile
    ? `<section><h3>Zusammenfassung</h3><p>${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
    : "";
  const skillSection = sections.skills
    ? renderKnowledgeSection(profile, atsMode)
    : "";
  const languageSection =
    sections.languages && profile?.languages.length
      ? `<section><h3>Sprachen</h3>${profile.languages
          .map((language) =>
            atsMode
              ? `<p class="language language-plain"><span>${escapeHtml(language)}</span></p>`
              : `<p class="language"><span>${escapeHtml(language)}</span><i>●●●●○</i></p>`,
          )
          .join("")}</section>`
      : "";
  const certificationSection =
    sections.certifications && profile?.certifications.length
      ? `<section><h3>Zertifikate</h3><ul>${profile.certifications.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`
      : "";
  const paginatedProfile = profile
    ? {
        ...profile,
        experiences: sections.experience ? profile.experiences : [],
        education: sections.education ? profile.education : [],
      }
    : undefined;
  const resumePlan = createResumePagePlan(
    paginatedProfile,
    docs.resumeProfile,
    template.id === "zweispaltig"
      ? zweispaltigPaginationOptions
      : undefined,
  );

  const renderExperience = (id: string) => {
    const item = experienceById.get(id);
    if (!item) return "";
    return `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${escapeHtml(item.role)}</strong><p>${escapeHtml(item.company)}</p></div>
          <small>${escapeHtml(item.from)} – ${escapeHtml(item.to)}${item.city ? `<br>${escapeHtml(item.city)}` : ""}</small>
        </div>
        <ul>${item.achievements.filter(Boolean).map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join("")}</ul>
      </article>`;
  };

  const renderEducation = (id: string) => {
    const item = educationById.get(id);
    if (!item) return "";
    return `
      <article class="cv-entry">
        <div class="cv-entry-head">
          <div><strong>${escapeHtml(item.degree)}</strong><p>${escapeHtml(item.institution)}</p></div>
          <small>${escapeHtml(item.from)} – ${escapeHtml(item.to)}${item.city ? `<br>${escapeHtml(item.city)}` : ""}</small>
        </div>
      </article>`;
  };

  const elegantContactMarkup = () => {
    if (!profile) return "";
    const location = [
      profile.postalCode,
      profile.city,
      profile.country,
    ]
      .filter(Boolean)
      .join(" ");
    const contacts = [
      {
        label: "Telefon",
        value: profile.phone,
        href: profile.phone
          ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
          : "",
      },
      {
        label: "E-Mail",
        value: profile.email,
        href: profile.email ? `mailto:${profile.email}` : "",
      },
      {
        label: "LinkedIn",
        value: profile.linkedin,
        href: externalHref(profile.linkedin),
      },
      {
        label: "GitHub",
        value: profile.github,
        href: externalHref(profile.github),
      },
      {
        label: "Portfolio",
        value: profile.portfolio,
        href: externalHref(profile.portfolio),
      },
      { label: "Ort", value: location, href: "" },
    ].filter((contact) => contact.value?.trim());

    if (!contacts.length) return "";
    return `<address class="elegant-pdf-contacts">${contacts
      .map((contact) => {
        const content = `<strong>${escapeHtml(contact.label)}</strong><i>${escapeHtml(contact.value)}</i>`;
        return contact.href
          ? `<a href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span>${content}</span>`;
      })
      .join("")}</address>`;
  };

  const renderElegantHeader = (compact: boolean) => `
    <header class="elegant-pdf-header${compact ? " elegant-pdf-header-compact" : ""}">
      <p class="kicker">${compact ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}</p>
      <h1>${escapeHtml(name)}</h1>
      ${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}
      ${compact ? "" : elegantContactMarkup()}
    </header>`;

  const renderElegantCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  from: experience.from,
                  to: experience.to,
                  title: experience.role,
                  organization: experience.company,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  from: education.from,
                  to: education.to,
                  title: education.degree,
                  organization: education.institution,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `
      <article class="elegant-pdf-entry">
        <div class="elegant-pdf-entry-head">
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.organization)}</p>
          </div>
          <div class="elegant-pdf-entry-meta">
            <strong>${escapeHtml(formatDateRange(item.from, item.to))}</strong>
            ${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}
          </div>
        </div>
        ${
          item.achievements.length
            ? `<ul>${item.achievements
                .map(
                  (achievement) =>
                    `<li>${escapeHtml(achievement)}</li>`,
                )
                .join("")}</ul>`
            : ""
        }
      </article>`;
  };

  const strengths = uniqueValues(profile?.skills ?? []).slice(0, 3);
  const visualStrengthSection = strengths.length
    ? `<section><h3>Stärken</h3><div class="elegant-pdf-strengths">${strengths
        .map(
          (strength) =>
            `<div class="elegant-pdf-strength"><i aria-hidden="true">✓</i><span>${escapeHtml(strength)}</span></div>`,
        )
        .join("")}</div></section>`
    : "";
  const atsStrengthSection = strengths.length
    ? `<section class="elegant-pdf-section"><h3>Stärken</h3><ul>${strengths
        .map((strength) => `<li>${escapeHtml(strength)}</li>`)
        .join("")}</ul></section>`
    : "";
  const elegantPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  const renderElegantResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderElegantCareerEntry(item.id, "experience"))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderElegantCareerEntry(item.id, "education"))
      .join("");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const careerMarkup = `
      ${
        experienceItems
          ? `<section class="elegant-pdf-section"><h3>Berufserfahrung${isContinuation ? " · Fortsetzung" : ""}</h3><div class="elegant-pdf-list">${experienceItems}</div></section>`
          : ""
      }
      ${
        educationItems
          ? `<section class="elegant-pdf-section"><h3>Ausbildung</h3><div class="elegant-pdf-list">${educationItems}</div></section>`
          : ""
      }`;

    if (atsMode) {
      const atsSummary =
        sections.profile && !isContinuation
          ? `<section class="elegant-pdf-section"><h3>Zusammenfassung</h3><p>${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
          : "";
      return `
        <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="elegant" data-no-fit="true">
          <div class="page-content elegant-pdf-ats">
            ${renderElegantHeader(isContinuation)}
            ${atsSummary}
            ${careerMarkup}
            ${isLastPage ? `${skillSection}${languageSection}${atsStrengthSection}${certificationSection}` : ""}
            <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
          </div>
        </section>`;
    }

    const continuationLink = elegantPortfolio
      ? `<a href="${escapeHtml(externalHref(elegantPortfolio))}">${escapeHtml(elegantPortfolio)}</a>`
      : "";
    const sidebarMarkup = isContinuation
      ? `<aside class="elegant-pdf-sidebar elegant-pdf-continuation">
          <p class="kicker">Lebenslauf</p>
          <h2>${escapeHtml(name)}</h2>
          ${profile?.title ? `<p>${escapeHtml(profile.title)}</p>` : ""}
          <hr>
          <p>Fortsetzung · Seite ${plan.pageNumber} von ${resumePlan.length}</p>
          ${profile?.email ? `<a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>` : ""}
          ${profile?.phone ? `<a href="tel:${escapeHtml(profile.phone.replace(/[^\d+]/g, ""))}">${escapeHtml(profile.phone)}</a>` : ""}
          ${continuationLink}
        </aside>`
      : `<aside class="elegant-pdf-sidebar">
          ${photoSource ? `<img class="elegant-pdf-photo" src="${escapeHtml(photoSource)}" alt="">` : ""}
          ${summarySection}
          ${visualStrengthSection}
          ${skillSection}
          ${languageSection}
          ${certificationSection}
        </aside>`;
    const footerLink = elegantPortfolio
      ? `<a href="${escapeHtml(externalHref(elegantPortfolio))}">${escapeHtml(elegantPortfolio)}</a>`
      : "<span></span>";

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="elegant" data-no-fit="true">
        <div class="page-content elegant-pdf">
          <main class="elegant-pdf-main">
            ${renderElegantHeader(isContinuation)}
            ${careerMarkup}
            ${
              !experienceItems && !educationItems && plan.pageNumber === 1
                ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>"
                : ""
            }
            <footer class="elegant-pdf-footer">${footerLink}<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span></footer>
          </main>
          ${sidebarMarkup}
        </div>
      </section>`;
  };

  const zweispaltigContactMarkup = () => {
    if (!profile) return "";
    const location = [
      profile.postalCode,
      profile.city,
      profile.country,
    ]
      .filter(Boolean)
      .join(" ");
    const birth = [profile.birthDate, profile.birthPlace]
      .filter(Boolean)
      .join(", ");
    const contacts = [
      {
        label: "Telefon",
        value: profile.phone,
        href: profile.phone
          ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
          : "",
      },
      {
        label: "E-Mail",
        value: profile.email,
        href: profile.email ? `mailto:${profile.email}` : "",
      },
      { label: "Wohnort", value: location, href: "" },
      {
        label: "LinkedIn",
        value: profile.linkedin,
        href: externalHref(profile.linkedin),
      },
      {
        label: "GitHub",
        value: profile.github,
        href: externalHref(profile.github),
      },
      {
        label: "Portfolio",
        value: profile.portfolio,
        href: externalHref(profile.portfolio),
      },
      { label: "Geboren", value: birth, href: "" },
    ].filter((contact) => contact.value?.trim());

    if (!contacts.length) return "";
    return `<address class="zweispaltig-pdf-contacts">${contacts
      .map((contact) => {
        const content = `<strong>${escapeHtml(contact.label)}</strong><i>${escapeHtml(contact.value)}</i>`;
        return contact.href
          ? `<a href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span>${content}</span>`;
      })
      .join("")}</address>`;
  };

  const renderZweispaltigHeader = (
    compact: boolean,
    showPhoto: boolean,
  ) => {
    const specializations = uniqueValues(profile?.skills ?? []).slice(0, 3);
    return `
      <header class="zweispaltig-pdf-header${compact ? " compact" : ""}">
        <div>
          ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
          <h1>${escapeHtml(name)}</h1>
          ${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}
          ${
            !compact && specializations.length
              ? `<p class="zweispaltig-pdf-specializations">${specializations
                  .map(escapeHtml)
                  .join(" | ")}</p>`
              : ""
          }
          ${compact ? "" : zweispaltigContactMarkup()}
        </div>
        ${
          showPhoto && photoSource
            ? `<img class="zweispaltig-pdf-photo" src="${escapeHtml(photoSource)}" alt="">`
            : ""
        }
      </header>`;
  };

  const renderZweispaltigCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  from: experience.from,
                  to: experience.to,
                  title: experience.role,
                  organization: experience.company,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  from: education.from,
                  to: education.to,
                  title: education.degree,
                  organization: education.institution,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `
      <article class="zweispaltig-pdf-entry">
        <div class="zweispaltig-pdf-entry-head">
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.organization)}</p>
          </div>
          <div class="zweispaltig-pdf-entry-meta">
            <strong>${escapeHtml(formatDateRange(item.from, item.to))}</strong>
            ${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}
          </div>
        </div>
        ${
          item.achievements.length
            ? `<ul>${item.achievements
                .map(
                  (achievement) =>
                    `<li>${escapeHtml(achievement)}</li>`,
                )
                .join("")}</ul>`
            : ""
        }
      </article>`;
  };

  const zweispaltigVisualStrengthSection = strengths.length
    ? `<section><h3>Stärken</h3><div class="zweispaltig-pdf-strengths">${strengths
        .map(
          (strength) =>
            `<div class="zweispaltig-pdf-strength"><i aria-hidden="true">✓</i><span>${escapeHtml(strength)}</span></div>`,
        )
        .join("")}</div></section>`
    : "";
  const zweispaltigAtsStrengthSection = strengths.length
    ? `<section class="zweispaltig-pdf-section"><h3>Stärken</h3><ul>${strengths
        .map((strength) => `<li>${escapeHtml(strength)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zweispaltigPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  const renderZweispaltigResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) =>
        renderZweispaltigCareerEntry(item.id, "experience"),
      )
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) =>
        renderZweispaltigCareerEntry(item.id, "education"),
      )
      .join("");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const careerMarkup = `
      ${
        experienceItems
          ? `<section class="zweispaltig-pdf-section"><h3>Berufserfahrung${isContinuation ? " · Fortsetzung" : ""}</h3><div class="zweispaltig-pdf-list">${experienceItems}</div></section>`
          : ""
      }
      ${
        educationItems
          ? `<section class="zweispaltig-pdf-section"><h3>Ausbildung</h3><div class="zweispaltig-pdf-list">${educationItems}</div></section>`
          : ""
      }`;

    if (atsMode) {
      const atsSummary =
        sections.profile && !isContinuation
          ? `<section class="zweispaltig-pdf-section"><h3>Berufliches Profil</h3><p class="zweispaltig-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
          : "";
      return `
        <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="zweispaltig" data-no-fit="true">
          <div class="page-content zweispaltig-pdf zweispaltig-pdf-ats">
            ${renderZweispaltigHeader(isContinuation, false)}
            ${atsSummary}
            ${careerMarkup}
            ${isLastPage ? `${skillSection}${languageSection}${zweispaltigAtsStrengthSection}${certificationSection}` : ""}
            <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
          </div>
        </section>`;
    }

    const summaryMarkup =
      sections.profile && !isContinuation
        ? `<section class="zweispaltig-pdf-section"><h3>Zusammenfassung</h3><p class="zweispaltig-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
        : "";
    const sidebarMarkup = isContinuation
      ? ""
      : `<aside class="zweispaltig-pdf-sidebar">
          ${zweispaltigVisualStrengthSection}
          ${skillSection}
          ${languageSection}
          ${certificationSection}
        </aside>`;
    const footerLink = zweispaltigPortfolio
      ? `<a href="${escapeHtml(externalHref(zweispaltigPortfolio))}">${escapeHtml(zweispaltigPortfolio)}</a>`
      : "<span></span>";

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="zweispaltig" data-no-fit="true">
        <div class="page-content zweispaltig-pdf">
          ${renderZweispaltigHeader(isContinuation, !isContinuation)}
          <div class="zweispaltig-pdf-columns${isContinuation ? " continuation" : ""}">
            <main class="zweispaltig-pdf-main">
              ${summaryMarkup}
              ${careerMarkup}
              ${
                !experienceItems &&
                !educationItems &&
                plan.pageNumber === 1
                  ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>"
                  : ""
              }
            </main>
            ${sidebarMarkup}
          </div>
          <footer class="zweispaltig-pdf-footer">${footerLink}<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span></footer>
        </div>
      </section>`;
  };

  const zeitHeading = (title: string, symbol: string) =>
    `<header class="zeit-pdf-heading"><i aria-hidden="true">${escapeHtml(symbol)}</i><h3>${escapeHtml(title)}</h3></header>`;

  const zeitContacts = [
    {
      label: "Telefon",
      symbol: "T",
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      label: "E-Mail",
      symbol: "@",
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      label: "Portfolio",
      symbol: "W",
      value: profile?.portfolio,
      href: externalHref(profile?.portfolio),
    },
    {
      label: "LinkedIn",
      symbol: "in",
      value: profile?.linkedin,
      href: externalHref(profile?.linkedin),
    },
    {
      label: "Wohnort",
      symbol: "⌂",
      value: [profile?.postalCode, profile?.city, profile?.country]
        .filter(Boolean)
        .join(" "),
      href: "",
    },
    {
      label: "GitHub",
      symbol: "G",
      value: profile?.github,
      href: externalHref(profile?.github),
    },
  ].filter((contact) => contact.value?.trim());

  const renderZeitContacts = (ats: boolean) => {
    if (!zeitContacts.length) return "";
    if (ats) {
      return `<address class="zeit-pdf-ats-contacts">${zeitContacts
        .map((contact) => {
          const content = `<strong>${escapeHtml(contact.label)}:</strong> ${escapeHtml(contact.value)}`;
          return contact.href
            ? `<a href="${escapeHtml(contact.href)}">${content}</a>`
            : `<span>${content}</span>`;
        })
        .join("")}</address>`;
    }
    return `<section>${zeitHeading("Kontakte", "@")}<div class="zeit-pdf-contacts">${zeitContacts
      .map((contact) => {
        const content = `<i aria-hidden="true">${escapeHtml(contact.symbol)}</i><span>${escapeHtml(contact.value)}</span>`;
        return contact.href
          ? `<a class="zeit-pdf-contact" href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span class="zeit-pdf-contact">${content}</span>`;
      })
      .join("")}</div></section>`;
  };

  const renderZeitHeader = (
    compact: boolean,
    ats: boolean,
  ) => {
    const photoMarkup =
      !compact && !ats && photoSource
        ? `<div class="zeit-pdf-photo-composition">
            <span class="zeit-pdf-photo-pale"></span>
            <span class="zeit-pdf-photo-soft"></span>
            <span class="zeit-pdf-photo-accent"></span>
            <img class="zeit-pdf-photo" src="${escapeHtml(photoSource)}" alt="">
          </div>`
        : "";
    return `
      <header class="zeit-pdf-header${compact ? " compact" : ""}${!photoMarkup ? " no-photo" : ""}">
        ${photoMarkup}
        <div class="zeit-pdf-identity">
          ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
          <h1>${escapeHtml(name)}</h1>
          ${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}
          ${ats && !compact ? renderZeitContacts(true) : ""}
        </div>
      </header>`;
  };

  const zeitLanguageScore = (level: string) => {
    const normalized = level.toLocaleLowerCase("de-DE");
    if (/muttersprache|native|c2/.test(normalized)) return 5;
    if (/verhandlung|fließ|fliess|c1|b2|versiert/.test(normalized)) {
      return 4;
    }
    if (/b1|gut/.test(normalized)) return 3;
    if (/a2|grundkennt/.test(normalized)) return 2;
    if (/a1|anfänger|anfaenger/.test(normalized)) return 1;
    return 4;
  };
  const zeitLanguages = uniqueValues(profile?.languages ?? []).map(
    (raw) => {
      const [languageName, ...levelParts] = raw.split(/\s+[–—-]\s+/);
      const level = levelParts.join(" – ").trim();
      return {
        raw,
        name: languageName.trim() || raw,
        level,
        score: zeitLanguageScore(level),
      };
    },
  );
  const zeitVisualLanguages = zeitLanguages.length
    ? `<section>${zeitHeading("Sprachen", "A")}<div class="zeit-pdf-languages">${zeitLanguages
        .map(
          (language) =>
            `<article class="zeit-pdf-language"><h4>${escapeHtml(language.name)}</h4><div><span>${escapeHtml(language.level)}</span><span class="zeit-pdf-dots">${Array.from(
              { length: 5 },
              (_, index) =>
                `<i class="${index < language.score ? "filled" : ""}"></i>`,
            ).join("")}</span></div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const zeitAtsLanguages = zeitLanguages.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Sprachen", "A")}<ul>${zeitLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zeitVisualStrengths = strengths.length
    ? `<section>${zeitHeading("Stärken", "◆")}<div class="zeit-pdf-strengths">${strengths
        .map(
          (strength) =>
            `<div class="zeit-pdf-strength"><i aria-hidden="true"></i><span>${escapeHtml(strength)}</span></div>`,
        )
        .join("")}</div></section>`
    : "";
  const zeitAtsStrengths = strengths.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Stärken", "◆")}<ul>${strengths
        .map((strength) => `<li>${escapeHtml(strength)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zeitCertifications = uniqueValues(
    profile?.certifications ?? [],
  );
  const zeitVisualCertifications = zeitCertifications.length
    ? `<section>${zeitHeading("Zertifikate", "✓")}<ul>${zeitCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zeitAtsCertifications = zeitCertifications.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Zertifikate", "✓")}<ul>${zeitCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";

  const renderZeitCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  from: experience.from,
                  to: experience.to,
                  title: experience.role,
                  organization: experience.company,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  from: education.from,
                  to: education.to,
                  title: education.degree,
                  organization: education.institution,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `
      <article class="zeit-pdf-entry">
        <div class="zeit-pdf-entry-top">
          <h4>${escapeHtml(item.organization)}</h4>
          <span>${escapeHtml(item.city)}</span>
        </div>
        <div class="zeit-pdf-entry-role">
          <h5>${escapeHtml(item.title)}</h5>
          <span>${escapeHtml(formatDateRange(item.from, item.to))}</span>
        </div>
        ${
          item.achievements.length
            ? `<ul>${item.achievements
                .map(
                  (achievement) =>
                    `<li>${escapeHtml(achievement)}</li>`,
                )
                .join("")}</ul>`
            : ""
        }
      </article>`;
  };

  const zeitPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  const renderZeitgenoessischResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderZeitCareerEntry(item.id, "experience"))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderZeitCareerEntry(item.id, "education"))
      .join("");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experienceMarkup = experienceItems
      ? `<section class="zeit-pdf-section">${zeitHeading(atsMode ? "Berufserfahrung" : "Erfahrung", "▣")}<div class="zeit-pdf-list">${experienceItems}</div></section>`
      : "";
    const educationMarkup = educationItems
      ? `<section class="zeit-pdf-section">${zeitHeading("Ausbildung", "⌂")}<div class="zeit-pdf-list">${educationItems}</div></section>`
      : "";

    if (atsMode) {
      const summaryMarkup =
        sections.profile && !isContinuation
          ? `<section class="zeit-pdf-section">${zeitHeading("Zusammenfassung", "≡")}<p class="zeit-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
          : "";
      return `
        <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="zeitgenoessisch" data-no-fit="true">
          <div class="page-content zeit-pdf zeit-pdf-ats">
            ${renderZeitHeader(isContinuation, true)}
            ${summaryMarkup}
            ${experienceMarkup}
            ${educationMarkup}
            ${
              isLastPage
                ? `${skillSection}${sections.languages ? zeitAtsLanguages : ""}${sections.skills ? zeitAtsStrengths : ""}${sections.certifications ? zeitAtsCertifications : ""}`
                : ""
            }
            <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
          </div>
        </section>`;
    }

    const summaryMarkup =
      sections.profile && !isContinuation
        ? `<section class="zeit-pdf-section">${zeitHeading("Zusammenfassung", "≡")}<p class="zeit-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
        : "";
    const leftMarkup = isContinuation
      ? ""
      : `<aside class="zeit-pdf-left">
          ${renderZeitContacts(false)}
          ${sections.skills ? zeitVisualStrengths : ""}
          ${sections.languages ? zeitVisualLanguages : ""}
          ${sections.certifications ? zeitVisualCertifications : ""}
        </aside>`;
    const footerLink = zeitPortfolio
      ? `<a href="${escapeHtml(externalHref(zeitPortfolio))}">${escapeHtml(zeitPortfolio)}</a>`
      : "<span></span>";

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="zeitgenoessisch" data-no-fit="true">
        <div class="page-content zeit-pdf">
          ${renderZeitHeader(isContinuation, false)}
          <div class="zeit-pdf-columns${isContinuation ? " continuation" : ""}">
            ${leftMarkup}
            <main class="zeit-pdf-main">
              ${summaryMarkup}
              ${experienceMarkup}
              ${educationMarkup}
              ${
                !experienceItems &&
                !educationItems &&
                plan.pageNumber === 1
                  ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>"
                  : ""
              }
            </main>
          </div>
          <footer class="zeit-pdf-footer">${footerLink}<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span></footer>
        </div>
      </section>`;
  };

  const kreativContactMarkup = () => {
    if (!zeitContacts.length) return "";
    return `<address class="kreativ-pdf-contacts">${zeitContacts
      .map((contact) => {
        const content = `<strong>${escapeHtml(contact.label)}</strong><i>${escapeHtml(contact.value)}</i>`;
        return contact.href
          ? `<a href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span>${content}</span>`;
      })
      .join("")}</address>`;
  };

  const renderKreativHeader = (
    compact: boolean,
    ats: boolean,
  ) => {
    const photoMarkup =
      !compact && !ats && photoSource
        ? `<img class="kreativ-pdf-photo" src="${escapeHtml(photoSource)}" alt="">`
        : "";
    return `
      <header class="kreativ-pdf-header${compact ? " compact" : ""}${!photoMarkup ? " no-photo" : ""}">
        <div class="kreativ-pdf-identity">
          ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
          <h1>${escapeHtml(name)}</h1>
          ${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}
          ${compact ? "" : kreativContactMarkup()}
        </div>
        ${photoMarkup}
      </header>`;
  };

  const kreativLanguageScore = (level: string) => {
    const normalized = level.toLocaleLowerCase("de-DE");
    if (/muttersprache|native|c2/.test(normalized)) return 5;
    if (/verhandlung|fließ|fliess|c1/.test(normalized)) return 4;
    if (/b2|fortgeschritten|versiert/.test(normalized)) return 3;
    if (/b1|a2|grundkennt/.test(normalized)) return 2;
    if (/a1|anfänger|anfaenger/.test(normalized)) return 1;
    return 3;
  };
  const kreativLanguages = uniqueValues(profile?.languages ?? []).map(
    (raw) => {
      const [languageName, ...levelParts] = raw.split(/\s+[–—-]\s+/);
      const level = levelParts.join(" – ").trim();
      return {
        raw,
        name: languageName.trim() || raw,
        level,
        score: kreativLanguageScore(level),
      };
    },
  );
  const kreativVisualLanguages = kreativLanguages.length
    ? `<section><h3>Sprachen</h3><div class="kreativ-pdf-languages">${kreativLanguages
        .map(
          (language) =>
            `<article class="kreativ-pdf-language"><h4>${escapeHtml(language.name)}</h4><div><span>${escapeHtml(language.level)}</span><span class="kreativ-pdf-dots">${Array.from(
              { length: 5 },
              (_, index) =>
                `<i class="${index < language.score ? "filled" : ""}"></i>`,
            ).join("")}</span></div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const kreativAtsLanguages = kreativLanguages.length
    ? `<section><h3>Sprachen</h3><ul>${kreativLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul></section>`
    : "";
  const kreativVisualStrengths = strengths.length
    ? `<section><h3>Stärken</h3><div class="kreativ-pdf-strengths">${strengths
        .map(
          (strength) =>
            `<div class="kreativ-pdf-strength"><i aria-hidden="true">◆</i><span>${escapeHtml(strength)}</span></div>`,
        )
        .join("")}</div></section>`
    : "";
  const kreativAtsStrengths = strengths.length
    ? `<section><h3>Stärken</h3><ul>${strengths
        .map((strength) => `<li>${escapeHtml(strength)}</li>`)
        .join("")}</ul></section>`
    : "";
  const kreativKnowledge = profile
    ? ensureKnowledgeSection(profile.knowledgeSection, profile.skills)
    : undefined;
  const kreativSkillValues = uniqueValues(
    (kreativKnowledge?.categories ?? [])
      .filter((category) => category.isVisible)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .flatMap((category) => [
        ...visibleKnowledgeItems(category.items).map((item) =>
          formatKnowledgeItem(
            item,
            category.showLevels,
            category.showYearsOfExperience,
            "comma-separated",
          ),
        ),
        ...category.subcategories
          .filter((subcategory) => subcategory.isVisible)
          .sort((left, right) => left.sortOrder - right.sortOrder)
          .flatMap((subcategory) =>
            visibleKnowledgeItems(subcategory.items).map((item) =>
              formatKnowledgeItem(
                item,
                category.showLevels,
                category.showYearsOfExperience,
                "comma-separated",
              ),
            ),
          ),
      ]),
  );
  const kreativVisualSkills = kreativSkillValues.length
    ? `<section><h3>Fähigkeiten</h3><div class="kreativ-pdf-skills">${kreativSkillValues
        .map(
          (skill) =>
            `<span class="kreativ-pdf-skill">${escapeHtml(skill)}</span>`,
        )
        .join("")}</div></section>`
    : "";
  const kreativCertifications = uniqueValues(
    profile?.certifications ?? [],
  );
  const kreativVisualCertifications = kreativCertifications.length
    ? `<section><h3>Zertifikate</h3><ul>${kreativCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";
  const kreativAtsCertifications = kreativCertifications.length
    ? `<section><h3>Zertifikate</h3><ul>${kreativCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";

  const renderKreativCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  from: experience.from,
                  to: experience.to,
                  title: experience.role,
                  organization: experience.company,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  from: education.from,
                  to: education.to,
                  title: education.degree,
                  organization: education.institution,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `
      <article class="kreativ-pdf-entry">
        <h4>${escapeHtml(item.title)}</h4>
        <h5>${escapeHtml(item.organization)}</h5>
        <p class="kreativ-pdf-entry-meta">
          <span>${escapeHtml(formatDateRange(item.from, item.to))}</span>
          ${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}
        </p>
        ${
          item.achievements.length
            ? `<ul>${item.achievements
                .map(
                  (achievement) =>
                    `<li>${escapeHtml(achievement)}</li>`,
                )
                .join("")}</ul>`
            : ""
        }
      </article>`;
  };

  const kreativPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";

  const renderKreativResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderKreativCareerEntry(item.id, "experience"))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderKreativCareerEntry(item.id, "education"))
      .join("");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experienceMarkup = experienceItems
      ? `<section class="kreativ-pdf-section"><h3 class="kreativ-pdf-title">${atsMode ? "Berufserfahrung" : "Erfahrung"}</h3><div class="kreativ-pdf-list">${experienceItems}</div></section>`
      : "";
    const educationMarkup = educationItems
      ? `<section class="kreativ-pdf-section"><h3 class="kreativ-pdf-title">Ausbildung</h3><div class="kreativ-pdf-list">${educationItems}</div></section>`
      : "";

    if (atsMode) {
      const summaryMarkup =
        sections.profile && !isContinuation
          ? `<section><h3>Zusammenfassung</h3><p class="kreativ-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
          : "";
      return `
        <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="kreativ" data-no-fit="true">
          <div class="page-content kreativ-pdf kreativ-pdf-ats">
            ${renderKreativHeader(isContinuation, true)}
            ${summaryMarkup}
            ${experienceMarkup}
            ${educationMarkup}
            ${
              isLastPage
                ? `${skillSection}${sections.languages ? kreativAtsLanguages : ""}${sections.skills ? kreativAtsStrengths : ""}${sections.certifications ? kreativAtsCertifications : ""}`
                : ""
            }
            <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
          </div>
        </section>`;
    }

    const summaryMarkup =
      sections.profile && !isContinuation
        ? `<section><h3>Zusammenfassung</h3><p class="kreativ-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
        : "";
    const backgroundMarkup = isContinuation
      ? ""
      : `<svg class="kreativ-pdf-background" viewBox="0 0 100 100" aria-hidden="true"><circle cx="62" cy="45" r="39"/><circle cx="78" cy="53" r="30"/><circle cx="91" cy="62" r="22"/></svg>`;
    const rightMarkup = isContinuation
      ? ""
      : `<aside class="kreativ-pdf-right">
          ${summaryMarkup}
          ${sections.skills ? kreativVisualStrengths : ""}
          ${sections.languages ? kreativVisualLanguages : ""}
          ${sections.skills ? kreativVisualSkills : ""}
          ${sections.certifications ? kreativVisualCertifications : ""}
        </aside>`;
    const footerLink = kreativPortfolio
      ? `<a href="${escapeHtml(externalHref(kreativPortfolio))}">${escapeHtml(kreativPortfolio)}</a>`
      : "<span></span>";

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="kreativ" data-no-fit="true">
        <div class="page-content kreativ-pdf">
          ${backgroundMarkup}
          ${renderKreativHeader(isContinuation, false)}
          <div class="kreativ-pdf-content${isContinuation ? " continuation" : ""}">
            <main class="kreativ-pdf-left">
              ${experienceMarkup}
              ${educationMarkup}
              ${
                !experienceItems &&
                !educationItems &&
                plan.pageNumber === 1
                  ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>"
                  : ""
              }
            </main>
            ${rightMarkup}
          </div>
          <footer class="kreativ-pdf-footer">${footerLink}<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span></footer>
        </div>
      </section>`;
  };

  const renderResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderExperience(item.id))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderEducation(item.id))
      .join("");
    const isContinuation = plan.pageNumber === 2;
    const densityClass =
      plan.density === "standard" ? "" : ` cv-${plan.density}`;

    const mainMarkup = `
          <main class="cv-primary">
            ${experienceItems ? `<section><h3>Berufserfahrung${isContinuation ? " · Fortsetzung" : ""}</h3>${experienceItems}</section>` : ""}
            ${educationItems ? `<section><h3>Ausbildung</h3>${educationItems}</section>` : ""}
            ${!experienceItems && !educationItems && plan.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
          </main>`;
    const sideMarkup = isContinuation
      ? ""
      : `<aside class="cv-secondary">
                  ${avatarMarkup(true)}
                  ${summarySection}
                  ${skillSection}
                  ${languageSection}
                  ${certificationSection}
                </aside>`;

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}">
        ${backgroundLayer}
        <div class="page-content cv-page cv-${template.layout} column-${effectiveColumnLayout}${isContinuation ? " cv-continuation" : ""}${densityClass}">
          <header class="cv-header">
            <div>
              <p class="kicker">${isContinuation ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}</p>
              <h1>${escapeHtml(name)}</h1>
              <h2>${escapeHtml(profile?.title || role)}</h2>
              <p class="cv-contact-line">${resumeContacts}</p>
            </div>
            ${avatarMarkup()}
          </header>
          ${atsMode ? `${sideMarkup}${mainMarkup}` : `${mainMarkup}${sideMarkup}`}
          <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
        </div>
      </section>`;
  };
  const resume = resumePlan
    .map(
      template.id === "elegant"
        ? renderElegantResumePage
        : template.id === "kreativ"
          ? renderKreativResumePage
        : template.id === "zeitgenoessisch"
          ? renderZeitgenoessischResumePage
        : template.id === "zweispaltig"
          ? renderZweispaltigResumePage
        : renderResumePage,
    )
    .join("");
  const selected = target === "mappe" ? [cover, letter, resume] : target === "deckblatt" ? [cover] : target === "anschreiben" ? [letter] : [resume];
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${escapeHtml(company)} – ${escapeHtml(role)}</title><style>${documentCss(accent, secondary, onSecondary, designSettings)}${elegantDocumentCss}${zweispaltigDocumentCss}${zeitgenoessischDocumentCss}${kreativDocumentCss}</style></head><body>${selected.join("")}${pageFitScript}</body></html>`;
};

export const buildCoverLetterMarkdown = (
  application: Application,
  profile?: ApplicantProfile,
) => {
  const docs = application.documents;
  return `# ${docs.coverSubject || `Bewerbung als ${application.job.title}`}

${salutation(application)},

${docs.coverIntroduction}

${docs.coverMotivation}

${docs.coverQualification}

${docs.coverCompanyFit}

${docs.coverClosing}

Mit freundlichen Grüßen

${fullName(profile)}
`;
};
