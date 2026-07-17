import { Link } from "react-router-dom";
import { ArrowRight, ScanLine } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import RestaurantCard from "./RestaurantCard"; // Adjust import path

// Pass your mockRestaurants as a prop or import them directly
export function RestaurantShowcase({ mockRestaurants = [] }) {
  return (
    <section
      id="restaurants"
      className="py-32 bg-background scroll-mt-20 relative overflow-hidden border-t border-border"
    >
      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
              <ScanLine size={13} className="text-brand" />
              Partner Network
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-tight">
              Discover incredible
              <br />
              <em className="not-italic text-gradient drop-shadow-sm">
                dining experiences.
              </em>
            </h2>
          </div>

          <Link
            to="/app"
            className="group flex items-center gap-2 px-6 py-3 border border-border text-sm font-ui font-bold text-foreground hover:bg-brand hover:border-brand hover:text-brand-foreground transition-all rounded-none-force glass"
          >
            Explore Directory
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12"
          stagger={0.15}
        >
          {mockRestaurants.slice(0, 3).map((restaurant) => (
            <StaggerItem key={restaurant.id || restaurant.slug}>
              <RestaurantCard restaurant={restaurant} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
