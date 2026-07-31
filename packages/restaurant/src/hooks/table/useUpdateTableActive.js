import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useUpdateTableActive(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tableId, isActive }) =>
      tableService.updateActive(tableId, isActive),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.tables(),
      });

      queryClient.invalidateQueries({
        queryKey: restaurantKeys.table(variables.tableId),
      });

      options.onSuccess?.();
    },

    ...options,
  });
}