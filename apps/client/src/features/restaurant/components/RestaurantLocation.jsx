import { MapPin, Navigation } from "lucide-react";

export default function RestaurantLocation({ restaurant }) {
  const { address } = restaurant;

  return (
    <div className="flex flex-col h-full bg-card p-6 md:p-8 rounded-md border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
          Location
        </h2>
        <a 
          href={`https://maps.google.com/?q=${restaurant.name} ${address?.city || ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-ui font-semibold text-brand hover:underline flex items-center gap-1.5 transition-all"
        >
          Get Directions <Navigation size={12} />
        </a>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-muted border border-border/40 rounded-md mb-6 relative overflow-hidden flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-grid opacity-[0.03]" />
          <div className="relative z-10 flex flex-col items-center gap-2 transition-transform duration-500 group-hover:scale-105">
            <div className="w-10 h-10 bg-background shadow-sm flex items-center justify-center rounded-md text-brand">
              <MapPin size={18} />
            </div>
            <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-muted-foreground bg-background/90 px-3 py-1.5 rounded-md backdrop-blur-sm shadow-sm">
              Map View Pending
            </span>
          </div>
        </div>

        {/* Address Details Block */}
        <address className="not-italic flex items-start gap-4 p-5 bg-background rounded-md border border-border/40">
          <div className="w-10 h-10 bg-brand/10 flex items-center justify-center rounded-md text-brand shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground text-lg mb-1">{restaurant.name}</p>
            {address ? (
              <p className="font-ui text-muted-foreground text-sm leading-relaxed">
                {address.street || "Street Address"}<br />
                {address.city}, {address.state}<br />
                {address.country} - {address.zip}
              </p>
            ) : (
              <p className="font-ui text-muted-foreground text-sm">Location details unavailable.</p>
            )}
          </div>
        </address>
      </div>
    </div>
  );
}