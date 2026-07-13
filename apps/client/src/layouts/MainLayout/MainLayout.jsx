import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import AnnouncementBar from "./AnnouncementBar";
import PageTransition from "@/shared/transitions/PageTransition";
import { clsx } from "clsx";

// flip to true (or drive from config/API) during a campaign
const SHOW_ANNOUNCEMENT = false;

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className={clsx("antialiased bg-[#181818] relative")}>
      {SHOW_ANNOUNCEMENT && <AnnouncementBar />}

      <MainHeader></MainHeader>

      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <MainFooter />
    </div>
  );
}
