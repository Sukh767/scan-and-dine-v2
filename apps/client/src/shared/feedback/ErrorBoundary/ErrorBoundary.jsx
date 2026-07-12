import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong.</h1>
    </div>
  );
};
