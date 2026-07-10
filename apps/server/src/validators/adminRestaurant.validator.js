import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Params
|--------------------------------------------------------------------------
*/

const restaurantIdParams = z.object({
  id: z.string().trim().min(1, "Restaurant id is required."),
});

/*
|--------------------------------------------------------------------------
| Approve Restaurant
|--------------------------------------------------------------------------
*/

export const approveRestaurantSchema = z.object({
  params: restaurantIdParams,
});

/*
|--------------------------------------------------------------------------
| Reject Restaurant
|--------------------------------------------------------------------------
*/

export const rejectRestaurantSchema = z.object({
  params: restaurantIdParams,

  body: z.object({
    reason: z.string().trim().min(5, "Rejection reason is required.").max(500),
  }),
});
