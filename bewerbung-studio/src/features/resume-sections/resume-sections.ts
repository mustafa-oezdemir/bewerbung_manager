import type { ApplicantProfile } from "../../shared/schema";

export const resumeSectionTypes = [
  "summary",
  "strengths",
  "experience",
  "education",
  "projects",
  "knowledge",
  "certifications",
  "languages",
  "additional",
  "references",
] as const;

export type ResumeSectionType = (typeof resumeSectionTypes)[number];

export const sectionZones = [
  "main",
  "sidebar",
  "full",
  "left-sidebar",
  "right-sidebar",
] as const;
export type SectionZone = (typeof sectionZones)[number];

export type ResumeSectionPlacement = {
  type: ResumeSectionType;
  zone: SectionZone;
};

export type ResumeSectionLayoutsByTemplate = Record<
  string,
  ResumeSectionPlacement[]
>;

export type TemplateSectionCapabilities = {
  templateId: string;
  availableZones: readonly SectionZone[];
  lockedSectionTypes: readonly ResumeSectionType[];
  allowedZonesBySection: Partial<
    Record<ResumeSectionType, readonly SectionZone[]>
  >;
  defaultSectionOrder: readonly ResumeSectionType[];
  defaultZoneBySection: Partial<Record<ResumeSectionType, SectionZone>>;
  compactSinglePage?: boolean;
  timelineSections?: readonly ResumeSectionType[];
};

export const resumeSectionLabels: Record<ResumeSectionType, string> = {
  summary: "Zusammenfassung",
  strengths: "Stärken",
  experience: "Berufserfahrung",
  education: "Ausbildung",
  projects: "Projekte",
  knowledge: "Kenntnisse",
  certifications: "Zertifikate",
  languages: "Sprachen",
  additional: "Zusatzangaben",
  references: "Referenzen",
};

const naturalOrder: readonly ResumeSectionType[] = [
  "summary",
  "strengths",
  "experience",
  "education",
  "projects",
  "knowledge",
  "certifications",
  "languages",
  "additional",
  "references",
];

const mainOnlyCapabilities = (
  templateId: string,
  options: Pick<
    TemplateSectionCapabilities,
    "compactSinglePage" | "timelineSections"
  > = {},
): TemplateSectionCapabilities => ({
  templateId,
  availableZones: ["main"],
  lockedSectionTypes: [],
  allowedZonesBySection: Object.fromEntries(
    resumeSectionTypes.map((type) => [type, ["main"]]),
  ) as TemplateSectionCapabilities["allowedZonesBySection"],
  defaultSectionOrder: naturalOrder,
  defaultZoneBySection: Object.fromEntries(
    resumeSectionTypes.map((type) => [type, "main"]),
  ) as TemplateSectionCapabilities["defaultZoneBySection"],
  ...options,
});

const twoColumnCapabilities = (
  templateId: string,
): TemplateSectionCapabilities => ({
  templateId,
  availableZones: ["main", "sidebar", "full"],
  lockedSectionTypes: [],
  allowedZonesBySection: {
    summary: ["sidebar", "full"],
    strengths: ["sidebar", "full"],
    experience: ["main"],
    education: ["main"],
    projects: ["main"],
    knowledge: ["sidebar", "main"],
    certifications: ["main", "sidebar"],
    languages: ["sidebar"],
    additional: ["main", "sidebar", "full"],
    references: ["main", "sidebar", "full"],
  },
  defaultSectionOrder: naturalOrder,
  defaultZoneBySection: {
    summary: "sidebar",
    strengths: "sidebar",
    experience: "main",
    education: "main",
    projects: "main",
    knowledge: "sidebar",
    certifications: "sidebar",
    languages: "sidebar",
    additional: "main",
    references: "main",
  },
});

const threeColumnCapabilities = (
  templateId: string,
): TemplateSectionCapabilities => ({
  templateId,
  availableZones: ["main", "left-sidebar", "right-sidebar"],
  lockedSectionTypes: [],
  allowedZonesBySection: {
    summary: ["left-sidebar", "right-sidebar"],
    strengths: ["left-sidebar", "right-sidebar"],
    experience: ["main"],
    education: ["main"],
    projects: ["main"],
    knowledge: ["left-sidebar", "right-sidebar", "main"],
    certifications: ["left-sidebar", "right-sidebar", "main"],
    languages: ["left-sidebar", "right-sidebar"],
    additional: ["main", "left-sidebar", "right-sidebar"],
    references: ["main", "left-sidebar", "right-sidebar"],
  },
  defaultSectionOrder: naturalOrder,
  defaultZoneBySection: {
    summary: "left-sidebar",
    strengths: "right-sidebar",
    experience: "main",
    education: "main",
    projects: "main",
    knowledge: "left-sidebar",
    certifications: "right-sidebar",
    languages: "left-sidebar",
    additional: "main",
    references: "main",
  },
});

export const templateSectionCapabilities: Record<
  string,
  TemplateSectionCapabilities
