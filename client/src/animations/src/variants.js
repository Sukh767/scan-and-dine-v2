export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.3 } },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const slideInRight = {
  initial: { opacity: 0, x: 80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, x: 80, transition: { duration: 0.3 } },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const drawerSlideIn = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

export const modalScaleIn = {
  initial: { opacity: 0, scale: 0.88, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.2 } },
};

// Viewport trigger variant — use with whileInView
export const revealOnScroll = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

// Text character split animation (use with TextReveal component)
export const charReveal = {
  initial: { y: "110%", opacity: 0 },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
