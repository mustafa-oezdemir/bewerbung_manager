import type { CSSProperties } from "react";
import { mehrspaltigDefaults } from "./mehrspaltig.defaults";
import "./mehrspaltig.css";
import { MehrspaltigPage } from "./MehrspaltigPage";
import type { MehrspaltigResumeProps } from "./mehrspaltig.types";

export function MehrspaltigResume({
  accentColor,
  secondaryColor,
  ...props
}: MehrspaltigResumeProps) {
  const variables = {
    "--mehrspaltig-primary":
      accentColor || mehrspaltigDefaults.colors.primary,
    "--mehrspaltig-accent":
      secondaryColor || mehrspaltigDefaults.colors.accent,
  } as CSSProperties;
  return (
    <article
      className="mehrspaltig-template"
      data-template="mehrspaltig"
      data-ats-mode={props.atsMode}
      data-continuation={props.plan.pageNumber > 1}
      data-density={props.plan.density}
      lang="de"
      style={variables}
    >
      <MehrspaltigPage {...props} />
    </article>
  );
}

export default MehrspaltigResume;

