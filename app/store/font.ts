export const FONTS = [
  "geist-mono",
  "ibm-plex-mono",
  "fira-code",
  "soehne-mono",
  "roboto-mono",
  "commit-mono",
] as const;

export type Font = (typeof FONTS)[number];
