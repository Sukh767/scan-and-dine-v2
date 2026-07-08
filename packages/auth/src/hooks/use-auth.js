import { useAuthStore } from "../store";

/**
 * Shared authentication hook.
 */
export const useAuth = () => {
  return useAuthStore();
};
