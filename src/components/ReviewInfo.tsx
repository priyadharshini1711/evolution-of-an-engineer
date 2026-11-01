import { siteConfig } from '../config';
import { sourceDocs } from '../data/sources';
import type { ContentStatus, SourceRef } from '../data/types';

const statusStyle: Record<ContentStatus, string> = {
  verified: 'border-emerald-400/30 text-emerald-300/90',
  'needs-review': 'border-amber-400/40 text-amber-300',
  draft: 'border-fuchsia-400/40 text-fuchsia-300',
};

/** Development-only badge. Renders nothing in production builds. */
export function StatusBadge({ status }: { status: ContentStatus }) {
  if (!siteConfig.showReviewInfo || status === 'verified') return null;
  return (
    <span className={`ml-2 inline-flex rounded border px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider ${statusStyle[status]}`}>
      {status === 'draft' ? 'draft · needs approval' : 'needs review'}
    </span>
  );
}

/** Development-only list of sources and reviewer notes. */
export function SourceNote({ sources, note }: { sources: SourceRef[]; note?: string }) {
  if (!siteConfig.showReviewInfo) return null;
  return (
    <div className="mt-4 rounded-md border border-dashed border-amber-400/25 bg-amber-400/[0.03] p-3 font-mono text-[11px] leading-relaxed text-amber-200/80">
      {note && <p className="mb-1">⚑ {note}</p>}
      {sources.map((s, i) => (
        <p key={i}>
          {s.doc} · {sourceDocs[s.doc].label} — {s.locator}
        </p>
      ))}
    </div>
  );
}
