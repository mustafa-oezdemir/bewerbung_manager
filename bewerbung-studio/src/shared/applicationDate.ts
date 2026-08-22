import type { Application } from "./schema";

export const getApplicationDate = (
  application: Pick<Application, "sentAt" | "createdAt">,
) => new Date(application.sentAt ?? application.createdAt);
