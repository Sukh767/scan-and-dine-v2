import { useQuery } from "@tanstack/react-query";

import { publicRestaurantApi } from "@scan/api";

import { QUERY_KEYS } from "@scan/query";

export const useFeaturedRestaurants = () => {
  return useQuery({
    queryKey: QUERY_KEYS.restaurants.featured,

    queryFn: () => publicRestaurantApi.getFeaturedRestaurants(),
  });
};
