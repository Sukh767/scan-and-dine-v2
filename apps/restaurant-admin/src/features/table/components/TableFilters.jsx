import React from "react";
import { MdFilterList, MdRefresh } from "react-icons/md";

export default function TableFilters({
  filters,
  onFilterChange,
  floors = [],
  sections = [],
}) {
  const handleChange = (key, value) => {
    onFilterChange((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    onFilterChange({ status: "all", floor: "all", section: "all" });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white p-3.5 shadow-3xl shadow-shadow-500 font-dm dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 pr-1 text-xs font-bold text-navy-700 dark:text-white">
          <MdFilterList size={18} className="text-brand-500" />
          <span>Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-lightPrimary px-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
        </select>

        {/* Floor Filter */}
        <select
          value={filters.floor}
          onChange={(e) => handleChange("floor", e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-lightPrimary px-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
        >
          <option value="all">All Floors</option>
          {floors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {/* Section Filter */}
        <select
          value={filters.section}
          onChange={(e) => handleChange("section", e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-lightPrimary px-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
        >
          <option value="all">All Sections</option>
          {sections.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-1 rounded-xl bg-lightPrimary px-3 py-1.5 text-xs font-bold text-navy-700 transition hover:bg-gray-200 dark:bg-navy-900 dark:text-white dark:hover:bg-navy-700"
      >
        <MdRefresh size={16} /> Reset
      </button>
    </div>
  );
}
