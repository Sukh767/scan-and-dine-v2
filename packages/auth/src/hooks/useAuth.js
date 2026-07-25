import { useAuthStore } from "../store";
import { authService } from "../services";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isInitializing,
    isLoading,
    setUser,
    clearUser,
    setLoading,
  } = useAuthStore();

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

  const forgotPassword = async (payload) => {
    return authService.forgotPassword(payload);
  };

  const resetPassword = async (payload) => {
    return authService.resetPassword(payload);
  };

  return {
    user,
    isAuthenticated,
    isInitializing,
    isLoading,

    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };
};
