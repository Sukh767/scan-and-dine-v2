import { api } from "@scan/api";

/**
 * Shared authentication service.
 *
 * This layer contains ONLY backend communication.
 * No Zustand.
 * No React.
 * No navigation.
 * 
 * These endpoints must match your backend.

    From memory, your backend currently has something close to:

    POST /auth/register
    POST /auth/login
    POST /auth/logout
    POST /auth/verify-email
    POST /auth/resend-verification-email
    POST /auth/forgot-password
    POST /auth/reset-password
    POST /auth/refresh-token
    GET  /auth/me

    If your backend routes differ, do not change the frontend architecture.

    Simply change the endpoint strings inside this file.

    This service is the only place where URLs live.

 */

export const authService = {
  login(payload) {
    return api.post("/auth/login", payload);
  },

  register(payload) {
    return api.post("/auth/register", payload);
  },

  logout() {
    return api.post("/auth/logout");
  },

  refreshSession() {
    return api.post("/auth/refresh-token");
  },

  verifyEmail(token) {
    return api.post("/auth/verify-email", {
      token,
    });
  },

  resendVerificationEmail(email) {
    return api.post("/auth/resend-verification-email", {
      email,
    });
  },

  forgotPassword(email) {
    return api.post("/auth/forgot-password", {
      email,
    });
  },

  resetPassword(payload) {
    return api.post("/auth/reset-password", payload);
  },

  getCurrentUser() {
    return api.get("/auth/me");
  },
};
