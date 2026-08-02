import React from "react";
import { MdPlayCircle, MdPeople, MdCheckCircle, MdReceiptLong, MdAdd } from "react-icons/md";

export default function SessionHeader({ sessions = [], onStartClick }) {
  const total = sessions.length;
  const activeCount = sessions.filter((s) => s.status === "active").length;
  const completedCount = sessions.filter((s) => s.status === "completed").length;
  const totalGuests = sessions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + (s.guestCount || 0), 0);

  return (
    <div className="flex flex-col gap-5 font-dm">
      {/* Title & Start Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
            Dining Sessions
          </h1>
          <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            Real-time session tracking, customer orders, and guest counts
          </p>
        </div>

        <button
          onClick={onStartClick}
          className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-3xl shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95 dark:bg-brand-400 dark:hover:bg-brand-300"
        >
          <MdAdd size={18} /> Start Session
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Sessions */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-green-500 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {activeCount}
            </span>
            <MdPlayCircle size={22} className="text-green-500" />
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Active Sessions
          </span>
        </div>

        {/* Active Guests */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-brand-500 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-brand-500 dark:text-brand-400">
              {totalGuests}
            </span>
            <MdPeople size={22} className="text-brand-500" />
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Active Guests Seated
          </span>
        </div>

        {/* Completed Sessions */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-indigo-500 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {completedCount}
            </span>
            <MdCheckCircle size={22} className="text-indigo-500" />
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Completed Sessions
          </span>
        </div>

        {/* Total Sessions */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-navy-800">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-700 dark:text-white">
              {total}
            </span>
            <MdReceiptLong size={22} className="text-gray-400" />
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Total Logged Sessions
          </span>
        </div>
      </div>
    </div>
  );
}