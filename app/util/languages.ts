export type Language = {
  name: string;
  src: () => Promise<any>;
};

export const LANGUAGES: { [index: string]: Language } = {
  javascript: {
    name: "JavaScript",
    src: () => import("shiki/langs/javascript.mjs"),
  },
  tsx: {
    name: "TSX",
    src: () => import("shiki/langs/tsx.mjs"),
  },
  swift: {
    name: "Swift",
    src: () => import("shiki/langs/swift.mjs"),
  },
  python: {
    name: "Python",
    src: () => import("shiki/langs/python.mjs"),
  },
};
