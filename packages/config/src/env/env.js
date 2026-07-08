export const env = Object.freeze({
    apiUrl: import.meta.env.VITE_API_URL,
    socketUrl: import.meta.env.VITE_SOCKET_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    debug: import.meta.env.VITE_ENABLE_DEBUG === "true",
});