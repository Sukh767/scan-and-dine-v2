import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// import api from "../api/index.js"; // centralized api instance

const useAuthStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
      })),
      {
        name: "auth-storage",
      },
    ),
  ),
);

export default useAuthStore;
