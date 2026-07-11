import { create } from "zustand";

/**
 * Global authentication store.
 *
 * Tokens are NOT stored here.
 * Tokens are managed by @scan/api.
 */

export const useAuthStore = create((set) => ({
  user: null,

  role: null,

  isAuthenticated: false,

  isInitializing: true,

  isLoading: false,

  setUser(user) {
    set({
      user,
      role: user?.role ?? null,
      isAuthenticated: true,
    });
  },

  clearUser() {
    set({
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },

  setLoading(isLoading) {
    set({
      isLoading,
    });
  },

  setInitializing(isInitializing) {
    set({
      isInitializing,
    });
  },
}));
