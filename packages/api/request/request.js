import { apiClient } from "../client";
import { HTTP_METHODS } from "../constants";

export const request = async ({
    method = HTTP_METHODS.GET,
    url,
    data,
    params,
    config = {},
}) => {
    const response = await apiClient({
        method,
        url,
        data,
        params,
        ...config,
    });

    return response.data;
};