import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useUpdateTable(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tableId, payload }) =>
      tableService.updateTable(tableId, payload),

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