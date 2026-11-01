import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Github, Globe, Linkedin } from 'lucide-react';
import { RevealText } from '../animations/RevealText';
import { Reveal } from '../animations/Reveal';
import { ease, inViewOnce } from '../animations/variants';
import { GridBackground } from '../components/GridBackground';
import { siteConfig } from '../config';

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
/** Share of the width taken by 2019–2026; the rest is the undefined future. */
const KNOWN = 72;

const futureLine = {
  backgroundImage: 'linear-gradient(90deg, rgba(139,124,246,0.8) 0 6px, transparent 6px 12px)',
  backgroundSize: '12px 1px',
  maskImage: 'linear-gradient(90deg, #000, transparent)',
  WebkitMaskImage: 'linear-gradient(90deg, #000, transparent)',
};

function ExtendingLine() {
  return (
    <div className="relative mx-auto mt-20 h-16 w-full max-w-5xl" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-1/2 h-px origin-left bg-gradient-to-r from-signal-cyan/40 via-signal-cyan to-signal-violet"
        style={{ width: `${KNOWN}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 1.8, ease }}
      />
      {YEARS.map((y, i) => (
        <motion.div
          key={y}
          className="absolute top-1/2"
          style={{ left: `${(i / (YEARS.length - 1)) * KNOWN}%` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease }}
        >
          <span className="absolute left-0 top-0 block h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-fg-faint" />
          <span className="absolute left-0 top-3 hidden -translate-x-1/2 font-mono text-[10px] tabular-nums text-fg-faint sm:block">{y}</span>
        </motion.div>
      ))}
      <motion.span
        className="absolute top-1/2 -ml-[5px] -mt-[5px] block h-2.5 w-2.5 rounded-full bg-signal-violet shadow-[0_0_18px_var(--violet)]"
        style={{ left: `${KNOWN}%` }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 0.6, delay: 1.8, ease }}
      />
      {/* Beyond 2026: the line continues, unlabelled, and fades out. */}
      <motion.div
        className="absolute top-1/2 h-px origin-left"
        style={{ left: `${KNOWN}%`, width: '60%', ...futureLine }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 2.4, delay: 2, ease }}
      />
    </div>
  );
}

const linkDefs = [
  { key: 'github', label: 'GitHub', Icon: Github },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'hackerrank', label: 'HackerRank', Icon: Code2 },
  { key: 'portfolio', label: 'Portfolio', Icon: Globe },
] as const;

export default function Closing() {
  // Empty links are hidden in production and shown as reminders in development.
  const links = linkDefs.filter((l) => siteConfig.links[l.key] || siteConfig.showReviewInfo);

  return (
    <section id="closing" aria-labelledby="closing-title" className="relative overflow-hidden">
      <GridBackground />
      <div className="relative mx-auto max-w-6xl px-4 py-32 text-center sm:px-8 md:py-48">
        <h2 id="closing-title" className="font-display text-4xl leading-[1.08] text-fg sm:text-6xl md:text-7xl">
          <RevealText text="2019 was the beginning." />
          <br />
          <RevealText text="2026 isn’t the destination." delay={0.4} className="italic text-fg/80" />
        </h2>
        <Reveal delay={0.8}>
          <p className="mt-8 font-mono text-sm tracking-[0.12em] text-fg-muted">Still building. Still learning. Still evolving.</p>
        </Reveal>

        <ExtendingLine />

        <Reveal delay={0.4}>
          <ul className="mt-20 flex flex-wrap justify-center gap-3">
            {links.map(({ key, label, Icon }) => {
              const href = siteConfig.links[key];
              return (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-fg-muted transition-colors hover:border-signal-cyan/50 hover:text-fg"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-amber-400/30 px-5 py-2.5 font-mono text-xs text-amber-200/70">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}: add URL in src/config.ts
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      <footer className="relative border-t border-white/5 px-4 py-8 text-center font-mono text-[11px] text-fg-faint sm:px-8">
        © {new Date().getFullYear()} {siteConfig.author} · Built with React, TypeScript and Motion
      </footer>
    </section>
  );
}
