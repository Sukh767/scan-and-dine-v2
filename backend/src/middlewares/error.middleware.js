import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  HTTP_STATUS,
  GENERAL_MESSAGES,
  AUTH_MESSAGES,
} from "../constants/index.js";

/**
 * Handle unknown routes
 */
export const notFound = (req, res, next) => {
  next(
    new ApiError(HTTP_STATUS.NOT_FOUND, `Route ${req.originalUrl} not found.`),
  );
};

/**
 * Global Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  /**
   * Unknown Error
   */
  if (!(error instanceof ApiError)) {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = GENERAL_MESSAGES.SOMETHING_WENT_WRONG;
    let errors = [];

    /**
     * Mongoose Validation Error
     */
    if (error instanceof mongoose.Error.ValidationError) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = GENERAL_MESSAGES.VALIDATION_FAILED;

      errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
    } else if (error.code === 11000) {

    /**
     * Mongo Duplicate Key
     */
      statusCode = HTTP_STATUS.CONFLICT;

      const field = Object.keys(error.keyPattern)[0];

      message = GENERAL_MESSAGES.VALIDATION_FAILED;

      errors.push({
        field,
        message: `${field} already exists.`,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {

    /**
     * Invalid JWT
     */
      statusCode = HTTP_STATUS.UNAUTHORIZED;
      message = AUTH_MESSAGES.UNAUTHORIZED;
    } else if (error instanceof jwt.TokenExpiredError) {

    /**
     * Expired JWT
     */
      statusCode = HTTP_STATUS.UNAUTHORIZED;
      message = AUTH_MESSAGES.TOKEN_EXPIRED;
    }

    error = new ApiError(statusCode, message, errors);
  }

  /**
   * Development Logs
   */
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  return res
    .status(error.statusCode)
    .json(
      new ApiResponse(
        error.statusCode,
        error.message,
        null,
        false,
        error.errors,
      ),
    );
};
