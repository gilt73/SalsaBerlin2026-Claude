"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "בית", icon: "🏠" },
  { href: "/flights", label: "טיסות", icon: "✈️" },
  { href: "/hotel", label: "לינה", icon: "🏨" },
  { href: "/congress", label: "קונגרס", icon: "💃" },
  { href: "/moto", label: "רכיבה", icon: "🏍️" },
  { href: "/expenses", label: "כספים", icon: "💶" },
  { href: "/music", label: "מוזיקה", icon: "🎧" },
  { href: "/transport", label: "ניידות", icon: "🚕" },
  { href: "/food", label: "קולינריה", icon: "🍽️" },
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
                  <span className="text-xl leading-none">{item.icon}</span>
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
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
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
                  <span className="text-lg leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
