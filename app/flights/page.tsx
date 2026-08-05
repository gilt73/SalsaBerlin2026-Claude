"use client";

import FileAttachment from "@/components/FileAttachment";
import PageHeader from "@/components/PageHeader";
import { FLIGHT_BOOKING_SUMMARY, REAL_FLIGHTS } from "@/lib/tripData";
import { FlightLeg } from "@/lib/types";

function FlightCard({ flight }: { flight: FlightLeg }) {
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
        <span className="text-xs text-foreground/50">
          {flight.airline} · {flight.flightNumber}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-center flex-1">
          <p className="text-2xl font-extrabold">{flight.departTime}</p>
          <p className="text-sm font-semibold mt-0.5">{flight.departCode}</p>
          <p className="text-xs text-foreground/50">{flight.departAirport}</p>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1 text-foreground/40">
          <span className="text-xs">{flight.date}</span>
          <span className="w-full border-t border-dashed border-border relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm">
              ✈️
            </span>
          </span>
        </div>
        <div className="text-center flex-1">
          <p className="text-2xl font-extrabold">{flight.arriveTime}</p>
          <p className="text-sm font-semibold mt-0.5">{flight.arriveCode}</p>
          <p className="text-xs text-foreground/50">{flight.arriveAirport}</p>
          {flight.arriveDate !== flight.date && (
            <p className="text-[10px] text-brand-2 mt-0.5">+יום {flight.arriveDate}</p>
          )}
        </div>
      </div>

      {flight.notes && (
        <p className="text-xs text-foreground/55 mt-3 border-t border-border pt-2.5">
          {flight.notes}
        </p>
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
  return (
    <div>
      <PageHeader
        icon="✈️"
        title="טיסות ומסמכי נסיעה"
        subtitle={`הזמנה מס׳ ${FLIGHT_BOOKING_SUMMARY.bookingRef} · ${FLIGHT_BOOKING_SUMMARY.cardHolder}`}
      />

      <div className="flex flex-col gap-4">
        {REAL_FLIGHTS.map((f) => (
          <FlightCard key={f.id} flight={f} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface-muted p-4">
        <h2 className="text-sm font-semibold mb-2">סיכום תשלום</h2>
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
        הנתונים נשלפו מאישור ההזמנה שהתקבל בישראייר. יש לוודא צ׳ק-אין מקוון
        24–3 שעות לפני כל טיסה.
      </p>
    </div>
  );
}
