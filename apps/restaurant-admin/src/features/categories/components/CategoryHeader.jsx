import React from "react";
import { FiPlus } from "react-icons/fi";

export default function CategoryHeader({ onAddClick }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none font-dm">
      <div>
        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
          Menu Categories
        </h1>
        <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          Manage your restaurant's food categories, icons, and display order.
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
      >
        <FiPlus size={18} />
        Add Category
      </button>
    </div>
  );
}
