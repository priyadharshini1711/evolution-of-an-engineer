import type { Variants } from 'motion/react';

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Shared `whileInView` settings: animate once, slightly before fully in view. */
export const inViewOnce = { once: true, margin: '0px 0px -15% 0px' } as const;
