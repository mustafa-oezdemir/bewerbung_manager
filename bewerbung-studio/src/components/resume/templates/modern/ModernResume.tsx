/**
 * ModernResume component
 * Main component for the Modern template - combines all sections with A4 layout
 */

import React from "react";
import type { ModernResumeProps } from "./modern.types";
import { ModernHeader } from "./ModernHeader";
import { ModernLeftColumn } from "./ModernLeftColumn";
import { ModernRightColumn } from "./ModernRightColumn";
import { ModernFooter } from "./ModernFooter";
import "./modern.css";

export function ModernResume({
  profile,
  name,
  atsMode,
  pageNumber,
  totalPages,
  accentColor,
  secondaryColor,
  photoSource,
  isContinuation = false,
}: ModernResumeProps) {
  // CSS variables for dynamic theming
  const cssVariables = {
    "--modern-primary": accentColor,
    "--modern-primary-soft": secondaryColor,
  } as React.CSSProperties;

  const portfolio =
    profile?.portfolio || "portfolio.example.com";

  return (
    <div
      className="modern-resume-page"
      data-ats-mode={atsMode}
      data-continuation={isContinuation}
      style={cssVariables}
    >
      <div className="modern-resume-container">
        {/* Background waves (decorative only, not in ATS) */}
        {!atsMode && (
          <div className="modern-background-waves">
            <svg
              className="modern-wave-svg modern-wave-top"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q100,100 200,80 T400,60 L400,0 L0,0 Z"
                fill="currentColor"
              />
              <path
                d="M0,80 Q100,120 200,100 T400,90 L400,0 L0,0 Z"
                fill="white"
                opacity="0.1"
              />
            </svg>
            <svg
              className="modern-wave-svg modern-wave-bottom"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M200,0 Q150,50 100,30 T0,50 L0,200 L200,200 Z"
                fill="currentColor"
              />
              <path
                d="M200,30 Q150,80 100,60 T0,80 L0,200 L200,200 Z"
                fill="white"
                opacity="0.1"
              />
            </svg>
          </div>
        )}

        {/* Main content */}
        <div className="modern-resume-content">
          {/* Header */}
          <ModernHeader
            name={name}
            profile={profile}
            accentColor={accentColor}
            photoSource={photoSource}
            atsMode={atsMode}
          />

          {/* Two-column main content */}
          <div className="modern-resume-main">
            <ModernLeftColumn profile={profile} atsMode={atsMode} />
            <ModernRightColumn
              profile={profile}
              accentColor={accentColor}
              atsMode={atsMode}
            />
          </div>
        </div>

        {/* Footer */}
        <ModernFooter
          pageNumber={pageNumber}
          totalPages={totalPages}
          portfolio={portfolio}
          atsMode={atsMode}
        />
      </div>
    </div>
  );
}
