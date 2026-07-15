# Portfolio

Usman Yousuf's personal portfolio — a color-blocked, single-page site built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Stack

- **React 19 + Vite** — no router, single page with anchor-linked sections
- **Tailwind CSS v4** — design tokens defined in `src/index.css` (`@theme`)
- **Framer Motion** — scroll-triggered reveals, respects `prefers-reduced-motion`
- Fonts: Archivo (display), Hanken Grotesk (body), JetBrains Mono (labels/data)

## Structure

```
src/
  data.js              content/config — name, socials, services, experience, projects, skills
  index.css            design tokens + base styles + utilities
  App.jsx              page composition
  components/
    Nav.jsx            sticky header
    Hero.jsx           name, portrait, availability status
    Metrics.jsx         impact numbers strip
    Services.jsx        what I do
    Experience.jsx      work history
    Works.jsx            selected projects
    About.jsx            bio + skills + education
    Footer.jsx           contact form + footer nav
    ScrollTop.jsx        mobile back-to-top button
public/
  profile.png          headshot (used in Hero + About)
  resume.html          standalone print-ready résumé
```

## Editing content

Almost everything is data-driven — update `src/data.js` to change name, role,
contact info, services, experience, projects, or skills without touching
component code.

To swap the headshot, replace `public/profile.png` (referenced via
`PROFILE_IMG` in `data.js`).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Requires **Node 20+** (Vite 8 uses `node:util`'s `styleText`, unavailable on Node 18).
