import authRepository from "../repositories/auth.repository.js";
import mailService from "./mail.service.js";

import ApiError from "../utils/ApiError.js";
import { generateToken, hashToken } from "../utils/crypto.js";

import {
  HTTP_STATUS,
  AUTH_MESSAGES,
  VERIFICATION_TOKEN_EXPIRY,
} from "../constants/index.js";

class AuthService {
  /**
   * Register Customer
   */
  async register(userData) {
    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
      );
    }

    const user = await authRepository.createUser(userData);

    /**
     * Generate verification token
     */
    const verificationToken = generateToken();

    /**
     * Hash verification token
     */
    const hashedVerificationToken = hashToken(verificationToken);

    /**
     * Token expiry
     */
    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY);

    /**
     * Save token
     */
    await authRepository.updateVerificationToken(
      user.id,
      hashedVerificationToken,
      expiresAt,
    );

    /**
     * Verification URL
     */
    /** While frontend is being implemented */
    //const verificationUrl = `${process.env.CUSTOMER_APP_URL}/verify-email?token=${verificationToken}`;

    const verificationUrl = `${process.env.API_URL}/api/v1/auth/verify-email?token=${verificationToken}`;

    /**
     * Send verification email
     */
    await mailService.sendVerificationEmail({
      to: user.email,
      data: {
        name: user.name,
        verificationUrl,
      },
    });

    return user;
  }

  /**
   * Verify Email
   */
  async verifyEmail(token) {
    if (!token) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.INVALID_TOKEN);
    }

    /**
     * Hash incoming token
     */
    const hashedToken = hashToken(token);

    /**
     * Find user
     */
    const user = await authRepository.findUserByVerificationToken(hashedToken);

    if (!user) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.INVALID_TOKEN);
    }

    /**
     * Token expired
     */
    if (
      !user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.TOKEN_EXPIRED);
    }

    /**
     * Already verified
     */
    if (user.isVerified) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED,
      );
    }

    /**
     * Verify account
     */
    const verifiedUser = await authRepository.verifyUser(user.id);

    await mailService.sendWelcomeEmail({
      to: verifiedUser.email,
      data: {
        name: verifiedUser.name,
      },
    });

    return {
      verified: true,
    };
  }
}

export default new AuthService();
