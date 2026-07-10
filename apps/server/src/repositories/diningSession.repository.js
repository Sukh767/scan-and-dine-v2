import DiningSession from "../models/DiningSession.model.js";

import ApiError from "../utils/ApiError.js";

import {
  HTTP_STATUS,
  DINING_SESSION_MESSAGES,
  SESSION_STATUS,
} from "../constants/index.js";

class DiningSessionRepository {
  /*
  |--------------------------------------------------------------------------
  | Find By Id
  |--------------------------------------------------------------------------
  */

  async findById(id) {
    return DiningSession.findById(id)
      .populate("restaurantId", "name")
      .populate("tableId", "tableNumber label")
      .populate("customerId", "name email");
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Id Or Fail
  |--------------------------------------------------------------------------
  */

  async findByIdOrFail(id) {
    const session = await this.findById(id);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NOT_FOUND,
      );
    }

    return session;
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Session Token
  |--------------------------------------------------------------------------
  */

  async findBySessionToken(sessionToken) {
    return DiningSession.findOne({
      sessionToken,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find Active Session By Token
  |--------------------------------------------------------------------------
  */

  async findActiveByToken(sessionToken) {
    return DiningSession.findOne({
      sessionToken,

      status: SESSION_STATUS.ACTIVE,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find Active Session By Table
  |--------------------------------------------------------------------------
  */

  async findActiveByTable(tableId) {
    return DiningSession.findOne({
      tableId,

      status: SESSION_STATUS.ACTIVE,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find Active Session By Customer
  |--------------------------------------------------------------------------
  */

  async findActiveByCustomer(customerId) {
    return DiningSession.findOne({
      customerId,

      status: SESSION_STATUS.ACTIVE,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find All
  |--------------------------------------------------------------------------
  */

  async findAll(restaurantId, filters = {}) {
    return DiningSession.find({
      restaurantId,

      ...filters,
    })
      .populate("tableId", "tableNumber label")
      .populate("customerId", "name email")
      .sort({
        startedAt: -1,
      });
  }

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return DiningSession.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    return DiningSession.findByIdAndUpdate(id, data, {
      new: true,

      runValidators: true,
    })
      .populate("tableId", "tableNumber label")
      .populate("customerId", "name email");
  }

  /*
|--------------------------------------------------------------------------
| Find Active Session By Table Or Fail
|--------------------------------------------------------------------------
*/

  async findActiveByTableOrFail(tableId) {
    const session = await this.findActiveByTable(tableId);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NO_ACTIVE_SESSION,
      );
    }

    return session;
  }

  /*
|--------------------------------------------------------------------------
| Find By Session Token Or Fail
|--------------------------------------------------------------------------
*/

  async findBySessionTokenOrFail(sessionToken) {
    const session = await this.findBySessionToken(sessionToken);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NOT_FOUND,
      );
    }

    return session;
  }
}

export default new DiningSessionRepository();
