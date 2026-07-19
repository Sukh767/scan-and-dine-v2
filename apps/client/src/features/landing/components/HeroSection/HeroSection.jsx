import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Animation Variants (GSAP Style Mask Reveal) ──────────────
const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { y: "110%", rotateY: 10, opacity: 0 },
  show: {
    y: "0%",
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // Classic GSAP CustomEase curve
    },
  },
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Media Assets ──────────────────────────────────────────────
const MEDIA = {
  image:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // Using a reliable placeholder video for demo purposes
  video: "https://www.pexels.com/download/video/14534903/",
};

export const HeroSection = () => {
  const [mediaType, setMediaType] = useState("image"); // 'image' | 'video'

  return (
    <section className="relative h-screen w-full flex flex-col justify-end pb-12 sm:pb-24 px-5 sm:px-12 overflow-hidden bg-black text-white select-none">
      {/* ─── Background Media Layer ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {mediaType === "image" ? (
            <motion.img
              key="image-bg"
              src={MEDIA.image}
              alt="Restaurant Interior"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ) : (
            <motion.video
              key="video-bg"
              src={MEDIA.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Clean, minimalist dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* ─── Main Content (GSAP Style Reveal) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col mb-8"
        >
          {/* Line 1 */}
          <div className="overflow-hidden pb-2 -mb-2">
            <motion.h1
              variants={textVariants}
              className="font-display font-black text-[12vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter uppercase text-white"
            >
              Orchestrate
            </motion.h1>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden pb-2 -mb-2">
            <motion.h1
              variants={textVariants}
              className="font-display font-black text-[12vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
            >
              The Perfect
            </motion.h1>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden pb-2 -mb-2">
            <motion.h1
              variants={textVariants}
              className="font-display font-black text-[12vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter uppercase text-brand flex items-end gap-4"
            >
              Service
              <span className="text-brand text-[6vw] md:text-[4rem] lg:text-[5rem] leading-[0.85]">
                .
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* ─── Description & CTA ─── */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full max-w-3xl"
        >
          <p className="text-white/70 font-ui text-sm md:text-base leading-relaxed max-w-sm font-medium">
            Transform operational velocity with direct guest control. Deploy
            seamless scan-to-order sessions synced with your kitchen.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand text-brand-foreground font-ui font-bold text-sm hover:bg-brand/90 transition-all rounded-none-force overflow-hidden relative"
            >
              <span className="relative z-10">Start Free</span>
              <ArrowRight
                size={15}
                className="relative z-10 group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <button className="group flex items-center justify-center w-14 h-14 border border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/10 transition-colors rounded-none-force">
              <Play
                size={16}
                className="text-white fill-white group-hover:scale-110 transition-transform ml-1"
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ─── Elegant Media Switch Toggle (Bottom Right) ─── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 z-20 flex items-center p-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-none-force"
      >
        <button
          onClick={() => setMediaType("image")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider transition-all rounded-none-force",
            mediaType === "image"
              ? "bg-white text-black"
              : "text-white/50 hover:text-white",
          )}
        >
          <ImageIcon size={14} />
        </button>
        <button
          onClick={() => setMediaType("video")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider transition-all rounded-none-force",
            mediaType === "video"
              ? "bg-white text-black"
              : "text-white/50 hover:text-white",
          )}
        >
          <VideoIcon size={14} />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
