import { useQuery } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useMenus(params = {}) {
  return useQuery({
    queryKey: restaurantKeys.menus(params),

    queryFn: () => menuService.getMenus(params),
  });
}