import type { LucideIcon } from "lucide-react";

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-3.5">
      <div className="w-11 h-11 rounded-2xl brand-gradient text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand-1/30">
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-foreground/55 mt-0.5 leading-snug">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
