// Minimal app-shell service worker for offline access.
// Strategy: stale-while-revalidate for same-origin GET requests.
// Everything the app needs (trip data, expenses, files) lives in
// localStorage/IndexedDB, not on a server, so caching the shell pages +
// static assets is enough for full offline use once visited.

const CACHE_NAME = "salsa-berlin-2026-v1";
const APP_SHELL = [
  "/",
  "/flights",
  "/hotel",
  "/congress",
  "/moto",
  "/expenses",
  "/todo",
  "/music",
  "/transport",
  "/food",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        APP_SHELL.map((url) => cache.add(url).catch(() => {}))
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let cross-origin (e.g. currency API) hit the network directly

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
