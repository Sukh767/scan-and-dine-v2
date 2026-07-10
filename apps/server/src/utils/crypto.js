import crypto from "crypto";

/**
 * Generate a cryptographically secure random token.
 *
 * @param {number} bytes - Number of random bytes.
 * @returns {string}
 */
export const generateToken = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

/**
 * Hash a token using SHA-256.
 *
 * @param {string} token
 * @returns {string}
 */
export const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};