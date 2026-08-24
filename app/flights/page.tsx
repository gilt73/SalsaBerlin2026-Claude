"use client";

import { useState } from "react";
import { Plane, PlaneTakeoff, X } from "lucide-react";
import FileAttachment from "@/components/FileAttachment";
import NavButtons from "@/components/NavButtons";
import PageHeader from "@/components/PageHeader";
import { formatDateHe } from "@/lib/date";
import { genId, useLocalStorage } from "@/lib/storage";
import { FLIGHT_BOOKING_SUMMARY, REAL_FLIGHTS } from "@/lib/tripData";
import { FlightLeg } from "@/lib/types";

const EMPTY_FORM = {
  direction: "outbound" as FlightLeg["direction"],
  airline: "",
  flightNumber: "",
  date: "",
  departTime: "",
  departAirport: "",
  departCode: "",
  departAddress: "",
  arriveDate: "",
  arriveTime: "",
  arriveAirport: "",
  arriveCode: "",
  notes: "",
};

function FlightCard({
  flight,
  onRemove,
}: {
  flight: FlightLeg;
  onRemove: (id: string) => void;
}) {
  const isOutbound = flight.direction === "outbound";
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            isOutbound
              ? "bg-brand-1/15 text-brand-1"
              : "bg-brand-2/15 text-brand-2"
          }`}
        >
          {isOutbound ? "טיסת הלוך" : "טיסת חזור"}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/50">
            {flight.airline} · {flight.flightNumber}
          </span>
          <button
            onClick={() => onRemove(flight.id)}
            className="text-foreground/35 hover:text-danger transition-colors"
            aria-label="מחיקה"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-center flex-1">
          <p className="text-2xl font-extrabold">{flight.departTime}</p>
          <p className="text-sm font-semibold mt-0.5">{flight.departCode}</p>
          <p className="text-xs text-foreground/50">{flight.departAirport}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1 text-foreground/40">
          <span className="text-xs">{formatDateHe(flight.date)}</span>
          <span className="w-full border-t border-dashed border-border relative">
            <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 bg-surface px-0.5 text-brand-1">
              <Plane size={14} />
            </span>
          </span>
        </div>
        <div className="text-center flex-1">
          <p className="text-2xl font-extrabold">{flight.arriveTime}</p>
          <p className="text-sm font-semibold mt-0.5">{flight.arriveCode}</p>
          <p className="text-xs text-foreground/50">{flight.arriveAirport}</p>
          {flight.arriveDate !== flight.date && (
            <p className="text-[10px] text-brand-2 mt-0.5">
              +יום {formatDateHe(flight.arriveDate)}
            </p>
          )}
        </div>
      </div>

      {flight.notes && (
        <p className="text-xs text-foreground/55 mt-3 border-t border-border pt-2.5">
          {flight.notes}
        </p>
      )}

      {flight.departLocation && (
        <div className="flex items-center gap-2 mt-3">
          <PlaneTakeoff size={14} className="text-foreground/40 shrink-0" />
          <span className="text-xs text-foreground/50 shrink-0">ניווט לשדה:</span>
          <NavButtons location={flight.departLocation} />
        </div>
      )}

      <div className="mt-3">
        <FileAttachment
          storageKey={`boarding-pass-${flight.id}`}
          label={`כרטיס עלייה למטוס — ${isOutbound ? "הלוך" : "חזור"}`}
        />
      </div>
    </div>
  );
}

export default function FlightsPage() {
  const [flights, setFlights] = useLocalStorage<FlightLeg[]>(
    "flights",
    REAL_FLIGHTS
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function addFlight(e: React.FormEvent) {
    e.preventDefault();
    if (!form.flightNumber || !form.date || !form.departTime) return;
    const flight: FlightLeg = {
      id: genId(),
      direction: form.direction,
      airline: form.airline || "—",
      flightNumber: form.flightNumber,
      bookingRef: "",
      date: form.date,
      departTime: form.departTime,
      departAirport: form.departAirport,
      departCode: form.departCode.toUpperCase(),
      departLocation: form.departAirport
        ? {
            name: form.departAirport,
            address: form.departAddress || undefined,
          }
        : undefined,
      arriveDate: form.arriveDate || form.date,
      arriveTime: form.arriveTime,
      arriveAirport: form.arriveAirport,
      arriveCode: form.arriveCode.toUpperCase(),
      passenger: "",
      notes: form.notes || undefined,
    };
    setFlights((prev) =>
      [...prev, flight].sort((a, b) =>
        `${a.date}${a.departTime}`.localeCompare(`${b.date}${b.departTime}`)
      )
    );
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeFlight(id: string) {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={Plane}
        title="טיסות ומסמכי נסיעה"
        subtitle={`הזמנה מס׳ ${FLIGHT_BOOKING_SUMMARY.bookingRef} · ${FLIGHT_BOOKING_SUMMARY.cardHolder}`}
      />

      <div className="flex flex-col gap-4">
        {flights.map((f) => (
          <FlightCard key={f.id} flight={f} onRemove={removeFlight} />
        ))}
      </div>

      {showForm ? (
        <form
          onSubmit={addFlight}
          className="mt-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <select
            value={form.direction}
            onChange={(e) =>
              setForm({ ...form, direction: e.target.value as FlightLeg["direction"] })
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="outbound">טיסת הלוך</option>
            <option value="return">טיסת חזור</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="חברת תעופה"
              value={form.airline}
              onChange={(e) => setForm({ ...form, airline: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              required
              placeholder="מספר טיסה"
              value={form.flightNumber}
              onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <p className="text-xs font-semibold text-foreground/50 mt-1">המראה</p>
          <div className="grid grid-cols-2 gap-3">
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
              שעה
              <input
                required
                type="time"
                value={form.departTime}
                onChange={(e) => setForm({ ...form, departTime: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="שדה תעופה (למשל: נתב״ג)"
              value={form.departAirport}
              onChange={(e) => setForm({ ...form, departAirport: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="קוד (TLV)"
              value={form.departCode}
              onChange={(e) => setForm({ ...form, departCode: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              dir="ltr"
            />
          </div>
          <input
            placeholder="כתובת שדה התעופה (אופציונלי, לניווט מדויק)"
            value={form.departAddress}
            onChange={(e) => setForm({ ...form, departAddress: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />

          <p className="text-xs font-semibold text-foreground/50 mt-1">נחיתה</p>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              תאריך (אם שונה)
              <input
                type="date"
                value={form.arriveDate}
                onChange={(e) => setForm({ ...form, arriveDate: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              שעה
              <input
                type="time"
                value={form.arriveTime}
                onChange={(e) => setForm({ ...form, arriveTime: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="שדה תעופה"
              value={form.arriveAirport}
              onChange={(e) => setForm({ ...form, arriveAirport: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="קוד (BER)"
              value={form.arriveCode}
              onChange={(e) => setForm({ ...form, arriveCode: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              dir="ltr"
            />
          </div>
          <input
            placeholder="הערה (אופציונלי)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
          + הוספת טיסה
        </button>
      )}

      <div className="mt-5 rounded-2xl border border-border bg-surface-muted p-4">
        <h2 className="text-sm font-semibold mb-2">סיכום תשלום (הזמנה מקורית)</h2>
        <dl className="text-sm space-y-1.5">
          <div className="flex justify-between">
            <dt className="text-foreground/60">מחיר בסיס</dt>
            <dd>{FLIGHT_BOOKING_SUMMARY.baseFare}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-foreground/60">כבודה</dt>
            <dd>{FLIGHT_BOOKING_SUMMARY.baggage}</dd>
          </div>
          <div className="flex justify-between font-bold border-t border-border pt-1.5 mt-1.5">
            <dt>סה״כ שולם</dt>
            <dd>{FLIGHT_BOOKING_SUMMARY.totalPaid}</dd>
          </div>
        </dl>
      </div>

      <p className="text-xs text-foreground/45 mt-4">
        יש לוודא צ׳ק-אין מקוון 24–3 שעות לפני כל טיסה.
      </p>
    </div>
  );
}
