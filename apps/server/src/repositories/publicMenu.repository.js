import Category from "../models/Category.model.js";
import MenuItem from "../models/MenuItem.model.js";

class PublicMenuRepository {
  /*
  |--------------------------------------------------------------------------
  | Categories
  |--------------------------------------------------------------------------
  */

  async findCategories(restaurantId) {
    return Category.find({
      restaurantId,
      isActive: true,
    })
      .sort({
        sortOrder: 1,
        name: 1,
      })
      .lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Menu Items
  |--------------------------------------------------------------------------
  */

  async findMenuItems(restaurantId) {
    return MenuItem.find({
      restaurantId,
      isActive: true,
      isAvailable: true,
    })
      .populate("categoryId", "name")
      .sort({
        sortOrder: 1,
        createdAt: 1,
      })
      .lean();
  }
}

export default new PublicMenuRepository();
