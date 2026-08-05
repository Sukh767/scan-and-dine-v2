import { Router } from "express";

import publicScanController from "../controllers/publicScan.controller.js";

import validate from "../middlewares/validate.middleware.js";

import {
  scanQrSchema,
  startPublicSessionSchema,
} from "../validators/publicScan.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public QR Scan
|--------------------------------------------------------------------------
*/

router.get("/:qrToken", validate(scanQrSchema), publicScanController.scanQr);

router.post(
  "/session/start",
  validate(startPublicSessionSchema),
  publicScanController.startSession,
);

export default router;
