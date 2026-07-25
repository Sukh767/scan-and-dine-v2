import React, { useState, useEffect } from "react";

const Offline = ({ onRetry }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status dynamically
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle manual connection check
  const handleCheckConnection = async () => {
    setIsChecking(true);

    if (onRetry) {
      await onRetry();
    } else {
      // Basic ping test to verify actual internet access
      try {
        const response = await fetch("/favicon.ico", {
          method: "HEAD",
          cache: "no-store",
        });
        if (response.ok) {
          window.location.reload();
        }
      } catch (err) {
        // Still offline
      }
    }

    // Brief delay for tactile feedback
    setTimeout(() => {
      setIsChecking(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-lightPrimary p-4 dark:bg-navy-900 transition-colors duration-200">
      <div className="flex w-full max-w-md flex-col items-center text-center p-8 rounded-primary bg-white shadow-3xl dark:bg-navy-800 dark:shadow-none transition-all">
        {/* Animated Wi-Fi Disconnected Badge */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-50 dark:bg-navy-700 text-brand-500 dark:text-brand-400">
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M12 18h.01M8.5 14.5A5 5 0 0112 13c1.02 0 1.97.31 2.76.84M5.05 11.05A9 9 0 0112 9c1.9 0 3.68.59 5.15 1.6M1.5 7.5A13.9 13.9 0 0112 5c3.2 0 6.18 1.07 8.58 2.88"
            />
          </svg>
        </div>

        {/* Heading & Context Message */}
        <h1 className="mb-2 text-2xl font-bold text-navy-700 dark:text-white font-poppins">
          {isOnline ? "Back Online!" : "No Internet Connection"}
        </h1>

        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
          {isOnline
            ? "Your internet connection was restored. You can now continue."
            : "Please check your network cables, Wi-Fi router, or cellular data and try again."}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleCheckConnection}
          disabled={isChecking}
          className="w-full h-12 rounded-xl bg-brand-500 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        >
          {isChecking ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Checking Connection…</span>
            </>
          ) : (
            "Try Again"
          )}
        </button>

        {/* Status Tip */}
        <p
          aria-live="polite"
          className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500"
        >
          Status:{" "}
          <span
            className={
              isOnline
                ? "text-green-500 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {isOnline ? "Connected" : "Offline"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Offline;
