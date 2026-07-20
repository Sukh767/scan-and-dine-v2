import { QrCode, CalendarPlus, Utensils } from "lucide-react";

export default function RestaurantCTA({ restaurant }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        
        <div className="flex-1 hidden sm:block">
          <h3 className="font-display font-bold text-foreground text-lg truncate">
            {restaurant.name}
          </h3>
          <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground">
            Ready to order?
          </p>
        </div>

        <div className="flex w-full sm:w-auto gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all rounded-none-force">
            <Utensils size={14} /> Menu
          </button>
          
          {/* Placeholder for future reservation logic */}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all rounded-none-force">
            <CalendarPlus size={14} /> Reserve
          </button>

          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-brand text-brand-foreground font-ui font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-brand-sm rounded-none-force">
            <QrCode size={14} /> Scan Table
          </button>
        </div>
        
      </div>
    </div>
  );
}