import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Play,
  ScanLine,
  QrCode,
  TrendingUp,
  Receipt,
} from "lucide-react";

// ─── Safely Subscribed Counter Component ───────────────────────
function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springVal = useSpring(0, { stiffness: 45, damping: 15 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      springVal.set(value);
    }
  }, [isInView, value, springVal]);

  useEffect(() => {
    return springVal.on("change", (v) => setDisplay(Math.round(v)));
  }, [springVal]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── SVG Decorations ──────────────────────────────────────────
function GridOrb({ className, style }) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      style={style}
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <radialGradient id="orb" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="var(--brand, #e95a2b)"
            stopOpacity="0.15"
          />
          <stop
            offset="100%"
            stopColor="var(--brand, #e95a2b)"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#orb)" />
    </svg>
  );
}

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
        className="text-brand/30"
      />
      <circle cx="24" cy="24" r="3" className="fill-brand/40" />
    </svg>
  );
}

// ─── Floating UI Illustrations (Parallax) ──────────────────────
const FloatingIllustrations = ({ scrollYProgress }) => {
  // Map scroll progress to different vertical movements (parallax effect)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
      {/* 1. Left Side: Floating Receipt / Ticket */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[5%] w-48 bg-card/60 backdrop-blur-xl border border-border p-4 shadow-2xl shadow-brand/5 rounded-none-force"
      >
        <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
          <Receipt size={18} className="text-brand" />
          <div className="h-2 w-16 bg-muted-foreground/20 rounded-full" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-1.5 w-20 bg-muted-foreground/15 rounded-full" />
              <div className="h-1.5 w-8 bg-brand/20 rounded-full" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Right Side: Analytics Card */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[25%] right-[6%] w-56 bg-card/60 backdrop-blur-xl border border-border p-5 shadow-2xl shadow-brand/5 rounded-none-force"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="h-2 w-24 bg-muted-foreground/20 rounded-full" />
          <TrendingUp size={16} className="text-green-500" />
        </div>
        <div className="flex items-end gap-2 h-16 mt-4">
          {[40, 70, 45, 90, 65, 100].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-brand/40 to-brand rounded-t-sm"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* 3. Bottom Left: QR Scan Interface */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[20%] left-[12%] w-32 aspect-square bg-card/40 backdrop-blur-md border border-border flex items-center justify-center shadow-xl rounded-none-force"
      >
        <div className="relative">
          <QrCode size={40} className="text-foreground/80" />
          <motion.div
            className="absolute top-0 left-[-10%] right-[-10%] h-0.5 bg-brand shadow-[0_0_8px_rgba(233,90,43,0.8)]"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Hero Component ───────────────────────────────────────
export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground select-none pt-10"
    >
      {/* High-End Clean Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-background"
        style={{ scale, y: imgY }}
      >
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2070&q=80"
          alt="Premium Restaurant Interior"
          className="w-full h-full object-cover mix-blend-luminosity opacity-[0.03] dark:opacity-[0.15]"
        />
        {/* Subtle gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </motion.div>

      {/* Structured Textures & Ambient Overlays */}
      <div className="absolute inset-0 z-0 bg-noise opacity-[0.02] dark:opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-grid opacity-[0.03] dark:opacity-10 pointer-events-none" />

      {/* Parallax UI Illustrations */}
      <FloatingIllustrations scrollYProgress={scrollYProgress} />

      {/* Floating Dynamic Fluid Lighting Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GridOrb className="absolute -top-40 -left-40 w-[600px] h-[600px] animate-breathe opacity-50 dark:opacity-100" />
        <GridOrb
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] animate-breathe opacity-50 dark:opacity-100"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <DiamondDecor className="absolute top-1/4 right-[15%] w-8 h-8 animate-float hidden md:block" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto pt-24 pb-16"
        style={{ y: textY, opacity }}
      >
        {/* Context Platform Eyebrow Badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 border border-border bg-card/50 backdrop-blur-md text-foreground/80 text-[10px] sm:text-xs font-ui font-bold uppercase tracking-[0.2em] mb-8 rounded-none-force shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScanLine size={14} className="text-brand animate-pulse" />
          The Modern Dining OS
          <ArrowRight size={12} className="text-muted-foreground ml-2" />
        </motion.div>

        {/* Modular Typography Title Block */}
        <motion.h1
          className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.95] mb-6 tracking-tight uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-foreground">Orchestrate</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand via-orange-500 to-amber-500 leading-none py-2 drop-shadow-sm">
            Every Order
          </span>
          <span className="block text-foreground">To Perfection.</span>
        </motion.h1>

        {/* Secondary Subtitle Descriptors */}
        <motion.p
          className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-ui font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Transform operational velocity with direct guest control. Deploy
          seamless scan-to-order sessions perfectly synced with your real-time
          kitchen architecture.
        </motion.p>

        {/* Primary Interactive CTA Clusters */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-20 relative z-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            to="/register"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-95 transition-all shadow-brand-sm rounded-none-force relative overflow-hidden"
          >
            <span className="relative z-10">Deploy Free Sandbox</span>
            <ArrowRight
              size={15}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-border text-foreground font-ui font-bold text-sm hover:bg-accent/50 transition-all backdrop-blur-md rounded-none-force bg-card/30 shadow-sm">
            <div className="w-6 h-6 border border-border flex items-center justify-center rounded-none-force bg-background/80">
              <Play
                size={10}
                className="ml-0.5 fill-foreground text-foreground"
              />
            </div>
            Review Pipeline — 2 min
          </button>
        </motion.div>

        {/* Live System Metric Architecture */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border max-w-4xl mx-auto border border-border shadow-sm rounded-none-force overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { value: 248, suffix: "+", label: "Active Restos" },
            { value: 89, suffix: "k+", label: "Session Operations" },
            { value: 99, suffix: ".9%", label: "Uptime SLA Rate" },
            { value: 4, suffix: ".9 ★", label: "Global Score" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-6 px-4 bg-card/80 backdrop-blur-xl transition-colors hover:bg-card"
            >
              <span className="font-display text-2xl sm:text-3xl tracking-tight text-foreground font-black">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-muted-foreground text-[10px] font-ui font-bold tracking-widest uppercase mt-1 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Axis Direction Pointer */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-[9px] font-ui font-bold tracking-[0.3em] uppercase">
          Scroll Discover
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-brand to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
