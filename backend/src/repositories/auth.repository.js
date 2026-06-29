import User from "../models/user.model.js";

class AuthRepository {
  /**
   * Create a new user
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  async createUser(userData) {
    return await User.create(userData);
  }
}

export default new AuthRepository();