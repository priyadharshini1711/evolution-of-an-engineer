import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from '../animations/Reveal';
import { ease } from '../animations/variants';
import { SectionHeader } from '../components/SectionHeader';
import { SourceNote, StatusBadge } from '../components/ReviewInfo';
import { isVisible } from '../data/content';
import { comparisons } from '../data/reflections';
import type { Comparison, ComparisonSide } from '../data/types';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Side({ side, heading, tone, showThinking, status }: { side: ComparisonSide; heading: string; tone: 'earlier' | 'now'; showThinking: boolean; status: Comparison['status'] }) {
  const colour = tone === 'earlier' ? 'var(--cyan)' : 'var(--violet)';
  return (
    <div className="w-[min(26rem,78vw)] p-6 sm:p-8">
      <p className="eyebrow" style={{ color: colour }}>
        {side.year}
      </p>
      <h3 className="mt-2 font-display text-2xl text-fg sm:text-3xl">{heading}</h3>
      <p className="mt-5 text-[15px] leading-relaxed text-fg/80">{side.evidence}</p>
      {showThinking && (
        <p className="mt-6 border-l pl-4 font-display text-xl italic leading-snug text-fg/95" style={{ borderColor: colour }}>
          “{side.thinking}”
          <StatusBadge status={status} />
        </p>
      )}
      <SourceNote sources={side.sources} />
    </div>
  );
}

export default function ThenVsNow() {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const isWide = useMediaQuery('(min-width: 768px)');
  const c = comparisons[index];
  const showThinking = isVisible(c.status);

  return (
    <section id="mindset" aria-labelledby="mindset-title" className="section">
      <SectionHeader
        index="03"
        eyebrow="Then vs now"
        id="mindset-title"
        title="Same Engineer. Different Thinking."
        intro="Pairs of documented work from early and late in the journey, on the same topic. Drag the divider to move between the two perspectives."
      />

      <Reveal>
        <div role="tablist" aria-label="Comparison topics" className="mb-8 flex flex-wrap gap-2">
          {comparisons.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={i === index}
              aria-controls="mindset-panel"
              onClick={() => setIndex(i)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${i === index ? 'border-signal-cyan/60 bg-signal-cyan/10 text-fg' : 'border-white/10 text-fg-muted hover:text-fg'}`}
            >
              {item.topic}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div id="mindset-panel" role="tabpanel" aria-labelledby={`tab-${c.id}`} className="glass relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              {isWide ? (
                <div className="relative flex min-h-[22rem]">
                  <div
                    className="overflow-hidden bg-signal-cyan/[0.025] transition-opacity"
                    style={{ flexBasis: `${100 - split}%`, opacity: 0.35 + ((100 - split) / 100) * 0.9 }}
                  >
                    <Side side={c.earlier} heading="Earlier in My Journey" tone="earlier" showThinking={showThinking} status={c.status} />
                  </div>
                  <div
                    className="flex justify-end overflow-hidden bg-signal-violet/[0.035] transition-opacity"
                    style={{ flexBasis: `${split}%`, opacity: 0.35 + (split / 100) * 0.9 }}
                  >
                    <Side side={c.now} heading="How I Approach It Today" tone="now" showThinking={showThinking} status={c.status} />
                  </div>
                  {/* Divider */}
                  <div className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-signal-cyan via-white/40 to-signal-violet" style={{ left: `${100 - split}%` }} aria-hidden="true">
                    <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink-900 font-mono text-[10px] text-fg-muted">
                      ⇆
                    </span>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  <Side side={c.earlier} heading="Earlier in My Journey" tone="earlier" showThinking={showThinking} status={c.status} />
                  <Side side={c.now} heading="How I Approach It Today" tone="now" showThinking={showThinking} status={c.status} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      {isWide && (
        <div className="mt-6 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-cyan">Earlier</span>
          <input
            type="range"
            min={8}
            max={92}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Move between the earlier and current perspective"
            aria-valuetext={split < 40 ? 'Earlier perspective' : split > 60 ? 'Current perspective' : 'Both perspectives'}
            className="h-1 flex-1 cursor-ew-resize appearance-none rounded-full bg-gradient-to-r from-signal-cyan/50 to-signal-violet/50 accent-white"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal-violet">Today</span>
        </div>
      )}
    </section>
  );
}
