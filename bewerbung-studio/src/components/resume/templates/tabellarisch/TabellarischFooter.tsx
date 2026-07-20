/**
 * Tabellarisch Template - Footer Component
 */

import type { TabellarischFooterProps } from "./tabellarisch.types";

export function TabellarischFooter({
  profile,
  pageNumber,
  totalPages,
  atsMode,
  mutedColor,
  accentColor,
}: TabellarischFooterProps) {
  const portfolioUrl =
    profile?.portfolio || profile?.github || profile?.linkedin;

  return (
    <footer className="tabellarisch-footer" style={{ color: mutedColor }}>
      {!atsMode && (
        <>
          {portfolioUrl && (
            <div className="tabellarisch-footer__portfolio">
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accentColor }}>
                {portfolioUrl}
              </a>
            </div>
          )}
          <div className="tabellarisch-footer__pages">
            Seite {pageNumber} / {totalPages}
          </div>
        </>
      )}
    </footer>
  );
}
