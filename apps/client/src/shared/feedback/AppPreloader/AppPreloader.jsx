import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ScanQrCodeIcon } from "@animateicons/react/lucide";

export const AppPreloader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerStarted = useRef(false);

  useEffect(() => {
    // Prevents double-firing in React 18 Strict Mode
    if (timerStarted.current) return;
    timerStarted.current = true;

    // Wait for progress bar to finish (1.5s), then trigger exit
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    // onExitComplete ensures the app only loads AFTER the fade-out finishes
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden text-foreground"
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Base Textures from index.css */}
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-dots opacity-10 animate-grain pointer-events-none" />

          {/* Theme Responsive Glow */}
          <motion.div
            className="absolute w-96 h-96 bg-brand/10 blur-3xl rounded-full pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center gap-8 z-10">
            {/* Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="w-24 h-24 bg-card border border-border glass rounded-none-force flex items-center justify-center shadow-brand-sm relative z-10">
                <ScanQrCodeIcon
                  className="text-brand"
                  size={48}
                  // Using currentColor allows it to map to the text-brand Tailwind class
                  color="currentColor"
                />
              </div>

              {/* Expanding scan ring */}
              <motion.div
                className="absolute inset-0 border border-brand/50 rounded-none-force"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display text-4xl font-bold tracking-tight">
                <span className="text-brand">Scan</span> & Dine
              </h1>
              <p className="text-muted-foreground font-ui text-xs mt-3 font-semibold tracking-[0.2em] uppercase">
                Initializing Platform
              </p>
            </motion.div>

            {/* Sharp Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-56 h-1 bg-muted overflow-hidden rounded-none-force border border-border/50"
            >
              <motion.div
                className="h-full bg-brand"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
