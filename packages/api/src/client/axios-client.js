import axios from "axios";

import { env, runtimeConfig } from "@scan/config";

import { CONTENT_TYPES } from "../constants";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "../interceptors";

export const apiClient = axios.create({
  baseURL: env.apiUrl,

  timeout: runtimeConfig.requestTimeout,

  headers: {
    "Content-Type": CONTENT_TYPES.JSON,
  },

  withCredentials: true,
});

setupRequestInterceptor(apiClient);
setupResponseInterceptor(apiClient);
