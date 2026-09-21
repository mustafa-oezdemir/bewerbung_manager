export const resumeSemanticTypes = [
  "heading",
  "personalData",
  "photo",
  "summary",
  "career",
  "education",
  "knowledge",
  "interests",
  "closing",
] as const;

export type ResumeSemanticType = (typeof resumeSemanticTypes)[number];
export type ResumeSectionRequirement = "required" | "recommended" | "optional";

export type ResumeSectionDefinition = {
  id: ResumeSemanticType;
  semanticType: ResumeSemanticType;
  defaultTitle: string;
  requirement: ResumeSectionRequirement;
  locked: boolean;
  renamable: boolean;
  hideable: boolean;
  deletable: boolean;
};

export type ResumeSectionInstance = {
  semanticType: ResumeSemanticType;
  customTitle: string;
  visible: boolean;
  enabled: boolean;
  order: number;
};

export const resumeSectionDefinitions: readonly ResumeSectionDefinition[] = [
  { id: "heading", semanticType: "heading", defaultTitle: "Lebenslauf", requirement: "required", locked: true, renamable: true, hideable: false, deletable: false },
  { id: "personalData", semanticType: "personalData", defaultTitle: "Persönliche Daten", requirement: "required", locked: true, renamable: true, hideable: false, deletable: false },
  { id: "photo", semanticType: "photo", defaultTitle: "Bewerbungsfoto", requirement: "optional", locked: false, renamable: false, hideable: true, deletable: true },
  { id: "summary", semanticType: "summary", defaultTitle: "Kurzprofil", requirement: "recommended", locked: false, renamable: true, hideable: true, deletable: false },
  { id: "career", semanticType: "career", defaultTitle: "Beruflicher Werdegang", requirement: "required", locked: true, renamable: true, hideable: false, deletable: false },
  { id: "education", semanticType: "education", defaultTitle: "Bildungsweg", requirement: "required", locked: true, renamable: true, hideable: false, deletable: false },
  { id: "knowledge", semanticType: "knowledge", defaultTitle: "Besondere Kenntnisse", requirement: "recommended", locked: false, renamable: true, hideable: true, deletable: false },
  { id: "interests", semanticType: "interests", defaultTitle: "Interessen und Hobbys", requirement: "optional", locked: false, renamable: true, hideable: true, deletable: true },
  { id: "closing", semanticType: "closing", defaultTitle: "Ort, Datum und Unterschrift", requirement: "recommended", locked: false, renamable: true, hideable: true, deletable: false },
] as const;

export const defaultResumeSectionInstances = (): ResumeSectionInstance[] =>
  resumeSectionDefinitions.map((definition, order) => ({
    semanticType: definition.semanticType,
    customTitle: "",
    visible: definition.requirement !== "optional",
    enabled: definition.requirement !== "optional",
    order,
  }));

export const resolveResumeSectionInstances = (
  saved: readonly ResumeSectionInstance[] | undefined,
) => {
  const byType = new Map(saved?.map((item) => [item.semanticType, item]));
  return defaultResumeSectionInstances()
    .map((fallback) => {
      const definition = resumeSectionDefinitions.find(
        (candidate) => candidate.semanticType === fallback.semanticType,
      )!;
      const current = byType.get(fallback.semanticType);
      return {
        ...fallback,
        ...current,
        visible: definition.requirement === "required" ? true : (current?.visible ?? fallback.visible),
        enabled: definition.requirement === "required" ? true : (current?.enabled ?? fallback.enabled),
      };
    })
    .sort((left, right) => left.order - right.order);
};

export const getResumeSemanticSection = (
  saved: readonly ResumeSectionInstance[] | undefined,
  type: ResumeSemanticType,
) => resolveResumeSectionInstances(saved).find((item) => item.semanticType === type)!;

export const getResumeSemanticTitle = (
  saved: readonly ResumeSectionInstance[] | undefined,
  type: ResumeSemanticType,
) => {
  const instance = getResumeSemanticSection(saved, type);
  const definition = resumeSectionDefinitions.find((item) => item.semanticType === type)!;
  return instance.customTitle.trim() || definition.defaultTitle;
};

export const validateRequiredResumeSections = (
  saved: readonly ResumeSectionInstance[] | undefined,
) => {
  const resolved = resolveResumeSectionInstances(saved);
  return resumeSectionDefinitions
    .filter((definition) => definition.requirement === "required")
    .filter((definition) => {
      const instance = resolved.find((item) => item.semanticType === definition.semanticType);
      return !instance?.enabled || !instance.visible;
    })
    .map((definition) => definition.defaultTitle);
};

export const resumePersonalFieldKeys = [
  "address",
  "phone",
  "email",
  "linkedin",
  "github",
  "website",
  "birthDate",
  "birthPlace",
  "nationality",
  "drivingLicense",
  "xing",
] as const;

export type ResumePersonalFieldKey = (typeof resumePersonalFieldKeys)[number];

export const resumePersonalFieldLabels: Record<ResumePersonalFieldKey, string> = {
  address: "Adresse",
  phone: "Telefon",
  email: "E-Mail",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Website",
  birthDate: "Geburtsdatum",
  birthPlace: "Geburtsort",
  nationality: "Staatsangehörigkeit",
  drivingLicense: "Führerschein",
  xing: "Xing",
};

export const defaultResumePersonalFieldVisibility = Object.fromEntries(
  resumePersonalFieldKeys.map((key) => [
    key,
    !["birthDate", "birthPlace", "nationality", "drivingLicense", "xing"].includes(key),
  ]),
) as Record<ResumePersonalFieldKey, boolean>;

export type ResumeKnowledgeGroup = {
  id: string;
  title: string;
  semanticType: string;
  visible: boolean;
  order: number;
  items: string[];
  rendererType: "list" | "icon-list" | "tags";
};

export const getDefaultKnowledgeGroups = (templateId: string): ResumeKnowledgeGroup[] => {
  const titles = templateId === "pehlione_white_blue"
    ? ["Kernkompetenzen", "Technische Schwerpunkte"]
    : templateId === "stilvoll"
      ? ["Kenntnisse", "Sprachen", "Stärken"]
      : ["Kenntnisse", "Sprachen"];
  return titles.map((title, order) => ({
    id: `default-${templateId}-${order}`,
    title,
    semanticType: title.toLocaleLowerCase("de-DE").replace(/\s+/g, "-"),
    visible: true,
    order,
    items: [],
    rendererType: order === 1 && templateId === "pehlione_white_blue" ? "icon-list" : "list",
  }));
};

export const resolveKnowledgeGroups = (
  templateId: string,
  saved: readonly ResumeKnowledgeGroup[] | undefined,
) => {
  if (saved?.length) return [...saved].sort((left, right) => left.order - right.order);
  return getDefaultKnowledgeGroups(templateId);
};
