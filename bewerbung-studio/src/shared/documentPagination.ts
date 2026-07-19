import type {
  ApplicantProfile,
  DocumentDraft,
} from "./schema";
import { ensureKnowledgeSection } from "../features/knowledge/knowledge.service";
import { flattenKnowledgeNames } from "../features/knowledge/knowledge.utils";

export type ResumePageItem =
  | { kind: "experience"; id: string; weight: number }
  | { kind: "education"; id: string; weight: number };

export type ResumePagePlan = {
  pageNumber: 1 | 2;
  items: ResumePageItem[];
  density: "standard" | "compact" | "dense";
};

export type LetterPageStatus = {
  characterCount: number;
  recommendedMaximum: number;
  density: "standard" | "compact" | "dense";
  isOverRecommendedLength: boolean;
};

const FIRST_PAGE_CAPACITY = 30;
const SECOND_PAGE_CAPACITY = 38;
const RECOMMENDED_LETTER_CHARACTERS = 3_300;

const textWeight = (value: string, charactersPerUnit = 95) =>
  Math.max(0, Math.ceil(value.trim().length / charactersPerUnit));

const experienceWeight = (
  experience: ApplicantProfile["experiences"][number],
) =>
  4 +
  textWeight(`${experience.role} ${experience.company}`, 70) +
  experience.achievements.reduce(
    (total, achievement) => total + 1 + textWeight(achievement),
    0,
  );

const educationWeight = (
  education: ApplicantProfile["education"][number],
) => 2 + textWeight(`${education.degree} ${education.institution}`, 80);

const sidebarWeight = (
  profile: ApplicantProfile | undefined,
  resumeProfile: string,
) => {
  if (!profile) return 4;
  const summary = resumeProfile || profile.summary;
  const knowledgeCount = flattenKnowledgeNames(
    ensureKnowledgeSection(profile.knowledgeSection, profile.skills),
  ).length;
  return (
    textWeight(summary, 105) +
    Math.ceil(knowledgeCount / 3) +
    Math.ceil(profile.languages.length / 2) +
    Math.ceil(profile.certifications.length / 2)
  );
};

const densityForWeight = (
  weight: number,
  capacity: number,
): ResumePagePlan["density"] => {
  if (weight > capacity * 1.3) return "dense";
  if (weight > capacity * 0.9) return "compact";
  return "standard";
};

export const createResumePagePlan = (
  profile: ApplicantProfile | undefined,
  resumeProfile = "",
): ResumePagePlan[] => {
  const items: ResumePageItem[] = [
    ...(profile?.experiences ?? []).map(
      (experience): ResumePageItem => ({
        kind: "experience",
        id: experience.id,
        weight: experienceWeight(experience),
      }),
    ),
    ...(profile?.education ?? []).map(
      (education): ResumePageItem => ({
        kind: "education",
        id: education.id,
        weight: educationWeight(education),
      }),
    ),
  ];
  const totalMainWeight = items.reduce((total, item) => total + item.weight, 0);
  const firstPageWeight = Math.max(
    totalMainWeight,
    sidebarWeight(profile, resumeProfile),
  );

  if (firstPageWeight <= FIRST_PAGE_CAPACITY || items.length <= 1) {
    return [
      {
        pageNumber: 1,
        items,
        density: densityForWeight(firstPageWeight, FIRST_PAGE_CAPACITY),
      },
    ];
  }

  const pageOneItems: ResumePageItem[] = [];
  const pageTwoItems: ResumePageItem[] = [];
  let pageOneWeight = 0;

  for (const item of items) {
    if (
      pageOneItems.length === 0 ||
      pageOneWeight + item.weight <= FIRST_PAGE_CAPACITY
    ) {
      pageOneItems.push(item);
      pageOneWeight += item.weight;
    } else {
      pageTwoItems.push(item);
    }
  }

  if (pageTwoItems.length === 0 && pageOneItems.length > 1) {
    pageTwoItems.unshift(pageOneItems.pop()!);
    pageOneWeight = pageOneItems.reduce(
      (total, item) => total + item.weight,
      0,
    );
  }

  const pageTwoWeight = pageTwoItems.reduce(
    (total, item) => total + item.weight,
    0,
  );

  return [
    {
      pageNumber: 1,
      items: pageOneItems,
      density: densityForWeight(
        Math.max(pageOneWeight, sidebarWeight(profile, resumeProfile)),
        FIRST_PAGE_CAPACITY,
      ),
    },
    {
      pageNumber: 2,
      items: pageTwoItems,
      density: densityForWeight(pageTwoWeight, SECOND_PAGE_CAPACITY),
    },
  ];
};

export const getLetterPageStatus = (
  documents: DocumentDraft,
): LetterPageStatus => {
  const characterCount = [
    documents.coverSubject,
    documents.coverIntroduction,
    documents.coverMotivation,
    documents.coverQualification,
    documents.coverCompanyFit,
    documents.coverClosing,
  ].reduce((total, value) => total + value.trim().length, 0);

  return {
    characterCount,
    recommendedMaximum: RECOMMENDED_LETTER_CHARACTERS,
    density:
      characterCount > RECOMMENDED_LETTER_CHARACTERS
        ? "dense"
        : characterCount > 2_500
          ? "compact"
          : "standard",
    isOverRecommendedLength:
      characterCount > RECOMMENDED_LETTER_CHARACTERS,
  };
};
