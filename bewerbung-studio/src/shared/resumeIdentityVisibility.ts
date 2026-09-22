import { getResumeSemanticSection, type ResumeSectionInstance } from "../features/resume-sections/resume-section-system";

// Scope visibility to CV pages so cover letters and cover sheets stay independent.
export const getResumeIdentityVisibilityCss = (sections: readonly ResumeSectionInstance[] | undefined) => {
  const hidden = (type: "heading" | "personalData") => {
    const section = getResumeSemanticSection(sections, type);
    return !section.visible || !section.enabled;
  };
  const scope = ":is(.document-lebenslauf, .cv-sheet)";
  const rules: string[] = [];
  if (hidden("heading")) {
    rules.push(`${scope} header:not([class*="section-heading"]) :is(h1,h2,[class*="__name"],[class*="__title"],[class*="__profession"],[class*="__kicker"],.kicker),${scope} .tabellarisch-pdf-continuation{display:none!important}`);
  }
  if (hidden("personalData")) {
    rules.push(`${scope} :is(address,[data-element-id$=".contacts"],[data-resume-personal],.resume-personal-data,.pehlione-contacts,.pehlione-ats-contact,.pehlione-pdf-ats-contact,.zeitgenoessisch-contacts),${scope} section:has(>address),${scope} section:has(>.modern-contact-list){display:none!important}`);
  }
  return rules.join("\n");
};
