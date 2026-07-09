import PropTypes from "prop-types";

import { cn } from "../../utils";

export const ButtonGroup = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2",
                className
            )}
        >
            {children}
        </div>
    );
};

ButtonGroup.propTypes = {
    children: PropTypes.node,

    className: PropTypes.string,
};