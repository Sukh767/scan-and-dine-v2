import User from "../models/User.model.js";

class AuthRepository {
  /**
   * Create a new user
   */
  async createUser(userData) {
    return await User.create(userData);
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    return await User.findOne({ email }).select("+password +refreshToken");
  }

  /**
   * Find user by verification token
   */
  async findUserByVerificationToken(token) {
    return await User.findOne({
      verificationToken: token,
    }).select("+verificationToken +verificationTokenExpiresAt");
  }

  /**
   * Save verification token
   */
  async updateVerificationToken(
    userId,
    verificationToken,
    verificationTokenExpiresAt,
  ) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          verificationToken,
          verificationTokenExpiresAt,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Mark user as verified
   */
  async verifyUser(userId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          isVerified: true,
        },
        $unset: {
          verificationToken: 1,
          verificationTokenExpiresAt: 1,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Find unverified user by email
   */
  // async findUnverifiedUserByEmail(email) {
  //   return await User.findOne({
  //     email,
  //     isVerified: false,
  //   });
  //   }

  /**
   * Update refresh token
   */
  async updateRefreshToken(userId, refreshToken) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken,
          lastLoginAt: new Date(),
        },
      },
      {
        new: true,
      },
    );
  }

  // async findUserById(id) {
  //   return await User.findById(id);
  // }

  /**
   * Find user by refresh token
   */
  async findUserByRefreshToken(refreshToken) {
    return await User.findOne({
      refreshToken,
    }).select("+refreshToken");
  }

  /**
   * Remove refresh token
   */
  async clearRefreshToken(userId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: null,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Save reset password token
   */
  async updateResetPasswordToken(
    userId,
    resetPasswordToken,
    resetPasswordExpiresAt,
  ) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          resetPasswordToken,
          resetPasswordExpiresAt,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Find user by reset password token
   */
  async findUserByResetPasswordToken(resetPasswordToken) {
    return await User.findOne({
      resetPasswordToken,
    }).select("+password +refreshToken");
  }

  /**
 * Find user by ID
 */
async findUserById(userId, includePassword = false) {
  const query = User.findById(userId);

  if (includePassword) {
    query.select("+password +refreshToken");
  }

  return await query;
}

  /**
 * Update profile
 */
async updateProfile(userId, data) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );
}
}

export default new AuthRepository();
