import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion";

const faqs = [
  {
    q: "How long does onboarding take?",
    a: "Most restaurants are fully live within 24 hours. Our guided setup wizard walks you through every step from menu upload to QR generation.",
  },
  {
    q: "Do customers need to download an app?",
    a: "No. The entire experience runs in the mobile browser. Scan, browse, order, and pay — zero downloads required.",
  },
  {
    q: "Can I use my existing POS system?",
    a: "We offer direct integrations with major POS providers and a flexible API for custom setups.",
  },
  {
    q: "What payment methods are supported?",
    a: "Card payments, UPI, digital wallets, and traditional cash — all managed through one consolidated system.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. AES-256 encryption, SOC 2 compliant infrastructure, PCI DSS for payments, and regular third-party audits.",
  },
  {
    q: "What happens when a customer scans the QR?",
    a: "The frontend resolves the QR token, detects any existing session for that table, and either resumes it or creates a new one — all in under a second.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-32 bg-background relative overflow-hidden border-t border-border select-none">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Perfectly Centered Header Stack */}
        <FadeUp className="text-center flex flex-col items-center mb-16">
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1 border border-border bg-card/50 backdrop-blur-sm text-brand font-ui text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-6 rounded-none-force shadow-sm">
            <MessageCircleQuestion size={13} className="text-brand" />
            FAQ
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[0.95] tracking-tight">
            Common <span className="text-brand">questions.</span>
          </h2>
        </FadeUp>

        {/* FAQ Accordion */}
        <div className="border border-border bg-card/30 backdrop-blur-md rounded-none-force shadow-sm">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div
                className={cn(
                  "border-b border-border transition-colors duration-300",
                  i === faqs.length - 1 && "border-b-0",
                  open === i && "bg-card/80",
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 sm:px-8 text-left hover:bg-accent/40 transition-colors group"
                >
                  <span
                    className={cn(
                      "font-ui font-bold text-sm sm:text-base pr-4 transition-colors duration-300",
                      open === i
                        ? "text-brand"
                        : "text-foreground group-hover:text-brand/80",
                    )}
                  >
                    {faq.q}
                  </span>

                  {/* Rotating Plus/X Icon */}
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center w-6 h-6 border transition-colors duration-300 rounded-none-force",
                      open === i
                        ? "border-brand text-brand bg-brand/10"
                        : "border-border text-muted-foreground group-hover:border-brand/40 group-hover:text-brand",
                    )}
                  >
                    <Plus size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2">
                        <div className="text-muted-foreground font-ui text-sm leading-relaxed border-l-2 border-brand/40 pl-4 py-1">
                          {faq.a}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
