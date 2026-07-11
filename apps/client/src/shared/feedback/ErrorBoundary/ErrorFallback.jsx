export const ErrorFallback = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
            }}
        >
            <div>
                <h1>Something went wrong.</h1>

                <p>Please refresh the page.</p>
            </div>
        </div>
    );
};