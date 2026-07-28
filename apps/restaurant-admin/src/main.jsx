import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import AppProviders from "./app/AppProviders";

import "@/styles/index.css";
import { ErrorBoundary } from "@/components/error";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProviders>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppProviders>
  </BrowserRouter>,
);
