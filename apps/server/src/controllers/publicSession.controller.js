import publicSessionService from "../services/publicSession.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, GENERAL_MESSAGES } from "../constants/index.js";

class PublicSessionController {
  getSession = asyncHandler(async (req, res) => {
    const session = await publicSessionService.getSession(
      req.params.sessionToken,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          GENERAL_MESSAGES.FETCH_SUCCESS,
          session,
        ),
      );
  });
}

export default new PublicSessionController();
