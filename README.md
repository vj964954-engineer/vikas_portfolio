# Vikas Kumar Jain — Mobile Developer Portfolio (v5)
Next.js 14 · React 18 · Tailwind 4 · Framer Motion. Dark only.

    npm install
    npm run dev        # http://localhost:3000
    npm run build

Content lives in `lib/data.ts`. Deploy: push to GitHub; Vercel auto-detects Next.js (no vercel.json needed).

## v7 additions
- `components/intro.tsx` – terminal "gradlew assembleRelease" boot intro (tap to skip, once per session)
- `components/codefx.tsx` – falling code rain canvas + typing code line in the hero
- `components/journey.tsx` – scroll-pinned 3D exploded phone (UI / Logic / Data layers, then store badges)
- `components/ticker.tsx` – tech-stack ticker driven by scroll speed
No new dependencies.

## v8 additions (every section animated)
- `components/motion.tsx`: CountText, ScrollText, StaggerChips, CodeBlock, SkillOrbit, TimelineLine, Parallax, Deco, Divider, SectionRail, BackToTop, LocalTime, Burst
- `Reveal` now has kinds: up, left, right, zoom, flip. `Tilt` has a `glare` option. `Head` has a `k` label.
