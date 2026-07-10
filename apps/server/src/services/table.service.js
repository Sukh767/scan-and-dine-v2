import restaurantRepository from "../repositories/restaurant.repository.js";
import tableRepository from "../repositories/table.repository.js";

import {
  toTableResponse,
  toTableListResponse,
} from "../transformers/table.transformer.js";

import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS, TABLE_MESSAGES } from "../constants/index.js";

class TableService {
  /*
  |--------------------------------------------------------------------------
  | Private Helpers
  |--------------------------------------------------------------------------
  */

  async getRestaurant(user) {
    return restaurantRepository.findByOwnerOrFail(user.id);
  }

  async getTable(restaurantId, tableId) {
    return tableRepository.findByIdOrFail(tableId, restaurantId);
  }

  /*
  |--------------------------------------------------------------------------
  | Create Table
  |--------------------------------------------------------------------------
  */

  async createTable(user, body) {
    const restaurant = await this.getRestaurant(user);

    const existingTable = await tableRepository.findByNumber(
      restaurant.id,
      body.tableNumber,
    );

    if (existingTable) {
      throw new ApiError(HTTP_STATUS.CONFLICT, TABLE_MESSAGES.ALREADY_EXISTS);
    }

    const table = await tableRepository.create({
      restaurantId: restaurant.id,
      ...body,
    });

    return toTableResponse(table);
  }

  /*
  |--------------------------------------------------------------------------
  | Get All Tables
  |--------------------------------------------------------------------------
  */

  async getTables(user, filters = {}) {
    const restaurant = await this.getRestaurant(user);

    const tables = await tableRepository.findAll(restaurant.id, filters);

    return toTableListResponse(tables);
  }

  /*
  |--------------------------------------------------------------------------
  | Get Table
  |--------------------------------------------------------------------------
  */

  async getTableById(user, tableId) {
    const restaurant = await this.getRestaurant(user);

    const table = await this.getTable(restaurant.id, tableId);

    return toTableResponse(table);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Table
  |--------------------------------------------------------------------------
  */

  async updateTable(user, tableId, body) {
    const restaurant = await this.getRestaurant(user);

    const table = await this.getTable(restaurant.id, tableId);

    if (body.tableNumber && body.tableNumber !== table.tableNumber) {
      const existing = await tableRepository.findByNumber(
        restaurant.id,
        body.tableNumber,
      );

      if (existing && existing.id !== table.id) {
        throw new ApiError(HTTP_STATUS.CONFLICT, TABLE_MESSAGES.ALREADY_EXISTS);
      }
    }

    const updatedTable = await tableRepository.update(
      table.id,
      restaurant.id,
      body,
    );

    return toTableResponse(updatedTable);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Table
  |--------------------------------------------------------------------------
  */

  async deleteTable(user, tableId) {
    const restaurant = await this.getRestaurant(user);

    await this.getTable(restaurant.id, tableId);

    await tableRepository.delete(tableId, restaurant.id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Table Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(user, tableId, status) {
    const restaurant = await this.getRestaurant(user);

    const updatedTable = await tableRepository.update(tableId, restaurant.id, {
      status,
    });

    return toTableResponse(updatedTable);
  }

  /*
  |--------------------------------------------------------------------------
  | Activate / Deactivate Table
  |--------------------------------------------------------------------------
  */

  async updateActiveStatus(user, tableId, isActive) {
    const restaurant = await this.getRestaurant(user);

    const updatedTable = await tableRepository.update(tableId, restaurant.id, {
      isActive,
    });

    return toTableResponse(updatedTable);
  }
}

export default new TableService();
