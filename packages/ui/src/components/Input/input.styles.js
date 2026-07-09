import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full",
    "rounded-lg",
    "border",
    "bg-white",
    "px-4",
    "py-2",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary-500",
    "disabled:cursor-not-allowed",
    "disabled:opacity-60",
  ],
  {
    variants: {
      state: {
        default: "border-gray-300",

        error: "border-red-500 focus:ring-red-500",
      },

      size: {
        sm: "h-9 text-sm",

        md: "h-10",

        lg: "h-12 text-lg",
      },
    },

    defaultVariants: {
      state: "default",

      size: "md",
    },
  },
);
