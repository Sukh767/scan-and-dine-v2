import { Link } from "react-router-dom";

export const NotFound = ({
    title = "404",
    description = "Page not found.",
}) => {
    return (
        <div>
            <h1>{title}</h1>

            <p>{description}</p>

            <Link to="/">
                Go Home
            </Link>
        </div>
    );
};