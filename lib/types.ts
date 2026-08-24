// Shared types for the trip app

// A place the app can build a Waze/Google Maps link to and/or fetch
// weather for. `lat`/`lon` are optional — when present, nav links use
// them for precision; weather lookups require them (falls back to
// "no forecast" gracefully otherwise).
export type Location = {
  name: string;
  address?: string;
  lat?: number;
  lon?: number;
};

export type FlightLeg = {
  id: string;
  direction: "outbound" | "return";
  airline: string;
  operatedBy?: string;
  flightNumber: string;
  bookingRef: string;
  date: string; // yyyy-mm-dd
  departTime: string; // HH:mm
  departAirport: string;
  departCode: string;
  departLocation?: Location;
  arriveDate: string; // yyyy-mm-dd
  arriveTime: string; // HH:mm
  arriveAirport: string;
  arriveCode: string;
  arriveLocation?: Location;
  passenger: string;
  notes?: string;
};

export type HotelStay = {
  id: string;
  name: string;
  address: string;
  city: string;
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  checkInTime?: string; // HH:mm, when known
  checkOutTime?: string; // HH:mm, when known
  confirmationNumber: string;
  mapUrl?: string;
  notes?: string;
  lat?: number;
  lon?: number;
};

export type CongressEvent = {
  id: string;
  day: string; // e.g. "יום חמישי 27/08"
  date: string; // yyyy-mm-dd for sorting
  startTime: string; // HH:mm
  endTime?: string;
  title: string;
  category: "workshop" | "party" | "show" | "other";
  hall?: string;
  isSample?: boolean;
};

export type MotoDay = {
  id: string;
  day: string;
  date: string; // yyyy-mm-dd
  route: string;
  duration: string;
  highlights: string;
  isSample?: boolean;
  // Where the day's ride ends — used for the "navigate here" button and
  // the day's weather chip in the full itinerary.
  destination?: Location;
};

export type RentalOption = {
  id: string;
  model: string;
  pricePerDay: string;
  link: string;
};

export type ExpenseCategory =
  | "fuel"
  | "food"
  | "lodging"
  | "attractions"
  | "shopping"
  | "other";

export type Expense = {
  id: string;
  amount: number;
  currency: "EUR" | "ILS" | "USD";
  category: ExpenseCategory;
  note: string;
  date: string; // yyyy-mm-dd
  createdAt: number;
};

export type PlaylistLink = {
  id: string;
  title: string;
  url: string;
};

export type FoodSpot = {
  id: string;
  name: string;
  area: string;
  type: string;
  notes: string;
  mapUrl?: string;
  isSample?: boolean;
};

export type TodoPriority = "high" | "normal" | "low";

export type TodoItem = {
  id: string;
  title: string;
  note?: string;
  dueDate?: string; // yyyy-mm-dd
  priority: TodoPriority;
  done: boolean;
  createdAt: number;
};

export type PackingCategory =
  | "moto"
  | "dance"
  | "documents"
  | "electronics"
  | "toiletries"
  | "other";

export type PackingItem = {
  id: string;
  title: string;
  category: PackingCategory;
  packed: boolean;
  createdAt: number;
};

export const PACKING_CATEGORY_LABELS: Record<PackingCategory, string> = {
  moto: "ציוד רכיבה",
  dance: "בגדי ריקוד/קונגרס",
  documents: "מסמכים",
  electronics: "אלקטרוניקה",
  toiletries: "טיפוח",
  other: "שונות",
};

export const PACKING_CATEGORY_ICONS: Record<PackingCategory, string> = {
  moto: "🏍️",
  dance: "💃",
  documents: "📄",
  electronics: "🔌",
  toiletries: "🧴",
  other: "🎒",
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string; // tel: href-ready, e.g. "112" or "+4930xxxxxxx"
  note?: string;
  isPlaceholder?: boolean;
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  fuel: "דלק",
  food: "אוכל",
  lodging: "לינה",
  attractions: "אטרקציות",
  shopping: "קניות",
  other: "אחר",
};

export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  fuel: "⛽",
  food: "🍽️",
  lodging: "🛏️",
  attractions: "🎟️",
  shopping: "🛍️",
  other: "📦",
};
