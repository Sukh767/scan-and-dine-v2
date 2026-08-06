import publicMenuService from "../services/publicMenu.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, GENERAL_MESSAGES } from "../constants/index.js";

class PublicMenuController {
  /*
  |--------------------------------------------------------------------------
  | Get Public Menu
  |--------------------------------------------------------------------------
  */

  getMenu = asyncHandler(async (req, res) => {
    const menu = await publicMenuService.getMenu(req.params.sessionToken);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, GENERAL_MESSAGES.FETCH_SUCCESS, menu),
      );
  });
}

export default new PublicMenuController();
