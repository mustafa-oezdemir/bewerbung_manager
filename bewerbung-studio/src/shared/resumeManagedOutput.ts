import { parseHTML } from "linkedom";
import type { ApplicantProfile } from "./schema";
import {
  getManagerSections,
  type ManagerSection,
} from "../features/resume-sections/resume-manager";
import { resolveKnowledgeGroups } from "../features/resume-sections/resume-section-system";
import { getProfileMediaSource } from "./profileMedia";
import { getTechnologyBrandIconMarkup } from "./technologyBrand";

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const aliases: Record<string, string[]> = {
  summary: ["Zusammenfassung", "Kurzprofil", "Profil"],
  strengths: ["Stärken", "Kernkompetenzen"],
  experience: ["Berufserfahrung", "Erfahrung", "Beruflicher Werdegang"],
  education: ["Ausbildung", "Bildungsweg"],
  knowledge: [
    "Kenntnisse",
    "Fähigkeiten",
    "Technische Schwerpunkte",
    "Besondere Kenntnisse",
  ],
  certifications: [
    "Zertifikate",
    "Weiterbildungen",
    "Weiterbildungen (Auswahl)",
    "Erfolge",
  ],
  languages: ["Sprachen"],
  projects: ["Projekt-Highlight"],
};
const normalize = (value: string) =>
  value
    .replace(/\s*·\s*Fortsetzung/i, "")
    .trim()
    .toLocaleLowerCase("de-DE");

export const managedResumeCss = `
.managed-extra{margin:0 0 4mm;break-inside:avoid;color:inherit;font:inherit}
.managed-extra h3{margin:0 0 2mm;font-size:1.08em;color:inherit}
.managed-extra ul{padding-left:4mm;margin:0}.managed-extra li{margin-bottom:1mm}
.managed-extra small{display:block;font-size:.92em}.managed-extra p{margin:1mm 0}
.managed-extra .managed-tags{display:flex;flex-wrap:wrap;gap:1.5mm}
.managed-extra .managed-tags span{border:1px solid currentColor;border-radius:2mm;padding:.7mm 1.5mm}
.managed-extra .managed-columns{display:grid;grid-template-columns:1fr 1fr;gap:2mm}
[data-managed-section]{break-inside:avoid}
[data-managed-moved], [data-managed-moved] :is(h2,h3,p,li,small){color:inherit!important}
[data-managed-section="strengths"] .managed-strengths-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3mm;list-style:none;margin:0;padding:0}
[data-managed-section="strengths"] .managed-strength-card{display:flex;flex-direction:column;align-items:flex-start;gap:1mm;min-width:0;margin:0;padding:0;border:0;break-inside:avoid;overflow-wrap:anywhere}
[data-managed-section="strengths"] .managed-strength-card>svg{width:6mm;height:6mm;flex:none}
[data-managed-section="strengths"] .managed-strength-card strong{font-size:1em;line-height:1.3}
[data-managed-section="strengths"] .managed-strength-card p{margin:0;white-space:pre-line;font-size:.92em;line-height:1.4;color:inherit}
`;

