import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Variant Schema
|--------------------------------------------------------------------------
*/

const variantSchema = z.object({
  name: z.string().trim().min(1).max(100),

  price: z.number().min(0),

  isAvailable: z.boolean().optional(),

  sortOrder: z.number().int().min(0).optional(),
});

/*
|--------------------------------------------------------------------------
| Nutrition Schema
|--------------------------------------------------------------------------
*/

const nutritionSchema = z.object({
  calories: z.number().min(0).optional(),

  servingSize: z.string().trim().optional(),
});

/*
|--------------------------------------------------------------------------
| Create Menu Item
|--------------------------------------------------------------------------
*/

export const createMenuItemSchema = z.object({
  body: z.object({
    categoryId: z.string(),

    name: z.string().trim().min(2).max(100),

    description: z.string().trim().max(1000).optional(),

    price: z.number().min(0),

    isVeg: z.boolean().optional(),

    isVegan: z.boolean().optional(),

    isJain: z.boolean().optional(),

    isGlutenFree: z.boolean().optional(),

    spiceLevel: z
      .enum(["none", "mild", "medium", "hot", "extra_hot"])
      .optional(),

    preparationTime: z.number().int().min(1).optional(),

    variants: z.array(variantSchema).optional(),

    nutrition: nutritionSchema.optional(),

    allowCustomNote: z.boolean().optional(),

    isFeatured: z.boolean().optional(),

    isBestSeller: z.boolean().optional(),

    isRecommended: z.boolean().optional(),

    sortOrder: z.number().int().min(0).optional(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Menu Item
|--------------------------------------------------------------------------
*/

export const updateMenuItemSchema = z.object({
  body: createMenuItemSchema.shape.body.partial(),
});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateMenuStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Availability
|--------------------------------------------------------------------------
*/

export const updateAvailabilitySchema = z.object({
  body: z.object({
    isAvailable: z.boolean(),
  }),
});
