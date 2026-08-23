export const cefrLanguageLevels = [
  { value: "A1", label: "A1 – Anfänger" },
  { value: "A2", label: "A2 – Grundlegende Kenntnisse" },
  { value: "B1", label: "B1 – Fortgeschrittene Sprachverwendung" },
  { value: "B2", label: "B2 – Selbstständige Sprachverwendung" },
  { value: "C1", label: "C1 – Fachkundige Sprachkenntnisse" },
  { value: "C2", label: "C2 – Annähernd muttersprachlich" },
] as const;

export type CefrLanguageLevel = (typeof cefrLanguageLevels)[number]["value"];

export const cefrLanguageLevelCount = cefrLanguageLevels.length;

const defaultCefrLevel: CefrLanguageLevel = "B1";

export const getCefrLanguageLevel = (level: string): CefrLanguageLevel => {
  const normalized = level.trim().toLocaleLowerCase("de-DE");
  const exactLevel = normalized.match(/(?:^|\s)(a1|a2|b1|b2|c1|c2)(?:\s|$)/i)?.[1];
  if (exactLevel) return exactLevel.toLocaleUpperCase("de-DE") as CefrLanguageLevel;
  if (/muttersprache|native/.test(normalized)) return "C2";
  if (/verhandlung|fließ|fliess|fachkund/.test(normalized)) return "C1";
  if (/fortgeschritten|advanced|erweitert|versiert/.test(normalized)) return "B2";
  if (/gut|mittelstufe/.test(normalized)) return "B1";
  if (/grundkennt/.test(normalized)) return "A2";
  if (/anfänger|anfaenger|einsteiger|beginner/.test(normalized)) return "A1";
  return defaultCefrLevel;
};

export const getLanguageLevelScore = (level: string) =>
  cefrLanguageLevels.findIndex(
    (entry) => entry.value === getCefrLanguageLevel(level),
  ) + 1;

export const getCefrLevelByScore = (score: number): CefrLanguageLevel => {
  const safeIndex = Math.max(
    0,
    Math.min(cefrLanguageLevelCount - 1, Math.round(score) - 1),
  );
  return cefrLanguageLevels[safeIndex].value;
};

export const parseLanguageEntry = (raw: string) => {
  const normalized = raw.trim();
  const match = normalized.match(/^(.*?)\s+[–—-]\s+(.*)$/);
  const name = match?.[1]?.trim() || normalized;
  const level = match?.[2]?.trim() ?? "";
  return { raw: normalized, name, level };
};

export const formatLanguageEntry = (
  name: string,
  level: CefrLanguageLevel,
) => {
  const normalizedName = name.trim();
  return normalizedName ? `${normalizedName} – ${level}` : "";
};
