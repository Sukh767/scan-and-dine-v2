import baseConfig from "../tailwind.config.base.js";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  ...baseConfig,

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [],
};
