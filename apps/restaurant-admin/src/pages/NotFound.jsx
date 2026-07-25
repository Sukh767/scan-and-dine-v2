import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-lightPrimary p-4 dark:bg-navy-900 transition-colors duration-200">
      <div className="flex w-full max-w-md flex-col items-center text-center p-8 rounded-primary bg-white shadow-3xl dark:bg-navy-800 dark:shadow-none transition-all">
        {/* Status Badge */}
        <div className="relative mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-50 dark:bg-navy-700 text-brand-500 dark:text-brand-400">
          <svg
            className="h-10 w-10 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="text-xs font-bold font-poppins tracking-wider">
            404
          </span>
        </div>

        {/* Heading & Context */}
        <h1 className="mb-2 text-2xl font-bold text-navy-700 dark:text-white font-poppins">
          Page Not Found
        </h1>

        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
          The page you are looking for doesn&apos;t exist, was removed, or is
          temporarily unavailable.
        </p>

        {/* Action Controls */}
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full h-12 rounded-xl border border-gray-200 bg-transparent text-sm font-medium text-navy-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="w-full h-12 rounded-xl bg-brand-500 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
