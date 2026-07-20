import type { ApplicantProfile } from "../../../../shared/schema";
import { toIvyLeagueExternalHref } from "./ivy-league.model";

export function IvyLeagueFooter({
  profile,
  pageNumber,
  totalPages,
}: {
  profile: ApplicantProfile | undefined;
  pageNumber: number;
  totalPages: number;
}) {
  const portfolio = profile?.portfolio || profile?.github || profile?.linkedin;
  return (
    <footer
      className="ivy-league-footer"
      data-element-id="ivy-league.footer"
    >
      {portfolio ? (
        <a href={toIvyLeagueExternalHref(portfolio)}>{portfolio}</a>
      ) : (
        <span />
      )}
      <span>
        Seite {pageNumber} / {totalPages}
      </span>
    </footer>
  );
}
