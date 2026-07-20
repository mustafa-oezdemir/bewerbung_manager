/**
 * Tabellarisch Template - Main Resume Component
 * Modern timeline-based CV template for experienced professionals
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import { TabellarischPage } from "./TabellarischPage";
import { tabellarischDefaults } from "./tabellarisch.defaults";
import "./tabellarisch.css";

export interface TabellarischResumeProps {
  profile: ApplicantProfile | undefined;
  name: string;
  atsMode: boolean;
  pageNumber: number;
  totalPages: number;
  accentColor: string;
  secondaryColor: string;
  photoSource: string | null;
  isContinuation?: boolean;
}

export function TabellarischResume({
  profile,
  name,
  atsMode,
  pageNumber,
  totalPages,
  accentColor,
  secondaryColor,
  photoSource,
  isContinuation = false,
}: TabellarischResumeProps) {
  const cssVariables = {
    "--page-width": `${tabellarischDefaults.page.widthMm}mm`,
    "--page-height": `${tabellarischDefaults.page.heightMm}mm`,
    "--page-margin-top": `${tabellarischDefaults.margins.topMm}mm`,
    "--page-margin-right": `${tabellarischDefaults.margins.rightMm}mm`,
    "--page-margin-bottom": `${tabellarischDefaults.margins.bottomMm}mm`,
    "--page-margin-left": `${tabellarischDefaults.margins.leftMm}mm`,

    "--primary-color": secondaryColor || tabellarischDefaults.colors.primary,
    "--accent-color": accentColor || tabellarischDefaults.colors.accent,
    "--text-color": tabellarischDefaults.colors.text,
    "--muted-color": tabellarischDefaults.colors.muted,
    "--line-color": tabellarischDefaults.colors.line,
    "--background-color": tabellarischDefaults.colors.background,

    "--font-family": tabellarischDefaults.typography.fontFamily,

    "--body-font-size": `${tabellarischDefaults.typography.bodySizePt}pt`,
    "--body-line-height": tabellarischDefaults.typography.bodyLineHeight,
    "--small-font-size": `${tabellarischDefaults.typography.smallSizePt}pt`,
    "--small-line-height": tabellarischDefaults.typography.smallLineHeight,

    "--name-font-size": `${tabellarischDefaults.typography.nameSizePt}pt`,
    "--job-title-font-size": `${tabellarischDefaults.typography.jobTitleSizePt}pt`,
    "--section-title-font-size": `${tabellarischDefaults.typography.sectionTitleSizePt}pt`,
    "--entry-title-font-size": `${tabellarischDefaults.typography.entryTitleSizePt}pt`,

    "--section-gap": `${tabellarischDefaults.spacing.sectionGapMm}mm`,
    "--entry-gap": `${tabellarischDefaults.spacing.entryGapMm}mm`,
  } as React.CSSProperties;

  return (
    <div
      className="tabellarisch-template tabellarisch-page"
      data-ats-mode={atsMode}
      style={cssVariables}>
      <TabellarischPage
        profile={profile}
        name={name}
        atsMode={atsMode}
        pageNumber={pageNumber}
        totalPages={totalPages}
        accentColor={accentColor}
        primaryColor={secondaryColor || tabellarischDefaults.colors.primary}
        photoSource={photoSource}
        isContinuation={isContinuation}
      />
    </div>
  );
}

export default TabellarischResume;
