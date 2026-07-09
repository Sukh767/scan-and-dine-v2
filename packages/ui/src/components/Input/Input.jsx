import { forwardRef } from "react";
import PropTypes from "prop-types";

import { cn } from "../../utils";
import { inputVariants } from "./input.styles";
import { FormField } from "../FormField";

export const Input = forwardRef(
  ({ label, helperText, error, required, size, className, ...props }, ref) => {
    const state = error ? "error" : "default";

    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        error={error}
      >
        <input
          ref={ref}
          className={cn(
            inputVariants({
              state,
              size,
            }),
            className,
          )}
          {...props}
        />
      </FormField>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,

  helperText: PropTypes.string,

  error: PropTypes.string,

  required: PropTypes.bool,

  size: PropTypes.string,

  className: PropTypes.string,
};
