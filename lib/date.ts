/** Converts "dd/mm/yyyy" to "yyyy-mm-dd" (used by <input type="date">,
 * weather lookups, sorting). Kept for any legacy dd/mm/yyyy strings. */
export function toISODate(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split("/");
  if (!d || !m || !y) return ddmmyyyy;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/** Converts "yyyy-mm-dd" to "dd/mm/yyyy" for display — the app's ISO
 * storage format shown the way flight/moto dates read in this app. */
export function formatDateHe(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!d || !m || !y) return iso;
  return `${d}/${m}/${y}`;
}
