import { apiClient } from "../client";
import { HTTP_METHODS } from "../constants";

/**
 * Base request function.
 *
 * @param {Object} options
 * @returns {Promise<any>}
 */
const executeRequest = async ({
    method,
    url,
    data,
    params,
    headers,
    signal,
    config = {},
}) => {
    const response = await apiClient({
        method,
        url,
        data,
        params,
        signal,

        headers: {
            ...headers,
        },

        ...config,
    });

    return response.data;
};

export const request = {
    get(url, params = {}, config = {}) {
        return executeRequest({
            method: HTTP_METHODS.GET,
            url,
            params,
            config,
        });
    },

    post(url, data = {}, config = {}) {
        return executeRequest({
            method: HTTP_METHODS.POST,
            url,
            data,
            config,
        });
    },

    put(url, data = {}, config = {}) {
        return executeRequest({
            method: HTTP_METHODS.PUT,
            url,
            data,
            config,
        });
    },

    patch(url, data = {}, config = {}) {
        return executeRequest({
            method: HTTP_METHODS.PATCH,
            url,
            data,
            config,
        });
    },

    delete(url, config = {}) {
        return executeRequest({
            method: HTTP_METHODS.DELETE,
            url,
            config,
        });
    },
};