/**
 * Gepflegt template main resume component
 * Left-sidebar professional resume with business focus
 */

import type { ApplicantProfile } from "../../../../shared/schema";
import { GepflegtHeader } from "./GepflegtHeader";
import { GepflegtSidebar } from "./GepflegtSidebar";
import { GepflegtMainContent } from "./GepflegtMainContent";
import { GepflegtFooter } from "./GepflegtFooter";
import { gepflegtDefaults } from "./gepflegt.defaults";
import "./gepflegt.css";

export interface GepflegtResumeProps {
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

export function GepflegtResume({
  profile,
  name,
  atsMode,
  pageNumber,
  totalPages,
  accentColor,
  secondaryColor,
  photoSource,
  isContinuation = false,
}: GepflegtResumeProps) {
  const cssVariables = {
    "--gepflegt-page-background": gepflegtDefaults.colors.pageBackground,
    "--gepflegt-sidebar-background":
      accentColor || gepflegtDefaults.colors.sidebarBackground,
    "--gepflegt-sidebar-text": gepflegtDefaults.colors.sidebarText,
    "--gepflegt-accent-color": secondaryColor || gepflegtDefaults.colors.accent,
    "--gepflegt-heading-color": gepflegtDefaults.colors.heading,
    "--gepflegt-body-text-color": gepflegtDefaults.colors.text,
    "--gepflegt-divider-color": gepflegtDefaults.colors.divider,
    "--gepflegt-margin-top": `${gepflegtDefaults.margins.topMm}mm`,
    "--gepflegt-margin-right": `${gepflegtDefaults.margins.rightMm}mm`,
    "--gepflegt-margin-bottom": `${gepflegtDefaults.margins.bottomMm}mm`,
    "--gepflegt-margin-left": `${gepflegtDefaults.margins.leftMm}mm`,
    "--gepflegt-sidebar-width": `${Math.round(gepflegtDefaults.sidebar.widthPercentage * 100)}%`,
    "--gepflegt-sidebar-padding-top": `${gepflegtDefaults.sidebar.paddingTopMm}mm`,
    "--gepflegt-sidebar-padding-right": `${gepflegtDefaults.sidebar.paddingRightMm}mm`,
    "--gepflegt-sidebar-padding-bottom": `${gepflegtDefaults.sidebar.paddingBottomMm}mm`,
    "--gepflegt-sidebar-padding-left": `${gepflegtDefaults.sidebar.paddingLeftMm}mm`,
    "--gepflegt-main-padding-top": `${gepflegtDefaults.main.paddingTopMm}mm`,
    "--gepflegt-main-padding-right": `${gepflegtDefaults.main.paddingRightMm}mm`,
    "--gepflegt-main-padding-bottom": `${gepflegtDefaults.main.paddingBottomMm}mm`,
    "--gepflegt-main-padding-left": `${gepflegtDefaults.main.paddingLeftMm}mm`,
    "--gepflegt-section-gap": `${gepflegtDefaults.spacing.sectionGapMm}mm`,
    "--gepflegt-entry-gap": `${gepflegtDefaults.spacing.entryGapMm}mm`,
    "--gepflegt-name-font-size": `${gepflegtDefaults.typography.nameSizePt}pt`,
    "--gepflegt-name-font-weight": gepflegtDefaults.typography.nameWeight,
    "--gepflegt-job-title-font-size": `${gepflegtDefaults.typography.jobTitleSizePt}pt`,
    "--gepflegt-job-title-font-weight":
      gepflegtDefaults.typography.jobTitleWeight,
    "--gepflegt-section-title-font-size": `${gepflegtDefaults.typography.sectionTitleSizePt}pt`,
    "--gepflegt-section-title-font-weight":
      gepflegtDefaults.typography.sectionTitleWeight,
    "--gepflegt-entry-title-font-size": `${gepflegtDefaults.typography.entryTitleSizePt}pt`,
    "--gepflegt-entry-title-font-weight":
      gepflegtDefaults.typography.entryTitleWeight,
    "--gepflegt-body-font-size": `${gepflegtDefaults.typography.bodySizePt}pt`,
    "--gepflegt-body-font-weight": gepflegtDefaults.typography.bodyWeight,
    "--gepflegt-small-font-size": `${gepflegtDefaults.typography.smallSizePt}pt`,
    "--gepflegt-line-height": gepflegtDefaults.typography.bodyLineHeight,
    "--gepflegt-small-line-height": gepflegtDefaults.typography.smallLineHeight,
    "--gepflegt-font-family": gepflegtDefaults.typography.fontFamily,
  } as React.CSSProperties;

  return (
    <div className="gepflegt-page" data-ats-mode={atsMode} style={cssVariables}>
      {/* Header spans both columns */}
      <GepflegtHeader
        name={name}
        profile={profile}
        accentColor={accentColor}
        photoSource={photoSource}
        atsMode={atsMode}
      />

      {/* Content wrapper with sidebar and main */}
      <div className="gepflegt-page__content">
        {/* Left Sidebar (hidden in ATS mode) */}
        <GepflegtSidebar
          profile={profile}
          accentColor={accentColor}
          sidebarBackground={
            accentColor || gepflegtDefaults.colors.sidebarBackground
          }
          sidebarText={gepflegtDefaults.colors.sidebarText}
          atsMode={atsMode}
          photoSource={photoSource}
          name={name}
        />

        {/* Main Content Area */}
        <GepflegtMainContent profile={profile} name={name} atsMode={atsMode} />
      </div>

      {/* Footer with optional portfolio link and page numbers */}
      <GepflegtFooter
        profile={profile}
        pageNumber={pageNumber}
        totalPages={totalPages}
        atsMode={atsMode}
      />
    </div>
  );
}

export default GepflegtResume;
