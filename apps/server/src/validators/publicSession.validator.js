import { z } from "zod";

export const getPublicSessionSchema = z.object({
  params: z.object({
    sessionToken: z.string().trim().uuid(),
  }),
});
