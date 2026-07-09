import PropTypes from "prop-types";

import { Button } from "./Button";

export const IconButton = ({
    children,
    "aria-label": ariaLabel,
    ...props
}) => {
    return (
        <Button
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </Button>
    );
};

IconButton.propTypes = {
    children: PropTypes.node,

    "aria-label": PropTypes.string.isRequired,
};