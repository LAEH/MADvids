# MADvids

A collection of video web experiments exploring scroll-driven animation, video compositing, and interactive storytelling. Each experiment is a standalone HTML page showcasing a different technique.

**Live site:** [laeh.github.io/MADvids](https://laeh.github.io/MADvids/)

---

## Experiments

| # | Name | Folder | Technique |
|---|------|--------|-----------|
| 1 | **Superflat** | `superflat/` | Murakami dreamscape scroll journey with dual-video crossfade, layout variants, parallax, color wash overlays, and Web Audio ambient drone |
| 2 | **Cinematic Scroll** | `hyperpod-cinematic/` | Sticky fullscreen video with scroll-triggered sections and animated stat counters |
| 3 | **Split Narrative** | `hyperpod-showcase/` | Alternating left/right content blocks with video backgrounds |
| 4 | **Bento Mosaic** | `hyperpod-grid/` | Asymmetric video grid layout with marquee and stagger reveals |
| 5 | **Depth & Grain** | `hyperpod-immersive/` | Parallax zoom, WebGL film grain shader, and metric cards |
| 6 | **Delightful Video** | `delightfull-video/` | Scroll-driven typography animation over video |
| 7 | **Chromatic Shift** | `chromatic-shift/` | Scroll-driven color grading via HSL interpolation with WebGL grain |
| 8 | **Mesh Flow** | `mesh-flow/` | Gradient blob animation with screen blend mode and parallax drift |
| 9 | **Lumina** | `lumina/` | Interactive gamified light story with canvas particle system, achievements, and Web Audio |
| 10 | **Shape Reveal** | `shape-reveal/` | Scroll-driven `clip-path` morphing through circle, diamond, star, cross, blob, and inset shapes |
| 11 | **Rift** | `rift/` | Scroll-driven dimensional portal — radial gradient mask expands to reveal video, canvas particles, glow ring, Web Audio drone |
| 12 | **Autonomy Dashboard** | `autonomy-dashboard/` | React + Framer Motion dashboard with slide-based presentation |

## Tech Stack

- **Landing page & experiments:** Vanilla HTML / CSS / JS (no frameworks)
- **Dashboard:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Build:** Vite with multi-page rollup inputs
- **Deploy:** GitHub Actions &rarr; GitHub Pages
- **Videos:** Hosted on Google Cloud Storage

## Key Techniques

- `mix-blend-mode: screen` for video-through-text effects
- Glass morphism with `backdrop-filter: blur() saturate()`
- Compositor-only animations (`transform` / `opacity` via `translate3d`)
- `will-change` lifecycle management (set during animation, cleaned up after)
- CSS `clip-path` with scroll-driven polygon generators
- Scroll-driven `radial-gradient` masking for portal/rift reveals
- Web Audio API synthesis for ambient sound and interactive audio
- Cross-document View Transitions API (`@view-transition { navigation: auto; }`)
- Lazy video loading with `IntersectionObserver` and memory management
- Service Worker with cache-first fonts and stale-while-revalidate assets
- `prefers-reduced-motion` support across all pages

## Performance

- Cached layout reads (no per-scroll `offsetHeight` calls)
- `content-visibility: auto` + `contain-intrinsic-size` on card grids
- `contain: layout style paint` on repeated elements
- Video `src` removal at 600px outside viewport to free memory
- Passive scroll listeners with `requestAnimationFrame` throttling
- WebGL grain shader replaces heavy CSS effects where needed

## Development

```bash
npm install
npm run dev        # Vite dev server on port 3006
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

Pushing to `main` triggers automatic deployment via GitHub Actions.

## Structure

```
index.html              Landing page with card grid
experiments/
  superflat/            Standalone HTML experiment
  hyperpod-cinematic/   ...
  hyperpod-showcase/
  hyperpod-grid/
  hyperpod-immersive/
  delightfull-video/
  chromatic-shift/
  mesh-flow/
  lumina/
  shape-reveal/
  rift/
  autonomy-dashboard/   React app (src/ directory)
src/                    React source for autonomy-dashboard
public/
  sw.js                 Service Worker
  favicon.svg
vite.config.ts          Multi-page build config
```

## License

Private project.
