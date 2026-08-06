"use client";

import { useMemo, useState } from "react";
import { Backpack, Check, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { genId, useLocalStorage } from "@/lib/storage";
import { STARTER_PACKING_ITEMS } from "@/lib/tripData";
import {
  PACKING_CATEGORY_ICONS,
  PACKING_CATEGORY_LABELS,
  PackingCategory,
  PackingItem,
} from "@/lib/types";

const CATEGORIES = Object.keys(PACKING_CATEGORY_LABELS) as PackingCategory[];

const SEEDED: PackingItem[] = STARTER_PACKING_ITEMS.map((item) => ({
  id: genId(),
  packed: false,
  createdAt: Date.now(),
  ...item,
}));

const EMPTY_FORM = { title: "", category: "other" as PackingCategory };

export default function PackingPage() {
  const [items, setItems, hydrated] = useLocalStorage<PackingItem[]>(
    "packingItems",
    SEEDED
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const grouped = useMemo(() => {
    const map = new Map<PackingCategory, PackingItem[]>();
    for (const cat of CATEGORIES) map.set(cat, []);
    for (const item of items) map.get(item.category)?.push(item);
    return CATEGORIES.map((cat) => [cat, map.get(cat) ?? []] as const).filter(
      ([, list]) => list.length > 0
    );
  }, [items]);

  const packedCount = items.filter((i) => i.packed).length;

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: genId(),
        title: form.title.trim(),
        category: form.category,
        packed: false,
        createdAt: Date.now(),
      },
    ]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function togglePacked(id: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={Backpack}
        title="רשימת ציוד"
        subtitle={hydrated ? `${packedCount}/${items.length} ארוזים` : "לפי קטגוריות"}
      />

      <button
        onClick={() => setShowForm((s) => !s)}
        className="w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60 mb-4"
      >
        + הוספת פריט
      </button>

      {showForm && (
        <form
          onSubmit={addItem}
          className="mb-5 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="שם הפריט"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as PackingCategory })
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {PACKING_CATEGORY_ICONS[c]} {PACKING_CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg brand-gradient text-white text-sm font-semibold py-2.5"
            >
              שמירה
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg bg-surface-muted text-sm font-semibold px-4 py-2.5"
            >
              ביטול
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-5">
        {grouped.map(([cat, catItems]) => (
          <section key={cat}>
            <h2 className="text-sm font-bold text-foreground/70 mb-2.5">
              {PACKING_CATEGORY_ICONS[cat]} {PACKING_CATEGORY_LABELS[cat]}
            </h2>
            <div className="flex flex-col gap-2">
              {catItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 rounded-xl border border-border bg-surface p-3 ${
                    item.packed ? "opacity-50" : ""
                  }`}
                >
                  <button
                    onClick={() => togglePacked(item.id)}
                    aria-label={item.packed ? "סמן כלא ארוז" : "סמן כארוז"}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.packed
                        ? "bg-accent border-accent text-white"
                        : "border-border text-transparent"
                    }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </button>
                  <p
                    className={`flex-1 text-sm font-medium ${
                      item.packed ? "line-through" : ""
                    }`}
                  >
                    {item.title}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-foreground/35 hover:text-danger shrink-0 transition-colors"
                    aria-label="מחיקה"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
        {hydrated && items.length === 0 && (
          <p className="text-center py-8 text-sm text-foreground/45">
            הרשימה ריקה — הוסיפו פריט למעלה
          </p>
        )}
      </div>
    </div>
  );
}
