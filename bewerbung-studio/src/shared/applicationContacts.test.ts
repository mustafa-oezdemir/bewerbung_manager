import { describe, expect, it } from "vitest";
import type { Application } from "./schema";
import {
  applicationGreeting,
  applicationPostalContactLines,
} from "./applicationContacts";

const application = {
  contact: {
    salutation: "Frau",
    firstName: "Anna",
    lastName: "Müller",
  },
  additionalContacts: [
    {
      salutation: "Herr",
      firstName: "Mehmet",
      lastName: "Yılmaz",
    },
  ],
} as Application;

describe("application contact formatting", () => {
  it("includes both contacts in the postal recipient lines", () => {
    expect(applicationPostalContactLines(application)).toEqual([
      "Frau Anna Müller",
      "Herrn Mehmet Yılmaz",
    ]);
  });

  it("includes both contacts in the greeting", () => {
    expect(applicationGreeting(application)).toBe(
      "Sehr geehrte Frau Müller, sehr geehrter Herr Yılmaz,",
    );
  });
});
