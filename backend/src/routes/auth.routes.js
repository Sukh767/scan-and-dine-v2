import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import validate from "../middlewares/validate.middleware.js";

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

/**
 * Authentication Routes
 */

router.post("/register", validate(registerSchema), authController.register);

router.get("/verify-email", authController.verifyEmail);

router.post(
  "/resend-verification",
  validate(resendVerificationSchema),
  authController.resendVerificationEmail,
);

router.post("/login", validate(loginSchema), authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

router.get("/me", authMiddleware, authController.getCurrentUser);

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  authController.updateProfile,
);

router.post(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  authController.changePassword
);

export default router;
