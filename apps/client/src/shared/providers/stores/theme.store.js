import { create } from "zustand";

import { DEFAULT_THEME } from "../constants";

export const useThemeStore = create((set) => ({
  theme: DEFAULT_THEME,

  resolvedTheme: "light",

  setTheme: (theme) =>
    set({
      theme,
    }),

  setResolvedTheme: (resolvedTheme) =>
    set({
      resolvedTheme,
    }),
}));
