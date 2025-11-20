import { atomWithHash } from "jotai-location";

export const FONTS = [
  "jetbrains-mono",
  "geist-mono",
  "ibm-plex-mono",
  "fira-code",
  "soehne-mono",
  "roboto-mono",
  "commit-mono",
] as const;

export type Font = (typeof FONTS)[number];

