import { formatApplicationDate } from "./applicationDate";
import { applicationGreeting } from "./applicationContacts";
import { createCoverSubject } from "./coverLetter";
import type { ApplicantProfile, Application } from "./schema";

const contactName = (contact: Application["contact"]) =>
  [contact.salutation, contact.firstName, contact.lastName]
    .filter(Boolean)
    .join(" ");

export const defaultApplicationEmail = (
  application: Pick<Application, "company" | "job">,
) => ({
  emailSubject: createCoverSubject(application.job.title),
  emailMessage: `anbei übersende ich Ihnen meine Bewerbung für die ausgeschriebene Position als ${application.job.title.replace(/^Bewerbung\s+als\s+/i, "")} bei ${application.company.name}.`,
  emailAttachmentNote:
    "Mein Anschreiben und meinen Lebenslauf finden Sie im Anhang.",
});

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
) => {
  const defaults = defaultApplicationEmail(application);
  const recipient = [application.contact, ...application.additionalContacts].find(
    (contact) =>
      Boolean(contact.email || contact.firstName || contact.lastName),
  ) ?? application.contact;
  const message = application.documents.emailMessage || defaults.emailMessage;
  const attachmentNote =
    application.documents.emailAttachmentNote || defaults.emailAttachmentNote;
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
    closing: "Über die Gelegenheit zu einem persönlichen Gespräch freue ich mich.",
    greeting: "Mit freundlichen Grüßen",
    subject: createCoverSubject(
      application.job.title,
      application.documents.emailSubject || defaults.emailSubject,
    ),
    message,
    attachmentNote,
    body: `${message.trim()}${attachmentNote.trim() ? ` ${attachmentNote.trim()}` : ""}`,
  };
};

export const buildApplicationEmailMarkdown = (
  application: Parameters<typeof getApplicationEmail>[0],
  profile?: Parameters<typeof getApplicationEmail>[1],
) => {
  const email = getApplicationEmail(application, profile);
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
    email.closing,
    "",
    email.greeting,
    "",
    email.senderName,
    "",
  ].join("\n");
};
