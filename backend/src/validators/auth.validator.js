import { z } from "zod";

/**
 * -----------------------------------------
 * Common Validation Rules
 * -----------------------------------------
 */

const name = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters.")
  .max(50, "Name cannot exceed 50 characters.");

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address.");

const phone = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number.");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(32, "Password cannot exceed 32 characters.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]+$/,
    "Password must contain uppercase, lowercase, number and special character."
  );

/**
 * -----------------------------------------
 * Register
 * -----------------------------------------
 */

export const registerSchema = z.object({
  body: z.object({
    name,
    email,
    phone,
    password,
  }),
});

/**
 * -----------------------------------------
 * Login
 * -----------------------------------------
 */

export const loginSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(1, "Password is required."),
  }),
});

/**
 * -----------------------------------------
 * Forgot Password
 * -----------------------------------------
 */

export const forgotPasswordSchema = z.object({
  body: z.object({
    email,
  }),
});

/**
 * -----------------------------------------
 * Reset Password
 * -----------------------------------------
 */

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Reset token is required."),
    password,
  }),
});

/**
 * -----------------------------------------
 * Change Password
 * -----------------------------------------
 */

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: password,
  }),
});

/**
 * -----------------------------------------
 * Update Profile
 * -----------------------------------------
 */

export const updateProfileSchema = z.object({
  body: z.object({
    name: name.optional(),
    phone: phone.optional(),
    avatar: z.string().url().optional(),
  }),
});

export const resendVerificationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email("Please provide a valid email address."),
  }),
});