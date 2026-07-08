import axios from "axios";

import { API_TIMEOUT, CONTENT_TYPES } from "../constants";

export const apiClient = axios.create({
    baseURL: "",
    timeout: API_TIMEOUT,

    headers: {
        "Content-Type": CONTENT_TYPES.JSON,
    },

    withCredentials: true,
});