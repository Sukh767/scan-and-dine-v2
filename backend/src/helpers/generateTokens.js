import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};