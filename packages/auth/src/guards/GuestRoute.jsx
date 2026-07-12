import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks";

export const GuestRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
