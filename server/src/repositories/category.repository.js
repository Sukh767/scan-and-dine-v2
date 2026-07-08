import Category from "../models/Category.model.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, CATEGORY_MESSAGES } from "../constants/index.js";

class CategoryRepository {
  /*
  |--------------------------------------------------------------------------
  | Find By Id
  |--------------------------------------------------------------------------
  */

  async findById(id, restaurantId) {
    return Category.findOne({
      _id: id,
      restaurantId,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Id Or Fail
  |--------------------------------------------------------------------------
  */

  async findByIdOrFail(id, restaurantId) {
    const category = await this.findById(id, restaurantId);

    if (!category) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);
    }

    return category;
  }

  /*
  |--------------------------------------------------------------------------
  | Find All
  |--------------------------------------------------------------------------
  */

  async findAll(restaurantId) {
    return Category.find({
      restaurantId,
    }).sort({
      sortOrder: 1,
      createdAt: 1,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Name
  |--------------------------------------------------------------------------
  */

  async findByName(restaurantId, name) {
    return Category.findOne({
      restaurantId,
      name,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return Category.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, restaurantId, data) {
    return Category.findOneAndUpdate(
      {
        _id: id,
        restaurantId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(id, restaurantId) {
    return Category.findOneAndDelete({
      _id: id,
      restaurantId,
    });
  }
}

export default new CategoryRepository();
