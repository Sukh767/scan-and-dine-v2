import React, { useState, forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  const {
    label,
    id,
    extra = "",
    type = "text",
    placeholder,
    variant = "default",
    state, // "error" | "success" | undefined
    disabled = false,
    helperText,
    startIcon,
    endIcon,
    className = "",
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;

  // Dynamic accessibility helper ID
  const helperId = id && helperText ? `${id}-helper-text` : undefined;

  // Label styling aligned with variant configuration
  const labelClasses = `block text-sm text-navy-700 dark:text-white transition-colors ${
    variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
  }`;

  // Base and state-driven border & glow styles
  let stateClasses =
    "border-gray-200 text-navy-700 dark:border-white/10 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  if (disabled) {
    stateClasses =
      "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-white/20 cursor-not-allowed text-gray-400";
  } else if (state === "error") {
    stateClasses =
      "border-red-500 text-red-500 placeholder:text-red-300 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";
  } else if (state === "success") {
    stateClasses =
      "border-green-500 text-green-500 placeholder:text-green-300 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20";
  }

  return (
    <div className={`w-full ${extra} ${className}`.trim()}>
      {/* Input Label */}
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative mt-2 flex items-center">
        {/* Start Icon Slot */}
        {startIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-300">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          disabled={disabled}
          type={actualType}
          id={id}
          placeholder={placeholder}
          aria-invalid={state === "error"}
          aria-describedby={helperId}
          className={`flex h-12 w-full items-center rounded-xl border bg-transparent p-3 text-sm outline-none transition-all duration-200 ease-in-out ${
            startIcon ? "pl-10" : ""
          } ${endIcon || isPassword ? "pr-10" : ""} ${stateClasses}`}
          {...rest}
        />

        {/* Password Toggle or End Icon Slot */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 flex items-center text-gray-400 hover:text-navy-700 dark:hover:text-white transition-colors focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              /* Eye Off Icon */
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                />
              </svg>
            ) : (
              /* Eye Icon */
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        ) : endIcon ? (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-300">
            {endIcon}
          </div>
        ) : null}
      </div>

      {/* Helper / Error Text */}
      {helperText && (
        <p
          id={helperId}
          className={`mt-1.5 text-xs ${
            variant === "auth" ? "ml-1.5" : "ml-3"
          } ${
            state === "error"
              ? "text-red-500 dark:text-red-400"
              : state === "success"
                ? "text-green-500 dark:text-green-400"
                : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
