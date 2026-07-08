import categoryService from "../services/category.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { HTTP_STATUS, CATEGORY_MESSAGES } from "../constants/index.js";

class CategoryController {
  /**
   * Create Category
   */
  createCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.createCategory(req.user, req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          CATEGORY_MESSAGES.CREATED,
          category,
        ),
      );
  });

  /**
   * Get Categories
   */
  getCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.getCategories(req.user);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, CATEGORY_MESSAGES.FETCHED, categories),
      );
  });

  /**
   * Get Category
   */
  getCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.getCategory(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          CATEGORY_MESSAGES.DETAILS_FETCHED,
          category,
        ),
      );
  });

  /**
   * Update Category
   */
  updateCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.updateCategory(
      req.user,
      req.params.id,
      req.body,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, CATEGORY_MESSAGES.UPDATED, category),
      );
  });

  /**
   * Delete Category
   */
  deleteCategory = asyncHandler(async (req, res) => {
    await categoryService.deleteCategory(req.user, req.params.id);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, CATEGORY_MESSAGES.DELETED));
  });

  /**
   * Update Status
   */
  updateStatus = asyncHandler(async (req, res) => {
    const category = await categoryService.updateStatus(
      req.user,
      req.params.id,
      req.body.isActive,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          CATEGORY_MESSAGES.STATUS_UPDATED,
          category,
        ),
      );
  });

  /**
   * Reorder Categories
   */
  reorderCategories = asyncHandler(async (req, res) => {
    const categories = await categoryService.reorderCategories(
      req.user,
      req.body,
    );

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          CATEGORY_MESSAGES.REORDERED,
          categories,
        ),
      );
  });
}

export default new CategoryController();
