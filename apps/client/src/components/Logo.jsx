import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';



const sizes = {
  sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
  md: { icon: 36, text: 'text-2xl', gap: 'gap-2.5' },
  lg: { icon: 48, text: 'text-3xl', gap: 'gap-3' },
  xl: { icon: 64, text: 'text-4xl', gap: 'gap-4' },
};

export function Logo({ variant = 'full', size = 'md', theme = 'auto', className, animated = false }) {
  const s = sizes[size];
  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  const iconColor = isDark ? '#FFFFFF' : isLight ? '#C2440A' : 'currentColor';
  const textColor = isDark ? 'text-white' : isLight ? 'text-brand-orange' : 'text-foreground';
  const subColor = isDark ? 'text-white/60' : isLight ? 'text-brand-orange/60' : 'text-muted-foreground';

  const IconSVG = (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8571A" />
          <stop offset="100%" stopColor="#9A3508" />
        </linearGradient>
        <linearGradient id="logo-qr" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E6B2" />
          <stop offset="100%" stopColor="#C9A830" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="24" cy="24" r="23" fill="url(#logo-grad)" />

      {/* Fork & spoon silhouette */}
      <path
        d="M17 10C17 10 15 14 15 17C15 19.5 16.5 21.5 18.5 22L17.5 38H20.5L19.5 22C21.5 21.5 23 19.5 23 17C23 14 21 10 21 10M17 16H23M17 13H23"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M29 10V18C29 19.7 30.3 21 32 21L31 38H34L33 21C34.7 21 36 19.7 36 18V10"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M32.5 10V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* QR corner dots */}
      <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.25" />
      <rect x="35" y="8" width="5" height="5" rx="1" fill="white" opacity="0.25" />
      <rect x="8" y="35" width="5" height="5" rx="1" fill="white" opacity="0.25" />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <motion.div
        className={cn('flex-shrink-0', className)}
        whileHover={animated ? { scale: 1.05, rotate: 2 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {IconSVG}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn('flex items-center', s.gap, className)}
      whileHover={animated ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex-shrink-0">{IconSVG}</div>
      {variant !== 'wordmark' && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-display font-bold tracking-tight', s.text, textColor)}>
            Scan<span className="text-brand-orange">&</span>Dine
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className={cn('text-xs font-ui tracking-widest uppercase mt-0.5', subColor)}>
              QR Restaurant Platform
            </span>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
