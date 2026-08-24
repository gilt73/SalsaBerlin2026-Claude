"use client";

export type UpdateCheckResult = "updated" | "up-to-date" | "unsupported" | "error";

/**
 * Forces the service worker to re-fetch /sw.js and compare it against the
 * currently installed one. Because the SW script now embeds the app
 * version in its cache name (see scripts/generate-sw.mjs), a real
 * version bump always looks byte-different, so the browser installs it
 * — and since our worker calls skipWaiting()/clients.claim() immediately,
 * that new worker takes over right away (fires "controllerchange").
 *
 * Resolves "updated" only once the new worker has actually taken
 * control — at that point the cache is guaranteed empty under its new
 * name, so a page reload is guaranteed to fetch fresh content, not a
 * stale cached copy.
 */
export async function checkForUpdate(): Promise<UpdateCheckResult> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return "unsupported";
  }

  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return "unsupported"; // not registered (e.g. running in dev)

    await reg.update();

    // reg.update()'s promise resolves once the browser has fetched and
    // byte-compared /sw.js — if a new worker is genuinely different, it
    // starts installing essentially immediately, so reg.installing (or
    // .waiting, in case skipWaiting hasn't run yet) being set right here
    // is a reliable "an update IS happening" signal. If neither is set,
    // there's truly nothing to wait for — resolve fast instead of
    // padding out a guaranteed "up to date" result with a fake delay.
    if (!reg.installing && !reg.waiting) {
      return "up-to-date";
    }

    return await new Promise<UpdateCheckResult>((resolve) => {
      let settled = false;
      const finish = (result: UpdateCheckResult) => {
        if (settled) return;
        settled = true;
        navigator.serviceWorker.removeEventListener("controllerchange", onChange);
        resolve(result);
      };
      const onChange = () => finish("updated");

      navigator.serviceWorker.addEventListener("controllerchange", onChange);
      // A real install here means fetching + cache:"reload"-precaching
      // every app-shell route (bypassing HTTP cache on purpose, see the
      // 2.1.1 fix) before it can activate — on a slow connection that's
      // a few real seconds, not milliseconds. Give it real room rather
      // than falsely reporting "up to date" while it's still working.
      setTimeout(() => finish("error"), 15000);
    });
  } catch {
    return "error";
  }
}
