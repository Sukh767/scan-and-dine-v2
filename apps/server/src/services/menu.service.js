import restaurantRepository from "../repositories/restaurant.repository.js";
import categoryRepository from "../repositories/category.repository.js";
import menuRepository from "../repositories/menu.repository.js";

import {
  toMenuResponse,
  toMenuListResponse,
} from "../transformers/menu.transformer.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, MENU_MESSAGES } from "../constants/index.js";

class MenuService {
  /*
  |--------------------------------------------------------------------------
  | Private Helpers
  |--------------------------------------------------------------------------
  */

  async getRestaurant(user) {
    return restaurantRepository.findByOwnerOrFail(user.id);
  }

  async getCategory(restaurantId, categoryId) {
    return categoryRepository.findByIdOrFail(categoryId, restaurantId);
  }

  async getMenuItem(restaurantId, menuItemId) {
    return menuRepository.findByIdOrFail(menuItemId, restaurantId);
  }

  /*
  |--------------------------------------------------------------------------
  | Create Menu Item
  |--------------------------------------------------------------------------
  */

  async createMenuItem(user, body) {
    const restaurant = await this.getRestaurant(user);

    const category = await this.getCategory(restaurant.id, body.categoryId);

    const existingMenu = await menuRepository.findByName(
      restaurant.id,
      body.name,
    );

    if (existingMenu) {
      throw new ApiError(HTTP_STATUS.CONFLICT, MENU_MESSAGES.ALREADY_EXISTS);
    }

    const menuItem = await menuRepository.create({
      restaurantId: restaurant.id,
      ...body,
    });

    const createdMenu = await menuRepository.findById(
      menuItem.id,
      restaurant.id,
    );

    return toMenuResponse(createdMenu);
  }

  /*
  |--------------------------------------------------------------------------
  | Get All Menu Items
  |--------------------------------------------------------------------------
  */

  async getMenuItems(user) {
    const restaurant = await this.getRestaurant(user);

    const menuItems = await menuRepository.findAll(restaurant.id);

    return toMenuListResponse(menuItems);
  }

  /*
  |--------------------------------------------------------------------------
  | Get Menu Item
  |--------------------------------------------------------------------------
  */

  async getMenuItemById(user, menuItemId) {
    const restaurant = await this.getRestaurant(user);

    const menuItem = await this.getMenuItem(restaurant.id, menuItemId);

    return toMenuResponse(menuItem);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Menu Item
  |--------------------------------------------------------------------------
  */

  async updateMenuItem(user, menuItemId, body) {
    const restaurant = await this.getRestaurant(user);

    const menuItem = await this.getMenuItem(restaurant.id, menuItemId);

    if (body.categoryId && body.categoryId !== menuItem.categoryId.id) {
      await this.getCategory(restaurant.id, body.categoryId);
    }

    if (body.name && body.name !== menuItem.name) {
      const existingMenu = await menuRepository.findByName(
        restaurant.id,
        body.name,
      );

      if (existingMenu && existingMenu.id !== menuItem.id) {
        throw new ApiError(HTTP_STATUS.CONFLICT, MENU_MESSAGES.ALREADY_EXISTS);
      }
    }

    const updatedMenu = await menuRepository.update(
      menuItem.id,
      restaurant.id,
      body,
    );

    return toMenuResponse(updatedMenu);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Menu Item
  |--------------------------------------------------------------------------
  */

  async deleteMenuItem(user, menuItemId) {
    const restaurant = await this.getRestaurant(user);

    await this.getMenuItem(restaurant.id, menuItemId);

    await menuRepository.delete(menuItemId, restaurant.id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(user, menuItemId, isActive) {
    const restaurant = await this.getRestaurant(user);

    const updatedMenu = await menuRepository.update(menuItemId, restaurant.id, {
      isActive,
    });

    return toMenuResponse(updatedMenu);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Availability
  |--------------------------------------------------------------------------
  */

  async updateAvailability(user, menuItemId, isAvailable) {
    const restaurant = await this.getRestaurant(user);

    const updatedMenu = await menuRepository.update(menuItemId, restaurant.id, {
      isAvailable,
    });

    return toMenuResponse(updatedMenu);
  }
}

export default new MenuService();
