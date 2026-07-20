import { Phone, Mail, Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RestaurantContact({ restaurant }) {
  return (
    <div className="flex flex-col h-full bg-card p-6 md:p-8 rounded-md border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <h2 className="font-display text-2xl font-bold text-foreground tracking-tight mb-6">
        Contact
      </h2>

      <div className="space-y-4 flex-1 flex flex-col justify-start">
        {/* Phone */}
        <a
          href={`tel:${restaurant.phone}`}
          aria-label={`Call ${restaurant.phone}`}
          className="group flex items-center justify-between p-4 sm:p-5 bg-background rounded-md border border-border/40 hover:border-brand/40 transition-all duration-300 hover:shadow-brand-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20 rounded-none-force">
              <Phone size={18} className="text-brand group-hover:text-brand-foreground transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Phone
              </p>
              <p className="font-ui font-medium text-sm md:text-base text-foreground group-hover:text-brand transition-colors">
                {restaurant.phone || "Not provided"}
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Email */}
        <a
          href={`mailto:${restaurant.email}`}
          aria-label={`Email ${restaurant.email}`}
          className="group flex items-center justify-between p-4 sm:p-5 bg-background rounded-md border border-border/40 hover:border-brand/40 transition-all duration-300 hover:shadow-brand-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20 rounded-none-force">
              <Mail size={18} className="text-brand group-hover:text-brand-foreground transition-colors" />
            </div>
            <div>
              <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Email
              </p>
              <p className="font-ui font-medium text-sm md:text-base text-foreground group-hover:text-brand transition-colors truncate max-w-[200px] sm:max-w-xs">
                {restaurant.email || "Not provided"}
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        {/* Website (conditional render) */}
        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit website ${restaurant.website}`}
            className="group flex items-center justify-between p-4 sm:p-5 bg-background rounded-md border border-border/40 hover:border-brand/40 transition-all duration-300 hover:shadow-brand-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand/20 rounded-none-force">
                <Globe size={18} className="text-brand group-hover:text-brand-foreground transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Website
                </p>
                <p className="font-ui font-medium text-sm md:text-base text-foreground group-hover:text-brand transition-colors">
                  Visit Website
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </div>
  );
}