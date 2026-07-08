/**
 * Registers the response interceptor.
 *
 * @param {import("axios").AxiosInstance} apiClient
 */
export const setupResponseInterceptor = (apiClient) => {
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );
};