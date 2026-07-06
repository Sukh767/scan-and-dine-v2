import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useSessionStore = create(
  devtools(
    immer((set) => ({
      session: null,
      orders: [],
      bill: null,

      setSession: (session) =>
        set((s) => {
          s.session = session;
        }),
      setOrders: (orders) =>
        set((s) => {
          s.orders = orders;
        }),
      setBill: (bill) =>
        set((s) => {
          s.bill = bill;
        }),
      addOrder: (order) =>
        set((s) => {
          s.orders.push(order);
        }),
      clearSession: () =>
        set((s) => {
          s.session = null;
          s.orders = [];
          s.bill = null;
        }),
    })),
    { name: "SessionStore" },
  ),
);

export default useSessionStore;
