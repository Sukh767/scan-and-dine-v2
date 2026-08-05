import crypto from "crypto";

import restaurantRepository from "../repositories/restaurant.repository.js";
import tableRepository from "../repositories/table.repository.js";
import diningSessionRepository from "../repositories/diningSession.repository.js";

import {
  toDiningSessionResponse,
  toDiningSessionListResponse,
} from "../transformers/diningSession.transformer.js";

import ApiError from "../utils/ApiError.js";

import {
  HTTP_STATUS,
  DINING_SESSION_MESSAGES,
  SESSION_STATUS,
  TABLE_STATUS,
  SESSION_END_REASON,
} from "../constants/index.js";

class DiningSessionService {
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

  async getSession(id) {
    return diningSessionRepository.findByIdOrFail(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Public Helper (used by PublicScanService)
  |--------------------------------------------------------------------------
  */

  async getActiveSessionByTable(tableId) {
    return diningSessionRepository.findActiveByTable(tableId);
  }

  /*
  |--------------------------------------------------------------------------
  | Start Session
  |--------------------------------------------------------------------------
  */

  async startSession(user, body) {
    const restaurant = await this.getRestaurant(user);

    const table = await this.getTable(restaurant.id, body.tableId);

    const result = await this.createSessionCore({
      restaurant,
      table,
      guestCount: body.guestCount,
    });

    return {
      resumed: result.resumed,
      session: toDiningSessionResponse(result.session),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Resume Session
  |--------------------------------------------------------------------------
  */

  async resumeSession(sessionToken) {
    const session =
      await diningSessionRepository.findActiveByToken(sessionToken);

    if (!session) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        DINING_SESSION_MESSAGES.NO_ACTIVE_SESSION,
      );
    }

    const updatedSession = await diningSessionRepository.update(session.id, {
      lastActivityAt: new Date(),
    });

    return {
      resumed: true,
      session: toDiningSessionResponse(updatedSession),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Get Restaurant Sessions
  |--------------------------------------------------------------------------
  */

  async getSessions(user, filters = {}) {
    const restaurant = await this.getRestaurant(user);

    const sessions = await diningSessionRepository.findAll(
      restaurant.id,
      filters,
    );

    return toDiningSessionListResponse(sessions);
  }

  /*
  |--------------------------------------------------------------------------
  | Get Session
  |--------------------------------------------------------------------------
  */

  async getSessionById(id) {
    const session = await this.getSession(id);

    return toDiningSessionResponse(session);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Guest Count
  |--------------------------------------------------------------------------
  */

  async updateGuestCount(sessionId, guestCount) {
    await this.getSession(sessionId);

    const session = await diningSessionRepository.update(sessionId, {
      guestCount,
      lastActivityAt: new Date(),
    });

    return toDiningSessionResponse(session);
  }

  /*
  |--------------------------------------------------------------------------
  | End Session
  |--------------------------------------------------------------------------
  */

  async endSession(sessionId, endReason) {
    const existingSession = await this.getSession(sessionId);

    const session = await diningSessionRepository.update(sessionId, {
      status: SESSION_STATUS.COMPLETED,
      endedAt: new Date(),
      endReason: endReason ?? SESSION_END_REASON.PAYMENT_COMPLETED,
      lastActivityAt: new Date(),
    });

    await tableRepository.update(
      existingSession.tableId._id,
      existingSession.restaurantId,
      {
        status: TABLE_STATUS.AVAILABLE,
      },
    );

    return toDiningSessionResponse(session);
  }

  /*
  |--------------------------------------------------------------------------
  | Create Session Core (shared internal logic)
  |--------------------------------------------------------------------------
  */

  async createSessionCore({
    restaurant,
    table,
    guestCount = 1,
    customerId = null,
    reservationId = null,
  }) {
    /*
    |--------------------------------------------------------------------------
    | Existing Active Session
    |--------------------------------------------------------------------------
    */

    const activeSession = await diningSessionRepository.findActiveByTable(
      table.id,
    );

    if (activeSession) {
      return {
        resumed: true,
        session: activeSession,
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Create Session
    |--------------------------------------------------------------------------
    */

    console.log("Restaurant:", restaurant);
    console.log("Restaurant ID:", restaurant.id);
    console.log("Restaurant _ID:", restaurant._id);

    console.log("Table:", table);
    console.log("Table ID:", table.id);
    console.log("Table _ID:", table._id);

    const session = await diningSessionRepository.create({
      restaurantId: restaurant._id ?? restaurant.id,
      tableId: table._id ?? table.id,
      customerId,
      reservationId,
      guestCount,
      sessionToken: crypto.randomUUID(),
    });

    /*
    |--------------------------------------------------------------------------
    | Occupy Table
    |--------------------------------------------------------------------------
    */

    await tableRepository.update(
      table._id ?? table.id,
      restaurant._id ?? restaurant.id,
      {
        status: TABLE_STATUS.OCCUPIED,
      },
    );

    return {
      resumed: false,
      session,
    };
  }
}

export default new DiningSessionService();
