import { forwardRef } from "react";
import PropTypes from "prop-types";

import { cn } from "../../utils";
import { buttonVariants } from "./button.styles";

export const Button = forwardRef(
    (
        {
            children,
            variant,
            size,
            fullWidth,
            loading,
            className,
            disabled,
            type = "button",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || loading}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fullWidth,
                    }),
                    className
                )}
                {...props}
            >
                {loading ? "Loading..." : children}
            </button>
        );
    }
);

Button.displayName = "Button";

Button.propTypes = {
    children: PropTypes.node,

    variant: PropTypes.string,

    size: PropTypes.string,

    fullWidth: PropTypes.bool,

    loading: PropTypes.bool,

    disabled: PropTypes.bool,

    className: PropTypes.string,

    type: PropTypes.oneOf([
        "button",
        "submit",
        "reset",
    ]),
};