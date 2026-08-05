import publicScanRepository from "../repositories/publicScan.repository.js";
import diningSessionService from "./diningSession.service.js";

import ApiError from "../utils/ApiError.js";

import {
  toPublicScanResponse,
  toPublicSessionResponse,
} from "../transformers/publicScan.transformer.js";

import {
  HTTP_STATUS,
  TABLE_MESSAGES,
  TABLE_STATUS,
  RESTAURANT_MESSAGES,
  RESTAURANT_APPROVAL_STATUS,
  RESTAURANT_OPERATIONAL_STATUS,
} from "../constants/index.js";

class PublicScanService {
  /*
  |--------------------------------------------------------------------------
  | Scan QR
  |--------------------------------------------------------------------------
  */

  async scanQr(qrToken) {
    /*
    |--------------------------------------------------------------------------
    | Find Table
    |--------------------------------------------------------------------------
    */

    const table = await publicScanRepository.findTableByQrToken(qrToken);

    if (!table) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, TABLE_MESSAGES.NOT_FOUND);
    }

    /*
    |--------------------------------------------------------------------------
    | Restaurant Exists
    |--------------------------------------------------------------------------
    */

    const restaurant = table.restaurantId;

    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, RESTAURANT_MESSAGES.NOT_FOUND);
    }

    /*
    |--------------------------------------------------------------------------
    | Restaurant Approval
    |--------------------------------------------------------------------------
    */

    if (restaurant.approvalStatus !== RESTAURANT_APPROVAL_STATUS.APPROVED) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        RESTAURANT_MESSAGES.NOT_APPROVED,
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Restaurant Operational Status
    |--------------------------------------------------------------------------
    */

    switch (restaurant.operationalStatus) {
      case RESTAURANT_OPERATIONAL_STATUS.OPEN:
        break;

      case RESTAURANT_OPERATIONAL_STATUS.BUSY:
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESTAURANT_MESSAGES.BUSY);

      case RESTAURANT_OPERATIONAL_STATUS.CLOSED:
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESTAURANT_MESSAGES.CLOSED);

      case RESTAURANT_OPERATIONAL_STATUS.MAINTENANCE:
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          RESTAURANT_MESSAGES.MAINTENANCE,
        );

      default:
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          RESTAURANT_MESSAGES.UNAVAILABLE,
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Table Active
    |--------------------------------------------------------------------------
    */

    if (!table.isActive) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, TABLE_MESSAGES.UNAVAILABLE);
    }

    /*
    |--------------------------------------------------------------------------
    | Table Status
    |--------------------------------------------------------------------------
    */

    switch (table.status) {
      case TABLE_STATUS.AVAILABLE:
      case TABLE_STATUS.OCCUPIED:
        break;

      case TABLE_STATUS.RESERVED:
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, TABLE_MESSAGES.RESERVED);

      case TABLE_STATUS.INACTIVE:
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, TABLE_MESSAGES.UNAVAILABLE);

      default:
        throw new ApiError(HTTP_STATUS.BAD_REQUEST, TABLE_MESSAGES.UNAVAILABLE);
    }

    /*
    |--------------------------------------------------------------------------
    | Active Session (via Service – no direct repo access)
    |--------------------------------------------------------------------------
    */

    const activeSession = await diningSessionService.getActiveSessionByTable(
      table.id,
    );

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return toPublicScanResponse(restaurant, table, activeSession);
  }

  /*
  |--------------------------------------------------------------------------
  | Start Public Session (Session Creation)
  |--------------------------------------------------------------------------
  */

  async startPublicSession(body) {
    const table = await publicScanRepository.findTableByQrToken(body.qrToken);

    if (!table) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, TABLE_MESSAGES.NOT_FOUND);
    }

    const result = await diningSessionService.createSessionCore({
      restaurant: table.restaurantId,
      table,
      guestCount: body.guestCount,
      customerId: null,
    });

    return result;
  }

  async startSession(body) {
    /*
  |--------------------------------------------------------------------------
  | Find Table
  |--------------------------------------------------------------------------
  */

    const table = await publicScanRepository.findTableByQrToken(body.qrToken);

    if (!table) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, TABLE_MESSAGES.NOT_FOUND);
    }

    /*
  |--------------------------------------------------------------------------
  | Restaurant
  |--------------------------------------------------------------------------
  */

    const restaurant = table.restaurantId;

    if (!restaurant) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, RESTAURANT_MESSAGES.NOT_FOUND);
    }

    /*
  |--------------------------------------------------------------------------
  | Shared Session Creation
  |--------------------------------------------------------------------------
  */

    const result = await diningSessionService.createSessionCore({
      restaurant,

      table,

      guestCount: body.guestCount,
    });

    return toPublicSessionResponse(
      restaurant,
      table,
      result.session,
      result.resumed,
    );
  }
}

export default new PublicScanService();
