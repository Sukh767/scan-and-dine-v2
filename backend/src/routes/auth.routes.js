import { Router } from "express";

import authController from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { registerSchema, resendVerificationSchema } from "../validators/auth.validator.js";

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

export default router;