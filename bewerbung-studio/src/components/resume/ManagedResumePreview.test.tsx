import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { parseHTML } from "linkedom";
import { profileSchema } from "../../shared/schema";
import { createResumePagePlan } from "../../shared/documentPagination";
import { moveManagerSection } from "../../features/resume-sections/resume-manager";
import { ManagedResumePreview } from "./ManagedResumePreview";
import { ElegantResume } from "./templates/elegant";
import { EinspaltigResume } from "./templates/einspaltig";
import { GepflegtResume } from "./templates/gepflegt";
import { KlassischResume } from "./templates/klassisch";
import { KompaktResume } from "./templates/kompakt";
import { KreativResume } from "./templates/kreativ";
import { IvyLeagueResume } from "./templates/ivy-league";
import { ModernResume } from "./templates/modern";
import { PehlioneResume } from "./templates/pehlione";
import { StilvollResume } from "./templates/stilvoll";
import { TabellarischResume } from "./templates/tabellarisch";
import { ZeitgenoessischResume } from "./templates/zeitgenoessisch";
import { ZweispaltigResume } from "./templates/zweispaltig";
const components = {
  "elegant": ElegantResume,
  "einspaltig": EinspaltigResume,
  "gepflegt": GepflegtResume,
  "klassisch": KlassischResume,
  "kompakt": KompaktResume,
  "kreativ": KreativResume,
  "ivy-league": IvyLeagueResume,
  "modern": ModernResume,
  "pehlione_white": PehlioneResume,
  "stilvoll": StilvollResume,
  "tabellarisch": TabellarischResume,
  "zeitgenoessisch": ZeitgenoessischResume,
  "zweispaltig": ZweispaltigResume
};
describe("managed template previews", () => {
  it.each(Object.entries(components))("moves native sections and retains one custom section in %s", (templateId, component) => {
    let profile = profileSchema.parse({ id: crypto.randomUUID(), isDefault: true, firstName: "Mina", lastName: "Kaya", summary: "Profiltext", updatedAt: new Date().toISOString(),
      experiences: [{id:crypto.randomUUID(),from:"2020",to:"2024",role:"Entwicklerin",company:"Arbeitgeber",achievements:[]}],
      education: [{id:crypto.randomUUID(),from:"2018",to:"2020",degree:"Abschluss",institution:"Schule"}],
      specialSections: [{id:"bbbb0000-0000-4000-8000-000000000000",kind:"volunteer",title:"Ehrenamt",isVisible:true,entries:[{id:crypto.randomUUID(),title:"Vereinsarbeit"}]}]
    });
    profile = moveManagerSection(profile, templateId, "education", "main", 0);
    const plan = createResumePagePlan(profile, "", {}, templateId)[0];
    const child = createElement(component as unknown as ComponentType<Record<string, unknown>>, { profile, templateId, name:"Mina Kaya",atsMode:false,plan,totalPages:1,accentColor:"#123456",secondaryColor:"#234567",photoSource:null,resumeProfile:"",sections:profile.resumeSections,backgroundId:"none" });
    const html = renderToStaticMarkup(<ManagedResumePreview profile={profile} templateId={templateId} pageNumber={1} totalPages={1}>{child}</ManagedResumePreview>);
    const {document} = parseHTML(html);
    const education = document.querySelector('[data-managed-section="education"]');
    const experience = document.querySelector('[data-managed-section="experience"]');
    expect(education).not.toBeNull(); expect(experience).not.toBeNull();
    expect(education!.parentElement).toBe(experience!.parentElement);
    const siblings = Array.from(education!.parentElement!.children);
    expect(siblings.indexOf(education!)).toBeLessThan(siblings.indexOf(experience!));
    expect(document.querySelectorAll('[data-managed-section="special:bbbb0000-0000-4000-8000-000000000000"]')).toHaveLength(1);
  });
});
