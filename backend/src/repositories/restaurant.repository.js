import {
  HTTP_STATUS,
  RESTAURANT_APPROVAL_STATUS,
  RESTAURANT_MESSAGES,
} from "../constants/index.js";
import Restaurant from "../models/Restaurant.model.js";

class RestaurantRepository {
  /**
   * Find restaurant by owner
   */
  async findByOwner(ownerId) {
    return Restaurant.findOne({
      ownerId,
    });
  }

  /**
   * Find by slug
   */
  async findBySlug(slug) {
    return Restaurant.findOne({
      slug,
    });
  }

  /**
   * Check slug already exists
   */
  async slugExists(slug) {
    const restaurant = await Restaurant.exists({
      slug,
    });

    return !!restaurant;
  }

  /**
   * Find by email
   */
  async findByEmail(email) {
    return Restaurant.findOne({
      email: email.toLowerCase(),
    });
  }

  /**
   * Find by phone
   */
  async findByPhone(phone) {
    return Restaurant.findOne({
      phone,
    });
  }

  /**
   * Create restaurant
   */
  async create(data) {
    return Restaurant.create(data);
  }

  /**
   * Find by id
   */
  async findById(id) {
    return Restaurant.findById(id).populate("ownerId", "name email phone");
  }

  /**
   * Update
   */
  async update(id, data) {
    return Restaurant.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Find restaurant by email
   */
  async findByEmail(email) {
    return Restaurant.findOne({
      email: email.toLowerCase(),
    });
  }

  /**
   * Find restaurant by owner
   */
  async findByOwner(ownerId) {
    return Restaurant.findOne({
      ownerId,
    });
  }

  /**
   * Get all pending restaurants
   */
  async findPending() {
    return Restaurant.find({
      approvalStatus: RESTAURANT_APPROVAL_STATUS.PENDING,
    })
      .populate("ownerId", "name email phone avatar")
      .sort({
        createdAt: 1,
      });
  }

  /**
   * Get all approved restaurants
   */
  async findApproved() {
    return Restaurant.find({
      approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,
    }).sort({
      createdAt: -1,
    });
  }

  /**
   * Get all rejected restaurants
   */
  async findRejected() {
    return Restaurant.find({
      approvalStatus: RESTAURANT_APPROVAL_STATUS.REJECTED,
    }).sort({
      createdAt: -1,
    });
  }

  /**
   * Approve Restaurant
   */
  async approveRestaurant(restaurantId, adminId) {
    return Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,

        "approval.approvedBy": adminId,

        "approval.approvedAt": new Date(),

        $unset: {
          "approval.rejectedBy": 1,
          "approval.rejectedAt": 1,
          "approval.rejectionReason": 1,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * Reject Restaurant
   */
  async rejectRestaurant(restaurantId, adminId, reason) {
    return Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        approvalStatus: RESTAURANT_APPROVAL_STATUS.REJECTED,

        "approval.rejectedBy": adminId,

        "approval.rejectedAt": new Date(),

        "approval.rejectionReason": reason,

        $unset: {
          "approval.approvedBy": 1,
          "approval.approvedAt": 1,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * Check whether owner already owns a restaurant
   */
  async ownerHasRestaurant(ownerId) {
    return Restaurant.exists({
      ownerId,
    });
  }

  async findByIdOrFail(id) {
    const restaurant = await Restaurant.findById(id).populate(
      "ownerId",
      "name email phone",
    );

    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, RESTAURANT_MESSAGES.NOT_FOUND);
    }

    return restaurant;
  }
}

export default new RestaurantRepository();
