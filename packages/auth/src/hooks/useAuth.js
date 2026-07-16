import { useAuthStore } from "../store";
import { authService } from "../services";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, clearUser, setLoading } =
    useAuthStore();

  const login = async (payload) => {
    try {
      setLoading(true);

      const response = await authService.login(payload);

      if (response.success) {
        setUser(response.data);
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    return authService.register(payload);
  };

  const logout = async () => {
    await authService.logout();

    clearUser();
  };

  return {
    user,
    isAuthenticated,
    isLoading,

    login,
    register,
    logout,
  };
};
