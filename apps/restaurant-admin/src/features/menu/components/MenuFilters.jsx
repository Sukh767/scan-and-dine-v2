import React from "react";

export default function MenuFilters({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 font-dm">
      <button
        onClick={() => onCategoryChange("all")}
        className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
          activeCategory === "all"
            ? "bg-brand-500 text-white shadow-md shadow-brand-500/20 dark:bg-brand-400 dark:shadow-brand-400/20"
            : "bg-white text-gray-600 shadow-3xl shadow-shadow-500 hover:bg-lightPrimary dark:border dark:border-white/10 dark:bg-navy-800 dark:text-gray-300 dark:shadow-none dark:hover:bg-navy-700"
        }`}
      >
        All Items
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
            activeCategory === cat.id
              ? "bg-brand-500 text-white shadow-md shadow-brand-500/20 dark:bg-brand-400 dark:shadow-brand-400/20"
              : "bg-white text-gray-600 shadow-3xl shadow-shadow-500 hover:bg-lightPrimary dark:border dark:border-white/10 dark:bg-navy-800 dark:text-gray-300 dark:shadow-none dark:hover:bg-navy-700"
          }`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
