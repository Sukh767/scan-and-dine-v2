import { Navigate } from "react-router-dom";
import { useAuth } from "@scan/auth";

export default function RedirectPage() {
  const { isAuthenticated, user } = useAuth();

  // const isRestaurantOwner = user?.role === ROLES.RESTAURANT_OWNER;

  return isAuthenticated ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
}
