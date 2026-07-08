export const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

export const RESET_PASSWORD_TOKEN_EXPIRY = 15 * 60 * 1000;

export const ACCESS_TOKEN_EXPIRY = "15m";

export const REFRESH_TOKEN_EXPIRY = "7d";

export const USER_NEXT_STEP = Object.freeze({
  CUSTOMER_HOME: "customer_home",

  RESTAURANT_ONBOARDING: "restaurant_onboarding",

  WAITING_APPROVAL: "waiting_approval",

  RESTAURANT_DASHBOARD: "restaurant_dashboard",

  ADMIN_DASHBOARD: "admin_dashboard",
});

export const USER_NEXT_STEP_VALUES = Object.values(USER_NEXT_STEP);

export const RESTAURANT_NEXT_STEP = Object.freeze({
  WAITING_APPROVAL: "waiting_approval",
});
