import { Location } from "./types";

// Builds deep links to Waze / Google Maps for a given Location.
//
// Prefers a text address/name query over raw lat/lon: Waze's and
// Google's own geocoders resolve a real street address far more
// precisely than the town-level coordinates this app sometimes only has
// (e.g. a general riding-area waypoint). lat/lon is used only as a
// fallback for places with no address string at all.

export function wazeLink(loc: Location): string {
  const query = loc.address || loc.name;
  if (query) {
    return `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
  }
  if (loc.lat != null && loc.lon != null) {
    return `https://waze.com/ul?ll=${loc.lat},${loc.lon}&navigate=yes`;
  }
  return "https://waze.com";
}

export function googleMapsLink(loc: Location): string {
  const query = loc.address ? `${loc.name} ${loc.address}` : loc.name;
  if (query) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
  }
  if (loc.lat != null && loc.lon != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}`;
  }
  return "https://maps.google.com";
}
