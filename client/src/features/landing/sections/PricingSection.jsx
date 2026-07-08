import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { revealOnScroll, staggerContainer, staggerItem } from '@scan-dine/animations';

const PLANS = [
  {
    name:     'Free',
    price:    0,
    period:   'forever',
    badge:    null,
    features: [
      '1 restaurant',
      'Up to 10 tables',
      'QR ordering',
      'Basic analytics',
      'Email support',
    ],
    cta:      'Start Free',
    href:     '/register',
    variant:  'outline',
  },
  {
    name:     'Pro',
    price:    1999,
    period:   '/month',
    badge:    'Most Popular',
    features: [
      'Unlimited tables',
      'Advanced analytics',
      'Reservation system',
      'Offer management',
      'Priority support',
      'Custom branding',
      'Staff accounts',
    ],
    cta:      'Start 14-day Trial',
    href:     '/register?plan=pro',
    variant:  'primary',
  },
  {
    name:     'Enterprise',
    price:    null,
    period:   'custom',
    badge:    null,
    features: [
      'Multiple branches',
      'White-label option',
      'API access',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
      'On-boarding training',
    ],
    cta:      'Contact Sales',
    href:     '/contact',
    variant:  'outline',
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-surface-default relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div {...revealOnScroll} className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto">
            Start free. Scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.variant === 'primary'
                  ? 'bg-gradient-to-b from-primary/20 to-surface-raised border-2 border-primary/40 shadow-glow-primary'
                  : 'bg-surface-raised border border-surface-border'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-black">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-white font-black text-xl mb-4">{plan.name}</h3>
                {plan.price !== null ? (
                  <div className="flex items-end gap-1">
                    <span className="text-white font-black text-5xl font-display">₹{plan.price.toLocaleString()}</span>
                    <span className="text-text-muted text-sm mb-2">{plan.period}</span>
                  </div>
                ) : (
                  <div className="text-white font-black text-3xl font-display">Custom</div>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-success shrink-0" />
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.href}
                className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  plan.variant === 'primary'
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-glow-primary'
                    : 'border border-surface-border text-white hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}