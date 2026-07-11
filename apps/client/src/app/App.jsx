import { ErrorBoundary } from "@/shared";

import { AppBootstrap } from "./AppBootstrap";

export const App = () => {
  return (
    <ErrorBoundary>
      <AppBootstrap />
    </ErrorBoundary>
  );
};
