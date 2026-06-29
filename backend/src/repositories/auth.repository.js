import User from "../models/User.model.js";

class AuthRepository {
  /**
   * Create a new user
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  async createUser(userData) {
    return await User.create(userData);
  }

  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<User | null>}
   */
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default new AuthRepository();