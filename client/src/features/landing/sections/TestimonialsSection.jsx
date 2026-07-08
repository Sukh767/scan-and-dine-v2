import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
// import { revealOnScroll } from '@scan-dine/animations';

const TESTIMONIALS = [
  {
    name:    'Arjun Mehta',
    role:    'Owner — Spice Garden, Hyderabad',
    avatar:  '🧑‍🍳',
    rating:  5,
    quote:   "Scan & Dine reduced our wait times by 40%. The dining session concept is genius — one QR, one bill, zero confusion.",
  },
  {
    name:    'Priya Nair',
    role:    'Restaurant Manager, Bangalore',
    avatar:  '👩‍💼',
    rating:  5,
    quote:   "Our orders per table went up 22% in the first month. Customers love reordering without flagging down a waiter.",
  },
  {
    name:    'Rohan Das',
    role:    'Customer, Mumbai',
    avatar:  '🧑‍💻',
    rating:  5,
    quote:   "I scanned, browsed the full menu, ordered, tracked my food, and paid — all from my phone. Never going back to paper menus.",
  },
  {
    name:    'Sunita Rao',
    role:    'F&B Director, Chennai',
    avatar:  '👩‍🍳',
    rating:  5,
    quote:   "The analytics dashboard alone is worth it. I know exactly which dishes are killing it and which to drop.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div {...revealOnScroll} className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            Loved by restaurateurs
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">and diners alike.</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                active === i
                  ? 'bg-surface-raised border-primary/30 shadow-glow-primary'
                  : 'bg-surface-raised border-surface-border hover:border-surface-overlay'
              }`}
              onClick={() => setActive(i)}
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} size={14} className="text-secondary fill-current" />
                ))}
              </div>
              <blockquote className="text-text-secondary text-base leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-overlay flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-text-muted text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}