import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/features/navbar/Navbar";
import Sidebar from "@/features/sidebar/Sidebar";
import Footer from "@/components/ui/footer/Footer";

// Feature pages — lazy-loaded per route to keep the initial bundle lean
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const MenuPage = lazy(() => import("@/features/menu/page/MenuPage"));
const CategoryPage = lazy(
  () => import("@/features/categories/pages/CategoryPage"),
);
const TablePage = lazy(() => import("@/features/table/page/TablePage"));

const SessionPage = lazy(() => import("@/features/session/page/SessionPage"));

function RouteFallback() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
    </div>
  );
}

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handle = () => setOpen(window.innerWidth >= 1200);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[222px]">
          <div className="h-full">
            <Navbar onOpenSidenav={() => setOpen(true)} />
            <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2 pt-5">
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="menu" element={<MenuPage />} />
                  <Route path="category" element={<CategoryPage />} />
                  <Route path="tables" element={<TablePage />} />
                  <Route path="sessions/*" element={<SessionPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="dashboard" replace />}
                  />
                </Routes>
              </Suspense>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
