export const NOTIFICATION_TYPE = Object.freeze({
  ORDER: "order",
  PAYMENT: "payment",
  RESERVATION: "reservation",
  OFFER: "offer",
  SYSTEM: "system",
});

export const NOTIFICATION_TYPE_VALUES =
  Object.values(NOTIFICATION_TYPE);

export const NOTIFICATION_CHANNEL = Object.freeze({
  IN_APP: "in_app",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
});

export const NOTIFICATION_CHANNEL_VALUES =
  Object.values(NOTIFICATION_CHANNEL);