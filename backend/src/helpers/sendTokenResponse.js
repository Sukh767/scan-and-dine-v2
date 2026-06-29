import { hashToken } from "../utils/crypto.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "./cookieOptions.js";

import { generateTokens } from "./generateTokens.js";

import { toUserResponse } from "../transformers/index.js";

import ApiResponse from "../utils/ApiResponse.js";

export const sendTokenResponse = async ({
  res,
  statusCode,
  message,
  user,
  authRepository,
}) => {
  const { accessToken, refreshToken } =
    generateTokens(user);

  await authRepository.updateRefreshToken(
    user.id,
    hashToken(refreshToken)
  );

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

  return res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      message,
      toUserResponse(user)
    )
  );
};