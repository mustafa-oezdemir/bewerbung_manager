import type { ApplicantProfile } from "./schema";

export type DeckblattContact = {
  label: string;
  value: string;
  href?: string;
};

const externalHref = (value: string) =>
  /^https?:\/\//i.test(value) ? value : `https://${value}`;

export const getDeckblattContacts = (
  profile: ApplicantProfile | undefined,
): DeckblattContact[] => {
  if (!profile) return [];

  const address = [profile.street, `${profile.postalCode} ${profile.city}`.trim()]
    .filter(Boolean)
    .join(", ");
  return [
    address ? { label: "Adresse", value: address } : undefined,
    profile.phone
      ? {
          label: "Telefon",
          value: profile.phone,
          href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
        }
      : undefined,
    profile.email
      ? { label: "E-Mail", value: profile.email, href: `mailto:${profile.email}` }
      : undefined,
    profile.linkedin
      ? {
          label: "LinkedIn",
          value: profile.linkedin,
          href: externalHref(profile.linkedin),
        }
      : undefined,
    profile.github
      ? { label: "GitHub", value: profile.github, href: externalHref(profile.github) }
      : undefined,
    profile.portfolio
      ? {
          label: "Website",
          value: profile.portfolio,
          href: externalHref(profile.portfolio),
        }
      : undefined,
  ].filter((contact): contact is DeckblattContact => Boolean(contact));
};

export const getDeckblattCompetencies = (
  profile: ApplicantProfile | undefined,
) =>
  Array.from(
    new Set(
      (profile?.skills ?? [])
        .map((skill) => skill.split(/\s+(?:-|–|—|:)\s+/)[0].trim())
        .filter(Boolean),
    ),
  ).slice(0, 6);
