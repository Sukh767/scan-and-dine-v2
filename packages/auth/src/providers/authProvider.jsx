import { useEffect } from "react";

import { sessionManager } from "../session";

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    void sessionManager.restore();
  }, []);

  return children;
};
