# @AGENTS.md

This document provides an overview of the `dotcom` project, its structure, and how to get it running. This document is intended to be used by AI agents to understand the project.

## Project Overview

This is the source for JosephScript.com, built with [Astro](https://astro.build/) using React islands for interactive pieces. Statically generated and deployed to Cloudflare Pages.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (v7) with the `@astrojs/react` integration for interactive islands
- **UI**: [React](https://react.dev/) (islands only — most markup is plain `.astro`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Styling**: CSS Modules for React components, Astro scoped `<style>` for `.astro` pages, shared design tokens in `src/styles/vars.css`
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## Project Structure

```
.
├── src/
│   ├── components/       # React islands (Header, Nav, Footer, icons, etc.)
│   ├── pages/             # File-based routes (index, about, about/resume, projects)
│   ├── lib/               # Build-time helpers (GitHub API fetch for /projects)
│   ├── layouts/           # Layout.astro — shared page shell
│   └── styles/            # vars.css (design tokens), global.css, fonts.css
├── public/                # Static assets (images, favicons)
├── astro.config.mjs        # Astro config (react integration)
└── package.json
```

## Available Scripts

- `pnpm dev`: Starts the dev server at `http://localhost:4321`.
- `pnpm build`: Builds the static site to `dist/`.
- `pnpm preview`: Serves the production build locally.
- `pnpm astro check`: Type-checks `.astro`/`.ts`/`.tsx` files.
- `pnpm run audit`: Runs `audit-ci` against dependencies.
- `pnpm exec biome check --write .`: Biome lint + format.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Conventions

- Design tokens (colors, type scale, spacing) live in `src/styles/vars.css` as CSS custom properties — reuse them instead of hard-coding values in component styles.
- React components use CSS Modules (`Component.module.css`) rather than inline styles or `styled-jsx` (there is no `styled-jsx` dependency in this project).
- The `/projects` page and homepage teaser fetch GitHub data at build time (`src/lib/github.ts`) — see `.env.example` for the optional `GITHUB_TOKEN` that enables pulling real pinned repos.
- Deployment is automatic: pushing to `main` triggers a Cloudflare Pages build (`pnpm run build` → `dist/`). See `README.md` for details.
