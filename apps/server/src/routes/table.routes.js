import { Router } from "express";

import tableController from "../controllers/table.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createTableSchema,
  updateTableSchema,
  updateTableStatusSchema,
  updateTableActiveSchema,
} from "../validators/table.validator.js";

import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authMiddleware);

router.use(authorize(ROLES.RESTAURANT_OWNER));

router.post("/", validate(createTableSchema), tableController.createTable);

router.get("/", tableController.getTables);

router.get("/:id", tableController.getTable);

router.patch(
  "/:id/status",
  validate(updateTableStatusSchema),
  tableController.updateStatus,
);

router.patch(
  "/:id/active",
  validate(updateTableActiveSchema),
  tableController.updateActiveStatus,
);

router.patch("/:id", validate(updateTableSchema), tableController.updateTable);

router.delete("/:id", tableController.deleteTable);

export default router;
