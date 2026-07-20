import publicRestaurantService from "../services/publicRestaurant.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, GENERAL_MESSAGES } from "../constants/index.js";

class PublicRestaurantController {
  /*
  |--------------------------------------------------------------------------
  | Get Restaurants
  |--------------------------------------------------------------------------
  */

  getRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await publicRestaurantService.getRestaurants(req.query);

    console.log(req.query);
    console.log(restaurants);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          GENERAL_MESSAGES.FETCH_SUCCESS,
          restaurants,
        ),
      );
  });

  /*
  |--------------------------------------------------------------------------
  | Featured Restaurants
  |--------------------------------------------------------------------------
  */

  getFeaturedRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await publicRestaurantService.getFeaturedRestaurants();

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          GENERAL_MESSAGES.FETCH_SUCCESS,
          restaurants,
        ),
      );
  });

  /*
  |--------------------------------------------------------------------------
  | Popular Restaurants
  |--------------------------------------------------------------------------
  */

  getPopularRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await publicRestaurantService.getPopularRestaurants();

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          GENERAL_MESSAGES.FETCH_SUCCESS,
          restaurants,
        ),
      );
  });

  /*
  |--------------------------------------------------------------------------
  | Restaurant Details
  |--------------------------------------------------------------------------
  */

  getRestaurantBySlug = asyncHandler(async (req, res) => {
    const restaurant = await publicRestaurantService.getRestaurantBySlug(
      req.params.slug,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          GENERAL_MESSAGES.FETCH_SUCCESS,
          restaurant,
        ),
      );
  });
}

export default new PublicRestaurantController();
