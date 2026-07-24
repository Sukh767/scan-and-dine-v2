import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
  optimizeDeps: {
    // Pre-bundle apexcharts so it plays nicely with Vite's ESM dev server
    include: ["apexcharts", "react-apexcharts"],
  },
  define: {
    // Some libraries (e.g. apexcharts) probe `global` — map it to window in the browser
    global: "window",
  },
});
