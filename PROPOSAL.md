# The Evolution of an Engineer — Phase 1 Proposal

Status: **awaiting your approval**. Nothing has been built yet.

---

## 1. What I found in the repository

| File | Approx. date | Format | Notes |
|---|---|---|---|
| `Resume - 1 - After College.pdf` | early 2019 (lists an IIT Madras visit Feb 2019 and a Cognizant visit Mar 2019) | Scanned image | Student resume: mini-projects, conference papers, awards |
| `Resume - 2 - After Gofrugal.pdf` | ~2019–2020 | Text | First skills list; adds the Gofrugal Java internship |
| `Resume - 3 - After Gofrugal.pdf` | ~2019–2020 | Text | Almost the same as #2, but **the Gofrugal internship line is removed** |
| `Resume - 4 - After Lumel.pdf` | ~mid-2022 ("Senior Product Developer, 01/2022 – Present, 6 months") | Text | First professional resume: Gofrugal → Visual BI → Lumel |
| `Resume - 5 - After Tiger.pdf` | 2026 | Text | AI Architect / Lead AI Engineer at Tiger Analytics, Aug 2022 – present |

**No technical papers are in the directory.** The papers are only *referenced* inside the resumes (see §6).

The project folder is not a git repository yet, and there is no existing code.

---

## 2. Timeline from the documents

| Period | Where the evidence comes from | Technical substance |
|---|---|---|
| **2017–2019 · Prologue: building with hardware, the cloud and the web** | R1, R2 | IoT/embedded mini-projects (mesh-network bus tracking, power-line break detection, soil-pesticide sensing), web apps (hospital data pipeline "Data Pipette", MEDCOM, Student Monitor), conference papers on IoT + cloud, NPTEL Distributed Systems / Cloud Computing, Hadoop training, SIH 2019 finalist |
| **Jul 2019 – Mar 2020 · Enterprise software foundations** | R2, R4, R5 | Java (Jersey), Angular 8, SQL, microservices; work across the business, application and data-management layers; POS inbound/outbound integrations |
| **Apr 2020 – Jul 2021 · Data products and performance** | R4, R5 | React, Tailwind, migrating class components to functional components, Oracle RDBMS support, third-party secured API integration, metrics derivation over large customer data, backend redesign (**83% performance gain**), mentoring new backend developers |
| **Aug 2021 – Jul 2022 · Product architecture** | R4, R5 | Product revamp, FastAPI auth backend, REST APIs serving **1000+ concurrent users**, **re-architecting a peer-to-peer grid** for real-time collaboration, a visual-modelling product moved into a mono-repo, **Power BI writeback framework** (React + Node + Python, two-way sync) |
| **Aug 2022 → · Data and automation platforms at enterprise scale** | R5 | Power Platform, Databricks, Snowflake, ADF, Azure Functions, Fabric; regulatory reporting with audit-ready lineage; 150+ APIs and 114 workflows replacing a 20-year-old legacy process; forecasting platform with "what-if" simulation |
| **→ 2026 · Generative AI** | R5 | RAG document-support platform with human-in-the-loop validation and feedback loops; NLP + RLHF incident-classification pipeline; Copilot Studio / Azure OpenAI |
| **→ 2026 · Agentic systems and architecture** | R5 | Conversational IVR (GPT-5, ~97% accuracy, no human exposure to PII), Agent Assist, orchestration with LangChain / LangGraph / AutoGen / n8n, MCP, evaluation harnesses, guardrails, leading a team of 8+ engineers, architecture governance |

### Main transitions the documents support
1. **Hardware + academic prototypes → production enterprise software** (2019)
2. **Feature work → performance and data-heavy product engineering** (2020–21)
3. **Components → distributed, collaborative system design** (P2P grid, mono-repo, writeback; 2021–22)
4. **Product engineer → platform and automation architect for clients** (2022+)
5. **Automation → GenAI → agentic orchestration and evaluation** (2023?–2026, *dates needed*)

### Concept progression for the intro animation (based on the documents)
`Embedded & IoT Prototypes → Full-Stack Engineering → Data Products & Performance → Distributed Product Architecture → Data & Automation Platforms → Retrieval-Augmented AI → Agentic Systems`

---

## 3. Proposed information architecture

