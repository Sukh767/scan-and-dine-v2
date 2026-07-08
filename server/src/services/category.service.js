import restaurantRepository from "../repositories/restaurant.repository.js";
import categoryRepository from "../repositories/category.repository.js";

import {
  toCategoryResponse,
  toCategoryListResponse,
} from "../transformers/category.transformer.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, CATEGORY_MESSAGES } from "../constants/index.js";

class CategoryService {
  /*
  |--------------------------------------------------------------------------
  | Create Category
  |--------------------------------------------------------------------------
  */

  async createCategory(user, body) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    const existingCategory = await categoryRepository.findByName(
      restaurant.id,
      body.name,
    );

    if (existingCategory) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        CATEGORY_MESSAGES.ALREADY_EXISTS,
      );
    }

    const category = await categoryRepository.create({
      restaurantId: restaurant.id,
      ...body,
    });

    return toCategoryResponse(category);
  }

  /*
  |--------------------------------------------------------------------------
  | Get All Categories
  |--------------------------------------------------------------------------
  */

  async getCategories(user) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    const categories = await categoryRepository.findAll(restaurant.id);

    return toCategoryListResponse(categories);
  }

  /*
  |--------------------------------------------------------------------------
  | Get Category
  |--------------------------------------------------------------------------
  */

  async getCategory(user, categoryId) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    const category = await categoryRepository.findByIdOrFail(
      categoryId,
      restaurant.id,
    );

    return toCategoryResponse(category);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Category
  |--------------------------------------------------------------------------
  */

  async updateCategory(user, categoryId, body) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    const category = await categoryRepository.findByIdOrFail(
      categoryId,
      restaurant.id,
    );

    if (body.name && body.name !== category.name) {
      const existing = await categoryRepository.findByName(
        restaurant.id,
        body.name,
      );

      if (existing) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          CATEGORY_MESSAGES.ALREADY_EXISTS,
        );
      }
    }

    const updatedCategory = await categoryRepository.update(
      category.id,
      restaurant.id,
      body,
    );

    return toCategoryResponse(updatedCategory);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Category
  |--------------------------------------------------------------------------
  */

  async deleteCategory(user, categoryId) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    await categoryRepository.findByIdOrFail(categoryId, restaurant.id);

    await categoryRepository.delete(categoryId, restaurant.id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(user, categoryId, isActive) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    const category = await categoryRepository.update(
      categoryId,
      restaurant.id,
      {
        isActive,
      },
    );

    return toCategoryResponse(category);
  }

  /*
  |--------------------------------------------------------------------------
  | Reorder Categories
  |--------------------------------------------------------------------------
  */

  async reorderCategories(user, categories) {
    const restaurant = await restaurantRepository.findByOwnerOrFail(user.id);

    for (const category of categories) {
      await categoryRepository.update(category.id, restaurant.id, {
        sortOrder: category.sortOrder,
      });
    }

    const updatedCategories = await categoryRepository.findAll(restaurant.id);

    return toCategoryListResponse(updatedCategories);
  }
}

export default new CategoryService();
