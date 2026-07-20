import { z } from "zod";
import {
  columnLayoutIds,
  defaultDocumentDesign,
  documentBackgroundIds,
  documentFontIds,
  fontSizeIds,
  resumeOutputModes,
} from "./documentDesign";
import { defaultKnowledgeSection } from "../features/knowledge/knowledge.constants";
import { knowledgeSectionSchema } from "../features/knowledge/knowledge.validation";

export const applicationStatuses = [
  "Entwurf",
  "Bewerbungsbereit",
  "Beworben",
  "Eingangsbestätigung",
  "In Prüfung",
  "Vorstellungsgespräch",
  "Zweites Gespräch",
  "Zusage",
  "Absage",
  "Zurückgezogen",
  "Archiviert",
] as const;

export const rejectionReasons = [
  "Keine Begründung",
  "Andere Kandidatin / anderer Kandidat",
  "Qualifikation nicht passend",
  "Stelle bereits besetzt",
  "Stelle gestrichen",
  "Gehaltsvorstellung",
  "Standort / Entfernung",
  "Sprachkenntnisse",
  "Berufserfahrung",
  "Automatische Absage",
  "Eigene Absage",
  "Sonstiges",
] as const;

export const workModels = ["Vor Ort", "Hybrid", "Remote"] as const;
export const contractTypes = [
  "Unbefristet",
  "Befristet",
  "Praktikum",
  "Ausbildung",
  "Werkstudent",
  "Freelance",
] as const;
export const attachmentCategories = ["Zeugnisse", "Zertifikate"] as const;
export const calendarEventTypes = [
  "application-sent",
  "application-deadline",
  "interview",
  "second-interview",
  "phone-interview",
  "online-interview",
  "trial-work",
  "assessment",
  "follow-up-call",
  "follow-up-email",
  "contract-start",
  "contract-end",
  "fixed-term-end",
  "probation-end",
  "custom",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];
export type RejectionReason = (typeof rejectionReasons)[number];
export type CalendarEventType = (typeof calendarEventTypes)[number];
export type AttachmentCategory = (typeof attachmentCategories)[number];

const optionalText = z.string().trim().optional().default("");
const optionalIsoDate = z.iso.datetime().optional();

export const companySchema = z.object({
  name: z.string().trim().min(1, "Unternehmen ist erforderlich."),
  street: optionalText,
  postalCode: optionalText,
  city: z.string().trim().min(1, "Ort ist erforderlich."),
  country: z.string().trim().default("Deutschland"),
  website: z.union([z.url(), z.literal("")]).default(""),
});

export const contactPersonSchema = z.object({
  salutation: z.enum(["Frau", "Herr", "Divers", ""]).default(""),
  firstName: optionalText,
  lastName: optionalText,
  position: optionalText,
  email: z.union([z.email(), z.literal("")]).default(""),
  phone: optionalText,
});

export const jobAdvertisementSchema = z.object({
  title: z.string().trim().min(1, "Position ist erforderlich."),
  source: optionalText,
  url: z.union([z.url(), z.literal("")]).default(""),
  fullText: optionalText,
  workModel: z.enum(workModels).default("Hybrid"),
  contractType: z.enum(contractTypes).default("Unbefristet"),
  salaryExpectation: optionalText,
});

export const statusHistorySchema = z.object({
  at: z.iso.datetime(),
  from: z.enum(applicationStatuses).optional(),
  to: z.enum(applicationStatuses),
  note: optionalText,
});

export const documentDraftSchema = z.object({
  coverSubject: optionalText,
  coverIntroduction: optionalText,
  coverMotivation: optionalText,
  coverQualification: optionalText,
  coverCompanyFit: optionalText,
  coverClosing: optionalText,
  resumeProfile: optionalText,
  deckblattStatement: optionalText,
});

const designLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export const documentDesignSchema = z.object({
  marginLevel: designLevelSchema,
  sectionSpacingLevel: designLevelSchema,
  fontSize: z.enum(fontSizeIds),
  lineHeightLevel: designLevelSchema,
  fontId: z.enum(documentFontIds),
  headingFontId: z.enum(documentFontIds),
  columnLayout: z.enum(columnLayoutIds),
  resumeOutputMode: z
    .enum(resumeOutputModes)
    .default(defaultDocumentDesign.resumeOutputMode),
  backgroundId: z.enum(documentBackgroundIds),
  showBackgroundInPrint: z.boolean(),
});

