import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility based on previous interactions

// Simple FadeUp animation wrapper if not already imported globally
const FadeUp = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Memoized decorative rings to prevent re-renders on input change
const DecorativeRings = memo(() => {
  const rings = [120, 200, 280];
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
      {rings.map((r, i) => (
        <div
          key={r}
          className="absolute border border-brand/10 dark:border-brand/5 animate-spin-slow"
          style={{
            width: r * 2,
            height: r * 2,
            left: -r,
            top: -r,
            borderRadius: "50%",
            animationDuration: `${30 + i * 10}s`,
            animationDirection: i % 2 === 0 ? "normal" : "reverse",
          }}
        />
      ))}
    </div>
  );
});
DecorativeRings.displayName = "DecorativeRings";

// Memoized Top Wave SVG
const TopWave = memo(() => (
  <svg
    className="absolute top-0 left-0 right-0 w-full text-card/50 dark:text-muted/10"
    viewBox="0 0 1440 48"
    preserveAspectRatio="none"
    fill="currentColor"
  >
    <path d="M0,0 C360,48 1080,0 1440,48 L1440,0 Z" />
  </svg>
));
TopWave.displayName = "TopWave";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  // status can be: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    // ----------------------------------------------------------------
    // BACKEND INTEGRATION
    // ----------------------------------------------------------------
    // Replace the setTimeout block below with your actual API call.
    //
    // Example using fetch:
    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setStatus('success');
    //     setEmail(''); // Optional: clear input
    //   } else {
    //     throw new Error(data.message || 'Something went wrong');
    //   }
    // } catch (err) {
    //   setStatus('error');
    //   setErrorMessage(err.message);
    // }
    // ----------------------------------------------------------------

    // Simulate API Call (Delete this block when integrating real backend)
    setTimeout(() => {
      // Simulate validation error scenario
      if (email.includes("fail")) {
        setStatus("error");
        setErrorMessage("This email address is already subscribed or invalid.");
      } else {
        // Simulation success
        setStatus("success");
        // Keep email visible in success state or clear it based on UX preference
      }
    }, 2000); // 2-second delay to show animation
  };

  const isSending = status === "sending";

  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border select-none">
      <TopWave />

      {/* Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <DecorativeRings />

        <FadeUp className="relative z-10 flex flex-col items-center">
          {/* Icon Header */}
          <div className="inline-flex items-center justify-center w-16 h-16 border border-border bg-card shadow-sm mb-10 rounded-none-force relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-brand/10 transition-transform duration-500 group-hover:scale-110"
              animate={isSending ? { y: ["0%", "100%", "0%"] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <Mail size={24} className="text-brand relative z-10" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-6 leading-[0.95] tracking-tight">
            Stay ahead of <br /> the{" "}
            <span className="text-brand drop-shadow-sm">industry.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-12 max-w-md mx-auto leading-relaxed font-ui font-medium">
            Restaurant tech trends, product updates, and operator insights —
            delivered to your inbox every fortnight.
          </p>

          <div className="w-full max-w-md mx-auto min-h-[80px]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                // SUCCESS STATE
                <motion.div
                  key="success"
                  className="flex items-center justify-center gap-3 py-5 px-6 border border-emerald-500/30 bg-emerald-500/5 rounded-none-force shadow-emerald-sm"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                >
                  <Check size={18} className="text-emerald-500 flex-shrink-0" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-ui font-bold text-sm tracking-tight">
                    You're on the list, {email}. Welcome aboard.
                  </span>
                </motion.div>
              ) : (
                // FORM STATE (idle, sending, error)
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form
                    className="flex flex-col sm:flex-row gap-3"
                    onSubmit={handleSubscribe}
                  >
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSending}
                        className={cn(
                          "w-full px-5 py-4 bg-card border border-border text-foreground placeholder:text-muted-foreground font-ui text-sm focus:outline-none transition-colors rounded-none-force shadow-sm",
                          "focus:border-brand/50 focus:ring-1 focus:ring-brand/20",
                          isSending && "opacity-70 cursor-not-allowed",
                          status === "error" &&
                            "border-red-500 focus:border-red-500 focus:ring-red-200",
                        )}
                      />
                      {status === "error" && (
                        <AlertTriangle
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
                        />
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className={cn(
                        "flex items-center justify-center gap-2.5 px-8 py-4 font-ui font-bold text-sm transition-all shadow-brand-sm flex-shrink-0 rounded-none-force relative overflow-hidden group",
                        "bg-brand text-brand-foreground hover:opacity-90",
                        isSending && "cursor-not-allowed bg-brand/80",
                      )}
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send
                            size={14}
                            className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Error Message Display */}
                  <AnimatePresence>
                    {status === "error" && errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-xs mt-3 font-ui font-medium text-left px-1"
                      >
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-muted-foreground text-xs mt-8 font-ui font-medium">
            No spam. Unsubscribe any time. Read our{" "}
            <a
              href="#"
              className="text-brand hover:text-brand/80 font-bold transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

export default NewsletterSection;
