import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useDeleteTable(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tableService.deleteTable,

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.tables(),
      });

      options.onSuccess?.(...args);
    },

    ...options,
  });
}