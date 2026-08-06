"use client";

// Weather forecast via Open-Meteo — free, keyless, no signup. Same
// offline-first shape as lib/currency.ts: fetch when online, cache the
// whole daily forecast per location in localStorage, and serve the last
// cached data (clearly labeled) when offline or once the trip date falls
// outside Open-Meteo's ~16-day forecast horizon.

export type DayForecast = {
  date: string; // yyyy-mm-dd
  tempMaxC: number;
  tempMinC: number;
  weatherCode: number;
};

export type WeatherResult = {
  days: DayForecast[];
  fetchedAt: number;
  source: "live" | "cache";
};

const CACHE_PREFIX = "weather-";
const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

// WMO weather codes -> a compact emoji + short Hebrew label.
export function weatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

function cacheKey(lat: number, lon: number) {
  // Round to ~1km precision — plenty for weather, keeps the cache key
  // stable across tiny coordinate jitter.
  return `${CACHE_PREFIX}${lat.toFixed(2)},${lon.toFixed(2)}`;
}

export async function getForecast(lat: number, lon: number): Promise<WeatherResult | null> {
  const key = cacheKey(lat, lon);
  const cached = readCache(key);

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return cached;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=16`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();
    const dates: string[] = data?.daily?.time ?? [];
    const max: number[] = data?.daily?.temperature_2m_max ?? [];
    const min: number[] = data?.daily?.temperature_2m_min ?? [];
    const codes: number[] = data?.daily?.weathercode ?? [];

    const days: DayForecast[] = dates.map((date, i) => ({
      date,
      tempMaxC: max[i],
      tempMinC: min[i],
      weatherCode: codes[i],
    }));

    const fresh: WeatherResult = { days, fetchedAt: Date.now(), source: "live" };
    writeCache(key, fresh);
    return fresh;
  } catch {
    return cached;
  }
}

/** Look up one date within an already-fetched forecast (or null if out of range). */
export function forDate(result: WeatherResult | null, dateISO: string): DayForecast | null {
  if (!result) return null;
  return result.days.find((d) => d.date === dateISO) ?? null;
}

function readCache(key: string): WeatherResult | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WeatherResult;
    return { ...parsed, source: "cache" };
  } catch {
    return null;
  }
}

function writeCache(key: string, value: WeatherResult) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function isCacheFresh(result: WeatherResult) {
  return Date.now() - result.fetchedAt < CACHE_TTL_MS;
}
