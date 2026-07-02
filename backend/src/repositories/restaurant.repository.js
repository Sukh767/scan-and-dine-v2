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
    return Restaurant.findById(id);
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
}

export default new RestaurantRepository();
