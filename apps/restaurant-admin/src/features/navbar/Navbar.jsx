import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMonitor } from "react-icons/md";
import Dropdown from "@/components/ui/dropdown";
import { useTheme } from "@/context/ThemeContext";
import { mockNotifications } from "@/data/mock";
import { useAuth } from "@scan/auth";
import { toast } from "sonner";

const routeLabels = {
  "/admin/dashboard": "Dashboard",
  "/admin/menu": "Menu",
  "/admin/category": "Categories",
  "/admin/tables": "Tables",
  "/admin/sessions": "Sessions",
  "/admin/orders": "Orders",
  "/admin/qr-codes": "QR Codes",
  "/admin/analytics": "Analytics",
  "/admin/restaurant": "Restaurant",
  "/admin/settings": "Settings",
};

export default function Navbar({ onOpenSidenav }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const brandText = routeLabels[location.pathname] || "Dashboard";
  const unread = mockNotifications.filter((n) => !n.isRead).length;

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between gap-2 rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {/* Left - breadcrumb & title */}
      <div className="ml-[6px] my-auto">
        <div className="h-5 pt-0.5 flex items-center gap-1">
          <Link
            className="text-xs sm:text-sm font-normal text-navy-700 hover:underline dark:text-white"
            to="/admin/dashboard"
          >
            Admin
          </Link>
          <span className="text-xs sm:text-sm text-navy-700 dark:text-white">
            {" "}
            /{" "}
          </span>
          <span className="text-xs sm:text-sm font-normal text-navy-700 dark:text-white capitalize">
            {brandText}
          </span>
        </div>
        <p className="shrink text-xl sm:text-[26px] font-bold capitalize text-navy-700 dark:text-white leading-tight mt-0.5">
          {brandText}
        </p>
      </div>

      {/* Right - actions pill */}
      <div className="relative flex min-h-[52px] md:h-[61px] w-auto flex-grow items-center justify-end gap-1.5 sm:gap-2 rounded-full bg-white px-3 py-1.5 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0">
        {/* Search */}
        <div className="hidden md:flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[200px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
          />
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Open Sidenav"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700 xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </button>

        {/* Dark mode toggle */}
        <button
          type="button"
          aria-label="Toggle Dark Mode"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <RiSunFill className="h-4 w-4" />
          ) : (
            <RiMoonFill className="h-4 w-4" />
          )}
        </button>

        {/* Monitor icon */}
        <button
          type="button"
          aria-label="Monitor View"
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700"
        >
          <MdOutlineMonitor className="h-4 w-4" />
        </button>

        {/* Notifications Dropdown */}
        <Dropdown
          button={
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-navy-700 cursor-pointer ">
              <IoMdNotificationsOutline className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </div>
          }
          classNames="top-11 -right-16 md:-right-10 z-50"
          animation="origin-top-right transition-all duration-300 ease-in-out"
        >
          <div className="flex w-[320px] sm:w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-navy-700 dark:text-white">
                Live Activity
              </p>
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            </div>
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
              {mockNotifications.map((n) => {
                const elapsed = Math.floor(
                  (Date.now() - new Date(n.createdAt).getTime()) / 60000,
                );
                const iconBg =
                  n.type === "info"
                    ? "bg-brand-500"
                    : n.type === "warning"
                      ? "bg-orange-500"
                      : "bg-green-500";
                return (
                  <div
                    key={n.id}
                    className={`flex gap-3 items-start rounded-xl p-2.5 ${
                      n.isRead
                        ? "opacity-60"
                        : "bg-lightPrimary dark:bg-navy-800"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-xs">
                        {n.type === "info"
                          ? "🔔"
                          : n.type === "warning"
                            ? "⚠"
                            : "✓"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-navy-700 dark:text-white truncate">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-gray-500 ml-2 flex-shrink-0">
                          {elapsed}m ago
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-tight">
                        {n.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Dropdown>

        {/* User Profile Dropdown */}
        <Dropdown
          button={
            <div className="h-9 w-9 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity">
              MW
            </div>
          }
          classNames="top-11 right-0 z-50"
          animation="origin-top-right transition-all duration-300 ease-in-out"
        >
          <div className="w-56 max-w-[calc(100vw-2rem)] rounded-[20px] bg-white p-4 shadow-2xl dark:!bg-navy-700 dark:text-white">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-navy-800">
              <div className="h-10 w-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                MW
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy-700 dark:text-white truncate">
                  Marcus Webb
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Restaurant Owner
                </p>
              </div>
            </div>
            <Link
              to="/admin/settings"
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-brand-500 py-1.5 transition-colors"
            >
              ⚙️ Settings
            </Link>
            <Link
              to="/auth/sign-in"
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-red-500 py-1.5 transition-colors"
            >
              🚪 Sign Out
            </Link>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
