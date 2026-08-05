"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Generic localStorage-backed state hook. Used for all "simple" module
 * data (hotel info, congress events, playlist links, food spots, etc.)
 * so every module keeps working fully offline once loaded once.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount (SSR has no `window`),
    // so syncing it into state here — rather than a lazy useState
    // initializer — is required to avoid a hydration mismatch.
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore corrupt storage, fall back to initialValue
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof updater === "function"
            ? (updater as (prev: T) => T)(prev)
            : updater;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // storage full / unavailable — state still updates in memory
        }
        return next;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}

export function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
