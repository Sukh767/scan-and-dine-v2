import { Navigate } from "react-router-dom";

import { useAuthStore } from "@scan/auth";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
