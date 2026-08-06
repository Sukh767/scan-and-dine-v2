import diningSessionRepository from "../repositories/diningSession.repository.js";
import publicMenuRepository from "../repositories/publicMenu.repository.js";

import ApiError from "../utils/ApiError.js";

import { toPublicMenuResponse } from "../transformers/publicMenu.transformer.js";

import { HTTP_STATUS, DINING_SESSION_MESSAGES } from "../constants/index.js";

class PublicMenuService {
  /*
  |--------------------------------------------------------------------------
  | Get Restaurant Menu
  |--------------------------------------------------------------------------
  */

  async getMenu(sessionToken) {
    /*
    |--------------------------------------------------------------------------
    | Active Session
    |--------------------------------------------------------------------------
    */

    const session =
      await diningSessionRepository.findActiveByToken(sessionToken);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NO_ACTIVE_SESSION,
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch Data
    |--------------------------------------------------------------------------
    */

    const [categories, menuItems] = await Promise.all([
      publicMenuRepository.findCategories(session.restaurantId.id),
      publicMenuRepository.findMenuItems(session.restaurantId.id),
    ]);

    /*
    |--------------------------------------------------------------------------
    | Group Menu By Category
    |--------------------------------------------------------------------------
    */

    const categoryMap = new Map();

    categories.forEach((category) => {
      categoryMap.set(category._id.toString(), {
        ...category,
        items: [],
      });
    });

    menuItems.forEach((item) => {
      const category = categoryMap.get(item.categoryId._id.toString());

      if (category) {
        category.items.push(item);
      }
    });

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return toPublicMenuResponse(session.restaurantId, [
      ...categoryMap.values(),
    ]);
  }
}

export default new PublicMenuService();
