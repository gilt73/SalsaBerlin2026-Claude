// Seed / reference data for the trip.
// Flight data below is REAL — pulled from the Israir booking confirmation
// (booking no. 4727224, sent 04/08/2026 to gil.tzallach@gmail.com).
// Everything marked `isSample: true` is placeholder content the spec doc
// didn't provide real data for yet — edit freely from within the app.

import {
  CongressEvent,
  FlightLeg,
  FoodSpot,
  MotoDay,
  RentalOption,
} from "./types";

export const TRIP_TITLE = "קונגרס סלסה + רכיבת אופנוע — ברלין 2026";

// Key dates used for the dashboard countdowns.
export const OUTBOUND_DEPARTURE_ISO = "2026-08-26T14:40:00+03:00"; // TLV local time
export const RETURN_DEPARTURE_ISO = "2026-09-02T19:05:00+02:00"; // BER local time
// Congress start date is a placeholder until the official schedule is confirmed.
export const CONGRESS_START_ISO_PLACEHOLDER = "2026-08-27T18:00:00+02:00";

export const REAL_FLIGHTS: FlightLeg[] = [
  {
    id: "outbound-253",
    direction: "outbound",
    airline: "ישראייר (Israir)",
    operatedBy: "FLYYO",
    flightNumber: "253",
    bookingRef: "4727224",
    date: "26/08/2026",
    departTime: "14:40",
    departAirport: "נתב״ג",
    departCode: "TLV",
    arriveDate: "26/08/2026",
    arriveTime: "18:05",
    arriveAirport: "ברלין",
    arriveCode: "BER",
    passenger: "GIL TZALLACH",
    notes: "מחלקת תיירים · כולל מזוודה אחת (הזמנה 4727224)",
  },
  {
    id: "return-254",
    direction: "return",
    airline: "ישראייר (Israir)",
    operatedBy: "FLYYO",
    flightNumber: "254",
    bookingRef: "4727224",
    date: "02/09/2026",
    departTime: "19:05",
    departAirport: "ברלין",
    departCode: "BER",
    arriveDate: "03/09/2026",
    arriveTime: "00:05",
    arriveAirport: "נתב״ג",
    arriveCode: "TLV",
    passenger: "GIL TZALLACH",
    notes: "מחלקת תיירים · כולל מזוודה אחת · נחיתה לאחר חצות (הזמנה 4727224)",
  },
];

export const FLIGHT_BOOKING_SUMMARY = {
  bookingRef: "4727224",
  totalPaid: "541.0 $",
  baseFare: "411 $",
  baggage: "2 × מזוודה — 65$ כל אחת",
  cardHolder: "GIL TZALLACH",
};

// Real 2-day route from the spec doc. A third day placeholder is added
// to cover the ride back to Berlin before the return flight — edit once
// the full itinerary is finalized.
export const MOTO_DAYS: MotoDay[] = [
  {
    id: "moto-day1",
    day: "יום שני",
    date: "31/08/2026",
    route:
      "איסוף אופנוע בברלין ← יציאה צפונה לשמורת אגמי מקלנבורג (אזור העיירה וארן / אגם מוריץ)",
    duration: "כ־3–5 שעות (כולל עצירות נינוחות)",
    highlights:
      "רכיבה רגועה להסתגלות לאופנוע, כבישים מישוריים ונוף כפרי, עצירה בנקודות תצפית ועיירות ציוריות. לינה באזור מוריץ.",
  },
  {
    id: "moto-day2",
    day: "יום שלישי",
    date: "01/09/2026",
    route: "אגמי מקלנבורג ← הרי ההרץ (Harz Mountains) / עיירת ורניגרודה (Wernigerode)",
    duration: "כ־5 שעות (בקצב רגוע)",
    highlights:
      "כבישים מפותלים ונופי הרים. רכיבה זהירה ומבוקרת תוך היכרות מעמיקה עם משקל והתנהגות האופנוע. לינה באזור ורניגרודה.",
  },
  {
    id: "moto-day3",
    day: "יום רביעי",
    date: "02/09/2026",
    route: "ורניגרודה ← חזרה לברלין להחזרת האופנוע לפני הטיסה (19:05)",
    duration: "להשלמה — תלוי במסלול הבחירה",
    highlights: "יש להשאיר מרווח בטיחון להחזרת האופנוע ולהגעה לשדה התעופה.",
    isSample: true,
  },
];

