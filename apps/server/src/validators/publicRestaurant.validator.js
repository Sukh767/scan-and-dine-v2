import { z } from "zod";

export const getPublicRestaurantsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),

    limit: z.coerce.number().int().min(1).max(50).optional(),

    search: z.string().trim().optional(),

    city: z.string().trim().optional(),

    cuisine: z.string().trim().optional(),

    featured: z.coerce.boolean().optional(),

    sort: z
      .enum([
        "popular",
        "rating",
        "newest",
        "name",
      ])
      .optional(),
  }),
});

export const getRestaurantBySlugSchema = z.object({
  params: z.object({
    slug: z.string().trim().min(1),
  }),
});