"use client";

import Countdown from "@/components/Countdown";
import QuickCard from "@/components/QuickCard";
import {
  CONGRESS_START_ISO_PLACEHOLDER,
  OUTBOUND_DEPARTURE_ISO,
  REAL_FLIGHTS,
  TRIP_TITLE,
} from "@/lib/tripData";

const QUICK_LINKS = [
  { href: "/flights", title: "טיסות", subtitle: "כרטיסים ומסמכי נסיעה", icon: "✈️" },
  { href: "/hotel", title: "לינה", subtitle: "מלונות והזמנות", icon: "🏨" },
  { href: "/congress", title: "קונגרס סלסה", subtitle: "לו״ז סדנאות ומסיבות", icon: "💃" },
  { href: "/moto", title: "רכיבת אופנוע", subtitle: "מסלולים יומיים והשכרה", icon: "🏍️" },
  { href: "/expenses", title: "כספים", subtitle: "מעקב הוצאות + המרת מטבע", icon: "💶" },
  { href: "/music", title: "מוזיקה", subtitle: "פלייליסטים לרכיבה ומנוחה", icon: "🎧" },
  { href: "/transport", title: "ניידות", subtitle: "Uber, Bolt, תחבורה ציבורית", icon: "🚕" },
  { href: "/food", title: "קולינריה", subtitle: "המלצות לאורך המסלול", icon: "🍽️" },
];

export default function DashboardPage() {
  const outbound = REAL_FLIGHTS.find((f) => f.direction === "outbound")!;

  return (
    <div>
      <header className="mb-6">
        <p className="text-sm font-medium text-brand-2">מרכז שליטה לטיול</p>
        <h1 className="text-2xl font-extrabold mt-1">{TRIP_TITLE}</h1>
        <p className="text-sm text-foreground/55 mt-1">
          {outbound.date} – {REAL_FLIGHTS[1].arriveDate} · תל אביב ⇄ ברלין
        </p>
      </header>

      <section
        aria-label="ספירה לאחור"
        className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 lg:mx-0 lg:px-0"
      >
        <Countdown label="לטיסה לברלין" targetISO={OUTBOUND_DEPARTURE_ISO} icon="✈️" />
        <Countdown
          label="לתחילת הקונגרס (משוער)"
          targetISO={CONGRESS_START_ISO_PLACEHOLDER}
          icon="💃"
        />
      </section>

      <section className="mt-7">
        <h2 className="text-sm font-semibold text-foreground/60 mb-3">
          גישה מהירה
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_LINKS.map((item) => (
            <QuickCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-7 rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 leading-relaxed">
        <p className="font-semibold text-foreground mb-1">💡 מצב לא מקוון</p>
        <p>
          כל הנתונים (טיסות, הוצאות, לו״ז, מסמכים) נשמרים ישירות על המכשיר
          שלך ונטענים גם ללא קליטה סלולרית — שימושי במיוחד במהלך הרכיבה.
        </p>
      </section>
    </div>
  );
}
