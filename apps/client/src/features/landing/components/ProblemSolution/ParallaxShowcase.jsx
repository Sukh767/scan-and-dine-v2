import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

import { FadeUp } from "@/components/motion";

const ParallaxShowcase = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax translations – already GPU‑accelerated by Framer Motion,
  // but the extra layer promotion ensures no paint jank on low‑end devices.
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

  const cards = [
    {
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Premium Starters",
      style: y1,
    },
    {
      img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Signature Mains",
      style: y2,
    },
    {
      img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
      label: "Artisan Desserts",
      style: y3,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-32 bg-background overflow-hidden border-y border-border"
    >
      {/* Textures — kept as is, they define the premium atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient glow — now GPU‑pushed for seamless scaling */}
      <motion.div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none hidden lg:block gpu"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content — untouched structure, only text-balance added for typographic perfection */}
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force">
              <span className="w-1.5 h-1.5 bg-brand animate-pulse" />
              Why Scan & Dine
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[0.95] tracking-tight text-balance">
              Your full menu,
              <br />
              <em className="not-italic text-gradient drop-shadow-sm">
                beautifully served.
              </em>
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-md font-ui font-medium">
              Every dish photographed, every detail captured. Guests browse a
              living, breathing menu that updates in real-time based on your
              kitchen’s inventory.
            </p>

            <div className="space-y-4">
              {[
                "Item availability synced in real-time",
                "Multi-variant & modifier support",
                "Allergen & dietary safety flags",
                "Bestseller & chef recommendation badges",
              ].map((item) => (
                <div key={item} className="flex items-start gap-4 group">
                  <div className="w-5 h-5 mt-0.5 border border-brand/40 bg-brand/5 flex items-center justify-center flex-shrink-0 rounded-none-force group-hover:bg-brand group-hover:border-brand transition-colors">
                    <Check
                      size={12}
                      className="text-brand group-hover:text-brand-foreground transition-colors"
                    />
                  </div>
                  <span className="text-foreground/80 font-ui text-sm sm:text-base font-medium group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/features"
              className="group inline-flex items-center gap-3 mt-12 px-8 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm rounded-none-force relative overflow-hidden"
            >
              <span className="relative z-10">Explore Features</span>
              <ArrowRight
                size={15}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
                aria-hidden="true" // decorative icon, hidden from assistive tech
              />
            </Link>
          </FadeUp>

          {/* Right parallax stack — each card now GPU‑optimised and lazy‑loaded */}
          <div className="relative h-[400px] sm:h-[500px] hidden lg:block">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                className="absolute shadow-xl overflow-hidden border border-border bg-card glass rounded-none-force gpu will-change-transform"
                style={{
                  y: card.style,
                  left: `${[0, 35, 15][i]}%`,
                  top: `${[5, 15, 50][i]}%`,
                  width: "55%",
                  zIndex: [2, 3, 1][i],
                }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={card.img}
                    alt={card.label}
                    loading="lazy" // defer off‑screen images
                    decoding="async" // non‑blocking decode
                    fetchPriority="low" // low priority for parallax images
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 bg-card border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-ui font-bold text-foreground uppercase tracking-widest">
                      {card.label}
                    </p>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-brand rounded-full" />
                      <div className="w-1 h-1 bg-brand rounded-full opacity-50" />
                      <div className="w-1 h-1 bg-brand rounded-full opacity-20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
