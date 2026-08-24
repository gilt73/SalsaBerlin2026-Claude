"use client";

import { useState } from "react";
import { Bike, ShieldCheck, Clock, Check, X } from "lucide-react";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import WeatherChip from "@/components/WeatherChip";
import { formatDateHe } from "@/lib/date";
import { genId, useLocalStorage } from "@/lib/storage";
import { MOTO_DAYS, MOTO_SAFETY_NOTES, RENTAL_OPTIONS } from "@/lib/tripData";
import { MotoDay } from "@/lib/types";

const EMPTY_FORM = {
  day: "",
  date: "",
  route: "",
  duration: "",
  highlights: "",
  destinationName: "",
  destinationAddress: "",
};

export default function MotoPage() {
  const [days, setDays] = useLocalStorage<MotoDay[]>("motoDays", MOTO_DAYS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function addDay(e: React.FormEvent) {
    e.preventDefault();
    if (!form.day || !form.date || !form.route) return;
    const day: MotoDay = {
      id: genId(),
      day: form.day,
      date: form.date,
      route: form.route,
      duration: form.duration,
      highlights: form.highlights,
      destination: form.destinationName
        ? { name: form.destinationName, address: form.destinationAddress || undefined }
        : undefined,
    };
    setDays((prev) => [...prev, day].sort((a, b) => a.date.localeCompare(b.date)));
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeDay(id: string) {
    setDays((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={Bike}
        title="מסלולי רכיבה על אופנוע"
        subtitle="איסוף בברלין · רכיבה בקצב אישי ורגוע"
      />

      <div className="flex flex-col gap-3">
        {days.map((d, i) => (
          <div key={d.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full brand-gradient text-white text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-semibold">
                  {d.day} · {formatDateHe(d.date)}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {d.isSample && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/50">
                    לדוגמה
                  </span>
                )}
                <button
                  onClick={() => removeDay(d.id)}
                  className="text-foreground/35 hover:text-danger transition-colors"
                  aria-label="מחיקה"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{d.route}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {d.duration && (
                <p className="flex items-center gap-1 text-xs text-foreground/50">
                  <Clock size={13} /> {d.duration}
                </p>
              )}
              {d.destination && (
                <WeatherChip
                  lat={d.destination.lat}
                  lon={d.destination.lon}
                  dateISO={d.date}
                />
              )}
            </div>
            {d.highlights && (
              <p className="text-xs text-foreground/60 mt-2 leading-relaxed border-t border-border pt-2">
                {d.highlights}
              </p>
            )}
            {d.destination && (
              <NavButtons location={d.destination} className="mt-3" />
            )}
          </div>
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={addDay}
          className="mt-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="יום (למשל: יום חמישי)"
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              תאריך
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <textarea
            required
            placeholder="תיאור המסלול (מוצא ← יעד)"
            value={form.route}
            onChange={(e) => setForm({ ...form, route: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            rows={2}
          />
          <input
            placeholder="זמן רכיבה משוער"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <textarea
            placeholder="דגשים ועצירות (אופציונלי)"
            value={form.highlights}
            onChange={(e) => setForm({ ...form, highlights: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            rows={2}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="יעד היום (לניווט ומזג אוויר)"
              value={form.destinationName}
              onChange={(e) => setForm({ ...form, destinationName: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="כתובת (אופציונלי)"
              value={form.destinationAddress}
              onChange={(e) => setForm({ ...form, destinationAddress: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg brand-gradient text-white text-sm font-semibold py-2.5"
            >
              שמירה
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg bg-surface-muted text-sm font-semibold px-4 py-2.5"
            >
              ביטול
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60"
        >
          + הוספת יום רכיבה
        </button>
      )}

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
