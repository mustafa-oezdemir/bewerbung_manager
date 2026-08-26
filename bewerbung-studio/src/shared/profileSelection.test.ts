import { describe, expect, it } from "vitest";
import type { ApplicantProfile } from "./schema";
import { resolveSelectedProfile } from "./profileSelection";

const profile = (
  id: string,
  firstName: string,
  isDefault = false,
): ApplicantProfile =>
  ({ id, firstName, isDefault }) as ApplicantProfile;

describe("resolveSelectedProfile", () => {
  const defaultProfile = profile("default", "Standard", true);
  const applicationProfile = profile("application", "Bewerbung");
  const selectedProfile = profile("selected", "Ausgewählt");
  const profiles = [defaultProfile, applicationProfile, selectedProfile];

  it("uses the profile explicitly selected by the user", () => {
    expect(
      resolveSelectedProfile(profiles, selectedProfile.id, applicationProfile.id),
    ).toBe(selectedProfile);
  });

  it("falls back to the profile assigned to the application", () => {
    expect(resolveSelectedProfile(profiles, undefined, applicationProfile.id)).toBe(
      applicationProfile,
    );
  });

  it("falls back to the default profile for an unknown selection", () => {
    expect(resolveSelectedProfile(profiles, "missing", "also-missing")).toBe(
      defaultProfile,
    );
  });
});
