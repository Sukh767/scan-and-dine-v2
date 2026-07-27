import { FiClock } from "react-icons/fi";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const DAY_LABELS = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default function Step4Hours({ data, updateData }) {
  const hours = data?.operatingHours || {};

  const updateDay = (day, field, value) => {
    updateData({
      operatingHours: {
        ...hours,
        [day]: {
          ...(hours[day] || { isOpen: true, open: "09:00", close: "22:00" }),
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {DAYS.map((day) => {
        const h = hours[day] || {
          isOpen: false,
          open: "09:00",
          close: "22:00",
        };

        return (
          <div
            key={day}
            className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-3.5 sm:px-5 transition-all ${
              h.isOpen
                ? "border-brand-500/20 bg-brand-500/5 dark:border-brand-500/30 dark:bg-navy-900/80"
                : "border-gray-100 bg-gray-50/50 dark:border-navy-700/50 dark:bg-navy-900/30 opacity-60"
            }`}
          >
            {/* Toggle & Day Label */}
            <div className="flex items-center gap-3.5 min-w-[150px]">
              <button
                type="button"
                role="switch"
                aria-checked={h.isOpen}
                onClick={() => updateDay(day, "isOpen", !h.isOpen)}
                className={`relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                  h.isOpen ? "bg-brand-500" : "bg-gray-300 dark:bg-navy-600"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    h.isOpen ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>

              <span className="text-sm font-bold text-navy-700 dark:text-white">
                {DAY_LABELS[day]}
              </span>
            </div>

            {/* Time Controls */}
            <div className="flex items-center gap-2">
              {h.isOpen ? (
                <>
                  <FiClock className="h-4 w-4 text-brand-500 hidden sm:block" />
                  <input
                    type="time"
                    value={h.open}
                    onChange={(e) => updateDay(day, "open", e.target.value)}
                    className="rounded-xl border border-gray-200 bg-lightPrimary px-3 py-1.5 text-xs font-semibold text-navy-700 dark:border-navy-700 dark:bg-navy-900 dark:text-white outline-none focus:border-brand-500"
                  />
                  <span className="text-xs font-medium text-gray-400">to</span>
                  <input
                    type="time"
                    value={h.close}
                    onChange={(e) => updateDay(day, "close", e.target.value)}
                    className="rounded-xl border border-gray-200 bg-lightPrimary px-3 py-1.5 text-xs font-semibold text-navy-700 dark:border-navy-700 dark:bg-navy-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </>
              ) : (
                <span className="text-xs font-semibold italic text-gray-400">
                  Closed All Day
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
