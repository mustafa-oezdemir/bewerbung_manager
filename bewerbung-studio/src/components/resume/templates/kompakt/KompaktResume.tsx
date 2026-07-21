import type { CSSProperties } from "react";
import { kompaktDefaults } from "./kompakt.defaults";
import type { KompaktResumeProps } from "./kompakt.types";
import { KompaktPage } from "./KompaktPage";
import "./kompakt.css";

export function KompaktResume({
  accentColor,
  secondaryColor,
  ...props
}: KompaktResumeProps) {
  const variables = {
    "--kompakt-primary":
      accentColor || kompaktDefaults.colors.primary,
    "--kompakt-accent":
      secondaryColor || kompaktDefaults.colors.accent,
  } as CSSProperties;
  return (
    <article
      className="kompakt-template"
      data-ats-mode={props.atsMode}
      data-continuation={props.plan.pageNumber > 1}
      data-density={props.plan.density}
      lang="de"
      style={variables}
    >
      <KompaktPage {...props} />
    </article>
  );
}

export default KompaktResume;
