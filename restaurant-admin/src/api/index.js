import axios from "axios";

/**
 * Centralized API client for the Restaurant Admin App
 *
 * Environment Variables:
 * - VITE_API_URL: Backend base URL (dev: http://localhost:5000, prod: https://api.yourdomain.com)
 *
 * Features:
 * - Automatic JWT token injection from localStorage
 * - Global 401 error handling with token refresh
 * - CORS-friendly with absolute URLs
 * - Development and production support
 */

// Get API URL from environment, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Log API configuration in development
if (import.meta.env.DEV) {
  console.log("[API] Initialized with base URL:", `${API_URL}/api/v1`);
}

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Request Interceptor: Attach JWT token to all requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response Interceptor: Handle errors and auto-refresh on 401
 */
api.interceptors.response.use(
  (res) => res.data, // Auto-unwrap response.data
  async (err) => {
    const original = err.config;
    const status = err.response?.status;
    const message = err.response?.data?.message || "Something went wrong.";

    // Handle 401 with automatic token refresh
    if (status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Refresh the token
        const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
          refreshToken,
        });
        const { data } = response;

        // Update localStorage with new tokens
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        // Retry original request with new token
        original.headers.Authorization = `Bearer ${data.data.token}`;
        return api(original);
      } catch (refreshErr) {
        // Refresh failed, clear auth and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    // Log errors in development
    if (import.meta.env.DEV) {
      console.error("[API Error]", { status, message, url: original?.url });
    }

    // Return clean error object for component error handling
    return Promise.reject({
      status,
      message,
      raw: err,
    });
  },
);

export default api;