```
/ (single page, hash anchors only, so it works on GitHub Pages)
├─ 00 Intro            2019 → 2026 year counter, concepts that morph, headline, [Explore My Journey]
├─ 01 Timeline         sticky year rail + scroll-lit spine + 6 milestones you can expand
├─ 02 Tech Landscape   force-laid SVG graph with a year scrubber (2019 … 2026)
├─ 03 Then vs Now      "Same Engineer. Different Thinking." — a slider you drag between the two perspectives
├─ 04 Projects         "From Building Features to Engineering Systems" — 5–6 case studies with animated architecture diagrams
├─ 05 Research         "Exploring Beyond Implementation" — publication timeline
├─ 06 Reflections      "What Changed Wasn't Just My Tech Stack." — 5–6 typographic beats
└─ 07 Closing          "2019 was the beginning. 2026 isn't the destination." + a line that runs past the edge of the page
```

**Data layer** (`src/data/*.ts`, all typed): every entry carries `sources: { doc: 'R4', locator: 'Lumel – Product Developer, bullet 3' }[]` plus `status: 'verified' | 'needs-review' | 'draft'`. In a production build, entries marked `draft` are filtered out. The resumes live outside `src/` and `public/`, so Vite never bundles them.

**Technology graph data**: each technology node records `firstSeen` (year), `evidence: 'project' | 'skills-list'`, and `projects[]`. Edges are created only when two technologies appear together in the same documented project. This keeps the graph honest: items that appear only in the skills list (see §6) are drawn as faint outlined nodes instead of solid ones.

---

## 4. Visual design

- **Palette**: near-black background `#07090C`, surfaces `#0D1117` / `#121821`, hairline grid `rgba(148,163,184,0.06)`, text `#E6EDF3` / `#8B98A9`, cyan `#22D3EE` (the "active" signal), violet `#8B7CF6` (the "AI era" signal). As the timeline advances, the accent shifts gradually from cyan to violet, which acts as a quiet colour story of the move from software to AI.
- **Type**: *Instrument Serif* for display headlines (gives the documentary/museum feel), *Inter* for body text, *JetBrains Mono* for years, technology tags and diagram labels.
- **Surfaces**: 1px borders, an 8% white glass layer used only on milestone cards and the slider, and one soft radial "lamp" glow behind the active section.
- **A distinct look per milestone, on a shared system**: each milestone gets its own small background diagram motif drawn as SVG line art:
  - circuit traces for IoT
  - layered boxes for the n-tier Java work
  - a query-plan tree for performance
  - a mesh for the P2P grid
  - a DAG for pipelines
  - retrieval arrows for RAG
  - an agent graph for agentic work
- **Not used**: particles, percentage bars, 3D, neon blooms.

---

## 5. Animation strategy

| Effect | Technique |
|---|---|
| Background grid drift | CSS `background-position` keyframes on a pseudo-element (runs on the GPU, zero JS) |
| Intro year counter | Motion `animate()` driving digit slots that roll vertically with `transform` |
| Concept morph | `AnimatePresence` with blur + y + opacity cross-fade |
| Timeline spine | SVG `pathLength` linked to `useScroll` progress, so the line lights up as you scroll |
| Node activation / card reveals | One shared IntersectionObserver hook → `whileInView` variants, which run once |
| Architecture diagrams | SVG `stroke-dashoffset` draws, plus CSS `offset-path` for "packet" dots moving along edges |
| Tech graph year transitions | Positions computed ahead of time per year (a small force simulation at build time, so no d3 is shipped) and tweened with Motion `layout` |
| Then/Now slider | `clip-path: inset()` driven by a drag/keyboard-operable range input |
| Parallax | Only on decorative motifs, `useTransform` on the y-axis, disabled below 768px |

- **Reduced motion**: a global `MotionConfig reducedMotion="user"`. On top of that, the intro skips straight to the headline, and the spine shows fully lit.
- **Low-power devices**: when `navigator.hardwareConcurrency <= 4` or the screen is narrow, the grid drift, parallax and packet dots are turned off.
- **Lazy loading**: the graph, project diagrams and reflections load with `React.lazy`.
- **Dependencies**: Recharts is **not** needed; everything is custom SVG.

---

## 6. Content that needs your confirmation

### A. Missing material
1. **Technical papers.** None were provided. The documents name:
   - *Power Transmission Control* — ICIETET'2018, Panimalar, Mar 2018
   - *Coal Mine Accidents Detection and Automation – Using Cloud* — ITsFEW, VIT, Oct 2018
   - *Transparency Farming – A Cloud Based Analysis of Presence of Pesticides in Agricultural Soil* — NCCTTB'2019, RMK, Feb 2019

   R1 also lists papers on a *Government Bus Tracking System (mesh)*, *Blue Brain Project using Titan Computers*, *Educate the Required* and a *Public Address System*. R4/R5 say "**4** published papers", but only **3** are identified by name. **Which 4 are the published ones, and are any available publicly (links)?** Are there newer papers or articles (2022–2026)?
