import { useQuery } from "@tanstack/react-query";

import { tableService } from "../../services/table";
import { restaurantKeys } from "../../keys";

export function useTables(filters = {}) {
  return useQuery({
    queryKey: [...restaurantKeys.tables(), filters],
    queryFn: () => tableService.getTables(filters),
  });
}