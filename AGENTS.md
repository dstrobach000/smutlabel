# Agent instructions — smutlabel

## Scope

This repository is a small Next.js marketing-style homepage for SMUT / smutlabel. Keep changes minimal and aligned with the existing visual direction unless the user asks otherwise.

## Stack

- **Next.js** (App Router), **React**, **TypeScript**
- **Tailwind CSS v4** via `@import "tailwindcss"` in `app/globals.css`
- Prefer extending `app/page.tsx`, `app/layout.tsx`, and `app/globals.css` over adding parallel styling systems

## Conventions

- Keep the homepage accessible: semantic landmarks (`header`, `nav`, `main`, `footer`), skip decorative marquee content for screen readers where appropriate if you add more motion
- Avoid heavy client-side-only logic unless needed; the current homepage is a static server component
- Run `npm run build` before handing off changes that touch routing, layout, or dependencies

## Git

- Default branch: `main`
- Upstream remote is expected to be `https://github.com/dstrobach000/smutlabel.git`

## When in doubt

- Preserve the intentional “late-90s personal site” aesthetic (high contrast, borders, monospace accents) unless the user requests a redesign
