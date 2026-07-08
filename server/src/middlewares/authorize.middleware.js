import ApiError from "../utils/ApiError.js";

import {
  HTTP_STATUS,
  AUTH_MESSAGES,
} from "../constants/index.js";

const authorize =
  (...roles) =>
  (req, res, next) => {
    /**
     * User Role
     */
    const userRole = req.user.role;

    /**
     * Unauthorized
     */
    if (!roles.includes(userRole)) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        AUTH_MESSAGES.FORBIDDEN
      );
    }

    next();
  };

export default authorize;