import { MapPin, Star, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function RestaurantCard({ restaurant }) {
  const isOpen = restaurant.operationalStatus === "open";

  return (
    <Link
      to={`/restaurants/${restaurant.slug}`}
      className="relative block group w-full h-full"
    >
      {/* Layer 1: The Architectural Wireframe (Background Offset) */}
      <div className="absolute inset-0 bg-brand/5 border border-brand/30 translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 rounded-none-force z-0" />

      {/* Layer 2: The Main Interactive Card (Foreground) */}
      <div className="relative z-10 bg-card border border-border flex flex-col h-full transition-colors duration-500 group-hover:border-brand/50 rounded-none-force overflow-hidden">
        
        {/* Cover Image Block */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={restaurant.coverImage?.url || restaurant.coverImage} // Handle both mock and API data structures
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md bg-background/20 border border-white/10 rounded-none-force shadow-sm">
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isOpen ? "bg-green-500" : "bg-red-500")} />
            <span className="text-[10px] font-ui font-bold text-white uppercase tracking-widest">
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>

          {/* Floating Logo (Breaks the bounds of the image) */}
          <div className="absolute -bottom-6 left-5">
            <div className="w-14 h-14 bg-card border border-border p-1 rounded-none-force shadow-lg">
              <img
                src={restaurant.logo?.url || restaurant.logo || "https://via.placeholder.com/150"}
                alt={`${restaurant.name} logo`}
                className="w-full h-full object-cover rounded-none-force"
              />
            </div>
          </div>
        </div>

        {/* Persistent Content */}
        <div className="p-5 pt-8 flex-1 flex flex-col bg-card">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-xl text-foreground group-hover:text-brand transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 text-sm font-ui font-bold text-foreground">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              {restaurant.rating || "New"}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-ui font-medium text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-brand" />
              {restaurant.address?.city || restaurant.address}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-brand" />
              {restaurant.priceRange || "$$"}
            </span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 font-ui leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Hidden Expanding Drawer (Extends shape on hover) */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-muted/30">
          <div className="overflow-hidden">
            <div className="p-5 pt-0 flex flex-col gap-4 border-t border-border mt-2">
              
              <div className="flex flex-wrap gap-2 pt-4">
                {restaurant.cuisineTypes?.slice(0, 3).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2 py-1 text-[10px] font-ui font-bold uppercase tracking-widest border border-border text-foreground bg-background rounded-none-force"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-ui font-bold text-brand uppercase tracking-widest mt-2 group/btn">
                View Menu & Reserve
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-2" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}