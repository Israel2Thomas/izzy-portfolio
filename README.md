# Israel's Portfolio — Learning Notes & Roadmap

This is a starter project, not a finished site — the point is to build it up
yourself and actually learn TypeScript, HTML/CSS, React, and AWS along the way.
Everything below is written as a guide for that, not just documentation.

## What's here

```
portfolio/
├── index.html          the whole page structure (semantic HTML, one file)
├── css/styles.css       responsive, mobile-first styles
├── src/
│   ├── types.ts          shared TypeScript interfaces (Project, GoalStatus, etc.)
│   ├── main.ts            reads the data below and builds the DOM
│   └── data/
│       ├── resume.ts       your education / experience / skills
│       ├── projects.ts     your projects
│       └── goals.ts        goals by semester
├── dist/                 compiled JavaScript (generated — don't hand-edit)
├── tsconfig.json         TypeScript compiler settings, commented
└── package.json
```

The content is separated from the structure on purpose: to update your resume
or add a project, you edit the arrays in `src/data/`, not the HTML. `main.ts`
is what turns that data into visible page content in the browser.

## Running it locally

```bash
npm install          # installs the TypeScript compiler
npm run build         # compiles src/*.ts -> dist/*.js (one-time)
npm run watch          # recompiles automatically every time you save a .ts file
```

Then just open `index.html` in a browser, or run `npm run serve` and visit
`http://localhost:5500`. (Opening the file directly works fine for this
project since it has no server-side code — that changes if you add a bundler
or framework later.)

**Workflow while you're learning:** run `npm run watch` in one terminal, leave
it running, and just edit files + refresh the browser. Read the actual error
messages tsc gives you — they're one of the best free tutors available.
Committing this project to a `git` repo from day one (even before it's
"done") is worth doing now, not later — see the Git note below.

## Things to keep in mind on an average basis, while building any website

These apply far beyond this project — they're the habits worth building now:

- **Mobile-first, responsive.** Most people will open your link on a phone
  first. Design/check the narrow layout, then widen the browser to see it
  scale up — not the reverse. The CSS here uses `grid`/`flex` with
  `auto-fit`/`clamp()` specifically so it reflows without extra media queries;
  read the comments in `styles.css` to see how.
- **Semantic HTML.** Use `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>` instead of a pile of `<div>`s. It's not just style — screen
  readers, search engines, and browser accessibility tools all rely on it.
- **Accessibility isn't optional.** Alt text on every meaningful image, a
  visible focus state for keyboard users, sufficient color contrast, a "skip
  to content" link (there's one in `index.html`). Try tabbing through your
  own site with the mouse untouched — it's the fastest way to notice gaps.
- **Don't trust `target="_blank"` alone.** Always pair it with
  `rel="noopener noreferrer"` (done throughout this project) — otherwise the
  page you link to can access `window.opener` on your page, which is a real,
  if obscure, security hole.
- **Never put secrets in frontend code.** Anything in your `.ts`/`.js`/HTML
  ships to every visitor's browser and can be read in dev tools, no matter how
  it's minified. API keys, credentials, etc. never belong here — this matters
  more once you're calling AWS services later.
- **Performance is a feature.** Compress images before adding them (use
  `.webp` where you can), and don't ship libraries you aren't using. A slow
  site is a worse first impression than a plain one.
- **Version control from the start.** `git init`, commit early and often, and
  push to GitHub — this project *is* a GitHub portfolio piece on its own,
  separate from the projects it lists.
- **Test in more than one browser.** Chrome, Firefox, and Safari (or at least
  Chrome + one other) occasionally disagree on CSS edge cases. Mobile Safari
  in particular surprises people.
- **Read the compiler/linter errors, don't just silence them.** It's tempting
  to reach for `// @ts-ignore` or `any` the first time TypeScript complains.
  Treat that as a last resort — the error is almost always pointing at a real
  bug or a missing null-check.

## Roadmap

### Phase 1 — this starter (HTML / CSS / TypeScript fundamentals)
- [ ] Fill in your real info in `src/data/resume.ts`, `projects.ts`, `goals.ts`
- [ ] Replace the placeholder email/GitHub/LinkedIn links in `index.html`
- [ ] Add a real `resume.pdf` next to `index.html` (or remove that button)
- [ ] Tweak colors/spacing in `css/styles.css` to make it feel like yours
- [ ] Push this to a GitHub repo

### Phase 2 — React + TypeScript
You said you've used React before but not hands-on — a good next step once
Phase 1 feels solid: rebuild one section (start with Projects, since it's
already a clean "list of data -> cards" pattern) as React components with
[Vite](https://vitejs.dev/) (`npm create vite@latest -- --template react-ts`).
You'll recognize the `Project` interface and the render logic in `main.ts` —
you're mostly translating the same idea (data in, DOM out) into JSX
components and `props`. Once one section works, migrate the rest at your own
pace, or keep the plain version if you prefer it — both are legitimate.

### Phase 3 — Deploy it on AWS
Two reasonable paths, and it's worth eventually doing both to actually learn
AWS rather than just getting a URL:

1. **AWS Amplify Hosting** — the easiest on-ramp. Connect your GitHub repo,
   and it builds + deploys automatically on every push, with HTTPS and a free
   subdomain out of the box. Good first win, less visibility into what's
   actually happening.
2. **S3 static website hosting + CloudFront** — the "under the hood" version,
   and closer to what a lot of real production static sites use. You'll
   touch S3 (object storage), IAM (permissions — the part that trips
   everyone up first), and CloudFront (CDN + HTTPS), and optionally Route 53
   if you buy a custom domain. This teaches you actual AWS building blocks
   you'll reuse for future projects, not just "how to deploy this one site."

Do (1) first for a quick working deployment, then redo it as (2) once you
want to understand what Amplify was doing for you automatically.

## A note on learning by doing

Ask for help interpreting an error message or a design decision rather than
asking for the finished code outright — you'll retain far more that way, and
this project is explicitly meant to build your skills, not just produce a
URL. I'm glad to walk through any part of this in more depth whenever you
want.
