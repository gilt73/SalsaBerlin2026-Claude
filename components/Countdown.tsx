"use client";

import { useEffect, useState } from "react";
import { PartyPopper, type LucideIcon } from "lucide-react";

function getParts(targetISO: string) {
  const diff = new Date(targetISO).getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  return { days, hours, minutes, isPast: diff <= 0 };
}

export default function Countdown({
  label,
  targetISO,
  icon: Icon,
}: {
  label: string;
  targetISO: string;
  icon: LucideIcon;
}) {
  const [parts, setParts] = useState(() => getParts(targetISO));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(targetISO)), 60_000);
    return () => clearInterval(id);
  }, [targetISO]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 flex flex-col gap-2 min-w-[150px] shadow-sm shadow-black/[0.02]">
      <div className="flex items-center gap-2 text-sm text-foreground/60">
        <Icon size={16} className="text-brand-1" />
        <span>{label}</span>
      </div>
      {parts.isPast ? (
        <p className="flex items-center gap-1.5 text-lg font-bold text-accent">
          כבר כאן! <PartyPopper size={18} />
        </p>
      ) : (
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold brand-gradient bg-clip-text text-transparent">
            {parts.days}
          </span>
          <span className="text-sm text-foreground/60">ימים</span>
          <span className="text-lg font-semibold text-foreground/80 ms-1">
            {parts.hours}
          </span>
          <span className="text-xs text-foreground/50">שעות</span>
          <span className="text-lg font-semibold text-foreground/80 ms-1">
            {parts.minutes}
          </span>
          <span className="text-xs text-foreground/50">דק׳</span>
        </div>
      )}
    </div>
  );
}
