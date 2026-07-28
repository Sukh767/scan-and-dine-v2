import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🍔", // Default icon
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        icon: initialData.icon || "🍔",
      });
    } else {
      setFormData({ name: "", description: "", icon: "🍔" });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 backdrop-blur-sm px-4 font-dm">
      <div className="w-full max-w-md rounded-[20px] bg-white p-6 shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white">
            {initialData ? "Edit Category" : "New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-navy-700 dark:text-gray-400 dark:hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
              Category Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="flex h-12 w-full items-center rounded-xl border border-gray-200 bg-transparent p-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              placeholder="e.g., Starters"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-transparent p-3 text-sm text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400 custom-scrollbar resize-none"
              placeholder="Brief description..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
              Icon (Emoji)
            </label>
            <input
              type="text"
              required
              maxLength={2}
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="flex h-12 w-20 items-center rounded-xl border border-gray-200 bg-transparent p-3 text-center text-xl text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-bold text-navy-700 transition-all hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              {initialData ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
