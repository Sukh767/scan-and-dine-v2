import { useEffect } from "react";

import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
} from "../constants/theme.constants";

//import { useThemeStore } from "../stores/theme.store";
import { useTheme } from "@/shared";

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme, setResolvedTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;

    setTheme(savedTheme);
  }, [setTheme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = () => {
      const activeTheme =
        theme === THEMES.SYSTEM
          ? media.matches
            ? THEMES.DARK
            : THEMES.LIGHT
          : theme;

      document.documentElement.classList.remove(THEMES.LIGHT, THEMES.DARK);

      document.documentElement.classList.add(activeTheme);

      setResolvedTheme(activeTheme);

      localStorage.setItem(THEME_STORAGE_KEY, theme);
    };

    resolveTheme();

    media.addEventListener("change", resolveTheme);

    return () => media.removeEventListener("change", resolveTheme);
  }, [theme, setResolvedTheme]);

  

  return children;
};
