import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const generateTokens = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    restaurantId: user.restaurantId,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};