import { AlignLeft, Star, MessageSquare, Utensils, Wallet } from "lucide-react";

export default function RestaurantOverview({ restaurant }) {
  const description = restaurant.description || "Welcome to our restaurant. We take pride in serving the best culinary experiences in the city.";
  
  return (
    <div className="mb-16">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* 1. Main About Box (Spans 2 columns on mobile, 3 on desktop, 2 rows deep) */}
        <div className="col-span-2 md:col-span-3 md:row-span-2 bg-card p-6 md:p-8 rounded-md border border-border/40 shadow-sm flex flex-col justify-start hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-brand/10 flex items-center justify-center rounded-md text-brand shrink-0">
              <AlignLeft size={16} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
              About the Kitchen
            </h2>
          </div>
          <p className="text-muted-foreground font-ui text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* 2. Rating Box (Small Square) */}
        <div className="col-span-1 bg-card p-5 rounded-md border border-border/40 shadow-sm flex flex-col items-start justify-center hover:shadow-md transition-shadow duration-300">
          <div className="w-8 h-8 bg-amber-500/10 flex items-center justify-center rounded-md text-amber-500 mb-3">
            <Star size={16} className="fill-amber-500" />
          </div>
          <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Rating
          </p>
          <p className="font-display font-semibold text-2xl text-foreground">
            4.8
          </p>
        </div>

        {/* 3. Reviews Box (Small Square) */}
        <div className="col-span-1 bg-card p-5 rounded-md border border-border/40 shadow-sm flex flex-col items-start justify-center hover:shadow-md transition-shadow duration-300">
          <div className="w-8 h-8 bg-blue-500/10 flex items-center justify-center rounded-md text-blue-500 mb-3">
            <MessageSquare size={16} />
          </div>
          <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Reviews
          </p>
          <p className="font-display font-semibold text-2xl text-foreground">
            124+
          </p>
        </div>

        {/* 4. Cuisines Box (Medium Rectangle) */}
        <div className="col-span-2 bg-card p-5 md:p-6 rounded-md border border-border/40 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 bg-emerald-500/10 flex items-center justify-center rounded-md text-emerald-500 shrink-0">
            <Utensils size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              {restaurant.cuisineTypes?.length || 0} Cuisines
            </p>
            <p className="font-display font-semibold text-lg text-foreground truncate">
              {restaurant.cuisineTypes?.join(", ") || "Various"}
            </p>
          </div>
        </div>

        {/* 5. Price Range Box (Medium Rectangle) */}
        <div className="col-span-2 bg-card p-5 md:p-6 rounded-md border border-border/40 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 bg-brand/10 flex items-center justify-center rounded-md text-brand shrink-0">
            <Wallet size={18} />
          </div>
          <div>
            <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Price Range
            </p>
            <p className="font-display font-semibold text-lg text-foreground">
              {restaurant.priceRange || "N/A"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}