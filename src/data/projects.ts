import type { Project } from './types';

/**
 * Case studies. Fields that the documents don't cover (for example trade-offs)
 * are left out rather than filled in. Diagrams show only components named in
 * the source; positions are in a 640 × 280 space.
 */
export const projects: Project[] = [
  {
    id: 'data-pipette',
    name: 'Data Pipette',
    period: '2017–2019 · student project',
    context: 'Academic project · electronic medical records',
    problem:
      'Hospitals stored electronic medical records under different schemas. The records needed to reach one central database and be retrieved from there, including by people asking in plain language.',
    stack: ['Python', 'PostgreSQL', 'Dialogflow', 'Electronic medical records'],
    contribution: [
      'Built the pipeline in Python that brings records from each hospital system into a central PostgreSQL database.',
      'Added a Dialogflow conversational interface for retrieving records.',
    ],
    decisions: ['Consolidate into one central store instead of querying each hospital system on demand.'],
    diagram: {
      nodes: [
        { id: 'h1', label: 'Hospital A', sublabel: 'EMR schema A', kind: 'source', x: 75, y: 60 },
        { id: 'h2', label: 'Hospital B', sublabel: 'EMR schema B', kind: 'source', x: 75, y: 140 },
        { id: 'h3', label: 'Hospital C', sublabel: 'EMR schema C', kind: 'source', x: 75, y: 220 },
        { id: 'etl', label: 'Python pipeline', kind: 'service', x: 245, y: 140, w: 120 },
        { id: 'db', label: 'PostgreSQL', sublabel: 'central store', kind: 'store', x: 410, y: 140 },
        { id: 'bot', label: 'Dialogflow', sublabel: 'conversational', kind: 'model', x: 570, y: 140 },
      ],
      edges: [
        { from: 'h1', to: 'etl' },
        { from: 'h2', to: 'etl', label: 'push' },
        { from: 'h3', to: 'etl' },
        { from: 'etl', to: 'db' },
        { from: 'db', to: 'bot', label: 'query', bidirectional: true },
      ],
    },
    status: 'verified',
    sources: [
      { doc: 'R1', locator: 'Application Development › Selective Health data Pipette' },
      { doc: 'R2', locator: 'Projects › Data Pipette' },
    ],
    reviewNote: 'Stack (Python, PostgreSQL, Dialogflow) confirmed by you; not in the documents.',
  },
  {
    id: 'pos-integrations',
    name: 'POS HQ features and integrations',
    period: 'Jul 2019 – Mar 2020',
    context: 'Retail point-of-sale software company',
    problem:
      'The HQ product needed new features for a growing customer base, plus inbound and outbound integration with the base POS products.',
    stack: ['Java (Jersey)', 'Angular 8', 'SQL', 'Microservices'],
    contribution: [
      'Full-stack features in Java (Jersey) and Angular 8.',
      'Feature add-ons and bug fixes across the business, application and data-management layers.',
      'Inbound and outbound integrations with the base POS products.',
    ],
    diagram: {
      nodes: [
        { id: 'ui', label: 'Angular 8 UI', kind: 'ui', x: 80, y: 140 },
        { id: 'biz', label: 'Business layer', kind: 'service', x: 260, y: 70, w: 140 },
        { id: 'appl', label: 'Application layer', kind: 'service', x: 260, y: 140, w: 140 },
        { id: 'data', label: 'Data management', kind: 'service', x: 260, y: 210, w: 140 },
        { id: 'sql', label: 'SQL', kind: 'store', x: 440, y: 210 },
        { id: 'pos', label: 'POS products', kind: 'external', x: 560, y: 90 },
      ],
      edges: [
        { from: 'ui', to: 'appl', label: 'Jersey' },
        { from: 'appl', to: 'biz' },
        { from: 'appl', to: 'data' },
        { from: 'data', to: 'sql' },
        { from: 'biz', to: 'pos', label: 'in / out', bidirectional: true },
      ],
    },
    status: 'verified',
    sources: [
      { doc: 'R4', locator: 'Work Experience › GoFrugal' },
      { doc: 'R5', locator: 'Experience › Java Developer Intern' },
    ],
  },
  {
    id: 'writeback',
    name: 'Power BI writeback framework',
    period: '2022',
    context: 'Business-intelligence product company',
    problem:
      'Dashboards were read-only. Changing the underlying data meant exporting, editing and uploading it by hand.',
    stack: ['React', 'Node.js', 'Python', 'Power BI custom visuals'],
    contribution: ['Designed a custom writeback framework for two-way data sync between Power BI dashboards and enterprise databases.'],
    decisions: ['Put the editing surface inside the dashboard as a custom visual, with a service layer that syncs changes in both directions.'],
    outcome: 'Removed the manual export and upload steps.',
    diagram: {
      nodes: [
        { id: 'dash', label: 'Power BI dashboard', kind: 'ui', x: 100, y: 140, w: 150 },
        { id: 'visual', label: 'Custom visual', sublabel: 'React', kind: 'ui', x: 100, y: 230, w: 130 },
        { id: 'svc', label: 'Sync service', sublabel: 'Node.js · Python', kind: 'service', x: 340, y: 140, w: 150 },
        { id: 'db', label: 'Enterprise DB', kind: 'store', x: 560, y: 140 },
      ],
      edges: [
        { from: 'visual', to: 'dash', dashed: true },
        { from: 'dash', to: 'svc', label: 'read / write', bidirectional: true },
        { from: 'svc', to: 'db', bidirectional: true },
      ],
    },
    status: 'verified',
    sources: [{ doc: 'R5', locator: 'Experience › Lumel, bullet 6' }],
  },
  {
    id: 'legacy-modernisation',
    name: 'Legacy process modernisation',
    period: '2023',
    context: 'Fortune 500 client',
    problem: 'A 20-year-old business process ran on manual input.',
    stack: ['Power Apps', 'FastAPI', 'Azure SQL', 'Power BI', 'Enterprise data lakes'],
    contribution: ['Directed the platform build.'],
    outcome: 'Manual inputs removed from the process.',
    metrics: [
      { value: '150+', label: 'APIs' },
      { value: '114', label: 'workflows' },
    ],
    diagram: {
      nodes: [
        { id: 'apps', label: 'Power Apps', kind: 'ui', x: 80, y: 140 },
        { id: 'api', label: 'FastAPI', sublabel: '150+ APIs', kind: 'service', x: 260, y: 90 },
        { id: 'flows', label: 'Workflows', sublabel: '114', kind: 'service', x: 260, y: 200 },
        { id: 'sql', label: 'Azure SQL', kind: 'store', x: 440, y: 90 },
        { id: 'lake', label: 'Data lake', kind: 'store', x: 440, y: 200 },
        { id: 'bi', label: 'Power BI', kind: 'ui', x: 570, y: 140 },
      ],
      edges: [
        { from: 'apps', to: 'api' },
        { from: 'apps', to: 'flows' },
        { from: 'api', to: 'sql' },
        { from: 'flows', to: 'lake' },
        { from: 'sql', to: 'bi' },
        { from: 'lake', to: 'bi' },
      ],
    },
    status: 'verified',
    sources: [
      { doc: 'R5', locator: 'Experience › Tiger Analytics, bullet 9' },
      { doc: 'L1', locator: 'Experience › Tiger Analytics › Lead Engineer' },
    ],
  },
  {
    id: 'rag-support',
    name: 'RAG document-support platform',
    period: '2025',
    context: 'Global consumer-goods company',
    problem:
      'Support tickets for subject-matter experts required finding answers across operational documents by hand.',
    stack: ['React', 'Python', 'Azure AI services'],
    contribution: ['Contributed to development of the platform.'],
    decisions: [
      'Index operational documents automatically and retrieve context per ticket.',
      'Keep a human validation step before AI-generated responses are used.',
      'Feed review outcomes back into the system through continuous-learning loops.',
    ],
    diagram: {
      nodes: [
        { id: 'docs', label: 'Ops documents', kind: 'source', x: 70, y: 60 },
        { id: 'index', label: 'Index', kind: 'store', x: 230, y: 60 },
        { id: 'ticket', label: 'SME ticket', kind: 'source', x: 70, y: 200 },
        { id: 'retrieve', label: 'Retrieve', kind: 'service', x: 230, y: 200 },
        { id: 'llm', label: 'LLM', sublabel: 'Azure AI', kind: 'model', x: 390, y: 200 },
        { id: 'review', label: 'Human review', kind: 'human', x: 560, y: 200 },
      ],
      edges: [
        { from: 'docs', to: 'index', label: 'index' },
        { from: 'ticket', to: 'retrieve' },
        { from: 'index', to: 'retrieve' },
        { from: 'retrieve', to: 'llm', label: 'context' },
        { from: 'llm', to: 'review', label: 'draft' },
        { from: 'review', to: 'index', label: 'feedback', dashed: true },
      ],
    },
    status: 'verified',
    sources: [
      { doc: 'R5', locator: 'Experience › Tiger Analytics, bullet 8' },
      { doc: 'L1', locator: 'Experience › Tiger Analytics › Senior Lead' },
    ],
  },
  {
    id: 'conversational-ivr',
    name: 'Conversational IVR',
    period: 'Jan 2026 – present',
    context: 'Enterprise client',
    problem:
      'A large volume of phone service requests had to be handled without exposing callers’ personal data to human agents.',
    stack: ['GPT-5', 'Copilot Studio', 'Dynamics 365', 'Dataverse'],
    contribution: ['Architected the system.'],
    decisions: ['Keep personal data inside the automated flow so that no person handles it.'],
    outcome: 'Requests automated, with lower operational overhead and no human PII exposure.',
    metrics: [
      { value: '200K+', label: 'requests a year' },
      { value: '~97%', label: 'accuracy' },
    ],
    diagram: {
      nodes: [
        { id: 'caller', label: 'Caller', kind: 'human', x: 70, y: 140 },
        { id: 'bot', label: 'Copilot Studio', sublabel: 'voice agent', kind: 'service', x: 240, y: 140, w: 140 },
        { id: 'llm', label: 'GPT-5', kind: 'model', x: 420, y: 60 },
        { id: 'crm', label: 'Dynamics 365', kind: 'external', x: 420, y: 220 },
        { id: 'dv', label: 'Dataverse', kind: 'store', x: 580, y: 220 },
      ],
      edges: [
        { from: 'caller', to: 'bot', bidirectional: true },
        { from: 'bot', to: 'llm', bidirectional: true },
        { from: 'bot', to: 'crm', bidirectional: true },
        { from: 'crm', to: 'dv' },
      ],
    },
    status: 'verified',
    sources: [
      { doc: 'R5', locator: 'Experience › Tiger Analytics, bullet 2' },
      { doc: 'L1', locator: 'Experience › Tiger Analytics › Lead AIML Engineer | AI Architect' },
    ],
  },
];
