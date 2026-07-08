import { z } from "zod";

import { jsonParser } from "../helpers/zod.parsers.js";

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters.")
      .max(100),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    icon: z
      .string()
      .trim()
      .optional(),

    sortOrder: z
      .number()
      .int()
      .min(0)
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    icon: z
      .string()
      .trim()
      .optional(),

    sortOrder: z
      .number()
      .int()
      .min(0)
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateCategoryStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
});

/*
|--------------------------------------------------------------------------
| Reorder Categories
|--------------------------------------------------------------------------
*/

export const reorderCategorySchema = z.object({
  body: jsonParser(
    z.array(
      z.object({
        id: z.string(),

        sortOrder: z
          .number()
          .int()
          .min(0),
      }),
    ),
  ),
});