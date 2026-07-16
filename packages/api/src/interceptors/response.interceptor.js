import axios from "axios";

import { env, runtimeConfig } from "@scan/config";

import { normalizeApiError } from "../errors";

let isRefreshing = false;

export const setupResponseInterceptor = (apiClient) => {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      const status = error?.response?.status;

      if (
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh-token")
      ) {
        originalRequest._retry = true;

        try {
          if (!isRefreshing) {
            isRefreshing = true;

            await axios.post(
              `${env.apiUrl}/auth/refresh-token`,
              {},
              {
                withCredentials: true,

                timeout: runtimeConfig.requestTimeout,
              },
            );

            isRefreshing = false;
          }

          return apiClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;

          return Promise.reject(normalizeApiError(refreshError));
        }
      }

      return Promise.reject(normalizeApiError(error));
    },
  );
};
