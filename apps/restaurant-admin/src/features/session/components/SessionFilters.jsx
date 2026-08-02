import React from "react";
import { MdSearch, MdFilterList } from "react-icons/md";

export default function SessionFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white p-3.5 shadow-3xl shadow-shadow-500 font-dm dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 pr-1 text-xs font-bold text-navy-700 dark:text-white">
          <MdFilterList size={18} className="text-brand-500" />
          <span>Filter:</span>
        </div>

        {/* Status Select */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-lightPrimary px-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-64">
        <MdSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search table or token..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 w-full rounded-xl border border-gray-200 bg-lightPrimary pl-9 pr-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
        />
      </div>
    </div>
  );
}