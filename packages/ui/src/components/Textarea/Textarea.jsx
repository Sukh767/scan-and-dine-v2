import { forwardRef } from "react";
import PropTypes from "prop-types";

import { cn } from "../../utils";
import { textareaVariants } from "./textarea.styles";
import { FormField } from "../FormField";

export const Textarea = forwardRef(
  ({ label, helperText, error, required, className, ...props }, ref) => {
    const state = error ? "error" : "default";

    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText}
        error={error}
      >
        <textarea
          ref={ref}
          className={cn(
            textareaVariants({
              state,
            }),
            className,
          )}
          {...props}
        />
        <textarea
          ref={ref}
          className={cn(
            textareaVariants({
              state,
            }),
            className,
          )}
          {...props}
        />
      </FormField>
    );
  },
);

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  label: PropTypes.string,

  helperText: PropTypes.string,

  error: PropTypes.string,

  required: PropTypes.bool,

  className: PropTypes.string,
};
