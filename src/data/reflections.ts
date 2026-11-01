import type { Comparison, Reflection } from './types';

/**
 * "Same Engineer. Different Thinking."
 * `evidence` is taken from the documents and always shown.
 * `thinking` is author wording: it stays hidden in production until the
 * comparison's status is changed from 'draft'.
 */
export const comparisons: Comparison[] = [
  {
    id: 'role',
    topic: 'Scope of ownership',
    status: 'verified',
    earlier: {
      year: '2019',
      evidence: 'Career objective: complete assigned tasks well, and improve under the guidance of mentors and seniors.',
      thinking: 'What am I asked to build, and how do I do it well?',
      sources: [{ doc: 'R1', locator: 'Career Objective' }],
    },
    now: {
      year: '2026',
      evidence: 'Leads teams of 8+ developers; responsible for architecture governance and technical decisions.',
      thinking: 'What should be built, by whom, and what will it cost to keep running?',
      sources: [{ doc: 'R5', locator: 'Experience › Tiger Analytics, last bullet' }],
    },
  },
  {
    id: 'performance',
    topic: 'Application development',
    status: 'verified',
    earlier: {
      year: '2019',
      evidence: 'Feature add-ons and bug fixes across the layers of an existing product.',
      thinking: 'How do I implement this feature inside the current design?',
      sources: [{ doc: 'R4', locator: 'Work Experience › GoFrugal' }],
    },
    now: {
      year: '2021–22',
      evidence: 'Re-architected backend processing and APIs for high-volume concurrent users; up to 83% faster processing.',
      thinking: 'Where does the time go, and which part of the design causes it?',
      sources: [
        { doc: 'R4', locator: 'Work Experience › Visual BI, Lumel' },
        { doc: 'R5', locator: 'Experience › Lumel, bullets 2, 5' },
      ],
    },
  },
  {
    id: 'data',
    topic: 'Data and reliability',
    status: 'verified',
    earlier: {
      year: '2019',
      evidence: 'Data Pipette: records from hospitals with different schemas pushed into one central database.',
      thinking: 'How do I get the data into one place?',
      sources: [{ doc: 'R2', locator: 'Projects › Data Pipette' }],
    },
    now: {
      year: '2025',
      evidence: 'Regulatory reporting with audit-ready lineage; forecasting pipelines with validation and error handling.',
      thinking: 'Can every number be traced, and what happens when an input is wrong?',
      sources: [{ doc: 'R5', locator: 'Experience › Tiger Analytics, bullets 6–7' }],
    },
  },
  {
    id: 'ai',
    topic: 'AI system evaluation',
    status: 'verified',
    earlier: {
      year: '2019',
      evidence: 'IoT prototypes, such as a soil sensor that estimates pesticide presence from emitted residues.',
      thinking: 'Does it produce the right output?',
      sources: [{ doc: 'R1', locator: 'Mini Projects' }],
    },
    now: {
      year: '2025–26',
      evidence: 'RAG answers pass human validation and feed back into the system; the IVR keeps personal data away from people.',
      thinking: 'Is the system safe and correct around the model, not just at it?',
      sources: [{ doc: 'R5', locator: 'Experience › Tiger Analytics, bullets 2, 8' }],
    },
  },
];

/** "What Changed Wasn't Just My Tech Stack." All drafts until approved. */
export const reflections: Reflection[] = [
  {
    id: 'layers',
    theme: 'From implementation to architecture',
    statement: 'In 2019 the unit of work was a feature inside someone else’s layers. Later, the work was deciding the layers.',
    support: 'Gofrugal layered features → Lumel re-architecture → Tiger architecture governance.',
    status: 'verified',
    sources: [{ doc: 'R4', locator: 'Work Experience' }, { doc: 'R5', locator: 'Experience' }],
  },
  {
    id: 'performance',
    theme: 'Performance is a design property',
    statement: 'The largest documented speed-up came from redesigning how data moved through the backend, not from tuning one query.',
    support: 'Up to 83% through query optimisation, workflow redesign and data transformation changes.',
    status: 'verified',
    sources: [{ doc: 'R5', locator: 'Experience › Lumel, bullet 5' }],
  },
  {
    id: 'integration',
    theme: 'The same problem, higher stakes',
    statement: 'Integrating mismatched data never went away. What changed was the cost of getting it wrong.',
    support: 'Hospital schemas (2019) → third-party APIs (2021) → regulatory lineage (2026).',
    status: 'verified',
    sources: [{ doc: 'R2', locator: 'Projects' }, { doc: 'R5', locator: 'Experience' }],
  },
  {
    id: 'systems',
    theme: 'Systems, not components',
    statement: 'A writeback framework or a peer-to-peer grid is only as good as its slowest, least consistent path.',
    support: 'Two-way Power BI sync; re-architected collaboration grid.',
    status: 'verified',
    sources: [{ doc: 'R4', locator: 'Lumel' }, { doc: 'R5', locator: 'Lumel' }],
  },
  {
    id: 'evaluation',
    theme: 'Evaluating AI beyond its output',
    statement: 'A correct answer from a model is necessary, not sufficient. Review, feedback and data boundaries are part of the system.',
    support: 'Human-in-the-loop RAG; an IVR designed so that no person sees caller PII.',
    status: 'verified',
    sources: [{ doc: 'R5', locator: 'Experience › Tiger Analytics, bullets 2, 8' }],
  },
  {
    id: 'production',
    theme: 'Experiments versus production',
    statement: 'Prototypes prove an idea once. Production systems have to prove it every day, with an audit trail.',
    support: 'Student IoT prototypes → platforms with audit-ready lineage.',
    status: 'verified',
    sources: [{ doc: 'R1', locator: 'Mini Projects' }, { doc: 'R5', locator: 'Experience' }],
  },
];
