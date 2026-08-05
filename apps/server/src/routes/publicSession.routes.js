import { Router } from "express";

import publicSessionController from "../controllers/publicSession.controller.js";

import validate from "../middlewares/validate.middleware.js";

import { getPublicSessionSchema } from "../validators/publicSession.validator.js";

const router = Router();

router.get(
  "/:sessionToken",
  validate(getPublicSessionSchema),
  publicSessionController.getSession,
);

export default router;
