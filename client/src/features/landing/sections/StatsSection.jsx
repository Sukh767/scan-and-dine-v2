import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const STATS = [
  { value: 500,  suffix: '+',  label: 'Restaurants',      description: 'Active on the platform' },
  { value: 2.4,  suffix: 'M+', label: 'Orders Processed', description: 'And growing daily'       },
  { value: 98,   suffix: '%',  label: 'Uptime',           description: 'Rock-solid reliability'  },
  { value: 4.9,  suffix: '/5', label: 'Rating',           description: 'Average customer score'  },
];

function StatItem({ stat, delay }) {
  const ref    = useRef(null);
  const numRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    gsap.fromTo(
      numRef.current,
      { innerText: 0 },
      {
        innerText: stat.value,
        duration:  2,
        delay,
        ease:      'power2.out',
        snap:      { innerText: stat.value < 10 ? 0.1 : 1 },
      }
    );
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="font-display font-black text-5xl md:text-6xl text-white mb-2">
        <span ref={numRef}>0</span>
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
      <div className="text-text-muted text-sm">{stat.description}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 border-y border-surface-border bg-surface-default relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}