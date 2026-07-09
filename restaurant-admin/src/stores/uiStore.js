import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useUIStore = create(
  devtools(
    immer((set) => ({
      isCartOpen: false,
      isMobileNavOpen: false,
      isPreloaderDone: false,
      activeModal: null, // modal id string or null
      activeDrawer: null,

      openCart: () =>
        set((s) => {
          s.isCartOpen = true;
        }),
      closeCart: () =>
        set((s) => {
          s.isCartOpen = false;
        }),
      toggleCart: () =>
        set((s) => {
          s.isCartOpen = !s.isCartOpen;
        }),

      openMobileNav: () =>
        set((s) => {
          s.isMobileNavOpen = true;
        }),
      closeMobileNav: () =>
        set((s) => {
          s.isMobileNavOpen = false;
        }),

      setPreloaderDone: () =>
        set((s) => {
          s.isPreloaderDone = true;
        }),
      openModal: (id) =>
        set((s) => {
          s.activeModal = id;
        }),
      closeModal: () =>
        set((s) => {
          s.activeModal = null;
        }),
      openDrawer: (id) =>
        set((s) => {
          s.activeDrawer = id;
        }),
      closeDrawer: () =>
        set((s) => {
          s.activeDrawer = null;
        }),
    })),
    { name: "UIStore" },
  ),
);

export default useUIStore;
