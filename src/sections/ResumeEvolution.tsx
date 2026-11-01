import { AnimatePresence, motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from '../animations/Reveal';
import { ease } from '../animations/variants';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/ReviewInfo';
import { siteConfig } from '../config';
import { resumes, type ResumeVersion } from '../data/resumes';

const asset = (file: string, ext: 'pdf' | 'jpg') => `${import.meta.env.BASE_URL}resumes/${file}.${ext}`;

/** Small stack of page outlines, one per page. */
function PageStack({ pages }: { pages: number }) {
  return (
    <span className="inline-flex items-end gap-0.5" aria-label={`${pages} ${pages === 1 ? 'page' : 'pages'}`}>
      {Array.from({ length: pages }, (_, i) => (
        <span key={i} className="block h-3 w-2.5 rounded-[2px] border border-fg-faint/60" />
      ))}
    </span>
  );
}

function Detail({ r }: { r: ResumeVersion }) {
  return (
    <motion.div
      key={r.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease }}
      className="grid gap-8 md:grid-cols-[minmax(0,15rem)_1fr]"
    >
      <a
        href={asset(r.file, 'pdf')}
        target="_blank"
        rel="noreferrer"
        className="group relative block self-start overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl shadow-black/40"
        aria-label={`Open the ${r.label} resume (PDF)`}
      >
        <img src={asset(r.file, 'jpg')} alt="" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
        <span className="absolute inset-x-0 bottom-0 bg-ink-950/80 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted opacity-0 transition-opacity group-hover:opacity-100">
          Open PDF
        </span>
      </a>

      <div>
        <p className="eyebrow">
          {r.date} · {r.format} · {r.pages} {r.pages === 1 ? 'page' : 'pages'}
        </p>
        <h3 className="mt-2 font-display text-3xl text-fg sm:text-4xl">
          {r.label}
          <StatusBadge status={r.status} />
        </h3>

        <p className="mt-5 border-l border-signal-cyan/60 pl-4 font-display text-lg italic leading-snug text-fg/90">{r.ledWith}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-fg/80">{r.summary}</p>

        <h4 className="eyebrow mb-3 mt-7">{r.id === 'R1' ? 'Where it started' : 'What changed from the previous version'}</h4>
        <ul className="space-y-2">
          {r.changes.map((c) => (
            <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
              <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-signal-cyan" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>

        <h4 className="eyebrow mb-3 mt-7">Sections</h4>
        <ul className="flex flex-wrap gap-1.5" aria-label="Sections in this resume">
          {r.sections.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={asset(r.file, 'pdf')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-signal-cyan/40 px-5 py-2.5 text-sm text-fg transition-colors hover:border-signal-cyan"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> View PDF
          </a>
          <a
            href={asset(r.file, 'pdf')}
            download={`${r.file}.pdf`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download
          </a>
        </div>
        {siteConfig.showReviewInfo && r.reviewNote && (
          <p className="mt-4 font-mono text-[11px] text-amber-200/80">⚑ {r.reviewNote}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function ResumeEvolution() {
  const [index, setIndex] = useState(resumes.length - 1);
  const current = resumes[index];

  return (
    <section id="resumes" aria-labelledby="resumes-title" className="section">
      <SectionHeader
        index="06"
        eyebrow="Resume evolution"
        id="resumes-title"
        title="The resume, rewritten five times."
        intro="Each version, what it led with, and what changed from the one before. The attachments are the original documents with contact and personal details redacted."
      />

      <Reveal>
        <div className="relative mb-10">
          <div className="absolute left-[10%] right-[10%] top-[38%] h-px bg-gradient-to-r from-signal-cyan/40 to-signal-violet/40" aria-hidden="true" />
          <div role="tablist" aria-label="Resume versions" className="relative grid grid-cols-5 gap-2 sm:gap-6">
            {resumes.map((r, i) => {
              const active = i === index;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  id={`resume-tab-${r.id}`}
                  aria-selected={active}
                  aria-controls="resume-panel"
                  onClick={() => setIndex(i)}
                  className="group flex flex-col items-center text-center"
                >
                  <span
                    className={`block w-full max-w-[7.5rem] overflow-hidden rounded border bg-white transition-all duration-300 ${
                      active ? 'border-signal-cyan shadow-[0_0_0_3px_rgba(34,211,238,0.25)]' : 'border-white/10 opacity-60 group-hover:opacity-90'
                    }`}
                  >
                    <img src={asset(r.file, 'jpg')} alt="" className="h-auto w-full" loading="lazy" />
                  </span>
                  <span className={`mt-3 font-mono text-[10px] tabular-nums sm:text-xs ${active ? 'text-signal-cyan' : 'text-fg-faint'}`}>{r.date}</span>
                  <span className="mt-1 hidden text-xs text-fg-muted sm:block">{r.label}</span>
                  <span className="mt-2 hidden sm:block">
                    <PageStack pages={r.pages} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div id="resume-panel" role="tabpanel" aria-labelledby={`resume-tab-${current.id}`} className="glass rounded-2xl p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <Detail r={current} />
        </AnimatePresence>
      </div>
    </section>
  );
}
