import type { ApplicantProfile } from "./schema";
import {
  externalUrl,
  formatPhoneForDisplay,
  formatUrlForDisplay,
} from "./contactPresentation";
import { defaultResumePersonalFieldVisibility } from "../features/resume-sections/resume-section-system";

const iconPaths = {
  person: '<circle cx="12" cy="7" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  location:
    '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>',
  email:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  linkedin:
    '<rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="4" r="2"/><path d="M11 21V9h4v2c3-4 7-1 7 3v7h-4v-7c0-2-3-2-3 0v7Z"/>',
  github:
    '<path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.9c0-1.1-.4-1.9-.8-2.3 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3.8S17.2 1.9 14.4 3.7a13.4 13.4 0 0 0-6.8 0C4.8 1.9 3.7 2.2 3.7 2.2A4.3 4.3 0 0 0 3.6 6a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6-.4.4-.8 1.1-.8 2.3V22"/>',
  website:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
};

const icon = (kind: keyof typeof iconPaths) =>
  `<svg data-contact-icon="${kind}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[kind]}</svg>`;
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

export const getPehlioneContacts = (profile?: ApplicantProfile) => {
  const visible = {
    ...defaultResumePersonalFieldVisibility,
    ...profile?.resumePersonalFieldVisibility,
  };
  return [
    {
      key: "location" as const,
      label: "Ort",
      visible: visible.address,
      value: [profile?.city, profile?.country].filter(Boolean).join(", "),
      href: "",
    },
    {
      key: "phone" as const,
      label: "Telefon",
      visible: visible.phone,
      value: formatPhoneForDisplay(profile?.phone),
      href: profile?.phone ? `tel:${profile.phone.replace(/[^\d+]/g, "")}` : "",
    },
    {
      key: "email" as const,
      label: "E-Mail",
      visible: visible.email,
      value: profile?.email || "",
      href: profile?.email ? `mailto:${profile.email}` : "",
    },
    {
      key: "linkedin" as const,
      label: "LinkedIn",
      visible: visible.linkedin,
      value: formatUrlForDisplay(profile?.linkedin || ""),
      href: externalUrl(profile?.linkedin || ""),
    },
    {
      key: "github" as const,
      label: "GitHub",
      visible: visible.github,
      value: formatUrlForDisplay(profile?.github || ""),
      href: externalUrl(profile?.github || ""),
    },
    {
      key: "website" as const,
      label: "Website",
      visible: visible.website,
      value: formatUrlForDisplay(profile?.portfolio || ""),
      href: externalUrl(profile?.portfolio || ""),
    },
  ].filter((item) => item.visible && item.value);
};

export const renderPehlioneContacts = (profile?: ApplicantProfile) => {
  const contacts = getPehlioneContacts(profile);
  if (!contacts.length) return "";
  return `<section class="pehlione-contacts"><h3>${icon("person")}<span>Kontakt</span></h3><ul>${contacts.map((item) => `<li data-contact-kind="${item.key}">${icon(item.key)}<div><strong>${item.label}</strong>${item.href ? `<a href="${escape(item.href)}">${escape(item.value)}</a>` : `<span>${escape(item.value)}</span>`}</div></li>`).join("")}</ul></section>`;
};

// One set of rules keeps the contact block identical in preview and PDF.
export const pehlioneContactsCss = `
.pehlione-contacts.pehlione-contacts{--contact-heading:#fff;--contact-text:#fff;margin:0 0 4.5mm;color:var(--contact-text);font-family:var(--doc-font,var(--body-font,"Source Sans 3",Arial,sans-serif));font-size:7.8pt;line-height:1.2;break-inside:avoid}
.pehlione-resume--white .pehlione-contacts,.pehlione-pdf-white .pehlione-contacts{--contact-heading:var(--pehlione-primary,#08245c);--contact-text:#142235}
.pehlione-contacts.pehlione-contacts h3{display:grid;grid-template-columns:8mm minmax(0,1fr);gap:2mm;align-items:center;margin:0 0 2mm;padding:0 0 1.5mm;border-bottom:.3mm solid var(--contact-heading);color:var(--contact-heading);font-family:inherit;font-size:9.7pt;font-weight:700;line-height:1.1;text-transform:uppercase}
.pehlione-contacts.pehlione-contacts svg{display:block;width:4.2mm;height:4.2mm;fill:none;stroke:var(--contact-heading);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.pehlione-contacts.pehlione-contacts h3 svg{width:8mm;height:8mm}
.pehlione-contacts.pehlione-contacts ul{display:grid;gap:1.35mm;margin:0;padding:0;list-style:none;font-size:7.8pt;line-height:1.2}
.pehlione-contacts.pehlione-contacts li{display:grid;grid-template-columns:5mm minmax(0,1fr);gap:1.5mm;align-items:start;margin:0;padding:0;break-inside:avoid}
.pehlione-contacts.pehlione-contacts li>div{display:grid;gap:.25mm;min-width:0}
.pehlione-contacts.pehlione-contacts strong{display:block;color:var(--contact-heading);font-size:7.8pt;font-weight:700;line-height:1.2}
.pehlione-contacts.pehlione-contacts a,.pehlione-contacts.pehlione-contacts li span{color:var(--contact-text);font-size:7.4pt;line-height:1.2;text-decoration:none;overflow-wrap:anywhere}
`;
