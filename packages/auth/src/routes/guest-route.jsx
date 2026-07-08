import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks";

/**
 * Protects guest-only routes.
 */
export const GuestRoute = ({
    children,
    redirectTo = "/",
}) => {
    const {
        isAuthenticated,
        isInitializing,
    } = useAuth();

    if (isInitializing) {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};