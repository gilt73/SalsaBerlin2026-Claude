import Link from "next/link";

export default function QuickCard({
  href,
  title,
  subtitle,
  icon,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-surface p-4 flex flex-col gap-2 min-h-[104px] active:scale-[0.98] transition-transform hover:border-brand-1/50"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-xs text-foreground/55 line-clamp-2">{subtitle}</span>
    </Link>
  );
}
