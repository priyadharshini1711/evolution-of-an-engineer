import type { ContentStatus, SourceDoc } from './types';

/**
 * The five resumes, oldest first, as published attachments. The PDFs in
 * public/resumes/ are redacted copies made by scripts/redact-resumes.py:
 * email addresses, phone numbers and personal details are removed.
 */
export interface ResumeVersion {
  id: SourceDoc;
  file: string;
  label: string;
  date: string;
  pages: number;
  format: string;
  /** The title or opening statement the resume led with. */
  ledWith: string;
  summary: string;
  /** Section headings, in order. */
  sections: string[];
  /** What changed from the previous version. */
  changes: string[];
  status: ContentStatus;
  reviewNote?: string;
}

export const resumes: ResumeVersion[] = [
  {
    id: 'R1',
    file: 'resume-1-after-college',
    label: 'After college',
    date: 'Early 2019',
    pages: 4,
    format: 'Scanned · single column',
    ledWith: 'Career objective: to work to the best of my potential, complete assigned tasks perfectly, and improve under the guidance of mentors and seniors.',
    summary:
      'A student resume built around activity: awards, mini projects, conference papers, workshops and leadership roles. Technical skills show up only through project descriptions; there is no skills section.',
    sections: ['Career Objective', 'Academic Chronicles', 'Area of Interests', 'Awards and Honours', 'Mini Projects', 'Conferences', 'Paper Presentations', 'Industrial Visits', 'In-plant Training', 'Workshops', 'Online Courses (NPTEL)', 'Internship', 'Leadership Activities', 'Personal Details', 'Declaration'],
    changes: [
      'First version: 21 awards and honours, 11 mini projects (embedded/IoT and web), 3 conference papers and 5 paper presentations.',
    ],
    status: 'verified',
  },
  {
    id: 'R2',
    file: 'resume-2-gofrugal',
    label: 'During the GoFrugal internship',
    date: '2019 – 2020',
    pages: 2,
    format: 'Typed · single column',
    ledWith: 'Career objective: to become a good developer and make products that are challenging to work on and helpful to the community.',
    summary:
      'The first resume with a Technical Skills section and a first industry internship. Projects are cut to four, and achievements are condensed into counts instead of a long table.',
    sections: ['Career Objective', 'Academic Chronicle', 'Technical Skills', 'Certifications', 'Projects', 'Industrial Visit', 'Workshops', 'In-plant Training', 'Internship', 'Technical Conferences', 'Leadership Skills', 'Achievements', 'Interests', 'Declaration'],
    changes: [
      'Added a Technical Skills section: C, C++, Java, Python (beginner), PHP, JavaScript, Oracle, MySQL, HTML, CSS, Bootstrap 4, Angular 7.',
      'Added the Java Developer Intern role at GoFrugal Technologies.',
      'Mini projects cut from 11 to 4; conference papers moved into a table with venues and dates.',
      'The awards table became six summary achievements.',
    ],
    status: 'verified',
  },
  {
    id: 'R3',
    file: 'resume-3-gofrugal-revised',
    label: 'GoFrugal, revised',
    date: '2019 – 2020',
    pages: 3,
    format: 'Typed · single column',
    ledWith: 'The same career objective as the previous version.',
    summary: 'A revision of the previous resume with the same content, re-spaced onto three pages.',
    sections: ['Career Objective', 'Academic Chronicle', 'Technical Skills', 'Certifications', 'Projects', 'Industrial Visit', 'Workshops', 'In-plant Training', 'Internship', 'Technical Conferences', 'Leadership Skills', 'Achievements', 'Interests', 'Declaration'],
    changes: [
      'The GoFrugal internship line dropped out of the Internship section by mistake; the internship itself continued.',
      'Layout re-spaced from two pages to three.',
    ],
    status: 'verified',
  },
  {
    id: 'R4',
    file: 'resume-4-lumel',
    label: 'After Lumel',
    date: 'Mid-2022',
    pages: 1,
    format: 'Typed · two columns',
    ledWith: 'Summary: 3+ years as a client-driven software professional who develops functional, robust and easy-to-use applications.',
    summary:
      'The first professional resume. Work experience leads, with five dated roles and bullet points. Student projects, workshops and personal details are gone, and the first measured results appear.',
    sections: ['Summary', 'Skills', 'Other Skills and Tools', 'People Skills', 'Awards', 'Education', 'Work Experience'],
    changes: [
      'Career objective replaced by a professional summary.',
      'Work Experience added: GoFrugal, then BI Developer Trainee to Senior Product Developer at Visual BI / Lumel.',
      'First metrics: 83% performance improvement and REST APIs serving 1000+ concurrent users.',
      'Skills consolidated around React, Python (Flask, FastAPI), Java, Angular, TypeScript and SQL, plus Jira, Git, Jenkins and Sonar.',
      'Down to a single page.',
    ],
    status: 'verified',
  },
  {
    id: 'R5',
    file: 'resume-5-current',
    label: 'Current',
    date: '2026',
    pages: 2,
    format: 'Typed · single column',
    ledWith: 'AI Architect | Lead AI Engineer, with 7+ years designing and delivering enterprise Generative AI, agentic AI, automation and data-engineering solutions.',
    summary:
      'A title-led resume. Skills are grouped into six areas, and experience is condensed into three employers, each with its ladder of roles. Most bullets describe architecture and outcomes rather than tasks.',
    sections: ['Summary', 'Skills', 'Experience', 'Education', 'Achievements', 'Beyond Work'],
    changes: [
      'A job title now leads the resume: AI Architect | Lead AI Engineer.',
      'Skills grouped into six areas: Generative & Agentic AI; Data Engineering & Cloud; Deployment & LLMOps; Programming & Full Stack; Automation & Low Code; Solution Architecture & Leadership.',
      'Tiger Analytics work added: from data platforms to RAG, AI orchestration and agentic systems.',
      'Roles grouped under each employer ("Previous roles") instead of listed separately.',
      'Added a Beyond Work section on side projects and mentoring.',
    ],
    status: 'verified',
  },
];
