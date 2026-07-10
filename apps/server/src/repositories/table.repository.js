import Table from "../models/Table.model.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, TABLE_MESSAGES } from "../constants/index.js";

class TableRepository {
  /*
  |--------------------------------------------------------------------------
  | Find By Id
  |--------------------------------------------------------------------------
  */

  async findById(id, restaurantId) {
    return Table.findOne({
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
    const table = await this.findById(id, restaurantId);

    if (!table) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, TABLE_MESSAGES.NOT_FOUND);
    }

    return table;
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Number
  |--------------------------------------------------------------------------
  */

  async findByNumber(restaurantId, tableNumber) {
    return Table.findOne({
      restaurantId,
      tableNumber,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find All
  |--------------------------------------------------------------------------
  */

  async findAll(restaurantId, filters = {}) {
    const query = {
      restaurantId,
      ...filters,
    };

    return Table.find(query).sort({
      floor: 1,
      sortOrder: 1,
      tableNumber: 1,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return Table.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, restaurantId, data) {
    return Table.findOneAndUpdate(
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
    return Table.findOneAndDelete({
      _id: id,
      restaurantId,
    });
  }

  /*
|--------------------------------------------------------------------------
| Find By QR Token
|--------------------------------------------------------------------------
*/

  async findByQrToken(qrToken) {
    return Table.findOne({
      qrToken,
    });
  }
}

export default new TableRepository();
