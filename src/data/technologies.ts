import type { EvidenceGroup, TechCategory, TechNode } from './types';

/**
 * Years the technology graph can show: one per calendar year, matching the
 * timeline. Work from roles that span two years sits in the same year as on
 * the timeline.
 */
export const graphYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
export type GraphYear = (typeof graphYears)[number];

export const categories: { id: TechCategory; label: string }[] = [
  { id: 'hardware', label: 'Hardware & IoT' },
  { id: 'programming', label: 'Programming' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'architecture', label: 'Architecture & Practice' },
  { id: 'data', label: 'Data & Analytics' },
  { id: 'cloud', label: 'Cloud & Platforms' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'genai', label: 'Generative AI' },
  { id: 'agentic', label: 'Agentic AI' },
];

const R1 = { doc: 'R1', locator: 'Mini Projects / Workshops' } as const;
const R2 = { doc: 'R2', locator: 'Technical Skills / Certifications' } as const;
const R4 = { doc: 'R4', locator: 'Skills / Work Experience' } as const;
const R5 = { doc: 'R5', locator: 'Skills / Experience' } as const;
const P4 = { doc: 'P4', locator: 'Journal paper, Apr 2020' } as const;
const PAPERS = { doc: 'P3', locator: 'Conference papers P1–P3' } as const;
const L1 = { doc: 'L1', locator: 'Experience › Tiger Analytics (dated roles)' } as const;

