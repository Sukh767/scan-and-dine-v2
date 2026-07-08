const isProduction = process.env.NODE_ENV === "production";

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * Clear Cookie Options
 */
export const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
};