import { getAccessToken } from "../token";

/**
 * Registers the request interceptor.
 *
 * @param {import("axios").AxiosInstance} apiClient
 */
export const setupRequestInterceptor = (apiClient) => {
    apiClient.interceptors.request.use(
        (config) => {
            const token = getAccessToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};