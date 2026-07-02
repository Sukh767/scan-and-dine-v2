import { z } from "zod";

import  {jsonParser} from "../helpers/zod.parsers.js ";

/*
|--------------------------------------------------------------------------
| Reusable Schemas
|--------------------------------------------------------------------------
*/

const socialMediaSchema = z.object({
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  x: z.string().url().optional(),
  youtube: z.string().url().optional(),
});

const operatingDaySchema = z.object({
  isOpen: z.boolean().optional(),
  open: z.string(),
  close: z.string(),
});

const operatingHoursSchema = z.object({
  monday: operatingDaySchema.optional(),
  tuesday: operatingDaySchema.optional(),
  wednesday: operatingDaySchema.optional(),
  thursday: operatingDaySchema.optional(),
  friday: operatingDaySchema.optional(),
  saturday: operatingDaySchema.optional(),
  sunday: operatingDaySchema.optional(),
});

const addressSchema = z.object({
  street: z.string(),

  city: z.string(),

  state: z.string(),

  country: z.string(),

  pincode: z.string(),

  coordinates: z.object({
    type: z.literal("Point"),

    coordinates: z.array(z.number()).length(2),
  }),
});

/*
|--------------------------------------------------------------------------
| Create Restaurant
|--------------------------------------------------------------------------
*/

export const createRestaurantSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Restaurant name must be at least 3 characters")
      .max(100),

    description: z.string().trim().max(1000).optional(),

    phone: z.string().trim().min(10).max(15),

    email: z.string().trim().email(),

    website: z.string().trim().url().optional().or(z.literal("")),

    priceRange: z.string(),

    cuisineTypes: jsonParser(z.array(z.string())).default([]),

    facilities: jsonParser(z.array(z.string())).default([]),

    address: jsonParser(addressSchema),

    operatingHours: jsonParser(operatingHoursSchema).optional(),

    socialMedia: jsonParser(socialMediaSchema).optional(),
  }),
});
