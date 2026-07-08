import asyncHandler from "../utils/asyncHandler.js";

import restaurantService from "../services/restaurant.service.js";

import ApiResponse from "../utils/ApiResponse.js";

import { HTTP_STATUS, RESTAURANT_MESSAGES } from "../constants/index.js";

class RestaurantController {
  /**
   * Create Restaurant
   */
  createRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await restaurantService.createRestaurant(
      req.user.id,
      req.body,
      req.files,
    );

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          RESTAURANT_MESSAGES.CREATED_SUCCESS,
          restaurant,
        ),
      );
  });
}

export default new RestaurantController();
