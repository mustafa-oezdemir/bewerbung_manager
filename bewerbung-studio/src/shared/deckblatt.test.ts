import { describe, expect, it } from "vitest";
import { profileSchema } from "./schema";
import {
  getDeckblattCompetencies,
  getDeckblattContacts,
} from "./deckblatt";

const profile = profileSchema.parse({
  id: "1b10551c-b442-4ed1-ae64-386a581eb3d5",
  isDefault: true,
  firstName: "Mina",
  lastName: "Kaya",
  street: "Musterstraße 1",
  postalCode: "10115",
  city: "Berlin",
  country: "Deutschland",
  phone: "+49 30 123456",
  email: "mina@example.com",
  linkedin: "linkedin.com/in/mina-kaya",
  github: "github.com/minakaya",
  portfolio: "mina.example.com",
  skills: ["TypeScript – Sehr gute Kenntnisse", "React", "TypeScript"],
  updatedAt: "2026-09-03T18:00:00.000Z",
});

describe("Deckblatt data", () => {
  it("uses provided contact details and concise, unique competencies", () => {
    expect(getDeckblattContacts(profile)).toEqual(
      expect.arrayContaining([
        { label: "Adresse", value: "Musterstraße 1, 10115 Berlin" },
        {
          label: "E-Mail",
          value: "mina@example.com",
          href: "mailto:mina@example.com",
        },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/mina-kaya",
          href: "https://linkedin.com/in/mina-kaya",
        },
      ]),
    );
    expect(getDeckblattCompetencies(profile)).toEqual(["TypeScript", "React"]);
  });
});
