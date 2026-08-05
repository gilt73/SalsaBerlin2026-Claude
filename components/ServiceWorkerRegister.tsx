"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return; // avoid caching issues during dev

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // ignore — app still works online without offline caching
      });
    };

    // This effect runs after React hydration, which happens after the
    // browser's `load` event in the vast majority of cases — so a plain
    // `window.addEventListener("load", ...)` here would attach a listener
    // for an event that already fired and never call back. Register
    // immediately if the page is already loaded, otherwise wait for it.
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
