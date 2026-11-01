import type { Paper } from './types';

/**
 * Summaries are taken from the papers themselves (P1–P4 in
 * "Resume Collections/Papers", which is git-ignored). The PDFs are not
 * published: they contain co-authors' contact details. Add `link` when a paper
 * has a public URL.
 */
export const papers: Paper[] = [
  {
    id: 'power-transmission',
    title: 'Power Transmission Control – Automation using Wifi Technology',
    date: 'Mar 2018',
    year: 2018,
    venue: 'ICIETET 2018 · Third International Conference on Innovative and Emerging Trends in Engineering and Technology, Panimalar Institute of Technology',
    area: 'Embedded systems · Fault isolation',
    problem:
      'A broken transmission line keeps carrying current, and the usual response trips the whole line, including supply to hospitals. The system finds the exact broken line and cuts only that one.',
    concepts: ['NAND / AND gate logic per pole', 'Arduino UNO', 'GSM alerts', 'Relay circuit breaker'],
    role: 'First author · 3 authors',
    keyLearning: { status: 'verified', text: 'Isolating a fault precisely matters as much as detecting it.' },
    relationship: { status: 'verified', text: 'An early version of a recurring concern: limiting the blast radius of a failure.' },
    status: 'verified',
    sources: [
      { doc: 'P1', locator: 'Abstract; IV Proposed System; VII Working' },
      { doc: 'R2', locator: 'Technical Conferences #1' },
    ],
  },
  {
    id: 'coal-mine',
    title: 'Coal Mine Accidents Detection and Automation System',
    date: 'Oct 2018',
    year: 2018,
    venue: 'ITsFEW · International Conference on Innovative and Emerging Technologies for Farming, Energy, Environment and Water, Vellore Institute of Technology',
    area: 'IoT · Cloud monitoring',
    problem:
      'Mine monitoring built on sensor networks alone sends data to nodal points, which is unreliable in an emergency. This design logs gas, pressure and temperature readings to the cloud, classifies them as minimal risk, risk or emergency, and sends alerts back to the mine and to the authorities.',
    concepts: ['Gas, pressure and temperature sensors', 'AVR microcontroller', 'ESP8266', 'Cloud data logging', 'Threshold-based risk levels'],
    role: 'First author · 2 authors',
    keyLearning: { status: 'verified', text: 'An alert is only useful if the path from sensor to person is reliable when it matters most.' },
    status: 'verified',
    sources: [
      { doc: 'P2', locator: 'Abstract; V Proposed System; VI Architecture' },
      { doc: 'R2', locator: 'Technical Conferences #2' },
    ],
  },
  {
    id: 'transparency-farming',
    title: 'Transparency Farming – A Cloud Based Analysis of Presence of Pesticides in the Agricultural Soil',
    date: 'Feb 2019',
    year: 2019,
    venue: 'NCCTTB 2019 · Seventh National Conference on Computing Technologies Today’s and Beyond, R.M.K College of Engineering and Technology',
    area: 'IoT · Cloud analytics',
    problem:
      'Pesticide levels are usually only measured in the harvested crop. The device estimates pesticide presence in the field from gases released in the soil (CO₂, SO₂ and others), compares readings with reference data in the cloud, and alerts when a threshold is reached.',
    concepts: ['MQ-series and soil-moisture sensors', 'AVR microcontroller', 'Cloud reference data', 'Threshold alerts'],
    role: 'Sole author',
    keyLearning: { status: 'verified', text: 'Measuring something indirectly means the analysis carries as much weight as the sensor.' },
    relationship: { status: 'verified', text: 'The first project where the data pipeline, not the device, was the point.' },
    status: 'verified',
    sources: [
      { doc: 'P3', locator: 'Abstract; II Problem Statement; V Proposed System' },
      { doc: 'R2', locator: 'Technical Conferences #3' },
    ],
  },
  {
    id: 'warehouse-ml',
    title: 'Ecommerce Warehousing Management System Using Logistic Regression',
    date: 'Apr 2020',
    year: 2020,
    venue: 'VDGOOD Journal of Computer Science Engineering · accepted April 2020',
    area: 'Machine learning · Data engineering',
    problem:
      'Warehouse decisions depend on stock and sales data spread across CRM, ERP, billing and supply-chain systems. The design brings that data together through ETL into a warehouse, predicts stock with logistic regression and sales with regression models, and shows the results in D3.js dashboards.',
    concepts: ['ETL into a data warehouse', 'Logistic & constrained linear regression', 'Ensembles incl. XGBoost (MAE / RMSE)', 'D3.js + Angular 8'],
    role: 'Co-author · 4 authors',
    keyLearning: { status: 'verified', text: 'A model is only as good as the pipeline that feeds it.' },
    relationship: { status: 'verified', text: 'The first documented machine-learning work, and an early outline of the data platforms built later.' },
    status: 'verified',
    sources: [{ doc: 'P4', locator: 'Abstract; 4 Proposed System; 5 Architecture' }],
  },
];

export interface Presentation {
  title: string;
  area: string;
  /** What it was about. Omitted where the documents give only the title. */
  summary?: string;
  concepts: string[];
  icon: 'bus' | 'brain' | 'book' | 'speaker';
  /** Where it was presented, when known. */
  venue?: string;
}

/**
 * Paper presentations at college symposiums, 2017–2019, as main author
 * (Resume 1 › Paper Presentations). Presented, not published. Summaries come
 * from the matching mini-project descriptions in the same resume, and for
 * "Educate the Required" from the paper itself (Papers/…-Techastra.docx).
 */
export const otherPresentations: Presentation[] = [
  {
    title: 'Government Bus Tracking System – using Mesh Technology',
    area: 'Embedded · Networks',
    summary:
      'Tracks a bus and sends passengers its distance from their stop and an estimated arrival time. A mesh network along the route relays the data, so a single failed link doesn’t delay it.',
    concepts: ['Mesh networking', 'Redundant routes', 'Live location'],
    icon: 'bus',
  },
  {
    title: 'Public Address System',
    area: 'Speech · Accessibility',
    summary:
      'Converts loudspeaker and megaphone announcements at busy transport stations into live text, so passengers can read what they can’t hear over the noise.',
    concepts: ['Speech to text', 'Real-time', 'Accessibility'],
    icon: 'speaker',
  },
  {
    title: 'Implementation of Blue Brain Project using Titan Computers',
    area: 'High-performance computing',
    summary: 'On running the Blue Brain Project, a large-scale simulation of brain circuits, on Titan-class supercomputers.',
    concepts: ['Brain simulation', 'Supercomputing'],
    icon: 'brain',
  },
  {
    title: 'Educate the Required',
    area: 'Mobile & web · Social impact',
    summary:
      'Two connected apps that match funders with students who need support for their education. Funders set the range and strategy of what they can give in "Tap to Educate"; students register their needs in "Tap for Education". Matching by funding range and location shows each side only the relevant people.',
    concepts: ['Two-sided matching', 'Mobile + web apps', 'Location-based ranges'],
    icon: 'book'
  },
];
