import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function QuickCard({
  href,
  title,
  subtitle,
  icon: Icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-surface p-4 flex flex-col gap-2.5 min-h-[112px] shadow-sm shadow-black/[0.02] active:scale-[0.98] transition-all hover:border-brand-1/40 hover:shadow-md hover:shadow-brand-1/10"
    >
      <div className="w-9 h-9 rounded-xl bg-brand-1/10 text-brand-1 flex items-center justify-center group-hover:bg-brand-1/15 transition-colors">
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-xs text-foreground/55 line-clamp-2">{subtitle}</span>
    </Link>
  );
}
