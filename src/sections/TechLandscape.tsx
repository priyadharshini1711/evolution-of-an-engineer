import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Reveal } from '../animations/Reveal';
import { ease } from '../animations/variants';
import { categories, evidenceGroups, graphYears, techNodes, type GraphYear } from '../data/technologies';
import type { TechCategory, TechNode } from '../data/types';
import { useMediaQuery } from '../hooks/useMediaQuery';

/* ---------- Layout: swimlanes (category) × columns (year first documented) ---------- */

const LEFT_PAD = 44; // room for edges that arc out to the left of a column
const HEADER = 36;
const LANE_LABEL = 22;
const ITEM_W = 140;
const ROW_H = 24;
const LANE_PAD = 12;
const COL_GAP = 28;
const MAX_ROWS = 4;
const RIGHT_PAD = 24;

interface Placed {
  node: TechNode;
  /** Left edge of the node's year column. */
  colX: number;
  x: number;
  y: number;
  r: number;
  freq: number;
}

type GraphModel = ReturnType<typeof buildModel>;

function buildModel() {
  const freq = new Map<string, number>();
  const groupsByTech = new Map<string, string[]>();
  for (const g of evidenceGroups) {
    for (const t of g.techs) {
      freq.set(t, (freq.get(t) ?? 0) + 1);
      groupsByTech.set(t, [...(groupsByTech.get(t) ?? []), g.label]);
    }
  }

  // Edges: every pair of technologies used in the same documented work.
  const edgeMap = new Map<string, { a: string; b: string; year: number; weight: number }>();
  for (const g of evidenceGroups) {
    for (let i = 0; i < g.techs.length; i++) {
      for (let j = i + 1; j < g.techs.length; j++) {
        const [a, b] = [g.techs[i], g.techs[j]].sort();
        const key = `${a}|${b}`;
        const prev = edgeMap.get(key);
        edgeMap.set(key, prev ? { ...prev, year: Math.min(prev.year, g.year), weight: prev.weight + 1 } : { a, b, year: g.year, weight: 1 });
      }
    }
  }
  const edges = [...edgeMap.values()];

  const cell = (cat: TechCategory, year: number) => techNodes.filter((n) => n.category === cat && n.firstSeen === year);
  const laneRows = categories.map((c) => Math.min(MAX_ROWS, Math.max(1, ...graphYears.map((y) => cell(c.id, y).length))));
  const colCols = graphYears.map((y) => Math.max(1, ...categories.map((c, li) => Math.ceil(cell(c.id, y).length / laneRows[li]))));

  const laneTop: number[] = [];
  let yCursor = HEADER;
  laneRows.forEach((rows) => {
    laneTop.push(yCursor);
    yCursor += LANE_LABEL + rows * ROW_H + LANE_PAD;
  });
  const colLeft: number[] = [];
  let xCursor = LEFT_PAD;
  colCols.forEach((cols) => {
    colLeft.push(xCursor);
    xCursor += cols * ITEM_W + COL_GAP;
  });

  const placed: Placed[] = [];
  categories.forEach((c, li) => {
    graphYears.forEach((y, yi) => {
      cell(c.id, y).forEach((node, k) => {
        const rows = laneRows[li];
        const f = freq.get(node.id) ?? 0;
        placed.push({
          node,
          freq: f,
          colX: colLeft[yi],
          x: colLeft[yi] + Math.floor(k / rows) * ITEM_W + 8,
          y: laneTop[li] + LANE_LABEL + (k % rows) * ROW_H + ROW_H / 2,
          r: 2.8 + Math.min(f, 6) * 0.85,
        });
      });
    });
  });

  return {
    placed,
    byId: new Map(placed.map((p) => [p.node.id, p])),
    edges,
    groupsByTech,
    laneTop,
    colLeft,
    width: xCursor - COL_GAP + RIGHT_PAD,
    height: yCursor,
  };
}

/** Bezier between two nodes. Nodes in the same year column arc out to its left so the line never crosses labels. */
function edgePath(a: Placed, b: Placed): string {
  if (a.colX === b.colX) {
    const bulge = a.colX - 10 - Math.min(Math.abs(a.y - b.y) * 0.06, 22);
    return `M${a.x} ${a.y} C${bulge} ${a.y} ${bulge} ${b.y} ${b.x} ${b.y}`;
  }
  const [l, r] = a.x < b.x ? [a, b] : [b, a];
  const mx = (l.x + r.x) / 2;
  return `M${l.x} ${l.y} C${mx} ${l.y} ${mx} ${r.y} ${r.x} ${r.y}`;
}

