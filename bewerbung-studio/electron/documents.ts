import type { ApplicantProfile, Application } from "../src/shared/schema";
import { formatApplicationDateLong } from "../src/shared/applicationDate";
import {
  createResumePagePlan,
  einspaltigPaginationOptions,
  elegantPaginationOptions,
  gepflegtPaginationOptions,
  getLetterPageStatus,
  ivyLeaguePaginationOptions,
  klassischPaginationOptions,
  kompaktPaginationOptions,
  kreativPaginationOptions,
  modernPaginationOptions,
  stilvollPaginationOptions,
  tabellarischPaginationOptions,
  type ResumePagePlan,
  zeitgenoessischPaginationOptions,
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
import {
  getProfileResumeSectionLayout,
  hasSavedTemplateSectionLayout,
} from "../src/features/resume-sections/resume-sections";

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

const senderHeader = (profile?: ApplicantProfile) => {
  if (!profile) {
    return (
      '<span class="sender-name">Vorname Nachname</span>' +
      '<span class="sender-contact">E-Mail · Telefon</span>'
    );
  }
  const details = [
    profile.street,
    `${profile.postalCode} ${profile.city}`.trim(),
    profile.email,
    profile.phone,
  ]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" · ");
  return (
    `<span class="sender-name">${escapeHtml(fullName(profile))}</span>` +
    `<span class="sender-contact">${details}</span>`
  );
};

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
  .contact{padding-top:8mm;border-top:1px solid var(--line)}.sender{margin-bottom:2mm;color:var(--muted);text-align:center}.sender-name,.sender-contact{display:block}.sender-name{color:var(--ink);font-size:14pt;font-weight:400;line-height:1.2}.sender-contact{margin-top:.8mm;font-size:11pt;line-height:1.25}
  .recipient{margin-top:13mm;min-height:35mm}.date{text-align:right}.subject{font-weight:800;font-size:12pt;margin:8mm 0 5mm}
  .signature{display:flex;flex-direction:column;align-items:flex-start;margin-top:8mm}.signature p{margin:0}.signature-image{display:block;width:auto;max-width:48mm;height:auto;max-height:14mm;margin:1mm 0 .5mm;object-fit:contain;object-position:left center}.signature-name{font-weight:400;line-height:1.2}
  .letter-content{padding:var(--doc-margin)}.letter-content>p:not(.date,.subject){margin:0 0 calc(var(--section-gap) * .72)}.letter-body{text-align:justify;text-justify:inter-word;hyphens:auto}
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
  .elegant-pdf{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;--elegant-sidebar-muted:#f6eaea;display:grid;grid-template-columns:minmax(0,140mm) 70mm;width:100%;height:100%;color:var(--elegant-text);background:#fff;font-family:var(--body-font)}
  .elegant-pdf *{box-sizing:border-box}
  .elegant-pdf-main{position:relative;min-width:0;height:100%;padding:max(14mm,calc(var(--doc-margin) - 2mm)) max(10mm,calc(var(--doc-margin) - 6mm)) max(13mm,calc(var(--doc-margin) - 4mm)) var(--doc-margin);overflow:hidden;background:#fff}
  .elegant-pdf-header{position:relative;padding-bottom:0}
  .elegant-pdf-header-compact{padding-bottom:3.2mm;border-bottom:.3mm solid var(--elegant-line)}
  .elegant-pdf-header .kicker{margin:0 0 2.2mm;color:var(--accent);font-size:7.7pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
  .elegant-pdf-header h1{margin:0;color:var(--elegant-heading);font-size:22pt;font-weight:500;letter-spacing:.01em;line-height:1.05;text-transform:uppercase;overflow-wrap:anywhere}
  .elegant-pdf-header h2{margin:2mm 0 0;color:var(--accent);font-size:12pt;font-weight:400;line-height:1.25;overflow-wrap:anywhere}
  .elegant-pdf-contacts{display:flex;flex-wrap:wrap;gap:1.2mm 3.5mm;margin:3.3mm 0 0;color:var(--elegant-text);font-size:8pt;font-style:normal;line-height:1.3}
  .elegant-pdf-contacts a,.elegant-pdf-contacts>span{display:inline-flex;align-items:baseline;gap:1mm;min-width:0;color:inherit;text-decoration:none}
  .elegant-pdf-contacts i{color:var(--elegant-line);font-size:9pt;font-style:normal}
  .elegant-pdf-contacts span{min-width:0;overflow-wrap:anywhere}
  .elegant-pdf-section{margin-top:var(--section-gap)}
  .elegant-pdf-section>h3,.elegant-pdf-ats .knowledge-section>h3{display:block;margin:0 0 3.2mm;padding-bottom:1.5mm;border-bottom:.3mm solid var(--elegant-line);color:var(--elegant-heading);font-size:12pt;font-weight:500;letter-spacing:.055em;line-height:1.1;text-transform:uppercase}
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
  .elegant-pdf-sidebar{position:relative;display:flex;flex-direction:column;gap:var(--section-gap);min-width:0;height:100%;padding:max(13mm,calc(var(--doc-margin) - 3mm)) max(12mm,calc(var(--doc-margin) - 5mm));overflow:hidden;color:#fff;background:var(--secondary);box-shadow:inset 0 3.5mm 0 #600101}
  .elegant-pdf-photo{display:block;width:27mm;height:27mm;margin:0 auto 8mm;overflow:hidden;border-radius:1.5mm;background:color-mix(in srgb,var(--secondary),white 12%);object-fit:cover}
  .elegant-pdf-sidebar section{margin:0;break-inside:avoid;page-break-inside:avoid}
  .elegant-pdf-sidebar section>h3{position:relative;margin:0 0 2.4mm;padding-bottom:1.6mm;border-bottom:.3mm solid rgb(255 255 255 / 75%);color:#fff;font-size:11.5pt;font-weight:400;letter-spacing:.075em;line-height:1.15;text-transform:uppercase}
  .elegant-pdf-sidebar section p,.elegant-pdf-sidebar section li{color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line)}
  .elegant-pdf-sidebar section p{margin:0}
  .elegant-pdf-sidebar section ul{margin:0;padding-left:4mm}
  .elegant-pdf-sidebar .knowledge-category{margin-bottom:2.5mm}
  .elegant-pdf-sidebar .knowledge-category h4,.elegant-pdf-sidebar .knowledge-subcategory h5{color:#fff;font-size:8.7pt}
  .elegant-pdf-sidebar .knowledge-tags span{border-color:color-mix(in srgb,white,transparent 50%);color:#fff}
  .elegant-pdf-strengths{display:grid;gap:3mm}
  .elegant-pdf-strength{display:grid;grid-template-columns:6mm minmax(0,1fr);gap:2mm;align-items:start}
  .elegant-pdf-strength i{color:#fff;font-size:11pt;font-style:normal;line-height:1}
  .elegant-pdf-strength h4{margin:0 0 1.2mm;color:#fff;font-size:10pt;font-weight:400;line-height:1.2}
  .elegant-pdf-strength p{margin:0;color:var(--elegant-sidebar-muted);font-size:var(--body-size);line-height:var(--body-line);overflow-wrap:anywhere}
  .elegant-pdf-languages{display:grid;gap:3mm}
  .elegant-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:1.8mm;align-items:center;color:var(--elegant-sidebar-muted)}
  .elegant-pdf-language strong{color:#fff;font-size:var(--body-size);font-weight:400}
  .elegant-pdf-language span{font-size:8pt}
  .elegant-pdf-language-dots{display:flex;gap:.8mm}
  .elegant-pdf-language-dots i{display:block;width:1.5mm;height:1.5mm;border-radius:50%;background:rgb(255 255 255 / 28%)}
  .elegant-pdf-language-dots i.filled{background:#fff}
  .elegant-pdf-continuation .kicker{color:var(--accent);font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
  .elegant-pdf-continuation h2{margin:3.5mm 0 0;color:#fff;font-size:18pt;line-height:1.05;overflow-wrap:anywhere}
  .elegant-pdf-continuation p{margin:1.8mm 0 0;color:var(--elegant-sidebar-muted)}
  .elegant-pdf-continuation hr{width:18mm;height:.6mm;margin:6mm 0;border:0;background:var(--accent)}
  .elegant-pdf-continuation a{display:block;margin-top:1.7mm;color:#fff;font-size:8.3pt;text-decoration:none;overflow-wrap:anywhere}
  .elegant-pdf-footer{position:absolute;right:max(10mm,calc(var(--doc-margin) - 6mm));bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;color:var(--elegant-muted);font-size:7.2pt}
  .elegant-pdf-footer a{color:var(--accent);text-decoration:none}
  .elegant-pdf-footer span:last-child{margin-left:auto}
  .elegant-pdf-ats{--elegant-heading:#3b4247;--elegant-text:#4b5359;--elegant-muted:#6d757a;--elegant-line:#b9bfc3;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--elegant-text);background:#fff}
  .elegant-pdf-ats .elegant-pdf-contacts{display:block}
  .elegant-pdf-ats .elegant-pdf-contacts a,.elegant-pdf-ats .elegant-pdf-contacts span{display:block;margin-top:.8mm}
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
  .zeit-pdf-header{display:grid;grid-template-columns:minmax(0,28.4%) minmax(0,6.25%) minmax(0,65.35%);min-height:36.5mm;margin-bottom:1.5mm}
  .zeit-pdf-identity{grid-column:3;min-width:0;padding-top:4mm}
  .zeit-pdf-identity h1{margin:0;color:var(--zeit-heading);font-size:25pt;font-weight:350;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
  .zeit-pdf-identity h2{display:inline-block;width:100%;max-width:100%;margin:4mm 0 0;padding:2.6mm 4mm;border-radius:3.8mm;color:var(--zeit-dark);background:var(--zeit-soft);font-size:12.5pt;font-weight:600;letter-spacing:.045em;line-height:1.15;text-transform:uppercase;overflow-wrap:anywhere}
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
  .zeit-pdf-columns:before{display:none}
  .zeit-pdf-columns.continuation{display:block}.zeit-pdf-columns.continuation:before{display:none}
  .zeit-pdf-left{grid-column:1;min-width:0;padding-top:12mm}.zeit-pdf-main{grid-column:3;min-width:0}
  .zeit-pdf-section,.zeit-pdf-left>section{margin-top:var(--section-gap);break-inside:avoid;page-break-inside:avoid}
  .zeit-pdf-left>section:first-child,.zeit-pdf-main>.zeit-pdf-section:first-child{margin-top:0}
  .zeit-pdf-heading{display:flex;align-items:center;gap:2mm;margin:0 0 3mm}
  .zeit-pdf-heading i{display:grid;flex:none;width:6.5mm;height:6.5mm;place-items:center;border-radius:1.5mm;color:var(--zeit-dark);background:var(--zeit-soft);font-style:normal}
  .zeit-pdf-heading i svg{width:4mm;height:4mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.9}
  .zeit-pdf-heading h3{margin:0;color:var(--zeit-dark);font-size:11pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}
  .zeit-pdf-summary{margin:0;color:var(--zeit-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .zeit-pdf-contacts{display:grid;gap:2.3mm}
  .zeit-pdf-contact{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;min-width:0;color:inherit;font-size:7.7pt;letter-spacing:-.01em;line-height:1.28;text-decoration:none}
  .zeit-pdf-contact i{display:grid;place-items:start center;color:var(--accent);font-style:normal}.zeit-pdf-contact i svg{width:3.8mm;height:3.8mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5}.zeit-pdf-contact span{overflow-wrap:anywhere}
  .zeit-pdf-strengths{display:grid;gap:4.5mm}.zeit-pdf-strength{display:grid;grid-template-columns:3.5mm minmax(0,1fr);gap:1.5mm;align-items:start}
  .zeit-pdf-strength>i{width:2mm;height:2mm;margin-top:1.2mm;border-radius:50%;background:var(--accent)}.zeit-pdf-strength h4{margin:0;color:var(--zeit-heading);font-size:9.5pt;font-weight:700;line-height:1.2;overflow-wrap:anywhere}.zeit-pdf-strength p{margin:1.2mm 0 0;color:var(--zeit-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .zeit-pdf-languages{display:grid;gap:3mm}.zeit-pdf-language>div{display:grid;grid-template-columns:minmax(13mm,auto) minmax(0,1fr) auto;align-items:center;gap:1.5mm;min-width:0}.zeit-pdf-language h4{margin:0;color:var(--zeit-dark);font-size:8.8pt;font-weight:750;line-height:1.15;text-transform:uppercase;overflow-wrap:anywhere}.zeit-pdf-language>div>span:not(.zeit-pdf-dots){color:var(--zeit-muted);font-size:7.8pt;font-weight:600;line-height:1.15;overflow-wrap:anywhere}
  .zeit-pdf-dots{display:flex;gap:.7mm}.zeit-pdf-dots i{display:block;width:1.35mm;height:1.35mm;border:.25mm solid var(--zeit-muted);border-radius:50%}.zeit-pdf-dots i.filled{border-color:var(--zeit-dark);background:var(--zeit-dark)}
  .zeit-pdf-list{display:flex;flex-direction:column;gap:5mm}.zeit-pdf-entry{break-inside:avoid;page-break-inside:avoid}
  .zeit-pdf-entry-top,.zeit-pdf-entry-role{display:grid;grid-template-columns:minmax(0,1fr) minmax(25mm,35mm);gap:5mm;align-items:start}
  .zeit-pdf-entry-top h4,.zeit-pdf-entry-role h5{margin:0;overflow-wrap:anywhere}.zeit-pdf-entry-top h4{color:var(--zeit-heading);font-size:10.5pt;font-weight:750;line-height:1.2}
  .zeit-pdf-entry-top span,.zeit-pdf-entry-role span{color:var(--zeit-muted);font-size:7.8pt;line-height:1.2;text-align:right;overflow-wrap:anywhere}
  .zeit-pdf-entry-role{margin-top:.8mm}.zeit-pdf-entry-role h5{color:var(--zeit-heading);font-size:9.2pt;font-weight:400;line-height:1.2}
  .zeit-pdf-entry ul,.zeit-pdf-left ul,.zeit-pdf-ats ul{margin:1.5mm 0 0;padding-left:4.5mm}.zeit-pdf-entry li,.zeit-pdf-left li,.zeit-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.zeit-pdf-entry li::marker,.zeit-pdf-left li::marker,.zeit-pdf-ats li::marker{color:var(--accent)}
  .zeit-pdf-footer{position:absolute;right:var(--doc-margin);bottom:6mm;left:var(--doc-margin);display:flex;justify-content:space-between;gap:6mm;color:var(--zeit-muted);font-size:7.2pt}.zeit-pdf-footer a{color:var(--zeit-dark);text-decoration:none}.zeit-pdf-footer span:last-child{margin-left:auto}
  .zeit-pdf-ats{--zeit-dark:#075e4e;--zeit-heading:#263a35;--zeit-text:#303c39;--zeit-muted:#687277;--zeit-divider:#ccd6d2;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--zeit-text);background:#fff}
  .zeit-pdf-ats .zeit-pdf-header{display:block;min-height:auto;margin:0;padding-bottom:4mm;border-bottom:.35mm solid var(--zeit-divider)}.zeit-pdf-ats .zeit-pdf-identity{padding:0}.zeit-pdf-ats .zeit-pdf-identity h1{font-size:20pt;font-weight:600}.zeit-pdf-ats .zeit-pdf-identity h2{margin:1.5mm 0 0;padding:0;background:transparent;font-size:10pt}
  .zeit-pdf-ats-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 5mm;margin-top:3mm;font-size:7.8pt;font-style:normal}.zeit-pdf-ats-contacts a,.zeit-pdf-ats-contacts span{color:inherit;text-decoration:none;overflow-wrap:anywhere}
  .zeit-pdf-ats .zeit-pdf-heading i{display:none}.zeit-pdf-ats .zeit-pdf-heading{gap:0;padding-bottom:1.4mm;border-bottom:.45mm solid var(--zeit-divider)}
  .zeit-pdf-ats>section,.zeit-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.zeit-pdf-ats>section>h3,.zeit-pdf-ats .knowledge-section>h3{margin:0 0 3mm;padding-bottom:1.4mm;border-bottom:.45mm solid var(--zeit-divider);color:var(--zeit-dark);font-size:11pt;font-weight:750;text-transform:uppercase}
`;

const kreativDocumentCss = `
  .kreativ-pdf{--kreativ-dark:#075d4e;--kreativ-text:#465156;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;--kreativ-light:#d7dfdc;--kreativ-inactive:#e1e5e3;--kreativ-margin:calc(var(--doc-margin) + 1mm);--kreativ-column-gap:11mm;--kreativ-section-gap:var(--section-gap);--kreativ-entry-gap:4.5mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--kreativ-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}
  .kreativ-pdf *{box-sizing:border-box}
  .kreativ-pdf-header{position:relative;z-index:3;display:grid;grid-template-columns:minmax(0,1fr) 28mm;align-items:center;gap:10mm;width:100%;height:46mm;padding:12mm var(--kreativ-margin) 6mm;color:#fff;background:var(--accent)}
  .kreativ-pdf-identity{min-width:0}.kreativ-pdf-identity h1{margin:0;color:inherit;font-size:23pt;font-weight:750;letter-spacing:.015em;line-height:1;overflow-wrap:anywhere}.kreativ-pdf-identity h2{margin:1.5mm 0 0;color:inherit;font-size:11.5pt;font-weight:650;line-height:1.15;overflow-wrap:anywhere}
  .kreativ-pdf-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 8mm;max-width:118mm;margin:2.2mm 0 0;font-size:7.8pt;font-style:normal;line-height:1.15}.kreativ-pdf-contacts a,.kreativ-pdf-contacts>span{display:grid;grid-template-columns:3.2mm minmax(0,1fr);align-items:center;gap:1.1mm;min-width:0;color:inherit;text-decoration:none}.kreativ-pdf-contacts svg{width:3mm;height:3mm;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.4}.kreativ-pdf-contacts i{min-width:0;font-style:normal;overflow-wrap:anywhere}
  .kreativ-pdf-photo{display:block;width:28mm;height:28mm;overflow:hidden;border-radius:1.8mm;background:rgba(255,255,255,.18);object-fit:cover}
  .kreativ-pdf-header.no-photo{grid-template-columns:minmax(0,1fr)}
  .kreativ-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1.5mm 4mm;height:auto;min-height:24mm;padding:12mm var(--kreativ-margin) 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}
  .kreativ-pdf-header.compact .kreativ-pdf-identity{display:contents}.kreativ-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--accent);font-size:7.3pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.kreativ-pdf-header.compact h1{font-size:15pt}.kreativ-pdf-header.compact h2{margin:0;color:var(--kreativ-muted);font-size:8.7pt}
  .kreativ-pdf-background{position:absolute;top:46mm;right:-9mm;z-index:1;width:78mm;height:78mm;fill:none;stroke:color-mix(in srgb,var(--accent),transparent 85%);stroke-width:.9;pointer-events:none}.kreativ-pdf-background .wide{stroke-dasharray:1.2 1.5}.kreativ-pdf-background .tight{stroke-dasharray:.8 1.2}
  .kreativ-pdf-content{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,105fr) minmax(0,64fr);column-gap:var(--kreativ-column-gap);align-items:start;padding:10mm var(--kreativ-margin) max(13mm,calc(var(--kreativ-margin) - 2mm))}
  .kreativ-pdf-content.continuation{display:block;padding-top:7mm}.kreativ-pdf-left{grid-column:1;min-width:0}.kreativ-pdf-right{position:relative;grid-column:2;min-width:0}
  .kreativ-pdf-section,.kreativ-pdf-right>section{margin:0 0 var(--kreativ-section-gap);break-inside:avoid;page-break-inside:avoid}
  .kreativ-pdf-title,.kreativ-pdf-right section>h3,.kreativ-pdf-ats>section>h3,.kreativ-pdf-ats .knowledge-section>h3{margin:0 0 3.5mm;padding-bottom:1.2mm;border-bottom:.65mm solid var(--kreativ-dark);color:var(--kreativ-dark);font-family:var(--heading-font);font-size:14pt;font-weight:750;letter-spacing:.025em;line-height:1;text-transform:uppercase}
  .kreativ-pdf-summary{margin:0;color:var(--kreativ-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .kreativ-pdf-list{display:flex;flex-direction:column;gap:var(--kreativ-entry-gap)}.kreativ-pdf-entry{padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light);break-inside:avoid;page-break-inside:avoid}.kreativ-pdf-entry:last-child{padding-bottom:0;border-bottom:0}
  .kreativ-pdf-entry h4,.kreativ-pdf-entry h5{margin:0;overflow-wrap:anywhere}.kreativ-pdf-entry h4{color:var(--kreativ-dark);font-size:11pt;font-weight:600;line-height:1.15}.kreativ-pdf-entry h5{margin-top:1mm;color:var(--accent);font-size:9.5pt;font-weight:750;line-height:1.2}
  .kreativ-pdf-entry-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm;color:var(--kreativ-muted);font-size:7.8pt;line-height:1.2}.kreativ-pdf-entry-meta span+span:before{margin-right:1.5mm;color:var(--accent);content:"·"}
  .kreativ-pdf-entry ul,.kreativ-pdf-right ul,.kreativ-pdf-ats ul{margin:0;padding-left:4.5mm}.kreativ-pdf-entry li,.kreativ-pdf-right li,.kreativ-pdf-ats li{margin:.5mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.kreativ-pdf-entry li::marker,.kreativ-pdf-right li::marker,.kreativ-pdf-ats li::marker{color:var(--accent)}
  .kreativ-pdf-strengths{display:grid}.kreativ-pdf-strength{display:grid;grid-template-columns:7mm minmax(0,1fr);align-items:start;gap:2.5mm;min-width:0;margin-bottom:3mm;padding-bottom:3mm;border-bottom:.25mm dashed var(--kreativ-light)}.kreativ-pdf-strength:last-child{margin:0;padding:0;border:0}.kreativ-pdf-strength svg{width:5.5mm;height:5.5mm;color:var(--accent);fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2}.kreativ-pdf-strength i{display:grid;place-items:center;width:5.5mm;height:5.5mm;color:var(--accent);font-size:9pt;font-style:normal}.kreativ-pdf-strength h4,.kreativ-pdf-strength span{margin:0;color:var(--kreativ-dark);font-size:9.4pt;font-weight:750;line-height:1.2;overflow-wrap:anywhere}.kreativ-pdf-strength p{margin:1.5mm 0 0;color:var(--kreativ-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .kreativ-pdf-languages{display:grid;gap:3mm}.kreativ-pdf-language h4{margin:0;color:var(--kreativ-dark);font-size:8.8pt;font-weight:750;line-height:1.15}.kreativ-pdf-language>div{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:2mm;margin-top:1mm;color:var(--kreativ-muted);font-size:7.6pt}.kreativ-pdf-dots{display:flex;gap:1mm}.kreativ-pdf-dots i{display:block;width:3.5mm;height:3.5mm;border-radius:50%;background:var(--kreativ-inactive)}.kreativ-pdf-dots i.filled{background:var(--accent)}
  .kreativ-pdf-skills{display:flex;flex-wrap:wrap;gap:2.5mm 4mm}.kreativ-pdf-skill{max-width:100%;padding:0 1.5mm 1.2mm;border-bottom:.3mm solid var(--kreativ-divider);color:var(--kreativ-text);font-size:8.4pt;font-weight:700;overflow-wrap:anywhere}
  .kreativ-pdf-footer{position:absolute;right:var(--kreativ-margin);bottom:6mm;left:var(--kreativ-margin);z-index:3;display:flex;justify-content:space-between;gap:6mm;color:var(--kreativ-muted);font-size:7.2pt}.kreativ-pdf-footer a{color:var(--kreativ-dark);text-decoration:none}.kreativ-pdf-footer span:last-child{margin-left:auto}
  .kreativ-pdf-ats{--kreativ-dark:#173b33;--kreativ-text:#303d3a;--kreativ-muted:#687277;--kreativ-divider:#b8c4c0;width:100%;height:100%;padding:var(--doc-margin);overflow:hidden;color:var(--kreativ-text);background:#fff}
  .kreativ-pdf-ats .kreativ-pdf-header{display:block;height:auto;min-height:auto;padding:0 0 4mm;color:var(--kreativ-dark);background:#fff;border-bottom:.4mm solid var(--kreativ-divider)}.kreativ-pdf-ats .kreativ-pdf-identity h1{font-size:20pt}.kreativ-pdf-ats .kreativ-pdf-identity h2{font-size:10pt}.kreativ-pdf-ats .kreativ-pdf-contacts{color:var(--kreativ-text)}
  .kreativ-pdf-ats>section,.kreativ-pdf-ats .knowledge-section{margin-top:var(--section-gap)}.kreativ-pdf-ats .knowledge-category h4,.kreativ-pdf-ats .knowledge-subcategory h5{color:var(--kreativ-dark)}
  .kreativ-pdf[data-density="compact"]{--kreativ-section-gap:max(5mm,calc(var(--section-gap) - 1mm));--kreativ-entry-gap:3.7mm}.kreativ-pdf[data-density="dense"]{--kreativ-section-gap:max(3.7mm,calc(var(--section-gap) - 2mm));--kreativ-entry-gap:2.8mm}.kreativ-pdf[data-density="dense"] .kreativ-pdf-header{height:42mm;padding-top:6mm;padding-bottom:5mm}.kreativ-pdf[data-density="dense"] .kreativ-pdf-identity h1{font-size:21pt}.kreativ-pdf[data-density="dense"] .kreativ-pdf-content{padding-top:6mm}
`;

const ivyLeagueDocumentCss = `
  .ivy-pdf{--ivy-heading:var(--accent);--ivy-accent:var(--secondary);--ivy-text:#3f4b50;--ivy-muted:#667177;--ivy-divider:color-mix(in srgb,var(--accent),#0b459a 38%);--ivy-inactive:#dce9e8;--ivy-margin:var(--doc-margin);position:relative;width:100%;height:100%;overflow:hidden;color:var(--ivy-text);background:transparent;font-family:var(--body-font)}
  .ivy-pdf *{box-sizing:border-box}.ivy-pdf-watercolor{position:absolute;inset:0;z-index:0;width:100%;height:100%;pointer-events:none}.ivy-pdf-content{position:relative;z-index:2;height:100%;padding:max(11mm,calc(var(--ivy-margin) - 1mm)) var(--ivy-margin) max(13mm,calc(var(--ivy-margin) + 1mm))}
  .ivy-pdf-header{min-height:19mm;margin:0 0 5.5mm;text-align:center}.ivy-pdf-header .kicker{margin:0 0 1.2mm;color:var(--ivy-muted);font-size:7.2pt}.ivy-pdf-header h1{margin:0;color:var(--ivy-heading);font-family:Georgia,"Times New Roman",serif;font-size:17.5pt;font-weight:700;letter-spacing:.015em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.ivy-pdf-header h2{margin:1.5mm 0 1.3mm;color:var(--ivy-accent);font-size:11.5pt;font-weight:400;line-height:1.2;overflow-wrap:anywhere}
  .ivy-pdf-contacts{display:flex;flex-wrap:wrap;justify-content:center;gap:.7mm 2.3mm;margin:0;color:var(--ivy-text);font-size:7.8pt;font-style:normal;line-height:1.25}.ivy-pdf-contacts a,.ivy-pdf-contacts span{color:inherit;text-decoration:none;overflow-wrap:anywhere}.ivy-pdf-contacts i{color:var(--ivy-text);font-style:normal}.ivy-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;min-height:auto;margin-bottom:5mm;padding-bottom:2.5mm;border-bottom:.3mm solid var(--ivy-divider);text-align:left}.ivy-pdf-header.compact .kicker{flex-basis:100%}.ivy-pdf-header.compact h1{font-size:14pt}.ivy-pdf-header.compact h2{max-width:96mm;margin:0;font-size:8.5pt;text-align:right}
  .ivy-pdf-section,.ivy-pdf>.ivy-pdf-content>.knowledge-section{position:relative;z-index:2;min-width:0;margin:0 0 var(--section-gap)}.ivy-pdf-title,.ivy-pdf .knowledge-section>h3{position:relative;margin:0 0 2.5mm;padding:0 0 1.5mm;border-bottom:.3mm solid var(--ivy-divider);color:var(--ivy-heading);font-family:Georgia,"Times New Roman",serif;font-size:13.5pt;font-weight:700;line-height:1.05;text-align:center;text-transform:none;break-after:avoid;page-break-after:avoid}.ivy-pdf-summary{margin:0;color:var(--ivy-text);font-size:var(--body-size);line-height:var(--body-line);hyphens:auto;overflow-wrap:break-word}
  .ivy-pdf-strengths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3.5mm 8mm}.ivy-pdf-strength{display:grid;grid-template-columns:5.5mm minmax(0,1fr);gap:1.5mm;min-width:0;break-inside:avoid}.ivy-pdf-strength i{color:var(--ivy-accent);font-size:13pt;font-style:normal;line-height:1}.ivy-pdf-strength h3{margin:0 0 .8mm;color:var(--ivy-heading);font-size:9.5pt;font-weight:600;line-height:1.15;overflow-wrap:anywhere}.ivy-pdf-strength p{margin:0;font-size:var(--body-size);line-height:var(--body-line)}
  .ivy-pdf-list{display:flex;flex-direction:column;gap:4.5mm}.ivy-pdf-entry{min-width:0;break-inside:avoid;page-break-inside:avoid}.ivy-pdf-entry-top,.ivy-pdf-entry-role{display:grid;grid-template-columns:minmax(0,1fr) minmax(32mm,auto);gap:8mm;align-items:baseline}.ivy-pdf-entry h3,.ivy-pdf-entry h4{margin:0;overflow-wrap:anywhere}.ivy-pdf-entry-top h3{color:var(--ivy-accent);font-size:10.5pt;font-weight:500;line-height:1.15}.ivy-pdf-entry-top span,.ivy-pdf-entry-role span{color:var(--ivy-text);font-size:var(--body-size);line-height:1.2;text-align:right;overflow-wrap:anywhere}.ivy-pdf-entry-role{margin-top:.7mm}.ivy-pdf-entry-role h4{color:var(--ivy-heading);font-size:9.7pt;font-weight:500;line-height:1.18}.ivy-pdf-entry-role span{white-space:nowrap}
  .ivy-pdf-entry ul,.ivy-pdf-certifications ul,.ivy-pdf-ats ul{margin:1.3mm 0 0;padding-left:4.5mm}.ivy-pdf-entry li,.ivy-pdf-certifications li,.ivy-pdf-ats li{margin:.35mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.ivy-pdf-entry li::marker,.ivy-pdf-certifications li::marker{color:var(--ivy-heading)}.ivy-pdf-education .ivy-pdf-list{gap:3.2mm}.ivy-pdf-knowledge{margin:0;overflow-wrap:anywhere}
  .ivy-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 20mm}.ivy-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:2mm;align-items:center;min-width:0}.ivy-pdf-language strong{color:var(--ivy-heading);font-weight:600}.ivy-pdf-language>span:not(.ivy-pdf-dots){overflow-wrap:anywhere}.ivy-pdf-dots{display:flex;gap:1mm}.ivy-pdf-dots i{display:block;width:2.1mm;height:2.1mm;border-radius:50%;background:var(--ivy-inactive)}.ivy-pdf-dots i.filled{background:var(--ivy-heading)}
  .ivy-pdf-footer{position:absolute;right:var(--ivy-margin);bottom:6mm;left:var(--ivy-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--ivy-muted);font-size:7.1pt}.ivy-pdf-footer a{color:var(--ivy-muted);text-decoration:none}.ivy-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}
  .ivy-pdf-ats{--ivy-heading:#173b63;--ivy-accent:#173b63;--ivy-text:#303b42;--ivy-divider:#aeb8bf;padding:max(11mm,calc(var(--doc-margin) - 1mm)) var(--doc-margin) 13mm;background:#fff;font-family:Arial,sans-serif}.ivy-pdf-ats .ivy-pdf-header{padding-bottom:3.5mm;border-bottom:.3mm solid var(--ivy-divider)}.ivy-pdf-ats .ivy-pdf-header h1{font-family:Arial,sans-serif;font-size:19pt}.ivy-pdf-ats .ivy-pdf-header h2{color:var(--ivy-heading);font-size:10pt}.ivy-pdf-ats .ivy-pdf-title,.ivy-pdf-ats .knowledge-section>h3{font-family:Arial,sans-serif;font-size:11pt;text-align:left}.ivy-pdf-ats .knowledge-category h4,.ivy-pdf-ats .knowledge-subcategory h5{color:var(--ivy-heading)}
  .ivy-pdf[data-density="compact"]{--section-gap:max(4.5mm,calc(var(--doc-section-gap) - 1mm))}.ivy-pdf[data-density="compact"] .ivy-pdf-list{gap:3.6mm}.ivy-pdf[data-density="dense"]{--section-gap:max(3.8mm,calc(var(--doc-section-gap) - 2mm))}.ivy-pdf[data-density="dense"] .ivy-pdf-list{gap:3mm}.ivy-pdf[data-density="dense"] .ivy-pdf-title{margin-bottom:2mm;font-size:12.5pt}
  @media print{.no-print-background .ivy-pdf-watercolor{display:none!important}}
`;

const extendedResumeDocumentCss = `
  .managed-pdf{position:relative;width:100%;height:100%;overflow:hidden;color:var(--managed-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}
  .managed-pdf *{box-sizing:border-box}.managed-pdf a{color:inherit;text-decoration:none}.managed-pdf-content{position:relative;z-index:2;height:100%}.managed-pdf-background{position:absolute;inset:0;z-index:0;width:100%;height:100%;pointer-events:none}.managed-pdf-section{min-width:0;margin:0 0 var(--managed-section-gap);break-inside:avoid}.managed-pdf-title{margin:0 0 3mm;color:var(--managed-muted);font-size:9pt;font-weight:500;line-height:1;text-transform:uppercase;break-after:avoid}.managed-pdf-list{display:flex;flex-direction:column;gap:var(--managed-entry-gap)}.managed-pdf-entry{break-inside:avoid}.managed-pdf-entry h3,.managed-pdf-entry h4{margin:0;overflow-wrap:anywhere}.managed-pdf-entry ul,.managed-pdf-ats ul{margin:1mm 0 0;padding-left:4mm}.managed-pdf-entry li,.managed-pdf-ats li{margin:.25mm 0;padding-left:.4mm;hyphens:auto;overflow-wrap:break-word}.managed-pdf-footer{position:absolute;right:var(--managed-margin);bottom:6mm;left:var(--managed-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--managed-muted);font-size:7pt}.managed-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}
  .stilvoll-pdf{--managed-primary:var(--accent);--managed-dark:var(--secondary);--managed-text:#465156;--managed-muted:#6d777c;--managed-divider:#aeb8b5;--managed-pattern:#dce2df;--managed-margin:max(15mm,var(--doc-margin));--managed-section-gap:var(--section-gap);--managed-entry-gap:5mm}.stilvoll-pdf .managed-pdf-background{color:var(--managed-pattern);opacity:.62}.stilvoll-pdf .managed-pdf-background path{fill:none;stroke:currentColor;stroke-width:.45}.stilvoll-pdf-header{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) 28mm;gap:10mm;min-height:36mm;padding:14mm var(--managed-margin) 0}.stilvoll-pdf-header.no-photo{grid-template-columns:1fr}.stilvoll-pdf-header h1{margin:0;color:var(--managed-dark);font-size:23pt;font-weight:400;line-height:1;letter-spacing:.015em;text-transform:uppercase;overflow-wrap:anywhere}.stilvoll-pdf-header h2{margin:2mm 0 2.5mm;color:var(--managed-primary);font-size:12pt;font-weight:400;line-height:1.2}.stilvoll-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 3.5mm;margin:0;color:var(--managed-text);font-size:7.8pt;font-style:normal}.stilvoll-pdf-contacts span{display:inline-flex;gap:1mm}.stilvoll-pdf-contacts i{color:var(--managed-muted);font-style:normal}.stilvoll-pdf-photo{width:26mm;height:26mm;overflow:hidden;border-radius:1.5mm;object-fit:cover}.stilvoll-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:24mm;padding-top:11mm;padding-bottom:3mm;border-bottom:.3mm solid var(--managed-divider)}.stilvoll-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-primary);font-size:7pt;text-transform:uppercase}.stilvoll-pdf-header.compact h1{font-size:15pt}.stilvoll-pdf-header.compact h2{margin:0;font-size:8.5pt}.stilvoll-pdf-columns{display:grid;grid-template-columns:54mm minmax(0,115mm);gap:11mm;padding:10mm var(--managed-margin) 16mm}.stilvoll-pdf-columns.continuation{display:block;padding-top:6mm}.stilvoll-pdf .managed-pdf-title{padding-bottom:1mm;border-bottom:.3mm solid var(--managed-divider)}.stilvoll-pdf-strength{display:grid;grid-template-columns:9mm minmax(0,1fr);gap:3mm;margin-bottom:5mm}.stilvoll-pdf-strength i{display:grid;place-items:center;width:8mm;height:8mm;border-radius:50%;color:var(--managed-primary);background:#f1f3f2;font-style:normal}.stilvoll-pdf-strength h3{margin:0 0 1mm;color:var(--managed-dark);font-size:9.5pt;font-weight:500}.stilvoll-pdf-strength p{margin:0}.stilvoll-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) 11mm;gap:2mm;align-items:center;margin-bottom:3mm}.managed-pdf-dots{display:flex;gap:.6mm}.managed-pdf-dots i{display:block;width:1.5mm;height:1.5mm;border-radius:50%;background:#dde2e0}.managed-pdf-dots i.filled{background:var(--managed-dark)}.stilvoll-pdf-entry h3{color:var(--managed-dark);font-size:11pt;font-weight:400}.stilvoll-pdf-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm}.stilvoll-pdf-meta strong{margin-right:auto;color:var(--managed-primary);font-size:9.8pt;font-weight:400}.stilvoll-pdf-meta span{color:var(--managed-muted);font-size:7.8pt}
  .kompakt-pdf{isolation:isolate;--managed-primary:var(--accent);--managed-accent:var(--secondary);--managed-text:#3f494f;--managed-muted:#6d757a;--managed-divider:#aeb6ba;--managed-pattern:#ffd7bc;--managed-margin:max(13mm,calc(var(--doc-margin) - 1mm));--managed-section-gap:max(3.5mm,calc(var(--section-gap) - 1mm));--managed-entry-gap:4mm}.kompakt-pdf .managed-pdf-background{z-index:-1;color:var(--managed-pattern);opacity:.72}.kompakt-pdf .managed-pdf-background path,.kompakt-pdf .managed-pdf-background circle{fill:none;stroke:currentColor;stroke-width:.7}.kompakt-pdf-header{position:relative;z-index:2;min-height:22mm;padding:13mm var(--managed-margin) 0}.kompakt-pdf-header h1{max-width:112mm;margin:0;color:var(--managed-primary);font-size:20pt;font-weight:450;line-height:1}.kompakt-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 4mm;padding-top:10mm;border-bottom:.25mm solid var(--managed-divider)}.kompakt-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-accent);font-size:7pt;text-transform:uppercase}.kompakt-pdf-header.compact h1{font-size:14pt}.kompakt-pdf-header h2{margin:0;color:var(--managed-muted);font-size:8.5pt}.kompakt-pdf-columns{display:grid;grid-template-columns:108mm 66mm;gap:10mm;padding:9mm var(--managed-margin) 15mm}.kompakt-pdf-columns.continuation{display:block;padding-top:6mm}.kompakt-pdf-entry h3{color:var(--managed-primary);font-size:10.5pt;font-weight:550}.kompakt-pdf-meta{display:flex;flex-wrap:wrap;gap:.7mm 4mm;margin:.7mm 0 1mm;color:var(--managed-muted);font-size:7.4pt}.kompakt-pdf-meta strong{color:var(--managed-accent);font-size:8.4pt}.kompakt-pdf-contacts{display:grid;gap:3.5mm;margin:0;font-style:normal}.kompakt-pdf-contact{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;align-items:center;color:var(--managed-primary);font-size:8.8pt}.kompakt-pdf-contact i{color:var(--managed-accent);font-size:11pt;font-style:normal}.kompakt-pdf-strength{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;margin-bottom:4mm}.kompakt-pdf-strength i{color:var(--managed-accent);font-size:11pt;font-style:normal}.kompakt-pdf-strength h3{margin:0 0 1mm;color:var(--managed-primary);font-size:9pt}.kompakt-pdf-strength p{margin:0}.kompakt-pdf-skills{display:flex;flex-wrap:wrap;gap:2mm 3mm}.kompakt-pdf-skill{padding:0 1.5mm 1mm;border-bottom:.3mm solid var(--managed-divider);color:var(--managed-primary);font-size:7.8pt;font-weight:700}.kompakt-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 8mm}.kompakt-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:1.5mm;align-items:center}.kompakt-pdf-language strong{color:var(--managed-primary)}.kompakt-pdf-language .managed-pdf-dots i{width:2.2mm;height:2.2mm}.kompakt-pdf-language .managed-pdf-dots i.filled{background:var(--managed-accent)}
  .einfach-pdf{isolation:isolate;--managed-primary:var(--accent);--managed-accent:var(--secondary);--managed-text:#3e484e;--managed-muted:#68747a;--managed-divider:var(--accent);--managed-pattern:#eaf5fd;--managed-margin:max(15mm,var(--doc-margin));--managed-section-gap:calc(var(--section-gap) + 1.5mm);--managed-entry-gap:4.5mm;font-size:calc(var(--body-size) + 1.2pt);line-height:clamp(1.1,calc(var(--body-line) - .25),1.18)}.einfach-pdf p,.einfach-pdf li{font-size:inherit;line-height:inherit}.einfach-pdf .managed-pdf-background{z-index:-1;color:var(--managed-pattern);opacity:.78}.einfach-pdf .managed-pdf-background path{fill:none;stroke:currentColor;stroke-width:4.2}.einfach-pdf-inner{position:relative;z-index:2;height:100%;padding:max(14mm,calc(var(--managed-margin) - 1mm)) var(--managed-margin) 16mm}.einfach-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 36mm;gap:8mm;min-height:35mm;margin-bottom:5.5mm}.einfach-pdf-header.no-photo{grid-template-columns:1fr}.einfach-pdf-header h1{margin:0;color:var(--managed-primary);font-size:24pt;font-weight:750;line-height:1;text-transform:uppercase}.einfach-pdf-header h2{margin:2mm 0;color:var(--managed-accent);font-size:11.5pt;line-height:1.2}.einfach-pdf-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1mm 8mm;max-width:118mm;margin:0;font-size:8.2pt;font-style:normal;line-height:1.18}.einfach-pdf-contact{display:grid;grid-template-columns:4mm minmax(0,1fr);gap:1mm;min-width:0}.einfach-pdf-contact i{color:var(--managed-accent);font-style:normal;font-weight:700}.einfach-pdf-contact a,.einfach-pdf-contact span{min-width:0;overflow-wrap:anywhere}.einfach-pdf-photo{width:34mm;height:34mm;border-radius:50%;object-fit:cover}.einfach-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:6mm;padding-bottom:3mm;border-bottom:.5mm solid var(--managed-primary)}.einfach-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--managed-accent);font-size:7pt;text-transform:uppercase}.einfach-pdf-header.compact h1{font-size:16pt}.einfach-pdf-header.compact h2{margin:0;font-size:9pt}.einfach-pdf .managed-pdf-section>p{margin:0;hyphens:auto;overflow-wrap:break-word}.einfach-pdf .managed-pdf-title{margin-bottom:3.5mm;padding-bottom:1mm;border-bottom:.65mm solid var(--managed-primary);color:var(--managed-primary);font-size:13.5pt;font-weight:750}.einfach-pdf-strengths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4mm 15mm}.einfach-pdf-strength{display:grid;grid-template-columns:7mm minmax(0,1fr);gap:2mm}.einfach-pdf-strength i{color:var(--managed-accent);font-size:14pt;font-style:normal}.einfach-pdf-strength h3{margin:0 0 1.5mm;color:var(--managed-primary);font-size:9.5pt}.einfach-pdf-strength p{margin:0}.einfach-pdf-entry{padding-bottom:3mm;border-bottom:.25mm dashed #d4d9dc}.einfach-pdf-entry:last-child{padding-bottom:0;border-bottom:0}.einfach-pdf-entry h3{color:var(--managed-primary);font-size:11.5pt;font-weight:500;line-height:1.15}.einfach-pdf-entry h4{margin-top:1mm;color:var(--managed-accent);font-size:10pt;line-height:1.15}.einfach-pdf-meta{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin:1mm 0 1.5mm;color:var(--managed-muted);font-size:8.1pt}.einfach-pdf-meta span:first-child:before{margin-right:1.5mm;color:var(--managed-accent);content:"▦"}.einfach-pdf-meta span+span:before{margin-right:1.5mm;color:var(--managed-accent);content:"⌖"}.einfach-pdf-entry li{margin:.3mm 0}.einfach-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3mm 15mm}.einfach-pdf-language{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3mm;align-items:center}.einfach-pdf-language strong{color:var(--managed-primary);font-size:9.5pt}.einfach-pdf-language .managed-pdf-dots{gap:1mm}.einfach-pdf-language .managed-pdf-dots i{width:2.8mm;height:2.8mm}.einfach-pdf-language .managed-pdf-dots i.filled{background:var(--managed-accent)}
  .managed-pdf[data-density="compact"]{--managed-entry-gap:max(3.2mm,calc(var(--managed-entry-gap) - 1mm));--managed-section-gap:max(4mm,calc(var(--managed-section-gap) - 1mm))}.managed-pdf[data-density="dense"]{--managed-entry-gap:3mm;--managed-section-gap:4mm}.kompakt-pdf[data-density="dense"]{--managed-entry-gap:2.5mm;--managed-section-gap:3.5mm;font-size:max(7.5pt,calc(var(--body-size) - .5pt));line-height:max(1.18,calc(var(--body-line) - .07))}.einfach-pdf[data-density="compact"]{--managed-section-gap:max(5mm,var(--section-gap));--managed-entry-gap:3.8mm}.einfach-pdf[data-density="dense"]{--managed-section-gap:max(4.5mm,calc(var(--section-gap) - .5mm));--managed-entry-gap:3mm}
  .managed-pdf-ats{--managed-primary:#173b63;--managed-dark:#173b63;--managed-accent:#173b63;--managed-text:#303b42;--managed-muted:#626e75;--managed-divider:#aeb8bf;padding:14mm var(--managed-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.managed-pdf-ats .managed-pdf-header{display:block;min-height:auto;margin:0;padding:0 0 4mm;border-bottom:.3mm solid var(--managed-divider)}.managed-pdf-ats .managed-pdf-header h1{max-width:none;font-size:19pt}.managed-pdf-ats .managed-pdf-header h2{margin-top:1mm;color:var(--managed-primary);font-size:10pt}.managed-pdf-ats .managed-pdf-section{margin-top:var(--managed-section-gap);margin-bottom:0}.managed-pdf-ats .managed-pdf-title{margin-bottom:2mm;padding-bottom:1mm;border-bottom:.3mm solid var(--managed-divider);color:var(--managed-primary);font-size:10.5pt;font-weight:700}.managed-pdf-ats .managed-pdf-list{gap:var(--managed-entry-gap)}
  @media print{.no-print-background .managed-pdf-background{display:none!important}}
`;

const klassischDocumentCss = `
  .klassisch-pdf{isolation:isolate;--klassisch-primary:var(--accent);--klassisch-accent:var(--secondary);--klassisch-heading:#5a6267;--klassisch-text:#3f484d;--klassisch-muted:#68747a;--klassisch-soft:#cdeff3;--klassisch-border:#d5dbde;--klassisch-margin:max(15mm,var(--doc-margin));--klassisch-section-gap:var(--section-gap);--klassisch-entry-gap:4.2mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--klassisch-text);background:#fff;font-family:var(--body-font);font-size:var(--body-size);line-height:var(--body-line)}
  .klassisch-pdf *{box-sizing:border-box}.klassisch-pdf a{color:inherit;text-decoration:none}.klassisch-pdf-background{position:absolute;inset:0;z-index:-1;width:100%;height:100%;pointer-events:none}.klassisch-pdf-background .fill{fill:var(--klassisch-soft)}.klassisch-pdf-background .line{fill:none;stroke:rgba(255,255,255,.92);stroke-width:.28;vector-effect:non-scaling-stroke}.klassisch-pdf-content{position:relative;z-index:2;height:100%;padding:14mm var(--klassisch-margin) 17mm}
  .klassisch-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 34mm;gap:8mm;align-items:start;min-height:33mm;margin-bottom:7mm}.klassisch-pdf-header.no-photo{grid-template-columns:1fr}.klassisch-pdf-header h1{max-width:138mm;margin:0;color:var(--klassisch-primary);font-size:26pt;font-weight:750;letter-spacing:-.01em;line-height:1;overflow-wrap:anywhere}.klassisch-pdf-header h2{margin:2mm 0 1.5mm;color:var(--klassisch-text);font-size:12.2pt;font-weight:400;line-height:1.12;overflow-wrap:anywhere}.klassisch-pdf-contacts{display:flex;flex-wrap:wrap;gap:.5mm 3.2mm;max-width:146mm;margin:0;color:var(--klassisch-text);font-size:8pt;font-style:normal;line-height:1.25}.klassisch-pdf-contacts span{min-width:0;overflow-wrap:anywhere}.klassisch-pdf-contacts span+span:before{margin-right:3.2mm;color:var(--klassisch-muted);content:"·"}.klassisch-pdf-photo{justify-self:end;width:32mm;height:32mm;border-radius:50%;object-fit:cover;background:#edf1f3}
  .klassisch-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:6mm;padding-bottom:2.5mm;border-bottom:.3mm solid var(--klassisch-border)}.klassisch-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--klassisch-accent);font-size:7pt;font-weight:700;letter-spacing:.09em;text-transform:uppercase}.klassisch-pdf-header.compact h1{font-size:15.5pt}.klassisch-pdf-header.compact h2{margin:0;font-size:8.8pt}
  .klassisch-pdf-section{min-width:0;margin:0 0 var(--klassisch-section-gap);break-inside:avoid;page-break-inside:avoid}.klassisch-pdf-title{margin:0 0 3mm;color:var(--klassisch-heading);font-size:10.4pt;font-weight:750;letter-spacing:.01em;line-height:1;text-transform:uppercase;break-after:avoid}.klassisch-pdf-section>p{margin:0;hyphens:auto;overflow-wrap:break-word}
  .klassisch-pdf-strengths{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4mm 9mm}.klassisch-pdf-strength h3{margin:0 0 1.2mm;color:var(--klassisch-accent);font-size:9.8pt;font-weight:750;line-height:1.1;overflow-wrap:anywhere}.klassisch-pdf-strength p{margin:0;hyphens:auto}
  .klassisch-pdf-list{display:flex;flex-direction:column;gap:var(--klassisch-entry-gap)}.klassisch-pdf-entry{min-width:0;break-inside:avoid}.klassisch-pdf-entry-head{display:grid;grid-template-columns:minmax(0,1fr) 34mm;gap:7mm;align-items:start}.klassisch-pdf-entry h3,.klassisch-pdf-entry h4{margin:0;overflow-wrap:anywhere}.klassisch-pdf-entry h3{color:var(--klassisch-primary);font-size:12.2pt;font-weight:450;line-height:1.08}.klassisch-pdf-entry h4{margin-top:1mm;color:var(--klassisch-accent);font-size:10pt;font-weight:650;line-height:1.12}.klassisch-pdf-entry-meta{display:flex;flex-direction:column;gap:2mm;margin:0;color:var(--klassisch-muted);font-size:7.8pt;line-height:1.15;text-align:right}.klassisch-pdf-entry ul,.klassisch-pdf-certifications{margin:1.2mm 0 0;padding-left:4.3mm}.klassisch-pdf-entry li,.klassisch-pdf-certifications li{margin:.15mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.klassisch-pdf-education .klassisch-pdf-list{gap:3.5mm}.klassisch-pdf-education .klassisch-pdf-entry h3{font-size:11.7pt}.klassisch-pdf-education .klassisch-pdf-entry h4{color:var(--klassisch-text);font-size:9.4pt;font-weight:450}
  .klassisch-pdf-languages{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2mm 18mm;max-width:112mm}.klassisch-pdf-language{display:flex;gap:3mm;margin:0;color:var(--klassisch-text);font-size:9pt}.klassisch-pdf-language strong{color:var(--klassisch-primary);font-weight:500}.klassisch-pdf-footer{position:absolute;right:var(--klassisch-margin);bottom:6mm;left:var(--klassisch-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--klassisch-muted);font-size:7pt}.klassisch-pdf-footer span:last-child{margin-left:auto}
  .klassisch-pdf[data-density="compact"]{--klassisch-section-gap:max(4.8mm,calc(var(--section-gap) - 1mm));--klassisch-entry-gap:3.5mm}.klassisch-pdf[data-density="dense"]{--klassisch-section-gap:max(3.8mm,calc(var(--section-gap) - 2mm));--klassisch-entry-gap:2.8mm;font-size:max(8pt,calc(var(--body-size) - .3pt))}.klassisch-pdf[data-density="dense"] .klassisch-pdf-header{min-height:29mm;margin-bottom:5mm}.klassisch-pdf[data-density="dense"] .klassisch-pdf-header h1{font-size:23pt}
  .klassisch-pdf-ats{--klassisch-primary:#173b63;--klassisch-accent:#173b63;--klassisch-heading:#173b63;--klassisch-text:#303b42;--klassisch-muted:#626e75;--klassisch-border:#aeb8bf;padding:14mm var(--klassisch-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.klassisch-pdf-ats .klassisch-pdf-header{display:block;min-height:auto;margin:0 0 5mm;padding-bottom:3mm;border-bottom:.3mm solid var(--klassisch-border)}.klassisch-pdf-ats .klassisch-pdf-header h1{font-size:19pt}.klassisch-pdf-ats .klassisch-pdf-header h2{color:var(--klassisch-primary);font-size:10pt}.klassisch-pdf-ats .klassisch-pdf-title{margin-bottom:2mm;padding-bottom:1mm;border-bottom:.3mm solid var(--klassisch-border);font-size:10.5pt}.klassisch-pdf-ats .klassisch-pdf-strengths,.klassisch-pdf-ats .klassisch-pdf-languages{display:block;max-width:none}.klassisch-pdf-ats .klassisch-pdf-strength,.klassisch-pdf-ats .klassisch-pdf-language{margin:.7mm 0}
  @media print{.no-print-background .klassisch-pdf-background{display:none!important}}
`;

const mehrspaltigDocumentCss = `${klassischDocumentCss.replaceAll(
  "klassisch",
  "mehrspaltig",
)}
  .mehrspaltig-pdf{--mehrspaltig-primary:#003c96;--mehrspaltig-accent:#57adf4;--mehrspaltig-heading:#003c96;--mehrspaltig-border:#d7dee3;--mehrspaltig-margin:max(15mm,var(--doc-margin));font-size:calc(var(--body-size) + .1pt);line-height:min(1.22,var(--body-line))}.mehrspaltig-pdf-background .fill,.mehrspaltig-pdf-background .line{display:none}.mehrspaltig-pdf-background .ribbon{fill:none;stroke-width:2.3;stroke-linecap:round}.mehrspaltig-pdf-background .red{stroke:#f26b67}.mehrspaltig-pdf-background .orange{stroke:#f7a24c}.mehrspaltig-pdf-background .yellow{stroke:#f3cf54}.mehrspaltig-pdf-background .green{stroke:#73bf80}.mehrspaltig-pdf-background .blue{stroke:#59afe9}.mehrspaltig-pdf-background .purple{stroke:#a686cc}
  .mehrspaltig-pdf-content{padding:14mm var(--mehrspaltig-margin) 16mm}.mehrspaltig-pdf-header{position:relative;grid-template-columns:minmax(0,1fr) 30mm;gap:7mm;min-height:31mm;margin-bottom:5mm;padding-right:28mm}.mehrspaltig-pdf-header h1,.mehrspaltig-pdf-title,.mehrspaltig-pdf-entry h3,.mehrspaltig-pdf-strength h3{font-family:Georgia,"Times New Roman",serif}.mehrspaltig-pdf-header h1{max-width:none;color:var(--mehrspaltig-primary);font-size:25pt;font-weight:700;letter-spacing:.012em;line-height:.96;text-transform:uppercase}.mehrspaltig-pdf-header h2{margin:2.2mm 0 2mm;color:var(--mehrspaltig-accent);font-family:Georgia,"Times New Roman",serif;font-size:11.4pt;font-weight:700}.mehrspaltig-pdf-contacts{gap:1mm 4mm;max-width:none;font-size:7.7pt;line-height:1.15}.mehrspaltig-pdf-contacts span+span:before{margin-right:0;content:""}.mehrspaltig-pdf-photo{width:30mm;height:30mm}.mehrspaltig-pdf-header.compact{margin-bottom:5mm;border-color:var(--mehrspaltig-primary)}
  .mehrspaltig-pdf-columns{display:grid;grid-template-columns:40mm minmax(0,1fr) 40mm;gap:9mm;align-items:start}.mehrspaltig-pdf-columns.continuation{display:block}.mehrspaltig-pdf-column{min-width:0}.mehrspaltig-pdf-section{margin:0 0 5.4mm}.mehrspaltig-pdf-title{margin:0 0 2.4mm;padding-bottom:1.2mm;border-bottom:.45mm solid var(--mehrspaltig-primary);color:var(--mehrspaltig-primary);font-size:10.6pt;font-weight:700}.mehrspaltig-pdf-section>p{margin:0}.mehrspaltig-pdf-skills{display:flex;flex-direction:column;gap:1.5mm}.mehrspaltig-pdf-skills strong{padding-bottom:1.1mm;border-bottom:.25mm solid var(--mehrspaltig-border);color:var(--mehrspaltig-primary);font-size:8.1pt}
  .mehrspaltig-pdf-strengths{display:flex;flex-direction:column;gap:4.2mm}.mehrspaltig-pdf-strength{display:grid;grid-template-columns:8mm minmax(0,1fr);column-gap:2mm}.mehrspaltig-pdf-strength i{grid-row:span 2;display:grid;place-items:center;width:7.5mm;height:7.5mm;border-radius:50%;color:var(--mehrspaltig-accent);background:#f0f2f3;font-size:12pt;font-style:normal}.mehrspaltig-pdf-strength h3{margin:0 0 .8mm;color:var(--mehrspaltig-primary);font-size:9.4pt;font-weight:700}.mehrspaltig-pdf-strength p{margin:0}
  .mehrspaltig-pdf-list{gap:4mm}.mehrspaltig-pdf-entry-head{display:block}.mehrspaltig-pdf-entry h3{color:var(--mehrspaltig-primary);font-size:12.2pt;font-weight:400;line-height:1.06}.mehrspaltig-pdf-entry h4{margin-top:.9mm;color:var(--mehrspaltig-accent);font-size:9.5pt;font-weight:700}.mehrspaltig-pdf-entry-meta{display:flex;flex-direction:row;flex-wrap:wrap;gap:1mm 4mm;margin:1.2mm 0;color:var(--mehrspaltig-muted);font-size:7.2pt;text-align:left}.mehrspaltig-pdf-entry ul{margin:0;padding-left:3.5mm}.mehrspaltig-pdf-entry li::marker{color:var(--mehrspaltig-primary)}.mehrspaltig-pdf-education .mehrspaltig-pdf-entry h3{font-size:11.3pt}.mehrspaltig-pdf-education .mehrspaltig-pdf-entry h4{color:var(--mehrspaltig-text);font-weight:400}
  .mehrspaltig-pdf-languages{display:flex;flex-direction:column;gap:2.3mm;max-width:none}.mehrspaltig-pdf-language{display:block;margin:0;font-size:8pt}.mehrspaltig-pdf-language strong{color:var(--mehrspaltig-primary);font-weight:700}.mehrspaltig-pdf-language span{display:block;color:var(--mehrspaltig-muted)}.mehrspaltig-pdf-footer{bottom:5.5mm}.mehrspaltig-pdf[data-density="dense"] .mehrspaltig-pdf-columns{gap:7mm}.mehrspaltig-pdf-ats .mehrspaltig-pdf-title{border-color:var(--mehrspaltig-border);font-family:Arial,sans-serif}.mehrspaltig-pdf-ats .mehrspaltig-pdf-columns{display:block}
`;

const modernDocumentCss = `
  .modern-pdf{--modern-primary:var(--accent);--modern-soft:var(--secondary);--modern-heading:#303437;--modern-text:#444b4f;--modern-muted:#686f73;--modern-divider:#aeb4b6;--modern-icon-bg:#f2f3f3;--modern-margin:15mm;--modern-section-gap:7mm;--modern-entry-gap:4.5mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--modern-text);background:#fff;font-family:var(--body-font);font-size:8.4pt;line-height:1.27}
  .modern-pdf *{box-sizing:border-box}.modern-pdf a{color:inherit;text-decoration:none}.modern-pdf-content{position:relative;z-index:2;height:100%;padding:14mm var(--modern-margin) 14mm}
  .modern-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 29mm;gap:9mm;align-items:start;min-height:25mm;margin-bottom:4mm}.modern-pdf-header.no-photo{grid-template-columns:1fr}.modern-pdf-identity{min-width:0}.modern-pdf-header h1{margin:0;color:var(--modern-heading);font-size:24pt;font-weight:700;letter-spacing:.01em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.modern-pdf-header h2{margin:2mm 0 0;color:var(--modern-primary);font-size:12pt;font-weight:500;line-height:1.18;overflow-wrap:anywhere}.modern-pdf-photo{justify-self:end;width:25mm;height:25mm;border-radius:50%;object-fit:cover;background:var(--modern-icon-bg)}
  .modern-pdf-header.compact{display:flex;flex-wrap:wrap;align-items:baseline;gap:1mm 5mm;min-height:auto;margin-bottom:7mm;padding-bottom:3mm;border-bottom:.35mm solid var(--modern-divider)}.modern-pdf-header.compact .kicker{flex-basis:100%;margin:0;color:var(--modern-primary);font-size:7pt;letter-spacing:.08em;text-transform:uppercase}.modern-pdf-header.compact h1{font-size:15pt}.modern-pdf-header.compact h2{margin:0;font-size:9pt}
  .modern-pdf-columns{display:grid;grid-template-columns:102mm 67mm;gap:11mm;align-items:start}.modern-pdf-columns.continuation{display:block}.modern-pdf-left,.modern-pdf-right{display:flex;min-width:0;flex-direction:column;gap:var(--modern-section-gap)}
  .modern-pdf-section{min-width:0;break-inside:auto}.modern-pdf-title{margin:0 0 3.2mm;padding-bottom:1mm;border-bottom:.35mm solid var(--modern-divider);color:var(--modern-muted);font-size:9.2pt;font-weight:500;letter-spacing:.025em;line-height:1;text-transform:uppercase;break-after:avoid}.modern-pdf-list{display:flex;flex-direction:column;gap:var(--modern-entry-gap)}
  .modern-pdf-entry{break-inside:auto}.modern-pdf-entry h3{margin:0 0 1mm;color:var(--modern-heading);font-size:11pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere;break-after:avoid}.modern-pdf-entry-meta{display:flex;flex-wrap:wrap;align-items:center;gap:1mm 4mm;margin:0 0 1.5mm;color:var(--modern-muted);font-size:7.9pt;line-height:1.2;break-after:avoid}.modern-pdf-entry-meta strong{margin-right:auto;color:var(--modern-primary);font-weight:600}.modern-pdf-entry-meta span{display:flex;align-items:center;gap:1mm;white-space:nowrap}.modern-pdf-entry-meta i{color:var(--modern-muted);font-size:6.8pt;font-style:normal}.modern-pdf-entry ul,.modern-pdf-certifications,.modern-pdf-ats ul{margin:0;padding-left:4mm}.modern-pdf-entry li,.modern-pdf-certifications li,.modern-pdf-ats li{margin:.35mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word;break-inside:avoid}
  .modern-pdf-contacts{display:grid;gap:3.2mm;margin:0;font-style:normal}.modern-pdf-contact{display:grid;grid-template-columns:8.5mm minmax(0,1fr);gap:3mm;align-items:center;min-width:0}.modern-pdf-contact i{display:grid;place-items:center;width:8.5mm;height:8.5mm;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:7pt;font-style:normal;font-weight:700}.modern-pdf-contact span,.modern-pdf-contact a{min-width:0;color:var(--modern-text);font-size:8.4pt;line-height:1.2;overflow-wrap:anywhere}
  .modern-pdf-contacts.inline{display:flex;flex-wrap:nowrap;align-items:center;gap:1.8mm;max-width:145mm;margin-top:3mm}.modern-pdf-contacts.inline .modern-pdf-contact{display:flex;flex:0 0 auto;grid-template-columns:none;gap:.8mm;min-width:0}.modern-pdf-contacts.inline .modern-pdf-contact i{display:block;width:3.2mm;height:auto;border-radius:0;color:var(--modern-muted);background:transparent;font-size:6.8pt;line-height:1.2}.modern-pdf-contacts.inline .modern-pdf-contact span,.modern-pdf-contacts.inline .modern-pdf-contact a{display:block;max-width:44mm;overflow:hidden;color:var(--modern-muted);font-size:7.4pt;text-overflow:ellipsis;white-space:nowrap}
  .modern-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}.modern-pdf-strengths{display:flex;flex-direction:column;gap:4mm}.modern-pdf-strength{display:grid;grid-template-columns:10mm minmax(0,1fr);gap:3mm;align-items:start}.modern-pdf-strength>i{display:grid;width:9mm;height:9mm;place-items:center;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:10pt;font-style:normal;font-weight:700}.modern-pdf-strength h3{margin:0 0 .5mm;color:var(--modern-heading);font-size:9.5pt;font-weight:600}.modern-pdf-strength p{margin:0;hyphens:auto;overflow-wrap:break-word}.modern-pdf-languages{display:flex;flex-direction:column;gap:2.5mm}.modern-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4mm;align-items:center}.modern-pdf-language>div{display:flex;min-width:0;justify-content:space-between;gap:2mm}.modern-pdf-language strong{color:var(--modern-heading);font-weight:600}.modern-pdf-language em{color:var(--modern-muted);font-size:7.9pt;font-style:normal}.modern-pdf-dots{display:flex;gap:1.1mm;color:var(--modern-primary);font-size:6pt;white-space:nowrap}
  .modern-pdf-knowledge{display:flex;flex-wrap:wrap;gap:2.5mm 3mm}.modern-pdf-knowledge span{padding:0 2mm 1mm;border-bottom:.3mm solid var(--modern-divider);color:var(--modern-text);font-size:8.2pt;line-height:1.15}.modern-pdf-achievements{display:flex;flex-direction:column;gap:4mm}.modern-pdf-achievements article{display:grid;grid-template-columns:9mm minmax(0,1fr);gap:3mm;align-items:start}.modern-pdf-achievements i{display:grid;width:9mm;height:9mm;place-items:center;border-radius:50%;color:var(--modern-primary);background:var(--modern-icon-bg);font-size:8pt;font-style:normal}.modern-pdf-achievements p{margin:0;line-height:1.25}
  .modern-pdf-footer{position:absolute;right:var(--modern-margin);bottom:6mm;left:var(--modern-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--modern-muted);font-size:7.2pt}.modern-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}
  .modern-pdf[data-density="compact"]{--modern-section-gap:5mm;--modern-entry-gap:3.7mm;font-size:8.1pt}.modern-pdf[data-density="dense"]{--modern-section-gap:4mm;--modern-entry-gap:3mm;font-size:7.7pt;line-height:1.2}.modern-pdf[data-density="dense"] .modern-pdf-title{margin-bottom:2.5mm}.modern-pdf[data-density="dense"] .modern-pdf-contacts{gap:2.5mm}.modern-pdf[data-density="dense"] .modern-pdf-strengths{gap:3mm}
  .modern-pdf-ats{--modern-primary:#173b63;--modern-heading:#26343e;--modern-text:#303b42;--modern-muted:#626e75;--modern-divider:#aeb8bf;padding:14mm var(--modern-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.modern-pdf-ats .modern-pdf-header{display:block;min-height:auto;margin-bottom:5mm;padding-bottom:3mm;border-bottom:.35mm solid var(--modern-divider)}.modern-pdf-ats .modern-pdf-header h1{font-size:19pt}.modern-pdf-ats .modern-pdf-header h2{margin-top:1mm;color:var(--modern-heading);font-size:10pt}.modern-pdf-ats .modern-pdf-section{margin-bottom:5mm}.modern-pdf-ats .modern-pdf-title{margin-bottom:2mm;color:var(--modern-heading);font-size:10.5pt;font-weight:700}.modern-pdf-ats .modern-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 5mm}.modern-pdf-ats .modern-pdf-contact{display:block}.modern-pdf-ats .modern-pdf-contact i{display:none}.modern-pdf-ats .modern-pdf-language{display:block}.modern-pdf-ats .modern-pdf-dots{display:none}
  @media print{.no-print-background .modern-pdf-background{display:none!important}}
`;

const gepflegtDocumentCss = `
  .gepflegt-pdf{--gepflegt-sidebar:var(--secondary);--gepflegt-accent:var(--accent);--gepflegt-heading:#354147;--gepflegt-text:#3f494e;--gepflegt-muted:#657075;--gepflegt-divider:#c7ced1;--gepflegt-sidebar-text:#fff;--gepflegt-sidebar-muted:#d8f0ef;--gepflegt-sidebar-width:72mm;--gepflegt-section-gap:7mm;--gepflegt-entry-gap:4.5mm;position:relative;display:grid;grid-template-columns:var(--gepflegt-sidebar-width) minmax(0,1fr);width:100%;height:100%;overflow:hidden;color:var(--gepflegt-text);background:#fff;font-family:var(--body-font);font-size:8.8pt;line-height:1.28}
  .gepflegt-pdf *{box-sizing:border-box}.gepflegt-pdf a{color:inherit;text-decoration:none}.gepflegt-pdf:before{position:absolute;top:0;right:0;left:0;z-index:4;height:3.5mm;background:color-mix(in srgb,var(--gepflegt-sidebar),#003f3e 32%);content:""}
  .gepflegt-pdf-sidebar{min-width:0;height:100%;overflow:hidden;padding:9mm 10mm 13mm;color:var(--gepflegt-sidebar-text);background:var(--gepflegt-sidebar)}.gepflegt-pdf-photo{display:block;width:26mm;height:26mm;margin:0 auto 16mm;border-radius:1.5mm;background:rgba(255,255,255,.16);object-fit:cover}.gepflegt-pdf-sidebar section{margin:0 0 8.5mm;break-inside:avoid}.gepflegt-pdf-sidebar h3{margin:0 0 3.5mm;padding:0 0 2.2mm;border-bottom:.35mm solid rgba(255,255,255,.78);color:var(--gepflegt-sidebar-text);font-size:12.5pt;font-weight:500;letter-spacing:.01em;line-height:1.05;text-transform:uppercase}.gepflegt-pdf-summary,.gepflegt-pdf-knowledge{margin:0;color:var(--gepflegt-sidebar-text);font-size:8.8pt;line-height:1.3;hyphens:auto;overflow-wrap:break-word}
  .gepflegt-pdf-strengths{display:flex;flex-direction:column;gap:5mm}.gepflegt-pdf-strength{display:grid;grid-template-columns:5.5mm minmax(0,1fr);gap:2mm;align-items:start}.gepflegt-pdf-strength svg{width:4mm;height:4mm;margin-top:.4mm;fill:none;stroke:var(--gepflegt-sidebar-text);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.3}.gepflegt-pdf-strength h4{margin:0 0 1.5mm;color:var(--gepflegt-sidebar-text);font-size:10.2pt;font-weight:600;line-height:1.15}.gepflegt-pdf-strength p{margin:0;color:var(--gepflegt-sidebar-muted);font-size:8.5pt;line-height:1.28;hyphens:auto}.gepflegt-pdf-languages{display:flex;flex-direction:column;gap:3.2mm}.gepflegt-pdf-language{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2.5mm;align-items:center}.gepflegt-pdf-language>div{display:flex;min-width:0;justify-content:space-between;gap:2mm}.gepflegt-pdf-language strong,.gepflegt-pdf-language span{font-size:8.6pt;font-weight:400}.gepflegt-pdf-language em{color:var(--gepflegt-sidebar-muted);font-style:normal}.gepflegt-pdf-dots{display:flex;gap:1.05mm}.gepflegt-pdf-dots i{width:1.7mm;height:1.7mm;border:.3mm solid rgba(255,255,255,.7);border-radius:50%}.gepflegt-pdf-dots i.filled{border-color:#fff;background:#fff}.gepflegt-pdf-certifications{margin:0;padding-left:4mm}.gepflegt-pdf-certifications li{margin:0 0 1.3mm;padding-left:.7mm;color:var(--gepflegt-sidebar-text);font-size:8.5pt;line-height:1.25}
  .gepflegt-pdf-content{position:relative;min-width:0;height:100%;overflow:hidden;padding:9mm 10mm 13mm 9mm}.gepflegt-pdf-header{min-width:0;margin:0 0 12mm}.gepflegt-pdf-header h1{margin:0;color:var(--gepflegt-heading);font-family:var(--heading-font);font-size:24pt;font-weight:750;letter-spacing:.005em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.gepflegt-pdf-header h2{max-width:120mm;margin:2.4mm 0 0;color:var(--gepflegt-accent);font-size:13.5pt;font-weight:500;line-height:1.15;overflow-wrap:break-word}.gepflegt-pdf-contacts{display:flex;flex-wrap:wrap;gap:2.1mm 4mm;margin:4mm 0 0;color:var(--gepflegt-text);font-size:8.2pt;font-style:normal;font-weight:500;line-height:1.2}.gepflegt-pdf-contact{display:inline-flex;min-width:0;max-width:90mm;align-items:center;gap:1.4mm}.gepflegt-pdf-contact svg{width:3.4mm;height:3.4mm;flex:0 0 auto;fill:none;stroke:#b9bec0;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.7}.gepflegt-pdf-contact span{min-width:0;overflow-wrap:anywhere;white-space:nowrap}
  .gepflegt-pdf-main{display:flex;min-width:0;flex-direction:column;gap:var(--gepflegt-section-gap)}.gepflegt-pdf-section{min-width:0;break-inside:auto}.gepflegt-pdf-title{margin:0 0 3.6mm;padding:0 0 2.2mm;border-bottom:.35mm solid var(--gepflegt-divider);color:var(--gepflegt-heading);font-family:var(--heading-font);font-size:14.5pt;font-weight:500;letter-spacing:.015em;line-height:1;text-transform:uppercase;break-after:avoid}.gepflegt-pdf-list{display:flex;flex-direction:column;gap:var(--gepflegt-entry-gap)}.gepflegt-pdf-entry{min-width:0;break-inside:avoid}.gepflegt-pdf-entry-heading,.gepflegt-pdf-entry-subheading{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5mm;align-items:baseline}.gepflegt-pdf-entry-heading h4{min-width:0;margin:0;color:var(--gepflegt-heading);font-size:11.5pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere}.gepflegt-pdf-entry-heading span,.gepflegt-pdf-entry-subheading span{max-width:31mm;color:var(--gepflegt-text);font-size:8.8pt;line-height:1.15;text-align:right}.gepflegt-pdf-entry-subheading{margin-top:1.5mm}.gepflegt-pdf-entry-subheading strong{color:var(--gepflegt-accent);font-size:9.8pt;font-weight:600;line-height:1.15;overflow-wrap:anywhere}.gepflegt-pdf-entry ul{margin:2mm 0 0;padding-left:4.8mm}.gepflegt-pdf-entry li{margin:.45mm 0;padding-left:.6mm;color:var(--gepflegt-text);font-size:8.8pt;line-height:1.28;hyphens:auto;overflow-wrap:break-word}
  .gepflegt-pdf-footer{position:absolute;right:10mm;bottom:5.5mm;left:9mm;display:flex;justify-content:flex-end;gap:8mm;color:var(--gepflegt-muted);font-size:7.2pt}.gepflegt-pdf-footer span:first-child{margin-right:auto}.gepflegt-pdf-sidebar-continuation{display:flex;align-items:center}.gepflegt-pdf-sidebar-continuation p,.gepflegt-pdf-sidebar-continuation h2,.gepflegt-pdf-sidebar-continuation span,.gepflegt-pdf-sidebar-continuation small{display:block;margin:0}.gepflegt-pdf-sidebar-continuation p{font-size:8pt;letter-spacing:.12em;text-transform:uppercase}.gepflegt-pdf-sidebar-continuation h2{margin-top:2mm;color:#fff;font-size:16pt;line-height:1.05;text-transform:uppercase}.gepflegt-pdf-sidebar-continuation span{margin-top:2mm;color:var(--gepflegt-sidebar-muted)}.gepflegt-pdf-sidebar-continuation i{display:block;width:16mm;height:.5mm;margin:8mm 0;background:#fff}.gepflegt-pdf-header.compact{margin-bottom:8mm;padding-bottom:3mm;border-bottom:.35mm solid var(--gepflegt-divider)}.gepflegt-pdf-header.compact .kicker{margin:0 0 1mm;color:var(--gepflegt-accent);font-size:7.3pt}.gepflegt-pdf-header.compact h1{font-size:16pt}.gepflegt-pdf-header.compact h2{margin-top:1mm;font-size:9.5pt}
  .gepflegt-pdf[data-density="compact"]{--gepflegt-section-gap:5.7mm;--gepflegt-entry-gap:3.6mm;font-size:8.35pt;line-height:1.23}.gepflegt-pdf[data-density="compact"] .gepflegt-pdf-header{margin-bottom:9mm}.gepflegt-pdf[data-density="compact"] .gepflegt-pdf-sidebar section{margin-bottom:6.5mm}.gepflegt-pdf[data-density="compact"] .gepflegt-pdf-entry li{font-size:8.35pt;line-height:1.23}.gepflegt-pdf[data-density="dense"]{--gepflegt-section-gap:4.4mm;--gepflegt-entry-gap:2.8mm;font-size:7.8pt;line-height:1.18}.gepflegt-pdf[data-density="dense"] .gepflegt-pdf-header{margin-bottom:7mm}.gepflegt-pdf[data-density="dense"] .gepflegt-pdf-photo{margin-bottom:10mm}.gepflegt-pdf[data-density="dense"] .gepflegt-pdf-sidebar section{margin-bottom:5mm}.gepflegt-pdf[data-density="dense"] .gepflegt-pdf-entry li{font-size:7.8pt;line-height:1.18}
  .gepflegt-pdf-ats{display:block;padding:14mm 16mm 16mm;background:#fff;font-family:Arial,sans-serif}.gepflegt-pdf-ats:before{display:none}.gepflegt-pdf-ats .gepflegt-pdf-header{margin-bottom:6mm;padding-bottom:3mm;border-bottom:.35mm solid var(--gepflegt-divider)}.gepflegt-pdf-ats .gepflegt-pdf-header h1{font-size:20pt}.gepflegt-pdf-ats .gepflegt-pdf-header h2{color:var(--gepflegt-heading);font-size:10.5pt}.gepflegt-pdf-ats .gepflegt-pdf-contacts{gap:1mm 5mm;margin-top:2mm}.gepflegt-pdf-ats .gepflegt-pdf-contact{max-width:none}.gepflegt-pdf-ats-summary{margin-bottom:var(--gepflegt-section-gap)}.gepflegt-pdf-ats-summary p{margin:0}.gepflegt-pdf-ats-extra{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5mm 10mm;margin-top:var(--gepflegt-section-gap)}.gepflegt-pdf-ats-extra section{margin:0}.gepflegt-pdf-ats-extra h3{margin:0 0 2mm;padding-bottom:1.5mm;border-bottom:.35mm solid var(--gepflegt-divider);color:var(--gepflegt-heading);font-size:10.5pt;text-transform:uppercase}.gepflegt-pdf-ats-extra p,.gepflegt-pdf-ats-extra li{font-size:8.5pt}.gepflegt-pdf-ats-extra ul{margin:0;padding-left:4mm}
`;

const tabellarischDocumentCss = `
  .tabellarisch-pdf{--tab-primary:var(--secondary);--tab-accent:var(--accent);--tab-text:#3f4850;--tab-muted:#6d747a;--tab-line:#c8cdd1;--tab-margin:max(15mm,var(--doc-margin));--tab-section-gap:max(6.3mm,var(--section-gap));--tab-entry-gap:4.4mm;position:relative;width:100%;height:100%;overflow:hidden;color:var(--tab-text);background:#fff;font-family:var(--body-font);font-size:max(8.7pt,var(--body-size));line-height:max(1.28,var(--body-line))}
  .tabellarisch-pdf *{box-sizing:border-box}.tabellarisch-pdf a{color:inherit;text-decoration:none}.tabellarisch-pdf-content{position:relative;z-index:2;height:100%;padding:max(15mm,var(--doc-margin)) var(--tab-margin) max(19mm,calc(var(--doc-margin) + 5mm))}
  .tabellarisch-pdf-background{position:absolute;top:0;right:0;z-index:0;width:100%;height:58mm;fill:none;stroke:var(--tab-line);stroke-width:1.15;opacity:.62;pointer-events:none}
  .tabellarisch-pdf-header{display:grid;grid-template-columns:minmax(0,1fr) 32mm;gap:10mm;align-items:start;min-height:30mm}.tabellarisch-pdf-header.no-photo{grid-template-columns:1fr}.tabellarisch-pdf-identity{min-width:0;padding-top:1mm}.tabellarisch-pdf-header h1{margin:0;color:var(--tab-primary);font-family:var(--heading-font);font-size:25pt;font-weight:750;letter-spacing:.015em;line-height:1;text-transform:uppercase;overflow-wrap:anywhere}.tabellarisch-pdf-header h2{margin:2.3mm 0 0;color:var(--tab-accent);font-family:var(--heading-font);font-size:13.5pt;font-weight:650;line-height:1.15;overflow-wrap:anywhere}.tabellarisch-pdf-photo{display:block;width:30mm;height:30mm;justify-self:end;border-radius:50%;background:#e8ebed;object-fit:cover}
  .tabellarisch-pdf-contacts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.15mm 7mm;max-width:118mm;margin:2.5mm 0 0;color:var(--tab-text);font-size:8.4pt;font-style:normal;font-weight:600;line-height:1.2}.tabellarisch-pdf-contact{display:grid;grid-template-columns:3.2mm minmax(0,1fr);gap:1.2mm;align-items:center;min-width:0}.tabellarisch-pdf-contact svg{width:3mm;height:3mm;fill:none;stroke:var(--tab-accent);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.4}.tabellarisch-pdf-contact span,.tabellarisch-pdf-contact a{min-width:0;overflow-wrap:anywhere}
  .tabellarisch-pdf-section{min-width:0;margin-top:var(--tab-section-gap);break-inside:auto}.tabellarisch-pdf-title{display:flex;align-items:baseline;gap:2.5mm;margin:0 0 3.5mm;color:var(--tab-primary);font-family:var(--heading-font);font-size:15pt;font-weight:750;letter-spacing:.01em;line-height:1.05;text-transform:uppercase;break-after:avoid}.tabellarisch-pdf-title small{color:var(--tab-muted);font-size:7.5pt;font-weight:600;text-transform:none}.tabellarisch-pdf-summary{margin:0;hyphens:auto;overflow-wrap:break-word}
  .tabellarisch-pdf-strengths{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5mm 12mm}.tabellarisch-pdf-strength{display:grid;grid-template-columns:8mm minmax(0,1fr);gap:2.5mm;align-items:start;break-inside:avoid}.tabellarisch-pdf-strength svg{width:6mm;height:6mm;fill:none;stroke:var(--tab-accent);stroke-linecap:round;stroke-linejoin:round;stroke-width:2.1}.tabellarisch-pdf-strength h3{margin:0 0 1.5mm;color:var(--tab-primary);font-size:10.3pt;font-weight:700;line-height:1.2}.tabellarisch-pdf-strength p{margin:0;hyphens:auto;overflow-wrap:break-word}
  .tabellarisch-pdf-timeline{display:flex;flex-direction:column}.tabellarisch-pdf-entry{display:grid;grid-template-columns:minmax(30mm,35mm) 7mm minmax(0,1fr);gap:4mm;min-width:0;padding-bottom:var(--tab-entry-gap);break-inside:avoid}.tabellarisch-pdf-entry:last-child{padding-bottom:0}.tabellarisch-pdf-meta{padding-top:.45mm}.tabellarisch-pdf-date,.tabellarisch-pdf-location{margin:0}.tabellarisch-pdf-date{color:var(--tab-primary);font-size:10pt;font-weight:750;line-height:1.15}.tabellarisch-pdf-location{margin-top:2mm;color:var(--tab-text);font-size:8.4pt;line-height:1.3}.tabellarisch-pdf-rail{position:relative;display:block;min-height:100%}.tabellarisch-pdf-rail:before{position:absolute;top:2.5mm;bottom:-1mm;left:50%;width:.35mm;background:var(--tab-line);content:"";transform:translateX(-50%)}.tabellarisch-pdf-rail:after{position:absolute;top:.6mm;left:50%;width:2.3mm;height:2.3mm;border-radius:50%;background:var(--tab-primary);content:"";transform:translateX(-50%)}.tabellarisch-pdf-timeline:not(.continues) .tabellarisch-pdf-entry:last-child .tabellarisch-pdf-rail:before{bottom:auto;height:1mm}.tabellarisch-pdf-entry-content{min-width:0}.tabellarisch-pdf-entry h3{margin:0;color:var(--tab-primary);font-family:var(--heading-font);font-size:12pt;font-weight:500;line-height:1.15;overflow-wrap:anywhere}.tabellarisch-pdf-organization{margin:1mm 0 1.5mm;color:var(--tab-accent);font-size:10.2pt;font-weight:700;line-height:1.2;overflow-wrap:anywhere}.tabellarisch-pdf-entry ul,.tabellarisch-pdf-list ul,.tabellarisch-pdf-ats ul{margin:0;padding-left:4.5mm}.tabellarisch-pdf-entry li,.tabellarisch-pdf-list li,.tabellarisch-pdf-ats li{margin:.45mm 0;padding-left:.5mm;hyphens:auto;overflow-wrap:break-word}.tabellarisch-pdf-entry li::marker{color:var(--tab-muted)}
  .tabellarisch-pdf-additional{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 12mm}.tabellarisch-pdf-list ul.inline{display:flex;flex-wrap:wrap;gap:1mm 6mm;padding:0;list-style:none}.tabellarisch-pdf-list ul.inline li:before{margin-right:1.5mm;color:var(--tab-accent);content:"•"}
  .tabellarisch-pdf-continuation{display:flex;align-items:baseline;justify-content:space-between;gap:8mm;margin-bottom:6mm;padding-bottom:2.5mm;border-bottom:.35mm solid var(--tab-line)}.tabellarisch-pdf-continuation strong{color:var(--tab-primary);font-family:var(--heading-font);font-size:13pt}.tabellarisch-pdf-continuation span{color:var(--tab-accent);font-size:9pt;font-weight:600;text-align:right}.tabellarisch-pdf-footer{position:absolute;right:var(--tab-margin);bottom:6mm;left:var(--tab-margin);z-index:3;display:flex;justify-content:space-between;gap:8mm;color:var(--tab-muted);font-size:7.5pt}.tabellarisch-pdf-footer span:last-child{margin-left:auto;white-space:nowrap}
  .tabellarisch-pdf[data-density="compact"]{--tab-section-gap:5.2mm;--tab-entry-gap:3.4mm;font-size:max(8.3pt,var(--body-size));line-height:max(1.24,var(--body-line))}.tabellarisch-pdf[data-density="dense"]{--tab-section-gap:4.1mm;--tab-entry-gap:2.6mm;--tab-margin:max(13mm,var(--doc-margin));font-size:8pt;line-height:1.22}.tabellarisch-pdf[data-density="dense"] .tabellarisch-pdf-content{padding-top:13mm}.tabellarisch-pdf[data-density="dense"] .tabellarisch-pdf-header{min-height:29mm}.tabellarisch-pdf[data-density="dense"] .tabellarisch-pdf-header h1{font-size:22pt}.tabellarisch-pdf[data-density="dense"] .tabellarisch-pdf-header h2{font-size:12pt}.tabellarisch-pdf[data-density="dense"] .tabellarisch-pdf-title{margin-bottom:2.4mm;font-size:13.5pt}
  .tabellarisch-pdf-ats{--tab-primary:#222b30;--tab-accent:#222b30;--tab-line:#cfd4d7;padding:14mm var(--tab-margin) 16mm;background:#fff;font-family:Arial,sans-serif}.tabellarisch-pdf-ats .tabellarisch-pdf-header{display:block;min-height:0;padding-bottom:4mm;border-bottom:.35mm solid var(--tab-line)}.tabellarisch-pdf-ats .tabellarisch-pdf-contacts{display:flex;flex-wrap:wrap;gap:1mm 5mm}.tabellarisch-pdf-ats .tabellarisch-pdf-contact{display:block}.tabellarisch-pdf-ats .tabellarisch-pdf-contact svg{display:none}.tabellarisch-pdf-ats .tabellarisch-pdf-title{font-size:11pt}.tabellarisch-pdf-ats .tabellarisch-pdf-entry{display:block}.tabellarisch-pdf-ats .tabellarisch-pdf-entry h3{font-size:11pt}.tabellarisch-pdf-ats .tabellarisch-pdf-organization{margin-bottom:1mm}.tabellarisch-pdf-ats-meta{margin:0 0 1.5mm;color:var(--tab-muted);font-size:8.3pt}
  @media print{.no-print-background .tabellarisch-pdf-background{display:none!important}}
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
  const applicationDate = formatApplicationDateLong(application);
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
        <div class="sender">${senderHeader(profile)}</div>
        <div class="rule"></div>
        <div class="recipient">${addressBlock(application)}</div>
        <p class="date">${escapeHtml(profile?.city || application.company.city)}, den ${applicationDate}</p>
        <p class="subject">${escapeHtml(docs.coverSubject || `Bewerbung als ${role}`)}</p>
        <p>${escapeHtml(salutation(application))},</p>
        <p class="letter-body">${escapeHtml(docs.coverIntroduction || `die ausgeschriebene Position als ${role} bei ${company} spricht mich besonders an, weil sie fachliche Verantwortung mit konkretem Gestaltungsspielraum verbindet.`)}</p>
        <p class="letter-body">${escapeHtml(docs.coverMotivation || "Meine Motivation entsteht aus der Möglichkeit, vorhandene Erfahrung gezielt einzusetzen, mich fachlich weiterzuentwickeln und gemeinsam mit Ihrem Team messbare Ergebnisse zu erzielen.")}</p>
        <p class="letter-body">${escapeHtml(docs.coverQualification || profile?.summary || "Ich arbeite strukturiert, zuverlässig und lösungsorientiert. Neue Anforderungen erfasse ich schnell und überführe sie in nachvollziehbare, belastbare Ergebnisse.")}</p>
        <p class="letter-body">${escapeHtml(docs.coverCompanyFit || `An ${company} überzeugt mich besonders die Verbindung aus professionellem Anspruch und zukunftsorientierter Arbeitsweise.`)}</p>
        ${docs.coverExtraParagraph ? `<p class="letter-body">${escapeHtml(docs.coverExtraParagraph)}</p>` : ""}
        <p class="letter-body">${escapeHtml(docs.coverClosing || "Gerne überzeuge ich Sie in einem persönlichen Gespräch davon, welchen konkreten Beitrag ich in Ihrem Team leisten kann. Auf Ihren Terminvorschlag freue ich mich.")}</p>
        <div class="signature"><p>Mit freundlichen Grüßen</p>${signatureSource ? `<img class="signature-image" src="${escapeHtml(signatureSource)}" alt="">` : ""}<span class="signature-name">${escapeHtml(name)}</span></div>
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
    template.id === "elegant"
      ? elegantPaginationOptions
      : template.id === "zweispaltig"
      ? zweispaltigPaginationOptions
      : template.id === "kompakt"
        ? kompaktPaginationOptions
        : template.id === "kreativ"
          ? kreativPaginationOptions
          : template.id === "gepflegt"
            ? gepflegtPaginationOptions
            : template.id === "zeitgenoessisch"
              ? zeitgenoessischPaginationOptions
              : template.id === "ivy-league"
                ? ivyLeaguePaginationOptions
                : template.id === "stilvoll"
                  ? stilvollPaginationOptions
                  : template.id === "einspaltig"
                    ? einspaltigPaginationOptions
                    : template.id === "klassisch"
                      ? klassischPaginationOptions
                      : template.id === "tabellarisch"
                        ? tabellarischPaginationOptions
                        : template.id === "modern"
                          ? modernPaginationOptions
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
    const cityAndCountry = [profile.city, profile.country]
      .filter(Boolean)
      .join(", ");
    const location = [profile.postalCode, cityAndCountry]
      .filter(Boolean)
      .join(" ");
    const birth =
      profile.birthDate || profile.birthPlace
        ? `${profile.birthDate || ""}${profile.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
        : "";
    const website = profile.portfolio || profile.github || "";
    const contacts = [
      {
        icon: "☎",
        value: profile.phone,
        href: profile.phone
          ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
          : "",
      },
      {
        icon: "@",
        value: profile.email,
        href: profile.email ? `mailto:${profile.email}` : "",
      },
      {
        icon: "↗",
        value: externalHref(profile.linkedin),
        href: externalHref(profile.linkedin),
      },
      {
        icon: "⌖",
        value: externalHref(website),
        href: externalHref(website),
      },
      { icon: "◆", value: location, href: "" },
      { icon: "☆", value: birth, href: "" },
    ].filter((contact) => contact.value?.trim());

    if (!contacts.length) return "";
    return `<address class="elegant-pdf-contacts">${contacts
      .map((contact) => {
        const content = `<i aria-hidden="true">${contact.icon}</i><span>${escapeHtml(contact.value)}</span>`;
        return contact.href
          ? `<a href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span>${content}</span>`;
      })
      .join("")}</address>`;
  };

  const renderElegantHeader = (compact: boolean) => `
    <header class="elegant-pdf-header${compact ? " elegant-pdf-header-compact" : ""}">
      ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
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
  const elegantStrengths = strengths.map((value) => {
    const [title, ...description] = value.split(/\s+(?:–|—|:)\s+/);
    return {
      title: title.trim(),
      description: description.join(" – ").trim(),
    };
  });
  const visualStrengthSection = elegantStrengths.length
    ? `<section><h3>Stärken</h3><div class="elegant-pdf-strengths">${elegantStrengths
        .map(
          (strength, index) =>
            `<article class="elegant-pdf-strength"><i aria-hidden="true">${index ? "♥" : "◉"}</i><div><h4>${escapeHtml(strength.title)}</h4>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const atsStrengthSection = elegantStrengths.length
    ? `<section class="elegant-pdf-section"><h3>Stärken</h3><ul>${elegantStrengths
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` – ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul></section>`
    : "";
  const elegantLanguages = uniqueValues(profile?.languages ?? []).map(
    (raw) => {
      const [namePart, ...levelParts] = raw.split(/\s+[–—-]\s+/);
      const level = levelParts.join(" – ").trim();
      const normalized = level.toLocaleLowerCase("de-DE");
      const score = /muttersprache|native|c2/.test(normalized)
        ? 5
        : /verhandlung|fließ|fliess|c1/.test(normalized)
          ? 4
          : /b2|fortgeschritten|advanced|erweitert|versiert/.test(normalized)
            ? 3
            : /b1|a2|grundkennt/.test(normalized)
              ? 2
              : /a1|anfänger|anfaenger/.test(normalized)
                ? 1
                : 3;
      return { raw, name: namePart.trim() || raw, level, score };
    },
  );
  const elegantVisualLanguages =
    sections.languages && elegantLanguages.length
      ? `<section><h3>Sprachen</h3><div class="elegant-pdf-languages">${elegantLanguages
          .map(
            (language) =>
              `<article class="elegant-pdf-language"><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span><span class="elegant-pdf-language-dots" aria-hidden="true">${Array.from({ length: 5 }, (_, index) => `<i class="${index < language.score ? "filled" : ""}"></i>`).join("")}</span></article>`,
          )
          .join("")}</div></section>`
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
      ? `<a href="${escapeHtml(externalHref(elegantPortfolio))}">${escapeHtml(externalHref(elegantPortfolio))}</a>`
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
          ${elegantVisualLanguages}
          ${certificationSection}
        </aside>`;
    const footerLink = elegantPortfolio
      ? `<a href="${escapeHtml(externalHref(elegantPortfolio))}">${escapeHtml(externalHref(elegantPortfolio))}</a>`
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
            <footer class="elegant-pdf-footer">${footerLink}${resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span>` : ""}</footer>
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

  const zeitIconMarkup = (
    kind:
      | "contacts"
      | "strengths"
      | "languages"
      | "summary"
      | "experience"
      | "education"
      | "certifications"
      | "phone"
      | "email"
      | "link"
      | "location",
  ) => {
    const paths = {
      contacts: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      strengths: '<path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>',
      languages: '<path d="M4 5h10M9 5c0 6-2 10-5 13M6 10c2 3 4 5 7 7M14 9h6M17 7v11M14 15h6"/>',
      summary: '<circle cx="12" cy="8" r="3"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>',
      experience: '<path d="M4 7h16v12H4zM9 7V4h6v3M4 12h16M10 12v2h4v-2"/>',
      education: '<path d="m3 9 9-5 9 5-9 5zM6 11v5c3 2 9 2 12 0v-5"/>',
      certifications: '<path d="M7 4h10v16l-5-3-5 3zM9 8h6M9 11h6"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z"/>',
      email: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1"/>',
      location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    } as const;
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind]}</svg>`;
  };

  const zeitHeading = (
    title: string,
    icon: Parameters<typeof zeitIconMarkup>[0],
  ) =>
    `<header class="zeit-pdf-heading"><i aria-hidden="true">${zeitIconMarkup(icon)}</i><h3>${escapeHtml(title)}</h3></header>`;

  const zeitContacts = [
    {
      label: "Telefon",
      icon: "phone" as const,
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      label: "E-Mail",
      icon: "email" as const,
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      label: "Portfolio",
      icon: "link" as const,
      value: profile?.portfolio
        ? externalHref(profile.portfolio)
        : "",
      href: externalHref(profile?.portfolio),
    },
    {
      label: "LinkedIn",
      icon: "link" as const,
      value: profile?.linkedin
        ? externalHref(profile.linkedin)
        : "",
      href: externalHref(profile?.linkedin),
    },
    {
      label: "Wohnort",
      icon: "location" as const,
      value: [profile?.postalCode, profile?.city, profile?.country]
        .filter(Boolean)
        .join(" "),
      href: "",
    },
    {
      label: "GitHub",
      icon: "link" as const,
      value: profile?.github ? externalHref(profile.github) : "",
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
    return `<section>${zeitHeading("Kontakte", "contacts")}<div class="zeit-pdf-contacts">${zeitContacts
      .map((contact) => {
        const contactValue = contact.value ?? "";
        const breakMarker =
          contact.label === "LinkedIn"
            ? "/in/"
            : contact.label === "GitHub"
              ? "github.com/"
              : "";
        const breakIndex = breakMarker
          ? contactValue.indexOf(breakMarker) + breakMarker.length
          : 0;
        const visibleValue =
          breakIndex > breakMarker.length
            ? `${escapeHtml(contactValue.slice(0, breakIndex))}<br>${escapeHtml(contactValue.slice(breakIndex))}`
            : escapeHtml(contactValue);
        const content = `<i aria-hidden="true">${zeitIconMarkup(contact.icon)}</i><span>${visibleValue}</span>`;
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
    ? `<section>${zeitHeading("Sprachen", "languages")}<div class="zeit-pdf-languages">${zeitLanguages
        .map(
          (language) =>
            `<article class="zeit-pdf-language"><div><h4>${escapeHtml(language.name)}</h4><span>${escapeHtml(language.level)}</span><span class="zeit-pdf-dots">${Array.from(
              { length: 5 },
              (_, index) =>
                `<i class="${index < language.score ? "filled" : ""}"></i>`,
            ).join("")}</span></div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const zeitAtsLanguages = zeitLanguages.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Sprachen", "languages")}<ul>${zeitLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zeitStrengths = strengths.map((value) => {
    const [strengthTitle, ...description] = value.split(
      /\s+(?:–|—|:)\s+/,
    );
    return {
      title: strengthTitle.trim(),
      description: description.join(" – ").trim(),
    };
  });
  const zeitVisualStrengths = zeitStrengths.length
    ? `<section>${zeitHeading("Stärken", "strengths")}<div class="zeit-pdf-strengths">${zeitStrengths
        .map(
          (strength) =>
            `<article class="zeit-pdf-strength"><i aria-hidden="true"></i><div><h4>${escapeHtml(strength.title)}</h4>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const zeitAtsStrengths = zeitStrengths.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Stärken", "strengths")}<ul>${zeitStrengths
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` – ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul></section>`
    : "";
  const zeitCertifications = uniqueValues(
    profile?.certifications ?? [],
  );
  const zeitVisualCertifications = zeitCertifications.length
    ? `<section>${zeitHeading("Zertifikate", "certifications")}<ul>${zeitCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";
  const zeitAtsCertifications = zeitCertifications.length
    ? `<section class="zeit-pdf-section">${zeitHeading("Zertifikate", "certifications")}<ul>${zeitCertifications
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
      ? `<section class="zeit-pdf-section">${zeitHeading(atsMode ? "Berufserfahrung" : "Erfahrung", "experience")}<div class="zeit-pdf-list">${experienceItems}</div></section>`
      : "";
    const educationMarkup = educationItems
      ? `<section class="zeit-pdf-section">${zeitHeading("Ausbildung", "education")}<div class="zeit-pdf-list">${educationItems}</div></section>`
      : "";

    if (atsMode) {
      const summaryMarkup =
        sections.profile && !isContinuation
          ? `<section class="zeit-pdf-section">${zeitHeading("Zusammenfassung", "summary")}<p class="zeit-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
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
        ? `<section class="zeit-pdf-section">${zeitHeading("Zusammenfassung", "summary")}<p class="zeit-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
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
          <footer class="zeit-pdf-footer">${footerLink}${resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span>` : ""}</footer>
        </div>
      </section>`;
  };

  const kreativIconMarkup = (
    kind: "phone" | "mail" | "linkedin" | "location" | "birth" | "strength",
  ) => {
    const paths = {
      phone:
        '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z"/>',
      mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/>',
      linkedin:
        '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
      location:
        '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      birth:
        '<path d="M4 21h16M7 21V10h10v11M9 10V7h6v3M12 7V3M10 5h4"/>',
      strength:
        '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
    } as const;
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind]}</svg>`;
  };
  const kreativContacts = [
    {
      label: "Telefon",
      icon: kreativIconMarkup("phone"),
      value: profile?.phone,
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      label: "E-Mail",
      icon: kreativIconMarkup("mail"),
      value: profile?.email,
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      label: "LinkedIn",
      icon: kreativIconMarkup("linkedin"),
      value: profile?.linkedin,
      href: externalHref(profile?.linkedin),
    },
    {
      label: "Wohnort",
      icon: kreativIconMarkup("location"),
      value: [profile?.postalCode, profile?.city, profile?.country]
        .filter(Boolean)
        .join(" "),
      href: "",
    },
    {
      label: "Geboren",
      icon: kreativIconMarkup("birth"),
      value: [profile?.birthDate, profile?.birthPlace]
        .filter(Boolean)
        .join(", "),
      href: "",
    },
  ].filter((contact) => contact.value?.trim());
  const kreativContactMarkup = () => {
    if (!kreativContacts.length) return "";
    return `<address class="kreativ-pdf-contacts">${kreativContacts
      .map((contact) => {
        const content = `${contact.icon}<i>${escapeHtml(contact.value)}</i>`;
        return contact.href
          ? `<a aria-label="${escapeHtml(contact.label)}" href="${escapeHtml(contact.href)}">${content}</a>`
          : `<span aria-label="${escapeHtml(contact.label)}">${content}</span>`;
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
  const kreativKnowledge = profile
    ? ensureKnowledgeSection(profile.knowledgeSection, profile.skills)
    : undefined;
  const kreativStrengthItems = (kreativKnowledge?.categories ?? [])
    .filter((category) => category.isVisible)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .flatMap((category) => [
      ...visibleKnowledgeItems(category.items),
      ...category.subcategories
        .filter((subcategory) => subcategory.isVisible)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .flatMap((subcategory) =>
          visibleKnowledgeItems(subcategory.items),
        ),
    ])
    .slice(0, 3);
  const kreativVisualStrengths = kreativStrengthItems.length
    ? `<section><h3>Stärken</h3><div class="kreativ-pdf-strengths">${kreativStrengthItems
        .map(
          (strength) =>
            `<article class="kreativ-pdf-strength">${kreativIconMarkup("strength")}<div><h4>${escapeHtml(strength.name)}</h4>${strength.description?.trim() ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const kreativAtsStrengths = kreativStrengthItems.length
    ? `<section><h3>Stärken</h3><ul>${kreativStrengthItems
        .map((strength) => `<li>${escapeHtml(strength.name)}</li>`)
        .join("")}</ul></section>`
    : "";
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
          <div class="page-content kreativ-pdf kreativ-pdf-ats" data-density="${plan.density}">
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
      : `<svg class="kreativ-pdf-background" viewBox="0 0 100 100" aria-hidden="true"><g class="wide"><circle cx="58" cy="30" r="37"/><circle cx="72" cy="44" r="31"/><circle cx="84" cy="59" r="25"/></g><g class="tight"><circle cx="96" cy="70" r="21"/><circle cx="65" cy="21" r="24"/><circle cx="89" cy="35" r="18"/><circle cx="99" cy="49" r="14"/></g></svg>`;
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
        <div class="page-content kreativ-pdf" data-density="${plan.density}">
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

  const ivyProfessionalLink =
    profile?.linkedin || profile?.portfolio || profile?.github || "";
  const ivyContactValues = [
    {
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      value: ivyProfessionalLink
        ? externalHref(ivyProfessionalLink)
        : "",
      href: ivyProfessionalLink ? externalHref(ivyProfessionalLink) : "",
    },
    {
      value: [profile?.city, profile?.country].filter(Boolean).join(", "),
      href: "",
    },
    {
      value:
        profile?.birthDate || profile?.birthPlace
          ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
          : "",
      href: "",
    },
  ].filter((contact) => contact.value.trim());
  const ivySpecializations = uniqueValues(profile?.skills ?? [])
    .slice(0, 3)
    .map((value) => value.split(/\s+(?:–|—|:)\s+/)[0])
    .join(" | ");
  const ivyProfession = [profile?.title || role, ivySpecializations]
    .filter(Boolean)
    .join(" | ");
  const ivyContacts = ivyContactValues.length
    ? `<address class="ivy-pdf-contacts">${ivyContactValues
        .map((contact, index) => {
          const value = contact.href
            ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value)}</a>`
            : `<span>${escapeHtml(contact.value)}</span>`;
          return `${index ? '<i aria-hidden="true">•</i>' : ""}${value}`;
        })
        .join("")}</address>`
    : "";
  const renderIvyHeader = (compact: boolean) => `
    <header class="ivy-pdf-header${compact ? " compact" : ""}">
      ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
      <h1>${escapeHtml(name)}</h1>
      ${ivyProfession ? `<h2>${escapeHtml(ivyProfession)}</h2>` : ""}
      ${compact ? "" : ivyContacts}
    </header>`;
  const ivyStrengths = uniqueValues(profile?.skills ?? [])
    .slice(0, 6)
    .map((value) => {
      const [strengthTitle, ...descriptionParts] = value.split(
        /\s+(?:–|—|:)\s+/,
      );
      return {
        title: strengthTitle.trim(),
        description: descriptionParts.join(" – ").trim(),
      };
    });
  const ivyVisualStrengths = ivyStrengths.length
    ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Stärken</h3><div class="ivy-pdf-strengths">${ivyStrengths
        .map(
          (strength, index) =>
            `<article class="ivy-pdf-strength"><i aria-hidden="true">${["♥", "✦", "⚑", "◆", "★", "✣"][index]}</i><div><h3>${escapeHtml(strength.title)}</h3>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
        )
        .join("")}</div></section>`
    : "";
  const ivyAtsStrengths = ivyStrengths.length
    ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Stärken</h3><ul>${ivyStrengths
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` – ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul></section>`
    : "";
  const ivyVisualLanguages = kreativLanguages.length
    ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Sprachen</h3><div class="ivy-pdf-languages">${kreativLanguages
        .map(
          (language) =>
            `<article class="ivy-pdf-language"><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span><span class="ivy-pdf-dots">${Array.from(
              { length: 5 },
              (_, index) =>
                `<i class="${index < language.score ? "filled" : ""}"></i>`,
            ).join("")}</span></article>`,
        )
        .join("")}</div></section>`
    : "";
  const ivyAtsLanguages = kreativLanguages.length
    ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Sprachen</h3><ul>${kreativLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul></section>`
    : "";
  const ivyKnowledge = kreativSkillValues.length
    ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Kenntnisse</h3><p class="ivy-pdf-knowledge">${kreativSkillValues
        .map(escapeHtml)
        .join(" · ")}</p></section>`
    : "";
  const ivyCertifications = kreativCertifications.length
    ? `<section class="ivy-pdf-section ivy-pdf-certifications"><h3 class="ivy-pdf-title">Zertifikate</h3><ul>${kreativCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`
    : "";
  const ivyWatercolor = `
    <svg class="ivy-pdf-watercolor" viewBox="0 0 210 297" preserveAspectRatio="none" aria-hidden="true">
      <defs><filter id="ivy-pdf-watercolor" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".012 .025" numOctaves="3" seed="17" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="B"/><feGaussianBlur stdDeviation="3.4"/></filter><linearGradient id="ivy-pdf-paper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef9f8"/><stop offset=".48" stop-color="#fbfdf9"/><stop offset="1" stop-color="#fff8e9"/></linearGradient></defs>
      <rect width="210" height="297" fill="url(#ivy-pdf-paper)"/>
      <g filter="url(#ivy-pdf-watercolor)" opacity=".52">
        <path d="M-18 4C18-9 48 1 73 24c16 15 15 38-4 55-25 23-63 30-91 12z" fill="#d9f1f4"/>
        <path d="M123-15c34 4 78 1 106 30v59c-34 7-79-8-97-31-13-17-15-38-9-58z" fill="#fff1d8"/>
        <path d="M-12 93c38-20 81-12 101 17 20 28-3 56-42 62-28 5-52-2-66-20z" fill="#e3f5ed"/>
        <path d="M133 85c31-12 74 1 91 28v67c-23 14-68 4-89-24-19-25-18-56-2-71z" fill="#e4f3f3"/>
        <path d="M-20 191c28-18 65-18 89 7 24 26 19 58-8 78-22 16-55 15-81 3z" fill="#e9f6f4"/>
        <path d="M93 185c34-24 83-20 118 6 29 22 31 69 10 102H116c-24-22-42-78-23-108z" fill="#fff1d4"/>
        <path d="M144 247c29-13 67 1 84 25v36h-89c-10-22-7-48 5-61z" fill="#d8f1f2"/>
      </g>
    </svg>`;
  const renderIvyCareerEntry = (
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
    return `<article class="ivy-pdf-entry">
      <div class="ivy-pdf-entry-top"><h3>${escapeHtml(item.organization)}</h3>${item.city ? `<span>${escapeHtml(item.city)}</span>` : "<span></span>"}</div>
      <div class="ivy-pdf-entry-role"><h4>${escapeHtml(item.title)}</h4><span>${escapeHtml(formatDateRange(item.from, item.to))}</span></div>
      ${item.achievements.length ? `<ul>${item.achievements.map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join("")}</ul>` : ""}
    </article>`;
  };
  const ivyPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";
  const ivySectionLayout = getProfileResumeSectionLayout(profile, "ivy-league");
  const ivyHasCustomLayout = hasSavedTemplateSectionLayout(profile, "ivy-league");
  const renderIvyLeagueResumePage = (plan: ResumePagePlan) => {
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderIvyCareerEntry(item.id, "experience"))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderIvyCareerEntry(item.id, "education"))
      .join("");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experienceMarkup = experienceItems
      ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">${atsMode ? "Berufserfahrung" : "Erfahrung"}${isContinuation ? '<small class="muted"> · Fortsetzung</small>' : ""}</h3><div class="ivy-pdf-list">${experienceItems}</div></section>`
      : "";
    const educationMarkup = educationItems
      ? `<section class="ivy-pdf-section ivy-pdf-education"><h3 class="ivy-pdf-title">Ausbildung</h3><div class="ivy-pdf-list">${educationItems}</div></section>`
      : "";
    const summaryMarkup =
      sections.profile && !isContinuation
        ? `<section class="ivy-pdf-section"><h3 class="ivy-pdf-title">Zusammenfassung</h3><p class="ivy-pdf-summary">${escapeHtml(docs.resumeProfile || profile?.summary || "Kurzprofil im Dokumenteditor ergänzen.")}</p></section>`
        : "";
    const orderedSectionTypes = ivyHasCustomLayout
      ? ivySectionLayout.map(({ type }) => type)
      : atsMode
        ? ["summary", "experience", "education", "knowledge", "languages", "strengths", "certifications"]
        : ["summary", "strengths", "experience", "education", "knowledge", "languages", "certifications"];
    const orderedSections = orderedSectionTypes
      .map((type) => {
        if (type === "summary") return summaryMarkup;
        if (type === "strengths") {
          return sections.skills && !isContinuation
            ? atsMode
              ? ivyAtsStrengths
              : ivyVisualStrengths
            : "";
        }
        if (type === "experience") {
          return sections.experience ? experienceMarkup : "";
        }
        if (type === "education") return sections.education ? educationMarkup : "";
        if (type === "knowledge") {
          return isLastPage && sections.skills ? ivyKnowledge : "";
        }
        if (type === "languages") {
          return isLastPage && sections.languages
            ? atsMode
              ? ivyAtsLanguages
              : ivyVisualLanguages
            : "";
        }
        if (type === "certifications") {
          return isLastPage && sections.certifications ? ivyCertifications : "";
        }
        return "";
      })
      .join("");
    const footerLink = ivyPortfolio
      ? `<a href="${escapeHtml(externalHref(ivyPortfolio))}">${escapeHtml(externalHref(ivyPortfolio))}</a>`
      : "<span></span>";
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="ivy-league" data-no-fit="true">
      <div class="page-content ivy-pdf${atsMode ? " ivy-pdf-ats" : ""}" data-density="${plan.density}">
        ${!atsMode && designSettings.backgroundId === "pastel-gradient" ? ivyWatercolor : ""}
        <div class="ivy-pdf-content">
          ${renderIvyHeader(isContinuation)}
          ${orderedSections}
          ${!experienceItems && !educationItems && plan.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}
        </div>
        <footer class="ivy-pdf-footer">${footerLink}${resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span>` : ""}</footer>
      </div>
    </section>`;
  };

  const managedSummary =
    docs.resumeProfile ||
    profile?.summary ||
    "Kurzprofil im Dokumenteditor ergänzen.";
  const managedPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";
  const managedStrengths = uniqueValues(profile?.skills ?? [])
    .slice(0, 4)
    .map((value) => {
      const [title, ...description] = value.split(/\s+(?:–|—|:)\s+/);
      return {
        title: title.trim(),
        description: description.join(" – ").trim(),
      };
    });
  const managedContactValues = [
    {
      icon: "☎",
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: "@",
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: "↗",
      value: profile?.linkedin ? externalHref(profile.linkedin) : "",
      href: profile?.linkedin ? externalHref(profile.linkedin) : "",
    },
    {
      icon: "⌖",
      value:
        profile?.portfolio || profile?.github
          ? externalHref(profile?.portfolio || profile?.github || "")
          : "",
      href:
        profile?.portfolio || profile?.github
          ? externalHref(profile?.portfolio || profile?.github || "")
          : "",
    },
    {
      icon: "◆",
      value: [profile?.city, profile?.country].filter(Boolean).join(", "),
      href: "",
    },
    {
      icon: "☆",
      value:
        profile?.birthDate || profile?.birthPlace
          ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
          : "",
      href: "",
    },
  ].filter((contact) => contact.value.trim());
  const managedProfession = [
    profile?.title || role,
    ...managedStrengths.slice(0, 3).map((strength) => strength.title),
  ]
    .filter(Boolean)
    .join(" | ");
  const managedFooter = (
    plan: ResumePagePlan,
    hideSinglePageNumber = false,
  ) =>
    `<footer class="managed-pdf-footer">${
      managedPortfolio
        ? `<a href="${escapeHtml(externalHref(managedPortfolio))}">${escapeHtml(externalHref(managedPortfolio))}</a>`
        : "<span></span>"
    }${!hideSinglePageNumber || resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span>` : ""}</footer>`;
  const managedDots = (score: number) =>
    `<span class="managed-pdf-dots">${Array.from(
      { length: 5 },
      (_, index) => `<i class="${index < score ? "filled" : ""}"></i>`,
    ).join("")}</span>`;
  const renderManagedCareerEntry = (
    id: string,
    kind: "experience" | "education",
    variant: "stilvoll" | "kompakt" | "einfach",
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
    const achievements = item.achievements.length
      ? `<ul>${item.achievements
          .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
          .join("")}</ul>`
      : "";
    if (variant === "einfach") {
      return `<article class="managed-pdf-entry einfach-pdf-entry"><h3>${escapeHtml(item.title)}</h3><h4>${escapeHtml(item.organization)}</h4><p class="einfach-pdf-meta"><span>${escapeHtml(formatDateRange(item.from, item.to))}</span>${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}</p>${achievements}</article>`;
    }
    if (variant === "kompakt") {
      return `<article class="managed-pdf-entry kompakt-pdf-entry"><h3>${escapeHtml(item.title)}</h3><p class="kompakt-pdf-meta"><strong>${escapeHtml(item.organization)}</strong><span>${escapeHtml(formatDateRange(item.from, item.to))}</span>${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}</p>${achievements}</article>`;
    }
    return `<article class="managed-pdf-entry stilvoll-pdf-entry"><h3>${escapeHtml(item.title)}</h3><p class="stilvoll-pdf-meta"><strong>${escapeHtml(item.organization)}</strong><span>${escapeHtml(formatDateRange(item.from, item.to))}${item.city ? ` · ${escapeHtml(item.city)}` : ""}</span></p>${achievements}</article>`;
  };
  const managedSection = (
    title: string,
    content: string,
    extraClass = "",
  ) =>
    content
      ? `<section class="managed-pdf-section ${extraClass}"><h3 class="managed-pdf-title">${title}</h3>${content}</section>`
      : "";
  const managedAtsContacts = managedContactValues
    .map((contact) => {
      const value = escapeHtml(contact.value);
      return contact.href
        ? `<a href="${escapeHtml(contact.href)}">${value}</a>`
        : value;
    })
    .join(" · ");
  const managedAtsStrengths = managedStrengths.length
    ? `<ul>${managedStrengths
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` – ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul>`
    : "";
  const managedAtsLanguages = kreativLanguages.length
    ? `<ul>${kreativLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul>`
    : "";
  const managedKnowledge = kreativKnowledge?.isVisible && kreativSkillValues.length
    ? `<p>${kreativSkillValues.map(escapeHtml).join(" · ")}</p>`
    : "";
  const managedCertifications = kreativCertifications.length
    ? `<ul>${kreativCertifications
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul>`
    : "";
  const renderManagedAtsPage = (
    plan: ResumePagePlan,
    variant: "stilvoll" | "kompakt" | "einfach",
    templateId: string = variant,
  ) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderManagedCareerEntry(item.id, "experience", variant))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderManagedCareerEntry(item.id, "education", variant))
      .join("");
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="${templateId}" data-no-fit="true"><div class="page-content managed-pdf ${variant}-pdf managed-pdf-ats" data-density="${plan.density}">
      <header class="managed-pdf-header ${variant}-pdf-header${isContinuation ? " compact" : ""}">
        ${isContinuation ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
        <h1>${escapeHtml(name)}</h1>${managedProfession ? `<h2>${escapeHtml(managedProfession)}</h2>` : ""}
      </header>
      ${!isContinuation ? managedSection("Persönliche Daten", `<p>${managedAtsContacts}</p>`) : ""}
      ${sections.profile && !isContinuation ? managedSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}
      ${sections.experience && experiences ? managedSection(`Berufserfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${experiences}</div>`) : ""}
      ${sections.education && education ? managedSection("Ausbildung", `<div class="managed-pdf-list">${education}</div>`) : ""}
      ${isLastPage && sections.skills ? managedSection("Kenntnisse", managedKnowledge) : ""}
      ${isLastPage && sections.languages ? managedSection("Sprachen", managedAtsLanguages) : ""}
      ${isLastPage && sections.skills ? managedSection("Stärken", managedAtsStrengths) : ""}
      ${isLastPage && sections.certifications ? managedSection(variant === "kompakt" ? "Erfolge und Zertifikate" : "Zertifikate", managedCertifications) : ""}
      ${managedFooter(plan)}
    </div></section>`;
  };
  const stilvollBackground = `<svg class="managed-pdf-background" viewBox="0 0 210 297" aria-hidden="true"><defs><pattern id="stilvoll-pdf-chevron" width="34" height="25" patternUnits="userSpaceOnUse"><path d="M0 22 17 6l17 16M0 16 17 0l17 16"/></pattern></defs><rect x="50" y="-5" width="160" height="105" fill="url(#stilvoll-pdf-chevron)"/><rect x="118" y="48" width="92" height="83" fill="url(#stilvoll-pdf-chevron)"/></svg>`;
  const kompaktBackground = `<svg class="managed-pdf-background" viewBox="0 0 210 297" aria-hidden="true"><path d="M72-10c2 32 10 48 38 62 31 16 58 22 111 64M80-10c2 28 11 43 38 56 34 16 62 24 103 59M89-10c2 25 12 38 37 50 35 17 64 25 95 54M98-10c3 22 12 33 35 44 36 18 63 26 88 49M144 0v16c0 7 5 12 12 12h25c7 0 12 5 12 12v2M159 49h50M177 71h33"/><circle cx="144" cy="28" r="3.2"/><circle cx="176" cy="49" r="2.2"/><circle cx="198" cy="71" r="2.2"/></svg>`;
  const einfachBackground = `<svg class="managed-pdf-background" viewBox="0 0 210 297" aria-hidden="true"><path d="M128-8v21h14V-8M148 21v19h16V26M71 20v24h16V31M98 39v20h16V48M152 57v22h16V67M174 79v23h20V89M101 112a11 11 0 1 0 22 0M174 251v29h-14v17M82 261h18v25h15M8 276a9 9 0 1 1 18 0"/></svg>`;
  const renderManagedHeader = (
    variant: "stilvoll" | "einfach",
    isContinuation: boolean,
  ) => {
    const contactsClass =
      variant === "stilvoll"
        ? "stilvoll-pdf-contacts"
        : "einfach-pdf-contacts";
    const contactClass =
      variant === "stilvoll" ? "" : "einfach-pdf-contact";
    const contacts = managedContactValues
      .map((contact) => {
        const content = contact.href
          ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value)}</a>`
          : `<span>${escapeHtml(contact.value)}</span>`;
        return `<span class="${contactClass}"><i aria-hidden="true">${contact.icon}</i>${content}</span>`;
      })
      .join("");
    const photoClass =
      variant === "stilvoll" ? "stilvoll-pdf-photo" : "einfach-pdf-photo";
    const photo =
      !isContinuation && photoSource
        ? `<img class="${photoClass}" src="${escapeHtml(photoSource)}" alt="">`
        : "";
    return `<header class="managed-pdf-header ${variant}-pdf-header${isContinuation ? " compact" : ""}${!photo ? " no-photo" : ""}">
      <div>${isContinuation ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}<h1>${escapeHtml(name)}</h1>${managedProfession ? `<h2>${escapeHtml(managedProfession)}</h2>` : ""}${!isContinuation && managedContactValues.length ? `<address class="${contactsClass}">${contacts}</address>` : ""}</div>${photo}
    </header>`;
  };
  const managedStrengthCards = (variant: "stilvoll" | "kompakt" | "einfach") =>
    managedStrengths.length
      ? `<div class="${variant}-pdf-strengths">${managedStrengths
          .map(
            (strength, index) =>
              `<article class="${variant}-pdf-strength"><i aria-hidden="true">${["★", "⚑", "↗", "◇"][index]}</i><div><h3>${escapeHtml(strength.title)}</h3>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
          )
          .join("")}</div>`
      : "";
  const managedAchievementCards = (
    variant: "stilvoll" | "kompakt" | "einfach",
  ) =>
    kreativCertifications.length
      ? `<div class="${variant}-pdf-strengths">${kreativCertifications
          .slice(0, 2)
          .map(
            (achievement, index) =>
              `<article class="${variant}-pdf-strength"><i aria-hidden="true">${index ? "&#9733;" : "&#9873;"}</i><div><h3>${escapeHtml(achievement)}</h3></div></article>`,
          )
          .join("")}</div>`
      : "";
  const managedVisualLanguages = (variant: "stilvoll" | "kompakt" | "einfach") =>
    kreativLanguages.length
      ? `<div class="${variant}-pdf-languages">${kreativLanguages
          .map(
            (language) =>
              `<article class="${variant}-pdf-language"><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span>${managedDots(language.score)}</article>`,
          )
          .join("")}</div>`
      : "";
  const renderStilvollResumePage = (plan: ResumePagePlan) => {
    if (atsMode) return renderManagedAtsPage(plan, "stilvoll");
    const isContinuation = plan.pageNumber > 1;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderManagedCareerEntry(item.id, "experience", "stilvoll"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderManagedCareerEntry(item.id, "education", "stilvoll"))
      .join("");
    const left = isContinuation
      ? ""
      : `<aside>${sections.profile ? managedSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${sections.skills ? managedSection("Stärken", managedStrengthCards("stilvoll")) : ""}${sections.languages ? managedSection("Sprachen", managedVisualLanguages("stilvoll")) : ""}</aside>`;
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="stilvoll" data-no-fit="true"><div class="page-content managed-pdf stilvoll-pdf" data-density="${plan.density}">${designSettings.backgroundId === "geometric" && !isContinuation ? stilvollBackground : ""}${renderManagedHeader("stilvoll", isContinuation)}<div class="stilvoll-pdf-columns${isContinuation ? " continuation" : ""}">${left}<main>${sections.experience ? managedSection(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${experiences}</div>`) : ""}${sections.education ? managedSection("Ausbildung", `<div class="managed-pdf-list">${education}</div>`) : ""}</main></div>${managedFooter(plan, true)}</div></section>`;
  };
  const renderKompaktResumePage = (plan: ResumePagePlan) => {
    if (atsMode) return renderManagedAtsPage(plan, "kompakt");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderManagedCareerEntry(item.id, "experience", "kompakt"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderManagedCareerEntry(item.id, "education", "kompakt"))
      .join("");
    const contacts = managedContactValues
      .map((contact) => {
        const content = contact.href
          ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value)}</a>`
          : escapeHtml(contact.value);
        return `<span class="kompakt-pdf-contact"><i aria-hidden="true">${contact.icon}</i>${content}</span>`;
      })
      .join("");
    const kompaktStrengths = sections.skills
      ? managedStrengthCards("kompakt")
      : "";
    const kompaktAchievements = sections.certifications
      ? managedAchievementCards("kompakt")
      : "";
    const kompaktSkills =
      sections.skills && kreativSkillValues.length
        ? `<div class="kompakt-pdf-skills">${kreativSkillValues.map((skill) => `<span class="kompakt-pdf-skill">${escapeHtml(skill)}</span>`).join("")}</div>`
        : "";
    const right = isContinuation
      ? ""
      : `<aside>${managedSection("Kontaktdaten", `<address class="kompakt-pdf-contacts">${contacts}</address>`)}${sections.profile ? managedSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${managedSection("Stärken", kompaktStrengths)}${managedSection("Erfolge", kompaktAchievements)}${managedSection("Fähigkeiten", kompaktSkills)}</aside>`;
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="kompakt" data-no-fit="true"><div class="page-content managed-pdf kompakt-pdf" data-density="${plan.density}">${designSettings.backgroundId === "abstract" && !isContinuation ? kompaktBackground : ""}<header class="managed-pdf-header kompakt-pdf-header${isContinuation ? " compact" : ""}">${isContinuation ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}<h1>${escapeHtml(name)}</h1>${isContinuation && managedProfession ? `<h2>${escapeHtml(managedProfession)}</h2>` : ""}</header><div class="kompakt-pdf-columns${isContinuation ? " continuation" : ""}"><main>${sections.experience ? managedSection(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${experiences}</div>`) : ""}${sections.education ? managedSection("Ausbildung", `<div class="managed-pdf-list">${education}</div>`) : ""}${isLastPage && sections.languages ? managedSection("Sprachen", managedVisualLanguages("kompakt")) : ""}</main>${right}</div>${managedFooter(plan, true)}</div></section>`;
  };
  const renderEinspaltigResumePage = (plan: ResumePagePlan) => {
    if (atsMode) return renderManagedAtsPage(plan, "einfach", "einspaltig");
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderManagedCareerEntry(item.id, "experience", "einfach"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderManagedCareerEntry(item.id, "education", "einfach"))
      .join("");
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="einspaltig" data-no-fit="true"><div class="page-content managed-pdf einfach-pdf" data-density="${plan.density}">${designSettings.backgroundId === "geometric" && !isContinuation ? einfachBackground : ""}<div class="einfach-pdf-inner">${renderManagedHeader("einfach", isContinuation)}${sections.profile && !isContinuation ? managedSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${sections.skills && !isContinuation ? managedSection("Stärken", managedStrengthCards("einfach")) : ""}${sections.experience && experiences ? managedSection(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="managed-pdf-list">${experiences}</div>`) : ""}${sections.education && education ? managedSection("Ausbildung", `<div class="managed-pdf-list">${education}</div>`) : ""}${isLastPage && sections.skills ? managedSection("Kenntnisse", managedKnowledge) : ""}${isLastPage && sections.languages ? managedSection("Sprachen", managedVisualLanguages("einfach")) : ""}${isLastPage && sections.certifications ? managedSection("Zertifikate", managedCertifications) : ""}</div>${managedFooter(plan, true)}</div></section>`;
  };

  const klassischBackground = `<svg class="klassisch-pdf-background" viewBox="0 0 210 297" preserveAspectRatio="none" aria-hidden="true"><path class="fill" d="M34 0c18 20 35 20 61 16 43-7 70-4 115 35V0Z"/><path class="line" d="M66-4c11 19 21 16 43 10 32-9 51 1 76 19 9 7 18 10 25 10"/><path class="line" d="M51-4c14 23 31 25 56 17 35-12 54 0 82 18 8 5 15 7 21 7"/><circle class="line" cx="197" cy="0" r="13.5"/><path class="fill" d="M0 251c27-2 43 15 62 31 7 6 14 11 22 15H0Z"/><path class="line" d="M-4 263c20-8 35 3 51 17 9 8 18 14 27 19"/><path class="line" d="M-5 271c15-9 30-2 43 9 9 8 17 14 25 19"/><circle class="line" cx="12" cy="297" r="13"/></svg>`;
  const klassischSection = (
    title: string,
    content: string,
    extraClass = "",
  ) =>
    content
      ? `<section class="klassisch-pdf-section ${extraClass}"><h3 class="klassisch-pdf-title">${escapeHtml(title)}</h3>${content}</section>`
      : "";
  const klassischCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  title: experience.role,
                  organization: experience.company,
                  city: experience.city,
                  from: experience.from,
                  to: experience.to,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  title: education.degree,
                  organization: education.institution,
                  city: education.city,
                  from: education.from,
                  to: education.to,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    const achievements = item.achievements.length
      ? `<ul>${item.achievements
          .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
          .join("")}</ul>`
      : "";
    return `<article class="klassisch-pdf-entry"><div class="klassisch-pdf-entry-head"><div><h3>${escapeHtml(item.title)}</h3><h4>${escapeHtml(item.organization)}</h4></div><p class="klassisch-pdf-entry-meta">${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}<time>${escapeHtml(formatDateRange(item.from, item.to))}</time></p></div>${achievements}</article>`;
  };
  const klassischProfession = [
    profile?.title || role,
    ...managedStrengths.slice(0, 2).map((strength) => strength.title),
  ]
    .filter(Boolean)
    .join(" | ");
  const klassischContacts = managedContactValues
    .map((contact) => {
      const value = escapeHtml(contact.value);
      return `<span>${contact.href ? `<a href="${escapeHtml(contact.href)}">${value}</a>` : value}</span>`;
    })
    .join("");
  const klassischStrengths = managedStrengths.length
    ? `<div class="klassisch-pdf-strengths">${managedStrengths
        .slice(0, 3)
        .slice(0, 6)
        .map(
          (strength) =>
            `<article class="klassisch-pdf-strength"><h3>${escapeHtml(strength.title)}</h3>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</article>`,
        )
        .join("")}</div>`
    : "";
  const klassischAtsStrengths = managedStrengths.length
    ? `<ul>${managedStrengths
        .slice(0, 3)
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` – ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul>`
    : "";
  const klassischKnowledgeValues = kreativSkillValues.filter(
    (value) =>
      !uniqueValues(profile?.skills ?? [])
        .slice(0, 3)
        .includes(value),
  );
  const klassischKnowledge = klassischKnowledgeValues.length
    ? `<p>${klassischKnowledgeValues.map(escapeHtml).join(" · ")}</p>`
    : "";
  const klassischLanguages = kreativLanguages.length
    ? `<div class="klassisch-pdf-languages">${kreativLanguages
        .map(
          (language) =>
            `<p class="klassisch-pdf-language"><strong>${escapeHtml(language.name)}</strong>${language.level ? `<span>(${escapeHtml(language.level)})</span>` : ""}</p>`,
        )
        .join("")}</div>`
    : "";
  const klassischHeader = (isContinuation: boolean, includePhoto: boolean) => {
    const photo =
      includePhoto && !isContinuation && photoSource
        ? `<img class="klassisch-pdf-photo" src="${escapeHtml(photoSource)}" alt="">`
        : "";
    return `<header class="klassisch-pdf-header${isContinuation ? " compact" : ""}${!photo ? " no-photo" : ""}"><div>${isContinuation ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}<h1>${escapeHtml(name)}</h1>${klassischProfession ? `<h2>${escapeHtml(klassischProfession)}</h2>` : ""}${includePhoto && !isContinuation && klassischContacts ? `<address class="klassisch-pdf-contacts">${klassischContacts}</address>` : ""}</div>${photo}</header>`;
  };
  const klassischFooter = (plan: ResumePagePlan) =>
    `<footer class="klassisch-pdf-footer">${managedPortfolio ? `<a href="${escapeHtml(externalHref(managedPortfolio))}">${escapeHtml(managedPortfolio)}</a>` : "<span></span>"}${resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span>` : ""}</footer>`;
  const renderKlassischResumePage = (plan: ResumePagePlan) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => klassischCareerEntry(item.id, "experience"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => klassischCareerEntry(item.id, "education"))
      .join("");
    if (atsMode) {
      return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="klassisch" data-no-fit="true"><div class="page-content klassisch-pdf klassisch-pdf-ats" data-density="${plan.density}">${klassischHeader(isContinuation, false)}${!isContinuation ? klassischSection("Persönliche Daten", `<p>${managedAtsContacts}</p>`) : ""}${sections.profile && !isContinuation ? klassischSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${sections.experience && experiences ? klassischSection(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="klassisch-pdf-list">${experiences}</div>`) : ""}${sections.education && education ? klassischSection("Ausbildung", `<div class="klassisch-pdf-list">${education}</div>`, "klassisch-pdf-education") : ""}${isLastPage && sections.skills ? klassischSection("Kenntnisse", klassischKnowledge) : ""}${isLastPage && sections.languages ? klassischSection("Sprachen", klassischLanguages) : ""}${isLastPage && sections.skills ? klassischSection("Stärken", klassischAtsStrengths) : ""}${isLastPage && sections.certifications ? klassischSection("Zertifikate", managedCertifications) : ""}</div></section>`;
    }
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="klassisch" data-no-fit="true"><div class="page-content klassisch-pdf" data-density="${plan.density}">${designSettings.backgroundId === "classic-soft-blue-waves" && !isContinuation ? klassischBackground : ""}<div class="klassisch-pdf-content">${klassischHeader(isContinuation, true)}${sections.profile && !isContinuation ? klassischSection("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${sections.skills && !isContinuation ? klassischSection("Stärken", klassischStrengths) : ""}${sections.experience && experiences ? klassischSection(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="klassisch-pdf-list">${experiences}</div>`) : ""}${sections.education && education ? klassischSection("Ausbildung", `<div class="klassisch-pdf-list">${education}</div>`, "klassisch-pdf-education") : ""}${isLastPage && sections.skills ? klassischSection("Kenntnisse", klassischKnowledge) : ""}${isLastPage && sections.languages ? klassischSection("Sprachen", klassischLanguages) : ""}${isLastPage && sections.certifications ? klassischSection("Zertifikate", managedCertifications) : ""}</div>${klassischFooter(plan)}</div></section>`;
  };

  const renderMehrspaltigResumePage = (plan: ResumePagePlan) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    if (atsMode) {
      return renderKlassischResumePage(plan).replaceAll("klassisch", "mehrspaltig");
    }
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => klassischCareerEntry(item.id, "experience").replaceAll("klassisch", "mehrspaltig"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => klassischCareerEntry(item.id, "education").replaceAll("klassisch", "mehrspaltig"))
      .join("");
    const section = (title: string, content: string, extraClass = "") =>
      content
        ? `<section class="mehrspaltig-pdf-section ${extraClass}"><h3 class="mehrspaltig-pdf-title">${escapeHtml(title)}</h3>${content}</section>`
        : "";
    const header = klassischHeader(isContinuation, true).replaceAll("klassisch", "mehrspaltig");
    const footer = klassischFooter(plan).replaceAll("klassisch", "mehrspaltig");
    const background = `<svg class="mehrspaltig-pdf-background" viewBox="0 0 210 297" preserveAspectRatio="none" aria-hidden="true"><g><path class="ribbon red" d="M168 5l28 16"/><path class="ribbon orange" d="M169 10l28 16"/><path class="ribbon yellow" d="M170 15l28 16"/><path class="ribbon green" d="M171 20l28 16"/><path class="ribbon blue" d="M172 25l28 16"/><path class="ribbon purple" d="M173 30l28 16"/></g><g><path class="ribbon red" d="M7 269l21 12"/><path class="ribbon orange" d="M8 273l21 12"/><path class="ribbon yellow" d="M9 277l21 12"/><path class="ribbon green" d="M10 281l21 12"/><path class="ribbon blue" d="M11 285l21 12"/><path class="ribbon purple" d="M12 289l21 12"/></g></svg>`;
    const skills = klassischKnowledgeValues.length
      ? `<div class="mehrspaltig-pdf-skills">${klassischKnowledgeValues.map((value) => `<strong>${escapeHtml(value)}</strong>`).join("")}</div>`
      : "";
    const strengths = managedStrengths.length
      ? `<div class="mehrspaltig-pdf-strengths">${managedStrengths.slice(0, 4).map((strength, index) => `<article class="mehrspaltig-pdf-strength"><i aria-hidden="true">${["✦", "⚑", "♡", "↗"][index]}</i><div><h3>${escapeHtml(strength.title)}</h3>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`).join("")}</div>`
      : "";
    const languages = klassischLanguages.replaceAll("klassisch", "mehrspaltig");
    const left = !isContinuation
      ? `${sections.profile ? section("Zusammenfassung", `<p>${escapeHtml(managedSummary)}</p>`) : ""}${sections.skills ? section("Fähigkeiten", skills) : ""}${isLastPage && sections.languages ? section("Sprachen", languages) : ""}`
      : "";
    const main = `${sections.experience && experiences ? section(`Erfahrung${isContinuation ? " · Fortsetzung" : ""}`, `<div class="mehrspaltig-pdf-list">${experiences}</div>`) : ""}${sections.education && education ? section("Ausbildung", `<div class="mehrspaltig-pdf-list">${education}</div>`, "mehrspaltig-pdf-education") : ""}${isLastPage && sections.certifications ? section("Zertifizierung", managedCertifications.replaceAll("klassisch", "mehrspaltig")) : ""}`;
    const right = !isContinuation && sections.skills ? section("Stärken", strengths) : "";
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="mehrspaltig" data-no-fit="true"><div class="page-content mehrspaltig-pdf" data-density="${plan.density}">${designSettings.backgroundId === "classic-soft-blue-waves" && !isContinuation ? background : ""}<div class="mehrspaltig-pdf-content">${header}<div class="mehrspaltig-pdf-columns${isContinuation ? " continuation" : ""}">${!isContinuation ? `<aside class="mehrspaltig-pdf-column">${left}</aside>` : ""}<main class="mehrspaltig-pdf-column">${main}</main>${!isContinuation ? `<aside class="mehrspaltig-pdf-column">${right}</aside>` : ""}</div></div>${footer}</div></section>`;
  };

  const modernSection = (title: string, content: string, extraClass = "") =>
    content
      ? `<section class="modern-pdf-section ${extraClass}"><h3 class="modern-pdf-title">${escapeHtml(title)}</h3>${content}</section>`
      : "";
  const modernProfessionTitle = profile?.title || role;
  const modernProfession = [
    modernProfessionTitle,
    ...(modernProfessionTitle.length < 48
      ? managedStrengths.slice(0, 2).map((item) => item.title)
      : []),
  ]
    .filter(Boolean)
    .join(" | ");
  const modernContactItems = [
    {
      icon: "T",
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: "@",
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: "in",
      value: profile?.linkedin || "",
      href: externalHref(profile?.linkedin),
    },
    {
      icon: "W",
      value: profile?.portfolio || profile?.github || "",
      href: externalHref(profile?.portfolio || profile?.github),
    },
    {
      icon: "O",
      value: [profile?.city, profile?.country].filter(Boolean).join(", "),
      href: "",
    },
    {
      icon: "G",
      value:
        profile?.birthDate || profile?.birthPlace
          ? `Geb. ${profile?.birthDate || ""}${profile?.birthPlace ? ` in ${profile.birthPlace}` : ""}`.trim()
          : "",
      href: "",
    },
  ].filter((item) => item.value.trim());
  const renderModernContacts = (ats = false, inline = false) => {
    if (!modernContactItems.length) return "";
    const items = inline
      ? modernContactItems
          .filter((item) => ["T", "@", "in", "O"].includes(item.icon))
          .slice(0, 4)
      : modernContactItems;
    return `<address class="modern-pdf-contacts${inline ? " inline" : ""}">${items
      .map((item) => {
        const value = escapeHtml(item.value);
        const content = item.href
          ? `<a href="${escapeHtml(item.href)}">${value}</a>`
          : `<span>${value}</span>`;
        return `<span class="modern-pdf-contact">${ats ? "" : `<i aria-hidden="true">${item.icon}</i>`}${content}</span>`;
      })
      .join("")}</address>`;
  };
  const renderModernHeader = (compact: boolean, ats = false) => {
    const photo =
      !compact && !ats && photoSource
        ? `<img class="modern-pdf-photo" src="${escapeHtml(photoSource)}" alt="">`
        : "";
    return `<header class="modern-pdf-header${compact ? " compact" : ""}${photo ? "" : " no-photo"}"><div class="modern-pdf-identity">${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}<h1>${escapeHtml(name)}</h1>${modernProfession ? `<h2>${escapeHtml(modernProfession)}</h2>` : ""}${!compact && !ats ? renderModernContacts(false, true) : ""}</div>${photo}</header>`;
  };
  const renderModernCareerEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  title: experience.role,
                  organization: experience.company,
                  from: experience.from,
                  to: experience.to,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  title: education.degree,
                  organization: education.institution,
                  from: education.from,
                  to: education.to,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `<article class="modern-pdf-entry"><h3>${escapeHtml(item.title)}</h3><p class="modern-pdf-entry-meta"><strong>${escapeHtml(item.organization)}</strong><span class="modern-pdf-entry-date"><i aria-hidden="true">▦</i>${escapeHtml(formatDateRange(item.from, item.to))}</span>${item.city ? `<span class="modern-pdf-entry-location"><i aria-hidden="true">●</i>${escapeHtml(item.city)}</span>` : ""}</p>${item.achievements.length ? `<ul>${item.achievements.map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join("")}</ul>` : ""}</article>`;
  };
  const modernDescribedStrengths = managedStrengths.filter(
    (item) => item.description,
  );
  const modernVisualStrengths = modernDescribedStrengths.length
    ? `<div class="modern-pdf-strengths">${modernDescribedStrengths
        .map(
          (item, index) =>
            `<article class="modern-pdf-strength"><i aria-hidden="true">${index % 2 === 0 ? "✓" : "⚑"}</i><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div></article>`,
        )
        .join("")}</div>`
    : "";
  const modernVisualKnowledge = kreativSkillValues.length
    ? `<div class="modern-pdf-knowledge">${kreativSkillValues.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`
    : "";
  const modernVisualAchievements = kreativCertifications.length
    ? `<div class="modern-pdf-achievements">${kreativCertifications.map((item) => `<article><i aria-hidden="true">★</i><p>${escapeHtml(item)}</p></article>`).join("")}</div>`
    : "";
  const modernVisualLanguages = kreativLanguages.length
    ? `<div class="modern-pdf-languages">${kreativLanguages
        .map(
          (language) =>
            `<article class="modern-pdf-language"><div><strong>${escapeHtml(language.name)}</strong><em>${escapeHtml(language.level)}</em></div><span class="modern-pdf-dots" aria-hidden="true">${Array.from({ length: 5 }, (_, index) => (index < language.score ? "●" : "○")).join("")}</span></article>`,
        )
        .join("")}</div>`
    : "";
  const modernAtsLanguages = kreativLanguages.length
    ? `<ul>${kreativLanguages.map((language) => `<li>${escapeHtml(language.raw)}</li>`).join("")}</ul>`
    : "";
  const modernAtsStrengths = managedStrengths.length
    ? `<ul>${managedStrengths
        .map(
          (item) =>
            `<li><strong>${escapeHtml(item.title)}</strong>${item.description ? ` – ${escapeHtml(item.description)}` : ""}</li>`,
        )
        .join("")}</ul>`
    : "";
  const modernAtsKnowledge = kreativSkillValues.length
    ? `<p>${kreativSkillValues.map(escapeHtml).join(" · ")}</p>`
    : "";
  const modernAtsCertifications = kreativCertifications.length
    ? `<ul class="modern-pdf-certifications">${kreativCertifications.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  const modernFooter = (plan: ResumePagePlan) =>
    `<footer class="modern-pdf-footer">${managedPortfolio ? `<a href="${escapeHtml(externalHref(managedPortfolio))}">${escapeHtml(managedPortfolio)}</a>` : "<span></span>"}<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span></footer>`;
  const renderModernResumePage = (plan: ResumePagePlan) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experiences = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderModernCareerEntry(item.id, "experience"))
      .join("");
    const education = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderModernCareerEntry(item.id, "education"))
      .join("");
    const experienceSection = sections.experience && experiences
      ? modernSection(
          `${atsMode ? "Berufserfahrung" : "Erfahrung"}${isContinuation ? " · Fortsetzung" : ""}`,
          `<div class="modern-pdf-list">${experiences}</div>`,
        )
      : "";
    const educationSection = sections.education && education
      ? modernSection(
          "Ausbildung",
          `<div class="modern-pdf-list">${education}</div>`,
        )
      : "";
    const hasCustomLayout = hasSavedTemplateSectionLayout(profile, "modern");
    const savedLayout = getProfileResumeSectionLayout(profile, "modern");
    const renderOrderedSection = (
      type: (typeof savedLayout)[number]["type"],
      variant: "visual" | "ats",
    ) => {
      if (type === "summary") {
        return sections.profile && !isContinuation
          ? modernSection(
              "Zusammenfassung",
              `<p class="modern-pdf-summary">${escapeHtml(managedSummary)}</p>`,
            )
          : "";
      }
      if (type === "experience") return experienceSection;
      if (type === "education") return educationSection;
      if (!isLastPage) return "";
      if (type === "knowledge") {
        return sections.skills
          ? modernSection(
              variant === "ats" ? "Kenntnisse" : "Fähigkeiten",
              variant === "ats" ? modernAtsKnowledge : modernVisualKnowledge,
            )
          : "";
      }
      if (type === "languages") {
        return sections.languages
          ? modernSection(
              "Sprachen",
              variant === "ats" ? modernAtsLanguages : modernVisualLanguages,
            )
          : "";
      }
      if (type === "strengths") {
        return sections.skills
          ? modernSection(
              "Stärken",
              variant === "ats" ? modernAtsStrengths : modernVisualStrengths,
            )
          : "";
      }
      if (type === "certifications") {
        return sections.certifications
          ? modernSection(
              variant === "ats" ? "Zertifikate" : "Erfolge",
              variant === "ats"
                ? modernAtsCertifications
                : modernVisualAchievements,
            )
          : "";
      }
      return "";
    };

    if (atsMode) {
      const orderedSections = hasCustomLayout
        ? savedLayout
            .map(({ type }) => renderOrderedSection(type, "ats"))
            .join("")
        : `${sections.profile && !isContinuation ? modernSection("Zusammenfassung", `<p class="modern-pdf-summary">${escapeHtml(managedSummary)}</p>`) : ""}${experienceSection}${educationSection}${isLastPage && sections.skills ? modernSection("Kenntnisse", modernAtsKnowledge) : ""}${isLastPage && sections.languages ? modernSection("Sprachen", modernAtsLanguages) : ""}${isLastPage && sections.skills ? modernSection("Stärken", modernAtsStrengths) : ""}${isLastPage && sections.certifications ? modernSection("Zertifikate", modernAtsCertifications) : ""}`;
      return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="modern" data-no-fit="true"><div class="page-content modern-pdf modern-pdf-ats" data-density="${plan.density}">${renderModernHeader(isContinuation, true)}${!isContinuation ? modernSection("Persönliche Daten", renderModernContacts(true)) : ""}${orderedSections}${modernFooter(plan)}</div></section>`;
    }

    const right = isContinuation
      ? ""
      : `<aside class="modern-pdf-right">${hasCustomLayout ? savedLayout.filter(({ zone }) => zone === "sidebar").map(({ type }) => renderOrderedSection(type, "visual")).join("") : `${sections.skills ? modernSection("Stärken", modernVisualStrengths) : ""}${sections.languages ? modernSection("Sprachen", modernVisualLanguages) : ""}${sections.skills ? modernSection("Fähigkeiten", modernVisualKnowledge) : ""}${sections.certifications ? modernSection("Erfolge", modernVisualAchievements) : ""}`}</aside>`;
    const visualSummary =
      sections.profile && !isContinuation
        ? modernSection(
            "Zusammenfassung",
            `<p class="modern-pdf-summary">${escapeHtml(managedSummary)}</p>`,
          )
        : "";
    const main = hasCustomLayout
      ? savedLayout
          .filter(({ zone }) => zone === "main" || zone === "full")
          .map(({ type }) => renderOrderedSection(type, "visual"))
          .join("")
      : `${visualSummary}${experienceSection}${educationSection}`;
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="modern" data-no-fit="true"><div class="page-content modern-pdf" data-density="${plan.density}"><div class="modern-pdf-content">${renderModernHeader(isContinuation)}<div class="modern-pdf-columns${isContinuation ? " continuation" : ""}"><main class="modern-pdf-left">${main}${!experiences && !education && plan.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}</main>${right}</div></div>${modernFooter(plan)}</div></section>`;
  };

  const tabellarischExtraIcon = (kind: "profile" | "flag" | "trophy") => {
    const paths = {
      profile:
        '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>',
      flag: '<path d="M5 22V4"/><path d="M5 5c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
      trophy:
        '<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
    } as const;
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind]}</svg>`;
  };
  const tabellarischContacts = [
    {
      label: "Telefon",
      icon: kreativIconMarkup("phone"),
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      label: "E-Mail",
      icon: kreativIconMarkup("mail"),
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      label: "Profil",
      icon: tabellarischExtraIcon("profile"),
      value:
        profile?.linkedin || profile?.portfolio || profile?.github || "",
      href: externalHref(
        profile?.linkedin || profile?.portfolio || profile?.github,
      ),
    },
    {
      label: "Wohnort",
      icon: kreativIconMarkup("location"),
      value: [profile?.city, profile?.country].filter(Boolean).join(", "),
      href: "",
    },
    {
      label: "Geboren",
      icon: kreativIconMarkup("birth"),
      value: [profile?.birthDate, profile?.birthPlace]
        .filter(Boolean)
        .join(" in "),
      href: "",
    },
  ].filter((contact) => contact.value.trim());
  const renderTabellarischContacts = (ats = false) =>
    `<address class="tabellarisch-pdf-contacts">${tabellarischContacts
      .map((contact) => {
        const value = contact.href
          ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value)}</a>`
          : `<span>${escapeHtml(contact.value)}</span>`;
        return `<span class="tabellarisch-pdf-contact">${ats ? `<strong>${escapeHtml(contact.label)}:</strong>` : contact.icon}${value}</span>`;
      })
      .join("")}</address>`;
  const tabellarischBackground = `<svg class="tabellarisch-pdf-background" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><defs><pattern id="tabellarisch-pdf-cubes" width="144" height="84" patternUnits="userSpaceOnUse"><path d="M72 0 144 42 72 84 0 42 72 0v84M0 42l72 42 72-42"/></pattern><linearGradient id="tabellarisch-pdf-fade" x1="0" x2="1"><stop offset="0" stop-color="white" stop-opacity="0"/><stop offset=".25" stop-color="white" stop-opacity=".45"/><stop offset=".48" stop-color="white" stop-opacity="1"/></linearGradient><mask id="tabellarisch-pdf-mask"><rect width="1000" height="260" fill="url(#tabellarisch-pdf-fade)"/></mask></defs><rect x="210" y="-44" width="850" height="310" fill="url(#tabellarisch-pdf-cubes)" mask="url(#tabellarisch-pdf-mask)"/></svg>`;
  const tabellarischSection = (
    title: string,
    content: string,
    extraClass = "",
    continuation = false,
  ) =>
    content
      ? `<section class="tabellarisch-pdf-section ${extraClass}"><h2 class="tabellarisch-pdf-title">${escapeHtml(title)}${continuation ? "<small>Fortsetzung</small>" : ""}</h2>${content}</section>`
      : "";
  const tabellarischStrengthItems = kreativStrengthItems.slice(0, 2);
  const tabellarischStrengths = (ats = false) => {
    if (!tabellarischStrengthItems.length) return "";
    if (ats) {
      return `<ul>${tabellarischStrengthItems
        .map(
          (item) =>
            `<li><strong>${escapeHtml(item.name)}</strong>${item.description?.trim() ? ` - ${escapeHtml(item.description)}` : ""}</li>`,
        )
        .join("")}</ul>`;
    }
    return `<div class="tabellarisch-pdf-strengths">${tabellarischStrengthItems
      .map(
        (item, index) =>
          `<article class="tabellarisch-pdf-strength">${tabellarischExtraIcon(index === 0 ? "flag" : "trophy")}<div><h3>${escapeHtml(item.name)}</h3>${item.description?.trim() ? `<p>${escapeHtml(item.description)}</p>` : ""}</div></article>`,
      )
      .join("")}</div>`;
  };
  const formatTabellarischDateRange = (from: string, to: string) => {
    const start = from.trim();
    const end = to.trim();
    if (!start) return end;
    if (!end) return start;
    return `${start} - ${end}`;
  };
  const renderTabellarischEntry = (
    id: string,
    kind: "experience" | "education",
    ats = false,
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  title: experience.role,
                  organization: experience.company,
                  from: experience.from,
                  to: experience.to,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  title: education.degree,
                  organization: education.institution,
                  from: education.from,
                  to: education.to,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    const achievements = item.achievements.length
      ? `<ul>${item.achievements
          .map((achievement) => `<li>${escapeHtml(achievement)}</li>`)
          .join("")}</ul>`
      : "";
    if (ats) {
      return `<article class="tabellarisch-pdf-entry"><div class="tabellarisch-pdf-entry-content"><h3>${escapeHtml(item.title)}</h3><p class="tabellarisch-pdf-organization">${escapeHtml(item.organization)}</p><p class="tabellarisch-pdf-ats-meta">${escapeHtml(formatTabellarischDateRange(item.from, item.to))}${item.city ? ` - ${escapeHtml(item.city)}` : ""}</p>${achievements}</div></article>`;
    }
    return `<article class="tabellarisch-pdf-entry"><div class="tabellarisch-pdf-meta"><p class="tabellarisch-pdf-date">${escapeHtml(formatTabellarischDateRange(item.from, item.to))}</p>${item.city ? `<p class="tabellarisch-pdf-location">${escapeHtml(item.city)}</p>` : ""}</div><span class="tabellarisch-pdf-rail" aria-hidden="true"></span><div class="tabellarisch-pdf-entry-content"><h3>${escapeHtml(item.title)}</h3><p class="tabellarisch-pdf-organization">${escapeHtml(item.organization)}</p>${achievements}</div></article>`;
  };
  const tabellarischFooter = (plan: ResumePagePlan) =>
    `<footer class="tabellarisch-pdf-footer">${managedPortfolio ? `<a href="${escapeHtml(externalHref(managedPortfolio))}">${escapeHtml(managedPortfolio)}</a>` : "<span></span>"}<span>Seite ${plan.pageNumber} / ${resumePlan.length}</span></footer>`;
  const renderTabellarischResumePage = (plan: ResumePagePlan) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderTabellarischEntry(item.id, "experience", atsMode))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderTabellarischEntry(item.id, "education", atsMode))
      .join("");
    const photo =
      !atsMode && !isContinuation && photoSource
        ? `<img class="tabellarisch-pdf-photo" src="${escapeHtml(photoSource)}" alt="">`
        : "";
    const header = isContinuation
      ? `<header class="tabellarisch-pdf-continuation"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(profile?.title || role)}</span></header>`
      : `<header class="tabellarisch-pdf-header${photo ? "" : " no-photo"}"><div class="tabellarisch-pdf-identity"><h1>${escapeHtml(name)}</h1>${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}${renderTabellarischContacts(atsMode)}</div>${photo}</header>`;
    const summary =
      sections.profile && !isContinuation
        ? tabellarischSection(
            "Zusammenfassung",
            `<p class="tabellarisch-pdf-summary">${escapeHtml(managedSummary)}</p>`,
          )
        : "";
    const strengths =
      sections.skills && !isContinuation
        ? tabellarischSection("Stärken", tabellarischStrengths(atsMode))
        : "";
    const experience =
      sections.experience && experienceItems
        ? tabellarischSection(
            "Erfahrung",
            `<div class="tabellarisch-pdf-timeline${!isLastPage ? " continues" : ""}">${experienceItems}</div>`,
            "",
            isContinuation,
          )
        : "";
    const education =
      sections.education && educationItems
        ? tabellarischSection(
            "Ausbildung",
            `<div class="tabellarisch-pdf-timeline">${educationItems}</div>`,
          )
        : "";
    const additional = isLastPage && atsMode
      ? `<div class="tabellarisch-pdf-additional">${atsMode && sections.skills ? tabellarischSection("Kenntnisse", managedKnowledge, "tabellarisch-pdf-list") : ""}${sections.certifications ? tabellarischSection("Zertifikate", managedCertifications, "tabellarisch-pdf-list") : ""}${sections.languages ? tabellarischSection("Sprachen", `<ul class="inline">${kreativLanguages.map((language) => `<li>${escapeHtml(language.raw)}</li>`).join("")}</ul>`, "tabellarisch-pdf-list") : ""}</div>`
      : "";
    if (atsMode) {
      return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="tabellarisch" data-no-fit="true"><div class="page-content tabellarisch-pdf tabellarisch-pdf-ats" data-density="${plan.density}">${header}${summary}${strengths}${experience}${education}${additional}</div></section>`;
    }
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="tabellarisch" data-no-fit="true"><div class="page-content tabellarisch-pdf" data-density="${plan.density}">${!isContinuation ? tabellarischBackground : ""}<div class="tabellarisch-pdf-content">${header}${summary}${strengths}${experience}${education}${additional}</div>${tabellarischFooter(plan)}</div></section>`;
  };

  const gepflegtIconMarkup = (
    kind: "phone" | "mail" | "link" | "location" | "strength",
  ) => {
    const paths = {
      phone:
        '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z"/>',
      mail: '<circle cx="12" cy="12" r="9"/><path d="M16 8v5a2 2 0 0 0 4 0v-1a8 8 0 1 0-3.3 6.5"/><circle cx="12" cy="12" r="3"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>',
      location:
        '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      strength:
        '<path d="M9 18h6M10 22h4M8.5 14.5A6 6 0 1 1 15.5 14.5c-1 .7-1.5 1.5-1.5 2.5h-4c0-1-.5-1.8-1.5-2.5Z"/>',
    } as const;
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[kind]}</svg>`;
  };
  const gepflegtLocation = [profile?.city, profile?.country]
    .filter(Boolean)
    .join(", ");
  const gepflegtProfessionalLink =
    profile?.linkedin || profile?.github || profile?.portfolio || "";
  const gepflegtContacts = [
    {
      icon: gepflegtIconMarkup("phone"),
      value: profile?.phone || "",
      href: profile?.phone
        ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: gepflegtIconMarkup("mail"),
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      icon: gepflegtIconMarkup("link"),
      value: externalHref(gepflegtProfessionalLink),
      href: externalHref(gepflegtProfessionalLink),
    },
    {
      icon: gepflegtIconMarkup("location"),
      value: gepflegtLocation,
      href: "",
    },
  ].filter((contact) => contact.value.trim());
  const gepflegtContactMarkup = (ats = false) =>
    gepflegtContacts.length
      ? `<address class="gepflegt-pdf-contacts">${gepflegtContacts
          .map((contact) => {
            const value = `<span>${escapeHtml(contact.value)}</span>`;
            const content = `${ats ? "" : contact.icon}${value}`;
            return contact.href
              ? `<a class="gepflegt-pdf-contact" href="${escapeHtml(contact.href)}">${content}</a>`
              : `<span class="gepflegt-pdf-contact">${content}</span>`;
          })
          .join("")}</address>`
      : "";
  const gepflegtSummary =
    docs.resumeProfile || profile?.summary ||
    "Kurzprofil im Dokumenteditor ergänzen.";
  const gepflegtStrengths = uniqueValues(profile?.skills ?? [])
    .slice(0, 3)
    .map((raw) => {
      const [title, ...description] = raw.split(
        /\s+(?:\u2013|\u2014|:)\s+/,
      );
      return {
        title: title.trim(),
        description: description.join(" - ").trim(),
      };
    });
  const gepflegtKnowledge = profile
    ? uniqueValues(
        ensureKnowledgeSection(profile.knowledgeSection, profile.skills)
          .categories.filter((category) => category.isVisible)
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
      )
    : [];
  const gepflegtLanguageScore = (level: string) => {
    const normalized = level.toLocaleLowerCase("de-DE");
    if (/muttersprache|native|c2/.test(normalized)) return 5;
    if (/verhandlung|fließ|fliess|c1/.test(normalized)) return 4;
    if (/b2|fortgeschritten|versiert/.test(normalized)) return 3;
    if (/b1|a2|grundkennt/.test(normalized)) return 2;
    if (/a1|anfänger|anfaenger/.test(normalized)) return 1;
    return 3;
  };
  const gepflegtLanguages = uniqueValues(profile?.languages ?? []).map(
    (raw) => {
      const [languageName, ...levelParts] = raw.split(
        /\s+(?:\u2013|\u2014|-)\s+/,
      );
      const level = levelParts.join(" - ").trim();
      return {
        raw,
        name: languageName.trim() || raw,
        level,
        score: gepflegtLanguageScore(level),
      };
    },
  );
  const gepflegtCertifications = uniqueValues(
    profile?.certifications ?? [],
  );
  const gepflegtStrengthMarkup = (ats = false) => {
    if (!sections.skills || !gepflegtStrengths.length) return "";
    if (ats) {
      return `<section><h3>Stärken</h3><ul>${gepflegtStrengths
        .map(
          (strength) =>
            `<li><strong>${escapeHtml(strength.title)}</strong>${strength.description ? ` - ${escapeHtml(strength.description)}` : ""}</li>`,
        )
        .join("")}</ul></section>`;
    }
    return `<section><h3>Stärken</h3><div class="gepflegt-pdf-strengths">${gepflegtStrengths
      .map(
        (strength) =>
          `<article class="gepflegt-pdf-strength">${gepflegtIconMarkup("strength")}<div><h4>${escapeHtml(strength.title)}</h4>${strength.description ? `<p>${escapeHtml(strength.description)}</p>` : ""}</div></article>`,
      )
      .join("")}</div></section>`;
  };
  const gepflegtLanguageMarkup = (ats = false) => {
    if (!sections.languages || !gepflegtLanguages.length) return "";
    if (ats) {
      return `<section><h3>Sprachen</h3><ul>${gepflegtLanguages
        .map((language) => `<li>${escapeHtml(language.raw)}</li>`)
        .join("")}</ul></section>`;
    }
    return `<section><h3>Sprachen</h3><div class="gepflegt-pdf-languages">${gepflegtLanguages
      .map(
        (language) =>
          `<div class="gepflegt-pdf-language"><div><strong>${escapeHtml(language.name)}</strong><em>${escapeHtml(language.level)}</em></div><span class="gepflegt-pdf-dots">${Array.from(
            { length: 5 },
            (_, index) =>
              `<i class="${index < language.score ? "filled" : ""}"></i>`,
          ).join("")}</span></div>`,
      )
      .join("")}</div></section>`;
  };
  const gepflegtKnowledgeMarkup = (ats = false) =>
    sections.skills && gepflegtKnowledge.length
      ? `<section><h3>Fähigkeiten</h3><p class="${ats ? "" : "gepflegt-pdf-knowledge"}">${gepflegtKnowledge.map(escapeHtml).join(" · ")}</p></section>`
      : "";
  const gepflegtCertificationMarkup = (ats = false) =>
    sections.certifications && gepflegtCertifications.length
      ? `<section><h3>Zertifikate</h3><ul class="${ats ? "" : "gepflegt-pdf-certifications"}">${gepflegtCertifications
          .map((certification) => `<li>${escapeHtml(certification)}</li>`)
          .join("")}</ul></section>`
      : "";
  const renderGepflegtHeader = (compact = false, ats = false) => `
    <header class="gepflegt-pdf-header${compact ? " compact" : ""}">
      ${compact ? '<p class="kicker">Lebenslauf · Fortsetzung</p>' : ""}
      <h1>${escapeHtml(name)}</h1>
      ${profile?.title || role ? `<h2>${escapeHtml(profile?.title || role)}</h2>` : ""}
      ${compact ? "" : gepflegtContactMarkup(ats)}
    </header>`;
  const formatGepflegtDateRange = (from: string, to: string) => {
    const start = from.trim();
    const end = to.trim();
    if (!start) return end;
    if (!end) return start;
    return `${start} - ${end}`;
  };
  const renderGepflegtEntry = (
    id: string,
    kind: "experience" | "education",
  ) => {
    const item =
      kind === "experience"
        ? (() => {
            const experience = experienceById.get(id);
            return experience
              ? {
                  title: experience.role,
                  organization: experience.company,
                  from: experience.from,
                  to: experience.to,
                  city: experience.city,
                  achievements: experience.achievements.filter(Boolean),
                }
              : undefined;
          })()
        : (() => {
            const education = educationById.get(id);
            return education
              ? {
                  title: education.degree,
                  organization: education.institution,
                  from: education.from,
                  to: education.to,
                  city: education.city,
                  achievements: [] as string[],
                }
              : undefined;
          })();
    if (!item) return "";
    return `<article class="gepflegt-pdf-entry"><div class="gepflegt-pdf-entry-heading"><h4>${escapeHtml(item.title)}</h4><span>${escapeHtml(formatGepflegtDateRange(item.from, item.to))}</span></div><div class="gepflegt-pdf-entry-subheading"><strong>${escapeHtml(item.organization)}</strong>${item.city ? `<span>${escapeHtml(item.city)}</span>` : ""}</div>${item.achievements.length ? `<ul>${item.achievements.map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join("")}</ul>` : ""}</article>`;
  };
  const gepflegtPortfolio =
    profile?.portfolio || profile?.github || profile?.linkedin || "";
  const renderGepflegtResumePage = (plan: ResumePagePlan) => {
    const isContinuation = plan.pageNumber > 1;
    const isLastPage = plan.pageNumber === resumePlan.length;
    const experienceItems = plan.items
      .filter((item) => item.kind === "experience")
      .map((item) => renderGepflegtEntry(item.id, "experience"))
      .join("");
    const educationItems = plan.items
      .filter((item) => item.kind === "education")
      .map((item) => renderGepflegtEntry(item.id, "education"))
      .join("");
    const experienceSection =
      sections.experience && experienceItems
        ? `<section class="gepflegt-pdf-section"><h3 class="gepflegt-pdf-title">${atsMode ? "Berufserfahrung" : "Erfahrung"}${isContinuation ? " · Fortsetzung" : ""}</h3><div class="gepflegt-pdf-list">${experienceItems}</div></section>`
        : "";
    const educationSection =
      sections.education && educationItems
        ? `<section class="gepflegt-pdf-section"><h3 class="gepflegt-pdf-title">Ausbildung</h3><div class="gepflegt-pdf-list">${educationItems}</div></section>`
        : "";
    const main = `<main class="gepflegt-pdf-main">${experienceSection}${educationSection}${!experienceItems && !educationItems && plan.pageNumber === 1 ? "<p class='muted'>Berufserfahrung und Ausbildung im Profil ergänzen.</p>" : ""}</main>`;

    if (atsMode) {
      const summary =
        sections.profile && !isContinuation
          ? `<section class="gepflegt-pdf-section gepflegt-pdf-ats-summary"><h3 class="gepflegt-pdf-title">Zusammenfassung</h3><p>${escapeHtml(gepflegtSummary)}</p></section>`
          : "";
      const extra = isLastPage
        ? `<div class="gepflegt-pdf-ats-extra">${gepflegtStrengthMarkup(true)}${gepflegtLanguageMarkup(true)}${gepflegtKnowledgeMarkup(true)}${gepflegtCertificationMarkup(true)}</div>`
        : "";
      return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="gepflegt" data-no-fit="true"><div class="page-content gepflegt-pdf gepflegt-pdf-ats" data-density="${plan.density}">${renderGepflegtHeader(isContinuation, true)}${summary}${main}${extra}</div></section>`;
    }

    const sidebar = isContinuation
      ? `<aside class="gepflegt-pdf-sidebar gepflegt-pdf-sidebar-continuation"><div><p>Lebenslauf</p><h2>${escapeHtml(name)}</h2>${profile?.title ? `<span>${escapeHtml(profile.title)}</span>` : ""}<i aria-hidden="true"></i><small>Fortsetzung · Seite ${plan.pageNumber} von ${resumePlan.length}</small>${profile?.email || profile?.phone ? `<span>${escapeHtml(profile.email || profile.phone)}</span>` : ""}</div></aside>`
      : `<aside class="gepflegt-pdf-sidebar">${photoSource ? `<img class="gepflegt-pdf-photo" src="${escapeHtml(photoSource)}" alt="">` : ""}${sections.profile ? `<section><h3>Zusammenfassung</h3><p class="gepflegt-pdf-summary">${escapeHtml(gepflegtSummary)}</p></section>` : ""}${gepflegtStrengthMarkup()}${gepflegtLanguageMarkup()}${gepflegtKnowledgeMarkup()}${gepflegtCertificationMarkup()}</aside>`;
    const footer =
      gepflegtPortfolio || resumePlan.length > 1
        ? `<footer class="gepflegt-pdf-footer">${resumePlan.length > 1 ? `<span>Seite ${plan.pageNumber} von ${resumePlan.length}</span>` : ""}${gepflegtPortfolio ? `<a href="${escapeHtml(externalHref(gepflegtPortfolio))}">${escapeHtml(gepflegtPortfolio)}</a>` : ""}</footer>`
        : "";
    return `<section class="page cv-sheet ${designClasses}" data-resume-page="${plan.pageNumber}" data-template="gepflegt" data-no-fit="true"><div class="page-content gepflegt-pdf" data-density="${plan.density}">${sidebar}<div class="gepflegt-pdf-content">${renderGepflegtHeader(isContinuation)}${main}${footer}</div></div></section>`;
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
      template.id === "modern"
        ? renderModernResumePage
        : template.id === "stilvoll"
          ? renderStilvollResumePage
          : template.id === "kompakt"
            ? renderKompaktResumePage
            : template.id === "einspaltig"
              ? renderEinspaltigResumePage
              : template.id === "klassisch"
                ? renderKlassischResumePage
                : template.id === "mehrspaltig"
                  ? renderMehrspaltigResumePage
              : template.id === "elegant"
                ? renderElegantResumePage
                : template.id === "gepflegt"
                  ? renderGepflegtResumePage
                  : template.id === "ivy-league"
                    ? renderIvyLeagueResumePage
                    : template.id === "kreativ"
                      ? renderKreativResumePage
                      : template.id === "zeitgenoessisch"
                        ? renderZeitgenoessischResumePage
                        : template.id === "zweispaltig"
                          ? renderZweispaltigResumePage
                          : template.id === "tabellarisch"
                            ? renderTabellarischResumePage
                            : renderResumePage,
    )
    .join("");
  const selected = target === "mappe" ? [cover, letter, resume] : target === "deckblatt" ? [cover] : target === "anschreiben" ? [letter] : [resume];
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${escapeHtml(company)} – ${escapeHtml(role)}</title><style>${documentCss(accent, secondary, onSecondary, designSettings)}${elegantDocumentCss}${zweispaltigDocumentCss}${zeitgenoessischDocumentCss}${kreativDocumentCss}${ivyLeagueDocumentCss}${extendedResumeDocumentCss}${klassischDocumentCss}${mehrspaltigDocumentCss}${modernDocumentCss}${gepflegtDocumentCss}${tabellarischDocumentCss}</style></head><body>${selected.join("")}${pageFitScript}</body></html>`;
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

${docs.coverExtraParagraph}

${docs.coverClosing}

Mit freundlichen Grüßen

${fullName(profile)}
`;
};
