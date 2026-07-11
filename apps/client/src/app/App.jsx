import { RouterProvider } from "react-router-dom";

import { router } from "@/router";
import { ErrorBoundary } from "@/shared";

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
