import { createRoot } from "react-dom/client";

import "./index.css";

import { App, AppProvider } from "@/app";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
