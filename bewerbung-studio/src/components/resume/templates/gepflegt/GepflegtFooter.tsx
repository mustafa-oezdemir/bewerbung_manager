/**
 * Gepflegt template footer component
 * Simple footer with optional portfolio link and page numbers
 */

import type { ApplicantProfile } from "../../../../shared/schema";

export interface GepflegtFooterProps {
  profile: ApplicantProfile | undefined;
  pageNumber: number;
  totalPages: number;
  atsMode: boolean;
}

export function GepflegtFooter({
  profile,
  pageNumber,
  totalPages,
  atsMode,
}: GepflegtFooterProps) {
  // Extract portfolio URL if available
  const portfolioUrl =
    profile?.portfolio || profile?.github || profile?.linkedin;

  return (
    <footer className="gepflegt-footer">
      <div className="gepflegt-footer__content">
        {/* Portfolio link if available - clickable in PDF */}
        {portfolioUrl && !atsMode && (
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gepflegt-footer__link">
            {portfolioUrl}
          </a>
        )}

        {/* Page numbers - hidden in ATS mode */}
        {!atsMode && (
          <div className="gepflegt-footer__pages">
            {pageNumber} / {totalPages}
          </div>
        )}
      </div>
    </footer>
  );
}
