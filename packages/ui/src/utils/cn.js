import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely.
 */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
