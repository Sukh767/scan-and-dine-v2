import publicScanService from "../services/publicScan.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  HTTP_STATUS,
  GENERAL_MESSAGES,
  DINING_SESSION_MESSAGES,
} from "../constants/index.js";

class PublicScanController {
  /*
  |--------------------------------------------------------------------------
  | Scan QR
  |--------------------------------------------------------------------------
  */

  scanQr = asyncHandler(async (req, res) => {
    const data = await publicScanService.scanQr(req.params.qrToken);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, GENERAL_MESSAGES.FETCH_SUCCESS, data),
      );
  });

  startSession = asyncHandler(async (req, res) => {
    const session = await publicScanService.startSession(req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          DINING_SESSION_MESSAGES.STARTED,
          session,
        ),
      );
  });
}

export default new PublicScanController();
