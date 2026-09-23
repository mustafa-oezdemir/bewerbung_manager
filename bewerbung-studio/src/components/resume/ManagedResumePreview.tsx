import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import type { ApplicantProfile } from "../../shared/schema";
import { applyManagedResumeOutput, managedResumeCss } from "../../shared/resumeManagedOutput";

export function ManagedResumePreview({ children, profile, templateId, pageNumber, totalPages }: { children: ReactNode; profile: ApplicantProfile | undefined; templateId: string; pageNumber: number; totalPages: number }) {
  const html = applyManagedResumeOutput(renderToStaticMarkup(<>{children}</>), profile, templateId, pageNumber, totalPages);
  return <><style>{managedResumeCss}</style><div className="managed-resume-preview" dangerouslySetInnerHTML={{ __html: html }} /></>;
}
