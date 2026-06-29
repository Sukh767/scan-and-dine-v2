import authService from "../services/auth.service.js";
import { toUserResponse } from "../transformers/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS, AUTH_MESSAGES } from "../constants/index.js";
// import authRepository from "../repositories/auth.repository.js";

import { sendTokenResponse } from "../helpers/sendTokenResponse.js";
import { clearCookieOptions } from "../helpers/cookieOptions.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          AUTH_MESSAGES.REGISTER_SUCCESS,
          toUserResponse(user),
        ),
      );
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const result = await authService.verifyEmail(req.query.token);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(HTTP_STATUS.OK, AUTH_MESSAGES.EMAIL_VERIFIED, result),
      );
  });

  resendVerificationEmail = asyncHandler(async (req, res) => {
    await authService.resendVerificationEmail(req.body.email);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          AUTH_MESSAGES.VERIFICATION_EMAIL_RESENT,
        ),
      );
  });

  login = asyncHandler(async (req, res) => {
    const user = await authService.login(req.body.email, req.body.password);

    return await sendTokenResponse({
      res,
      statusCode: HTTP_STATUS.OK,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      user,
    });
  });

  refreshToken = asyncHandler(async (req, res) => {
    const user = await authService.refreshToken(req.cookies.refreshToken);

    return await sendTokenResponse({
      res,
      statusCode: HTTP_STATUS.OK,
      message: AUTH_MESSAGES.TOKEN_REFRESHED,
      user,
    });
  });

  logout = asyncHandler(async (req, res) => {
    await authService.logout(req.cookies.refreshToken);

    res.clearCookie("accessToken", clearCookieOptions);

    res.clearCookie("refreshToken", clearCookieOptions);

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, AUTH_MESSAGES.LOGOUT_SUCCESS));
  });
}

export default new AuthController();
