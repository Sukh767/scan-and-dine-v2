import typographyPlugin from "@tailwindcss/typography";
import formsPlugin from "@tailwindcss/forms";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";

import {
  colors,
  typography,
  spacing,
  radius,
} from "../packages/ui/src/tokens/index.js";

export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },

        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        dark: colors.dark,
        surface: colors.surface,
        text: colors.text,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        status: colors.status,
      },

      fontFamily: typography.fonts,
      fontSize: typography.scale,
      borderRadius: radius,
      spacing,
    },
  },

  plugins: [typographyPlugin, formsPlugin, aspectRatioPlugin],
};
