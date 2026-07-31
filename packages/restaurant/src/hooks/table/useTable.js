import { useQuery } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useTable(tableId) {
  return useQuery({
    enabled: !!tableId,

    queryKey: restaurantKeys.table(tableId),

    queryFn: () => tableService.getTable(tableId),
  });
}