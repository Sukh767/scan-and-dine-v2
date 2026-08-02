import { useQuery } from "@tanstack/react-query";

import { sessionService } from "../../services/session";
import { restaurantKeys } from "../../keys";

export function useSessions(filters = {}) {
  return useQuery({
    queryKey: [...restaurantKeys.sessions(), filters],

    queryFn: () => sessionService.getSessions(filters),
  });
}
