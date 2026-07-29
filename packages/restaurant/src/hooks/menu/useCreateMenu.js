import { useMutation, useQueryClient } from "@tanstack/react-query";

import { menuService } from "../../services";

import { restaurantKeys } from "../../keys";

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.createMenu,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.menus(),
      });
    },
  });
}