const yearLabel = (y: number) => String(y);
const firstSeenLabel = yearLabel;
const YEAR_NOTE = 'Work from roles that span two years appears in the year the role was mostly active, as on the timeline.';

/* ---------- Controls and panels ---------- */

function YearSelector({ year, onChange }: { year: GraphYear; onChange: (y: GraphYear) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Show technical landscape for year"
      className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-ink-950 p-1 [scrollbar-width:none]"
    >
      {graphYears.map((y) => (
        <button
          key={y}
          type="button"
          role="radio"
          aria-checked={y === year}
          onClick={() => onChange(y)}
          className={`relative shrink-0 rounded-full px-3 py-1.5 font-mono text-xs tabular-nums transition-colors sm:px-4 ${y === year ? 'text-ink-950' : 'text-fg-muted hover:text-fg'}`}
        >
          {y === year && <motion.span layoutId="year-pill" className="absolute inset-0 rounded-full bg-signal-cyan" transition={{ duration: 0.4, ease }} />}
          <span className="relative">{yearLabel(y)}</span>
        </button>
      ))}
    </div>
  );
}

function NodeDetail({ p, model, onClose }: { p: Placed; model: GraphModel; onClose: () => void }) {
  const neighbours = model.edges
    .filter((e) => e.a === p.node.id || e.b === p.node.id)
    .map((e) => model.byId.get(e.a === p.node.id ? e.b : e.a)?.node.label)
    .filter(Boolean) as string[];
  const groups = model.groupsByTech.get(p.node.id) ?? [];
  const category = categories.find((c) => c.id === p.node.category)?.label;

  return (
    <div className="relative">
      <button type="button" onClick={onClose} className="absolute -right-1 -top-1 rounded p-1 text-fg-faint hover:text-fg" aria-label="Close details">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="eyebrow pr-6">{category}</p>
      <h3 className="mt-1.5 font-display text-2xl text-fg">{p.node.label}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-fg-faint">First documented</dt>
          <dd className="font-mono text-fg">{firstSeenLabel(p.node.firstSeen)}</dd>
        </div>
        <div>
          <dt className="text-xs text-fg-faint">Evidence</dt>
          <dd className="text-fg">{p.node.evidence === 'project' ? `${groups.length} ${groups.length === 1 ? 'project' : 'projects'}` : 'Listed skill'}</dd>
        </div>
      </dl>
      {groups.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-xs text-fg-faint">Used in</p>
          <ul className="space-y-0.5 text-[13px] text-fg/85">
            {groups.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      )}
      {neighbours.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-xs text-fg-faint">Used alongside</p>
          <p className="text-[13px] leading-relaxed text-fg-muted">{neighbours.join(' · ')}</p>
        </div>
      )}
      {p.node.evidence === 'skills-list' && (
        <p className="mt-4 text-xs leading-relaxed text-fg-faint">Listed as a skill, course or training. No documented project uses it yet.</p>
      )}
    </div>
  );
}

