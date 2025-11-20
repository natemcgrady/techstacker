import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import type { Highlighter } from "shiki";

export const windowWidthAtom = atomWithHash<number | null>("width", null);

export const showBackgroundAtom = atomWithHash<boolean>("background", true);

export const fileNameAtom = atomWithHash<string>("title", "", {
  serialize(val) {
    return val;
  },
  deserialize(str) {
    return str || "";
  },
});

export const highlighterAtom = atom<Highlighter | null>(null);

export * from "./selectedTools";
