# Vikas Kumar Jain — Android & iOS Engineer Portfolio (v4)

Next.js 14 · React 18 · Tailwind CSS 4 · Framer Motion

## Run
```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content
All text, apps, experience, skills and articles live in `lib/data.ts`.

## v4 — what changed
- **Fixed: pinned "Selected work" scroll** — `body { overflow-x: hidden }` turned the body into its own scroll container, which breaks `position: sticky`. Removed; horizontal overflow is now clipped on `html` only. Track widths use % instead of `vw` so a desktop scrollbar can't misalign the slides.
- **Fixed: custom CSS beating Tailwind** — `.card` and the `min-width: 0` reset were outside Tailwind's layers, so classes like `rounded-full` / `min-w-*` were silently ignored. They now live in `@layer`.
- **Fixed: headlines splitting mid-word** on narrow phones (`overflow-wrap: anywhere` → `break-word`).
- **New X/Y-axis charts** (`components/growth-charts.tsx`): area ⇄ bar toggle, labelled axes, hover tooltip, ▲/▼ change badge vs previous quarter. Two charts are computed from `lib/data.ts` (apps in development, toolbox growth).
- **Your own chart data**: add points to `metricSeries` at the bottom of `lib/data.ts` (see the commented example) and a new chart appears automatically.
- **New "Toolkit" section** (`components/engineering.tsx`): clickable release pipeline + Android ⇄ iOS concept map. Edit the `pipeline` and `layers` arrays to reuse it for any mobile developer.

## v3 — what changed
- **New "Insights" section** (`components/insights.tsx`): ring gauges (crash-free, completion, load time, rating), platform donut, filterable technology bar chart and a career + releases Gantt timeline. All numbers are computed from `lib/data.ts` — edit the data and the charts update.
- **Responsive fix**: page no longer scrolls sideways on phones (grid children can shrink; code card scrolls inside itself). Verified at 320 / 375 / 390 / 414 / 768 / 820 / 1024 / 1280 / 1440 / 1920 px on both Android and iOS styles.
- Nav links show from 1280px; below that a menu button; phones and small tablets also get the bottom tab bar.

## v2 highlights
- 3 theme axes: Android ⇄ iOS · dark ⇄ light · 5 accent colours (palette button in the nav). All remembered between visits.
- Platform-native UI: Material 3 navigation bar / FAB / filled fields / springy entrances on Android; glass tab bar / inset lists / blur-in entrances / pill buttons on iOS.
- Scroll: progress bar, section dot rail, pinned horizontal case-study scroll (desktop) / swipe carousel (mobile), scroll-drawn timeline, hero parallax, count-up stats.
- Per-section features: rotating role headline + tilting phone, Kotlin⇄Swift code card, app bottom sheet + grid/list view, skill chips that search the app library, certificate lightbox, article search, contact quick-start chips + copy buttons.
