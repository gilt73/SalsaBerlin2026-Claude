"use client";

import { useMemo, useState } from "react";
import { UtensilsCrossed, ClipboardList, MapPin, X } from "lucide-react";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import { useLocalStorage, genId } from "@/lib/storage";
import { SAMPLE_FOOD_SPOTS } from "@/lib/tripData";
import { FoodSpot } from "@/lib/types";

const EMPTY_FORM = { name: "", area: "", type: "", notes: "" };

export default function FoodPage() {
  const [spots, setSpots, hydrated] = useLocalStorage<FoodSpot[]>(
    "foodSpots",
    SAMPLE_FOOD_SPOTS
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const grouped = useMemo(() => {
    const map = new Map<string, FoodSpot[]>();
    for (const spot of spots) {
      if (!map.has(spot.area)) map.set(spot.area, []);
      map.get(spot.area)!.push(spot);
    }
    return Array.from(map.entries());
  }, [spots]);

  function addSpot(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.area) return;
    setSpots((prev) => [...prev, { id: genId(), ...form }]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeSpot(id: string) {
    setSpots((prev) => prev.filter((s) => s.id !== id));
  }

  const hasSampleData = hydrated && spots.some((s) => s.isSample);

  return (
    <div>
      <PageHeader
        icon={UtensilsCrossed}
        title="המלצות קולינריות"
        subtitle="מסעדות, בתי קפה ותחנות עצירה לאורך המסלול"
      />

      {hasSampleData && (
        <div className="rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 mb-5">
          <p className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
            <ClipboardList size={15} /> הצעות לבדיקה
          </p>
          <p>
            הפריטים הבאים הם הצעות ראשוניות לפי אזור — יש לוודא ולעדכן לפי
            מיקום בפועל וביקורות עדכניות לפני היציאה לדרך.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {grouped.map(([area, areaSpots]) => (
          <section key={area}>
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-foreground/70 mb-2.5">
              <MapPin size={14} /> {area}
            </h2>
            <div className="flex flex-col gap-2.5">
              {areaSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="rounded-xl border border-border bg-surface p-3 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{spot.name}</p>
                      {spot.type && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-muted text-foreground/55">
                          {spot.type}
                        </span>
                      )}
                    </div>
                    {spot.notes && (
                      <p className="text-xs text-foreground/55 mt-1">{spot.notes}</p>
                    )}
                    {!spot.isSample && (
                      <NavButtons
                        location={{
                          name: spot.name,
                          address: spot.mapUrl ? undefined : `${spot.name}, ${spot.area}`,
                        }}
                        className="mt-2"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => removeSpot(spot.id)}
                    className="text-foreground/35 hover:text-danger shrink-0 transition-colors"
                    aria-label="מחיקה"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={addSpot}
          className="mt-5 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="שם המקום"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="אזור / עיר"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="סוג (מסעדה / קפה...)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <textarea
            placeholder="הערות"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            rows={2}
          />
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
          + הוספת המלצה
        </button>
      )}
    </div>
  );
}
