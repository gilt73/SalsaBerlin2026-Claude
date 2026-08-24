"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  Plane,
  Hotel as HotelIcon,
  PartyPopper,
  Bike,
  ShieldAlert,
  Wallet,
  ListChecks,
  Backpack,
  Headphones,
  Car,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import VersionBadge from "./VersionBadge";
import ThemeToggle from "./ThemeToggle";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "בית", icon: Home },
  { href: "/itinerary", label: "לו״ז מלא", icon: CalendarDays },
  { href: "/flights", label: "טיסות", icon: Plane },
  { href: "/hotel", label: "לינה", icon: HotelIcon },
  { href: "/congress", label: "קונגרס", icon: PartyPopper },
  { href: "/moto", label: "רכיבה", icon: Bike },
  { href: "/documents", label: "מסמכים", icon: ShieldAlert },
  { href: "/expenses", label: "כספים", icon: Wallet },
  { href: "/todo", label: "משימות", icon: ListChecks },
  { href: "/packing", label: "ציוד", icon: Backpack },
  { href: "/music", label: "מוזיקה", icon: Headphones },
  { href: "/transport", label: "ניידות", icon: Car },
  { href: "/food", label: "קולינריה", icon: UtensilsCrossed },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile / tablet: fixed bottom tab bar, horizontally scrollable */}
      <nav
        aria-label="ניווט ראשי"
        className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur pb-safe"
      >
        <ul className="flex overflow-x-auto snap-x snap-mandatory gap-1 px-1 pt-1 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href} className="snap-start shrink-0">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 min-w-[64px] min-h-[52px] text-[11px] font-medium transition-colors ${
                    active
                      ? "text-brand-2"
                      : "text-foreground/60 active:bg-surface-muted"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} className="shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop (MacBook and up): fixed sidebar */}
      <nav
        aria-label="ניווט ראשי"
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:right-0 lg:w-64 lg:border-l lg:border-border lg:bg-surface lg:pt-6 lg:pb-4 lg:px-3 lg:gap-1"
      >
        <div className="px-3 pb-6">
          <p className="text-lg font-bold brand-gradient bg-clip-text text-transparent">
            SalsaBerlin 2026
          </p>
          <p className="text-xs text-foreground/50 mt-1">
            קונגרס סלסה + רכיבת אופנוע
          </p>
        </div>
        <ul className="flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-1/10 text-brand-2"
                      : "text-foreground/70 hover:bg-surface-muted"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={18} strokeWidth={active ? 2.4 : 2} className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto px-3 pt-4 flex items-center justify-between">
          <VersionBadge />
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
