import { motion } from 'motion/react';
import { BookOpen, Brain, Bus, ExternalLink, Megaphone } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { ease, inViewOnce } from '../animations/variants';
import { SectionHeader } from '../components/SectionHeader';
import { SourceNote, StatusBadge } from '../components/ReviewInfo';
import { isVisible } from '../data/content';
import { otherPresentations, papers, type Presentation } from '../data/papers';

const presentationIcons: Record<Presentation['icon'], typeof Bus> = {
  bus: Bus,
  speaker: Megaphone,
  brain: Brain,
  book: BookOpen,
};

function PresentationCard({ p, index }: { p: Presentation; index: number }) {
  const Icon = presentationIcons[p.icon];
  return (
    <Reveal as="li" delay={0.1 + index * 0.08} className="h-full">
      <article className="glass group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-signal-violet/40">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-signal-violet transition-colors group-hover:border-signal-violet/50">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <p className="eyebrow">{p.area}</p>
        </div>
        <h4 className="mt-5 font-display text-2xl leading-tight text-fg">{p.title}</h4>
        {p.summary && <p className="mt-3 text-[15px] leading-relaxed text-fg/75">{p.summary}</p>}
        {p.concepts.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Concepts">
            {p.concepts.map((c) => (
              <li key={c} className="tag">
                {c}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
          Paper presentation · main author{p.venue && <> · {p.venue}</>}
        </p>
      </article>
    </Reveal>
  );
}

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="section">
      <SectionHeader
        index="05"
        eyebrow="Technical papers"
        id="research-title"
        title="Exploring Beyond Implementation"
        intro="Three conference papers on embedded and IoT systems (2018–2019), then a journal paper on machine learning for warehouse management (2020). The papers move from sensing a single fault to modelling data across a whole business."
      />

      <div className="relative">
        {/* Publication line */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-signal-cyan/60 to-white/5 md:hidden xl:left-0 xl:top-[7px] xl:block xl:h-px xl:w-full xl:origin-left xl:bg-gradient-to-r"
          initial={{ scaleY: 0, scaleX: 0 }}
          whileInView={{ scaleY: 1, scaleX: 1 }}
          viewport={inViewOnce}
          transition={{ duration: 1.4, ease }}
        />

        <ol className="grid gap-10 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {papers.map((p, i) => (
            <Reveal as="li" key={p.id} delay={0.2 + i * 0.15} className="relative pl-8 md:pl-0 md:pt-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-signal-cyan bg-ink-950 md:top-0"
              />
              <p className="font-mono text-xs tabular-nums text-signal-cyan">{p.date}</p>
              <article className="glass mt-3 rounded-2xl p-6">
                <p className="eyebrow">{p.area} · {p.role}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-fg">
                  {p.title}
                  <StatusBadge status={p.status} />
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-fg-faint">{p.venue}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-fg/80">{p.problem}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Concepts">
                  {p.concepts.map((c) => (
                    <li key={c} className="tag">
                      {c}
                    </li>
                  ))}
                </ul>
                {p.keyLearning && isVisible(p.keyLearning.status) && (
                  <div className="mt-6">
                    <h4 className="eyebrow mb-1.5">
                      Key learning <StatusBadge status={p.keyLearning.status} />
                    </h4>
                    <p className="text-[15px] leading-relaxed text-fg/85">{p.keyLearning.text}</p>
                  </div>
                )}
                {p.relationship && isVisible(p.relationship.status) && (
                  <div className="mt-4">
                    <h4 className="eyebrow mb-1.5">
                      In the larger journey <StatusBadge status={p.relationship.status} />
                    </h4>
                    <p className="text-[15px] leading-relaxed text-fg/85">{p.relationship.text}</p>
                  </div>
                )}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm text-signal-cyan hover:underline">
                    Read the paper <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                <SourceNote sources={p.sources} note={p.reviewNote} />
              </article>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-24 border-t border-white/[0.06] pt-16">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-signal-violet/60" aria-hidden="true" />
            Also presented · not published
          </p>
          <h3 className="mt-4 font-display text-3xl leading-tight text-fg sm:text-4xl">Four talks from the symposium years.</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
            Paper presentations at college technical symposiums between 2017 and 2019, as main author. They were presented as talks and
            not published, but they show the same pull toward networks, real-time systems and computing at scale.
          </p>
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-2">
          {otherPresentations.map((p, i) => (
            <PresentationCard key={p.title} p={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
