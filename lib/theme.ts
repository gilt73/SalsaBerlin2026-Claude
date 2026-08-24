"use client";

export type ThemePref = "light" | "dark" | "system";

const KEY = "theme-pref";

export function getStoredTheme(): ThemePref {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : "system";
}

/** Applies the choice to <html data-theme> immediately (no reload needed —
 * every color in globals.css is a CSS variable keyed off this attribute)
 * and persists it. "system" clears the attribute so the prefers-color-scheme
 * media query takes back over. */
export function setStoredTheme(pref: ThemePref) {
  if (pref === "system") {
    window.localStorage.removeItem(KEY);
  } else {
    window.localStorage.setItem(KEY, pref);
  }
  applyTheme(pref);
}

export function applyTheme(pref: ThemePref) {
  const root = document.documentElement;
  if (pref === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", pref);
}

/** Inline script text run via next/script (beforeInteractive) so the
 * stored preference applies before first paint — no flash of the wrong
 * theme. Kept as a plain string (not JSX) since it has to run outside
 * React entirely. */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var v = localStorage.getItem(${JSON.stringify(KEY)});
    if (v === "light" || v === "dark") {
      document.documentElement.setAttribute("data-theme", v);
    }
  } catch (e) {}
})();
`;
