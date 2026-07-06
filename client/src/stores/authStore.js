import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user:         null,
      token:        null,
      refreshToken: null,

      // After login/register
      setAuth: ({ user, token, refreshToken }) =>
        set({ user, token, refreshToken }),

      // Update user profile
      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),

      logout: () =>
        set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: 'sand-auth', // localStorage key
      partialize: (state) => ({
        user:         state.user,
        token:        state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

export default useAuthStore;
