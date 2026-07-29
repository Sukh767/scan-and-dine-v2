import MenuItem from "../models/MenuItem.model.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, MENU_MESSAGES } from "../constants/index.js";

class MenuRepository {
  /*
  |--------------------------------------------------------------------------
  | Find By Id
  |--------------------------------------------------------------------------
  */

  async findById(id, restaurantId) {
    return MenuItem.findOne({
      _id: id,
      restaurantId,
    }).populate("categoryId", "name");
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Id Or Fail
  |--------------------------------------------------------------------------
  */

  async findByIdOrFail(id, restaurantId) {
    const menuItem = await this.findById(id, restaurantId);

    if (!menuItem) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MENU_MESSAGES.NOT_FOUND);
    }

    return menuItem;
  }

  /*
  |--------------------------------------------------------------------------
  | Find All
  |--------------------------------------------------------------------------
  */

  async findAll(restaurantId) {
    return MenuItem.find({
      restaurantId,
    })
      .populate("categoryId", "name")
      .sort({
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
    return MenuItem.findOne({
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
    console.log("menu create repo console : ", data);
    return MenuItem.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, restaurantId, data) {
    return MenuItem.findOneAndUpdate(
      {
        _id: id,
        restaurantId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    ).populate("categoryId", "name");
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(id, restaurantId) {
    return MenuItem.findOneAndDelete({
      _id: id,
      restaurantId,
    });
  }

  /*
|--------------------------------------------------------------------------
| Find By Category
|--------------------------------------------------------------------------
*/

  async findByCategory(restaurantId, categoryId) {
    return MenuItem.find({
      restaurantId,
      categoryId,
    }).sort({
      sortOrder: 1,
    });
  }
}

export default new MenuRepository();
