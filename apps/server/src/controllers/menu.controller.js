import menuService from "../services/menu.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, MENU_MESSAGES } from "../constants/index.js";

class MenuController {
  createMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await menuService.createMenuItem(req.user, req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(HTTP_STATUS.CREATED, MENU_MESSAGES.CREATED, menuItem),
      );
  });

  getMenuItems = asyncHandler(async (req, res) => {
    const menuItems = await menuService.getMenuItems(req.user);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, MENU_MESSAGES.FETCHED, menuItems));
  });

  getMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await menuService.getMenuItemById(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          MENU_MESSAGES.DETAILS_FETCHED,
          menuItem,
        ),
      );
  });

  updateMenuItem = asyncHandler(async (req, res) => {
    const menuItem = await menuService.updateMenuItem(
      req.user,
      req.params.id,
      req.body,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, MENU_MESSAGES.UPDATED, menuItem));
  });

  deleteMenuItem = asyncHandler(async (req, res) => {
    await menuService.deleteMenuItem(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, MENU_MESSAGES.DELETED));
  });

  updateStatus = asyncHandler(async (req, res) => {
    const menuItem = await menuService.updateStatus(
      req.user,
      req.params.id,
      req.body.isActive,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, MENU_MESSAGES.STATUS_UPDATED, menuItem),
      );
  });

  updateAvailability = asyncHandler(async (req, res) => {
    const menuItem = await menuService.updateAvailability(
      req.user,
      req.params.id,
      req.body.isAvailable,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          MENU_MESSAGES.AVAILABILITY_UPDATED,
          menuItem,
        ),
      );
  });
}

export default new MenuController();
