export const RESTAURANT_OPERATIONAL_STATUS = Object.freeze({
  OPEN: "open",
  BUSY: "busy",
  CLOSED: "closed",
  MAINTENANCE: "maintenance",
});

export const RESTAURANT_OPERATIONAL_STATUS_VALUES = Object.values(
  RESTAURANT_OPERATIONAL_STATUS,
);

export const SUBSCRIPTION_PLANS = Object.freeze({
  FREE: "free",
  BASIC: "basic",
  PRO: "pro",
  ENTERPRISE: "enterprise",
});

export const SUBSCRIPTION_PLAN_VALUES = Object.values(SUBSCRIPTION_PLANS);

export const SUBSCRIPTION_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  TRIAL: "trial",
});

export const RESTAURANT_FACILITIES = Object.freeze({
  PARKING: "Parking",
  WIFI: "WiFi",
  AC: "AC",
  ROOFTOP: "Rooftop",
  FAMILY_DINING: "Family Dining",
  LIVE_MUSIC: "Live Music",
  OUTDOOR_SEATING: "Outdoor Seating",
});

export const RESTAURANT_FACILITIES_VALUES = Object.values(
  RESTAURANT_FACILITIES,
);

export const RESTAURANT_APPROVAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const RESTAURANT_PRICE_RANGE = {
  LOW: "₹",
  MEDIUM: "₹₹",
  HIGH: "₹₹₹",
  PREMIUM: "₹₹₹₹",
};

export const SUBSCRIPTION_STATUS_VALUES = Object.values(SUBSCRIPTION_STATUS);

export const RESTAURANT_APPROVAL_STATUS_VALUES = Object.values(
  RESTAURANT_APPROVAL_STATUS,
);

/*
|--------------------------------------------------------------------------
| Restaurant Staff Roles
|--------------------------------------------------------------------------
*/

export const RESTAURANT_STAFF_ROLES = Object.freeze({
  OWNER: "owner",
  MANAGER: "manager",
  WAITER: "waiter",
  CASHIER: "cashier",
  KITCHEN: "kitchen",
});

export const RESTAURANT_STAFF_ROLE_VALUES = Object.values(
  RESTAURANT_STAFF_ROLES,
);

/*
|--------------------------------------------------------------------------
| Staff Invitation Status
|--------------------------------------------------------------------------
*/

export const STAFF_INVITATION_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
});

export const STAFF_INVITATION_STATUS_VALUES = Object.values(
  STAFF_INVITATION_STATUS,
);

export const RESTAURANT_MESSAGES = Object.freeze({
  CREATED: "Restaurant registration submitted successfully.",

  ALREADY_EXISTS: "You already own a restaurant.",

  EMAIL_EXISTS: "Restaurant email already exists.",

  PHONE_EXISTS: "Restaurant phone already exists.",

  LOGO_REQUIRED: "Restaurant logo is required.",

  NOT_FOUND: "Restaurant not found.",

  UPDATED: "Restaurant updated successfully.",

  APPROVED: "Restaurant approved successfully.",

  REJECTED: "Restaurant rejected successfully.",

  ALREADY_APPROVED: "Restaurant is already approved.",

  INVALID_APPROVAL_STATE: "Restaurant cannot be approved in its current state.",

  NOT_FOUND: "Restaurant not found.",

  ALREADY_REJECTED: "Restaurant is already rejected.",

  INVALID_REJECTION_STATE:
    "Restaurant cannot be rejected in its current state.",
  PENDING_FETCHED: "Pending restaurants fetched successfully.",

  FETCHED_SUCCESS: "Restaurant fetched successfully.",

  APPROVED_SUCCESS: "Restaurant approved successfully.",

  REJECTED_SUCCESS: "Restaurant rejected successfully.",

  RESTAURANT_CREATED: "Restaurant registration received",

  RESTAURANT_APPROVED: "🎉 Your restaurant has been approved",

  RESTAURANT_REJECTED: "Restaurant verification update",

  CLOSED: "Restaurant is currently closed.",

  BUSY: "Restaurant is currently busy.",

  MAINTENANCE: "Restaurant is under maintenance.",

  UNAVAILABLE: "Restaurant is currently unavailable.",
});
