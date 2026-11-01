import { motion } from 'motion/react';
import { ease, inViewOnce } from './variants';

interface RevealTextProps {
  text: string;
  className?: string;
  /** Delay before the first word, in seconds. */
  delay?: number;
  /** Animate on mount instead of on scroll. */
  immediate?: boolean;
}

/**
 * Word-by-word reveal. Each word rises out of a clipped line box.
 * The full text stays available to screen readers as one string.
 */
export function RevealText({ text, className, delay = 0, immediate = false }: RevealTextProps) {
  const words = text.split(' ');
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: inViewOnce };

  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      {...trigger}
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
