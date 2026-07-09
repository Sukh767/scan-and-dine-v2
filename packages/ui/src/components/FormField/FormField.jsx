import PropTypes from "prop-types";

import { formFieldStyles } from "./form-field.styles";

export const FormField = ({
    label,
    required,
    helperText,
    error,
    children,
}) => {
    return (
        <div className={formFieldStyles.wrapper}>
            {label && (
                <label className={formFieldStyles.label}>
                    {label}

                    {required && (
                        <span className={formFieldStyles.required}>
                            *
                        </span>
                    )}
                </label>
            )}

            {children}

            {error ? (
                <p className={formFieldStyles.error}>
                    {error}
                </p>
            ) : (
                helperText && (
                    <p className={formFieldStyles.helper}>
                        {helperText}
                    </p>
                )
            )}
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,

    required: PropTypes.bool,

    helperText: PropTypes.string,

    error: PropTypes.string,

    children: PropTypes.node.isRequired,
};