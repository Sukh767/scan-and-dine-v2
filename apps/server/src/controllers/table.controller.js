import tableService from "../services/table.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, TABLE_MESSAGES } from "../constants/index.js";

class TableController {
  /**
   * Create Table
   */
  createTable = asyncHandler(async (req, res) => {
    const table = await tableService.createTable(req.user, req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(HTTP_STATUS.CREATED, TABLE_MESSAGES.CREATED, table),
      );
  });

  /**
   * Get Tables
   */
  getTables = asyncHandler(async (req, res) => {
    const filters = {};

    if (req.query.status) filters.status = req.query.status;

    if (req.query.floor) filters.floor = req.query.floor;

    if (req.query.section) filters.section = req.query.section;

    const tables = await tableService.getTables(req.user, filters);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, TABLE_MESSAGES.FETCHED, tables));
  });

  /**
   * Get Table
   */
  getTable = asyncHandler(async (req, res) => {
    const table = await tableService.getTableById(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, TABLE_MESSAGES.DETAILS_FETCHED, table),
      );
  });

  /**
   * Update Table
   */
  updateTable = asyncHandler(async (req, res) => {
    const table = await tableService.updateTable(
      req.user,
      req.params.id,
      req.body,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, TABLE_MESSAGES.UPDATED, table));
  });

  /**
   * Delete Table
   */
  deleteTable = asyncHandler(async (req, res) => {
    await tableService.deleteTable(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, TABLE_MESSAGES.DELETED));
  });

  /**
   * Update Status
   */
  updateStatus = asyncHandler(async (req, res) => {
    const table = await tableService.updateStatus(
      req.user,
      req.params.id,
      req.body.status,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, TABLE_MESSAGES.STATUS_UPDATED, table),
      );
  });

  /**
   * Update Active Status
   */
  updateActiveStatus = asyncHandler(async (req, res) => {
    const table = await tableService.updateActiveStatus(
      req.user,
      req.params.id,
      req.body.isActive,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          TABLE_MESSAGES.ACTIVE_STATUS_UPDATED,
          table,
        ),
      );
  });
}

export default new TableController();
