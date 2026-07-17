import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PageLoader = ({ className, text = "Loading..." }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[50vh] w-full bg-transparent relative overflow-hidden text-foreground",
        className,
      )}
    >
      {/* Subtle Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      {/* Ambient Brand Glow */}
      <motion.div
        className="absolute w-40 h-40 bg-brand/10 blur-3xl rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-6 relative z-10"
      >
        {/* Sharp Geometrical Loader (Replaces rounded spinners) */}
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Outer Rotating Square */}
          <motion.div
            className="absolute inset-0 border border-brand/40 bg-brand/5 rounded-none-force"
            animate={{ rotate: 180 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Inner Counter-Rotating Square */}
          <motion.div
            className="absolute w-4 h-4 bg-brand rounded-none-force"
            animate={{ rotate: -180, scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Status Text */}
        <p className="text-[10px] sm:text-xs font-ui font-bold tracking-[0.25em] uppercase text-muted-foreground animate-pulse">
          {text}
        </p>
      </motion.div>
    </div>
  );
};
