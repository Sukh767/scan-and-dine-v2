import { ThemeProvider } from "@/context/ThemeContext";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

import { AuthProvider } from "@scan/auth";

import { Toaster } from "sonner";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}

          <Toaster richColors closeButton position="bottom-right" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
