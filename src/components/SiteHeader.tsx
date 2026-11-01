import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
}

/** Thin header that appears after the intro, with section links and reading progress. */
export function SiteHeader({ items, activeId }: { items: NavItem[]; activeId: string | null }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = items.find((i) => i.id === activeId);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-14 border-b border-white/5 bg-ink-950/70 backdrop-blur-md transition-[opacity,transform] duration-500 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'}`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" tabIndex={visible ? 0 : -1} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted hover:text-fg">
          <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
            <path d="M8 24 L16 8 L24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="8" r="2.4" fill="var(--violet)" />
          </svg>
          <span className="hidden sm:inline">Evolution of an Engineer</span>
          <span className="sr-only sm:hidden">Back to top</span>
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  tabIndex={visible ? 0 : -1}
                  aria-current={item.id === activeId ? 'location' : undefined}
                  className={`text-[13px] transition-colors ${item.id === activeId ? 'text-fg' : 'text-fg-muted hover:text-fg'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted lg:hidden" aria-hidden="true">
          {active?.label}
        </span>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-signal-cyan to-signal-violet" style={{ scaleX: progress }} />
    </header>
  );
}
