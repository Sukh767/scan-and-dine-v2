import Restaurant from "../models/Restaurant.model.js";

import {
  RESTAURANT_APPROVAL_STATUS,
  RESTAURANT_OPERATIONAL_STATUS,
} from "../constants/index.js";

class PublicRestaurantRepository {
  /*
  |--------------------------------------------------------------------------
  | Find All Public Restaurants
  |--------------------------------------------------------------------------
  */

  async findAll(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 12,
      sort = {
        completedOrders: -1,
      },
    } = options;

    const query = {
      approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,

      operationalStatus: RESTAURANT_OPERATIONAL_STATUS.OPEN,

      ...filter,
    };

    const restaurants = await Restaurant.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Restaurant.countDocuments(query);

    return {
      restaurants,

      total,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Featured Restaurants
  |--------------------------------------------------------------------------
  */

  async findFeatured(limit = 8) {
    return Restaurant.find({
      approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,

      operationalStatus: RESTAURANT_OPERATIONAL_STATUS.OPEN,

      isFeatured: true,
    })
      .sort({
        completedOrders: -1,
      })
      .limit(limit)
      .lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Popular Restaurants
  |--------------------------------------------------------------------------
  */

  async findPopular(limit = 8) {
    return Restaurant.find({
      approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,

      operationalStatus: RESTAURANT_OPERATIONAL_STATUS.OPEN,
    })
      .sort({
        completedOrders: -1,

        averageRating: -1,
      })
      .limit(limit)
      .lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Slug
  |--------------------------------------------------------------------------
  */

  async findBySlug(slug) {
    return Restaurant.findOne({
      slug,

      approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,
    }).lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Find All Without Filters
  |--------------------------------------------------------------------------
  */

  async findAllWithoutFilters() {
    return Restaurant.find({}).sort({ createdAt: -1 }).lean();
  }
}

export default new PublicRestaurantRepository();
