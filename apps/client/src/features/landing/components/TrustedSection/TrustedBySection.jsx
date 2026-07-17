import { cn } from "@/lib/utils";

function DiamondDecor({ className }) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 2L46 24L24 46L2 24L24 2Z"
        stroke="currentColor"
        strokeWidth="1"
        className="text-brand/40"
      />
      <circle
        cx="24"
        cy="24"
        r="3"
        className="fill-brand/50 group-hover:animate-breathe origin-center"
      />
    </svg>
  );
}

const TrustedBySection = () => {
  const brands = [
    "Ember & Oak",
    "Sakura Garden",
    "La Piazza",
    "The Spice Route",
    "Blue Harbor",
    "Terra Firma",
    "Copper Pot",
    "Maison Rouge",
  ];

  const multipliedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="relative py-20 bg-background overflow-hidden border-y border-border select-none">
      {/* Layered background textures – already premium */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Warm ambient glow behind the heading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-brand/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 mb-12 relative z-10">
        <p className="text-center text-gradient-gold text-[10px] sm:text-xs font-ui font-bold tracking-[0.3em] uppercase">
          Trusted by high-performance kitchens globally
        </p>
      </div>

      <div className="relative z-10">
        {/* Edge fades with a hint of warmth */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none" />

        {/* Marquee track – slightly tighter gap, luxurious hover state */}
        <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap items-center py-4">
          {multipliedBrands.map((name, i) => (
            <span
              key={i}
              className="group inline-flex items-center gap-4 text-muted-foreground/30 font-display text-xl md:text-2xl font-bold transition-all duration-500 hover:text-foreground/90 hover:scale-[1.02] hover:drop-shadow-[0_0_6px_var(--brand)]"
            >
              <DiamondDecor className="w-5 h-5 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-brand transition-all duration-300 group-hover:scale-110" />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
    </section>
  );
};

export default TrustedBySection;
