import { useMutation, useQueryClient } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useUpdateMenuStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuItemId, isActive }) =>
      menuService.updateMenuStatus(menuItemId, isActive),

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
