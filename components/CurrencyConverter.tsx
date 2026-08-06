"use client";

import { useEffect, useState } from "react";
import { ArrowLeftRight, ArrowRightLeft } from "lucide-react";
import { getEurToIlsRate, RateCache } from "@/lib/currency";

const SOURCE_LABEL: Record<RateCache["source"], string> = {
  live: "שער עדכני",
  cache: "שער שמור (לא מקוון)",
  fallback: "שער גיבוי משוער",
};

export default function CurrencyConverter() {
  const [rate, setRate] = useState<RateCache | null>(null);
  const [direction, setDirection] = useState<"eurToIls" | "ilsToEur">("eurToIls");
  const [amount, setAmount] = useState("10");

  useEffect(() => {
    getEurToIlsRate().then(setRate);
  }, []);

  const numeric = parseFloat(amount) || 0;
  const result = rate
    ? direction === "eurToIls"
      ? numeric * rate.rate
      : numeric / rate.rate
    : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold">
          <ArrowRightLeft size={15} className="text-brand-1" /> מחשבון המרה
        </h2>
        {rate && (
          <span className="text-[11px] text-foreground/45">
            {SOURCE_LABEL[rate.source]} · 1€ = {rate.rate.toFixed(3)}₪
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-foreground/50 block mb-1">
            {direction === "eurToIls" ? "יורו (€)" : "שקלים (₪)"}
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-lg font-semibold"
          />
        </div>

        <button
          type="button"
          aria-label="החלפת כיוון"
          onClick={() =>
            setDirection((d) => (d === "eurToIls" ? "ilsToEur" : "eurToIls"))
          }
          className="mt-5 shrink-0 w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center hover:bg-brand-1/10 transition-colors"
        >
          <ArrowLeftRight size={16} />
        </button>

        <div className="flex-1">
          <label className="text-xs text-foreground/50 block mb-1">
            {direction === "eurToIls" ? "שקלים (₪)" : "יורו (€)"}
          </label>
          <div className="w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-lg font-bold text-brand-2">
            {result !== null ? result.toFixed(2) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
