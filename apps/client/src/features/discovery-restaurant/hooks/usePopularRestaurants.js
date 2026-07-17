import { useQuery } from "@tanstack/react-query";

import { publicRestaurantApi } from "@scan/api";

import { QUERY_KEYS } from "@scan/query";

export const usePopularRestaurants = () => {
  return useQuery({
    queryKey: QUERY_KEYS.restaurants.popular,

    queryFn: () => publicRestaurantApi.getPopularRestaurants(),
  });
};