export const applicationSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.uuid(),
  folderName: z.string().min(1),
  company: companySchema,
  contact: contactPersonSchema,
  job: jobAdvertisementSchema,
  status: z.enum(applicationStatuses),
  templateId: z.string().min(1),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
  designSettings: documentDesignSchema.default(defaultDocumentDesign),
  profileId: z.uuid().optional(),
  notes: optionalText,
  sentAt: optionalIsoDate,
  deadlineAt: optionalIsoDate,
  interviewAt: optionalIsoDate,
  secondInterviewAt: optionalIsoDate,
  startAt: optionalIsoDate,
  contractEndAt: optionalIsoDate,
  fixedTermEndAt: optionalIsoDate,
  probationEndAt: optionalIsoDate,
  rejectionAt: optionalIsoDate,
  rejectionReason: z.enum(rejectionReasons).optional(),
  acceptedAt: optionalIsoDate,
  withdrawnAt: optionalIsoDate,
  archivedAt: optionalIsoDate,
  documents: documentDraftSchema,
  attachmentIds: z.array(z.uuid()).default([]),
  statusHistory: z.array(statusHistorySchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const applicationInputSchema = z.object({
  company: companySchema,
  contact: contactPersonSchema,
  job: jobAdvertisementSchema,
  templateId: z.string().min(1),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#244766"),
  designSettings: documentDesignSchema.default(defaultDocumentDesign),
  profileId: z.uuid().optional(),
  notes: optionalText,
  sentAt: optionalIsoDate,
  deadlineAt: optionalIsoDate,
  interviewAt: optionalIsoDate,
  startAt: optionalIsoDate,
});

export const applicationDraftSchema = z.object({
  company: z
    .object({
      name: z.string().optional(),
      street: z.string().optional(),
      postalCode: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
  contact: z
    .object({
      salutation: z.enum(["Frau", "Herr", "Divers", ""]).optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      position: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  job: z
    .object({
      title: z.string().optional(),
      source: z.string().optional(),
      url: z.string().optional(),
      fullText: z.string().optional(),
      workModel: z.enum(workModels).optional(),
      contractType: z.enum(contractTypes).optional(),
      salaryExpectation: z.string().optional(),
    })
    .optional(),
  templateId: z.string().optional(),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  designSettings: documentDesignSchema.partial().optional(),
  profileId: z.uuid().optional(),
  notes: z.string().optional(),
  sentAt: optionalIsoDate,
  deadlineAt: optionalIsoDate,
  interviewAt: optionalIsoDate,
  startAt: optionalIsoDate,
});

export const profileSchema = z.object({
  id: z.uuid(),
  isDefault: z.boolean(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  title: optionalText,
  street: optionalText,
  postalCode: optionalText,
  city: optionalText,
  country: z.string().default("Deutschland"),
  phone: optionalText,
  email: z.union([z.email(), z.literal("")]).default(""),
  linkedin: optionalText,
  github: optionalText,
  portfolio: optionalText,
  birthDate: optionalText,
  birthPlace: optionalText,
  nationality: optionalText,
  photoPath: optionalText,
  signaturePath: optionalText,
  summary: optionalText,
  skills: z.array(z.string()).default([]),
  knowledgeSection: knowledgeSectionSchema.default(defaultKnowledgeSection),
  experiences: z
    .array(
      z.object({
        id: z.uuid(),
        from: z.string(),
        to: z.string(),
        role: z.string(),
        company: z.string(),
        city: optionalText,
        achievements: z.array(z.string()),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        id: z.uuid(),
        from: z.string(),
        to: z.string(),
        degree: z.string(),
        institution: z.string(),
        city: optionalText,
      }),
    )
    .default([]),
  languages: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  resumeSections: z
    .object({
      profile: z.boolean(),
      experience: z.boolean(),
      education: z.boolean(),
      skills: z.boolean(),
      languages: z.boolean(),
      certifications: z.boolean(),
    })
    .default({
      profile: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      certifications: true,
    }),
  updatedAt: z.iso.datetime(),
});

export const calendarEventSchema = z.object({
  id: z.uuid(),
  applicationId: z.uuid().optional(),
  type: z.enum(calendarEventTypes),
  title: z.string().min(1),
  description: optionalText,
  startAt: z.iso.datetime(),
  endAt: optionalIsoDate,
  allDay: z.boolean(),
  completed: z.boolean(),
  cancelled: z.boolean(),
  reminderMinutes: z.array(z.number().int().nonnegative()),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const attachmentSchema = z.object({
  id: z.uuid(),
  applicationId: z.uuid(),
  category: z.enum(attachmentCategories),
  fileName: z.string().min(1),
  storedName: z.string().min(1),
  description: optionalText,
  documentDate: optionalText,
  order: z.number().int().nonnegative(),
  includedInPackage: z.boolean().default(true),
  createdAt: z.iso.datetime(),
});

export const appSettingsSchema = z.object({
  followUpDays: z.number().int().positive().nullable(),
  notificationsEnabled: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  archiveAccepted: z.boolean(),
  autoBackupEnabled: z.boolean().default(true),
  backupRetention: z.number().int().min(3).max(50).default(10),
  autoSaveDelaySeconds: z.number().int().min(1).max(30).default(2),
  language: z.literal("de"),
});

export const workspaceSchema = z.object({
  schemaVersion: z.literal(1),
  applications: z.array(applicationSchema),
  profiles: z.array(profileSchema),
  events: z.array(calendarEventSchema),
  attachments: z.array(attachmentSchema),
  settings: appSettingsSchema,
  updatedAt: z.iso.datetime(),
});

export type Company = z.infer<typeof companySchema>;
export type ContactPerson = z.infer<typeof contactPersonSchema>;
export type JobAdvertisement = z.infer<typeof jobAdvertisementSchema>;
export type DocumentDraft = z.infer<typeof documentDraftSchema>;
export type DocumentDesign = z.infer<typeof documentDesignSchema>;
export type Application = z.infer<typeof applicationSchema>;
export type ApplicationInput = z.infer<typeof applicationInputSchema>;
export type ApplicationDraft = z.infer<typeof applicationDraftSchema>;
export type ApplicantProfile = z.infer<typeof profileSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type AppSettings = z.infer<typeof appSettingsSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;

export const defaultSettings: AppSettings = {
  followUpDays: 14,
  notificationsEnabled: true,
  theme: "system",
  archiveAccepted: false,
  autoBackupEnabled: true,
  backupRetention: 10,
  autoSaveDelaySeconds: 2,
  language: "de",
};
