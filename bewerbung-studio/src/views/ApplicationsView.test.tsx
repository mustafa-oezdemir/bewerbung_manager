import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { defaultDocumentDesign } from "../shared/documentDesign";
import {
  applicationSchema,
  defaultSettings,
  type Workspace,
} from "../shared/schema";
import { ApplicationsView } from "./ApplicationsView";

type MockStoreState = {
  workspace: Workspace;
  selectedApplicationId?: string;
  loading: boolean;
  selectApplication: ReturnType<typeof vi.fn>;
  saveApplication: ReturnType<typeof vi.fn>;
  changeStatus: ReturnType<typeof vi.fn>;
  removeApplication: ReturnType<typeof vi.fn>;
  duplicateApplication: ReturnType<typeof vi.fn>;
  openFolder: ReturnType<typeof vi.fn>;
};

const mockedStore = vi.hoisted(() => ({
  state: undefined as MockStoreState | undefined,
}));

vi.mock("../store/useAppStore", () => ({
  useAppStore: (selector: (state: MockStoreState) => unknown) =>
    selector(mockedStore.state!),
  selectCurrentApplication: (state: MockStoreState) =>
    state.workspace.applications.find(
      (application) => application.id === state.selectedApplicationId,
    ) ?? state.workspace.applications[0],
}));

describe("ApplicationsView", () => {
  it("renders one independent save form for every detail section", () => {
    const now = "2026-08-08T10:00:00.000Z";
    const application = applicationSchema.parse({
      schemaVersion: 1,
      id: "10000000-0000-4000-8000-000000000001",
      folderName: "Beispiel_GmbH_2026-08-08",
      company: {
        name: "Beispiel GmbH",
        city: "Berlin",
      },
      contact: {},
      job: {
        title: "Softwareentwickler",
      },
      status: "Selbst erstellt",
      templateId: "classic-professional",
      accentColor: "#155e58",
      secondaryColor: "#244766",
      designSettings: defaultDocumentDesign,
      documents: {},
      attachmentIds: [],
      statusHistory: [{ at: now, to: "Selbst erstellt" }],
      createdAt: now,
      updatedAt: now,
    });
    const workspace: Workspace = {
      schemaVersion: 1,
      applications: [application],
      profiles: [],
      events: [],
      attachments: [],
      settings: defaultSettings,
      updatedAt: now,
    };
    mockedStore.state = {
      workspace,
      selectedApplicationId: application.id,
      loading: false,
      selectApplication: vi.fn(),
      saveApplication: vi.fn(),
      changeStatus: vi.fn(),
      removeApplication: vi.fn(),
      duplicateApplication: vi.fn(),
      openFolder: vi.fn(),
    };

    const markup = renderToStaticMarkup(<ApplicationsView />);

    expect(markup.match(/<form/g)).toHaveLength(5);
    expect(markup.match(/Bereich speichern/g)).toHaveLength(5);
    expect(markup).toContain("Status &amp; Gestaltung");
    expect(markup).toContain("Unternehmen &amp; Position");
    expect(markup).toContain("Ansprechpartner");
    expect(markup).toContain("Termine");
    expect(markup).toContain("Inhalt");
  });
});
