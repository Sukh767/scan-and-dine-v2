import React from "react";
import ReactDOM from "react-dom/client";

import { App, AppProvider } from "@/app";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
