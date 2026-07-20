import type {
  ColumnLayout,
  DocumentBackgroundId,
  DocumentFontId,
  ResumeOutputMode,
} from "./documentDesign";

export type TemplateLayout =
  | "centered"
  | "sidebar-right"
  | "minimal"
  | "split-clean"
  | "sidebar-left"
  | "bold-grid";

export type TemplateCategory =
  | "ats"
  | "business"
  | "creative"
  | "creative-professional"
  | "modern"
  | "executive";

export type TemplateDesignDefaults = {
  columnLayout?: ColumnLayout;
  resumeOutputMode?: ResumeOutputMode;
  backgroundId?: DocumentBackgroundId;
  fontId?: DocumentFontId;
  headingFontId?: DocumentFontId;
};

export type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  accent: string;
  secondary: string;
  font: string;
  layout: TemplateLayout;
  features: string[];
  category?: TemplateCategory;
  supportsAtsMode?: boolean;
  supportsPhoto?: boolean;
  supportsFreeform?: boolean;
  sidebarWidthRatio?: number;
  atsInfo?: string;
  designDefaults?: TemplateDesignDefaults;
};

export const templates: TemplateDefinition[] = [
  {
    id: "classic-professional",
    name: "Klar & Zentriert",
    description: "Einspaltig, ruhig und besonders ATS-freundlich.",
    accent: "#123f8c",
    secondary: "#eef4ff",
    font: "Segoe UI",
    layout: "centered",
    features: ["Zentrierter Kopf", "Einspaltig", "ATS-freundlich"],
    category: "ats",
    supportsAtsMode: true,
    supportsPhoto: true,
    designDefaults: {
      columnLayout: "single",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
  {
    id: "modern-sidebar",
    name: "Sidebar Rechts",
    description: "Markante Seitenleiste für Profil, Skills und Sprachen.",
    accent: "#1597ff",
    secondary: "#244766",
    font: "Segoe UI",
    layout: "sidebar-right",
    features: ["Rechte Seitenleiste", "Profilfokus", "Kompakt"],
    category: "modern",
    supportsAtsMode: true,
    supportsPhoto: true,
    designDefaults: {
      columnLayout: "right-sidebar",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
  {
    id: "zweispaltig",
    name: "Zweispaltig",
    description:
      "Klar strukturiertes Zweispalten-Layout mit optionaler ATS-Variante.",
    accent: "#1f4e5f",
    secondary: "#eaf1f4",
    font: "Segoe UI",
    layout: "sidebar-right",
    features: ["Hauptspalte", "Sidebar", "A4-optimiert"],
    category: "business",
    supportsAtsMode: true,
    supportsPhoto: true,
    supportsFreeform: true,
    sidebarWidthRatio: 0.29,
    designDefaults: {
      columnLayout: "template",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
  {
    id: "gepflegt",
    name: "Gepflegt",
    description:
      "Eine raffinierte Lebenslaufvorlage, perfekt für Business Development Manager, Vertriebsleiter und andere kundenorientierte Positionen.",
    accent: "#00B8B5",
    secondary: "#087875",
    font: "Source Sans 3",
    layout: "sidebar-left",
    features: ["Linke Farbfläche", "Business-fokussiert", "ATS-Variante"],
    category: "business",
    supportsAtsMode: true,
    supportsPhoto: true,
    supportsFreeform: true,
    sidebarWidthRatio: 0.3,
    atsInfo:
      "Dieses Template wurde mit verbreiteten ATS-Systemen getestet. Dennoch muss der Inhalt in erster Linie klar, relevant und für Personalverantwortliche leicht erfassbar bleiben.",
    designDefaults: {
      columnLayout: "left-sidebar",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description:
      "Perfekte Lebenslauf-Vorlage mit kreativen Elementen, die Berufserfahrung und Qualifikationen übersichtlich zur Geltung bringt.",
    accent: "#06B6C9",
    secondary: "#C7F1F5",
    font: "Source Sans 3",
    layout: "split-clean",
    features: ["Zwei Spalten", "Türkise Wellen", "Professionell"],
    category: "creative-professional",
    supportsAtsMode: true,
    supportsPhoto: true,
    supportsFreeform: true,
    atsInfo:
      "Modern-Template unterstützt ATS-freundliche Ausgabe mit einspaltigem Layout und entfernten visuellen Elementen.",
    designDefaults: {
      columnLayout: "two-column-equal",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
  {
    id: "minimal-clean",
    name: "Minimal Elegant",
    description: "Viel Weißraum, feine Linien und dezente Typografie.",
    accent: "#263746",
    secondary: "#eef1f3",
    font: "Arial",
    layout: "minimal",
    features: ["Viel Weißraum", "Dezente Linien", "Zeitlos"],
    category: "executive",
    supportsAtsMode: true,
    supportsPhoto: true,
  },
  {
    id: "technical-developer",
    name: "Modern Split",
    description: "Klare Zweiteilung mit starker Kompetenzdarstellung.",
    accent: "#0f4aa0",
    secondary: "#f1f5fb",
    font: "Segoe UI",
    layout: "split-clean",
    features: ["Zwei Spalten", "Skill-Chips", "Modern"],
    category: "modern",
    supportsAtsMode: true,
    supportsPhoto: true,
  },
  {
    id: "executive-dark",
    name: "Sidebar Links",
    description: "Farbige linke Bühne für Senior- und Kreativprofile.",
    accent: "#16b8b5",
    secondary: "#087573",
    font: "Segoe UI",
    layout: "sidebar-left",
    features: ["Linke Seitenleiste", "Starke Farbe", "Foto-Platzhalter"],
    category: "executive",
    supportsAtsMode: true,
    supportsPhoto: true,
  },
  {
    id: "creative-accent",
    name: "Bold Grid",
    description:
      "Kräftige Überschriften und ein strukturiertes Zweispaltenraster.",
    accent: "#0d3e91",
    secondary: "#edf4ff",
    font: "Arial",
    layout: "bold-grid",
    features: ["Kräftige Titel", "Zweispaltenraster", "Dynamisch"],
    category: "creative",
    supportsAtsMode: true,
    supportsPhoto: true,
  },
  {
    id: "tabellarisch",
    name: "Tabellarisch",
    description:
      "Modernes Timeline-Design für erfahrene Profis mit vertikalen Erfahrungs- und Ausbildungs-Zeitleisten.",
    accent: "#c78300",
    secondary: "#17263d",
    font: "Source Sans 3",
    layout: "split-clean",
    features: ["Timeline", "Berufserfahrung", "Zeitgenössisch"],
    category: "modern",
    supportsAtsMode: true,
    supportsPhoto: true,
    supportsFreeform: true,
    atsInfo:
      "Tabellarisch-Template unterstützt ATS-Modus mit einspaltigem Layout und ausgeblendeten Designelementen wie Timeline-Grafiken.",
    designDefaults: {
      columnLayout: "single",
      resumeOutputMode: "visual",
      backgroundId: "white",
      fontId: "source-sans",
      headingFontId: "source-sans",
    },
  },
];

export const colorPresets = [
  { id: "blue", name: "Blau", accent: "#2474d2", secondary: "#294d73" },
  { id: "gray", name: "Grau", accent: "#68747c", secondary: "#38434a" },
  { id: "green", name: "Grün", accent: "#2d9b67", secondary: "#246547" },
  { id: "orange", name: "Orange", accent: "#ee7b24", secondary: "#9d4616" },
  { id: "purple", name: "Violett", accent: "#8a5bc3", secondary: "#51366f" },
  { id: "turquoise", name: "Türkis", accent: "#18b7b3", secondary: "#087573" },
  { id: "navy", name: "Nachtblau", accent: "#1597ff", secondary: "#244766" },
  { id: "gold", name: "Gold", accent: "#bd8b1e", secondary: "#6f5317" },
  { id: "black", name: "Schwarz", accent: "#343a40", secondary: "#171b1e" },
  { id: "red", name: "Rot", accent: "#d44848", secondary: "#8e242b" },
] as const;

export const getTemplate = (id: string) =>
  templates.find((template) => template.id === id) ?? templates[0];

export const getReadableTextColor = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return "#ffffff";
  }

  const channels = [0, 2, 4].map(
    (offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255,
  );
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  return luminance > 0.46 ? "#26313a" : "#ffffff";
};
