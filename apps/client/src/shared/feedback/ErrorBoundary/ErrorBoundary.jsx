import {
  isRouteErrorResponse,
  useRouteError,
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, ServerCrash } from "lucide-react";
import { Logo } from "@/components/Logo";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Router Error:", error);

  // Extract error details safely
  const isRouteError = isRouteErrorResponse(error);
  const statusCode = isRouteError ? error.status : "500";
  const errorMessage = isRouteError
    ? error.statusText || error.data?.message || "Routing Error Occurred"
    : error.message || "Internal Server Error";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden p-5">
      {/* Platform Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none animate-grain" />

      {/* Ambient Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center mb-4"
        >
          <h1 className="font-display text-8xl md:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/20 select-none">
            {statusCode}
          </h1>
          {!isRouteError && (
            <ServerCrash size={64} className="absolute text-brand opacity-80" />
          )}
        </motion.div>

        <motion.div
          className="w-16 h-1 bg-brand mb-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.h2
          className="text-xl md:text-2xl font-display font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isRouteError ? "Connection Refused" : "Fatal Exception"}
        </motion.h2>

        <motion.p
          className="text-sm md:text-base text-muted-foreground font-ui mb-10 leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {errorMessage}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-ui font-bold text-sm hover:bg-accent transition-all rounded-none-force glass"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Previous View
          </button>

          <Link
            to="/"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:opacity-90 transition-all shadow-brand-sm rounded-none-force"
          >
            <Home size={16} />
            System Core
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
