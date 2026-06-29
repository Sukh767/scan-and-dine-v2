export const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  PREPARING: "preparing",
  READY: "ready",
  SERVED: "served",
  CANCELLED: "cancelled",
});

export const ORDER_STATUS_VALUES =
  Object.values(ORDER_STATUS);

export const ORDER_ITEM_STATUS = Object.freeze({
  PENDING: "pending",
  PREPARING: "preparing",
  READY: "ready",
  SERVED: "served",
});

export const ORDER_ITEM_STATUS_VALUES =
  Object.values(ORDER_ITEM_STATUS);