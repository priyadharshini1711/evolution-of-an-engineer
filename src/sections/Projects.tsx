import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { Reveal } from '../animations/Reveal';
import { ease } from '../animations/variants';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { SectionHeader } from '../components/SectionHeader';
import { SourceNote, StatusBadge } from '../components/ReviewInfo';
import { projects } from '../data/projects';
import type { Project } from '../data/types';
import { useLowPower } from '../hooks/useLowPower';

function DetailBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="eyebrow mb-2">{title}</h4>
      <ul className="space-y-2 text-[15px] leading-relaxed text-fg/85">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCase({ p, index, lowPower }: { p: Project; index: number; lowPower: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reversed = index % 2 === 1;
  // Accent moves from cyan to violet across the list, matching the timeline.
  const accent = index / Math.max(projects.length - 1, 1) > 0.6 ? 'var(--violet)' : 'var(--cyan)';

  return (
    <article
      aria-labelledby={`${p.id}-title`}
      className="grid items-start gap-8 border-t border-white/[0.06] py-16 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-14"
      style={{ ['--accent' as string]: accent }}
    >
      <Reveal className={reversed ? 'lg:order-2' : ''}>
        <p className="eyebrow">
          <span className="text-fg-faint">{String(index + 1).padStart(2, '0')}</span> · {p.period} · {p.context}
        </p>
        <h3 id={`${p.id}-title`} className="mt-3 font-display text-3xl leading-tight text-fg sm:text-4xl">
          {p.name}
          <StatusBadge status={p.status} />
        </h3>
        <p className="mt-5 text-[15px] leading-relaxed text-fg/80">
          <span className="text-fg-faint">Problem — </span>
          {p.problem}
        </p>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
          {p.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        {p.metrics && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono text-2xl tabular-nums" style={{ color: accent }}>
                  {m.value}
                </dd>
                <dd className="text-xs text-fg-muted">{m.label}</dd>
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
              <div className="mt-6 space-y-6 border-t border-white/5 pt-6">
                <DetailBlock title="My contribution" items={p.contribution} />
                <DetailBlock title="Architectural decisions" items={p.decisions} />
                <DetailBlock title="Challenges and trade-offs" items={p.tradeoffs} />
                {p.outcome && <DetailBlock title="Outcome" items={[p.outcome]} />}
                <SourceNote sources={p.sources} note={p.reviewNote} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <Reveal delay={0.15} className={reversed ? 'lg:order-1' : ''}>
        <figure className="glass rounded-2xl p-4 sm:p-6">
          <ArchitectureDiagram nodes={p.diagram.nodes} edges={p.diagram.edges} title={p.name} animatePackets={!lowPower} />
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
            Simplified architecture · components as documented
          </figcaption>
        </figure>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  const lowPower = useLowPower();
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeader
        index="04"
        eyebrow="Project evolution"
        id="projects-title"
        title="From Building Features to Engineering Systems"
        intro="Six pieces of work from different phases. Client work is described without naming the client, and no proprietary code is shown."
      />
      <div>
        {projects.map((p, i) => (
          <ProjectCase key={p.id} p={p} index={i} lowPower={lowPower} />
        ))}
      </div>
    </section>
  );
}
