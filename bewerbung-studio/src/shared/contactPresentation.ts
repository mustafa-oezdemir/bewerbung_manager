const internationalDigits = (value: string) =>
  value.trim().replace(/^00/, "+").replace(/[^\d+]/g, "");

/** Formats German mobile numbers for display without changing their stored value. */
export const formatPhoneForDisplay = (value = "") => {
  const normalized = internationalDigits(value);
  const digits = normalized.replace(/\D/g, "");

  if (digits.startsWith("49") && /^1\d{9,10}$/.test(digits.slice(2))) {
    return `+49 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  return value.trim();
};

export const externalUrl = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^[a-z][a-z\d+.-]*:(?:\/\/)?/i, "")}`;
};

/** Keeps the URL readable while the complete URL remains the link destination. */
export const formatUrlForDisplay = (value = "") =>
  externalUrl(value).replace(/^https?:\/\//i, "").replace(/\/$/, "");
