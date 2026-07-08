import authRepository from "../repositories/auth.repository.js";

import ApiError from "../utils/ApiError.js";

import { verifyAccessToken } from "../utils/jwt.js";

import {
  HTTP_STATUS,
  AUTH_MESSAGES,
} from "../constants/index.js";

const authMiddleware = async (req, res, next) => {
  /**
   * Read Access Token
   */
  const token = req.cookies.accessToken;

  /**
   * Missing Token
   */
  if (!token) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.ACCESS_TOKEN_MISSING
    );
  }

  let payload;

  /**
   * Verify JWT
   */
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_ACCESS_TOKEN
    );
  }

  /**
   * Find User
   */
  const user = await authRepository.findUserById(
    payload.id
  );

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.UNAUTHORIZED
    );
  }

  /**
   * Account Disabled
   */
  if (!user.isActive) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      AUTH_MESSAGES.ACCOUNT_DEACTIVATED
    );
  }

  /**
   * Attach User
   */
  req.user = user;

  next();
};

export default authMiddleware;