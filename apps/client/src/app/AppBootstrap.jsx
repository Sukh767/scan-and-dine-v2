import { RouterProvider } from "react-router-dom";

import { router } from "@/router";
// import { AppLoader } from "@/shared";

export const AppBootstrap = () => {
  /**
   * Future Startup Pipeline
   *
   * - Restore Theme
   * - Restore Session
   * - Fetch Current User
   * - Initialize App
   */

  const isInitializing = false;

  if (isInitializing) {
    // return <AppLoader />;
  }

  return <RouterProvider router={router} />;
};
