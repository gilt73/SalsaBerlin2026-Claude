import { Car, CarTaxiFront, Bike, TrainFront, MapPin, Info, Globe, type LucideIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { TRANSPORT_LINKS } from "@/lib/tripData";

const ICON: Record<string, LucideIcon> = {
  uber: Car,
  bolt: CarTaxiFront,
  wolt: Bike,
  bvg: TrainFront,
  maps: MapPin,
};

export default function TransportPage() {
  return (
    <div>
      <PageHeader
        icon={Car}
        title="ניידות והתניידות"
        subtitle="גישה מהירה לאפליקציות תחבורה ומשלוחים בברלין"
      />

      <div className="grid grid-cols-2 gap-3">
        {TRANSPORT_LINKS.map((link) => {
          const Icon = ICON[link.id] ?? MapPin;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border bg-surface p-4 flex flex-col items-center gap-2.5 text-center active:scale-[0.98] transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-brand-1/10 text-brand-1 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <span className="text-sm font-semibold">{link.name}</span>
            </a>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 leading-relaxed">
        <p className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
          <Info size={15} /> טיפ
        </p>
        <p>
          מומלץ להתקין את אפליקציות Uber / Bolt / Wolt ואת אפליקציית BVG
          מראש ולוודא כניסה לחשבון — כך הקישורים למעלה יפתחו ישירות
          לאפליקציה במקום לדפדפן.
        </p>
      </div>

      <div className="mt-3 rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 leading-relaxed">
        <p className="flex items-center gap-1.5 font-semibold text-foreground mb-1">
          <Globe size={15} /> שפה
        </p>
        <p>
          הקישור ל-BVG למעלה מוביל לגרסה האנגלית של האתר. באפליקציית BVG
          עצמה — Settings → Language → English — כדי שגם שמות תחנות הרכבת
          ומסלולי החיבורים יוצגו באנגלית ולא בגרמנית.
        </p>
      </div>
    </div>
  );
}
