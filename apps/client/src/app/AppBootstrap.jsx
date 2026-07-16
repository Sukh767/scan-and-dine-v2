import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "@/router";

import { restoreSession, useAuthStore } from "@scan/auth";

import { AppLoader } from "@/shared";

export const AppBootstrap = () => {
  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    restoreSession();
  }, []);

  if (isInitializing) {
    return <AppLoader />;
  }

  return <RouterProvider router={router} />;
};
