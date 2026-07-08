import { createContext, useContext, useEffect } from "react";

import { useAuthStore } from "../store";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const setInitializing = useAuthStore(
        (state) => state.setInitializing
    );

    useEffect(() => {
        /**
         * Session restore will be implemented
         * in the next PR.
         */
        setInitializing(false);
    }, [setInitializing]);

    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};