import { ApiError } from "./ApiError";

/**
 * Converts Axios/network errors into a unified ApiError.
 *
 * @param {any} error
 * @returns {ApiError}
 */
export const normalizeApiError = (error) => {
  if (error.response) {
    const data = error.response.data;

    return new ApiError({
      message: data.message,
      statusCode: data.statusCode,
      errors: data.errors,
      success: data.success,
    });
  }

  if (error.request) {
    return new ApiError({
      message: "Network error. Please check your internet connection.",
      statusCode: 0,
    });
  }

  return new ApiError({
    message: error.message,
  });
};