export const techNodes: TechNode[] = [
  // Hardware & IoT
  { id: 'iot', label: 'Embedded & IoT', category: 'hardware', firstSeen: 2019, evidence: 'project', sources: [R1, R2] },

  // Programming
  { id: 'c', label: 'C / embedded C', category: 'programming', firstSeen: 2019, evidence: 'project', sources: [R2, PAPERS] },
  { id: 'cpp', label: 'C++', category: 'programming', firstSeen: 2019, evidence: 'skills-list', sources: [R2] },
  { id: 'java', label: 'Java', category: 'programming', firstSeen: 2019, evidence: 'project', sources: [R2, R4] },
  { id: 'python', label: 'Python', category: 'programming', firstSeen: 2019, evidence: 'project', sources: [R2, R4, R5] },
  { id: 'javascript', label: 'JavaScript', category: 'programming', firstSeen: 2019, evidence: 'project', sources: [R2, R4] },
  { id: 'php', label: 'PHP', category: 'programming', firstSeen: 2019, evidence: 'skills-list', sources: [R2] },
  { id: 'sql', label: 'SQL', category: 'programming', firstSeen: 2019, evidence: 'project', sources: [R2, R4, R5] },
  { id: 'typescript', label: 'TypeScript', category: 'programming', firstSeen: 2022, evidence: 'project', sources: [R4, R5, L1] },

  // Frontend
  { id: 'html-css', label: 'HTML / CSS', category: 'frontend', firstSeen: 2019, evidence: 'skills-list', sources: [R2] },
  { id: 'angular', label: 'Angular', category: 'frontend', firstSeen: 2019, evidence: 'project', sources: [R2, R4] },
  { id: 'react', label: 'React', category: 'frontend', firstSeen: 2020, evidence: 'project', sources: [R4, R5] },
  { id: 'd3', label: 'D3.js', category: 'frontend', firstSeen: 2020, evidence: 'project', sources: [P4] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', firstSeen: 2020, evidence: 'project', sources: [R4] },

  // Backend & APIs
  { id: 'jersey', label: 'Jersey (JAX-RS)', category: 'backend', firstSeen: 2019, evidence: 'project', sources: [R4] },
  { id: 'microservices', label: 'Microservices', category: 'backend', firstSeen: 2019, evidence: 'project', sources: [R4, R5] },
  { id: 'rest-apis', label: 'REST APIs', category: 'backend', firstSeen: 2021, evidence: 'project', sources: [R4, R5] },
  { id: 'fastapi', label: 'FastAPI', category: 'backend', firstSeen: 2021, evidence: 'project', sources: [R4, R5] },
  { id: 'nodejs', label: 'Node.js', category: 'backend', firstSeen: 2022, evidence: 'project', sources: [R5] },

  // Architecture & practice
  { id: 'layered-arch', label: 'Layered architecture', category: 'architecture', firstSeen: 2019, evidence: 'project', sources: [R4] },
  { id: 'distributed', label: 'Distributed systems', category: 'architecture', firstSeen: 2019, evidence: 'skills-list', sources: [R2] },
  { id: 'performance', label: 'Performance', category: 'architecture', firstSeen: 2021, evidence: 'project', sources: [R4, R5] },
  { id: 'mentoring', label: 'Mentoring', category: 'architecture', firstSeen: 2021, evidence: 'project', sources: [R4, R5] },
  { id: 'p2p', label: 'Peer-to-peer grid', category: 'architecture', firstSeen: 2022, evidence: 'project', sources: [R4] },
  { id: 'monorepo', label: 'Mono-repo', category: 'architecture', firstSeen: 2022, evidence: 'project', sources: [R4] },
  { id: 'governance', label: 'Governance & lineage', category: 'architecture', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'solution-arch', label: 'Solution architecture', category: 'architecture', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },

  // Data & analytics
  { id: 'data-integration', label: 'Data integration', category: 'data', firstSeen: 2019, evidence: 'project', sources: [R2, R4, R5] },
  { id: 'mysql', label: 'MySQL', category: 'data', firstSeen: 2019, evidence: 'project', sources: [R2, P4] },
  { id: 'postgres', label: 'PostgreSQL', category: 'data', firstSeen: 2019, evidence: 'project', sources: [R2] },
  { id: 'oracle', label: 'Oracle RDBMS', category: 'data', firstSeen: 2019, evidence: 'project', sources: [R2, R4] },
  { id: 'hadoop', label: 'Hadoop', category: 'data', firstSeen: 2019, evidence: 'skills-list', sources: [R2] },
  { id: 'etl', label: 'ETL & data warehouse', category: 'data', firstSeen: 2020, evidence: 'project', sources: [P4, R5] },
  { id: 'power-bi', label: 'Power BI', category: 'data', firstSeen: 2022, evidence: 'project', sources: [R5] },
  { id: 'singlestore', label: 'SingleStore', category: 'data', firstSeen: 2022, evidence: 'project', sources: [R5] },
  { id: 'snowflake', label: 'Snowflake', category: 'data', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'databricks', label: 'Databricks', category: 'data', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'fabric', label: 'Microsoft Fabric', category: 'data', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'tableau', label: 'Tableau', category: 'data', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'spark-airflow', label: 'Spark / Airflow', category: 'data', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },

  // Cloud & platforms
  { id: 'cloud', label: 'Cloud computing', category: 'cloud', firstSeen: 2019, evidence: 'project', sources: [R1, R2] },
  { id: 'ci-cd', label: 'CI/CD · Jenkins', category: 'cloud', firstSeen: 2022, evidence: 'skills-list', sources: [R4, R5] },
  { id: 'power-platform', label: 'Power Platform', category: 'cloud', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'adf', label: 'Azure Data Factory', category: 'cloud', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'azure-functions', label: 'Azure Functions', category: 'cloud', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'azure-sql', label: 'Azure SQL', category: 'cloud', firstSeen: 2023, evidence: 'project', sources: [R5, L1] },
  { id: 'dataverse', label: 'Dataverse', category: 'cloud', firstSeen: 2023, evidence: 'project', sources: [R5, L1] },
  { id: 'dynamics', label: 'Dynamics 365 · AI Builder', category: 'cloud', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },
  { id: 'containers', label: 'Docker / Kubernetes', category: 'cloud', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },
  { id: 'aws-gcp', label: 'AWS / GCP', category: 'cloud', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },

  // Machine learning
  { id: 'dialogflow', label: 'Dialogflow (NLU)', category: 'ml', firstSeen: 2019, evidence: 'project', sources: [R2] },
  { id: 'regression', label: 'Regression models', category: 'ml', firstSeen: 2020, evidence: 'project', sources: [P4] },
  { id: 'xgboost', label: 'XGBoost ensembles', category: 'ml', firstSeen: 2020, evidence: 'project', sources: [P4] },
  { id: 'nlp', label: 'NLP models', category: 'ml', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },
  { id: 'rlhf', label: 'RLHF', category: 'ml', firstSeen: 2022, evidence: 'project', sources: [R5, L1] },

  // Generative AI
  { id: 'rag', label: 'RAG', category: 'genai', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'llms', label: 'LLMs · Azure OpenAI', category: 'genai', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'azure-ai', label: 'Azure AI services', category: 'genai', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'hitl', label: 'Human-in-the-loop', category: 'genai', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'copilot-studio', label: 'Copilot Studio', category: 'genai', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },
  { id: 'github-copilot', label: 'GitHub Copilot', category: 'genai', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },
  { id: 'vector-db', label: 'Vector databases', category: 'genai', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },
  { id: 'ml-platforms', label: 'HF / Vertex / Bedrock', category: 'genai', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },

  // Agentic AI
  { id: 'ai-agents', label: 'Custom AI agents', category: 'agentic', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'langchain', label: 'LangChain', category: 'agentic', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'langgraph', label: 'LangGraph', category: 'agentic', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'autogen', label: 'AutoGen', category: 'agentic', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'n8n', label: 'n8n', category: 'agentic', firstSeen: 2025, evidence: 'project', sources: [R5, L1] },
  { id: 'conversational', label: 'Conversational AI', category: 'agentic', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },
  { id: 'evals', label: 'LLM evaluation', category: 'agentic', firstSeen: 2026, evidence: 'project', sources: [R5, L1] },
  { id: 'mcp', label: 'MCP', category: 'agentic', firstSeen: 2026, evidence: 'skills-list', sources: [R5] },
];

/**
 * Documented pieces of work. Technologies used in the same piece of work are
 * connected in the graph; the number of groups a node appears in sets its size.
 */
export const evidenceGroups: EvidenceGroup[] = [
  // Student and early work
  { id: 'iot-papers', label: 'Conference papers (embedded, IoT, cloud)', year: 2019, techs: ['iot', 'cloud', 'c'], sources: [R2, PAPERS] },
  { id: 'data-pipette', label: 'Data Pipette (electronic medical records)', year: 2019, techs: ['data-integration', 'sql', 'python', 'postgres', 'dialogflow'], sources: [R2] },
  { id: 'gofrugal-hq', label: 'POS HQ features & integrations', year: 2019, techs: ['java', 'jersey', 'angular', 'sql', 'microservices', 'layered-arch'], sources: [R4, R5] },
  { id: 'warehouse-paper', label: 'Warehouse ML paper (journal)', year: 2020, techs: ['regression', 'xgboost', 'etl', 'data-integration', 'd3', 'angular', 'mysql'], sources: [P4] },

  // Visual BI / Lumel
  { id: 'admin-console', label: 'Admin Console migration', year: 2020, techs: ['react', 'tailwind'], sources: [R4] },
  { id: 'oracle-support', label: 'Oracle RDBMS support', year: 2020, techs: ['oracle', 'sql'], sources: [R4] },
  { id: 'metrics', label: 'Customer data integration & metrics', year: 2021, techs: ['data-integration', 'rest-apis', 'sql'], sources: [R4] },
  { id: 'backend-perf', label: 'Backend processing redesign', year: 2021, techs: ['performance', 'sql'], sources: [R4, R5] },
  { id: 'mentoring-2021', label: 'Mentoring new backend developers', year: 2021, techs: ['mentoring'], sources: [R4] },
  { id: 'revamp', label: 'Product revamp & REST APIs', year: 2021, techs: ['fastapi', 'python', 'rest-apis', 'javascript'], sources: [R4] },
  { id: 'collab', label: 'Collaborative environment', year: 2022, techs: ['p2p', 'monorepo'], sources: [R4] },
  { id: 'writeback', label: 'Power BI writeback framework', year: 2022, techs: ['react', 'nodejs', 'python', 'power-bi'], sources: [R5] },
  { id: 'lumel-analytics', label: 'Enterprise analytics optimisation', year: 2022, techs: ['power-bi', 'sql', 'singlestore', 'oracle', 'performance'], sources: [R5] },

  // Tiger Analytics · Senior Software Engineer (Aug 2022 – Jul 2023), shown in 2022
  { id: 'incident', label: 'Incident intelligence (NLP, RLHF)', year: 2022, techs: ['nlp', 'rlhf', 'snowflake', 'sql', 'data-integration', 'etl'], sources: [R5, L1] },
  { id: 'drift', label: 'Portfolio drift reporting', year: 2022, techs: ['power-platform', 'adf', 'governance'], sources: [R5, L1] },
  { id: 'sustainability', label: 'Sustainability compliance platform', year: 2022, techs: ['power-platform', 'power-bi'], sources: [L1] },
  { id: 'buy-sell', label: 'Buy/sell analytics platform', year: 2022, techs: ['power-platform', 'azure-functions'], sources: [R5, L1] },

  // Tiger Analytics · Lead Engineer (Jul 2023 – Aug 2024), shown in 2023
  { id: 'legacy', label: 'Legacy process modernisation', year: 2023, techs: ['power-platform', 'fastapi', 'azure-sql', 'power-bi', 'rest-apis'], sources: [R5, L1] },
  { id: 'trade', label: 'Trade automation platform', year: 2023, techs: ['power-platform', 'adf', 'data-integration'], sources: [R5, L1] },
  { id: 'prospect', label: 'Prospect intelligence platform', year: 2023, techs: ['power-platform', 'snowflake', 'react', 'typescript', 'python'], sources: [R5, L1] },
  { id: 'report-publisher', label: 'Report Publisher', year: 2023, techs: ['power-platform', 'power-bi', 'dataverse'], sources: [R5, L1] },

  // Tiger Analytics · Senior Lead (Jul 2024 – Dec 2025), shown in 2025
  { id: 'rag-support', label: 'RAG document support', year: 2025, techs: ['rag', 'llms', 'azure-ai', 'react', 'python', 'hitl'], sources: [R5, L1] },
  { id: 'orchestration', label: 'AI orchestration frameworks', year: 2025, techs: ['langchain', 'langgraph', 'autogen', 'n8n', 'ai-agents', 'databricks', 'snowflake', 'azure-functions'], sources: [R5, L1] },
  { id: 'regulatory', label: 'Regulatory reporting automation', year: 2025, techs: ['power-platform', 'databricks', 'governance'], sources: [R5, L1] },
  { id: 'forecast', label: 'Forecasting platform', year: 2025, techs: ['power-platform', 'fastapi', 'python', 'fabric', 'power-bi'], sources: [R5, L1] },
  { id: 'bi-admin', label: 'BI admin automation', year: 2025, techs: ['power-bi', 'tableau', 'fabric', 'rest-apis'], sources: [R5, L1] },

  // Tiger Analytics · Lead AIML Engineer / AI Architect (Jan 2026 →)
  { id: 'kpi-agents', label: 'GenAI KPI validation', year: 2026, techs: ['copilot-studio', 'llms', 'ai-agents', 'power-bi', 'tableau'], sources: [R5, L1] },
  { id: 'ivr', label: 'Conversational IVR', year: 2026, techs: ['llms', 'copilot-studio', 'dynamics', 'dataverse', 'conversational'], sources: [R5, L1] },
  { id: 'agent-assist', label: 'Agent Assist', year: 2026, techs: ['dynamics', 'dataverse', 'conversational'], sources: [R5, L1] },
  { id: 'copilot-workshop', label: 'GitHub Copilot workshop & LLM evaluation', year: 2026, techs: ['github-copilot', 'evals', 'llms'], sources: [R5, L1] },
  { id: 'leadership', label: 'Team leadership', year: 2026, techs: ['solution-arch', 'mentoring'], sources: [R5] },
];
