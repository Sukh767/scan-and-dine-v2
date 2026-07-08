import { z } from "zod";

import { jsonParser } from "../helpers/zod.parsers.js";

/*
|--------------------------------------------------------------------------
| Shared Schemas
|--------------------------------------------------------------------------
*/

const addressSchema = z.object({
  street: z.string().trim().min(1).optional(),

  city: z.string().trim().min(1).optional(),

  state: z.string().trim().min(1).optional(),

  country: z.string().trim().min(1).optional(),

  pincode: z.string().trim().min(1).optional(),

  coordinates: z
    .object({
      type: z.literal("Point"),

      coordinates: z.array(z.number()).length(2),
    })
    .optional(),
});

const socialMediaSchema = z.object({
  facebook: z.string().trim().url().optional().or(z.literal("")),

  instagram: z.string().trim().url().optional().or(z.literal("")),

  x: z.string().trim().url().optional().or(z.literal("")),

  youtube: z.string().trim().url().optional().or(z.literal("")),
});

const daySchema = z.object({
  isOpen: z.boolean().optional(),

  open: z.string().optional(),

  close: z.string().optional(),
});

const operatingHoursSchema = z.object({
  monday: daySchema.optional(),

  tuesday: daySchema.optional(),

  wednesday: daySchema.optional(),

  thursday: daySchema.optional(),

  friday: daySchema.optional(),

  saturday: daySchema.optional(),

  sunday: daySchema.optional(),
});

/*
|--------------------------------------------------------------------------
| Update Restaurant Profile
|--------------------------------------------------------------------------
*/

export const updateRestaurantProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3).max(100).optional(),

    description: z.string().trim().max(1000).optional(),

    phone: z.string().trim().min(10).max(15).optional(),

    email: z.string().trim().email().optional(),

    website: z.string().trim().url().optional().or(z.literal("")),

    priceRange: z.string().optional(),

    cuisineTypes: jsonParser(z.array(z.string())).optional(),

    facilities: jsonParser(z.array(z.string())).optional(),

    address: jsonParser(addressSchema).optional(),

    operatingHours: jsonParser(operatingHoursSchema).optional(),

    socialMedia: jsonParser(socialMediaSchema).optional(),
  }),
});
