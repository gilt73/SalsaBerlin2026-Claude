"use client";

import { useEffect, useState } from "react";
import { forDate, getForecast, weatherIcon, WeatherResult } from "@/lib/weather";

export default function WeatherChip({
  lat,
  lon,
  dateISO,
}: {
  lat?: number;
  lon?: number;
  dateISO: string; // yyyy-mm-dd
}) {
  const [result, setResult] = useState<WeatherResult | null | undefined>(undefined);

  useEffect(() => {
    if (lat == null || lon == null) return;
    let cancelled = false;
    getForecast(lat, lon).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [lat, lon]);

  if (lat == null || lon == null) return null;
  if (result === undefined) {
    return <span className="text-xs text-foreground/35">מזג אוויר…</span>;
  }
  const day = forDate(result, dateISO);
  if (!day) {
    return (
      <span className="text-xs text-foreground/35">תחזית תתעדכן בהמשך</span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/65">
      <span>{weatherIcon(day.weatherCode)}</span>
      <span>
        {Math.round(day.tempMinC)}°–{Math.round(day.tempMaxC)}°
      </span>
    </span>
  );
}
