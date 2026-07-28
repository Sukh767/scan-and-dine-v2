import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { restaurantKeys } from "../../keys";

import { categoryService } from "../../services/category";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.deleteCategory,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.categories(),
      });
    },
  });
}
