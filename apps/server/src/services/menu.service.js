import restaurantRepository from "../repositories/restaurant.repository.js";
import categoryRepository from "../repositories/category.repository.js";
import menuRepository from "../repositories/menu.repository.js";

import uploadService from "./upload.service.js";

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
  | Prepare Images
  |--------------------------------------------------------------------------
  */

  async prepareImages(files = [], imageUrls = []) {
    const images = [];

    // Upload local files to Cloudinary
    if (files?.length) {
      for (const file of files) {
        const uploadedImages = await Promise.all(
          files.map((file) =>
            uploadService.uploadImage(file, "scan-and-dine/menu-items"),
          ),
        );

        images.push(...uploadedImages);
      }
    }

    // External URLs
    if (imageUrls?.length) {
      for (const url of imageUrls) {
        images.push({
          url,
          publicId: null,
        });
      }
    }

    return images;
  }

  /*
  |--------------------------------------------------------------------------
  | Create Menu Item
  |--------------------------------------------------------------------------
  */

  async createMenuItem(user, body, files) {
    const restaurant = await this.getRestaurant(user);

    await this.getCategory(restaurant.id, body.categoryId);

    const existingMenu = await menuRepository.findByName(
      restaurant.id,
      body.name,
    );

    if (existingMenu) {
      throw new ApiError(HTTP_STATUS.CONFLICT, MENU_MESSAGES.ALREADY_EXISTS);
    }

    const images = await this.prepareImages(files, body.imageUrls);

    delete body.imageUrls;

    const menuItem = await menuRepository.create({
      restaurantId: restaurant.id,
      ...body,
      images,
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

  async updateMenuItem(user, menuItemId, body, files) {
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

    if (files?.length || body.imageUrls?.length) {
      body.images = await this.prepareImages(files, body.imageUrls);
    }

    delete body.imageUrls;

    console.log("Updating menu item with body:", body);
    console.log("Files provided:", files);

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
