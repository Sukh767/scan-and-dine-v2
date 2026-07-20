import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RestaurantHero({ restaurant }) {
  // Safely extract data based on your console log
  const isOpen = restaurant.operationalStatus?.toLowerCase() === "open";
  const coverUrl = restaurant.coverImage?.url || "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80";
  const logoUrl = restaurant.logo?.url;

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end">
      
      {/* Cinematic Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src={coverUrl} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* Smooth gradient that blends perfectly into your background theme color */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/20" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10">
          
          {/* Logo Card - Soft, elevated, and elegant */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-28 h-28 sm:w-36 sm:h-36 bg-card rounded-3xl p-1.5 shadow-2xl flex-shrink-0 relative ring-1 ring-border/50"
          >
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${restaurant.name} Logo`} 
                className="w-full h-full object-cover rounded-[1.25rem]" 
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-[1.25rem] flex items-center justify-center">
                <span className="font-display text-4xl font-bold text-foreground">
                  {restaurant.name?.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Restaurant Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex-1 space-y-4"
          >
            {/* Status & Price Pill Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border",
                isOpen 
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                  : "bg-red-500/10 text-red-500 border-red-500/20"
              )}>
                <span className={cn("w-2 h-2 rounded-full", isOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
                {isOpen ? "Open Now" : "Currently Closed"}
              </div>
              
              <div className="px-3.5 py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-border text-foreground text-xs font-semibold">
                {restaurant.priceRange || "₹₹"}
              </div>
            </div>

            {/* Typography: Large, elegant, with soft tracking */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-foreground tracking-tight drop-shadow-md">
              {restaurant.name}
            </h1>

            {/* Location & Cuisines */}
            <div className="flex flex-wrap items-center gap-4 text-foreground/80 text-sm md:text-base font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin size={18} className="text-brand" /> 
                {restaurant.address?.city || "Location unavailable"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span>{restaurant.cuisineTypes?.join(" • ") || "Various Cuisines"}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}