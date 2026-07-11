import { useEffect } from "react";

import { restoreSession } from "../session";

export const AuthProvider = ({ children }) => {
    useEffect(() => {
        restoreSession();
    }, []);

    return children;
};