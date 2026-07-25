import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth, hasRole } from "@scan/auth";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, isInitializing, user } = useAuth();

  const location = useLocation();

  // Wait until restoreSession() completes
  if (isInitializing) {
    return null;
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  // Logged in but wrong role
  if (!hasRole(user, allowedRoles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
