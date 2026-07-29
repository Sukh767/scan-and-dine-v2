import { useMutation, useQueryClient } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuItemId, payload }) =>
      menuService.updateMenu(menuItemId, payload),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.menus(),
      });

      queryClient.invalidateQueries({
        queryKey: restaurantKeys.menu(variables.menuItemId),
      });
    },
  });
}
