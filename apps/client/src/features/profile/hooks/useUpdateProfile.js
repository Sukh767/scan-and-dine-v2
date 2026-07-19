import { useMutation } from "@tanstack/react-query";

import { authService } from "@scan/auth";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: authService.updateProfile,
  });
};
