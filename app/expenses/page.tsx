"use client";

import { useEffect, useMemo, useState } from "react";
import CurrencyConverter from "@/components/CurrencyConverter";
import PageHeader from "@/components/PageHeader";
import { loadExpenses, saveExpenses } from "@/lib/db";
import { genId } from "@/lib/storage";
import {
  EXPENSE_CATEGORY_ICONS,
  EXPENSE_CATEGORY_LABELS,
  Expense,
  ExpenseCategory,
} from "@/lib/types";

const CATEGORIES = Object.keys(EXPENSE_CATEGORY_LABELS) as ExpenseCategory[];
const CURRENCY_SYMBOL: Record<string, string> = { EUR: "€", ILS: "₪", USD: "$" };

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    currency: "EUR" as Expense["currency"],
    category: "food" as ExpenseCategory,
    note: "",
    date: todayISO(),
  });

  useEffect(() => {
    loadExpenses().then((list) => {
      setExpenses(list);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveExpenses(expenses);
  }, [expenses, loaded]);

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return;
    const expense: Expense = {
      id: genId(),
      amount,
      currency: form.currency,
      category: form.category,
      note: form.note,
      date: form.date,
      createdAt: Date.now(),
    };
    setExpenses((prev) => [expense, ...prev]);
    setForm({ ...form, amount: "", note: "" });
    setShowForm(false);
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const totalsByCurrency = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const e of expenses) totals[e.currency] = (totals[e.currency] ?? 0) + e.amount;
    return totals;
  }, [expenses]);

  const byCategory = useMemo(() => {
    const totals: Record<ExpenseCategory, number> = {
      fuel: 0,
      food: 0,
      lodging: 0,
      attractions: 0,
      shopping: 0,
      other: 0,
    };
    // Aggregate in EUR-equivalent terms only for the bars (ignoring ILS/USD
    // mix precision) — good enough for a visual "where did the money go".
    for (const e of expenses) totals[e.category] += e.amount;
    const max = Math.max(1, ...Object.values(totals));
    return { totals, max };
  }, [expenses]);

  return (
    <div>
      <PageHeader
        icon="💶"
        title="כספים והוצאות"
        subtitle="מעקב הוצאות לפי קטגוריה + המרת מטבע"
      />

      <CurrencyConverter />

      <section className="mt-5 rounded-2xl border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold mb-3">סה״כ הוצאות</h2>
        {Object.keys(totalsByCurrency).length === 0 ? (
          <p className="text-sm text-foreground/45">אין עדיין הוצאות רשומות</p>
        ) : (
          <div className="flex gap-4 mb-3">
            {Object.entries(totalsByCurrency).map(([cur, total]) => (
              <div key={cur}>
                <p className="text-2xl font-extrabold">
                  {CURRENCY_SYMBOL[cur]}
                  {total.toFixed(0)}
                </p>
                <p className="text-xs text-foreground/50">{cur}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 mt-2">
          {CATEGORIES.map((cat) => {
            const total = byCategory.totals[cat];
            if (total === 0) return null;
            const pct = Math.round((total / byCategory.max) * 100);
            return (
              <div key={cat} className="flex items-center gap-2 text-xs">
                <span className="w-16 shrink-0 text-foreground/60">
                  {EXPENSE_CATEGORY_ICONS[cat]} {EXPENSE_CATEGORY_LABELS[cat]}
                </span>
                <div className="flex-1 h-2 rounded-full bg-surface-muted overflow-hidden">
                  <div className="h-full brand-gradient" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-12 text-left shrink-0 font-medium">
                  {total.toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground/60">היסטוריית הוצאות</h2>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-xs font-semibold rounded-lg px-3 py-1.5 brand-gradient text-white"
          >
            + הוצאה חדשה
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={addExpense}
            className="mb-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder="סכום"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <select
                value={form.currency}
                onChange={(e) =>
                  setForm({ ...form, currency: e.target.value as Expense["currency"] })
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="EUR">EUR (€)</option>
                <option value="ILS">ILS (₪)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as ExpenseCategory })
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {EXPENSE_CATEGORY_ICONS[c]} {EXPENSE_CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <input
              placeholder="הערה (אופציונלי)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg brand-gradient text-white text-sm font-semibold py-2.5"
            >
              הוספה
            </button>
          </form>
        )}

        <div className="flex flex-col gap-2">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
            >
              <span className="text-xl shrink-0">{EXPENSE_CATEGORY_ICONS[e.category]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {e.note || EXPENSE_CATEGORY_LABELS[e.category]}
                </p>
                <p className="text-xs text-foreground/45">{e.date}</p>
              </div>
              <p className="font-semibold shrink-0">
                {CURRENCY_SYMBOL[e.currency]}
                {e.amount.toFixed(2)}
              </p>
              <button
                onClick={() => removeExpense(e.id)}
                className="text-xs text-danger shrink-0"
                aria-label="מחיקה"
              >
                ✕
              </button>
            </div>
          ))}
          {loaded && expenses.length === 0 && (
            <p className="text-center py-8 text-sm text-foreground/45">
              עדיין לא נרשמו הוצאות
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
