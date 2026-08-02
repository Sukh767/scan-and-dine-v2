import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restaurantKeys } from "../../keys";
import { sessionService } from "../../services/session";

export function useStartSession(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionService.startSession,

    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.sessions(),
      });

      queryClient.invalidateQueries({
        queryKey: restaurantKeys.tables(),
      });

      options.onSuccess?.(...args);
    },

    ...options,
  });
}