export const RENTAL_OPTIONS: RentalOption[] = [
  {
    id: "rental-mt07",
    model: "Yamaha MT-07",
    pricePerDay: "~100€/יום",
    link: "https://www.google.com/search?q=Yamaha+MT-07+motorcycle+rental+Berlin",
  },
  {
    id: "rental-f750gs",
    model: "BMW F 750 GS",
    pricePerDay: "~100€/יום",
    link: "https://www.google.com/search?q=BMW+F+750+GS+motorcycle+rental+Berlin",
  },
  {
    id: "rental-general",
    model: "השוואת מחירים כללית",
    pricePerDay: "לפי דגם",
    link: "https://www.google.com/search?q=motorcycle+rental+Berlin+comparison",
  },
];

export const MOTO_SAFETY_NOTES = [
  "קצב רגוע ואישי — אין צורך למהר, במיוחד ביום ההסתגלות הראשון.",
  "עצירות תכופות למנוחה, שתייה והתמצאות.",
  "בדיקת ציוד מגן (קסדה, כפפות, מעיל) ומצב האופנוע לפני כל יציאה.",
  "מעקב אחרי תחזית מזג האוויר וגשם אפשרי בהרי ההרץ.",
  "שמירת ניווט אופליין (מפות שמורות מראש) לאזורים כפריים עם קליטה חלשה.",
];

// The official Berlin Salsacongress 2026 timetable wasn't available yet
// (only a lottery/newsletter signup was found in the inbox) — this is a
// sample structure to edit once the real program is published.
export const SAMPLE_CONGRESS_EVENTS: CongressEvent[] = [
  {
    id: "c1",
    day: "יום חמישי",
    date: "2026-08-27",
    startTime: "18:00",
    endTime: "19:30",
    title: "רישום ופתיחה (Registration & Welcome)",
    category: "other",
    hall: "לובי ראשי",
    isSample: true,
  },
  {
    id: "c2",
    day: "יום חמישי",
    date: "2026-08-27",
    startTime: "20:00",
    endTime: "23:59",
    title: "מסיבת פתיחה (Opening Party)",
    category: "party",
    hall: "אולם ראשי",
    isSample: true,
  },
  {
    id: "c3",
    day: "יום שישי",
    date: "2026-08-28",
    startTime: "10:00",
    endTime: "12:00",
    title: "סדנת Salsa On2 — רמת ביניים",
    category: "workshop",
    hall: "אולם A",
    isSample: true,
  },
  {
    id: "c4",
    day: "יום שישי",
    date: "2026-08-28",
    startTime: "21:00",
    endTime: "23:59",
    title: "מסיבת לילה + הופעת אורח",
    category: "show",
    hall: "אולם ראשי",
    isSample: true,
  },
  {
    id: "c5",
    day: "יום שבת",
    date: "2026-08-29",
    startTime: "11:00",
    endTime: "13:00",
    title: "סדנת בצ׳אטה פרימיום",
    category: "workshop",
    hall: "אולם B",
    isSample: true,
  },
  {
    id: "c6",
    day: "יום ראשון",
    date: "2026-08-30",
    startTime: "12:00",
    endTime: "14:00",
    title: "סדנת סיכום + שיחת נעילה",
    category: "workshop",
    hall: "אולם A",
    isSample: true,
  },
];

export const SAMPLE_FOOD_SPOTS: FoodSpot[] = [
  {
    id: "f1",
    name: "מסעדה/בית קפה מומלץ בברלין — להשלמה",
    area: "ברלין",
    type: "מסעדה",
    notes: "הצעה לבדיקה: יש לאתר מקום לפי אזור המלון בפועל.",
    isSample: true,
  },
  {
    id: "f2",
    name: "עצירת קפה באזור אגמי מקלנבורג — להשלמה",
    area: "וארן / מוריץ",
    type: "בית קפה",
    notes: "הצעה לבדיקה לאורך מסלול הרכיבה של יום שני.",
    isSample: true,
  },
  {
    id: "f3",
    name: "מסעדה מקומית בוורניגרודה — להשלמה",
    area: "ורניגרודה, הרי ההרץ",
    type: "מסעדה",
    notes: "הצעה לבדיקה — עיירת חצי-כפר עם מסעדות טיפוסיות גרמניות.",
    isSample: true,
  },
];

export const TRANSPORT_LINKS = [
  { id: "uber", name: "Uber", url: "https://m.uber.com", icon: "🚗" },
  { id: "bolt", name: "Bolt", url: "https://bolt.eu", icon: "🚕" },
  { id: "wolt", name: "Wolt (משלוחי אוכל)", url: "https://wolt.com", icon: "🛵" },
  { id: "bvg", name: "BVG — תחבורה ציבורית ברלין", url: "https://www.bvg.de", icon: "🚇" },
  { id: "maps", name: "Google Maps", url: "https://maps.google.com", icon: "🗺️" },
];
