import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GridBackground } from '../components/GridBackground';
import { RevealText } from '../animations/RevealText';
import { ease } from '../animations/variants';
import { introConcepts } from '../data/timeline';

const START = 2019;
const END = 2026;
const CONCEPT_MS = 1150;
const YEAR_MS = 420;

interface Step {
  year: number;
  concept: string | null;
  ms: number;
}

/** One step per concept; years without a documented concept tick past quickly. */
function buildSteps(): Step[] {
  const steps: Step[] = [];
  for (let y = START; y <= END; y++) {
    const concepts = introConcepts.filter((c) => c.year === y);
    if (concepts.length === 0) steps.push({ year: y, concept: null, ms: YEAR_MS });
    concepts.forEach((c) => steps.push({ year: y, concept: c.label, ms: CONCEPT_MS }));
  }
  return steps;
}

function RollingYear({ year }: { year: number }) {
  const chars = String(year).split('');
  return (
    <span className="inline-flex font-mono tabular-nums" aria-hidden="true">
      {chars.map((ch, i) => (
        <span key={i} className="relative inline-block overflow-hidden" style={{ width: '0.62em' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch}
              className="inline-block"
              initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease }}
            >
              {ch}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export function Intro() {
  const reduceMotion = useReducedMotion();
  const steps = useMemo(buildSteps, []);
  const [stepIndex, setStepIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) setRevealed(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (revealed) return;
    const isLast = stepIndex >= steps.length - 1;
    const timer = window.setTimeout(
      () => (isLast ? setRevealed(true) : setStepIndex((i) => i + 1)),
      isLast ? steps[stepIndex].ms + 700 : steps[stepIndex].ms,
    );
    return () => window.clearTimeout(timer);
  }, [stepIndex, revealed, steps]);

  const replay = useCallback(() => {
    setStepIndex(0);
    setRevealed(false);
  }, []);

  const step = steps[stepIndex];
  // The most recent concept reached so far (years without one keep the last).
  const currentConcept =
    [...steps.slice(0, stepIndex + 1)].reverse().find((s) => s.concept)?.concept ?? '';
  const conceptIndex = introConcepts.findIndex((c) => c.label === currentConcept);
  const progress = (step.year - START) / (END - START);

  const explore = () => {
    document.getElementById('film')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="top"
      aria-labelledby="intro-title"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <GridBackground />
      {/* Ambient light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-signal-cyan/10 blur-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0.6 : 0.35 + progress * 0.2 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[-15%] h-[34rem] w-[34rem] rounded-full bg-signal-violet/10 blur-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 0.7 : progress * 0.8 }}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 w-full max-w-5xl px-4 text-center sm:px-8">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="counter"
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col items-center"
            >
              <p className="sr-only" aria-live="polite">
                {step.year}: {currentConcept}
              </p>
              <div className="text-[22vw] font-light leading-none tracking-tight text-fg sm:text-[9rem] md:text-[11rem]">
                <RollingYear year={step.year} />
              </div>

              <div className="mt-8 h-10 sm:h-12" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentConcept}
                    className="font-display text-2xl italic text-fg-muted sm:text-4xl"
                    initial={{ opacity: 0, y: 14, filter: 'blur(10px)', letterSpacing: '0.08em' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0em' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(10px)' }}
                    transition={{ duration: 0.55, ease }}
                  >
                    {currentConcept}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Concept chain */}
              <ol className="mt-10 flex flex-wrap justify-center gap-x-2 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-[11px]" aria-hidden="true">
                {introConcepts.map((c, i) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-2 transition-colors duration-500"
                    style={{ color: i < conceptIndex ? 'rgba(139,152,169,0.8)' : i === conceptIndex ? 'var(--cyan)' : 'rgba(91,104,120,0.4)' }}
                  >
                    {c.label}
                    {i < introConcepts.length - 1 && <span className="text-fg-faint/40">→</span>}
                  </li>
                ))}
              </ol>

              <div className="mt-12 h-px w-64 max-w-full overflow-hidden bg-fg-faint/20" aria-hidden="true">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-signal-cyan to-signal-violet"
                  animate={{ scaleX: progress }}
                  transition={{ duration: 0.5, ease }}
                />
              </div>

              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint transition-colors hover:text-fg"
              >
                Skip intro
              </button>
            </motion.div>
          ) : (
            <motion.div key="headline" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.p
                className="eyebrow mb-8"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                An interactive engineering documentary
              </motion.p>
              <h1 id="intro-title" className="font-display text-[13vw] uppercase leading-[0.92] tracking-[-0.01em] text-fg sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                <RevealText text="The Evolution" immediate delay={0.15} />
                <br />
                <RevealText text="of an Engineer" immediate delay={0.4} className="italic text-fg/90" />
              </h1>
              <motion.p
                className="mt-8 font-mono text-sm tracking-[0.3em] text-signal-cyan"
                initial={{ opacity: 0, letterSpacing: '0.6em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 1.2, delay: 0.9, ease }}
              >
                2019 — 2026
              </motion.p>
              <motion.p
                className="mt-6 max-w-md text-base text-fg-muted sm:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15, ease }}
              >
                Seven years of building, learning, unlearning, and engineering.
              </motion.p>
              <motion.div
                className="mt-12 flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.4, ease }}
              >
                <button
                  type="button"
                  onClick={explore}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-signal-cyan/40 px-7 py-3.5 text-sm font-medium text-fg transition-colors hover:border-signal-cyan"
                >
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-signal-cyan/0 via-signal-cyan/15 to-signal-violet/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  Explore My Journey
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                </button>
                {!reduceMotion && (
                  <button
                    type="button"
                    onClick={replay}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint transition-colors hover:text-fg-muted"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" /> Replay intro
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
