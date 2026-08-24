"use client";

export type UpdateCheckResult = "updated" | "up-to-date" | "unsupported" | "error";

/**
 * Forces the service worker to re-fetch /sw.js and compare it against the
 * currently installed one. Because the SW script now embeds the app
 * version in its cache name (see app/sw.js/route.ts), a real version
 * bump always looks byte-different, so the browser installs it — and
 * since our worker calls skipWaiting()/clients.claim() immediately,
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
      // No new worker took control within this window → already current.
      setTimeout(() => finish("up-to-date"), 3000);
    });
  } catch {
    return "error";
  }
}
