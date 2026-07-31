import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function TableFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    tableNumber: "",
    label: "",
    capacity: 4,
    floor: "Ground Floor",
    section: "Main",
    sortOrder: 1,
    status: "available",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        tableNumber: initialData.tableNumber || "",
        label: initialData.label || "",
        capacity: initialData.capacity ?? 4,
        floor: initialData.floor || "Ground Floor",
        section: initialData.section || "Main",
        sortOrder: initialData.sortOrder ?? 1,
        status: initialData.status || "available",
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        tableNumber: "T-",
        label: "",
        capacity: 4,
        floor: "Ground Floor",
        section: "Main",
        sortOrder: 1,
        status: "available",
        notes: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capacity: Number(formData.capacity),
      sortOrder: Number(formData.sortOrder),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4 font-dm backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-[20px] bg-white p-6 shadow-3xl dark:border dark:border-white/10 dark:bg-navy-800">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-white/10">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
            {initialData ? "Edit Table" : "Add New Table"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-navy-700 dark:hover:text-white"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Table Number *
              </label>
              <input
                type="text"
                required
                placeholder="T-01"
                value={formData.tableNumber}
                onChange={(e) =>
                  setFormData({ ...formData, tableNumber: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Label
              </label>
              <input
                type="text"
                placeholder="Window Table"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Floor
              </label>
              <input
                type="text"
                placeholder="Ground Floor"
                value={formData.floor}
                onChange={(e) =>
                  setFormData({ ...formData, floor: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Section
              </label>
              <input
                type="text"
                placeholder="Main / Window"
                value={formData.section}
                onChange={(e) =>
                  setFormData({ ...formData, section: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Initial Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({ ...formData, sortOrder: e.target.value })
                }
                className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
              Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Near window or active session details"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
            />
          </div>

          <div className="mt-2 flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              {initialData ? "Save Changes" : "Create Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
