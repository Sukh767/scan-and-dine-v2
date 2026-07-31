import React from "react";
import { MdPeople, MdEdit, MdDelete, MdDiamond } from "react-icons/md";

// Status Visual Theme Mapping strictly from image_69a2d8.png
const STATUS_STYLES = {
  available: {
    border: "border-green-500",
    text: "text-green-600 dark:text-green-400",
    dot: "bg-green-500",
    label: "Available",
  },
  occupied: {
    border: "border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
    label: "Occupied",
  },
  reserved: {
    border: "border-blue-400",
    text: "text-blue-500 dark:text-blue-400",
    dot: "bg-blue-400",
    label: "Reserved",
  },
  inactive: {
    border: "border-gray-200 dark:border-white/10",
    text: "text-gray-400 dark:text-gray-500",
    dot: "bg-gray-300 dark:bg-navy-600",
    label: "Out of Service",
  },
};

export default function TableGrid({
  tables,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleActive,
}) {
  if (!tables?.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-[20px] bg-white shadow-3xl shadow-shadow-500 font-dm dark:border dark:border-white/10 dark:bg-navy-800">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          No tables found matching criteria.
        </p>
      </div>
    );
  }

  // Group tables by floor
  const tablesByFloor = tables.reduce((acc, table) => {
    const floor = table.floor || "General Floor";
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(table);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8 font-dm">
      {Object.entries(tablesByFloor).map(([floorName, floorTables]) => (
        <div key={floorName} className="flex flex-col gap-4">
          {/* Floor Group Header */}
          <div className="flex items-center gap-2">
            <MdDiamond className="text-gray-400 dark:text-gray-500" size={14} />
            <h2 className="text-sm font-bold text-navy-700 dark:text-white">
              {floorName}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {floorTables.map((table) => {
              const styleKey = !table.isActive
                ? "inactive"
                : table.status || "available";

              const style = STATUS_STYLES[styleKey] || STATUS_STYLES.available;

              return (
                <div
                  key={table.id}
                  className={`group relative flex h-36 flex-col justify-between rounded-[20px] border-2 bg-white p-4 shadow-3xl shadow-shadow-500 transition-all hover:-translate-y-1 dark:bg-navy-800 dark:shadow-none ${style.border}`}
                >
                  {/* Top Row: Table Number & Status Indicator Dot */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`text-lg font-bold leading-none ${style.text}`}
                      >
                        {table.tableNumber}
                      </h3>
                      <span
                        className={`mt-1 block text-xs font-bold capitalize ${style.text}`}
                      >
                        {style.label}
                      </span>
                    </div>

                    <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                  </div>

                  {/* Middle / Active session subtitle if present */}
                  {table.notes && (
                    <span className="line-clamp-1 text-[10px] text-gray-400">
                      {table.notes}
                    </span>
                  )}

                  {/* Bottom Row: Capacity & Section Badge */}
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MdPeople size={14} className="text-gray-400" />
                      <span>{table.capacity}</span>
                    </div>

                    {table.section && (
                      <span className="rounded-full bg-lightPrimary px-2.5 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-navy-900 dark:text-gray-300">
                        {table.section}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-[18px] bg-navy-900/80 backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100">
                    {/* Status Toggle Button */}
                    <select
                      value={table.status}
                      onChange={(e) =>
                        onStatusChange(
                          table.id,
                          table.tableNumber,
                          e.target.value,
                        )
                      }
                      className="h-8 rounded-lg bg-white px-2 text-[11px] font-bold text-navy-700 outline-none"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="reserved">Reserved</option>
                    </select>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(table)}
                      className="rounded-lg bg-white p-1.5 text-navy-700 hover:text-brand-500"
                      title="Edit"
                    >
                      <MdEdit size={16} />
                    </button>

                    {/* Toggle Active */}
                    <button
                      onClick={() =>
                        onToggleActive(
                          table.id,
                          table.tableNumber,
                          table.isActive,
                        )
                      }
                      className="rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-navy-700"
                    >
                      {table.isActive ? "Deactivate" : "Activate"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(table.id, table.tableNumber)}
                      className="rounded-lg bg-white p-1.5 text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
