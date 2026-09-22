import { writeFileSync, readFileSync } from "node:fs";
import { it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { profileSchema, applicationSchema } from "../../src/shared/schema";
import type { ResumePagePlan } from "../../src/shared/documentPagination";
import { getTemplate } from "../../src/shared/templates";
import { PehlioneResume } from "../../src/components/resume/templates/pehlione/PehlioneResume";
import { buildDocumentHtml } from "../../electron/documents";
const experienceId = "81000000-0000-4000-8000-000000000001";
const educationId = "82000000-0000-4000-8000-000000000001";
const profile = profileSchema.parse({
  id: "83000000-0000-4000-8000-000000000001",
  isDefault: true,
  firstName: "Mina",
  lastName: "Kaya",
  title: "Software Developer",
  city: "Marburg",
  country: "Deutschland",
  phone: "+49 176 123456",
  email: "mina@example.com",
  linkedin: "linkedin.com/in/mina",
  summary: "Strukturiert arbeitende Entwicklerin mit technischem Verständnis.",
  strengths: [{ id: "84000000-0000-4000-8000-000000000001", title: "API-Integration", description: "Robuste Schnittstellen", iconId: "" }],
  skills: ["TypeScript", "Golang", "Grafana"],
  experiences: [{
    id: experienceId,
    from: "11/2024",
    to: "06/2025",
    role: "Praktikum Softwareentwicklung",
    company: "Universitätsstadt Marburg",
    city: "Marburg",
    projects: ["Grafana Datasource Plugin für PRTG"],
    technologies: ["Go", "Grafana", "PRTG"],
    achievements: ["Monitoring-Daten über eine sichere API integriert."],
  }],
  education: [{
    id: educationId,
    from: "2022",
    to: "2025",
    degree: "Fachinformatiker für Anwendungsentwicklung",
    institution: "IHK Kassel-Marburg",
    city: "Marburg",
  }],
  certifications: ["IBM Full Stack JavaScript"],
  updatedAt: "2026-09-21T12:00:00.000Z",
});

const plan: ResumePagePlan = {
  pageNumber: 1,
  density: "standard",
  items: [
    { kind: "experience", id: experienceId, weight: 5 },
    { kind: "education", id: educationId, weight: 3 },
  ],
};


it("renders white template for visual inspection", () => {
 const template = getTemplate("pehlione_white");
 const application = applicationSchema.parse({schemaVersion:1,id:"d50ac50f-cafe-4ca3-b06b-a98b0bb1fa11",folderName:"Beispiel",company:{name:"Beispiel",city:"Marburg"},contact:{},job:{title:"Software Developer"},status:"Entwurf",templateId:template.id,accentColor:template.accent,secondaryColor:template.secondary,designSettings:{...template.designDefaults,showBackgroundInPrint:true},documents:{},statusHistory:[],createdAt:profile.updatedAt,updatedAt:profile.updatedAt});
 writeFileSync("tmp/pdfs/pehlione-white-pdf.html",buildDocumentHtml(application,profile,"lebenslauf"));
 const markup = renderToStaticMarkup(<PehlioneResume templateId="pehlione_white" profile={profile} name="Mina Kaya" atsMode={false} plan={plan} totalPages={1} accentColor={template.accent} secondaryColor={template.secondary} resumeProfile="" sections={profile.resumeSections}/>);
 const css = ["src/app.css","src/components/resume/templates/pehlione/pehlione.css","src/components/resume/templates/pehlione/pehlione-blocks.css","src/components/resume/templates/pehlione/pehlione-white.css"].map(p=>readFileSync(p,"utf8")).join("\n");
 writeFileSync("tmp/pdfs/pehlione-white-preview.html",`<!doctype html><html><head><meta charset="utf-8"><style>${css} body{margin:0;background:white} *{box-sizing:border-box}</style></head><body>${markup}</body></html>`);
});
