import { Navigation, MapPinned } from "lucide-react";
import { googleMapsLink, wazeLink } from "@/lib/navLinks";
import { Location } from "@/lib/types";

export default function NavButtons({
  location,
  className = "",
}: {
  location: Location;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <a
        href={wazeLink(location)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 bg-surface-muted hover:bg-brand-1/10 transition-colors"
      >
        <Navigation size={14} className="shrink-0" />
        Waze
      </a>
      <a
        href={googleMapsLink(location)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-1.5 bg-surface-muted hover:bg-brand-1/10 transition-colors"
      >
        <MapPinned size={14} className="shrink-0" />
        Google Maps
      </a>
    </div>
  );
}
