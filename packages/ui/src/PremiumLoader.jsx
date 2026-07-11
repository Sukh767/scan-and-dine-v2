import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { QrCode, UtensilsCrossed } from "lucide-react";

export default function PremiumLoader({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => onComplete?.(), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-orange-500/5" />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                <QrCode className="w-10 h-10 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary"
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: [0, 0.5, 0], scale: [1.5, 2, 2.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-primary">Scan</span>
                <span className="text-foreground"> & Dine</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">The future of dining</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-48 h-0.5 bg-border rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
