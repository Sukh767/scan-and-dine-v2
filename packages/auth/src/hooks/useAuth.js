import { useAuthStore } from "../store/auth.store";

/**
 * Shared authentication hook.
 */
export const useAuth = () => {
  return useAuthStore();
};
