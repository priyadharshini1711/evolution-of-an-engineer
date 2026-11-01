/**
 * Site-wide settings. Edit this file to change links and visibility rules;
 * no component changes are needed.
 */
export const siteConfig = {
  /** Shown in the footer. */
  author: 'Priyadharshini Balaji',

  /** Show employer names (true) or neutral descriptions (false). */
  showEmployerNames: true,

  /** Follow each employer name with a neutral description of the company. */
  showEmployerDescriptions: true,

  /**
   * Draft content (author-written mindset statements) is visible in
   * `npm run dev` and hidden in production builds. Set VITE_SHOW_DRAFTS=true
   * to preview drafts in a production build.
   */
  showDrafts: import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === 'true',

  /**
   * Review badges and source-reference boxes. Off everywhere by default; the
   * references stay in src/data. Run with VITE_SHOW_REVIEW=true to see them.
   */
  showReviewInfo: import.meta.env.VITE_SHOW_REVIEW === 'true',

  /** Leave a link empty to hide it. */
  links: {
    github: 'https://github.com/priyadharshini1711',
    linkedin: 'https://www.linkedin.com/in/bpriyadharshini/',
    hackerrank: 'https://www.hackerrank.com/profile/priyaprem08',
    portfolio: 'https://priyadharshini1711.github.io/',
  },
} as const;