> = {
  "ivy-league": {
    ...mainOnlyCapabilities("ivy-league"),
    defaultSectionOrder: [
      "summary",
      "experience",
      "education",
      "knowledge",
      "languages",
      "strengths",
      "certifications",
      "projects",
      "additional",
      "references",
    ],
  },
  stilvoll: mainOnlyCapabilities("stilvoll"),
  kompakt: mainOnlyCapabilities("kompakt", { compactSinglePage: true }),
  einspaltig: mainOnlyCapabilities("einspaltig"),
  klassisch: mainOnlyCapabilities("klassisch"),
  tabellarisch: mainOnlyCapabilities("tabellarisch", {
    timelineSections: ["experience", "education"],
  }),
  zweispaltig: twoColumnCapabilities("zweispaltig"),
  gepflegt: twoColumnCapabilities("gepflegt"),
  modern: twoColumnCapabilities("modern"),
  elegant: twoColumnCapabilities("elegant"),
  zeitgenoessisch: twoColumnCapabilities("zeitgenoessisch"),
  kreativ: twoColumnCapabilities("kreativ"),
  mehrspaltig: threeColumnCapabilities("mehrspaltig"),
};

export const getTemplateSectionCapabilities = (templateId: string) =>
  templateSectionCapabilities[templateId] ??
  mainOnlyCapabilities(templateId);

export const getDefaultResumeSectionLayout = (
  templateId: string,
): ResumeSectionPlacement[] => {
  const capabilities = getTemplateSectionCapabilities(templateId);
  return capabilities.defaultSectionOrder.map((type) => ({
    type,
    zone: capabilities.defaultZoneBySection[type] ?? "main",
  }));
};

export const resolveResumeSectionLayout = (
  templateId: string,
  savedLayout: readonly ResumeSectionPlacement[] | undefined,
): ResumeSectionPlacement[] => {
  const capabilities = getTemplateSectionCapabilities(templateId);
  const defaults = getDefaultResumeSectionLayout(templateId);
  const known = new Set<ResumeSectionType>();
  const resolved = (savedLayout ?? []).flatMap((placement) => {
    if (!resumeSectionTypes.includes(placement.type) || known.has(placement.type)) {
      return [];
    }
    known.add(placement.type);
    const allowed = capabilities.allowedZonesBySection[placement.type] ?? ["main"];
    return [
      {
        type: placement.type,
        zone: allowed.includes(placement.zone) ? placement.zone : (allowed[0] ?? "main"),
      },
    ];
  });
  return [...resolved, ...defaults.filter(({ type }) => !known.has(type))];
};

export const getProfileResumeSectionLayout = (
  profile: Pick<
    ApplicantProfile,
    "resumeSectionLayout" | "resumeSectionLayouts"
  > | undefined,
  templateId: string,
) =>
  resolveResumeSectionLayout(
    templateId,
    profile?.resumeSectionLayouts?.[templateId] ?? profile?.resumeSectionLayout,
  );

export const hasSavedTemplateSectionLayout = (
  profile: Pick<
    ApplicantProfile,
    "resumeSectionLayout" | "resumeSectionLayouts"
  > | undefined,
  templateId: string,
) => Boolean(
  profile?.resumeSectionLayouts?.[templateId]?.length ||
    profile?.resumeSectionLayout?.length,
);

export const isResumeSectionVisible = (
  profile: Pick<ApplicantProfile, "resumeSections"> | undefined,
  type: ResumeSectionType,
) => {
  const visible = profile?.resumeSections;
  if (!visible) return true;
  if (type === "summary") return visible.profile;
  if (type === "strengths" || type === "knowledge") return visible.skills;
  if (type === "experience") return visible.experience;
  if (type === "education") return visible.education;
  if (type === "languages") return visible.languages;
  if (type === "certifications") return visible.certifications;
  return false;
};

export const moveResumeSection = (
  templateId: string,
  current: readonly ResumeSectionPlacement[] | undefined,
  type: ResumeSectionType,
  destination: SectionZone,
  targetIndex: number,
) => {
  const capabilities = getTemplateSectionCapabilities(templateId);
  const allowed = capabilities.allowedZonesBySection[type] ?? ["main"];
  if (!allowed.includes(destination)) return resolveResumeSectionLayout(templateId, current);

  const layout = resolveResumeSectionLayout(templateId, current);
  const sourceIndex = layout.findIndex((item) => item.type === type);
  if (sourceIndex < 0) return layout;
  const withoutSource = layout.filter((item) => item.type !== type);
  const destinationItems = withoutSource.filter((item) => item.zone === destination);
  const beforeDestination = withoutSource.findIndex(
    (item) => item === destinationItems[Math.max(0, Math.min(targetIndex, destinationItems.length))],
  );
  const insertionIndex = beforeDestination < 0 ? withoutSource.length : beforeDestination;
  withoutSource.splice(insertionIndex, 0, { type, zone: destination });
  return withoutSource;
};
