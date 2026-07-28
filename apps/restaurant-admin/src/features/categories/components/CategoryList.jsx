import React from "react";
import { FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from "react-icons/fi";

export default function CategoryList({
  categories,
  onEdit,
  onDelete,
  onToggleStatus,
  onReorder,
}) {
  if (!categories?.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-[20px] bg-white shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
        <p className="font-dm text-gray-600 dark:text-gray-400">
          No categories found. Create one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar rounded-[20px] bg-white p-5 shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800 dark:shadow-none">
      <table className="w-full text-left font-dm text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-600 dark:border-white/10 dark:text-gray-400">
            <th className="pb-3 pl-2 font-bold">Order</th>
            <th className="pb-3 font-bold">Icon</th>
            <th className="pb-3 font-bold">Details</th>
            <th className="pb-3 font-bold">Status</th>
            <th className="pb-3 pr-2 text-right font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={category.id}
              className="border-b border-gray-50 transition-colors hover:bg-lightPrimary dark:border-white/5 dark:hover:bg-navy-900/50"
            >
              {/* Reorder Arrows */}
              <td className="py-3 pl-2">
                <div className="flex flex-col items-start gap-1">
                  <button
                    onClick={() => onReorder("UP", index)}
                    disabled={index === 0}
                    className="text-gray-400 transition-colors hover:text-brand-500 disabled:opacity-30 dark:hover:text-brand-400"
                  >
                    <FiArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => onReorder("DOWN", index)}
                    disabled={index === categories.length - 1}
                    className="text-gray-400 transition-colors hover:text-brand-500 disabled:opacity-30 dark:hover:text-brand-400"
                  >
                    <FiArrowDown size={16} />
                  </button>
                </div>
              </td>

              {/* Icon */}
              <td className="py-3 text-2xl">{category.icon}</td>

              {/* Details */}
              <td className="py-3">
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  {category.name}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </td>

              {/* Status Toggle */}
              <td className="py-3">
                <button
                  onClick={() => onToggleStatus(category.id, category.isActive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    category.isActive
                      ? "bg-brand-500 dark:bg-brand-400"
                      : "bg-gray-300 dark:bg-navy-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      category.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </td>

              {/* Actions */}
              <td className="py-3 pr-2 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition-colors"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
