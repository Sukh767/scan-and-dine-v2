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
  | Start Session
  |--------------------------------------------------------------------------
  */

  async startSession(user, body) {
    const restaurant = await this.getRestaurant(user);

    const table = await this.getTable(restaurant.id, body.tableId);

    const activeSession = await diningSessionRepository.findActiveByTable(
      table.id,
    );

    if (activeSession) {
      return {
        resumed: true,

        session: toDiningSessionResponse(activeSession),
      };
    }

    const session = await diningSessionRepository.create({
      restaurantId: restaurant.id,

      tableId: table.id,

      sessionToken: crypto.randomUUID(),

      guestCount: body.guestCount ?? 1, //|| treats 0, false, "", and null as falsy.
    });

    await tableRepository.update(table.id, restaurant.id, {
      status: TABLE_STATUS.OCCUPIED,
    });

    return {
      resumed: false,

      session: toDiningSessionResponse(session),
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

    await diningSessionRepository.update(session.id, {
      lastActivityAt: new Date(),
    });

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
    //await this.getSession(sessionId);

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
}

export default new DiningSessionService();
