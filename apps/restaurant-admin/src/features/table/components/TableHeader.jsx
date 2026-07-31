import React from "react";
import { MdAdd } from "react-icons/md";

export default function TableHeader({ allTables = [], onAddClick }) {
  const total = allTables.length;
  const floorsCount = new Set(allTables.map((t) => t.floor).filter(Boolean))
    .size;

  const availableCount = allTables.filter(
    (t) => t.isActive && t.status === "available",
  ).length;
  const occupiedCount = allTables.filter(
    (t) => t.isActive && t.status === "occupied",
  ).length;
  const reservedCount = allTables.filter(
    (t) => t.isActive && t.status === "reserved",
  ).length;
  const inactiveCount = allTables.filter(
    (t) => !t.isActive || t.status === "out_of_service",
  ).length;

  return (
    <div className="flex flex-col gap-5 font-dm">
      {/* Title & Add Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
            Table Management
          </h1>
          <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            {total} tables across {floorsCount || 1} floor
            {floorsCount > 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-3xl shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95 dark:bg-brand-400 dark:hover:bg-brand-300"
        >
          <MdAdd size={18} /> Add Table
        </button>
      </div>

      {/* Top Metric Cards Row (Matching image_69a2d8.png) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Available Card */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-green-500 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {availableCount}
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Available
          </span>
        </div>

        {/* Occupied Card */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-indigo-500 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {occupiedCount}
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Occupied
          </span>
        </div>

        {/* Reserved Card */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-blue-400 bg-white p-4 dark:bg-navy-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
              {reservedCount}
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            Reserved
          </span>
        </div>

        {/* Out of Service / Inactive Card */}
        <div className="flex flex-col justify-between rounded-[20px] border-2 border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-navy-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
            <span className="text-2xl font-bold text-gray-400 dark:text-gray-400">
              {inactiveCount}
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Out of Service
          </span>
        </div>
      </div>
    </div>
  );
}
