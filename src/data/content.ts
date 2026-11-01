import { siteConfig } from '../config';
import { reflections } from './reflections';
import type { ContentStatus, Organisation } from './types';

/** Draft content only renders when drafts are enabled (dev, or VITE_SHOW_DRAFTS). */
export function isVisible(status: ContentStatus): boolean {
  return status !== 'draft' || siteConfig.showDrafts;
}

/** The reflections section (and its nav link) is omitted when none are visible. */
export const visibleReflections = reflections.filter((r) => isVisible(r.status));

export function orgLabel(org: Organisation): string {
  if (!siteConfig.showEmployerNames) return org.descriptor;
  return siteConfig.showEmployerDescriptions ? `${org.name}, ${org.descriptor}` : org.name;
}

/** Linear blend between the cyan and violet accents. t ∈ [0, 1]. */
export function accentColor(t: number): string {
  const cyan = [34, 211, 238];
  const violet = [139, 124, 246];
  const mix = cyan.map((c, i) => Math.round(c + (violet[i] - c) * t));
  return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`;
}
