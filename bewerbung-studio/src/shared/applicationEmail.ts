import { formatApplicationDate } from "./applicationDate";
import { applicationGreeting } from "./applicationContacts";
import { createCoverSubject } from "./coverLetter";
import type { ApplicantProfile, Application, DocumentDraft } from "./schema";

const contactName = (contact: Application["contact"]) =>
  [contact.salutation, contact.firstName, contact.lastName]
    .filter(Boolean)
    .join(" ");

export const defaultApplicationEmail = (
  application: Pick<Application, "company" | "job">,
) => ({
  emailSubject: createCoverSubject(application.job.title),
  emailMessage: `anbei übersende ich Ihnen meine Bewerbung für die ausgeschriebene Position als ${application.job.title.replace(/^Bewerbung\s+als\s+/i, "")} bei ${application.company.name}.\n\nMeine vollständigen Bewerbungsunterlagen finden Sie im beigefügten PDF.`,
});

export const resolveApplicationEmailAttachments = (
  documents: Pick<DocumentDraft, "emailAttachmentMode" | "emailPackageFileName">,
  visibleDocuments: readonly string[],
) => documents.emailAttachmentMode === "package"
  ? [documents.emailPackageFileName.trim() || "Bewerbungsunterlagen.pdf"]
  : visibleDocuments.map((item) => /\.pdf$/i.test(item) ? item : `${item}.pdf`);

export const validateEmailClosingDuplication = (message: string, closing: string) => {
  const combined = `${message} ${closing}`.toLocaleLowerCase("de-DE");
  const personalPhrase = "persönlich(?:e|en|es|em|er)?";
  const hasExchange = new RegExp(`${personalPhrase}\\s+austausch`).test(combined);
  const conversationMatches = combined.match(
    new RegExp(`${personalPhrase}\\s+gespräch`, "g"),
  )?.length ?? 0;
  return hasExchange && conversationMatches
    ? ["Die Abschlussformulierung wiederholt den Wunsch nach einem persönlichen Austausch/Gespräch."]
    : conversationMatches > 1
      ? ["Die Formulierung zum persönlichen Gespräch kommt mehrfach vor."]
      : [];
};

export const getApplicationEmail = (
  application: Pick<
    Application,
    | "additionalContacts"
    | "company"
    | "contact"
    | "createdAt"
    | "documents"
    | "job"
    | "sentAt"
  >,
  profile?: Pick<ApplicantProfile, "firstName" | "lastName" | "email">,
  attachments: readonly string[] = [],
) => {
  const defaults = defaultApplicationEmail(application);
  const recipient = [application.contact, ...application.additionalContacts].find(
    (contact) =>
      Boolean(contact.email || contact.firstName || contact.lastName),
  ) ?? application.contact;
  const message = application.documents.emailMessage || defaults.emailMessage;
  return {
    applicationDate: formatApplicationDate(application),
    companyName: application.company.name,
    jobTitle: application.job.title,
    recipientName: contactName(recipient),
    recipientEmail: recipient.email,
    senderName: profile
      ? [profile.firstName, profile.lastName].filter(Boolean).join(" ")
      : "",
    senderEmail: profile?.email ?? "",
    salutation: applicationGreeting(application),
    closing: "Für Rückfragen stehe ich Ihnen gerne zur Verfügung. Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.",
    greeting: "Mit freundlichen Grüßen",
    subject: createCoverSubject(
      application.job.title,
      application.documents.emailSubject || defaults.emailSubject,
    ),
    message,
    attachments: Array.from(new Set(attachments.map((item) => item.trim()).filter(Boolean))),
    body: message.trim(),
    warnings: validateEmailClosingDuplication(
      message,
      "Für Rückfragen stehe ich Ihnen gerne zur Verfügung. Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.",
    ),
  };
};

export const buildApplicationEmailMarkdown = (
  application: Parameters<typeof getApplicationEmail>[0],
  profile?: Parameters<typeof getApplicationEmail>[1],
  attachments: Parameters<typeof getApplicationEmail>[2] = [],
) => {
  const email = getApplicationEmail(application, profile, attachments);
  return [
    "# Bewerbungs-E-Mail",
    "",
    `- Bewerbungsdatum: ${email.applicationDate}`,
    `- Firma: ${email.companyName}`,
    `- Stellenbezeichnung: ${email.jobTitle}`,
    `- Empfänger: ${email.recipientName || "Nicht angegeben"}`,
    `- E-Mail-Adresse: ${email.recipientEmail || "Nicht angegeben"}`,
    `- Absender: ${email.senderName || "Nicht angegeben"}`,
    `- Absender-E-Mail: ${email.senderEmail || "Nicht angegeben"}`,
    `- Betreff: ${email.subject}`,
    "",
    "## Nachricht",
    "",
    email.salutation,
    "",
    email.body,
    "",
    ...(email.attachments.length
      ? ["## Anlagen", "", ...email.attachments.map((attachment) => `- ${attachment}`), ""]
      : []),
    email.closing,
    "",
    email.greeting,
    "",
    email.senderName,
    "",
  ].join("\n");
};
