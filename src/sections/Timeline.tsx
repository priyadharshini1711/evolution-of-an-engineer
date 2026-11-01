import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useId, useMemo, useRef, useState } from 'react';
import { Motif } from '../components/Motif';
import { SectionHeader } from '../components/SectionHeader';
import { SourceNote, StatusBadge } from '../components/ReviewInfo';
import { ease, fadeUp, inViewOnce, stagger } from '../animations/variants';
import { accentColor, isVisible, orgLabel } from '../data/content';
import { milestones } from '../data/timeline';
import type { Milestone } from '../data/types';
import { useActiveId } from '../hooks/useActiveId';

const anchorId = (m: Milestone) => `m-${m.id}`;

function YearNav({ activeId }: { activeId: string | null }) {
  const reduceMotion = useReducedMotion();
  const activeIndex = milestones.findIndex((m) => anchorId(m) === activeId);

  return (
    <nav aria-label="Timeline years" className="sticky top-14 z-30 -mx-4 mb-12 border-y border-white/5 bg-ink-950/80 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <ol className="flex items-center justify-between gap-1 overflow-x-auto [scrollbar-width:none]">
        {milestones.map((m, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <li key={m.id} className="flex flex-1 items-center gap-1 last:flex-none">
              <a
                href={`#${anchorId(m)}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(anchorId(m))?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
                }}
                aria-current={isActive ? 'step' : undefined}
                className="shrink-0 rounded px-1.5 py-1 font-mono text-[11px] tabular-nums transition-colors duration-300 sm:text-xs"
                style={{ color: isActive ? accentColor(m.accent) : isPast ? 'rgba(230,237,243,0.7)' : 'rgba(139,152,169,0.55)' }}
              >
                {m.navLabel}
              </a>
              {i < milestones.length - 1 && (
                <span className="relative hidden h-px min-w-3 flex-1 bg-white/10 sm:block" aria-hidden="true">
                  <span
                    className="absolute inset-0 origin-left bg-gradient-to-r from-signal-cyan/70 to-signal-violet/70 transition-transform duration-700"
                    style={{ transform: `scaleX(${i < activeIndex ? 1 : 0})` }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="eyebrow mb-3">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
            <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MilestoneCard({ m, active, reached }: { m: Milestone; active: boolean; reached: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const color = accentColor(m.accent);
  const showReflection = m.reflection && isVisible(m.reflection.status);

  return (
    <motion.article
      id={anchorId(m)}
      aria-labelledby={`${anchorId(m)}-title`}
      className="relative grid scroll-mt-32 grid-cols-[32px_1fr] gap-x-4 md:grid-cols-[140px_32px_1fr] md:gap-x-6"
      style={{ ['--accent' as string]: color }}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {/* Year (desktop) */}
      <motion.div variants={fadeUp} className="hidden pt-6 text-right md:block">
        <span
          className="font-mono text-3xl tabular-nums transition-colors duration-700 lg:text-4xl"
          style={{ color: reached ? color : 'rgba(91,104,120,0.6)' }}
        >
          {m.year}
        </span>
      </motion.div>

      {/* Node on the spine */}
      <div className="relative flex justify-center pt-8" aria-hidden="true">
        <span
          className="relative z-10 block h-3.5 w-3.5 rounded-full border-2 transition-all duration-700"
          style={{
            borderColor: reached ? color : 'rgba(91,104,120,0.6)',
            background: active ? color : '#07090C',
            boxShadow: active ? `0 0 0 6px color-mix(in srgb, ${color} 18%, transparent), 0 0 24px ${color}` : 'none',
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        variants={fadeUp}
        className="glass relative mb-16 overflow-hidden rounded-2xl p-6 transition-[border-color] duration-700 sm:p-8 md:mb-24"
        style={{ borderColor: active ? `color-mix(in srgb, ${color} 35%, transparent)` : undefined }}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 transition-opacity duration-1000 sm:h-56 sm:w-56"
          style={{ color, opacity: active ? 0.22 : 0.08 }}
        >
          <Motif kind={m.motif} className="h-full w-full" />
        </div>

        <p className="font-mono text-xs tabular-nums md:hidden" style={{ color }}>
          {m.year}
        </p>
        <p className="eyebrow mt-1 md:mt-0">
          {m.period}
          {m.org && <> · {orgLabel(m.org)}</>}
        </p>
        <h3 id={`${anchorId(m)}-title`} className="mt-3 max-w-xl font-display text-3xl leading-tight text-fg sm:text-4xl">
          {m.phase}
          <StatusBadge status={m.status} />
        </h3>
        {m.roles && <p className="mt-2 text-sm text-fg-muted">{m.roles.join(' → ')}</p>}

        <ul className={`mt-6 flex flex-wrap gap-1.5 ${m.technologies.length === 0 ? 'hidden' : ''}`} aria-label="Technologies">
          {m.technologies.map((t, i) => (
            <motion.li
              key={t}
              className="tag"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease }}
            >
              {t}
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <List title="What I was building" items={m.building} />
          <List title="Technical challenges" items={m.challenges} />
        </div>

        {m.metrics && (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {m.metrics.map((x) => (
              <div key={x.label}>
                <dt className="sr-only">{x.label}</dt>
                <dd className="font-mono text-2xl tabular-nums" style={{ color }}>
                  {x.value}
                </dd>
                <dd className="text-xs text-fg-muted">{x.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg"
        >
          {open ? 'Hide' : 'Show'} technical details
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-8 border-t border-white/5 pt-6">
                <List title="More detail" items={m.details} />
                {showReflection && m.reflection && (
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="eyebrow mb-3">
                        What I learned <StatusBadge status={m.reflection.status} />
                      </h4>
                      {m.reflection.learned.map((l) => (
                        <p key={l} className="text-[15px] leading-relaxed text-fg/85">
                          {l}
                        </p>
                      ))}
                    </div>
                    <div>
                      <h4 className="eyebrow mb-3">
                        How my thinking evolved <StatusBadge status={m.reflection.status} />
                      </h4>
                      <p className="font-display text-xl italic leading-snug text-fg/90">“{m.reflection.thinking}”</p>
                    </div>
                  </div>
                )}
                <SourceNote sources={m.sources} note={m.reviewNote} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}

export function Timeline() {
  const ids = useMemo(() => milestones.map(anchorId), []);
  const activeId = useActiveId(ids);
  const activeIndex = milestones.findIndex((m) => anchorId(m) === activeId);
  const activeAccent = accentColor(milestones[Math.max(activeIndex, 0)].accent);

  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] });
  const spine = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="relative">
      {/* Ambient light that shifts colour with the active phase */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.09] blur-[140px] transition-[background-color] duration-1000"
            style={{ backgroundColor: activeAccent }}
          />
        </div>
      </div>

      <div className="section">
        <SectionHeader
          index="01"
          eyebrow="Engineering timeline"
          id="timeline-title"
          title="How the work changed, phase by phase."
          intro="Each phase is drawn from dated documents. Where a date isn't documented, the timeline says so instead of guessing."
        />

        <YearNav activeId={activeId} />

        <div ref={listRef} className="relative">
          {/* Spine: a faint track, plus the lit portion driven by scroll */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/[0.07] md:left-[179px]" aria-hidden="true">
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-signal-cyan via-signal-cyan to-signal-violet"
              style={{ scaleY: spine }}
            />
          </div>

          {milestones.map((m, i) => (
            <MilestoneCard key={m.id} m={m} active={i === activeIndex} reached={i <= activeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
