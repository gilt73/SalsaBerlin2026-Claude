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
