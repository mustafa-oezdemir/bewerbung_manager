import type { ApplicantProfile, Application } from "../src/shared/schema";
import {
  createResumePagePlan,
  getLetterPageStatus,
  type ResumePagePlan,
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

const programmingBackgroundMarkup = (
  settings: DocumentDesignSettings,
) =>
  settings.backgroundId === "programming-languages-bg" &&
  settings.columnLayout !== "compact-ats"
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
  return categories
    ? `<section class="knowledge-section"><h3>${escapeHtml(section.title)}</h3>${categories}</section>`
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
  .language{display:flex;justify-content:space-between;gap:4mm;margin:2mm 0}.language i{color:var(--accent);font-size:7pt;font-style:normal;letter-spacing:1px;white-space:nowrap}
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

const pageFitScript = `
  <script>
    (() => {
      const fit = (page) => {
        const content = page.querySelector(".page-content");
        if (!content) return;
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
  const designClasses = `background-${designSettings.backgroundId} ${
    designSettings.showBackgroundInPrint
      ? "print-background"
      : "no-print-background"
  }`;
  const backgroundLayer = programmingBackgroundMarkup(designSettings);
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
    photoSource
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
    ? renderKnowledgeSection(
        profile,
        designSettings.columnLayout === "compact-ats",
      )
    : "";
  const languageSection =
    sections.languages && profile?.languages.length
      ? `<section><h3>Sprachen</h3>${profile.languages.map((language) => `<p class="language"><span>${escapeHtml(language)}</span><i>●●●●○</i></p>`).join("")}</section>`
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

    return `
      <section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}">
        ${backgroundLayer}
        <div class="page-content cv-page cv-${template.layout} column-${designSettings.columnLayout}${isContinuation ? " cv-continuation" : ""}${densityClass}">
          <header class="cv-header">
            <div>
              <p class="kicker">${isContinuation ? "Lebenslauf · Fortsetzung" : "Lebenslauf"}</p>
              <h1>${escapeHtml(name)}</h1>
              <h2>${escapeHtml(profile?.title || role)}</h2>
              <p class="cv-contact-line">${resumeContacts}</p>
            </div>
            ${avatarMarkup()}
          </header>
          <main class="cv-primary">
            ${experienceItems ? `<section><h3>Berufserfahrung${isContinuation ? " · Fortsetzung" : ""}</h3>${experienceItems}</section>` : ""}
            ${educationItems ? `<section><h3>Ausbildung</h3>${educationItems}</section>` : ""}
            ${!experienceItems && !educationItems && plan.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
          </main>
          ${
            isContinuation
              ? ""
              : `<aside class="cv-secondary">
                  ${avatarMarkup(true)}
                  ${summarySection}
                  ${skillSection}
                  ${languageSection}
                  ${certificationSection}
                </aside>`
          }
          <span class="page-number">${plan.pageNumber} / ${resumePlan.length}</span>
        </div>
      </section>`;
  };
  const resume = resumePlan.map(renderResumePage).join("");
  const selected = target === "mappe" ? [cover, letter, resume] : target === "deckblatt" ? [cover] : target === "anschreiben" ? [letter] : [resume];
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${escapeHtml(company)} – ${escapeHtml(role)}</title><style>${documentCss(accent, secondary, onSecondary, designSettings)}</style></head><body>${selected.join("")}${pageFitScript}</body></html>`;
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
