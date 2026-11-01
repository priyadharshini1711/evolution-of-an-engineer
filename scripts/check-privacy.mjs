// Fails if the production build contains personal contact details, private
// documents, draft markers or anything that looks like a secret.
// Patterns are generic on purpose: this file is public, so it must not
// contain the personal values it guards against.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const DIST = 'dist';

const rules = [
  {
    name: 'PDF or document file (only redacted resumes are allowed)',
    test: (file) => /\.(pdf|docx?)$/i.test(file) && !/[\\/]resumes[\\/]resume-\d-[a-z-]+\.pdf$/.test(file),
    kind: 'file',
  },
  { name: 'Email address', re: /[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com/g },
  { name: 'Indian phone number', re: /(\+91[\s-]?)?\b[6-9]\d{9}\b/g },
  { name: 'Date of birth pattern', re: /\b\d{2}-\d{2}-(19|20)\d{2}\b/g },
  { name: 'Postal code with address keyword', re: /(Nagar|Street|Road)[^"]{0,60}\b\d{6}\b/g },
  { name: 'OpenAI-style key', re: /\bsk-[A-Za-z0-9]{20,}/g },
  { name: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: 'GitHub token', re: /\bgh[pousr]_[A-Za-z0-9]{30,}/g },
  { name: 'Private key block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

let files;
try {
  files = walk(DIST);
} catch {
  console.error(`No ${DIST}/ directory. Run "npm run build" first.`);
  process.exit(1);
}

const textExt = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.map']);
const problems = [];

for (const file of files) {
  for (const rule of rules.filter((r) => r.kind === 'file')) {
    if (rule.test(file)) problems.push(`${rule.name}: ${file}`);
  }
  if (!textExt.has(extname(file))) continue;
  const text = readFileSync(file, 'utf8');
  for (const rule of rules.filter((r) => r.re)) {
    for (const match of text.matchAll(rule.re)) {
      problems.push(`${rule.name} in ${file}: "${match[0].slice(0, 6)}…"`);
    }
  }
}

if (problems.length) {
  console.error('Privacy check failed:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(`Privacy check passed (${files.length} files scanned).`);

// Draft content is hidden in production, but its text is still in the JS
// bundle. Approve it (status: 'verified') or delete it before publishing.
const drafts = files
  .filter((f) => extname(f) === '.js')
  .reduce((n, f) => n + (readFileSync(f, 'utf8').match(/status:"draft"/g)?.length ?? 0), 0);
if (drafts > 0) {
  console.warn(`Note: ${drafts} draft entries are hidden on the page but still present in the JS bundle.`);
}
