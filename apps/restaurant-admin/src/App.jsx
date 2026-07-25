import { Routes, Route, Navigate } from "react-router-dom";

// FIX: these were previously imported from "@scan/auth", a workspace
// package that isn't part of this app's source (only apps/restaurant-admin
// was provided) — so this import could never resolve. The guards, the auth
// hook, and the provider all now live locally under @/features/auth and
// @/router/guards and stay in sync with each other.
import GuestRoute from "@/router/guards/GuestRoute";
import ProtectedRoute from "@/router/guards/ProtectedRoute";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";

import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";

import NotFound from "@/pages/NotFound";
import Forbidden from "@/pages/Forbidden";
import Offline from "@/pages/Offline";
import ServerError from "@/pages/ServerError";

import { PreLoader } from "@/components/ui/loader/Loader";
import { ROLES, useAuth } from "@scan/auth";
import RedirectPage from "@/utils/Redirect";

export default function App() {
  const { isInitializing } = useAuth();
  const isOnline = useOnlineStatus();

  return (
    <>
      {/* Driven by session restoration instead of an arbitrary timer, so the
          preloader now actually reflects whether auth state is ready. */}
      <PreLoader show={isInitializing} />

      {!isOnline ? (
        <Routes>
          <Route path="*" element={<Offline />} />
        </Routes>
      ) : (
        <Routes>
          {/* Guest Only */}
          <Route element={<GuestRoute />}>
            <Route path="/auth/*" element={<AuthLayout />} />
          </Route>

          {/* Logged In Users (any authenticated role — see ProtectedRoute) */}
          <Route
            element={<ProtectedRoute allowedRoles={[ROLES.RESTAURANT_OWNER]} />}
          >
            <Route path="/admin/*" element={<AdminLayout />} />
          </Route>

          {/* Error Pages */}
          <Route path="/403" element={<Forbidden />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/offline" element={<Offline />} />

          {/* Root */}
          <Route path="/" element={<RedirectPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
