import publicRestaurantRepository from "../repositories/publicRestaurant.repository.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, RESTAURANT_MESSAGES } from "../constants/index.js";
import { toPublicRestaurantListResponse } from "../transformers/publicRestaurantList.transformer.js";
import { toPublicRestaurantDetailsResponse } from "../transformers/publicRestaurantDetails.transformer.js";


class PublicRestaurantService {
  /*
  |--------------------------------------------------------------------------
  | Get Public Restaurants
  |--------------------------------------------------------------------------
  */

  async getRestaurants(query) {
    const {
      page = 1,
      limit = 12,
      search,
      city,
      cuisine,
      featured,
      sort = "popular",
    } = query;

    const filter = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | TODO
    |--------------------------------------------------------------------------
    | Replace regex search with MongoDB Atlas Search
    | when full-text search is introduced.
    |--------------------------------------------------------------------------
    */

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | City
    |--------------------------------------------------------------------------
    */

    if (city) {
      filter["address.city"] = city;
    }

    /*
    |--------------------------------------------------------------------------
    | Cuisine
    |--------------------------------------------------------------------------
    */

    if (cuisine) {
      filter.cuisineTypes = cuisine;
    }

    /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

    if (featured !== undefined) {
      filter.isFeatured = featured;
    }

    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */

    let sortOption = {
      completedOrders: -1,
    };

    switch (sort) {
      case "rating":
        sortOption = {
          averageRating: -1,
        };
        break;

      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "name":
        sortOption = {
          name: 1,
        };
        break;

      default:
        sortOption = {
          completedOrders: -1,
          averageRating: -1,
        };
    }

    const result = await publicRestaurantRepository.findAll(filter, {
      page,
      limit,
      sort: sortOption,
    });

    console.log(result);

    return {
      restaurants: toPublicRestaurantListResponse(result.restaurants),

      pagination: {
        page: result.page,

        limit: result.limit,

        total: result.total,

        totalPages: result.totalPages,
      },

      filters: {
        search,

        city,

        cuisine,

        featured,

        sort,
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Featured Restaurants
  |--------------------------------------------------------------------------
  */

  async getFeaturedRestaurants() {
    const restaurants = await publicRestaurantRepository.findFeatured();

    return toPublicRestaurantListResponse(restaurants);
  }

  /*
  |--------------------------------------------------------------------------
  | Popular Restaurants
  |--------------------------------------------------------------------------
  */

  async getPopularRestaurants() {
    const restaurants = await publicRestaurantRepository.findPopular();

    return toPublicRestaurantListResponse(restaurants);
  }

  /*
  |--------------------------------------------------------------------------
  | Restaurant Details
  |--------------------------------------------------------------------------
  */

  async getRestaurantBySlug(slug) {
    const restaurant = await publicRestaurantRepository.findBySlug(slug);

    if (!restaurant) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        RESTAURANT_MESSAGES.NOT_FOUND,
      );
    }

    return toPublicRestaurantDetailsResponse(restaurant);
  }

}

export default new PublicRestaurantService();
