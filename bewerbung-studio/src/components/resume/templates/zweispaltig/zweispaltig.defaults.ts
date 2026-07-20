export const zweispaltigDefaults = {
  page: {
    widthMm: 210,
    heightMm: 297,
  },
  layout: {
    marginTopMm: 14,
    marginRightMm: 17,
    marginBottomMm: 13,
    marginLeftMm: 17,
    leftColumnRatio: 0.62,
    rightColumnRatio: 0.38,
    rightColumnPaddingLeftMm: 8,
    headerGapMm: 5,
    sectionGapMm: 5.5,
    entryGapMm: 4.5,
    photoSizeMm: 23,
  },
  colors: {
    primary: "#165DAA",
    primaryDark: "#123F72",
    primarySoft: "#EAF2FA",
    heading: "#253746",
    text: "#3F4D59",
    mutedText: "#6B7782",
    divider: "#9DB7D1",
    pageBackground: "#FFFFFF",
  },
  typography: {
    fontFamily:
      '"Source Sans 3", "Segoe UI", Arial, Helvetica, sans-serif',
    nameSizePt: 24,
    professionSizePt: 10.5,
    sectionTitleSizePt: 10.5,
    entryTitleSizePt: 9.7,
    bodySizePt: 8.4,
    smallSizePt: 7.5,
    lineHeight: 1.3,
  },
} as const;

export type ZweispaltigTemplateDefaults = typeof zweispaltigDefaults;
