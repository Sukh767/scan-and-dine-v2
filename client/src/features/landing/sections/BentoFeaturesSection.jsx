import { motion } from 'framer-motion';
import { QrCode, Zap, BarChart3, Shield, Smartphone, Globe } from 'lucide-react';
// import { revealOnScroll, staggerContainer, staggerItem } from '@scan-dine/animations';

const FEATURES = [
  {
    icon: QrCode,
    title: 'Instant QR Ordering',
    description: 'Customers scan once, order multiple times, pay once. Zero app download required.',
    span: 'col-span-2 row-span-1',
    accent: 'primary',
    large: true,
  },
  {
    icon: Zap,
    title: 'Real-Time Kitchen',
    description: 'Live order updates via WebSocket. Kitchen sees orders instantly.',
    span: 'col-span-1 row-span-1',
    accent: 'secondary',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Revenue, top items, peak hours — all in one place.',
    span: 'col-span-1 row-span-2',
    accent: 'accent',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Designed for every device. Buttery smooth on any screen.',
    span: 'col-span-1 row-span-1',
    accent: 'primary',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Online, cash, or card — every method, fully tracked.',
    span: 'col-span-1 row-span-1',
    accent: 'secondary',
  },
  {
    icon: Globe,
    title: 'Multi-Restaurant SaaS',
    description: 'Manage multiple branches from one platform admin panel.',
    span: 'col-span-2 row-span-1',
    accent: 'accent',
    large: true,
  },
];

const ACCENT_CLASSES = {
  primary:   { bg: 'bg-primary/10',   icon: 'text-primary',   border: 'border-primary/20'   },
  secondary: { bg: 'bg-secondary/10', icon: 'text-secondary', border: 'border-secondary/20' },
  accent:    { bg: 'bg-accent/10',    icon: 'text-accent',    border: 'border-accent/20'    },
};

export default function BentoFeaturesSection() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div {...revealOnScroll} className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
            Features
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Everything you need,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">nothing you don't.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            A complete ordering ecosystem built for restaurants that mean business.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]"
        >
          {FEATURES.map((feature, i) => {
            const Icon    = feature.icon;
            const classes = ACCENT_CLASSES[feature.accent];
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className={`group relative rounded-2xl bg-surface-raised border border-surface-border hover:border-current/30 p-6 overflow-hidden transition-all duration-300 hover:shadow-card-hover cursor-default ${feature.span} ${classes.border} hover:border-opacity-50`}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${classes.bg}`} />

                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-xl ${classes.bg} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={classes.icon} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`font-display font-bold text-white mb-2 ${feature.large ? 'text-2xl' : 'text-xl'}`}>
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Large card extra visual */}
                {feature.large && (
                  <div className={`absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl ${classes.bg} flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity`}>
                    <Icon size={32} className={classes.icon} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}