import { Reveal } from '../animations/Reveal';
import { SectionHeader } from '../components/SectionHeader';

// Served from public/, so it resolves against the site's base path.
const FILM_SRC = `${import.meta.env.BASE_URL}transition.html`;

/** A short animated film of the whole transition, embedded as an iframe. */
export function Film() {
  return (
    <section id="film" aria-labelledby="film-title" className="section !pb-0">
      <SectionHeader
        index="00"
        eyebrow="The transition, year by year"
        id="film-title"
        title="Seven years, at a glance."
        intro="A short animated overview before the detail. Use the controls to pause, replay, or jump to a year."
      />
      <Reveal>
        <figure className="glass overflow-hidden rounded-2xl p-1.5 sm:p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-950">
            <iframe
              src={FILM_SRC}
              title="Animated film: the technical transition from 2019 to 2026"
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts"
            />
          </div>
        </figure>
        <p className="mt-3 text-center">
          <a href={FILM_SRC} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint hover:text-fg-muted">
            Open the film full screen ↗
          </a>
        </p>
      </Reveal>
    </section>
  );
}
