import { Router } from "express";

import categoryController from "../controllers/category.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createCategorySchema,
  updateCategorySchema,
  updateCategoryStatusSchema,
  reorderCategorySchema,
} from "../validators/category.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);

router.use(authorize(ROLES.RESTAURANT_OWNER));

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  validate(createCategorySchema),
  categoryController.createCategory,
);

router.get("/", categoryController.getCategories);

router.patch(
  "/reorder",
  validate(reorderCategorySchema),
  categoryController.reorderCategories,
);
router.get("/:id", categoryController.getCategory);

router.patch(
  "/:id",
  validate(updateCategorySchema),
  categoryController.updateCategory,
);

router.patch(
  "/:id/status",
  validate(updateCategoryStatusSchema),
  categoryController.updateStatus,
);

router.delete("/:id", categoryController.deleteCategory);

export default router;
