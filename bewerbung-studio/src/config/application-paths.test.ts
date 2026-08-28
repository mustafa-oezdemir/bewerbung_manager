import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_BEWERBUNG_ROOT_PATH,
  resolveApplicationPaths,
  resolveBewerbungRootPath,
} from "./application-paths";

describe("application paths", () => {
  it("uses the requested Windows root by default", () => {
    expect(resolveBewerbungRootPath({})).toBe(
      path.resolve(DEFAULT_BEWERBUNG_ROOT_PATH),
    );
  });

  it("supports one central environment override", () => {
    const root = path.resolve("D:\\custom-bewerbung");
    expect(
      resolveBewerbungRootPath({ BEWERBUNG_ROOT_PATH: root }),
    ).toBe(root);
    const paths = resolveApplicationPaths(root);
    expect(paths.dataRoot).toBe(path.join(root, "data"));
    expect(paths.anschreibenDocuments).toBe(path.join(root, "Anschreiben"));
    expect(paths.lebenslaufDocuments).toBe(path.join(root, "Lebenslauf"));
    expect(paths.zeugnisseArchive).toBe(path.join(root, "Zeugnisse"));
    expect(paths.zertifikateArchive).toBe(path.join(root, "Zertifikate"));
    expect(paths.absagenRoot).toBe(path.join(root, "Absagen"));
    expect(paths.interviewsRoot).toBe(
      path.join(root, "Vorstellungsgespräch"),
    );
  });
});
