import type { Application } from "../shared/schema";

export const applicationMatchesQuery = (
  application: Application,
  query: string,
) => {
  const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
  if (!normalizedQuery) return true;
  return [
    application.company.name,
    application.job.title,
    application.company.city,
    application.status,
  ].some((value) =>
    value.toLocaleLowerCase("de-DE").includes(normalizedQuery),
  );
};

export const searchApplications = (
  applications: Application[],
  query: string,
) => applications.filter((application) => applicationMatchesQuery(application, query));
