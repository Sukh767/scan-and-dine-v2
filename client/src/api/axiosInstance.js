import axios from "axios";

// One instance per app — each app imports and configures its own baseURL via env
const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });

  // Request: attach JWT
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response: handle errors globally
  instance.interceptors.response.use(
    (response) => response.data, // unwrap .data automatically
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong.";

      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // Re-throw with clean message for toast handling in components
      return Promise.reject({ status, message, raw: error });
    },
  );

  return instance;
};

// Client app: import.meta.env.VITE_API_URL
// Admin app:  import.meta.env.VITE_API_URL
// All apps point to the same backend — just different env values if needed
export default createApiInstance;
