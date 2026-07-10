import { Router } from "express";

import menuController from "../controllers/menu.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createMenuItemSchema,
  updateMenuItemSchema,
  updateMenuStatusSchema,
  updateAvailabilitySchema,
} from "../validators/menu.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authMiddleware);

router.use(authorize(ROLES.RESTAURANT_OWNER));

router.post("/", validate(createMenuItemSchema), menuController.createMenuItem);

router.get("/", menuController.getMenuItems);

router.get("/:id", menuController.getMenuItem);

router.patch(
  "/:id",
  validate(updateMenuItemSchema),
  menuController.updateMenuItem,
);

router.patch(
  "/:id/status",
  validate(updateMenuStatusSchema),
  menuController.updateStatus,
);

router.patch(
  "/:id/availability",
  validate(updateAvailabilitySchema),
  menuController.updateAvailability,
);

router.delete("/:id", menuController.deleteMenuItem);

export default router;
