export const GENERAL_MESSAGES = Object.freeze({
  FETCH_SUCCESS: "Data fetched successfully.",
  CREATE_SUCCESS: "Created successfully.",
  UPDATE_SUCCESS: "Updated successfully.",
  DELETE_SUCCESS: "Deleted successfully.",
  VALIDATION_FAILED: "Validation failed.",
  SOMETHING_WENT_WRONG: "Something went wrong.",
  ROUTE_NOT_FOUND: "Requested route not found.",
});

export const AUTH_MESSAGES = Object.freeze({
  // Success
  REGISTER_SUCCESS: "Registration successful.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
  EMAIL_VERIFIED: "Email verified successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",
  PASSWORD_RESET_SUCCESS: "Password reset successfully.",

  // Errors
  EMAIL_ALREADY_EXISTS: "Email is already registered.",
  PHONE_ALREADY_EXISTS: "Phone number is already registered.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  ACCOUNT_NOT_VERIFIED: "Please verify your email.",
  ACCOUNT_DISABLED: "Your account has been disabled.",
  INVALID_TOKEN: "Invalid or expired token.",
  TOKEN_EXPIRED: "Token has expired.",
  UNAUTHORIZED: "Unauthorized access.",
  EMAIL_ALREADY_VERIFIED: "Email is already verified.",
  EMAIL_VERIFICATION_SENT: "Verification email has been sent.",
  VERIFICATION_EMAIL_RESENT: "Verification email sent successfully.",
  USER_NOT_FOUND: "User not found.",

  INVALID_CREDENTIALS: "Invalid email or password.",

  ACCOUNT_NOT_VERIFIED: "Please verify your email before logging in.",

  ACCOUNT_DEACTIVATED: "Your account has been deactivated.",

  LOGIN_SUCCESS: "Login successful.",
  UNAUTHORIZED: "Unauthorized.",
  TOKEN_REFRESHED: "Token refreshed successfully.",
  LOGOUT_SUCCESS: "Logout successful.",
  PASSWORD_RESET_EMAIL_SENT:
    "If an account with that email exists, a password reset link has been sent.",
  RESET_PASSWORD: "Reset your Scan & Dine password",
  PASSWORD_RESET_EMAIL_SENT:
    "If an account with that email exists, a password reset link has been sent.",
  PASSWORD_RESET_SUCCESS: "Password has been reset successfully.",

  INVALID_RESET_TOKEN: "Invalid or expired reset token.",
  UNAUTHORIZED: "Authentication required.",

  ACCESS_TOKEN_MISSING: "Access token is missing.",

  INVALID_ACCESS_TOKEN: "Invalid or expired access token.",
  FORBIDDEN: "You are not authorized to perform this action.",
  PASSWORD_CHANGED: "Password changed successfully. Please login again.",

  INVALID_CURRENT_PASSWORD: "Current password is incorrect.",
});

export const RESTAURANT_AUTH_MESSAGES = Object.freeze({
  REGISTRATION_SUCCESS:
    "Restaurant partner registered successfully. Please verify your email.",

  EMAIL_VERIFIED: "Restaurant partner email verified successfully.",

  LOGIN_SUCCESS: "Restaurant partner logged in successfully.",

  PROFILE_FETCHED: "Restaurant profile fetched successfully.",

  PROFILE_UPDATED: "Restaurant profile updated successfully.",

  LOGO_UPDATED: "Restaurant logo updated successfully.",

  COVER_UPDATED: "Restaurant cover image updated successfully.",
});

export const CATEGORY_MESSAGES = Object.freeze({
  CREATED: "Category created successfully.",
  FETCHED: "Categories fetched successfully.",
  DETAILS_FETCHED: "Category fetched successfully.",
  UPDATED: "Category updated successfully.",
  DELETED: "Category deleted successfully.",
  REORDERED: "Categories reordered successfully.",
  STATUS_UPDATED: "Category status updated successfully.",

  NOT_FOUND: "Category not found.",
  ALREADY_EXISTS: "Category already exists.",
});
