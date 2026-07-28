import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { restaurantKeys } from "../../keys";

import { categoryService } from "../../services/category";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => categoryService.updateCategory(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.categories(),
      });
    },
  });
}
