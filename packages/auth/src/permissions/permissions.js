import { ROLES } from "./roles";

/**
 * Returns true if the user has one of the required roles.
 *
 * @param {string|null} role
 * @param {string[]} allowedRoles
 */
export const hasPermission = (role, allowedRoles = []) => {
  if (!role) return false;

  return allowedRoles.includes(role);
};

export { ROLES };
