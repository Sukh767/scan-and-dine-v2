import Restaurant from "../models/Restaurant.model.js";
import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, RESTAURANT_MESSAGES } from "../constants/index.js";

class RestaurantProfileRepository {
  /**
   * Find Restaurant By Owner Or Fail
   */
  async findByOwnerOrFail(ownerId) {
    const restaurant = await this.findByOwner(ownerId);

    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, RESTAURANT_MESSAGES.NOT_FOUND);
    }

    return restaurant;
  }
  /**
   * Get Restaurant By Owner
   */
  async findByOwner(ownerId) {
    return Restaurant.findOne({
      ownerId,
    });
  }

  /**
   * Update Restaurant Profile
   */
  async updateProfile(ownerId, data) {
    return Restaurant.findOneAndUpdate(
      {
        ownerId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * Update Restaurant Logo
   */
  async updateLogo(ownerId, logo) {
    return Restaurant.findOneAndUpdate(
      {
        ownerId,
      },
      {
        logo,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Update Cover Image
   */
  async updateCover(ownerId, coverImage) {
    return Restaurant.findOneAndUpdate(
      {
        ownerId,
      },
      {
        coverImage,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Update Restaurant Images
   */
  async updateImages(ownerId, data) {
    return Restaurant.findOneAndUpdate({ ownerId }, data, {
      new: true,
      runValidators: true,
    });
  }
}

export default new RestaurantProfileRepository();
