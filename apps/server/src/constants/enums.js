/*
|--------------------------------------------------------------------------
| Dining Session Status
|--------------------------------------------------------------------------
*/

export const SESSION_STATUS = Object.freeze({
  ACTIVE: "active",

  COMPLETED: "completed",

  CANCELLED: "cancelled",

  EXPIRED: "expired",
});

export const SESSION_STATUS_VALUES = Object.values(SESSION_STATUS);

/*
|--------------------------------------------------------------------------
| Bill Status
|--------------------------------------------------------------------------
*/

export const BILL_STATUS = Object.freeze({
  OPEN: "open",

  PAYMENT_PENDING: "payment_pending",

  PAID: "paid",

  CLOSED: "closed",

  REFUNDED: "refunded",
});

export const BILL_STATUS_VALUES = Object.values(BILL_STATUS);

/*
|--------------------------------------------------------------------------
| Dining Session Type
|--------------------------------------------------------------------------
*/

export const SESSION_TYPE = Object.freeze({
  DINE_IN: "dine_in",

  TAKEAWAY: "takeaway",

  MIXED: "mixed",
});

export const SESSION_TYPE_VALUES = Object.values(SESSION_TYPE);

/*
|--------------------------------------------------------------------------
| Session Created By
|--------------------------------------------------------------------------
*/

export const SESSION_CREATED_BY = Object.freeze({
  CUSTOMER: "customer",

  RESTAURANT: "restaurant",

  SYSTEM: "system",
});

export const SESSION_CREATED_BY_VALUES = Object.values(SESSION_CREATED_BY);

/*
|--------------------------------------------------------------------------
| Session End Reason
|--------------------------------------------------------------------------
*/

export const SESSION_END_REASON = Object.freeze({
  PAYMENT_COMPLETED: "payment_completed",

  CANCELLED: "cancelled",

  TIMEOUT: "timeout",

  FORCE_CLOSED: "force_closed",
});

export const SESSION_END_REASON_VALUES = Object.values(SESSION_END_REASON);
