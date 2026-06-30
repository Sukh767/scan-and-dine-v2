export const RESTAURANT_OPERATIONAL_STATUS = Object.freeze({
  OPEN: "open",
  BUSY: "busy",
  CLOSED: "closed",
  MAINTENANCE: "maintenance",
});

export const RESTAURANT_OPERATIONAL_STATUS_VALUES =
  Object.values(RESTAURANT_OPERATIONAL_STATUS);

export const SUBSCRIPTION_PLANS = Object.freeze({
  FREE: "free",
  BASIC: "basic",
  PRO: "pro",
  ENTERPRISE: "enterprise",
});

export const SUBSCRIPTION_PLAN_VALUES =
  Object.values(SUBSCRIPTION_PLANS);

export const SUBSCRIPTION_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  TRIAL: "trial",
});

export const RESTAURANT_APPROVAL_STATUS_VALUES =
  Object.values(RESTAURANT_APPROVAL_STATUS);

export const RESTAURANT_FACILITIES = Object.freeze({
  PARKING: "Parking",
  WIFI: "WiFi",
  AC: "AC",
  ROOFTOP: "Rooftop",
  FAMILY_DINING: "Family Dining",
  LIVE_MUSIC: "Live Music",
  OUTDOOR_SEATING: "Outdoor Seating",
});

export const RESTAURANT_FACILITIES_VALUES =
  Object.values(RESTAURANT_FACILITIES);

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

export const SUBSCRIPTION_STATUS_VALUES =
  Object.values(SUBSCRIPTION_STATUS);