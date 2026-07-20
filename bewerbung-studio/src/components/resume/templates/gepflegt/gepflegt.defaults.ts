/**
 * Gepflegt template default values and design tokens
 * Per z_Gepflegt.md specification - Business-focused sidebar template
 */

export const gepflegtDefaults = {
  // Page dimensions (A4)
  page: {
    widthMm: 210,
    heightMm: 297,
  },

  // Margins (mm) - outer page margins
  margins: {
    topMm: 16,
    rightMm: 17,
    bottomMm: 14,
    leftMm: 17,
  },

  // Sidebar layout (left column with dark teal background)
  sidebar: {
    widthPercentage: 0.295, // 29.5% of page width (~62mm of 210mm)
    minWidthPercentage: 0.27, // 27% minimum per spec
    maxWidthPercentage: 0.31, // 31% maximum per spec
    paddingTopMm: 3,
    paddingRightMm: 3,
    paddingBottomMm: 3,
    paddingLeftMm: 3,
  },

  // Main content area (right column)
  main: {
    paddingTopMm: 3,
    paddingRightMm: 3.5,
    paddingBottomMm: 3,
    paddingLeftMm: 3.5,
  },

  // Header section (name, profession, contact)
  header: {
    paddingBottomMm: 4,
    nameBelowProfessionGapMm: 1.5,
    photoSizeMm: 55, // Square photo in sidebar, 55x55mm
    photoRadiusPercent: 8, // 8px border-radius for slight rounding
  },

  // Spacing
  spacing: {
    sectionGapMm: 5.5, // mm between sections
    entryGapMm: 4, // mm between experience/education entries
    itemGapMm: 1.5, // mm between inline items
  },

  // Colors per z_Gepflegt.md specification
  colors: {
    // Sidebar (linke Farbfläche)
    sidebarBackground: "#087875", // Dark teal/turquoise
    sidebarText: "#FFFFFF", // White text on sidebar

    // Text colors for main content
    heading: "#354147", // Dark gray for headings
    text: "#3F494E", // Medium gray for body text

    // Accent and divider
    accent: "#00B8B5", // Bright turquoise for accents
    divider: "#C7CED1", // Light gray for dividers

    // Background
    pageBackground: "#FFFFFF", // White page background
  },

  // Typography (all sizes in points)
  typography: {
    fontFamily: '"Source Sans 3", "Segoe UI", Arial, sans-serif',

    // Heading sizes
    nameSizePt: 18,
    nameWeight: 750,

    jobTitleSizePt: 12,
    jobTitleWeight: 600,

    sectionTitleSizePt: 11,
    sectionTitleWeight: 750, // Bold for sidebar section titles

    entryTitleSizePt: 10.5,
    entryTitleWeight: 600, // Company/role title

    // Body text
    bodySizePt: 9.2,
    bodyWeight: 400,
    bodyLineHeight: 1.4,

    // Small text (location, meta)
    smallSizePt: 8.4,
    smallWeight: 400,
    smallLineHeight: 1.3,
  },

  // Section defaults (can be reordered in UI)
  sidebar_sections: {
    default_order: [
      "photo",
      "zusammenfassung",
      "sprachen",
      "fähigkeiten",
      "stärken",
    ],
  },

  // Output modes
  output: {
    supportsAtsMode: true,
    supportsVisualMode: true,
    supportsFreeform: true,
  },

  // Multi-page behavior
  multipage: {
    sidebarContinuationMode: "repeat" as const, // 'repeat' | 'first-page-only' | 'compact'
    orphanSectionHeaderLines: 2, // Don't orphan section header at bottom
  },
};

export type GepflegtTemplateDefaults = typeof gepflegtDefaults;
