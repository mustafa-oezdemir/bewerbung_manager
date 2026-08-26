import type { ApplicantProfile } from "./schema";

export const resolveSelectedProfile = (
  profiles: ApplicantProfile[],
  selectedProfileId?: string,
  applicationProfileId?: string,
) =>
  profiles.find((profile) => profile.id === selectedProfileId) ??
  profiles.find((profile) => profile.id === applicationProfileId) ??
  profiles.find((profile) => profile.isDefault) ??
  profiles[0];
