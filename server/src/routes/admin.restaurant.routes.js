import { Router } from "express";

import adminRestaurantController from "../controllers/admin.restaurant.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  approveRestaurantSchema,
  rejectRestaurantSchema,
} from "../validators/adminRestaurant.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);

router.use(authorize(ROLES.PLATFORM_ADMIN));

/*
|--------------------------------------------------------------------------
| Restaurant Approval
|--------------------------------------------------------------------------
*/

/**
 * GET /admin/restaurants/pending
 */
router.get("/pending", adminRestaurantController.getPendingRestaurants);

/**
 * GET /admin/restaurants/:id
 */
router.get("/:id", adminRestaurantController.getRestaurantById);

/**
 * PATCH /admin/restaurants/:id/approve
 */
router.patch(
  "/:id/approve",
  validate(approveRestaurantSchema),
  adminRestaurantController.approveRestaurant,
);

/**
 * PATCH /admin/restaurants/:id/reject
 */
router.patch(
  "/:id/reject",
  validate(rejectRestaurantSchema),
  adminRestaurantController.rejectRestaurant,
);

export default router;
