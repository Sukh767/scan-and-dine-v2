import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-lightPrimary p-4 dark:bg-navy-900 transition-colors duration-200">
      <div className="flex w-full max-w-md flex-col items-center text-center p-8 rounded-primary bg-white shadow-3xl dark:bg-navy-800 dark:shadow-none transition-all">
        {/* Status Badge */}
        <div className="relative mb-6 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-red-50 dark:bg-navy-700 text-red-500 dark:text-red-400">
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
              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.001A11.959 11.959 0 0112 2.714zm0 11.25h.008v.008H12v-.008z"
            />
          </svg>
          <span className="text-xs font-bold font-poppins tracking-wider">
            403
          </span>
        </div>

        {/* Heading & Context */}
        <h1 className="mb-2 text-2xl font-bold text-navy-700 dark:text-white font-poppins">
          Access Denied
        </h1>

        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
          You do not have permission to view this resource. Please contact your
          administrator if you believe this is an error.
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

export default Forbidden;
