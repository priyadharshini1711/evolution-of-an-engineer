import { MotionConfig } from 'motion/react';
import { Suspense, lazy } from 'react';
import { SiteHeader, type NavItem } from './components/SiteHeader';
import { visibleReflections } from './data/content';
import { useActiveId } from './hooks/useActiveId';
import { useLowPower } from './hooks/useLowPower';
import { Film } from './sections/Film';
import { Intro } from './sections/Intro';
import { Timeline } from './sections/Timeline';

// Below-the-fold sections are split into their own chunks.
const TechLandscape = lazy(() => import('./sections/TechLandscape'));
const ThenVsNow = lazy(() => import('./sections/ThenVsNow'));
const Projects = lazy(() => import('./sections/Projects'));
const Research = lazy(() => import('./sections/Research'));
const ResumeEvolution = lazy(() => import('./sections/ResumeEvolution'));
const Reflections = lazy(() => import('./sections/Reflections'));
const Closing = lazy(() => import('./sections/Closing'));

const navItems: NavItem[] = [
  { id: 'film', label: 'Film' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'mindset', label: 'Mindset' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'resumes', label: 'Resume' },
  ...(visibleReflections.length > 0 ? [{ id: 'reflections', label: 'Reflections' }] : []),
  { id: 'closing', label: 'Onward' },
];
const navIds = navItems.map((n) => n.id);

function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}

export default function App() {
  useLowPower();
  const activeId = useActiveId(navIds, '-40% 0px -55% 0px');

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader items={navItems} activeId={activeId} />
      <main>
        <Intro />
        <Film />
        <Timeline />
        <Suspense fallback={<SectionFallback />}>
          <TechLandscape />
          <ThenVsNow />
          <Projects />
          <Research />
          <ResumeEvolution />
          <Reflections />
          <Closing />
        </Suspense>
      </main>
    </MotionConfig>
  );
}
