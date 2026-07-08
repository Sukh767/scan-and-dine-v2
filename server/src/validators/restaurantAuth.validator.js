import { z } from "zod";

export const restaurantRegisterSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100),

      email: z.string().trim().email("Invalid email address.").toLowerCase(),

      phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 digits.")
        .max(15),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
          "Password must contain uppercase, lowercase, number and special character.",
        ),

      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    }),
});
