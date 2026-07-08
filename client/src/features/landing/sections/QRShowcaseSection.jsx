import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
// import { revealOnScroll } from '@scan-dine/animations';

const STEPS = [
  { num: '01', title: 'Scan the QR',   desc: 'Walk in, scan the table QR with your phone camera. No app needed.' },
  { num: '02', title: 'Browse & Order', desc: 'Full menu with photos, filters, add-ons. Add items to cart instantly.' },
  { num: '03', title: 'Reorder freely', desc: 'One dining session — order as many rounds as you want.' },
  { num: '04', title: 'Pay & Go',      desc: 'One final bill. Pay online or tell the waiter. Done.' },
];

export default function QRShowcaseSection() {
  return (
    <section className="py-24 bg-surface-default relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <motion.div {...revealOnScroll}>
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              From scan to payment
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">in under 60 seconds.</span>
            </h2>
            <p className="text-text-secondary text-lg mb-10">
              The Dining Session is our core innovation. One QR scan opens a session that tracks every order, computes the bill, and closes when payment is done.
            </p>

            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                    <span className="text-primary text-xs font-black">{step.num}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Phone mockup */}
            <div className="relative w-72">
              <div className="relative bg-surface-raised border border-surface-border rounded-[40px] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="bg-dark rounded-[32px] overflow-hidden h-[600px]">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-white text-xs font-medium">9:41</span>
                    <div className="w-24 h-5 rounded-full bg-dark absolute top-4 left-1/2 -translate-x-1/2" />
                    <div className="flex gap-1">
                      {[3, 4, 5].map((b) => (
                        <div key={b} className="w-1 rounded-sm bg-white" style={{ height: b * 2 + 4 }} />
                      ))}
                    </div>
                  </div>

                  {/* App content mock */}
                  <div className="px-4 py-2">
                    {/* Restaurant header */}
                    <div className="bg-surface-overlay rounded-2xl p-4 mb-3">
                      <p className="text-text-muted text-xs mb-1">TABLE 8 — SPICE GARDEN</p>
                      <p className="text-white font-bold">Active Session</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-success text-xs">Open</span>
                      </div>
                    </div>

                    {/* Menu items */}
                    {[
                      { name: 'Butter Chicken', price: '₹380', emoji: '🍛', added: true },
                      { name: 'Garlic Naan', price: '₹60', emoji: '🫓', added: false },
                      { name: 'Mango Lassi', price: '₹120', emoji: '🥛', added: true },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-3 border-b border-surface-border">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="text-white text-sm font-medium">{item.name}</p>
                            <p className="text-text-muted text-xs">{item.price}</p>
                          </div>
                        </div>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.added ? 'bg-primary' : 'border border-surface-border'}`}>
                          {item.added ? (
                            <Check size={14} className="text-white" />
                          ) : (
                            <span className="text-white text-lg font-light">+</span>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Cart bar */}
                    <div className="mt-4 bg-primary rounded-xl px-4 py-3 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">2 items added</span>
                      <span className="text-white text-sm">₹500 →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-primary rounded-full scale-75 translate-y-8" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}