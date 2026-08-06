"use client";

import { useState } from "react";
import { Hotel as HotelIcon, X } from "lucide-react";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import WeatherChip from "@/components/WeatherChip";
import { useLocalStorage, genId } from "@/lib/storage";
import { REAL_HOTEL } from "@/lib/tripData";
import { HotelStay } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  address: "",
  city: "",
  checkIn: "",
  checkOut: "",
  confirmationNumber: "",
};

export default function HotelPage() {
  const [stays, setStays, hydrated] = useLocalStorage<HotelStay[]>("hotelStays", [
    REAL_HOTEL,
  ]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);

  function addStay(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.checkIn) return;
    const stay: HotelStay = { id: genId(), ...form };
    setStays((prev) =>
      [...prev, stay].sort((a, b) => a.checkIn.localeCompare(b.checkIn))
    );
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeStay(id: string) {
    setStays((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={HotelIcon}
        title="לינה ומלונות"
        subtitle="פרטי הזמנות, כתובות ומועדי צ׳ק-אין/אאוט"
      />

      <div className="rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 mb-5">
        <p className="font-semibold text-foreground mb-1">💡 עוד לינה נדרשת</p>
        <p>
          המלון בברלין (26–31/08) מאושר. עבור אזור מוריץ וורניגרודה לאורך
          מסלול הרכיבה (31/08–02/09) עדיין לא נמצאה הזמנה בתיבת הדואר —
          הוסיפו כאן כשתתבצע.
        </p>
      </div>

      {hydrated && stays.length === 0 && !showForm && (
        <div className="text-center py-10 text-foreground/45 text-sm">
          עדיין לא נוספו הזמנות לינה
        </div>
      )}

      <div className="flex flex-col gap-3">
        {stays.map((stay) => (
          <div key={stay.id} className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{stay.name}</h3>
                <p className="text-sm text-foreground/60 mt-0.5">
                  {stay.city}
                  {stay.address ? ` · ${stay.address}` : ""}
                </p>
              </div>
              <button
                onClick={() => removeStay(stay.id)}
                className="text-foreground/35 hover:text-danger shrink-0 transition-colors"
                aria-label="מחיקה"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-4 mt-3 text-sm items-start">
              <div>
                <p className="text-xs text-foreground/50">צ׳ק-אין</p>
                <p className="font-medium">{stay.checkIn || "—"}</p>
                {stay.checkIn && stay.lat != null && stay.lon != null && (
                  <WeatherChip lat={stay.lat} lon={stay.lon} dateISO={stay.checkIn} />
                )}
              </div>
              <div>
                <p className="text-xs text-foreground/50">צ׳ק-אאוט</p>
                <p className="font-medium">{stay.checkOut || "—"}</p>
              </div>
              {stay.confirmationNumber && (
                <div>
                  <p className="text-xs text-foreground/50">מס׳ אישור</p>
                  <p className="font-medium">{stay.confirmationNumber}</p>
                </div>
              )}
            </div>
            {stay.notes && (
              <p className="text-xs text-foreground/55 mt-3 border-t border-border pt-2.5 leading-relaxed">
                {stay.notes}
              </p>
            )}
            {stay.address && (
              <NavButtons
                location={{ name: stay.name, address: `${stay.address} ${stay.city}`, lat: stay.lat, lon: stay.lon }}
                className="mt-3"
              />
            )}
          </div>
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={addStay}
          className="mt-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="שם המלון"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="עיר / אזור"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="כתובת מלאה"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              צ׳ק-אין
              <input
                required
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              צ׳ק-אאוט
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <input
            placeholder="מספר אישור הזמנה"
            value={form.confirmationNumber}
            onChange={(e) =>
              setForm({ ...form, confirmationNumber: e.target.value })
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
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
          className="mt-4 w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60"
        >
          + הוספת מלון / הזמנה
        </button>
      )}
    </div>
  );
}
