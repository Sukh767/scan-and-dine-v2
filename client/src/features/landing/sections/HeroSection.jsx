import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChefHat, Clock } from 'lucide-react';
import gsap from 'gsap';
// import { staggerContainer, staggerItem } from '@scan-dine/animations';

// Floating stat card component
const FloatCard = ({ children, delay = 0, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bg-surface-raised/80 backdrop-blur-xl border border-surface-border rounded-2xl p-4 shadow-card"
    style={style}
    animate={{ y: [0, -8, 0] }}
    // Note: both animate props — first fires on mount, second loops
    // Use useAnimation for proper sequencing in production
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-16"
    >
      {/* Gradient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Next-Gen Restaurant Platform
          </span>
        </motion.div>

        {/* Heading */}
        <div className="text-center mb-8">
          <motion.h1
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {['Scan,', 'Order &', 'Enjoy.'].map((line, i) => (
              <motion.div
                key={line}
                className="overflow-hidden block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={i === 1 ? 'bg-gradient-primary bg-clip-text text-transparent' : ''}
                >
                  {line}
                </span>
              </motion.div>
            ))}
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-center text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          The smartest QR ordering platform for restaurants. One scan — full menu, live tracking, seamless payment.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/scan"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all shadow-glow-primary hover:shadow-[0_0_60px_rgba(255,107,53,0.4)] hover:-translate-y-0.5"
          >
            <span>Scan a Table Now</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-surface-border bg-surface-raised hover:border-primary/40 text-white font-bold text-base transition-all hover:-translate-y-0.5"
          >
            Browse Restaurants
          </Link>
        </motion.div>

        {/* Floating UI Cards */}
        <div className="relative mt-20 h-64 max-w-4xl mx-auto hidden lg:block">
          {/* Stat card: Orders */}
          <motion.div
            className="absolute left-0 top-0 bg-surface-raised/90 backdrop-blur-xl border border-surface-border rounded-2xl p-4 shadow-card"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ delay: 1, duration: 0.6, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <ChefHat size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-text-muted text-xs">Orders Today</p>
                <p className="text-white font-bold text-lg font-display">1,284</p>
              </div>
            </div>
          </motion.div>

          {/* Stat card: Rating */}
          <motion.div
            className="absolute right-0 top-4 bg-surface-raised/90 backdrop-blur-xl border border-surface-border rounded-2xl p-4 shadow-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ delay: 1.1, duration: 0.6, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                <Star size={20} className="text-secondary fill-current" />
              </div>
              <div>
                <p className="text-text-muted text-xs">Avg. Rating</p>
                <p className="text-white font-bold text-lg font-display">4.9 / 5.0</p>
              </div>
            </div>
          </motion.div>

          {/* Live order card (center) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-8 bg-surface-raised/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-card w-72"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ delay: 1.2, duration: 0.6, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-muted">Order #ORD-2847</span>
              <span className="px-2 py-0.5 rounded-full bg-warning/15 text-warning text-xs font-bold">Preparing</span>
            </div>
            <p className="text-white font-bold text-sm mb-2">Table 8 — 2 items</p>
            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-primary"
                initial={{ width: '30%' }}
                animate={{ width: '65%' }}
                transition={{ delay: 1.5, duration: 2 }}
              />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Clock size={12} className="text-text-muted" />
              <span className="text-text-muted text-xs">~8 min remaining</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}