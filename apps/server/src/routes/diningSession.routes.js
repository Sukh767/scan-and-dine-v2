import { Router } from "express";

import diningSessionController from "../controllers/diningSession.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  startSessionSchema,
  updateGuestCountSchema,
  endSessionSchema,
} from "../validators/diningSession.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Customer
|--------------------------------------------------------------------------
*/

router.post(
  "/start",
  authMiddleware,
  authorize(ROLES.RESTAURANT_OWNER),
  validate(startSessionSchema),
  diningSessionController.startSession,
);

router.get("/:sessionToken", diningSessionController.resumeSession);

/*
|--------------------------------------------------------------------------
| Restaurant
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);

router.use(authorize(ROLES.RESTAURANT_OWNER));

router.get("/", diningSessionController.getSessions);

router.get("/details/:id", diningSessionController.getSession);

router.patch(
  "/:id/guests",
  validate(updateGuestCountSchema),
  diningSessionController.updateGuestCount,
);

router.patch(
  "/:id/end",
  validate(endSessionSchema),
  diningSessionController.endSession,
);

export default router;
