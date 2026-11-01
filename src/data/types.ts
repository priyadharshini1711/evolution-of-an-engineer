/**
 * Content model. Every factual claim carries `sources` so it can be traced to
 * the private document it came from. Source documents never ship in the build;
 * only these short references do.
 *
 * status:
 *  - verified      stated directly in a source document
 *  - needs-review  stated in a document, but a date, number or wording is uncertain
 *  - draft         written by the site author (e.g. mindset statements); hidden in
 *                  production builds until you approve it and change the status
 */
export type ContentStatus = 'verified' | 'needs-review' | 'draft';

/** R1–R5 are the five resumes, oldest first; P1–P4 are the papers; L1 is the LinkedIn export. See `sources.ts`. */
export type SourceDoc = 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'P1' | 'P2' | 'P3' | 'P4' | 'L1';

export interface SourceRef {
  doc: SourceDoc;
  /** Where in the document, e.g. "Experience › Lumel › bullet 3". */
  locator: string;
}

export interface Sourced {
  status: ContentStatus;
  sources: SourceRef[];
  /** Reviewer note, shown only in development. */
  reviewNote?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Organisation {
  name: string;
  /** Neutral description used when `siteConfig.showEmployerNames` is false. */
  descriptor: string;
}

export type MotifKind =
  | 'circuit'
  | 'layers'
  | 'query-tree'
  | 'scatter'
  | 'flows'
  | 'mesh'
  | 'dag'
  | 'retrieval'
  | 'agents';

export interface DraftReflection {
  learned: string[];
  thinking: string;
  status: ContentStatus;
}

export interface Milestone extends Sourced {
  id: string;
  /** Short label for the year navigation. */
  navLabel: string;
  /** Large year shown on the timeline. */
  year: string;
  period: string;
  phase: string;
  org?: Organisation;
  roles?: string[];
  technologies: string[];
  building: string[];
  challenges: string[];
  metrics?: Metric[];
  /** Shown when the milestone is expanded. */
  details: string[];
  reflection?: DraftReflection;
  motif: MotifKind;
  /** 0 = cyan, 1 = violet. Drives the milestone's accent colour. */
  accent: number;
}

export interface IntroConcept {
  year: number;
  label: string;
}

export type TechCategory =
  | 'programming'
  | 'hardware'
  | 'frontend'
  | 'backend'
  | 'data'
  | 'cloud'
  | 'ml'
  | 'genai'
  | 'agentic'
  | 'architecture';

export interface TechNode {
  id: string;
  label: string;
  category: TechCategory;
  /** Year the technology first appears in a document. */
  firstSeen: number;
  /**
   * project:     used in documented work
   * skills-list: only listed as a skill, course or training
   */
  evidence: 'project' | 'skills-list';
  sources: SourceRef[];
}

/** A piece of documented work. Technologies in the same group are linked. */
export interface EvidenceGroup {
  id: string;
  label: string;
  year: number;
  techs: string[];
  sources: SourceRef[];
}

export type DiagramNodeKind = 'source' | 'ui' | 'service' | 'store' | 'model' | 'human' | 'external';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  kind: DiagramNodeKind;
  /** Position in a 640 × 280 coordinate space (node centre). */
  x: number;
  y: number;
  w?: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  bidirectional?: boolean;
  dashed?: boolean;
}

export interface Project extends Sourced {
  id: string;
  name: string;
  period: string;
  context: string;
  problem: string;
  stack: string[];
  contribution: string[];
  decisions?: string[];
  tradeoffs?: string[];
  outcome?: string;
  metrics?: Metric[];
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] };
}

export interface Paper extends Sourced {
  id: string;
  title: string;
  date: string;
  year: number;
  venue: string;
  area: string;
  problem: string;
  concepts: string[];
  role: string;
  link?: string;
  keyLearning?: { text: string; status: ContentStatus };
  relationship?: { text: string; status: ContentStatus };
}

export interface ComparisonSide {
  /** Evidence from the documents. Always shown. */
  evidence: string;
  /** Mindset phrasing. Draft until approved. */
  thinking: string;
  year: string;
  sources: SourceRef[];
}

export interface Comparison {
  id: string;
  topic: string;
  earlier: ComparisonSide;
  now: ComparisonSide;
  status: ContentStatus;
}

export interface Reflection extends Sourced {
  id: string;
  theme: string;
  statement: string;
  support: string;
}
