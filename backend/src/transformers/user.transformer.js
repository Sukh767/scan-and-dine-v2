/**
 * Transform User document into API response
 *
 * @param {Object} user - Mongoose User document
 * @returns {Object}
 */
export const toUserResponse = (user) => {
  const {
    id,
    name,
    email,
    phone,
    role,
    avatar,
    isVerified,
    isActive,
    restaurantId,
    createdAt,
    updatedAt,
  } = user;

  return {
    id,
    name,
    email,
    phone,
    role,
    avatar,
    isVerified,
    isActive,
    restaurantId,
    createdAt,
    updatedAt,
  };
};