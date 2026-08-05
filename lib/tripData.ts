// Seed / reference data for the trip.
// Flight, hotel and congress-ticket data below are REAL — pulled straight
// from confirmation emails in gil.tzallach@gmail.com:
//   - Israir booking no. 4727224 (flights + baggage + cancellation cover)
//   - Holiday Inn Express Berlin City Centre confirmation #87008071
//   - Eventbrite order for Berlin Salsacongress 2026 - Jungle Edition
// Everything marked `isSample: true` is placeholder content no email/spec
// covered yet (e.g. the hour-by-hour workshop schedule, which the congress
// only sends out ~4 days before the event) — edit freely from within the app.

import {
  CongressEvent,
  FlightLeg,
  FoodSpot,
  HotelStay,
  MotoDay,
  RentalOption,
} from "./types";

export const TRIP_TITLE = "קונגרס סלסה + רכיבת אופנוע — ברלין 2026";

// Key dates used for the dashboard countdowns.
export const OUTBOUND_DEPARTURE_ISO = "2026-08-26T14:40:00+03:00"; // TLV local time
export const RETURN_DEPARTURE_ISO = "2026-09-02T19:05:00+02:00"; // BER local time
// Real: general congress start per the Eventbrite ticket (Tempodrom Berlin).
// Note: Gil's own pass (Cuban Basic) only grants access from Friday — see
// CONGRESS_TICKET below.
export const CONGRESS_START_ISO = "2026-08-27T20:00:00+02:00";

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
    notes: "מחלקת תיירים · כולל מזוודה אחת · מגן ביטול עד 3 ימים (הזמנה 4727224)",
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

// Real hotel booking — confirmed 05/08/2026 (IHG confirmation #87008071).
export const REAL_HOTEL: HotelStay = {
  id: "hotel-hiex-berlin",
  name: "Holiday Inn Express Berlin City Centre",
  address: "Stresemannstrasse 49, 10963",
  city: "Berlin, Germany",
  checkIn: "2026-08-26",
  checkOut: "2026-08-31",
  confirmationNumber: "87008071",
  mapUrl: "https://maps.google.com/?q=Stresemannstrasse+49+10963+Berlin",
  notes:
    "Standard Room · Flexible Saver Member Exclusive Rate · 5 לילות · 506.53€ + 37.98€ תוספות = 544.51€ סה״כ · ניתן לביטול ללא עלות עד 7 ימים לפני ההגעה · טלפון: +49 30 20052800 · Front desk: berlin@hiexberlin.com",
};

// Real Salsa Congress ticket — Eventbrite order confirmed 05/08/2026.
export const CONGRESS_TICKET = {
  eventName: "Berlin Salsacongress 2026 - Jungle Edition",
  passType: "Cuban Basic Pass",
  orderTotal: "161.92 €",
  venue: "Tempodrom Berlin",
  venueAddress: "Möckernstraße 10, 10963 Berlin, Germany",
  generalStart: "יום חמישי 27/08/2026, 20:00 (שעון ברלין)",
  passAccess:
    "הכרטיס של גיל (Cuban Basic Pass) כולל: כל סדנאות הקובני ביום שישי ושבת, סדנאות לפני המסיבות בשישי-שבת-ראשון, וכניסה לסושיאלים בשישי-שבת-ראשון החל מ-17:00. לא כולל Preparty או Social Dance Trainings.",
  registrationNote:
    "יש להירשם מראש לסדנאות ספציפיות — ההרשמה נפתחת כ-4 ימים לפני האירוע (~23/08/2026) ותישלח במייל מ-Eventbrite.",
  nameChangeDeadline: "15/08/2026 (שינוי שם/דחייה לשנה הבאה בלבד, בלי החזר כספי)",
  whatsappCommunity: "https://chat.whatsapp.com/FArJ6526pdu52SXnHbeuYP",
  voucher: {
    code: "6UCZE",
    value: "15€",
    note: "שובר שהתקבל מ-Berlin Salsacongress, ניתן למימוש כקוד פרומו בכל אירוע שלהם ב-Eventbrite (תוקף כ-22 חודשים).",
  },
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

// A few real, actionable starter tasks based on what's confirmed vs. still
// open (e.g. no motorcycle rental booking was found in the inbox). Delete
// or complete freely — this is just a helpful starting point.
export const STARTER_TODOS = [
  {
    title: "לשכור אופנוע (Yamaha MT-07 / BMW F 750 GS)",
    note: "טרם נמצאה הזמנה בפועל — לתאם איסוף בברלין לפני 31/08.",
    dueDate: "2026-08-24",
    priority: "high" as const,
  },
  {
    title: "להירשם לסדנאות הקונגרס כשההרשמה תיפתח",
    note: "נשלח במייל מ-Eventbrite כ-4 ימים לפני האירוע (~23/08/2026).",
    dueDate: "2026-08-23",
    priority: "high" as const,
  },
  {
    title: "לשקול מימוש שובר 15€ (קוד 6UCZE) בחנות הקונגרס",
    priority: "low" as const,
  },
  {
    title: "לבצע צ׳ק-אין מקוון לשתי הטיסות",
    note: "24–3 שעות לפני כל טיסה, דרך אתר/אפליקציית ישראייר.",
    priority: "normal" as const,
  },
];

export const TRANSPORT_LINKS = [
  { id: "uber", name: "Uber", url: "https://m.uber.com", icon: "🚗" },
  { id: "bolt", name: "Bolt", url: "https://bolt.eu", icon: "🚕" },
  { id: "wolt", name: "Wolt (משלוחי אוכל)", url: "https://wolt.com", icon: "🛵" },
  { id: "bvg", name: "BVG — תחבורה ציבורית ברלין", url: "https://www.bvg.de", icon: "🚇" },
  { id: "maps", name: "Google Maps", url: "https://maps.google.com", icon: "🗺️" },
];
