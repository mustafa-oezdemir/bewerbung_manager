import type { CSSProperties } from "react";
import { kreativDefaults } from "./kreativ.defaults";
import type { KreativResumeProps } from "./kreativ.types";
import { KreativPage } from "./KreativPage";
import "./kreativ.css";

export function KreativResume({
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
}: KreativResumeProps) {
  const variables = {
    "--kreativ-primary":
      accentColor || kreativDefaults.colors.primary,
    "--kreativ-primary-soft":
      secondaryColor || kreativDefaults.colors.primarySoft,
  } as CSSProperties;

  return (
    <article
      className="kreativ-template"
      data-ats-mode={atsMode}
      data-continuation={plan.pageNumber > 1}
      data-density={plan.density}
      lang="de"
      style={variables}
    >
      <KreativPage
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

export default KreativResume;
