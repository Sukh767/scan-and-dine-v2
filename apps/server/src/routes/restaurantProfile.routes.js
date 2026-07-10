import { Router } from "express";

import restaurantProfileController from "../controllers/restaurantProfile.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import { uploadSingle } from "../middlewares/upload.middleware.js";

import {
  updateRestaurantProfileSchema,
} from "../validators/restaurantProfile.validator.js";

import {
  ROLES,
} from "../constants/index.js";

const router = Router();

/**
 * All Routes Require Authentication
 */
router.use(authMiddleware);

router.use(
  authorize(ROLES.RESTAURANT_OWNER),
);

/**
 * Get Profile
 */
router.get(
  "/",
  restaurantProfileController.getProfile,
);

/**
 * Update Profile
 */
router.patch(
  "/",
  validate(updateRestaurantProfileSchema),
  restaurantProfileController.updateProfile,
);

/**
 * Update Logo
 */
router.patch(
  "/logo",
  uploadSingle({
    fieldName: "logo",
    maxSize: 5 * 1024 * 1024,
  }),
  restaurantProfileController.updateLogo,
);

/**
 * Update Cover
 */
router.patch(
  "/cover",
  uploadSingle({
    fieldName: "coverImage",
    maxSize: 5 * 1024 * 1024,
  }),
  restaurantProfileController.updateCover,
);

export default router;