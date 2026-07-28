import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiX } from "react-icons/hi";
import {
  MdDashboard,
  MdRestaurantMenu,
  MdTableBar,
  MdPeopleAlt,
  MdShoppingCart,
  MdQrCode2,
  MdBarChart,
  MdStore,
  MdSettings,
} from "react-icons/md";
import DashIcon from "@/components/ui/icons/DashIcon";
import { useAuth } from "@scan/auth";
import { BiDish } from "react-icons/bi";

const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
  },
  {
    path: "/admin/menu",
    name: "Menu",
    icon: <MdRestaurantMenu className="h-6 w-6" />,
  },
  {
    path: "/admin/category",
    name: "Category",
    icon: <BiDish className="h-6 w-6" />,
  },
  {
    path: "/admin/tables",
    name: "Tables",
    icon: <MdTableBar className="h-6 w-6" />,
  },
  {
    path: "/admin/sessions",
    name: "Sessions",
    icon: <MdPeopleAlt className="h-6 w-6" />,
  },
  {
    path: "/admin/orders",
    name: "Orders",
    icon: <MdShoppingCart className="h-6 w-6" />,
    badge: 3,
  },
  {
    path: "/admin/qr-codes",
    name: "QR Codes",
    icon: <MdQrCode2 className="h-6 w-6" />,
  },
  {
    path: "/admin/analytics",
    name: "Analytics",
    icon: <MdBarChart className="h-6 w-6" />,
  },
  {
    path: "/admin/restaurant",
    name: "Restaurant",
    icon: <MdStore className="h-6 w-6" />,
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <MdSettings className="h-6 w-6" />,
  },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  const { logout } = useAuth();

  const handleExit = async () => {
    await logout();

    toast.success("Logged out successfully");
    navigate("/auth/sign-in");
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/60 xl:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: 210 }}
      >
        {/* Close on mobile */}
        <span
          className="absolute top-4 right-4 block cursor-pointer xl:hidden"
          onClick={onClose}
        >
          <HiX />
        </span>

        {/* Logo */}
        <div className="mx-[56px] mt-[50px] flex items-center">
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[22px] font-bold text-navy-700 dark:text-white flex items-center gap-1">
            <span className="text-brand-500">Scan</span>
            <span className="text-gray-700 dark:text-white font-medium">
              &amp;
            </span>
            <span>Dine</span>
          </div>
        </div>

        {/* Restaurant badge */}
        <div className="mx-4 mt-6 mb-2 flex items-center gap-3 rounded-xl bg-lightPrimary dark:bg-navy-700 px-3 py-2.5">
          <div className="h-8 w-8 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="restaurant"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-navy-700 dark:text-white truncate">
              Ember &amp; Oak
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">
              Restaurant Admin
            </p>
          </div>
          <div className="ml-auto h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
        </div>

        <div className="mt-3 mb-5 h-px bg-gray-300 dark:bg-white/30 mx-4" />

        {/* Nav items */}
        <ul className="mb-auto pt-1">
          {routes.map((route) => {
            const active = isActive(route.path);
            return (
              <Link key={route.path} to={route.path}>
                <div className="relative mb-1 flex hover:cursor-pointer">
                  <li className="my-[3px] flex cursor-pointer items-center px-6 w-full">
                    <span
                      className={
                        active
                          ? "font-bold text-brand-500 dark:text-white"
                          : "font-medium text-gray-600"
                      }
                    >
                      {route.icon || <DashIcon />}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex flex-1 text-sm ${active ? "font-bold text-navy-700 dark:text-white" : "font-medium text-gray-600"}`}
                    >
                      {route.name}
                    </p>
                    {route.badge && (
                      <span className="ml-auto h-5 w-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {route.badge}
                      </span>
                    )}
                  </li>
                  {active && (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                  )}
                </div>
              </Link>
            );
          })}
        </ul>

        {/* Owner footer */}
        <div className="mx-4 mt-4 flex items-center gap-3 rounded-xl bg-lightPrimary dark:bg-navy-700 px-3 py-2.5">
          <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            MW
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-navy-700 dark:text-white truncate">
              Marcus Webb
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-400">
              Restaurant Owner
            </p>
          </div>

          <span
            onClick={handleExit}
            className="text-[10px] text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            Exit
          </span>
        </div>
      </div>
    </>
  );
}
