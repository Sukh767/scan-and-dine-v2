import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowRight, CreditCard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion"; // Assuming your motion wrappers

const plans = [
  {
    name: "Starter",
    price: 49,
    period: "month",
    description:
      "Perfect for single-location restaurants just getting started.",
    features: [
      "Up to 20 tables",
      "Unlimited QR codes",
      "Digital menu",
      "Basic analytics",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: 129,
    period: "month",
    description: "For established restaurants ready to scale operations.",
    features: [
      "Up to 60 tables",
      "Advanced analytics",
      "Staff management",
      "Custom branding",
      "Priority support",
      "API access",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: 399,
    period: "month",
    description: "Multi-location groups and hospitality brands.",
    features: [
      "Unlimited tables",
      "Multi-location",
      "White-label",
      "Dedicated CSM",
      "Custom integrations",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-background relative overflow-hidden border-y border-border select-none">
      {/* Dynamic Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Parallax Glows */}
      <motion.div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Perfectly Centered Header Block */}
        <FadeUp className="text-center flex flex-col items-center mb-20">
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <CreditCard size={13} className="text-brand animate-pulse" />
            Transparent Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-[0.95] tracking-tight">
            Simple plans.
            <br />
            <em className="not-italic text-gradient drop-shadow-sm">
              Infinite scale.
            </em>
          </h2>
          <p className="text-muted-foreground font-ui font-medium text-lg">
            14-day free trial. No credit card required.
          </p>
        </FadeUp>

        {/* Pricing Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12 max-w-6xl mx-auto"
          stagger={0.15}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div className="relative block group w-full h-full cursor-default">
                {/* Layer 1: The Architectural Wireframe (Mechanical Offset) */}
                <div
                  className={cn(
                    "absolute inset-0 translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 rounded-none-force z-0",
                    plan.highlighted
                      ? "bg-brand/20 border border-brand/50 shadow-[0_0_40px_rgba(233,90,43,0.3)]"
                      : "bg-card/50 border border-border",
                  )}
                />

                {/* Layer 2: The Main Card */}
                <div
                  className={cn(
                    "relative z-10 flex flex-col h-full transition-colors duration-500 rounded-none-force overflow-hidden",
                    plan.highlighted
                      ? "bg-card border-2 border-brand"
                      : "bg-card border border-border group-hover:border-foreground/30",
                  )}
                >
                  {/* Dynamic Header Area */}
                  <div
                    className={cn(
                      "p-8 relative overflow-hidden border-b",
                      plan.highlighted
                        ? "bg-brand text-brand-foreground border-brand"
                        : "bg-muted/30 border-border text-foreground",
                    )}
                  >
                    {/* Decorative Tech Graphic Background */}
                    <svg
                      className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 pointer-events-none"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <path
                        d="M0 100L100 0M20 100L100 20M40 100L100 40"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="80"
                        cy="20"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Floating Badge */}
                    {plan.badge && (
                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-1.5 bg-background text-foreground font-ui font-bold text-[10px] tracking-widest uppercase px-3 py-1.5 shadow-xl rounded-none-force"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles size={12} className="text-brand" />
                        {plan.badge}
                      </motion.div>
                    )}

                    <h3 className="font-display font-black text-2xl mb-2 tracking-tight">
                      {plan.name}
                    </h3>
                    <p
                      className={cn(
                        "text-sm font-ui mb-6 h-10",
                        plan.highlighted
                          ? "text-brand-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </p>

                    <div className="flex items-end gap-1">
                      <span className="font-display text-5xl font-black tabular-nums tracking-tighter">
                        ${plan.price}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-ui font-medium mb-1.5",
                          plan.highlighted
                            ? "text-brand-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 p-8 flex flex-col bg-card">
                    <ul className="space-y-4 flex-1 mb-10">
                      {plan.features.map((f, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-4 group/item"
                        >
                          <div
                            className={cn(
                              "w-5 h-5 mt-0.5 border flex items-center justify-center flex-shrink-0 rounded-none-force transition-colors",
                              plan.highlighted
                                ? "bg-brand/10 border-brand/40 group-hover/item:bg-brand group-hover/item:border-brand"
                                : "bg-muted border-border group-hover/item:bg-foreground group-hover/item:border-foreground",
                            )}
                          >
                            <Check
                              size={12}
                              className={cn(
                                "transition-colors",
                                plan.highlighted
                                  ? "text-brand group-hover/item:text-brand-foreground"
                                  : "text-muted-foreground group-hover/item:text-background",
                              )}
                            />
                          </div>
                          <span className="text-foreground/80 font-ui text-sm font-medium group-hover/item:text-foreground transition-colors">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      to="/register"
                      className={cn(
                        "group/btn w-full flex items-center justify-center gap-2 py-4 font-ui font-bold text-sm transition-all rounded-none-force relative overflow-hidden",
                        plan.highlighted
                          ? "bg-brand text-brand-foreground hover:opacity-90 shadow-brand-sm"
                          : "bg-transparent border border-border text-foreground hover:bg-accent",
                      )}
                    >
                      {/* Animated button gradient sweep for highlighted plan */}
                      {plan.highlighted && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      )}

                      <span className="relative z-10">
                        {plan.name === "Enterprise"
                          ? "Contact Sales"
                          : "Get Started"}
                      </span>
                      <ArrowRight
                        size={14}
                        className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default PricingSection;
