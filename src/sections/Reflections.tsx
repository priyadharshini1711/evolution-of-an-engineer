import { motion } from 'motion/react';
import { RevealText } from '../animations/RevealText';
import { Reveal } from '../animations/Reveal';
import { ease, inViewOnce } from '../animations/variants';
import { SectionHeader } from '../components/SectionHeader';
import { SourceNote, StatusBadge } from '../components/ReviewInfo';
import { visibleReflections } from '../data/content';

export default function Reflections() {
  if (visibleReflections.length === 0) return null;

  return (
    <section id="reflections" aria-labelledby="reflections-title" className="section">
      <SectionHeader index="07" eyebrow="Engineering reflections" id="reflections-title" title="What Changed Wasn't Just My Tech Stack." />

      <ol className="space-y-24 md:space-y-32">
        {visibleReflections.map((r, i) => (
          <li key={r.id} className="grid gap-6 md:grid-cols-[120px_1fr] md:gap-10">
            <div className="flex items-start gap-4 md:block">
              <span className="font-mono text-sm tabular-nums text-fg-faint">{String(i + 1).padStart(2, '0')}</span>
              <motion.span
                aria-hidden="true"
                className="mt-2.5 block h-px w-16 origin-left bg-gradient-to-r from-signal-cyan to-signal-violet md:mt-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 1, ease }}
              />
            </div>
            <div>
              <Reveal>
                <p className="eyebrow">
                  {r.theme}
                  <StatusBadge status={r.status} />
                </p>
              </Reveal>
              <p className="mt-5 max-w-4xl font-display text-3xl leading-[1.15] text-fg sm:text-4xl md:text-5xl">
                <RevealText text={r.statement} />
              </p>
              <Reveal delay={0.3}>
                <p className="mt-6 font-mono text-xs leading-relaxed text-fg-muted">{r.support}</p>
                <SourceNote sources={r.sources} />
              </Reveal>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
