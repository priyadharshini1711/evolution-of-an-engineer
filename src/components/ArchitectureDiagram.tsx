import { useInView } from 'motion/react';
import { useId, useRef } from 'react';
import type { DiagramEdge, DiagramNode, DiagramNodeKind } from '../data/types';

const W = 640;
const H = 280;
const NODE_H = 46;
const DEFAULT_W = 112;

const kindStroke: Record<DiagramNodeKind, string> = {
  source: 'rgba(148,163,184,0.55)',
  ui: 'rgba(34,211,238,0.75)',
  service: 'rgba(34,211,238,0.55)',
  store: 'rgba(148,163,184,0.7)',
  model: 'rgba(139,124,246,0.85)',
  human: 'rgba(230,237,243,0.6)',
  external: 'rgba(148,163,184,0.45)',
};

interface Props {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  title: string;
  animatePackets?: boolean;
}

/** Point where the line from a node's centre towards (tx, ty) leaves its box. */
function boxExit(n: DiagramNode, tx: number, ty: number) {
  const hw = (n.w ?? DEFAULT_W) / 2 + 4;
  const hh = NODE_H / 2 + 4;
  const dx = tx - n.x;
  const dy = ty - n.y;
  const scale = 1 / Math.max(Math.abs(dx) / hw, Math.abs(dy) / hh, 1e-6);
  return { x: n.x + dx * scale, y: n.y + dy * scale };
}

/**
 * Architecture diagram that draws itself when scrolled into view: nodes fade
 * in, edges trace from source to target, then small packets move along them.
 */
export function ArchitectureDiagram({ nodes, edges, title, animatePackets = true }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const uid = useId().replace(/:/g, '');
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const paths = edges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    if (!a || !b) return [];
    const p1 = boxExit(a, b.x, b.y);
    const p2 = boxExit(b, a.x, a.y);
    const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    return [{ edge: e, d: `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`, len, mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 } }];
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={`h-auto w-full ${inView ? 'is-drawn' : ''}`}
      role="img"
      aria-label={`Architecture diagram: ${title}. ${edges
        .map((e) => `${byId.get(e.from)?.label} ${e.bidirectional ? 'exchanges data with' : 'to'} ${byId.get(e.to)?.label}`)
        .join('; ')}.`}
    >
      <defs>
        <marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="rgba(148,163,184,0.8)" />
        </marker>
      </defs>

      {paths.map(({ edge, d, len, mid }, i) => (
        <g key={`${edge.from}-${edge.to}`}>
          <path
            d={d}
            className="diagram-edge"
            style={{ ['--len' as string]: len, transitionDelay: `${0.35 + i * 0.12}s` }}
            stroke="rgba(148,163,184,0.55)"
            strokeWidth={1.2}
            strokeDasharray={edge.dashed ? '4 5' : undefined}
            fill="none"
            markerEnd={`url(#arrow-${uid})`}
            markerStart={edge.bidirectional ? `url(#arrow-${uid})` : undefined}
          />
          {edge.label && (
            <text
              x={mid.x}
              y={mid.y - 7}
              textAnchor="middle"
              className="diagram-node fill-fg-muted font-mono"
              fontSize="10"
              style={{ transitionDelay: `${0.9 + i * 0.12}s` }}
            >
              {edge.label}
            </text>
          )}
          {animatePackets && !edge.dashed && (
            <circle
              r="2.6"
              className="packet"
              fill="var(--accent)"
              style={{ offsetPath: `path('${d}')`, animationDelay: `${1.6 + i * 0.45}s`, animationPlayState: inView ? 'running' : 'paused' }}
            />
          )}
        </g>
      ))}

      {nodes.map((n, i) => {
        const w = n.w ?? DEFAULT_W;
        const isHuman = n.kind === 'human' || n.kind === 'external';
        return (
          <g key={n.id} className="diagram-node" style={{ transitionDelay: `${i * 0.08}s` }}>
            {n.kind === 'store' ? (
              <>
                <rect x={n.x - w / 2} y={n.y - NODE_H / 2} width={w} height={NODE_H} rx={NODE_H / 2} fill="#0D1117" stroke={kindStroke[n.kind]} />
                <path d={`M${n.x - w / 2 + 14} ${n.y - NODE_H / 2 + 8} h${w - 28}`} stroke={kindStroke[n.kind]} strokeOpacity={0.4} />
              </>
            ) : (
              <rect
                x={n.x - w / 2}
                y={n.y - NODE_H / 2}
                width={w}
                height={NODE_H}
                rx={n.kind === 'model' ? 14 : 6}
                fill={n.kind === 'model' ? 'rgba(139,124,246,0.08)' : '#0D1117'}
                stroke={kindStroke[n.kind]}
                strokeDasharray={isHuman ? '3 4' : undefined}
              />
            )}
            <text x={n.x} y={n.sublabel ? n.y - 3 : n.y + 4} textAnchor="middle" fontSize="12" className="fill-fg font-sans">
              {n.label}
            </text>
            {n.sublabel && (
              <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize="9.5" className="fill-fg-muted font-mono">
                {n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
