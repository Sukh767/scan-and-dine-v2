import { FiAlertTriangle, FiHome, FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ErrorFallback({ error, onReset }) {
  const navigate = useNavigate();
  const isDev = import.meta.env.DEV;

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightPrimary px-6 font-dm dark:bg-navy-900">
      <div className="w-full max-w-xl rounded-[20px] bg-white p-10 text-center shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
        {/* Icon Container */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
          <FiAlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
        </div>

        {/* Typography */}
        <h1 className="mb-3 text-3xl font-bold text-navy-700 dark:text-white">
          Something went wrong
        </h1>
        <p className="mb-8 text-base font-medium text-gray-600 dark:text-gray-400">
          An unexpected error occurred while rendering this page.
        </p>

        {/* Error Details (Dev Only) */}
        {isDev && error && (
          <div className="custom-scrollbar mb-8 max-h-48 overflow-auto rounded-xl bg-gray-100 p-4 text-left dark:bg-navy-900">
            <pre className="text-sm font-medium text-red-500 dark:text-red-400">
              {error.toString()}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            <FiRefreshCcw size={18} />
            Reload
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-navy-700 transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/5 dark:active:bg-white/10"
          >
            <FiHome size={18} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
