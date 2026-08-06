"use client";

import { Bike, ShieldCheck, Clock, Check } from "lucide-react";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import WeatherChip from "@/components/WeatherChip";
import { toISODate } from "@/lib/date";
import { MOTO_DAYS, MOTO_SAFETY_NOTES, RENTAL_OPTIONS } from "@/lib/tripData";

export default function MotoPage() {
  return (
    <div>
      <PageHeader
        icon={Bike}
        title="מסלולי רכיבה על אופנוע"
        subtitle="איסוף בברלין · רכיבה בקצב אישי ורגוע"
      />

      <div className="flex flex-col gap-3">
        {MOTO_DAYS.map((d, i) => (
          <div key={d.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full brand-gradient text-white text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-semibold">
                  {d.day} · {d.date}
                </h3>
              </div>
              {d.isSample && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/50">
                  לדוגמה
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed">{d.route}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <p className="flex items-center gap-1 text-xs text-foreground/50">
                <Clock size={13} /> {d.duration}
              </p>
              {d.destination && (
                <WeatherChip
                  lat={d.destination.lat}
                  lon={d.destination.lon}
                  dateISO={toISODate(d.date)}
                />
              )}
            </div>
            <p className="text-xs text-foreground/60 mt-2 leading-relaxed border-t border-border pt-2">
              {d.highlights}
            </p>
            {d.destination && (
              <NavButtons location={d.destination} className="mt-3" />
            )}
          </div>
        ))}
      </div>

      <section className="mt-6">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground/60 mb-3">
          <Bike size={16} /> השכרת אופנוע (~100€/יום)
        </h2>
        <div className="flex flex-col gap-2">
          {RENTAL_OPTIONS.map((r) => (
            <a
              key={r.id}
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-border bg-surface p-3.5 hover:border-brand-1/50"
            >
              <span className="text-sm font-medium">{r.model}</span>
              <span className="text-xs text-foreground/50">{r.pricePerDay} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface-muted p-4">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold mb-2.5">
          <ShieldCheck size={16} /> הנחיות בטיחות
        </h2>
        <ul className="flex flex-col gap-2 text-sm text-foreground/70">
          {MOTO_SAFETY_NOTES.map((note, i) => (
            <li key={i} className="flex gap-2">
              <Check size={15} className="text-accent shrink-0 mt-0.5" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
