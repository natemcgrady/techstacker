import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomWithStorage } from "jotai/utils";
import { Font } from "./font";

export type Theme = {
  id: string;
  name: string;
  background: {
    from: string;
    to: string;
  };
  icon?: string;
  iconUrl?: string;
  font?: Font;
  partner?: boolean;
  hidden?: boolean;
};

export const THEMES: { [index: string]: Theme } = {
  noir: {
    id: "noir",
    name: "Noir",
    background: {
      from: "#B1B1B1",
      to: "#181818",
    },
  },
  ice: {
    id: "ice",
    name: "Ice",
    background: {
      from: "#fff",
      to: "#80deea",
    },
  },
  sand: {
    id: "sand",
    name: "Sand",
    background: {
      from: "#EED5B6",
      to: "#AF8856",
    },
  },
  forest: {
    id: "forest",
    name: "Forest",
    background: {
      from: "#506853",
      to: "#213223",
    },
  },
  mono: {
    id: "mono",
    name: "Mono",
    background: {
      from: "#333",
      to: "#181818",
    },
  },
  breeze: {
    id: "breeze",
    name: "Breeze",
    background: {
      from: "#CF2F98",
      to: "#6A3DEC",
    },
  },
  candy: {
    id: "candy",
    name: "Candy",
    background: {
      from: "#A58EFB",
      to: "#E9BFF8",
    },
  },
  crimson: {
    id: "crimson",
    name: "Crimson",
    background: {
      from: "#FF6363",
      to: "#733434",
    },
  },
  falcon: {
    id: "falcon",
    name: "Falcon",
    background: {
      from: "#BDE3EC",
      to: "#363654",
    },
  },
  meadow: {
    id: "meadow",
    name: "Meadow",
    background: {
      from: "#59D499",
      to: "#A0872D",
    },
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    background: {
      from: "#4CC8C8",
      to: "#202033",
    },
  },
  raindrop: {
    id: "raindrop",
    name: "Raindrop",
    background: {
      from: "#8EC7FB",
      to: "#1C55AA",
    },
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    background: {
      from: "#FFCF73",
      to: "#FF7A2F",
    },
  },
};

const themeAtom = atomWithHash<Theme>(
  "theme",
  (() => {
    if (typeof window !== "undefined") {
      try {
        // Check if theme is stored in localStorage
        const codeTheme = localStorage.getItem("codeTheme");
        if (codeTheme && codeTheme in THEMES) {
          return THEMES[codeTheme as keyof typeof THEMES];
        }
      } catch (error) {
        console.log("Could not get theme from localStorage", error);
      }
    }
    return THEMES.candy; // Fallback to default theme
  })(),
  {
    serialize(value) {
      return (
        Object.keys(THEMES).find(
          (key) => THEMES[key].name.toLowerCase() === value.name.toLowerCase()
        ) || ""
      );
    },
    deserialize(key) {
      if (key && key in THEMES) {
        try {
          localStorage.setItem("codeTheme", key);
        } catch (error) {
          console.log("Could not set theme in localStorage", error);
        }
        return THEMES[key as keyof typeof THEMES];
      } else {
        return THEMES.candy;
      }
    },
  }
);

const themeCSSAtom = () => "dark";

const themeBackgroundAtom = atom<string>((get) => {
  const { from, to } = get(themeAtom).background;
  return `linear-gradient(140deg, ${from}, ${to})`;
});

const unlockedThemesAtom = atomWithStorage<Theme["id"][]>("unlockedThemes", []);

export { themeAtom, themeCSSAtom, themeBackgroundAtom, unlockedThemesAtom };
