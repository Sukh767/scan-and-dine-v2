import { useQuery } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useMenu(menuItemId) {
  return useQuery({
    enabled: !!menuItemId,

    queryKey: restaurantKeys.menu(menuItemId),

    queryFn: () => menuService.getMenu(menuItemId),
  });
}
