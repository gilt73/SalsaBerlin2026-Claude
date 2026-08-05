import PageHeader from "@/components/PageHeader";
import { TRANSPORT_LINKS } from "@/lib/tripData";

export default function TransportPage() {
  return (
    <div>
      <PageHeader
        icon="🚕"
        title="ניידות והתניידות"
        subtitle="גישה מהירה לאפליקציות תחבורה ומשלוחים בברלין"
      />

      <div className="grid grid-cols-2 gap-3">
        {TRANSPORT_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-border bg-surface p-4 flex flex-col items-center gap-2 text-center active:scale-[0.98] transition-transform"
          >
            <span className="text-3xl">{link.icon}</span>
            <span className="text-sm font-semibold">{link.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-4 text-sm text-foreground/70 leading-relaxed">
        <p className="font-semibold text-foreground mb-1">ℹ️ טיפ</p>
        <p>
          מומלץ להתקין את אפליקציות Uber / Bolt / Wolt ואת אפליקציית BVG
          מראש ולוודא כניסה לחשבון — כך הקישורים למעלה יפתחו ישירות
          לאפליקציה במקום לדפדפן.
        </p>
      </div>
    </div>
  );
}
