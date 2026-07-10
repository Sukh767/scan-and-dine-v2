import diningSessionService from "../services/diningSession.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, DINING_SESSION_MESSAGES } from "../constants/index.js";

class DiningSessionController {
  startSession = asyncHandler(async (req, res) => {
    const session = await diningSessionService.startSession(req.user, req.body);

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

  resumeSession = asyncHandler(async (req, res) => {
    const session = await diningSessionService.resumeSession(
      req.params.sessionToken,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          DINING_SESSION_MESSAGES.RESUMED,
          session,
        ),
      );
  });

  getSessions = asyncHandler(async (req, res) => {
    const filters = {};

    if (req.query.status) {
      filters.status = req.query.status;
    }

    const sessions = await diningSessionService.getSessions(req.user, filters);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          DINING_SESSION_MESSAGES.FETCHED,
          sessions,
        ),
      );
  });

  getSession = asyncHandler(async (req, res) => {
    const session = await diningSessionService.getSessionById(req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          DINING_SESSION_MESSAGES.DETAILS_FETCHED,
          session,
        ),
      );
  });

  updateGuestCount = asyncHandler(async (req, res) => {
    const session = await diningSessionService.updateGuestCount(
      req.params.id,
      req.body.guestCount,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          DINING_SESSION_MESSAGES.GUEST_COUNT_UPDATED,
          session,
        ),
      );
  });

  endSession = asyncHandler(async (req, res) => {
    const session = await diningSessionService.endSession(
      req.params.id,
      req.body.endReason,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, DINING_SESSION_MESSAGES.ENDED, session),
      );
  });
}

export default new DiningSessionController();
