"use client";

import { useMemo } from "react";
import {
  CalendarDays,
  Plane,
  LogIn,
  LogOut,
  PartyPopper,
  Bike,
  type LucideIcon,
} from "lucide-react";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import WeatherChip from "@/components/WeatherChip";
import { toISODate } from "@/lib/date";
import { useLocalStorage } from "@/lib/storage";
import { MOTO_DAYS, REAL_FLIGHTS, REAL_HOTEL, SAMPLE_CONGRESS_EVENTS } from "@/lib/tripData";
import { CongressEvent, HotelStay, Location } from "@/lib/types";

type Entry = {
  id: string;
  dateISO: string;
  time?: string; // only set when a real, known clock time exists — always what's displayed
  sortKey: string; // internal ordering only, never shown
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  location?: Location;
  isSample?: boolean;
};

export default function ItineraryPage() {
  const [hotelStays] = useLocalStorage<HotelStay[]>("hotelStays", [REAL_HOTEL]);
  const [congressEvents] = useLocalStorage<CongressEvent[]>(
    "congressEvents",
    SAMPLE_CONGRESS_EVENTS
  );

  const grouped = useMemo(() => {
    const entries: Entry[] = [];

    for (const f of REAL_FLIGHTS) {
      entries.push({
        id: `flight-${f.id}`,
        dateISO: toISODate(f.date),
        time: f.departTime,
        sortKey: f.departTime,
        icon: Plane,
        title: `טיסה ${f.departCode} → ${f.arriveCode} (${f.flightNumber})`,
        subtitle: `${f.airline} · המראה ${f.departTime}, נחיתה ${f.arriveTime}`,
        location: f.departLocation,
      });
    }

    for (const stay of hotelStays) {
      entries.push({
        id: `checkout-${stay.id}`,
        dateISO: stay.checkOut,
        time: stay.checkOutTime,
        sortKey: stay.checkOutTime || "10:00",
        icon: LogOut,
        title: `צ׳ק-אאוט מ${stay.name}`,
        location: { name: stay.name, address: `${stay.address} ${stay.city}`, lat: stay.lat, lon: stay.lon },
      });
      entries.push({
        id: `checkin-${stay.id}`,
        dateISO: stay.checkIn,
        time: stay.checkInTime,
        sortKey: stay.checkInTime || "15:00",
        icon: LogIn,
        title: `צ׳ק-אין ב${stay.name}`,
        location: { name: stay.name, address: `${stay.address} ${stay.city}`, lat: stay.lat, lon: stay.lon },
      });
    }

    for (const ev of congressEvents) {
      entries.push({
        id: `congress-${ev.id}`,
        dateISO: ev.date,
        time: ev.startTime,
        sortKey: ev.startTime,
        icon: PartyPopper,
        title: ev.title,
        subtitle: ev.hall,
        isSample: ev.isSample,
      });
    }

    for (const d of MOTO_DAYS) {
      entries.push({
        id: `moto-${d.id}`,
        dateISO: toISODate(d.date),
        sortKey: "12:30", // no real departure time known — sorts mid-day, not displayed
        icon: Bike,
        title: `רכיבה: ${d.day}`,
        subtitle: d.route,
        location: d.destination,
        isSample: d.isSample,
      });
    }

    const byDate = new Map<string, Entry[]>();
    for (const e of entries) {
      if (!byDate.has(e.dateISO)) byDate.set(e.dateISO, []);
      byDate.get(e.dateISO)!.push(e);
    }
    for (const list of byDate.values()) {
      list.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
    }
    return Array.from(byDate.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [hotelStays, congressEvents]);

  return (
    <div>
      <PageHeader
        icon={CalendarDays}
        title="הלו״ז המלא"
        subtitle="כל הטיול במקום אחד — טיסות, לינה, קונגרס ורכיבה, יום אחר יום"
      />

      <div className="flex flex-col gap-6">
        {grouped.map(([dateISO, entries]) => (
          <section key={dateISO}>
            <h2 className="text-sm font-bold text-foreground/70 mb-2.5 sticky top-0 bg-background/90 backdrop-blur py-1">
              {new Date(dateISO + "T12:00:00").toLocaleDateString("he-IL", {
                weekday: "long",
                day: "numeric",
                month: "numeric",
              })}
            </h2>
            <ol className="flex flex-col gap-2.5">
              {entries.map((e) => {
                const Icon = e.icon;
                return (
                  <li
                    key={e.id}
                    className="rounded-xl border border-border bg-surface p-3 flex items-start gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-brand-1/10 text-brand-1 flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {e.time && <span className="text-xs font-bold">{e.time}</span>}
                        <p className="text-sm font-medium">{e.title}</p>
                        {e.isSample && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-foreground/10 text-foreground/45">
                            לדוגמה
                          </span>
                        )}
                      </div>
                      {e.subtitle && (
                        <p className="text-xs text-foreground/55 mt-0.5">{e.subtitle}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {e.location?.lat != null && e.location.lon != null && (
                          <WeatherChip
                            lat={e.location.lat}
                            lon={e.location.lon}
                            dateISO={dateISO}
                          />
                        )}
                        {e.location && <NavButtons location={e.location} />}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
