import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useCartStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // State
        items: [], // CartItem[]
        sessionId: null, // active dining session
        restaurantId: null,

        // Computed (call these as functions)
        total: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
        itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),

        // Actions
        addItem: (item) =>
          set((s) => {
            const idx = s.items.findIndex(
              (i) => i.menuItemId === item.menuItemId,
            );
            if (idx >= 0) s.items[idx].quantity++;
            else s.items.push({ ...item, quantity: 1 });
          }),

        removeItem: (menuItemId) =>
          set((s) => {
            s.items = s.items.filter((i) => i.menuItemId !== menuItemId);
          }),

        updateQty: (menuItemId, qty) =>
          set((s) => {
            const idx = s.items.findIndex((i) => i.menuItemId === menuItemId);
            if (idx >= 0) {
              if (qty <= 0) s.items.splice(idx, 1);
              else s.items[idx].quantity = qty;
            }
          }),

        clearCart: () =>
          set((s) => {
            s.items = [];
            s.sessionId = null;
            s.restaurantId = null;
          }),

        setSession: (sessionId, restaurantId) =>
          set((s) => {
            s.sessionId = sessionId;
            s.restaurantId = restaurantId;
          }),
      })),
      { name: "cart-storage" },
    ),
    { name: "CartStore" },
  ),
);

export default useCartStore;
