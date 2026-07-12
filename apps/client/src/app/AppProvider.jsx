import { QueryProvider } from "@scan/query";
import { AuthProvider } from "@scan/auth";

import { ThemeProvider } from "@/shared";

export const AppProvider = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
