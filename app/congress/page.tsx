"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { useLocalStorage, genId } from "@/lib/storage";
import { SAMPLE_CONGRESS_EVENTS } from "@/lib/tripData";
import { CongressEvent } from "@/lib/types";

const CATEGORY_LABEL: Record<CongressEvent["category"], string> = {
  workshop: "סדנה",
  party: "מסיבה",
  show: "הופעה",
  other: "כללי",
};

const CATEGORY_STYLE: Record<CongressEvent["category"], string> = {
  workshop: "bg-accent/15 text-accent",
  party: "bg-brand-2/15 text-brand-2",
  show: "bg-brand-1/15 text-brand-1",
  other: "bg-foreground/10 text-foreground/60",
};

const EMPTY_FORM = {
  day: "",
  date: "",
  startTime: "",
  endTime: "",
  title: "",
  category: "workshop" as CongressEvent["category"],
  hall: "",
};

export default function CongressPage() {
  const [events, setEvents, hydrated] = useLocalStorage<CongressEvent[]>(
    "congressEvents",
    SAMPLE_CONGRESS_EVENTS
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const grouped = useMemo(() => {
    const sorted = [...events].sort((a, b) =>
      `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`)
    );
    const map = new Map<string, CongressEvent[]>();
    for (const ev of sorted) {
      const key = `${ev.date}__${ev.day}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return Array.from(map.entries());
  }, [events]);

  function addEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.date || !form.startTime) return;
    setEvents((prev) => [...prev, { id: genId(), ...form }]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  const hasSampleData = hydrated && events.some((e) => e.isSample);

  return (
    <div>
      <PageHeader
        icon="💃"
        title="קונגרס הסלסה"
        subtitle="לו״ז סדנאות, שיעורים ומסיבות לפי ימים ושעות"
      />

      {hasSampleData && (
        <div className="rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 mb-5">
          <p className="font-semibold text-foreground mb-1">📋 לו״ז לדוגמה</p>
          <p>
            הלו״ז הרשמי של Berlin Salsacongress 2026 עדיין לא פורסם (נמצאה רק
            הרשמה להגרלת כרטיסים בתיבת הדואר). ערכו/מחקו והוסיפו פריטים לפי
            הלו״ז הרשמי כשיתפרסם.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {grouped.map(([key, dayEvents]) => (
          <section key={key}>
            <h2 className="text-sm font-bold text-foreground/70 mb-2.5 sticky top-0 bg-background/90 backdrop-blur py-1">
              {dayEvents[0].day} · {dayEvents[0].date}
            </h2>
            <ol className="flex flex-col gap-2.5">
              {dayEvents.map((ev) => (
                <li
                  key={ev.id}
                  className="rounded-xl border border-border bg-surface p-3 flex items-start gap-3"
                >
                  <div className="text-center shrink-0 w-14">
                    <p className="text-sm font-bold">{ev.startTime}</p>
                    {ev.endTime && (
                      <p className="text-[11px] text-foreground/45">{ev.endTime}</p>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_STYLE[ev.category]}`}
                      >
                        {CATEGORY_LABEL[ev.category]}
                      </span>
                      {ev.hall && (
                        <span className="text-[11px] text-foreground/45">{ev.hall}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{ev.title}</p>
                  </div>
                  <button
                    onClick={() => removeEvent(ev.id)}
                    className="text-xs text-danger shrink-0"
                    aria-label="מחיקה"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={addEvent}
          className="mt-5 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="שם האירוע"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="יום (למשל: יום שישי)"
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-3 gap-3">
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
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              שעת התחלה
              <input
                required
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              שעת סיום
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as CongressEvent["category"] })
              }
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              placeholder="אולם"
              value={form.hall}
              onChange={(e) => setForm({ ...form, hall: e.target.value })}
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
          className="mt-5 w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60"
        >
          + הוספת אירוע ללו״ז
        </button>
      )}
    </div>
  );
}
