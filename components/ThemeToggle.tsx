"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, MonitorSmartphone } from "lucide-react";
import { getStoredTheme, setStoredTheme, ThemePref } from "@/lib/theme";

const ORDER: ThemePref[] = ["system", "light", "dark"];
const ICON = { system: MonitorSmartphone, light: Sun, dark: Moon };
const LABEL: Record<ThemePref, string> = {
  system: "אוטומטי (מערכת)",
  light: "בהיר",
  dark: "כהה",
};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [pref, setPref] = useState<ThemePref>("system");

  // Read the stored preference after mount only — layout.tsx's inline
  // script already applied it to the DOM before paint, this just syncs
  // the button's own displayed state to match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPref(getStoredTheme());
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    setPref(next);
    setStoredTheme(next);
  }

  const Icon = ICON[pref];

  return (
    <button
      type="button"
      onClick={cycle}
      title={`ערכת נושא: ${LABEL[pref]} (לחיצה להחלפה)`}
      className={`inline-flex items-center gap-1.5 text-[10px] font-medium text-foreground/40 hover:text-foreground/70 transition-colors ${className}`}
    >
      <Icon size={12} />
      <span>{LABEL[pref]}</span>
    </button>
  );
}