2. **Dates inside Tiger Analytics (Aug 2022 – present).** R5 lists Senior Engineer → Lead → Senior Lead → Lead AIML Engineer / AI Architect, but gives no dates for the promotions or for the individual projects. Without them, 2022–2026 collapses into one milestone. **When did the GenAI work start (the RAG platform)? When did the agentic work start (the IVR, LangGraph/AutoGen)?** Approximate years are enough.
3. **Links**: GitHub `github.com/priyaprem` appears in the documents. LinkedIn and personal website URLs are needed, or I'll leave placeholders.
4. **GitHub repository name** (needed for the Vite `base` path).

### B. Claims that need a decision
5. **Metrics.** Show, soften or remove each of these:
   - 83% performance gain
   - 1000+ concurrent users
   - 200K+ requests/yr at ~97% accuracy
   - 20–30% lower average handle time (AHT) and 90K+ calls avoided
   - 85% less admin effort and ~260 hours saved
   - 150+ APIs and 114 workflows
   - 20–30% cost reduction and 5–10% better portfolio returns
   - 350+ funds and 50% cost reduction

   These are client outcomes. Some may be under NDA, and "5–10% portfolio returns" is especially hard to attribute to engineering work. *My default: keep the engineering metrics (83%, 1000+ concurrent users, 150+ APIs/114 workflows, ~97% accuracy) and drop the financial ones.*
6. **Technologies listed only as skills.** R5's skills list includes Vertex AI, AWS SageMaker/Bedrock/EKS, Pinecone/FAISS/ChromaDB, Hugging Face, Kubernetes, MLflow, Airflow, Spark and Elastic Search, none of which appear in any project bullet. *Default: show them as faint nodes labelled "familiar with", unless you tell me which projects used them.*
7. **The "Machine Learning" step.** The documents don't show classical ML work before GenAI, apart from the NLP + RLHF incident pipeline. I'd skip a separate ML phase rather than invent one. Is that right?
8. **Employer names.** Should Gofrugal, Visual BI / Lumel and Tiger Analytics be named, or replaced with descriptions such as "a retail POS company", "a BI product company" and "an AI & analytics consultancy"? Clients are already anonymized in R5, and I'll keep them that way.
9. **Resume 3.** Why was the Gofrugal internship removed in #3? Is anything about that period inaccurate?

### C. Content that would be in your voice (I'll draft it; you approve it)
10. **Then vs Now.** The documents support these pairs with evidence, but the "thinking" wording would be mine:
    - "complete my assigned tasks perfectly… under the guidance of mentors" (R1 objective) ↔ leading architecture governance for 8+ engineers (R5)
    - shipping features and fixing bugs (Gofrugal) ↔ re-architecting backend layers for concurrency (Lumel)
    - a hospital data pipeline (R2) ↔ regulatory pipelines with audit-ready lineage (R5)
    - judging AI output as "does it answer?" ↔ human-in-the-loop validation, evaluation harnesses, guardrails, keeping PII away from humans

    May I quote your old career objective directly?
11. **Reflections (5–6 short beats).** I'll draft them from the evidence, mark them `draft`, and they won't ship until you edit or approve them. Or you can give me a sentence or two per theme.

### D. Privacy plan
- **Never included anywhere**: phone numbers, email addresses, home address, date of birth, parents' names (R1 contains all of these), and grades.
- **Resumes**: I'll add `Resume Collections/` to `.gitignore`. Even outside the build, they would become public the moment the repository is pushed. They will never be copied into `public/` or imported.

---

## 7. Implementation order (after approval)

1. Scaffold the project (Vite + React + TS + Tailwind + Motion + Lucide), add tokens and the grid background, and set up `.gitignore` and the deploy workflow.
2. Data layer, populated with the verified content and source references.
3. Intro, then the Timeline (the core of the experience). **Checkpoint with you.**
4. Tech graph, then Then vs Now, then Projects with diagrams.
5. Research, then Reflections, then Closing.
6. QA:
   - build, lint, tsc
   - mobile, reduced motion and keyboard checks in the browser
   - a scan of the build output for PII and secrets
7. README with instructions for adding milestones.
