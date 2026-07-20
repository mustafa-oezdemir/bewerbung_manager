import type { CSSProperties } from "react";
import { zweispaltigDefaults } from "./zweispaltig.defaults";
import type { ZweispaltigResumeProps } from "./zweispaltig.types";
import { ZweispaltigPage } from "./ZweispaltigPage";
import "./zweispaltig.css";

export function ZweispaltigResume({
  profile,
  name,
  atsMode,
  plan,
  totalPages,
  accentColor,
  secondaryColor,
  photoSource,
  resumeProfile,
  sections,
}: ZweispaltigResumeProps) {
  const variables = {
    "--zweispaltig-primary": atsMode
      ? zweispaltigDefaults.colors.primaryDark
      : accentColor || zweispaltigDefaults.colors.primary,
    "--zweispaltig-soft":
      secondaryColor || zweispaltigDefaults.colors.primarySoft,
    "--zweispaltig-left-ratio": `${zweispaltigDefaults.layout.leftColumnRatio * 100}%`,
    "--zweispaltig-right-ratio": `${zweispaltigDefaults.layout.rightColumnRatio * 100}%`,
  } as CSSProperties;

  return (
    <article
      className="zweispaltig-template"
      data-ats-mode={atsMode}
      data-continuation={plan.pageNumber > 1}
      data-density={plan.density}
      lang="de"
      style={variables}
    >
      <ZweispaltigPage
        profile={profile}
        name={name}
        atsMode={atsMode}
        plan={plan}
        totalPages={totalPages}
        photoSource={photoSource}
        resumeProfile={resumeProfile}
        sections={sections}
      />
    </article>
  );
}

export default ZweispaltigResume;
