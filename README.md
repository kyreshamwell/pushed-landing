# Pushed landing page

The marketing site for [Pushed](https://apps.apple.com/us/app/pushed-commit-widget/id6788594258),
an iOS widget that puts your GitHub contribution graph on your Home Screen.
Next.js 15, TypeScript, Tailwind CSS v4 and [Motion](https://motion.dev).

The design is built on the contribution grid: squares, hairline rules and
mono labels, set in Space Grotesk with JetBrains Mono for metadata. Layouts
are asymmetric rather than centred, and there are no cards.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (fully static) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |

## Where things live

- `lib/site.ts` — all the copy, the App Store link and the screenshot list. Nearly every text change you want to make is in this one file.
- `lib/widgetStyles.ts` — the five widget looks, ported from `Shared/WidgetStyle.swift` in the app. Colors, cell shape, type and glow all come from here, so the live preview draws what the real widget draws. If you add a style to the app, add it here too.
- `lib/grid.ts` — the seeded contribution pattern shared by the hero and the previews. Seeded, not random, so the server and the browser agree.
- `app/page.tsx` — the page itself, section by section.
- `app/globals.css` — theme tokens. The five greens are the same levels the widget draws.
- `public/screenshots/` — the App Store screenshots, halved to 660 × 1434 for the web.
- `public/pushed-demo.mp4` — the demo video, 1080 × 1920, encoded from the original with `ffmpeg -crf 26 -preset slow -movflags +faststart`. The 55MB original lives in the gitignored `media-source/` folder. `public/pushed-demo-poster.jpg` is the frame at 14.07s, where the widget overlay is on screen.

### Components

- `HeroWidget` / `WidgetPreview` — the live widget in the hero. Pick a style and a layout and it animates between them; the card tilts toward the pointer.
- `Marquee` — the screenshot band. It is a real scroll container that also advances itself: hovering stops the drift so you can drag it with a mouse, swipe it on a touchscreen or scroll it with a trackpad. It wraps in both directions, so it never runs out either way, and it holds still under reduced motion.

  The repeat period is measured between two items in the DOM rather than taken from `scrollWidth / copies`. `scrollWidth` leaves out the gap after the last item, which would put every wrap one gap out of place.
- `HeroGrid` — a full year of squares, 52 × 7. Cascades in, then lights one every 1.4s.
- `SplitHeading` / `Rise` — the word-by-word headline reveal and its plainer sibling.
- `Reveal` — wraps anything that should lift into place when it scrolls into view.
- `AppStoreButton` — leans toward the cursor on hover.
- `DemoVideo` — the 43 second demo in a phone frame. `preload="none"` means the 7MB of video is not fetched until someone clicks play, and because the first play comes from a real click the browser lets it start with sound.
- `Nav`, `Features`, `Footer`.

Every animation checks `prefers-reduced-motion` and renders the page still if
that is set.

The screenshots and the icon were copied out of the app's own repo. If you
change them in the app, recopy them here.

## Before deploying

Two things need a real value:

1. **`site.siteUrl` in `lib/site.ts`** is a placeholder. Set it to the domain you deploy to, so the Open Graph and Twitter card links resolve.
2. **The App Store button** in `components/AppStoreButton.tsx` is a custom button, not Apple's official badge. If you want to follow Apple's marketing guidelines to the letter, download the official badge from [Apple's marketing tools](https://developer.apple.com/app-store/marketing/guidelines/) and swap it in.

## Deploying

The build is fully static, so anything that serves a Next.js app will do. On
Vercel, import this repo and accept the defaults. No environment variables are
needed.
