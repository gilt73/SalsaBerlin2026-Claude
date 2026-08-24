# Changelog

Versioning convention (per the Phase 2 requirements doc): the app started
at **1.0** for the initial build. From here on, every meaningful push
bumps the patch digit (1.0 → 1.1 → 1.2 …) until a full feature phase
ships, at which point it becomes the next whole version (Phase 2 → 2.0).

## [1.0.0] — 2026-08-05 — Initial build (Phase 1)

- Dashboard, Flights (real Israir data), Hotel, Salsa Congress, Motorcycle
  route, Expenses + currency converter, Music, Transport, Culinary, To-Do
- Real trip data pulled from inbox: flights, hotel booking, congress ticket
  (incl. the same-day pass swap + refund)
- Offline-first: localStorage + IndexedDB, installable PWA, service worker
  (fixed a bug where it never actually registered in production)
- Deployed to Vercel

## [2.0.0] — Phase 2

- Smart navigation: Waze/Google Maps links on every destination in the
  itinerary + a persistent "navigate to hotel" shortcut
- Documents & Emergency hub: on-device storage for tickets, insurance
  policy, passport photo; one-tap emergency dialing
- Full day-by-day itinerary merging flights/hotel/congress/moto, with a
  weather forecast chip per destination
- Localization: transit links point to English-language sources
- Packing list: categorized, interactive checklist
- Visual redesign: lucide-react icon set replacing emoji, polish pass
  across every page

## [2.1.0]

- Flights and Motorcycle route days are now editable in-app (same
  add/edit/delete pattern as Hotel/Congress) — the whole /itinerary can
  be kept current from the phone alone, no code/redeploy needed
- Color rebrand: "Berry Night" palette (wine red / amber gold / dark
  teal) replacing the original orange, chosen from a set of design
  exploration mockups
- Check for updates: the version badge (dashboard header + desktop
  sidebar) is now tappable — forces the service worker to check for a
  new release and reloads automatically once found. The SW's cache name
  is now generated from this file's version at build time
  (scripts/generate-sw.mjs), so every release gets a guaranteed-fresh
  cache — no more needing to reopen the app twice after an update

## [2.1.1]

- Fixed a real staleness bug caught while testing 2.1.0 live: the
  service worker's install-time precache fetches didn't bypass the
  HTTP cache, so a precache run landing during the CDN's brief
  post-deploy propagation window could bake a stale page into that
  version's cache permanently. Precache fetches now force
  `{cache: "reload"}`.

## [2.2.0]

- Theme toggle: a tappable control (dashboard header on mobile, sidebar
  footer on desktop) cycles אוטומטי (מערכת) → בהיר → כהה. Applies
  instantly via a `data-theme` attribute, no reload; an inline
  before-hydration script (lib/theme.ts THEME_INIT_SCRIPT) applies the
  stored choice before first paint so there's no flash of the wrong
  theme
- Per-item notes on /itinerary: every entry (flight, check-in/out,
  congress session, moto day) can now have a short personal note added
  from the phone — persisted to localStorage, shown as "הערה: …" in
  brand-2 (amber-gold) right under the entry, editable/removable
  in-place

## [2.2.1]

- Fixed a real false-negative caught testing 2.2.0's update-check live:
  the button gave up and reported "up to date" after a fixed 3s wait,
  but a genuine install (fetching + reload-precaching every app-shell
  route) can legitimately take longer than that — so it can finish
  *after* the button already told you nothing was happening, even
  though the update actually lands moments later regardless. Now checks
  reg.installing/reg.waiting immediately after reg.update() resolves:
  genuinely nothing to install resolves fast, a real install gets a
  proper 15s window before giving up.

## [2.3.0]

- Real Salsa Congress workshop schedule: 5 confirmed sessions (Fri
  Salsa Fusion Footwork on2, Sat x4 Partnerwork on2 / Bodymovement)
  replace the earlier all-placeholder sample schedule
- One-time auto-migration on /congress: since the placeholder schedule
  was already cached in localStorage on any device that had opened the
  app before, updating the seed data in code alone wouldn't reach it —
  added a safe migration that swaps in the real schedule automatically
  the next time /congress loads, but only when every stored event is
  still untouched placeholder data (never overwrites anything the user
  added themselves)

## [2.3.1]

- The floating "navigate to hotel" button now opens Google Maps
  instead of Waze.