// Both the React preview and the PDF use this pure HTML projection. It only
// rearranges section nodes, retaining each template's header, artwork and CSS.
export const applyManagedResumeOutput = (
  html: string,
  profile: ApplicantProfile | undefined,
  templateId: string,
  pageNumber = 1,
  totalPages = 1,
) => {
  if (!profile) return html;
  const { document } = parseHTML(`<html><body>${html}</body></html>`);
  const entries = getManagerSections(profile, templateId);
  const groups = resolveKnowledgeGroups(
    templateId,
    profile.resumeKnowledgeGroups,
  );
  const pages = Array.from(document.querySelectorAll(".cv-sheet"));
  const roots = pages.length ? pages : [document.body];
  roots.forEach((root, rootIndex) => {
    const enabled = (id: string) =>
      entries.find((entry) => entry.id === id)?.visible !== false;
    if (!enabled("photo")) {
      const source = getProfileMediaSource(profile.photoPath);
      root.querySelectorAll("img").forEach((img) => {
        if (
          img.getAttribute("src") === source ||
          /photo|foto/i.test(img.className)
        ) {
          const frame = img.closest(
            '[class*="__photo"],[class*="-header__photo"],[class*="-header-photo"]',
          );
          (frame ?? img).remove();
        }
      });
    }
    if (!enabled("closing"))
      root
        .querySelectorAll('footer,[class*="-closing"]')
        .forEach((node) => node.remove());
    if (!enabled("personalData"))
      root
        .querySelectorAll(
          'address,[data-element-id$=".contacts"],[data-resume-personal],.resume-personal-data,.pehlione-contacts,.pehlione-ats-contact,.pehlione-pdf-ats-contact,.zeitgenoessisch-contacts,section:has(>.modern-contact-list)',
        )
        .forEach((node) => node.remove());
    const number = pages.length > 1 ? rootIndex + 1 : pageNumber;
    const last =
      pages.length > 1 ? rootIndex === pages.length - 1 : number === totalPages;
    const nodes = new Map<string, Element[]>();
    const sectionNodes = Array.from(
      root.querySelectorAll("section:not(.page)"),
    );
    for (const node of sectionNodes) {
      const heading = node.querySelector("h2,h3");
      if (
        !heading ||
        heading.closest("section") !== node ||
        (heading.closest("article") &&
          node.contains(heading.closest("article")))
      )
        continue;
      const title = normalize(heading.textContent ?? "");
      const elementId = node.getAttribute("data-element-id") ?? "";
      const entry =
        entries.find(
          (entry) =>
            entry.id.startsWith("special:") &&
            elementId === `special.${entry.id.slice(8)}`,
        ) ??
        entries.find(
          (entry) => !entry.fixed && normalize(entry.title) === title,
        ) ??
        entries.find((entry) =>
          (aliases[entry.id] ?? []).some((alias) => normalize(alias) === title),
        ) ??
        entries.find(
          (entry) => !entry.fixed && elementId.endsWith(`.${entry.id}`),
        );
      if (entry) {
        node.setAttribute("data-managed-section", entry.id);
        nodes.set(entry.id, [...(nodes.get(entry.id) ?? []), node]);
      }
    }
    const isAts = Boolean(
      root.querySelector('[data-renderer="ats"], [class*="-ats"]'),
    );
    const main =
      root.querySelector(
        ".pehlione-main,.pehlione-pdf-main,.elegant-main,.elegant-pdf-main,.modern-resume-left-column,.modern-pdf-left,.zweispaltig-main,.zweispaltig-pdf-main,.zeitgenoessisch-main,.zeit-pdf-main,.kreativ-main,.kreativ-pdf-main,.gepflegt-main,.gepflegt-pdf-main,.kompakt-left,.kompakt-pdf-columns>main,main",
      ) ??
      nodes.get("experience")?.[0]?.parentElement ??
      root.querySelector(".page-content") ??
      root;
    const sidebar = isAts
      ? main
      : (root.querySelector(
          "aside,.modern-resume-right-column,.modern-pdf-right,.elegant-sidebar,.elegant-pdf-sidebar,.zeitgenoessisch-sidebar,.zeit-pdf-sidebar,.kreativ-sidebar,.kreativ-pdf-sidebar,.zweispaltig-sidebar,.zweispaltig-pdf-sidebar,.gepflegt-sidebar,.gepflegt-pdf-sidebar,.kompakt-right",
        ) ?? main);
    const container = (entry: ManagerSection) =>
      entry.zone === "sidebar" ? sidebar : main;
    for (const entry of entries.filter((item) => !item.fixed)) {
      const existing = nodes.get(entry.id) ?? [];
      const group = groups.find((group) => group.id === entry.groupId);
      const items =
        group?.items
          .filter((item) => item.visible && item.text.trim())
          .sort((a, b) => a.order - b.order) ?? [];
      if (!entry.visible) {
        existing.forEach((node) => node.remove());
        nodes.delete(entry.id);
        continue;
      }
      // Template-independent blocks appear once; native career entries remain
      // on their planned pages and are never copied across page boundaries.
      let content = "";
      if (entry.id === "strengths") {
        if (number !== 1) {
          existing.forEach((node) => node.remove());
          nodes.delete(entry.id);
          continue;
        }
        // Read canonical records here: individual templates historically truncated
        // this list or omitted entries without descriptions.
        const explicit = profile.strengths.filter((item) => item.title.trim());
        if (!explicit.length && !items.length && !existing.length) continue;
        const strengths = items.length
          ? items.map((item) => ({
              title: item.text,
              description: item.description ?? "",
              iconId: "",
            }))
          : explicit.length
            ? explicit
            : [
                ...new Set(
                  profile.skills.map((value) => value.trim()).filter(Boolean),
                ),
              ].map((value) => {
                const [title, ...description] = value.split(/\s+(?:–|—|:)\s+/);
                return {
                  title,
                  description: description.join(" – "),
                  iconId: "",
                };
              });
        if (strengths.length) {
          const node = existing[0] ?? document.createElement("section");
          const heading =
            node.querySelector("h2,h3")?.outerHTML ??
            `<h3>${escape(entry.title)}</h3>`;
          node.setAttribute("data-managed-section", "strengths");
          if (!existing.length) node.className = "managed-extra";
          node.innerHTML = `${heading}<div class="managed-strengths-grid">${strengths.map((item) => `<article class="managed-strength-card">${isAts ? "" : getTechnologyBrandIconMarkup(item.title, item.iconId)}<strong>${escape(item.title)}</strong>${item.description ? `<p>${escape(item.description)}</p>` : ""}</article>`).join("")}</div>`;
          node.querySelector("h2,h3")!.textContent = entry.title;
          existing.slice(1).forEach((duplicate) => duplicate.remove());
          if (!existing.length) container(entry).appendChild(node);
          nodes.set(entry.id, [node]);
        }
        continue;
      }
      if (items.length && last) {
        const itemHtml = items.map(
          (item) =>
            `${group?.rendererType === "icon-list" && item.icon ? `<span aria-hidden="true">${escape(item.icon)}</span> ` : ""}${escape(item.text)}${item.level ? ` <small>${escape(item.level)}</small>` : ""}${item.description ? `<small>${escape(item.description)}</small>` : ""}`,
        );
        content =
          group?.rendererType === "tag-list"
            ? `<div class="managed-tags">${itemHtml.map((item) => `<span>${item}</span>`).join("")}</div>`
            : ["two-column-list", "compact-grid"].includes(
                  group?.rendererType ?? "",
                )
              ? `<div class="managed-columns">${itemHtml.map((item) => `<div>${item}</div>`).join("")}</div>`
              : group?.rendererType === "text-list"
                ? itemHtml.map((item) => `<p>${item}</p>`).join("")
                : `<ul>${itemHtml.map((item) => `<li>${item}</li>`).join("")}</ul>`;
      } else if (entry.id.startsWith("special:") && last && !existing.length) {
        const special = profile.specialSections.find(
          (item) => item.id === entry.id.slice(8),
        );
        content =
          special?.entries
            .map(
              (item) =>
                `<article><strong>${escape(item.title)}</strong><p>${[item.subtitle, item.location, item.date || [item.from, item.to].filter(Boolean).join(" – ")].filter(Boolean).map(escape).join(" · ")}</p><p>${escape(item.description)}</p>${item.bullets.length ? `<ul>${item.bullets.map((bullet) => `<li>${escape(bullet)}</li>`).join("")}</ul>` : ""}${item.url ? `<p>${escape(item.url)}</p>` : ""}</article>`,
            )
            .join("") ?? "";
      }
      if (content) {
        existing.forEach((node) => node.remove());
        const node = document.createElement("section");
        node.className = "managed-extra";
        node.setAttribute("data-managed-section", entry.id);
        node.innerHTML = `<h3>${escape(entry.title)}</h3>${content}`;
        if (group?.pageBreakBefore) node.style.breakBefore = "page";
        container(entry).appendChild(node);
        nodes.set(entry.id, [node]);
      } else if (items.length && !last) {
        existing.forEach((node) => node.remove());
        nodes.delete(entry.id);
      } else {
        for (const node of existing) {
          const heading = node.querySelector("h2,h3");
          if (heading) {
            const continuation = /·\s*Fortsetzung/i.test(
              heading.textContent ?? "",
            )
              ? " · Fortsetzung"
              : "";
            heading.textContent = entry.title + continuation;
          }
        }
      }
    }
    // An anchor preserves the template's header/contact/photo and footer order.
    for (const destination of profile.resumeManagerLayouts?.[templateId]?.length
      ? new Set([main, sidebar])
      : []) {
      const moving = entries
        .filter(
          (entry) =>
            !entry.fixed && entry.visible && container(entry) === destination,
        )
        .flatMap((entry) => nodes.get(entry.id) ?? []);
      if (!moving.length) continue;
      const anchor = document.createComment("managed-sections");
      const first = Array.from(destination.children).find(
        (child) =>
          moving.includes(child) || child.matches("footer,[class*='closing']"),
      );
      destination.insertBefore(anchor, first ?? null);
      for (const node of moving) {
        if (node.parentElement !== destination) {
          node.setAttribute("data-managed-moved", "true");
        }
        destination.insertBefore(node, anchor);
      }
      anchor.remove();
    }
  });
  return document.body.innerHTML;
};
