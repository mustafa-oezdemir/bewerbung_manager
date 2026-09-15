import { describe, expect, it } from "vitest";
import {
  applicationDateChanged,
  formatApplicationDate,
  formatApplicationDateFolder,
  formatApplicationDateLong,
} from "./applicationDate";

describe("central application date", () => {
  it("uses the selected sent date consistently in content and paths", () => {
    const application = {
      sentAt: "2026-09-08T09:00:00.000Z",
      createdAt: "2026-09-01T09:00:00.000Z",
    };

    expect(formatApplicationDate(application)).toBe("08.09.2026");
    expect(formatApplicationDateLong(application)).toBe("8. September 2026");
    expect(formatApplicationDateFolder(new Date(application.sentAt))).toBe(
      "08.09.2026",
    );
  });

  it("detects a changed selected date and falls back to creation for drafts", () => {
    const draft = {
      sentAt: undefined,
      createdAt: "2026-09-08T09:00:00.000Z",
    };
    const changed = {
      ...draft,
      sentAt: "2026-09-15T09:00:00.000Z",
    };

    expect(formatApplicationDate(draft)).toBe("08.09.2026");
    expect(applicationDateChanged(draft, changed)).toBe(true);
  });
});
