import { Navigate } from "react-router-dom";

import { useAuthStore } from "@scan/auth";

export const GuestRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
