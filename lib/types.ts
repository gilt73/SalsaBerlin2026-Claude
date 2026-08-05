// Shared types for the trip app

export type FlightLeg = {
  id: string;
  direction: "outbound" | "return";
  airline: string;
  operatedBy?: string;
  flightNumber: string;
  bookingRef: string;
  date: string; // dd/mm/yyyy
  departTime: string; // HH:mm
  departAirport: string;
  departCode: string;
  arriveDate: string; // dd/mm/yyyy
  arriveTime: string; // HH:mm
  arriveAirport: string;
  arriveCode: string;
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
  confirmationNumber: string;
  mapUrl?: string;
  notes?: string;
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
  date: string;
  route: string;
  duration: string;
  highlights: string;
  isSample?: boolean;
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
