import { http } from "../core";
import { HTTP_METHODS } from "../constants";

const execute = async ({
  method,
  url,
  data,
  params,
  headers,
  signal,
  config = {},
}) => {
  const response = await http({
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

export const api = Object.freeze({
  get(url, params = {}, config = {}) {
    return execute({
      method: HTTP_METHODS.GET,
      url,
      params,
      config,
    });
  },

  post(url, data = {}, config = {}) {
    return execute({
      method: HTTP_METHODS.POST,
      url,
      data,
      config,
    });
  },

  put(url, data = {}, config = {}) {
    return execute({
      method: HTTP_METHODS.PUT,
      url,
      data,
      config,
    });
  },

  patch(url, data = {}, config = {}) {
    return execute({
      method: HTTP_METHODS.PATCH,
      url,
      data,
      config,
    });
  },

  delete(url, config = {}) {
    return execute({
      method: HTTP_METHODS.DELETE,
      url,
      config,
    });
  },
});
