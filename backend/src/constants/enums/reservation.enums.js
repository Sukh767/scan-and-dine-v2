export const RESERVATION_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show",
});

export const RESERVATION_STATUS_VALUES =
  Object.values(RESERVATION_STATUS);

export const VISIT_TYPE = Object.freeze({
  RESERVATION: "reservation",
  WALK_IN: "walk_in",
});

export const VISIT_TYPE_VALUES =
  Object.values(VISIT_TYPE);