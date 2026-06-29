import authService from "../services/auth.service.js";
import { toUserResponse } from "../transformers/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS, AUTH_MESSAGES } from "../constants/index.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        AUTH_MESSAGES.REGISTER_SUCCESS,
        toUserResponse(user)
      )
    );
  });
}

export default new AuthController();