import { z } from "zod";

export const getPublicMenuSchema = z.object({
  params: z.object({
    sessionToken: z.string().trim().uuid(),
  }),
});
