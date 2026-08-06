/** Converts "dd/mm/yyyy" (used throughout the flight/moto data) to
 * "yyyy-mm-dd" (used by <input type="date">, weather lookups, sorting). */
export function toISODate(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split("/");
  if (!d || !m || !y) return ddmmyyyy;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}
