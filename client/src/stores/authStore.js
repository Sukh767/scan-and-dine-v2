import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import api from "../api"; // local api instance

const useAuthStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // State
        user: null,
        token: null,
        isLoading: false,
        isLoggedIn: false,

        // Actions
        login: async (credentials) => {
          set((s) => {
            s.isLoading = true;
          });
          try {
            const { data } = await api.post("/auth/login", credentials);
            set((s) => {
              s.user = data.user;
              s.token = data.token;
              s.isLoggedIn = true;
              s.isLoading = false;
            });
            localStorage.setItem("token", data.token);
            return data.user;
          } catch (err) {
            set((s) => {
              s.isLoading = false;
            });
            throw err;
          }
        },

        register: async (payload) => {
          set((s) => {
            s.isLoading = true;
          });
          try {
            const { data } = await api.post("/auth/register", payload);
            set((s) => {
              s.user = data.user;
              s.token = data.token;
              s.isLoggedIn = true;
              s.isLoading = false;
            });
            localStorage.setItem("token", data.token);
            return data.user;
          } catch (err) {
            set((s) => {
              s.isLoading = false;
            });
            throw err;
          }
        },

        logout: () => {
          localStorage.removeItem("token");
          set((s) => {
            s.user = null;
            s.token = null;
            s.isLoggedIn = false;
          });
        },

        setUser: (user) =>
          set((s) => {
            s.user = user;
          }),
        hydrate: async () => {
          const token = localStorage.getItem("token");
          if (!token) return;
          try {
            const { data } = await api.get("/auth/me");
            set((s) => {
              s.user = data;
              s.token = token;
              s.isLoggedIn = true;
            });
          } catch {
            localStorage.removeItem("token");
          }
        },
      })),
      {
        name: "auth-storage",
        partialize: (s) => ({ token: s.token, user: s.user }),
      },
    ),
    { name: "AuthStore" },
  ),
);

export default useAuthStore;
