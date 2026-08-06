import pkg from "../package.json";

export default function VersionBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[10px] font-medium text-foreground/35 ${className}`}>
      v{pkg.version}
    </span>
  );
}
