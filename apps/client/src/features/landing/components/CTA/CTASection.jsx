import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";

// ─── Decorative Elements ───────────────────────────────────────

export function DiamondDecor({ className }) {
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
      <path
        d="M24 8L40 24L24 40L8 24L24 8Z"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-muted-foreground/30"
      />
      <circle cx="24" cy="24" r="3" className="fill-brand/50" />
    </svg>
  );
}

export function CrossDecor({ className }) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 32 32"
      fill="none"
    >
      <line
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-brand/40"
      />
      <line
        x1="0"
        y1="16"
        x2="32"
        y2="16"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-brand/40"
      />
      <circle cx="16" cy="16" r="2" className="fill-brand/60" />
    </svg>
  );
}

export function WaveDecor({ className }) {
  return (
    <svg
      className={cn(
        "w-full pointer-events-none text-muted-foreground/10",
        className,
      )}
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
    >
      <path
        d="M0,40 C150,80 300,0 450,40 C600,80 750,0 900,40 C1050,80 1200,0 1200,40 L1200,80 L0,80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Main CTA Section ──────────────────────────────────────────

const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle vertical parallax for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-background border-t border-border select-none"
    >
      {/* Cinematic Parallax Background Layer */}
      <motion.div className="absolute inset-0 z-0 bg-background" style={{ y }}>
        <img
          src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Restaurant interior"
          className="w-full h-full object-cover mix-blend-luminosity opacity-[0.03] dark:opacity-[0.1]"
        />
      </motion.div>

      {/* Edge Gradients to blend the image seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      {/* Platform Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" />

      {/* Ambient Lighting Accents */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Geometrical Decorators (Hidden on mobile to keep it clean) */}
      <DiamondDecor className="absolute top-16 left-[10%] w-12 h-12 animate-float hidden md:block" />
      <CrossDecor className="absolute bottom-16 right-[10%] w-10 h-10 animate-float-delay hidden md:block" />
      <DiamondDecor className="absolute top-1/2 right-[8%] w-8 h-8 animate-breathe hidden md:block opacity-50" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-5">
        <FadeUp className="flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <Zap size={13} className="text-brand animate-pulse" />
            Get Started Today
          </span>

          {/* Modular Typography Header */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-[0.95] tracking-tight">
            Ready to transform
            <br />
            <em className="not-italic text-gradient drop-shadow-sm">
              your restaurant?
            </em>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg mb-12 max-w-xl mx-auto font-ui font-medium">
            Join 248+ high-performance kitchens already using Scan & Dine to
            revolutionize their operations. Start free — no credit card
            required.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/register"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm rounded-none-force relative overflow-hidden"
            >
              <span className="relative z-10">Deploy Free Sandbox</span>
              <ArrowRight
                size={15}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/pricing"
              className="group w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-card/30 backdrop-blur-md text-foreground font-ui font-bold text-sm border border-border hover:bg-accent transition-all rounded-none-force"
            >
              View Pricing Matrix
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default CTASection;
