import type { MotifKind } from '../data/types';

/**
 * Faint line-art behind each milestone. Each phase gets its own drawing,
 * using the same stroke weight and colour so the set stays consistent.
 */
export function Motif({ kind, className = '' }: { kind: MotifKind; className?: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    vectorEffect: 'non-scaling-stroke' as const,
  };
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g {...common}>{shapes[kind]}</g>
    </svg>
  );
}

const shapes: Record<MotifKind, JSX.Element> = {
  circuit: (
    <>
      <path d="M10 40h50v40h40v-30h60M10 120h30v40h70v-50h80M60 190v-50h50" />
      {[ [60, 40], [100, 80], [160, 50], [40, 160], [110, 110], [110, 140] ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" />
      ))}
      <rect x="120" y="130" width="40" height="30" rx="2" />
    </>
  ),
  layers: (
    <>
      {[30, 75, 120].map((y) => (
        <rect key={y} x="30" y={y} width="140" height="34" rx="3" />
      ))}
      <path d="M100 64v11M100 109v11M100 154v30" />
    </>
  ),
  'query-tree': (
    <>
      <circle cx="100" cy="30" r="10" />
      <circle cx="55" cy="95" r="10" />
      <circle cx="145" cy="95" r="10" />
      <circle cx="30" cy="160" r="8" />
      <circle cx="80" cy="160" r="8" />
      <circle cx="145" cy="160" r="8" />
      <path d="M93 38 62 87M107 38l31 49M50 104 34 152M60 104l16 48M145 105v47" />
    </>
  ),
  scatter: (
    <>
      <path d="M20 180h165M20 180V15" />
      {[ [40, 160], [55, 150], [70, 152], [85, 130], [100, 125], [115, 110], [130, 100], [145, 85], [160, 70], [175, 55], [65, 135], [125, 118] ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" />
      ))}
      <path d="M30 170 C90 135 140 90 185 40" />
    </>
  ),
  flows: (
    <>
      {[40, 80, 120, 160].map((y) => (
        <g key={y}>
          <rect x="15" y={y - 10} width="30" height="20" rx="3" />
          <path d={`M45 ${y}h40l20 ${100 - y}`} />
        </g>
      ))}
      <rect x="105" y="85" width="40" height="30" rx="4" />
      <path d="M145 100h40M175 92l10 8-10 8" />
    </>
  ),
  mesh: (
    <>
      {[ [40, 40], [160, 40], [100, 100], [40, 160], [160, 160], [100, 20], [20, 100], [180, 100] ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" />
      ))}
      <path d="M40 40 160 40 160 160 40 160ZM40 40l120 120M160 40 40 160M100 20l0 160M20 100h160" />
    </>
  ),
  dag: (
    <>
      {[ [25, 60], [25, 140], [90, 40], [90, 100], [90, 160], [160, 70], [160, 140] ].map(([x, y], i) => (
        <rect key={i} x={x - 12} y={y - 9} width="24" height="18" rx="3" />
      ))}
      <path d="M37 60h41M37 60l41 40M37 140l41-40M37 140h41l0 20M102 40l46 30M102 100l46-30M102 100l46 40M102 160l46-20" />
    </>
  ),
  retrieval: (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20 + i * 6} y={40 + i * 6} width="50" height="64" rx="2" />
      ))}
      <circle cx="140" cy="80" r="26" />
      <path d="M90 90h24M166 80h20M140 106v40l-30 30M140 146l30 30" />
    </>
  ),
  agents: (
    <>
      <circle cx="100" cy="100" r="18" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = (deg * Math.PI) / 180;
        const x = 100 + Math.cos(r) * 70;
        const y = 100 + Math.sin(r) * 70;
        return (
          <g key={deg}>
            <circle cx={x} cy={y} r="10" />
            <path d={`M${100 + Math.cos(r) * 18} ${100 + Math.sin(r) * 18}L${100 + Math.cos(r) * 60} ${100 + Math.sin(r) * 60}`} />
          </g>
        );
      })}
      <circle cx="100" cy="100" r="90" strokeDasharray="2 6" />
    </>
  ),
};
