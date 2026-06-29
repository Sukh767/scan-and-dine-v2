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
    return await User.findOne({ email });
  }

  /**
   * Find user by verification token
   */
  async findUserByVerificationToken(token) {
    return await User.findOne({
      verificationToken: token,
    }).select(
      "+verificationToken +verificationTokenExpiresAt"
    );
  }

  /**
   * Save verification token
   */
  async updateVerificationToken(
  userId,
  verificationToken,
  verificationTokenExpiresAt
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
    }
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
      }
    );
  }

  

  async findUserById(id) {
    return await User.findById(id);
  }
}

export default new AuthRepository();
