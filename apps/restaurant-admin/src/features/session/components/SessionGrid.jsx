import React from "react";
import { MdPeople, MdAccessTime, MdPlayArrow, MdStop, MdReceipt } from "react-icons/md";

export default function SessionGrid({
  sessions = [],
  onResumeSession,
  onEndSession,
}) {
  if (!sessions.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-[20px] bg-white font-dm shadow-3xl shadow-shadow-500 dark:border dark:border-white/10 dark:bg-navy-800">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          No dining sessions found matching criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 font-dm">
      {sessions.map((session) => {
        const isActive = session.status === "active";
        const tableNumber = session.table?.tableNumber || session.table || "N/A";
        const tableLabel = session.table?.label;

        // Card border & badge styles based on status
        const borderStyle = isActive ? "border-green-500" : "border-indigo-500";
        const statusText = isActive ? "text-green-600 dark:text-green-400" : "text-indigo-600 dark:text-indigo-400";
        const dotStyle = isActive ? "bg-green-500" : "bg-indigo-500";

        // Format dates
        const startTime = session.startedAt
          ? new Date(session.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : "N/A";

        return (
          <div
            key={session.id || session._id}
            className={`group relative flex flex-col justify-between rounded-[20px] border-2 bg-white p-4 shadow-3xl shadow-shadow-500 transition-all hover:-translate-y-1 dark:bg-navy-800 dark:shadow-none ${borderStyle}`}
          >
            {/* Top Row: Table Number & Status */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-xl font-bold leading-none ${statusText}`}>
                      {tableNumber}
                    </h3>
                    {tableLabel && (
                      <span className="rounded-md bg-lightPrimary px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-navy-900 dark:text-gray-300">
                        {tableLabel}
                      </span>
                    )}
                  </div>
                  <span className={`mt-1.5 block text-xs font-bold capitalize ${statusText}`}>
                    {session.status} Session
                  </span>
                </div>

                <span className={`h-2.5 w-2.5 rounded-full ${dotStyle}`} />
              </div>

              {/* Details List */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-lightPrimary p-2.5 text-xs font-semibold text-gray-600 dark:bg-navy-900 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <MdPeople size={15} className="text-brand-500" />
                  <span>{session.guestCount || 1} Guests</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MdAccessTime size={15} className="text-brand-500" />
                  <span>{startTime}</span>
                </div>
              </div>

              {/* Bill Totals Summary */}
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5 dark:border-white/10">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                  <MdReceipt size={14} /> Bill Status:
                </span>
                <span className="text-xs font-bold capitalize text-navy-700 dark:text-white">
                  {session.billStatus || "open"}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-white/10">
              {isActive ? (
                <button
                  onClick={() => onEndSession(session.id || session._id)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-red-500 py-2 text-xs font-bold text-white transition hover:bg-red-600"
                >
                  <MdStop size={16} /> End Session
                </button>
              ) : (
                <button
                  onClick={() => onResumeSession(session.id || session._id)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                  <MdPlayArrow size={16} /> Resume Session
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}