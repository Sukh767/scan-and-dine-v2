import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode, Utensils, ChefHat, TrendingUp, ScanLine } from "lucide-react";

// Assuming you have this custom motion wrapper as imported in your snippet
import { FadeUp } from "@/components/motion";

const HowItWorksSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the background image
  const bgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const steps = [
    {
      n: "01",
      title: "Scan the QR",
      desc: "Guest points their phone at the table QR. Session starts instantly — no app needed.",
      icon: QrCode,
    },
    {
      n: "02",
      title: "Browse & Order",
      desc: "Navigate the full digital menu and place orders directly to the kitchen.",
      icon: Utensils,
    },
    {
      n: "03",
      title: "Kitchen Fires",
      desc: "Orders appear instantly on the kitchen display. No paper tickets, no shouting.",
      icon: ChefHat,
    },
    {
      n: "04",
      title: "Pay & Leave",
      desc: "Consolidated bill. Pay by card, UPI, or cash. Session closes automatically.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-background border-y border-border select-none"
    >
      {/* Cinematic Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-background"
        style={{ y: bgY }}
      >
        <img
          src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Restaurant Flow"
          className="w-full h-full object-cover mix-blend-luminosity opacity-[0.03] dark:opacity-[0.15]"
        />
        {/* Gradients to blend the image edges smoothly into the background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      {/* Structured Textures & Ambient Overlays */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" />

      {/* Ambient Lighting Accents */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Block */}
        <FadeUp className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <ScanLine size={13} className="text-brand animate-pulse" />
            The Flow
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-[0.95] tracking-tight">
            Simple for guests.
            <br />
            <em className="not-italic text-gradient drop-shadow-sm">
              Powerful for you.
            </em>
          </h2>
        </FadeUp>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="group p-8 bg-card/60 backdrop-blur-md border border-border hover:border-brand/40 transition-colors duration-500 relative overflow-hidden h-full rounded-none-force shadow-sm hover:shadow-brand-sm flex flex-col">
                  {/* CSS-based Hover Accent Line (Replaces Framer Motion width animation for better performance) */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-brand transition-all duration-500 ease-out group-hover:w-full" />

                  {/* Large Background Number */}
                  <span className="text-[5rem] font-display font-black text-foreground/5 absolute -top-2 -right-2 leading-none select-none transition-colors duration-500 group-hover:text-brand/5">
                    {step.n}
                  </span>

                  {/* Icon Box */}
                  <div className="w-12 h-12 border border-border bg-card flex items-center justify-center mb-8 rounded-none-force transition-colors duration-500 group-hover:border-brand/40 group-hover:bg-brand/10 relative z-10">
                    <Icon
                      size={20}
                      className="text-brand group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-display font-bold text-xl text-foreground mb-3 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-ui leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
