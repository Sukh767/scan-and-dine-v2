import { Router } from "express";

import publicRestaurantController from "../controllers/publicRestaurant.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  getPublicRestaurantsSchema,
  getRestaurantBySlugSchema,
} from "../validators/publicRestaurant.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Restaurant Discovery
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  validate(getPublicRestaurantsSchema),
  publicRestaurantController.getRestaurants,
);

router.get(
  "/:slug",
  validate(getRestaurantBySlugSchema),
  publicRestaurantController.getRestaurantBySlug,
);

export default router;
