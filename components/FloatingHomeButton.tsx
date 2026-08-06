"use client";

import { Home } from "lucide-react";
import { wazeLink } from "@/lib/navLinks";
import { useLocalStorage } from "@/lib/storage";
import { REAL_HOTEL } from "@/lib/tripData";
import { HotelStay } from "@/lib/types";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Picks the hotel that's "active" right now: today falls inside a stay's
 * dates, otherwise the nearest upcoming stay, otherwise the most recent
 * past one. Mirrors the same "hotelStays" storage key as the Hotel page. */
function pickActiveHotel(stays: HotelStay[]): HotelStay | null {
  if (stays.length === 0) return null;
  const today = todayISO();

  const current = stays.find((s) => s.checkIn <= today && today < s.checkOut);
  if (current) return current;

  const upcoming = stays
    .filter((s) => s.checkIn > today)
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))[0];
  if (upcoming) return upcoming;

  return [...stays].sort((a, b) => b.checkOut.localeCompare(a.checkOut))[0];
}

export default function FloatingHomeButton() {
  const [stays] = useLocalStorage<HotelStay[]>("hotelStays", [REAL_HOTEL]);
  const hotel = pickActiveHotel(stays);

  if (!hotel) return null;

  return (
    <a
      href={wazeLink({ name: hotel.name, address: `${hotel.address} ${hotel.city}` })}
      target="_blank"
      rel="noreferrer"
      aria-label={`ניווט מהיר חזרה ל${hotel.name}`}
      title={`ניווט מהיר חזרה ל${hotel.name}`}
      className="fixed z-30 left-4 bottom-24 lg:bottom-6 lg:right-[18rem] lg:left-auto w-14 h-14 rounded-full brand-gradient text-white shadow-lg shadow-black/20 flex items-center justify-center active:scale-95 transition-transform"
    >
      <Home size={24} strokeWidth={2.2} />
    </a>
  );
}
