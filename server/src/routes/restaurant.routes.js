import { Router } from "express";

import restaurantController from "../controllers/restaurant.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { uploadFields } from "../middlewares/upload.middleware.js";

import { createRestaurantSchema } from "../validators/restaurant.validator.js";
import authorize from "../middlewares/authorize.middleware.js";

import { ROLES } from "../constants/index.js";

const router = Router();

router.post(
  "/",
  authMiddleware,

  authorize(ROLES.RESTAURANT_OWNER),

  uploadFields({
    maxSize: 5 * 1024 * 1024,

    fields: [
      {
        name: "logo",
        maxCount: 1,
      },
      {
        name: "coverImage",
        maxCount: 1,
      },
      {
        name: "gallery",
        maxCount: 10,
      },
    ],
  }),

  validate(createRestaurantSchema),

  restaurantController.createRestaurant,
);

export default router;
