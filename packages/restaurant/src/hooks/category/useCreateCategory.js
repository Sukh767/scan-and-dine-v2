import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { restaurantKeys } from "../../keys";

import { categoryService } from "../../services/category";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.createCategory,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.categories(),
      });
    },
  });
}
