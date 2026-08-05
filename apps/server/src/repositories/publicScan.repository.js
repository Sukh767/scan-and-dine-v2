import Table from "../models/Table.model.js";

import { RESTAURANT_APPROVAL_STATUS } from "../constants/index.js";

class PublicScanRepository {
  /*
  |--------------------------------------------------------------------------
  | Find Table By QR Token
  |--------------------------------------------------------------------------
  */

  async findTableByQrToken(qrToken) {
    return Table.findOne({
      qrToken,
    }).populate({
      path: "restaurantId",
      match: {
        approvalStatus: RESTAURANT_APPROVAL_STATUS.APPROVED,
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Find Active Session By Table
  |--------------------------------------------------------------------------
  */

  async findActiveSessionByTable(tableId) {
    return diningSessionRepository.findActiveByTable(tableId);
  }
}

export default new PublicScanRepository();