function FocusBars({ year }: { year: GraphYear }) {
  // Number of documented pieces of work in this year that touch each category.
  const counts = categories.map((c) => ({
    ...c,
    count: evidenceGroups.filter((g) => g.year === year && g.techs.some((t) => techNodes.find((n) => n.id === t)?.category === c.id)).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));
  return (
    <div>
      <p className="eyebrow">Focus in {yearLabel(year)}</p>
      <p className="mb-5 mt-1 text-xs text-fg-faint">Documented pieces of work that touch each area</p>
      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map((c) => (
          <li key={c.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 text-xs">
            <span className={c.count ? 'text-fg-muted' : 'text-fg-faint/60'}>{c.label}</span>
            <span className="w-4 text-right font-mono tabular-nums text-fg-faint">{c.count}</span>
            <span className="col-span-2 mt-1 h-px bg-white/[0.06]">
              <span
                className="block h-px origin-left bg-gradient-to-r from-signal-cyan to-signal-violet transition-transform duration-700"
                style={{ transform: `scaleX(${c.count / max})` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Desktop graph ---------- */

function Graph({ year, selected, onSelect, model }: { year: GraphYear; selected: string | null; onSelect: (id: string | null) => void; model: GraphModel }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const focus = hovered ?? selected;
  const neighbourIds = useMemo(() => {
    if (!focus) return null;
    const s = new Set<string>([focus]);
    model.edges.forEach((e) => {
      if (e.a === focus) s.add(e.b);
      if (e.b === focus) s.add(e.a);
    });
    return s;
  }, [focus, model.edges]);

  const visibleCount = model.placed.filter((p) => p.node.firstSeen <= year).length;
  const sel = selected ? model.byId.get(selected) : undefined;
  const selOnRight = sel ? sel.x / model.width > 0.55 : false;

  return (
    // A minimum width keeps labels readable; narrower screens scroll sideways.
    <div className="relative min-w-[1120px]">
      <svg
        viewBox={`0 0 ${model.width} ${model.height}`}
        className="h-auto w-full select-none"
        role="group"
        aria-label={`Technology graph for ${yearLabel(year)}: ${visibleCount} technologies. Each lane is a category, each column the year a technology first appears. Lines join technologies used in the same documented work.`}
      >
        {categories.map((c, li) => (
          <g key={c.id}>
            <line x1={0} x2={model.width} y1={model.laneTop[li]} y2={model.laneTop[li]} stroke="rgba(148,163,184,0.07)" />
            <text x={LEFT_PAD - 6} y={model.laneTop[li] + 15} fontSize="10" className="fill-fg-faint font-mono uppercase" letterSpacing="1.4">
              {c.label}
            </text>
          </g>
        ))}

        {graphYears.map((y, yi) => (
          <text
            key={y}
            x={model.colLeft[yi] + 2}
            y={22}
            fontSize="13"
            className="graph-edge font-mono"
            fill={y === year ? 'var(--cyan)' : y < year ? 'rgba(230,237,243,0.75)' : 'rgba(91,104,120,0.45)'}
          >
            {yearLabel(y)}
          </text>
        ))}

        <g fill="none">
          {model.edges.map((e) => {
            const a = model.byId.get(e.a);
            const b = model.byId.get(e.b);
            if (!a || !b) return null;
            const shown = e.year <= year && a.node.firstSeen <= year && b.node.firstSeen <= year;
            const lit = focus !== null && (e.a === focus || e.b === focus);
            return (
              <path
                key={`${e.a}|${e.b}`}
                d={edgePath(a, b)}
                className="graph-edge"
                stroke={lit ? 'var(--cyan)' : e.year === year ? 'rgba(139,124,246,0.38)' : 'rgba(148,163,184,0.11)'}
                strokeWidth={lit ? 1.4 : 0.7 + Math.min(e.weight, 3) * 0.3}
                opacity={shown ? (focus && !lit ? 0.2 : 1) : 0}
              />
            );
          })}
        </g>

        {model.placed.map((p) => {
          const shown = p.node.firstSeen <= year;
          const isNew = p.node.firstSeen === year;
          const dim = neighbourIds && !neighbourIds.has(p.node.id);
          const isFocus = focus === p.node.id;
          const solid = p.node.evidence === 'project';
          const colour = isNew ? (year >= 2024 ? 'var(--violet)' : 'var(--cyan)') : 'rgba(230,237,243,0.85)';
          const toggle = () => onSelect(selected === p.node.id ? null : p.node.id);
          return (
            <g
              key={p.node.id}
              className="graph-node cursor-pointer outline-none [&:focus-visible_.ring]:opacity-100"
              style={{ opacity: shown ? (dim ? 0.22 : 1) : 0, transform: shown ? 'none' : 'translateX(-12px)', pointerEvents: shown ? 'auto' : 'none' }}
              tabIndex={shown ? 0 : -1}
              role="button"
              aria-pressed={selected === p.node.id}
              aria-hidden={!shown}
              aria-label={`${p.node.label}, first documented ${firstSeenLabel(p.node.firstSeen)}, ${solid ? `used in ${p.freq} documented projects` : 'listed skill only'}`}
              onMouseEnter={() => setHovered(p.node.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(p.node.id)}
              onBlur={() => setHovered(null)}
              onClick={toggle}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle();
                }
              }}
            >
              <rect x={p.x - 8} y={p.y - ROW_H / 2} width={ITEM_W - 6} height={ROW_H} fill="transparent" />
              <rect className="ring" x={p.x - 8} y={p.y - ROW_H / 2 + 1} width={ITEM_W - 6} height={ROW_H - 2} rx={5} fill="none" stroke="var(--cyan)" opacity={0} />
              {isFocus && <circle cx={p.x} cy={p.y} r={p.r + 5} fill="none" stroke="var(--cyan)" strokeOpacity={0.4} />}
              <circle cx={p.x} cy={p.y} r={p.r} fill={solid ? colour : '#07090C'} stroke={colour} strokeWidth={solid ? 0 : 1.1} strokeDasharray={solid ? undefined : '2 2'} />
              <text x={p.x + Math.max(p.r, 4) + 6} y={p.y + 4} fontSize="12" className="font-sans" fill={isFocus ? '#fff' : solid ? 'rgba(230,237,243,0.88)' : 'rgba(139,152,169,0.75)'}>
                {p.node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {sel && sel.node.firstSeen <= year && (
          <motion.div
            key={sel.node.id}
            role="dialog"
            aria-label={`Details for ${sel.node.label}`}
            className="glass absolute z-10 w-72 rounded-xl bg-ink-900/95 p-5 shadow-2xl shadow-black/50"
            style={{
              // Open downwards from nodes in the upper half, upwards from the lower half.
              ...(sel.y / model.height < 0.5
                ? { top: `${(sel.y / model.height) * 100 - 2}%` }
                : { bottom: `${(1 - sel.y / model.height) * 100 - 4}%` }),
              ...(selOnRight ? { right: `${(1 - sel.x / model.width) * 100 + 2}%` } : { left: `${((sel.x + ITEM_W) / model.width) * 100}%` }),
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease }}
          >
            <NodeDetail p={sel} model={model} onClose={() => onSelect(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Mobile list ---------- */

function LaneList({ year, selected, onSelect, model }: { year: GraphYear; selected: string | null; onSelect: (id: string | null) => void; model: GraphModel }) {
  const sel = selected ? model.byId.get(selected) : undefined;
  return (
    <div className="space-y-6">
      {categories.map((c) => {
        const nodes = model.placed.filter((p) => p.node.category === c.id && p.node.firstSeen <= year);
        if (nodes.length === 0) return null;
        return (
          <div key={c.id}>
            <p className="eyebrow mb-2">{c.label}</p>
            <ul className="flex flex-wrap gap-1.5">
              {nodes.map((p) => {
                const isNew = p.node.firstSeen === year;
                const solid = p.node.evidence === 'project';
                return (
                  <motion.li key={p.node.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }}>
                    <button
                      type="button"
                      aria-pressed={selected === p.node.id}
                      onClick={() => onSelect(selected === p.node.id ? null : p.node.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        selected === p.node.id
                          ? 'border-signal-cyan bg-signal-cyan/15 text-fg'
                          : isNew
                            ? 'border-signal-cyan/50 text-fg'
                            : solid
                              ? 'border-white/15 text-fg/80'
                              : 'border-dashed border-white/15 text-fg-muted'
                      }`}
                    >
                      {p.node.label}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
            {sel && sel.node.category === c.id && sel.node.firstSeen <= year && (
              <div className="mt-3 rounded-xl border border-white/10 bg-ink-900 p-4">
                <NodeDetail p={sel} model={model} onClose={() => onSelect(null)} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Section ---------- */

export default function TechLandscape() {
  const model = useMemo(buildModel, []);
  const isWide = useMediaQuery('(min-width: 900px)');
  const reduceMotion = useReducedMotion();
  const [year, setYear] = useState<GraphYear>(2019);
  const [selected, setSelected] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setYear((y) => {
        const i = graphYears.indexOf(y);
        if (i === graphYears.length - 1) {
          setPlaying(false);
          return y;
        }
        return graphYears[i + 1];
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [playing]);

  const togglePlay = () => {
    if (!playing && year === graphYears[graphYears.length - 1]) setYear(graphYears[0]);
    setPlaying((p) => !p);
  };

  return (
    <section id="landscape" aria-labelledby="landscape-title" className="section">
      <SectionHeader
        index="02"
        eyebrow="Technical skill evolution"
        id="landscape-title"
        title="A landscape that kept widening."
        intro="Each column is the year a technology first appears in my documents. Dot size shows how many pieces of documented work used it, and lines join technologies used together. Dashed dots are listed skills with no documented project behind them."
      />

      <div className="sticky top-14 z-20 -mx-4 mb-6 flex flex-wrap items-center gap-4 bg-ink-950/85 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
        <YearSelector
          year={year}
          onChange={(y) => {
            setPlaying(false);
            setYear(y);
          }}
        />
        {!reduceMotion && (
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-muted transition-colors hover:text-fg"
            aria-label={playing ? 'Pause year playback' : 'Play through the years'}
          >
            {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            {playing ? 'Pause' : 'Play'}
          </button>
        )}
      </div>

      <Reveal className="relative z-10">
        <div className="glass overflow-x-auto rounded-2xl p-4 sm:p-6">
          {isWide ? (
            <Graph year={year} selected={selected} onSelect={setSelected} model={model} />
          ) : (
            <LaneList year={year} selected={selected} onSelect={setSelected} model={model} />
          )}
        </div>
        <p className="mt-3 text-xs text-fg-faint">{YEAR_NOTE}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glass mt-6 rounded-2xl p-5 sm:p-6">
          <FocusBars year={year} />
        </div>
      </Reveal>
    </section>
  );
}
