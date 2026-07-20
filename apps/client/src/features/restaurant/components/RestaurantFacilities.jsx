import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Accessibility,
  UtensilsCrossed,
  Dog,
  Music,
  Check, // fallback icon
} from "lucide-react";

// ─── Map facility names to specific icons ────────────────────
const ICON_MAP = {
  "wi-fi": Wifi,
  "wifi": Wifi,
  "parking": Car,
  "wheelchair accessible": Accessibility,
  "outdoor seating": UtensilsCrossed,
  "pet friendly": Dog,
  "live music": Music,
  // add more as needed
};

function getFacilityIcon(name) {
  const normalized = name.toLowerCase().trim();
  return ICON_MAP[normalized] || Check;
}

export default function RestaurantFacilities({ restaurant }) {
  const facilities = restaurant.facilities || [];

  if (!facilities.length) return null;

  // Multiply to ensure enough content for ultra‑wide screens (6x the original list)
  const marqueeItems = Array(6).fill(facilities).flat();

  return (
    <div className="mb-16">
      {/* Heading preserved from original */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
          Amenities
        </h2>
      </div>

      {/* Marquee wrapper with fade mask */}
      <div
        className="relative flex overflow-hidden w-full py-6" // increased padding for breathing room
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Slower seamless scroll (50s) */}
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 50, // significantly slower for a luxurious, unhurried feel
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* First half of items */}
          <div className="flex gap-12 px-5 items-center">
            {marqueeItems.map((facility, idx) => {
              const Icon = getFacilityIcon(facility);
              return (
                <div
                  key={`set1-${idx}`}
                  className="group flex items-center gap-3 cursor-default"
                >
                  {/* Icon container with hover scale + brand glow */}
                  <div className="w-8 h-8 bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20 group-hover:shadow-[0_0_12px_rgba(194,68,10,0.25)] rounded-none-force">
                    <Icon size={14} className="text-brand transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-display text-lg font-medium text-foreground whitespace-nowrap tracking-wide transition-colors group-hover:text-brand">
                    {facility}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Duplicate half for seamless loop */}
          <div className="flex gap-12 px-5 items-center">
            {marqueeItems.map((facility, idx) => {
              const Icon = getFacilityIcon(facility);
              return (
                <div
                  key={`set2-${idx}`}
                  className="group flex items-center gap-3 cursor-default"
                >
                  <div className="w-8 h-8 bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20 group-hover:shadow-[0_0_12px_rgba(194,68,10,0.25)] rounded-none-force">
                    <Icon size={14} className="text-brand transition-transform group-hover:scale-110" />
                  </div>
                  <span className="font-display text-lg font-medium text-foreground whitespace-nowrap tracking-wide transition-colors group-hover:text-brand">
                    {facility}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}