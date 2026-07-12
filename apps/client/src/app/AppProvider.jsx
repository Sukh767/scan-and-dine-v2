import { QueryProvider } from "@scan/query";
import { AuthProvider } from "@scan/auth";

import { ThemeProvider, ToastProvider } from "@/shared";

export const AppProvider = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          {children}

          <ToastProvider />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
