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
      <circle cx="24" cy="24" r="3" className="fill-brand/50" />
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

  // Quadrupled to prevent the marquee from breaking/tearing on ultra-wide screens
  const multipliedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="relative py-16 bg-background overflow-hidden border-y border-border select-none">
      {/* Subtle Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 mb-10 relative z-10">
        <p className="text-center text-muted-foreground/70 text-[10px] sm:text-xs font-ui font-bold tracking-[0.3em] uppercase">
          Trusted by high-performance kitchens globally
        </p>
      </div>

      <div className="relative z-10">
        {/* Fade Out Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap items-center">
          {multipliedBrands.map((name, i) => (
            <span
              key={i}
              className="group inline-flex items-center gap-4 text-muted-foreground/40 font-display text-xl md:text-2xl font-bold hover:text-foreground/80 transition-colors duration-300 cursor-default"
            >
              <DiamondDecor className="w-5 h-5 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-brand transition-all duration-300" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
