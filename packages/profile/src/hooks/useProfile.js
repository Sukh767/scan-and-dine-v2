import { authService } from "@scan/auth";
import { QUERY_KEYS } from "@scan/query";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.auth.me,

    queryFn: () => authService.getCurrentUser(),
  });
};
