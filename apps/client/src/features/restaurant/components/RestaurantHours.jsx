import { Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Helpers ──────────────────────────────────────── */

const dayKeys = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function formatTime24to12(time) {
  if (!time) return "";
  const [hourStr, min] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${min} ${ampm}`;
}

function getTodayRange(hoursData) {
  const today = new Date().getDay();
  const key = dayKeys[today];
  const day = hoursData?.[key];
  if (!day || !day.isOpen) return null;

  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  return {
    open: toMinutes(day.open),
    close: toMinutes(day.close),
    rawOpen: day.open,
    rawClose: day.close,
  };
}

/* ─── Component ────────────────────────────────────── */

export default function RestaurantHours({ restaurant }) {
  const hoursData = restaurant.operatingHours || {};
  const todayRange = getTodayRange(hoursData);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  let openNow = false;
  let progressPercent = 0;

  if (todayRange) {
    openNow = nowMins >= todayRange.open && nowMins < todayRange.close;
    if (openNow) {
      const total = todayRange.close - todayRange.open;
      const elapsed = nowMins - todayRange.open;
      progressPercent = Math.min(100, Math.max(0, (elapsed / total) * 100));
    }
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = daysOfWeek[now.getDay()];

  return (
    <div className="mb-12">
      {/* Container */}
      {/** bg-card rounded-md border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden */}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left Panel: Live Status Focus */}
          <div className="p-6 md:p-8 bg-muted/30 border-b md:border-b-0 md:border-r border-border/40 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Clock size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-brand/10 flex items-center justify-center rounded-md text-brand">
                <Clock size={18} />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                Operating Hours
              </h2>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-ui font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Live Status
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Circle
                  size={12}
                  className={cn(
                    "animate-pulse",
                    openNow
                      ? "fill-emerald-500 text-emerald-500"
                      : "fill-red-500 text-red-500",
                  )}
                />
                <span
                  className={cn(
                    "font-display text-3xl font-bold tracking-tight",
                    openNow ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {openNow ? "Open Now" : "Closed"}
                </span>
              </div>

              {openNow && todayRange && (
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between text-xs font-ui font-semibold text-muted-foreground">
                    <span>{formatTime24to12(todayRange.rawOpen)}</span>
                    <span>
                      Closes at {formatTime24to12(todayRange.rawClose)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Weekly Schedule */}
          <div className="col-span-1 md:col-span-2 p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {daysOfWeek.map((dayName, index) => {
                const dayKey = dayKeys[index];
                const dayData = hoursData[dayKey];
                const isToday = dayName === todayName;
                const closed = !dayData || !dayData.isOpen;

                const timeDisplay = closed
                  ? "Closed"
                  : `${formatTime24to12(dayData.open)} - ${formatTime24to12(dayData.close)}`;

                return (
                  <div
                    key={dayName}
                    className={cn(
                      "flex justify-between items-center py-3 border-b border-border/30 last:border-0",
                      isToday
                        ? "bg-brand/5 -mx-3 px-3 rounded-md border-transparent"
                        : "",
                    )}
                  >
                    <span
                      className={cn(
                        "font-ui text-sm",
                        isToday
                          ? "font-bold text-brand"
                          : "font-medium text-foreground/80",
                      )}
                    >
                      {dayName}{" "}
                      {isToday && (
                        <span className="text-[10px] uppercase ml-1 opacity-70">
                          (Today)
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "font-ui text-sm font-semibold tracking-wide",
                        closed ? "text-red-500/80" : "text-foreground",
                        isToday && !closed && "text-brand",
                      )}
                    >
                      {timeDisplay}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
