import { toElegantExternalHref } from "./elegant.model";
import type { ElegantFooterProps } from "./elegant.types";

export function ElegantFooter({
  profile,
  pageNumber,
  totalPages,
  atsMode,
}: ElegantFooterProps) {
  if (atsMode) return null;

  const portfolio = profile?.portfolio || profile?.github || profile?.linkedin;

  return (
    <footer className="elegant-footer" data-element-id="elegant.footer">
      {portfolio ? (
        <a href={toElegantExternalHref(portfolio)}>{portfolio}</a>
      ) : (
        <span />
      )}
      <p>
        Seite {pageNumber} von {totalPages}
      </p>
    </footer>
  );
}
