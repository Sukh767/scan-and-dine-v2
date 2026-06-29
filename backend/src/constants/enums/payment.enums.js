export const PAYMENT_METHOD = Object.freeze({
  CASH: "cash",
  CARD: "card",
  UPI: "upi",
  NET_BANKING: "net_banking",
  WALLET: "wallet",
});

export const PAYMENT_METHOD_VALUES =
  Object.values(PAYMENT_METHOD);

export const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
});

export const PAYMENT_STATUS_VALUES =
  Object.values(PAYMENT_STATUS);

export const PAYMENT_SOURCE = Object.freeze({
  CUSTOMER_APP: "customer_app",
  RESTAURANT_COUNTER: "restaurant_counter",
  UPI_QR: "upi_qr",
  GATEWAY: "gateway",
});

export const PAYMENT_SOURCE_VALUES =
  Object.values(PAYMENT_SOURCE);