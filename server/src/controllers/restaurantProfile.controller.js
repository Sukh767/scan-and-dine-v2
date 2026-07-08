import restaurantProfileService from "../services/restaurantProfile.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  HTTP_STATUS,
  RESTAURANT_AUTH_MESSAGES,
} from "../constants/index.js";

class RestaurantProfileController {
  /**
   * Get Restaurant Profile
   */
  getProfile = asyncHandler(async (req, res) => {
    const restaurant =
      await restaurantProfileService.getProfile(
        req.user.id,
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        RESTAURANT_AUTH_MESSAGES.PROFILE_FETCHED,
        restaurant,
      ),
    );
  });

  /**
   * Update Restaurant Profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const restaurant =
      await restaurantProfileService.updateProfile(
        req.user.id,
        req.body,
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        RESTAURANT_AUTH_MESSAGES.PROFILE_UPDATED,
        restaurant,
      ),
    );
  });

  /**
   * Update Logo
   */
  updateLogo = asyncHandler(async (req, res) => {
    const restaurant =
      await restaurantProfileService.updateLogo(
        req.user.id,
        req.file,
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        RESTAURANT_AUTH_MESSAGES.LOGO_UPDATED,
        restaurant,
      ),
    );
  });

  /**
   * Update Cover Image
   */
  updateCover = asyncHandler(async (req, res) => {
    const restaurant =
      await restaurantProfileService.updateCover(
        req.user.id,
        req.file,
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        RESTAURANT_AUTH_MESSAGES.COVER_UPDATED,
        restaurant,
      ),
    );
  });
}

export default new RestaurantProfileController();