import type { Application } from "./schema";

export const getApplicationDate = (
  application: Pick<Application, "sentAt" | "createdAt">,
) => new Date(application.sentAt ?? application.createdAt);

export const formatApplicationDateLong = (
  application: Pick<Application, "sentAt" | "createdAt">,
) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(getApplicationDate(application));
