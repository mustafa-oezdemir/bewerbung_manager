import type { Application, Attachment, DocumentDraft } from "./schema";

export const getCoverLetterMainBody = (
  documents: Pick<
    DocumentDraft,
    "coverMainBody" | "coverMotivation" | "coverQualification"
  >,
) =>
  documents.coverMainBody.trim() ||
  [documents.coverMotivation, documents.coverQualification]
    .map((value) => value.trim())
    .filter(Boolean)
    .join("\n\n");

export const createCoverSubject = (jobTitle: string, current = "") => {
  const subject = current.trim();
  if (subject) {
    return subject.replace(/^(?:Bewerbung\s+als\s+){2,}/i, "Bewerbung als ");
  }
  const title = jobTitle.trim();
  return /^Bewerbung\b/i.test(title) ? title : `Bewerbung als ${title}`;
};

export const getCoverLetterAttachments = (
  attachments: readonly Attachment[],
  applicationId: string,
) => [
  "Lebenslauf",
  ...attachments
    .filter(
      (attachment) =>
        attachment.applicationId === applicationId &&
        attachment.includedInPackage,
    )
    .sort(
      (left, right) =>
        (left.category === right.category
          ? 0
          : left.category === "Zeugnisse"
            ? -1
            : 1) || left.order - right.order,
    )
    .map((attachment) => attachment.fileName),
];

export const coverLetterApplicantFileName = (
  application: Pick<Application, "company" | "createdAt" | "sentAt">,
  applicantName: string,
) => {
  const sanitize = (value: string) =>
    value
      .trim()
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_");
  const safeApplicantName = sanitize(applicantName);
  return safeApplicantName
    ? `Anschreiben_${safeApplicantName}`
    : `Anschreiben_${sanitize(application.company.name)}`;
};
