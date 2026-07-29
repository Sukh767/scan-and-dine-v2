import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const jsonParser = (schema) =>
  z.preprocess((value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    return value;
  }, schema);

/*
|--------------------------------------------------------------------------
| Variant Schema
|--------------------------------------------------------------------------
*/

const variantSchema = z.object({
  name: z.string().trim().min(1).max(100),

  price: z.coerce.number().min(0),

  isAvailable: z.coerce.boolean().optional(),

  sortOrder: z.coerce.number().int().min(0).optional(),
});

/*
|--------------------------------------------------------------------------
| Nutrition Schema
|--------------------------------------------------------------------------
*/

const nutritionSchema = z.object({
  calories: z.coerce.number().min(0).optional(),

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

    imageUrls: z.preprocess((value) => {
      if (value === undefined) return undefined;

      if (Array.isArray(value)) return value;

      return [value];
    }, z.array(z.string().url()).optional()),

    price: z.coerce.number().min(0),

    isVeg: z.coerce.boolean().optional(),

    isVegan: z.coerce.boolean().optional(),

    isJain: z.coerce.boolean().optional(),

    isGlutenFree: z.coerce.boolean().optional(),

    spiceLevel: z
      .enum(["none", "mild", "medium", "hot", "extra_hot"])
      .optional(),

    preparationTime: z.coerce.number().int().min(1).optional(),

    variants: jsonParser(z.array(variantSchema)).optional(),

    nutrition: jsonParser(nutritionSchema).optional(),

    allowCustomNote: z.coerce.boolean().optional(),

    isFeatured: z.coerce.boolean().optional(),

    isBestSeller: z.coerce.boolean().optional(),

    isRecommended: z.coerce.boolean().optional(),

    sortOrder: z.coerce.number().int().min(0).optional(),
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
    isActive: z.coerce.boolean(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Availability
|--------------------------------------------------------------------------
*/

export const updateAvailabilitySchema = z.object({
  body: z.object({
    isAvailable: z.coerce.boolean(),
  }),
});
