import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "w-full",
    "rounded-lg",
    "border",
    "bg-white",
    "px-4",
    "py-3",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary-500",
  ],
  {
    variants: {
      state: {
        default: "border-gray-300",

        error: "border-red-500 focus:ring-red-500",
      },
    },

    defaultVariants: {
      state: "default",
    },
  },
);
