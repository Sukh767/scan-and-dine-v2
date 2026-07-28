import { useQuery } from "@tanstack/react-query";

import { categoryService } from "../../services/category";
import { restaurantKeys } from "../../keys";

export function useCategories() {
  return useQuery({
    queryKey: restaurantKeys.categories(),

    queryFn: () => categoryService.getCategories(),
  });
}
