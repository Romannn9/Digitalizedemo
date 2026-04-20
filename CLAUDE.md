# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # local dev server on port 3000
npm run build      # standard Vite build (base: /Digitalizedemo/)
npm run build:wp   # WordPress build → wp-theme/dist/ (base: /wp-content/themes/digitalize/dist/)
npm run deploy     # build:wp then FTP-upload to digitalize.com.ua
npm run lint       # TypeScript type check (tsc --noEmit)
npm run clean      # remove dist/ and wp-theme/dist/
```

Deploy requires `FTP_PASS` set in `.env.deploy` or as an env variable.

## Architecture

This is a **React + Vite + Tailwind CSS** app targeting two environments via `mode`:

### Dual-mode build

| Mode | `npm run` | Base URL | Output | Entry |
|------|-----------|----------|--------|-------|
| default | `build` | `/Digitalizedemo/` | `dist/` | `index.html` → `App.tsx` (React Router SPA) |
| `wp` | `build:wp` | `/wp-content/themes/digitalize/dist/` | `wp-theme/dist/` | `main.tsx` (URL-based page dispatch) |

`main.tsx` detects the mode via `import.meta.env.MODE === 'wp'`:
- **WP mode**: reads `window.location.pathname` to pick a page component
- **Dev mode**: reads `rootEl.dataset.page` attribute

### WordPress integration (`wp-theme/`)

Each WordPress page has a dedicated PHP template (e.g. `front-page.php`, `page-about.php`) that renders `<div id="root" data-page="home"></div>`. `functions.php` reads the Vite manifest to enqueue the built JS/CSS and injects `window.wpPage` and `window.wpSite` globals for the React app.

Pages: `Home`, `Cases`, `Services`, `About`, `Blog`, `Contact` — each in `src/pages/`.

### Component paths

- `src/components/layout/` — `Layout`, `Navbar`, `Footer`, `ScrollToTop`
- `src/components/ui/` — shadcn/ui components (style: `base-nova`, icons: lucide-react)
- `@/` alias resolves to the repo root

### Key globals (WordPress only)

`window.wpPage` — current page data (id, slug, title, content, excerpt)  
`window.wpSite` — site name, URL, REST API URL  
Types declared in `src/types/wp.d.ts`.

### AI integration

Uses `@google/genai` SDK. `GEMINI_API_KEY` must be set in `.env.local` for local dev; it is inlined at build time via `vite.config.ts` `define`.
