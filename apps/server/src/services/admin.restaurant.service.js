import restaurantRepository from "../repositories/restaurant.repository.js";
import mailService from "./mail.service.js";

import ApiError from "../utils/ApiError.js";
import { toAdminRestaurantResponse } from "../transformers/admin.restaurant.transformer.js";

import {
  HTTP_STATUS,
  RESTAURANT_MESSAGES,
  RESTAURANT_APPROVAL_STATUS,
} from "../constants/index.js";

class AdminRestaurantService {
  /**
   * Get Pending Restaurants
   */
  async getPendingRestaurants() {
    const restaurants = await restaurantRepository.findPending();

    return restaurants.map(toAdminRestaurantResponse);
  }

  /**
   * Get Restaurant By Id
   */
  async getRestaurantById(id) {
    const restaurant = await restaurantRepository.findByIdOrFail(id);

    return toAdminRestaurantResponse(restaurant);
  }

  /**
   * Ensure restaurant is in pending state
   */
  ensurePendingRestaurant(restaurant) {
    if (restaurant.approvalStatus === RESTAURANT_APPROVAL_STATUS.APPROVED) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESTAURANT_MESSAGES.ALREADY_APPROVED,
      );
    }

    if (restaurant.approvalStatus === RESTAURANT_APPROVAL_STATUS.REJECTED) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        RESTAURANT_MESSAGES.ALREADY_REJECTED,
      );
    }

    if (restaurant.approvalStatus !== RESTAURANT_APPROVAL_STATUS.PENDING) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        RESTAURANT_MESSAGES.INVALID_APPROVAL_STATE,
      );
    }
  }

  /**
   * Approve Restaurant
   */
  async approveRestaurant(restaurantId, adminId) {
    const restaurant = await restaurantRepository.findByIdOrFail(restaurantId);

    this.ensurePendingRestaurant(restaurant);

    const approvedRestaurant = await restaurantRepository.approveRestaurant(
      restaurant.id,
      adminId,
    );

    /**
     * Send email
     */
    try {
      await mailService.sendRestaurantApprovedEmail({
        to: approvedRestaurant.email,
        data: {
          ownerName: restaurant.ownerId.name,
          restaurantName: approvedRestaurant.name,
        },
      });
    } catch (error) {
      //Logger.error(error);
      console.error("Approval email failed:", error.message);
    }

    return toAdminRestaurantResponse(approvedRestaurant);
  }

  /**
   * Reject Restaurant
   */
  async rejectRestaurant(restaurantId, adminId, reason) {
    const restaurant = await restaurantRepository.findByIdOrFail(restaurantId);

    this.ensurePendingRestaurant(restaurant);

    const rejectedRestaurant = await restaurantRepository.rejectRestaurant(
      restaurant.id,
      adminId,
      reason,
    );

    /**
     * Send rejection email
     */
    try {
      await mailService.sendRestaurantRejectedEmail({
        to: rejectedRestaurant.email,
        data: {
          ownerName: restaurant.ownerId?.name,
          restaurantName: rejectedRestaurant.name,
          reason,
        },
      });
    } catch (error) {
      console.error("Rejection email failed:", error.message);
    }

    return toAdminRestaurantResponse(rejectedRestaurant);
  }
}

export default new AdminRestaurantService();
