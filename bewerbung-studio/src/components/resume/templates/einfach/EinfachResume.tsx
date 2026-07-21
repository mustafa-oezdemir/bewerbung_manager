import type { CSSProperties } from "react";
import { einfachDefaults } from "./einfach.defaults";
import type { EinfachResumeProps } from "./einfach.types";
import { EinfachPage } from "./EinfachPage";
import "./einfach.css";

export function EinfachResume({
  accentColor,
  secondaryColor,
  ...props
}: EinfachResumeProps) {
  const variables = {
    "--einfach-primary":
      accentColor || einfachDefaults.colors.primary,
    "--einfach-accent":
      secondaryColor || einfachDefaults.colors.accent,
  } as CSSProperties;
  return (
    <article
      className="einfach-template"
      data-ats-mode={props.atsMode}
      data-continuation={props.plan.pageNumber > 1}
      data-density={props.plan.density}
      lang="de"
      style={variables}
    >
      <EinfachPage {...props} />
    </article>
  );
}

export default EinfachResume;
