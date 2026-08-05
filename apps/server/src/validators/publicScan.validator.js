import { z } from "zod";

export const scanQrSchema = z.object({
  params: z.object({
    qrToken: z.string().trim().min(1),
  }),
});

export const startPublicSessionSchema = z.object({
  body: z.object({
    qrToken: z.string().trim().min(1),

    guestCount: z.coerce.number().int().min(1).max(20).default(1),
  }),
});
