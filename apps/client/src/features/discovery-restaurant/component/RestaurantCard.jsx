import { MapPin, Star, ArrowRight, Clock, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function RestaurantCard({ restaurant }) {
  // Safely extract data from the exact JSON structure you provided

  console.log(restaurant);
  const coverUrl = restaurant.coverImage?.url || restaurant.coverImage;
  const logoUrl = restaurant.logo?.url || restaurant.logo;
  const cuisines = restaurant.cuisineTypes || [];
  const price = restaurant.priceRange || "₹₹";
  const desc = restaurant.description;

  // Handled fallbacks just in case the list API adds these later
  const isOpen = restaurant.operationalStatus?.toLowerCase() === "open";
  const city = restaurant.address?.city || restaurant.address || "Location TBD";
  const rating = restaurant.rating || "New";

  return (
    <Link
      to={`/restaurants/${restaurant.slug}`}
      // FIXED HEIGHT: h-[420px] prevents grid rows from shifting and expanding siblings
      className="relative block group w-full h-[420px]"
    >
      {/* Layer 1: The Architectural Wireframe (Background Offset) */}
      <div className="absolute inset-0 bg-brand/5 border border-brand/30 translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 rounded-none-force z-0" />

      {/* Layer 2: The Main Interactive Card (Foreground) */}
      <div className="relative z-10 bg-card border border-border flex flex-col h-full transition-colors duration-500 group-hover:border-brand/50 rounded-none-force overflow-hidden">
        {/* Cover Image Block */}
        <div className="relative h-[200px] shrink-0 overflow-hidden bg-muted">
          <img
            src={coverUrl || "https://via.placeholder.com/600x400"}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md bg-background/20 border border-white/10 rounded-none-force shadow-sm">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                isOpen ? "bg-green-500 animate-pulse" : "bg-red-500",
              )}
            />
            <span className="text-[10px] font-ui font-bold text-white uppercase tracking-widest">
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>

          {/* Floating Logo (Breaks the bounds of the image) */}
          <div className="absolute -bottom-6 left-5 z-20">
            <div className="w-14 h-14 bg-card border border-border p-1 rounded-none-force shadow-lg">
              <img
                src={logoUrl || "https://via.placeholder.com/150"}
                alt={`${restaurant.name} logo`}
                className="w-full h-full object-cover rounded-none-force"
              />
            </div>
          </div>
        </div>

        {/* Persistent Content */}
        <div className="p-5 pt-8 flex-1 flex flex-col bg-card relative z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-xl text-foreground group-hover:text-brand transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-ui font-bold text-foreground shrink-0 mt-1">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              {rating}
            </div>
          </div>

          {/* Location & Price */}
          <div className="flex items-center gap-4 text-xs font-ui font-medium text-muted-foreground mb-3 truncate">
            <span className="flex items-center gap-1 shrink-0">
              <MapPin size={12} className="text-brand" />
              {city}
            </span>
            <span className="flex items-center gap-1 shrink-0">
              <Clock size={12} className="text-brand" />
              {price}
            </span>
          </div>

          {/* Cuisines directly from API */}
          <div className="flex flex-wrap gap-2 mb-3">
            {cuisines.slice(0, 3).map((cuisine) => (
              <span
                key={cuisine}
                className="px-2 py-0.5 text-[10px] font-ui font-bold uppercase tracking-widest border border-border text-foreground bg-muted/30 rounded-none-force"
              >
                {cuisine}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 font-ui leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Hidden Expanding Drawer 
            (Absolute positioning prevents grid from stretching on hover) */}
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between text-xs font-ui font-bold text-brand uppercase tracking-widest group/btn">
            View Menu & Reserve
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-2"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
