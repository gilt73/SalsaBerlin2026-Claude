"use client";

import { useMemo, useState } from "react";
import { ListChecks, Check, CalendarClock, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { genId, useLocalStorage } from "@/lib/storage";
import { STARTER_TODOS } from "@/lib/tripData";
import { TodoItem, TodoPriority } from "@/lib/types";

const PRIORITY_LABEL: Record<TodoPriority, string> = {
  high: "דחוף",
  normal: "רגיל",
  low: "לא דחוף",
};

const PRIORITY_STYLE: Record<TodoPriority, string> = {
  high: "bg-danger/15 text-danger",
  normal: "bg-brand-1/15 text-brand-1",
  low: "bg-foreground/10 text-foreground/50",
};

const PRIORITY_ORDER: Record<TodoPriority, number> = { high: 0, normal: 1, low: 2 };

const SEEDED_TODOS: TodoItem[] = STARTER_TODOS.map((t) => ({
  id: genId(),
  done: false,
  createdAt: Date.now(),
  ...t,
}));

const EMPTY_FORM = {
  title: "",
  note: "",
  dueDate: "",
  priority: "normal" as TodoPriority,
};

export default function TodoPage() {
  const [todos, setTodos, hydrated] = useLocalStorage<TodoItem[]>(
    "todoItems",
    SEEDED_TODOS
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const sorted = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      if (a.priority !== b.priority) return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return (a.dueDate || "9999").localeCompare(b.dueDate || "9999");
    });
  }, [todos]);

  const remaining = todos.filter((t) => !t.done).length;

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    const todo: TodoItem = {
      id: genId(),
      title: form.title.trim(),
      note: form.note.trim() || undefined,
      dueDate: form.dueDate || undefined,
      priority: form.priority,
      done: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [todo, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function toggleDone(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={ListChecks}
        title="משימות לטיול"
        subtitle={
          hydrated
            ? `${remaining} משימות פתוחות מתוך ${todos.length}`
            : "לו“ז אישי — לשכור אופנוע, לשלם על מסיבות ועוד"
        }
      />

      <button
        onClick={() => setShowForm((s) => !s)}
        className="w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60 mb-4"
      >
        + הוספת משימה
      </button>

      {showForm && (
        <form
          onSubmit={addTodo}
          className="mb-5 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="לדוגמה: לשכור אופנוע / לשלם על המסיבה ב-26"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            placeholder="הערה (אופציונלי)"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              תאריך יעד (אופציונלי)
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </label>
            <label className="text-xs text-foreground/60 flex flex-col gap-1">
              עדיפות
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as TodoPriority })
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                {Object.entries(PRIORITY_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
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

      <div className="flex flex-col gap-2">
        {sorted.map((todo) => (
          <div
            key={todo.id}
            className={`rounded-xl border border-border bg-surface p-3 flex items-start gap-3 ${
              todo.done ? "opacity-50" : ""
            }`}
          >
            <button
              onClick={() => toggleDone(todo.id)}
              aria-label={todo.done ? "סמן כלא הושלם" : "סמן כהושלם"}
              className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                todo.done
                  ? "bg-accent border-accent text-white"
                  : "border-border text-transparent"
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className={`text-sm font-medium ${todo.done ? "line-through" : ""}`}
                >
                  {todo.title}
                </p>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLE[todo.priority]}`}
                >
                  {PRIORITY_LABEL[todo.priority]}
                </span>
              </div>
              {todo.note && (
                <p className="text-xs text-foreground/55 mt-1">{todo.note}</p>
              )}
              {todo.dueDate && (
                <p className="flex items-center gap-1 text-xs text-foreground/45 mt-1">
                  <CalendarClock size={12} /> {todo.dueDate}
                </p>
              )}
            </div>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-foreground/35 hover:text-danger shrink-0 transition-colors"
              aria-label="מחיקה"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {hydrated && todos.length === 0 && (
          <p className="text-center py-8 text-sm text-foreground/45">
            אין משימות — הוסיפו את הראשונה למעלה
          </p>
        )}
      </div>
    </div>
  );
}
