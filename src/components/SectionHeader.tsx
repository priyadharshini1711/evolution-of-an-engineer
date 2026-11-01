import { RevealText } from '../animations/RevealText';
import { Reveal } from '../animations/Reveal';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}

export function SectionHeader({ index, eyebrow, title, intro, id }: SectionHeaderProps) {
  return (
    <header className="mb-14 max-w-3xl md:mb-20">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal-cyan">{index}</span>
          <span className="h-px w-8 bg-fg-faint/50" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="mt-5 font-display text-4xl leading-[1.05] text-fg sm:text-5xl md:text-6xl">
        <RevealText text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-fg-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
