import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { loginSchema, registerSchema, resendVerificationSchema } from "../validators/auth.validator.js";

const router = Router();

/**
 * Authentication Routes
 */

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.get(
  "/verify-email",
  authController.verifyEmail
);

router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  authController.resendVerificationEmail
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

router.post(
  "/refresh-token",
  authController.refreshToken
);

router.post(
  "/logout",
  authController.logout
);
export default router;