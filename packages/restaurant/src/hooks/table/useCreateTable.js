import { useMutation, useQueryClient } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useCreateTable(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tableService.createTable,

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.tables(),
      });

      options.onSuccess?.(...args);
    },

    ...options,
  });
}