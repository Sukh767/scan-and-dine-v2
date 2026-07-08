import ApiResponse from "../utils/ApiResponse.js";

import authRepository from "../repositories/auth.repository.js";

import { hashToken } from "../utils/crypto.js";
import { generateTokens } from "./generateTokens.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "./cookieOptions.js";

import { toUserResponse } from "../transformers/index.js";

export const sendTokenResponse = async ({
  res,
  statusCode,
  message,
  user,
}) => {
  /**
   * Generate JWTs
   */
  const { accessToken, refreshToken } =
    generateTokens(user);

  /**
   * Store hashed refresh token
   */
  await authRepository.updateRefreshToken(
    user.id,
    hashToken(refreshToken)
  );

  /**
   * Set cookies
   */
  res.cookie(
    "accessToken",
    accessToken,
    accessTokenCookieOptions
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    refreshTokenCookieOptions
  );

  /**
   * Send response
   */
  return res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      message,
      toUserResponse(user)
    )
  );
};