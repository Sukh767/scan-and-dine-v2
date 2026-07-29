import { useMutation, useQueryClient } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.deleteMenu,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.menus(),
      });
    },
  });
}
