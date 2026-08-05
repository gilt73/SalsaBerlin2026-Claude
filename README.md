# SalsaBerlin 2026 🏍️💃

Personal travel-companion PWA for the **Berlin Salsa Congress + motorcycle
tour** trip (Germany, Aug 26 – Sep 3, 2026). Built with Next.js (App
Router) + TypeScript + Tailwind CSS v4, fully installable and usable
offline.

## Modules

| Module | Route | Notes |
| --- | --- | --- |
| Dashboard | `/` | Countdowns + quick access |
| Flights | `/flights` | **Real data** from Israir booking #4727224, boarding-pass PDF upload |
| Hotel | `/hotel` | Editable — no active booking yet |
| Salsa Congress | `/congress` | Editable timeline — seeded with sample data until the official program is out |
| Motorcycle route | `/moto` | Real 2-day route from the spec + rental links + safety notes |
| Expenses | `/expenses` | Category tracker (IndexedDB) + EUR⇄ILS converter |
| Music | `/music` | Add your own Spotify playlist links |
| Transport | `/transport` | Uber / Bolt / Wolt / BVG / Maps quick links |
| Culinary | `/food` | Editable recommendations by area |

## Tech

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **Offline-first**: `localStorage` for simple module data, `IndexedDB`
  (via `idb-keyval`, single store + prefixed keys) for the expenses
  ledger and boarding-pass file blobs, a hand-written service worker
  (`public/sw.js`) for app-shell caching.
- **PWA**: installable manifest (`app/manifest.ts`), dynamically
  generated icons (`app/icons/*`, `app/icon.tsx`, `app/apple-icon.tsx`)
  via `next/og` — no binary assets checked into the repo.
- **RTL Hebrew UI** (Heebo font), responsive from Galaxy S23+ (mobile
  bottom tab bar) up through MacBook (fixed sidebar) via a single
  Tailwind `lg:` breakpoint.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Data notes

Flight data is real (pulled from the actual Israir booking
confirmation). Hotel, the official Salsa Congress schedule, and
culinary recommendations are placeholders marked in the UI — edit them
in-app (they persist to your device) once the real details are
confirmed.
