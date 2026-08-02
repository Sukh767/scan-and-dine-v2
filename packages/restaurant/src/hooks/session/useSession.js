import { useQuery } from "@tanstack/react-query";

import { sessionService } from "../../services/session";
import { restaurantKeys } from "../../keys";

export function useSession(sessionId) {
  return useQuery({
    enabled: !!sessionId,

    queryKey: restaurantKeys.session(sessionId),

    queryFn: () => sessionService.getSession(sessionId),
  });
}