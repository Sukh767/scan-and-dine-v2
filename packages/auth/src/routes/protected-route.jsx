import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

/**
 * Protects authenticated routes.
 */
export const ProtectedRoute = ({
    children,
    redirectTo = "/login",
}) => {
    const {
        isAuthenticated,
        isInitializing,
    } = useAuth();

    if (isInitializing) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};