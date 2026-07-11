import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-lg",
    "font-medium",
    "transition-all duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary-500",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-600",

        secondary: "bg-secondary-500 text-white hover:bg-secondary-600",

        outline: "border border-gray-300 hover:bg-gray-100",

        ghost: "hover:bg-gray-100",

        danger: "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md: "h-10 px-4",

        lg: "h-12 px-6 text-lg",
      },

      fullWidth: {
        true: "w-full",

        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",

      size: "md",

      fullWidth: false,
    },
  },
);
