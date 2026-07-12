import axios from "axios";

import { API_TIMEOUT, CONTENT_TYPES } from "../constants";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  timeout: API_TIMEOUT,

  withCredentials: true,

  headers: {
    "Content-Type": CONTENT_TYPES.JSON,
  },
});
