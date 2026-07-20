import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  QrCode,
  ChefHat,
  BarChart3,
  Smartphone,
  Zap,
  Shield,
  ScanLine,
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Instant QR Ordering",
    description:
      "Scan once, dine seamlessly. No app downloads, no friction. The fastest way to get your guests from seated to served.",
    color: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/20",
    // Bento specific: Large Hero Block
    className:
      "md:col-span-2 md:row-span-2 min-h-[320px] bg-gradient-to-br from-card to-card/40",
    showGraphic: true,
  },
  {
    icon: ChefHat,
    title: "Kitchen-Smart Menu",
    description:
      "Real-time availability, variants, and prep times in one system.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    // Bento specific: Standard Square
    className: "md:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description:
      "Deep insights on peak hours, bestsellers, and revenue trends.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    // Bento specific: Standard Square
    className: "md:col-span-1",
  },
  {
    icon: Smartphone,
    title: "Mobile-First UI",
    description:
      "Every interaction feels native on any device, any screen size.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    // Bento specific: Tall Block
    className: "md:col-span-1 md:row-span-2 min-h-[280px]",
  },
  {
    icon: Zap,
    title: "Sub-second Speed",
    description:
      "Lightning performance keeps service flowing without interruption.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    // Bento specific: Wide Block
    className: "md:col-span-2",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 compliant infrastructure.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    // Bento specific: Wide Block
    className: "md:col-span-2",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden border-t border-border">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Lighting */}
      <motion.div
        className="absolute top-1/3 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none hidden md:block"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header Block */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <ScanLine size={13} className="text-brand animate-pulse" />
            Platform Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[0.95] tracking-tight">
            Everything your restaurant
            <br />
            <em className="not-italic text-gradient drop-shadow-sm">
              needs to thrive.
            </em>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-ui font-medium">
            From the first QR scan to the final payment — every touchpoint
            perfectly engineered for scale and speed.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]"
        >
          {features.map((feat, index) => {
            const Icon = feat.icon;

            return (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                whileHover={{ scale: 0.99 }}
                className={cn(
                  "group relative p-8 bg-card/60 backdrop-blur-md  border border-border hover:border-brand/40 transition-colors duration-500 overflow-hidden rounded-none-force flex flex-col shadow-sm hover:shadow-brand-sm",
                  feat.className,
                )}
              >
                {/* Subtle Hover Gradient Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Decorative Graphic for Large Cards */}
                {feat.showGraphic && (
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <QrCode size={250} />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={cn(
                      "w-12 h-12 flex items-center justify-center mb-6 border rounded-none-force transition-colors duration-500",
                      feat.bg,
                      feat.border,
                      "group-hover:border-brand/40 group-hover:bg-brand/10",
                    )}
                  >
                    <Icon
                      size={20}
                      className={cn(
                        feat.color,
                        "group-hover:scale-110 transition-transform duration-500",
                      )}
                    />
                  </div>

                  <div className="mt-auto">
                    <h3
                      className={cn(
                        "font-display font-bold text-foreground mb-3 transition-colors duration-300",
                        feat.showGraphic ? "text-2xl sm:text-3xl" : "text-xl",
                      )}
                    >
                      {feat.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-ui leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Sharp Corner Accent */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand/0 group-hover:border-brand/50 transition-colors duration-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand/0 group-hover:border-brand/50 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
