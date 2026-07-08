import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const counterRef = useRef(null);
  const barRef     = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      },
    });

    // Count up 0 → 100
    tl.to(counterRef.current, {
      innerText: 100,
      duration:  2,
      ease:      'power2.inOut',
      snap:      { innerText: 1 },
    });

    // Progress bar
    tl.to(barRef.current, {
      width:    '100%',
      duration: 2,
      ease:     'power2.inOut',
    }, '<');

    // Exit slide up
    tl.to('.preloader-wrap', {
      y:        '-100%',
      duration: 0.7,
      ease:     'power4.inOut',
    }, '+=0.2');
  }, []);

  return (
    <div
      className="preloader-wrap fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark"
      style={{ fontFamily: '"Clash Display", sans-serif' }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <span className="text-5xl font-black text-white tracking-tight">
          Scan <span className="text-primary">&amp;</span> Dine
        </span>
        <p className="mt-2 text-text-secondary text-sm tracking-widest uppercase">
          Setting up your experience
        </p>
      </motion.div>

      {/* Counter */}
      <div className="relative mb-6">
        <span
          ref={counterRef}
          className="text-7xl font-black text-white tabular-nums"
        >
          0
        </span>
        <span className="text-3xl font-black text-primary ml-1">%</span>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-0.5 bg-surface-overlay rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #FF6B35, #FFB627)',
          }}
        />
      </div>

      {/* Floating food emoji */}
      {['🍕', '🍔', '🍛', '🍜', '☕'].map((emoji, i) => (
        <motion.div
          key={emoji}
          className="absolute text-3xl pointer-events-none select-none"
          style={{
            top:  `${15 + i * 15}%`,
            left: i % 2 === 0 ? `${8 + i * 4}%` : undefined,
            right: i % 2 !== 0 ? `${6 + i * 3}%` : undefined,
            opacity: 0.12,
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}