import adminRestaurantService from "../services/admin.restaurant.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, RESTAURANT_MESSAGES } from "../constants/index.js";

class AdminRestaurantController {
  /**
   * Get Pending Restaurants
   */
  getPendingRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await adminRestaurantService.getPendingRestaurants();

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESTAURANT_MESSAGES.PENDING_FETCHED,
          restaurants,
        ),
      );
  });

  /**
   * Get Restaurant By Id
   */
  getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await adminRestaurantService.getRestaurantById(
      req.params.id,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESTAURANT_MESSAGES.FETCHED_SUCCESS,
          restaurant,
        ),
      );
  });

  /**
   * Approve Restaurant
   */
  approveRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await adminRestaurantService.approveRestaurant(
      req.params.id,
      req.user.id,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESTAURANT_MESSAGES.APPROVED_SUCCESS,
          restaurant,
        ),
      );
  });

  /**
   * Reject Restaurant
   */
  rejectRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await adminRestaurantService.rejectRestaurant(
      req.params.id,
      req.user.id,
      req.body.reason,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          RESTAURANT_MESSAGES.REJECTED_SUCCESS,
          restaurant,
        ),
      );
  });
}

export default new AdminRestaurantController();
