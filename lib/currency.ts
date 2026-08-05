"use client";

// EUR <-> ILS converter with an offline-first cache.
// Uses the free, keyless Frankfurter API when online; falls back to the
// last cached rate (or a rough static fallback) when offline so the
// converter still works mid-ride with no signal.

const CACHE_KEY = "eurIlsRate";
const FALLBACK_RATE = 3.95; // approximate EUR->ILS, used only if nothing cached yet

export type RateCache = {
  rate: number;
  fetchedAt: number;
  source: "live" | "cache" | "fallback";
};

export async function getEurToIlsRate(): Promise<RateCache> {
  const cached = readCache();

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return cached ?? { rate: FALLBACK_RATE, fetchedAt: 0, source: "fallback" };
  }

  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=ILS", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    const rate = data?.rates?.ILS;
    if (typeof rate !== "number") throw new Error("no rate in response");

    const fresh: RateCache = { rate, fetchedAt: Date.now(), source: "live" };
    writeCache(fresh);
    return fresh;
  } catch {
    return cached ?? { rate: FALLBACK_RATE, fetchedAt: 0, source: "fallback" };
  }
}

function readCache(): RateCache | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RateCache;
    return { ...parsed, source: "cache" };
  } catch {
    return null;
  }
}

function writeCache(rate: RateCache) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(rate));
  } catch {
    // ignore
  }
}
