import { Router } from "express";

import publicMenuController from "../controllers/publicMenu.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { getPublicMenuSchema } from "../validators/publicMenu.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Menu
|--------------------------------------------------------------------------
*/

router.get(
  "/:sessionToken",
  validate(getPublicMenuSchema),
  publicMenuController.getMenu,
);

export default router;
