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
   * Generate verification token and send verification email
   */
  async sendVerificationEmail(user) {
    const verificationToken = generateToken();

    const hashedVerificationToken = hashToken(verificationToken);

    const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY);

    await authRepository.updateVerificationToken(
      user.id,
      hashedVerificationToken,
      expiresAt,
    );

    // During backend development
    const verificationUrl = `${process.env.API_URL}/api/v1/auth/verify-email?token=${verificationToken}`;

    // Later switch to:
    // `${process.env.CUSTOMER_APP_URL}/verify-email?token=${verificationToken}`

    await mailService.sendVerificationEmail({
      to: user.email,
      data: {
        name: user.name,
        verificationUrl,
      },
    });
  }

  /**
   * Register Customer
   */
  async register(userData) {
    const existingUser = await authRepository.findUserByEmail(userData.email);

    if (existingUser) {
      /**
       * User exists but hasn't verified email.
       * Send a fresh verification email.
       */
      if (!existingUser.isVerified) {
        await this.sendVerificationEmail(existingUser);

        return existingUser;
      }

      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
      );
    }

    const user = await authRepository.createUser(userData);

    await this.sendVerificationEmail(user);

    return user;
  }

  /**
   * Verify Email
   */
  async verifyEmail(token) {
    if (!token) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.INVALID_TOKEN);
    }

    const hashedToken = hashToken(token);

    const user = await authRepository.findUserByVerificationToken(hashedToken);

    if (!user) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.INVALID_TOKEN);
    }

    if (
      !user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.TOKEN_EXPIRED);
    }

    if (user.isVerified) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED,
      );
    }

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

  /**
   * Resend Verification Email
   */
  async resendVerificationEmail(email) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
    }

    if (user.isVerified) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED,
      );
    }

    await this.sendVerificationEmail(user);

    return;
  }
}

export default new AuthService();
