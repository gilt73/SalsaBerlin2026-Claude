export default function PageHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-5 flex items-start gap-3">
      <span className="text-3xl leading-none">{icon}</span>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-foreground/55 mt-0.5">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
