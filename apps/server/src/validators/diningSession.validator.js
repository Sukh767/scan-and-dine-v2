import { z } from "zod";

import { SESSION_END_REASON_VALUES } from "../constants/index.js";

/*
|--------------------------------------------------------------------------
| Start Session
|--------------------------------------------------------------------------
*/

export const startSessionSchema = z.object({
  body: z.object({
    tableId: z.string(),

    guestCount: z.number().int().min(1).optional(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Guest Count
|--------------------------------------------------------------------------
*/

export const updateGuestCountSchema = z.object({
  body: z.object({
    guestCount: z.number().int().min(1),
  }),
});

/*
|--------------------------------------------------------------------------
| End Session
|--------------------------------------------------------------------------
*/

export const endSessionSchema = z.object({
  body: z.object({
    endReason: z.enum(SESSION_END_REASON_VALUES).optional(),
  }),
});
