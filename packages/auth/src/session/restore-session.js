import { authService } from "../services";
import { useAuthStore } from "../store";

/**
 * Restore authentication session.
 *
 * Runs once during application startup.
 */
export const restoreSession = async () => {
  const { setUser, clearUser, setInitializing } = useAuthStore.getState();

  try {
    const response = await authService.getCurrentUser();

    /**
     * Backend returns:
     *
     * {
     *   success,
     *   message,
     *   data
     * }
     */

    setUser(response.data);
  } catch (error) {
    clearUser();
  } finally {
    setInitializing(false);
  }
};
