let accessToken = null;

/**
 * Store access token in memory.
 *
 * @param {string|null} token
 */
export const setAccessToken = (token) => {
    accessToken = token;
};

/**
 * Get current access token.
 *
 * @returns {string|null}
 */
export const getAccessToken = () => {
    return accessToken;
};

/**
 * Remove access token.
 */
export const clearAccessToken = () => {
    accessToken = null;
};

/**
 * Check if access token exists.
 *
 * @returns {boolean}
 */
export const hasAccessToken = () => {
    return !!accessToken;
};