import { describe, expect, it } from "vitest";
import type { Application } from "../shared/schema";
import { searchApplications } from "./applicationSearch";

const application = {
  company: { name: "Münchner Verkehrsgesellschaft", city: "München" },
  job: { title: "Softwareentwickler" },
  status: "Vorstellungsgespräch",
} as Application;

describe("application search", () => {
  it.each([
    "münchner",
    "SOFTWARE",
    "münchen",
    "vorstellung",
  ])("matches %s across the searchable application fields", (query) => {
    expect(searchApplications([application], query)).toEqual([application]);
  });

  it("returns no result for an unrelated query", () => {
    expect(searchApplications([application], "Hamburg")).toEqual([]);
  });
});
