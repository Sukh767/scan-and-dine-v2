import React, { useState, useMemo, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useTables } from "@scan/restaurants";

export default function StartSessionModal({ isOpen, onClose, onSubmit }) {
  const [tableId, setTableId] = useState("");
  const [guestCount, setGuestCount] = useState(4);

  // 1. Fetch available tables for dropdown selection
  const { data: tablesRes, isLoading: isTablesLoading } = useTables();

  const tables = useMemo(() => {
    return tablesRes?.data || tablesRes || [];
  }, [tablesRes]);

  // Set default selected table once loaded
  useEffect(() => {
    if (tables.length > 0 && !tableId) {
      setTableId(tables[0].id || tables[0]._id);
    }
  }, [tables, tableId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableId) return;

    onSubmit({
      tableId,
      guestCount: Number(guestCount),
    });

    // Reset default on submit
    setGuestCount(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 p-4 font-dm backdrop-blur-xs">
      <div className="w-full max-w-md rounded-[20px] bg-white p-6 shadow-3xl dark:border dark:border-white/10 dark:bg-navy-800">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-white/10">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
            Start Dining Session
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-navy-700 dark:hover:text-white"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          {/* Table Dropdown Select */}
          <div>
            <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
              Select Table *
            </label>
            {isTablesLoading ? (
              <div className="flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-lightPrimary text-xs font-bold text-gray-400 dark:border-white/10 dark:bg-navy-900">
                Loading tables...
              </div>
            ) : (
              <select
                required
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs font-bold text-navy-700 outline-none transition-all focus:border-brand-500 dark:border-white/10 dark:bg-navy-900 dark:text-white dark:focus:border-brand-400"
              >
                <option value="" disabled>
                  -- Select a Table --
                </option>
                {tables.map((table) => {
                  const id = table.id || table._id;
                  const label = table.label ? ` (${table.label})` : "";
                  const floor = table.floor ? ` - ${table.floor}` : "";
                  const section = table.section ? ` [${table.section}]` : "";

                  return (
                    <option key={id} value={id}>
                      {table.tableNumber}
                      {label}
                      {floor}
                      {section}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {/* Guest Count */}
          <div>
            <label className="mb-1 block text-xs font-bold text-navy-700 dark:text-white">
              Guest Count
            </label>
            <input
              type="number"
              min="1"
              max="30"
              required
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 text-xs font-semibold text-navy-700 outline-none focus:border-brand-500 dark:border-white/10 dark:text-white dark:focus:border-brand-400"
            />
          </div>

          {/* Action Buttons */}
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
              disabled={!tableId || isTablesLoading}
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-600 disabled:opacity-50 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              Start Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
