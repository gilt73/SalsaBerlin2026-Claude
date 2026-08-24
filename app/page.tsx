"use client";

import {
  Plane,
  Hotel as HotelIcon,
  PartyPopper,
  Bike,
  Wallet,
  ListChecks,
  Headphones,
  Car,
  UtensilsCrossed,
  CalendarDays,
  ShieldAlert,
  Backpack,
  Info,
} from "lucide-react";
import Countdown from "@/components/Countdown";
import QuickCard from "@/components/QuickCard";
import VersionBadge from "@/components/VersionBadge";
import ThemeToggle from "@/components/ThemeToggle";
import { formatDateHe } from "@/lib/date";
import { useLocalStorage } from "@/lib/storage";
import {
  CONGRESS_START_ISO,
  OUTBOUND_DEPARTURE_ISO,
  REAL_FLIGHTS,
  TRIP_TITLE,
} from "@/lib/tripData";
import { FlightLeg } from "@/lib/types";

const QUICK_LINKS = [
  { href: "/itinerary", title: "לו״ז מלא", subtitle: "כל הטיול, יום אחר יום", icon: CalendarDays },
  { href: "/flights", title: "טיסות", subtitle: "כרטיסים ומסמכי נסיעה", icon: Plane },
  { href: "/hotel", title: "לינה", subtitle: "מלונות והזמנות", icon: HotelIcon },
  { href: "/congress", title: "קונגרס סלסה", subtitle: "לו״ז סדנאות ומסיבות", icon: PartyPopper },
  { href: "/moto", title: "רכיבת אופנוע", subtitle: "מסלולים יומיים והשכרה", icon: Bike },
  { href: "/documents", title: "מסמכים וחירום", subtitle: "כרטיסים, ביטוח, חיוג מהיר", icon: ShieldAlert },
  { href: "/expenses", title: "כספים", subtitle: "מעקב הוצאות + המרת מטבע", icon: Wallet },
  { href: "/todo", title: "משימות", subtitle: "רשימת דברים לעשות", icon: ListChecks },
  { href: "/packing", title: "ציוד", subtitle: "רשימת אריזה לפי קטגוריה", icon: Backpack },
  { href: "/music", title: "מוזיקה", subtitle: "פלייליסטים לרכיבה ומנוחה", icon: Headphones },
  { href: "/transport", title: "ניידות", subtitle: "Uber, Bolt, תחבורה ציבורית", icon: Car },
  { href: "/food", title: "קולינריה", subtitle: "המלצות לאורך המסלול", icon: UtensilsCrossed },
];

export default function DashboardPage() {
  const [flights] = useLocalStorage<FlightLeg[]>("flights", REAL_FLIGHTS);
  const outbound = flights.find((f) => f.direction === "outbound");
  const inbound = flights.find((f) => f.direction === "return");

  return (
    <div>
      <header className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-brand-2">מרכז שליטה לטיול</p>
          <h1 className="text-2xl font-extrabold mt-1">{TRIP_TITLE}</h1>
          {outbound && inbound && (
            <p className="text-sm text-foreground/55 mt-1">
              {formatDateHe(outbound.date)} – {formatDateHe(inbound.arriveDate)} · תל אביב ⇄ ברלין
            </p>
          )}
        </div>
        <div className="lg:hidden shrink-0 mt-1 flex flex-col items-end gap-1.5">
          <VersionBadge />
          <ThemeToggle />
        </div>
      </header>

      <section
        aria-label="ספירה לאחור"
        className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 lg:mx-0 lg:px-0"
      >
        <Countdown label="לטיסה לברלין" targetISO={OUTBOUND_DEPARTURE_ISO} icon={Plane} />
        <Countdown label="לתחילת הקונגרס" targetISO={CONGRESS_START_ISO} icon={PartyPopper} />
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
        <p className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
          <Info size={15} className="text-brand-1" /> מצב לא מקוון
        </p>
        <p>
          כל הנתונים (טיסות, הוצאות, לו״ז, מסמכים) נשמרים ישירות על המכשיר
          שלך ונטענים גם ללא קליטה סלולרית — שימושי במיוחד במהלך הרכיבה.
        </p>
      </section>
    </div>
  );
}
