import { z } from "zod";
import { TABLE_STATUS_VALUES } from "../constants/index.js";

/*
|--------------------------------------------------------------------------
| Create Table
|--------------------------------------------------------------------------
*/

export const createTableSchema = z.object({
  body: z.object({
    tableNumber: z.string().trim().min(1).max(30),

    label: z.string().trim().max(100).optional(),

    description: z.string().trim().max(300).optional(),

    capacity: z.number().int().min(1),

    floor: z.string().trim().max(100).optional(),

    section: z.string().trim().max(100).optional(),

    notes: z.string().trim().max(500).optional(),

    sortOrder: z.number().int().min(0).optional(),

    isActive: z.boolean().optional(),

    status: z.enum(TABLE_STATUS_VALUES).optional(),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Table
|--------------------------------------------------------------------------
*/

export const updateTableSchema = z.object({
  body: createTableSchema.shape.body.partial(),
});

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateTableStatusSchema = z.object({
  body: z.object({
    status: z.enum(TABLE_STATUS_VALUES),
  }),
});

/*
|--------------------------------------------------------------------------
| Update Active Status
|--------------------------------------------------------------------------
*/

export const updateTableActiveSchema = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
});
