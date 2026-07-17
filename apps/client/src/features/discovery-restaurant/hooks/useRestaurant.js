import { useQuery } from "@tanstack/react-query";

import { publicRestaurantApi } from "@scan/api";

import { QUERY_KEYS } from "@scan/query";

export const useRestaurant = (slug) => {
  return useQuery({
    queryKey: QUERY_KEYS.restaurants.details(slug),

    queryFn: () => publicRestaurantApi.getRestaurantBySlug(slug),

    enabled: !!slug,
  });
};
