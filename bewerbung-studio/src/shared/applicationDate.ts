import type { Application } from "./schema";

export type ApplicationDateSource = Pick<Application, "sentAt" | "createdAt">;

export const getApplicationDate = (
  application: ApplicationDateSource,
) => new Date(application.sentAt ?? application.createdAt);

export const formatApplicationDate = (application: ApplicationDateSource) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(getApplicationDate(application));

export const formatApplicationDateFolder = (date: Date) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

export const formatApplicationDateLong = (
  application: ApplicationDateSource,
) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(getApplicationDate(application));

export const applicationDateChanged = (
  previous: ApplicationDateSource,
  next: ApplicationDateSource,
) => formatApplicationDate(previous) !== formatApplicationDate(next);
