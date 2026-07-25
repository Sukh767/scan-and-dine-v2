import { Navigate, Outlet } from "react-router-dom";
import { ROLES, useAuth } from "@scan/auth";

export default function GuestRoute() {
  const { isAuthenticated, isInitializing, user } = useAuth();

  if (isInitializing) {
    return null;
  }

  if (isAuthenticated && user?.role === ROLES.RESTAURANT_OWNER) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
