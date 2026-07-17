import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Users, Utensils, Clock, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { AnimatedNumber } from "@/components/AnimatedNumber";

const AnalyticsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background glow now scales subtly – kept as original
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.9]);

  const stats = [
    {
      icon: TrendingUp,
      label: "Revenue Growth",
      value: 24,
      suffix: "%",
      color: "text-emerald-500",
      sub: "avg monthly",
    },
    {
      icon: Users,
      label: "Total Diners",
      value: 89420,
      suffix: "+",
      color: "text-blue-500",
      sub: "all time",
    },
    {
      icon: Utensils,
      label: "Orders Served",
      value: 284000,
      suffix: "+",
      color: "text-amber-500",
      sub: "this quarter",
    },
    {
      icon: Clock,
      label: "Avg Session",
      value: 58,
      suffix: "min",
      color: "text-rose-500",
      sub: "per table",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-background relative overflow-hidden border-y border-border select-none"
    >
      {/* Textures – untouched */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient glow – still parallax but now GPU‑accelerated */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none gpu"
        style={{ scale: bgScale }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Compact header – still centered, smaller bottom margin */}
        <FadeUp className="text-center flex flex-col items-center mb-10 md:mb-12">
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 rounded-none-force shadow-sm">
            <BarChart3 size={13} className="text-brand animate-pulse" />
            Platform Numbers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[0.95] tracking-tight text-balance">
            Data that drives{" "}
            <em className="not-italic text-gradient drop-shadow-sm">
              decisions.
            </em>
          </h2>
        </FadeUp>

        {/* Stats grid – tighter gap, vertical card design slimmed down */}
        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          stagger={0.1}
        >
          {stats.map((m) => {
            const Icon = m.icon;
            return (
              <StaggerItem key={m.label}>
                <div className="group p-5 sm:p-6 bg-card/60 backdrop-blur-md border border-border hover:border-brand/40 transition-colors duration-500 relative overflow-hidden text-center rounded-none-force shadow-sm hover:shadow-brand-sm flex flex-col items-center h-full">
                  {/* Hover accent line – unchanged */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-brand transition-all duration-500 ease-out group-hover:w-full" />

                  {/* Icon box – slightly smaller */}
                  <div
                    className={cn(
                      "w-10 h-10 border border-border bg-card flex items-center justify-center mb-4 rounded-none-force transition-colors duration-500",
                      "group-hover:border-brand/40 group-hover:bg-brand/5",
                    )}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        m.color,
                        "group-hover:scale-110 transition-transform duration-500",
                      )}
                    />
                  </div>

                  {/* Number – reduced size, still animated and impactful */}
                  <p
                    className={cn(
                      "font-display text-3xl sm:text-4xl font-black tracking-tight mb-1 drop-shadow-sm",
                      m.color,
                    )}
                  >
                    <AnimatedNumber value={m.value} suffix={m.suffix} />
                  </p>

                  {/* Labels – compact but legible */}
                  <p className="text-foreground font-ui font-bold text-xs sm:text-sm tracking-wide mt-1">
                    {m.label}
                  </p>
                  <p className="text-muted-foreground font-ui font-semibold text-[10px] tracking-widest uppercase mt-0.5">
                    {m.sub}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AnalyticsSection;
