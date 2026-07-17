import { useQuery } from "@tanstack/react-query";

import { publicRestaurantApi } from "@scan/api";

import { QUERY_KEYS } from "@scan/query";

export const useRestaurants = (params = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.restaurants.all, params],

    queryFn: () => publicRestaurantApi.getRestaurants(params),
  });
};
