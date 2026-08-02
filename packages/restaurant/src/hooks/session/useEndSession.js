import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restaurantKeys } from "../../keys";
import { sessionService } from "../../services/session";

export function useEndSession(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sessionService.endSession,

    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({
        queryKey: restaurantKeys.sessions(),
      });

      queryClient.invalidateQueries({
        queryKey: restaurantKeys.session(sessionId),
      });

      queryClient.invalidateQueries({
        queryKey: restaurantKeys.tables(),
      });

      options.onSuccess?.();
    },

    ...options,
  });
}
