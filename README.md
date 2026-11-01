# The Evolution of an Engineer · 2018 – 2026

An interactive, single-page documentary of how one engineer's work changed
year by year: from IoT prototypes and student papers to enterprise data
platforms and agentic AI systems.

**Live site:** https://priyadharshini1711.github.io/evolution-of-an-engineer/

Built with React, TypeScript, Vite, Tailwind CSS and Motion. The site is fully
static: no backend, no API keys, no secrets.

---

## What's on the page

| Section | What it shows |
|---|---|
| **Intro** | A year counter from 2019 to 2026, with what the work was about in each year |
| **Film** | A short animated overview, one scene per year |
| **Timeline** | One card per year (2018 – 2026): role, technologies, what was built, challenges, results |
| **Landscape** | A technology graph: when each tool first appeared and what it was used with |
| **Mindset** | Then-vs-now comparisons with a drag slider |
| **Projects** | Six case studies with animated architecture diagrams |
| **Research** | Four published papers, plus four symposium talks |
| **Resume** | All five resumes, with what changed each time and redacted PDFs to view or download |
| **Reflections** | Short lessons from the journey |
| **Onward** | Closing section and profile links |

---

## Run it on your computer

You need [Node.js](https://nodejs.org) (version 20 recommended).

```bash
npm install
npm run dev
```

Then open http://localhost:5173. The page reloads as you edit files.

---

## Changing the content

All text lives in `src/data/`. You never need to touch the page components to
update content.

| I want to… | Edit this |
|---|---|
| Change a year on the timeline | `src/data/timeline.ts` |
| Change the words in the intro counter | `introConcepts` at the top of `src/data/timeline.ts` |
| Add or move a technology in the graph | `src/data/technologies.ts` |
| Edit a project case study or its diagram | `src/data/projects.ts` |
| Edit papers or symposium talks | `src/data/papers.ts` |
| Edit then-vs-now comparisons or reflections | `src/data/reflections.ts` |
| Edit the text of the Resume section | `src/data/resumes.ts` |
| Change the GitHub, LinkedIn, HackerRank or portfolio links | `links` in `src/config.ts` |
| Show or hide employer names and descriptions | `showEmployerNames` / `showEmployerDescriptions` in `src/config.ts` |
| Change the animated film | the `SCENES` list at the bottom of `public/transition.html` |

### Add a new year (for example, 2027)

1. In `src/data/timeline.ts`, copy the last entry in `milestones`, change
   `id`, `year`, `navLabel` and `period`, and fill in what you built.
   - `accent`: a number from 0 (cyan) to 1 (violet).
   - `motif`: the background drawing. One of `circuit`, `layers`, `scatter`,
     `query-tree`, `mesh`, `dag`, `flows`, `retrieval` or `agents`.
2. Add a line for the year to `introConcepts` in the same file.
3. In `src/data/technologies.ts`:
   - Add `2027` to `graphYears`.
   - Add any new tools to `techNodes`.
   - Add the work to `evidenceGroups`. Lines in the graph come from these groups.
4. In `public/transition.html`, add a scene to `SCENES`.

### Update a resume

1. Replace the PDF in `Resume Collections/` (this folder stays private).
2. Make the redacted copy that gets published:
   ```bash
   python -I scripts/redact-resumes.py
   ```
   This removes emails, phone numbers and personal details, and creates the
   thumbnails. It needs PyMuPDF: `pip install pymupdf`.
3. Open the new PDF in `public/resumes/` and check it looks right.
4. Update the description in `src/data/resumes.ts`.

---

## Publishing to GitHub Pages

### First time

1. Create a **public** repository on GitHub and push this folder to `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to turn green (1–2 minutes).

### Every update after that

```bash
git add -A
git commit -m "Describe what you changed"
git push
```

The site rebuilds and goes live automatically. Each deploy also runs the
linter, the build and the privacy check, and stops if any of them fails.

---

## Privacy: what never goes online

- **`Resume Collections/`** holds the original resumes, papers and the LinkedIn
  export. It's git-ignored, so it's never uploaded or included in the site.
- **Only redacted resumes are published.** Emails, phone numbers, home
  address, date of birth and parents' names are removed from the PDFs
  themselves, not just covered up.
- **Every deploy is checked** for email addresses, phone numbers, documents
  and API keys. The deploy stops if anything is found.
- **Clients are never named.** They're described as, for example, "a Fortune
  500 client".

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the site locally with live reload |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the built site, as GitHub Pages will |
| `npm run lint` | Check the code for problems |
| `npm run check:privacy` | Scan `dist/` for personal data and secrets (run after `build`) |
| `python -I scripts/redact-resumes.py` | Regenerate the redacted resumes and thumbnails |

**Source references:** every fact in `src/data/` records which document it came
from. To see these references on the page while editing, run:

```bash
VITE_SHOW_REVIEW=true npm run dev
```

---

## Folder guide

```
src/
  data/          All content (start here)
  config.ts      Links and display settings
  sections/      One file per page section
  components/    Shared pieces: diagrams, header, background drawings
  styles/        Colours, fonts, background grid
public/
  resumes/       Redacted resume PDFs and thumbnails (published)
  transition.html  The animated film
scripts/
  redact-resumes.py   Makes the redacted resumes
  check-privacy.mjs   Privacy scan used before every deploy
.github/workflows/deploy.yml   Automatic GitHub Pages deployment
```

---

## Troubleshooting

- **The Actions run failed on the first push.** Pages was probably not turned
  on yet. Turn it on (Settings → Pages → GitHub Actions), then open the failed
  run and click **Re-run all jobs**.
- **The deploy stopped at "Check build output".** The privacy check found
  something that looks like personal data. The log names the file. Remove it
  and push again.
- **`npm install` or `npm run dev` fails.** Check your Node version with
  `node -v`. Use 20 if you can (16 is the minimum).
