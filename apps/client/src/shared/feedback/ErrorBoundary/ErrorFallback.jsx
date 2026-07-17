import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden p-5">
      {/* Platform Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Red Glow for Error State */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full bg-card/60 backdrop-blur-xl border border-border p-10 rounded-none-force shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 rounded-none-force">
          <AlertTriangle size={32} className="text-red-500" />
        </div>

        <h1 className="font-display text-2xl font-bold text-foreground mb-3">
          System Interruption
        </h1>

        <p className="text-sm text-muted-foreground font-ui leading-relaxed mb-6">
          {error?.message ||
            "An unexpected application error has occurred. Our systems have logged the issue."}
        </p>

        <button
          onClick={resetErrorBoundary || (() => window.location.reload())}
          className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm rounded-none-force"
        >
          <RefreshCcw
            size={16}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
          Reload Interface
        </button>
      </motion.div>
    </div>
  );
};
