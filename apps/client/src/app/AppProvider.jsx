import { QueryProvider } from "@scan/query";
import { AuthProvider } from "@scan/auth";

export const AppProvider = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
