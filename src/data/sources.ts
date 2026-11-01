import type { SourceDoc } from './types';

/**
 * Human-readable labels for the source documents. The files themselves stay
 * in "Resume Collections/" (git-ignored) and are never imported.
 */
export const sourceDocs: Record<SourceDoc, { label: string; approxDate: string }> = {
  R1: { label: 'Resume 1 · after college (scanned)', approxDate: 'early 2019' },
  R2: { label: 'Resume 2 · during Gofrugal internship', approxDate: '2019–2020' },
  R3: { label: 'Resume 3 · variant of Resume 2', approxDate: '2019–2020' },
  R4: { label: 'Resume 4 · after Lumel', approxDate: 'mid-2022' },
  R5: { label: 'Resume 5 · current', approxDate: '2026' },
  P1: { label: 'Paper · Power Transmission Control', approxDate: 'Mar 2018' },
  P2: { label: 'Paper · Coal Mine Accidents Detection', approxDate: 'Oct 2018' },
  P3: { label: 'Paper · Transparency Farming', approxDate: 'Feb 2019' },
  P4: { label: 'Paper · Ecommerce Warehousing (journal)', approxDate: 'Apr 2020' },
  L1: { label: 'LinkedIn profile export', approxDate: 'Nov 2026' },
};
