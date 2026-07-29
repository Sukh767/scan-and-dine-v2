import React, { useState } from "react";
import {
  FiAlertTriangle,
  FiHome,
  FiRefreshCcw,
  FiRotateCcw,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ error, errorInfo, onReset, onReload }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isDev = import.meta.env.DEV;

  // Safe router navigation fallback
  let navigate;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  const handleGoHome = () => {
    if (navigate) {
      navigate("/");
    } else {
      window.location.href = "/";
    }
  };

  const handleCopyDetails = () => {
    const details = `Error: ${error?.toString()}\n\nStack:\n${
      error?.stack || "N/A"
    }\n\nComponent Stack:\n${errorInfo?.componentStack || "N/A"}`;

    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightPrimary p-6 font-dm dark:bg-navy-900">
      <div className="w-full max-w-2xl rounded-[20px] bg-white p-8 text-center shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none sm:p-10">
        {/* Icon Container */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
          <FiAlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Header Text */}
        <h1 className="mb-2 text-2xl font-bold text-navy-700 dark:text-white sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mb-6 text-sm font-medium text-gray-600 dark:text-gray-400 sm:text-base">
          An unexpected error occurred while rendering this component or page.
        </p>

        {/* Developer Diagnostics Box (DEV Only) */}
        {isDev && error && (
          <div className="mb-6 text-left">
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white"
              >
                {showDetails ? <FiChevronUp /> : <FiChevronDown />}
                {showDetails ? "Hide Error Details" : "Show Error Details"}
              </button>

              <button
                onClick={handleCopyDetails}
                className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600 transition hover:bg-gray-200 dark:bg-navy-900 dark:text-gray-300 dark:hover:bg-navy-700"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-green-500" /> Copied!
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy Stack Trace
                  </>
                )}
              </button>
            </div>

            {showDetails && (
              <div className="custom-scrollbar max-h-56 overflow-auto rounded-xl bg-gray-100 p-4 font-mono text-xs dark:bg-navy-900">
                <p className="font-bold text-red-500 dark:text-red-400">
                  {error.toString()}
                </p>
                {error?.stack && (
                  <pre className="mt-2 whitespace-pre-wrap text-[11px] leading-relaxed text-gray-600 dark:text-gray-400">
                    {error.stack}
                  </pre>
                )}
                {errorInfo?.componentStack && (
                  <div className="mt-3 border-t border-gray-200 pt-2 dark:border-white/10">
                    <span className="font-bold text-navy-700 dark:text-gray-300">
                      Component Stack:
                    </span>
                    <pre className="mt-1 whitespace-pre-wrap text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Soft SPA Recovery */}
          {onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              <FiRotateCcw size={16} />
              Try Again
            </button>
          )}

          {/* Hard Page Reload */}
          <button
            onClick={onReload}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-navy-700 transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:bg-white/5"
          >
            <FiRefreshCcw size={16} />
            Reload Page
          </button>

          {/* Navigate Home */}
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-navy-700 transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:bg-white/5"
          >
            <FiHome size={16} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
