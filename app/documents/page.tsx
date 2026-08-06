"use client";

import { useState } from "react";
import { Phone, Pencil, ShieldAlert, FolderOpen, X } from "lucide-react";
import FileAttachment from "@/components/FileAttachment";
import PageHeader from "@/components/PageHeader";
import { genId, useLocalStorage } from "@/lib/storage";
import { DOCUMENT_SLOTS, EMERGENCY_CONTACTS } from "@/lib/tripData";
import { EmergencyContact } from "@/lib/types";

const EMPTY_FORM = { name: "", phone: "", note: "" };

export default function DocumentsPage() {
  const [contacts, setContacts] = useLocalStorage<EmergencyContact[]>(
    "emergencyContacts",
    EMERGENCY_CONTACTS
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPhone, setEditPhone] = useState("");

  function addContact(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setContacts((prev) => [
      ...prev,
      { id: genId(), name: form.name, phone: form.phone, note: form.note || undefined },
    ]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function removeContact(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  function startEdit(c: EmergencyContact) {
    setEditingId(c.id);
    setEditPhone(c.phone);
  }

  function saveEdit(id: string) {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, phone: editPhone, isPlaceholder: false } : c
      )
    );
    setEditingId(null);
  }

  return (
    <div>
      <PageHeader
        icon={ShieldAlert}
        title="מסמכים וחירום"
        subtitle="כרטיסים, אישורים, ביטוח ודרכון — זמינים גם ללא אינטרנט"
      />

      <section className="mb-7">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/60 mb-3">
          <FolderOpen size={16} /> מסמכים חיוניים
        </h2>
        <div className="flex flex-col gap-2.5">
          {DOCUMENT_SLOTS.map((slot) => (
            <FileAttachment key={slot.key} storageKey={slot.key} label={`${slot.icon} ${slot.label}`} />
          ))}
        </div>
        <p className="text-xs text-foreground/45 mt-3">
          כל קובץ נשמר כ-Blob במכשיר בלבד (IndexedDB) — לא מועלה לשום שרת,
          זמין גם ללא קליטה.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
            <ShieldAlert size={16} /> חירום ותמיכה
          </h2>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-xs font-semibold rounded-lg px-3 py-1.5 brand-gradient text-white"
          >
            + איש קשר
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={addContact}
            className="mb-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
          >
            <input
              required
              placeholder="שם / תיאור"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              required
              type="tel"
              dir="ltr"
              placeholder="מספר טלפון (+49...)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              placeholder="הערה (אופציונלי)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
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
          {contacts.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-border bg-surface p-3 flex items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                {c.note && <p className="text-xs text-foreground/50 mt-0.5">{c.note}</p>}
                {editingId === c.id ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      autoFocus
                      type="tel"
                      dir="ltr"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+49..."
                      className="rounded-lg border border-border bg-background px-2 py-1 text-xs w-32"
                    />
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="text-xs font-semibold text-accent"
                    >
                      שמירה
                    </button>
                  </div>
                ) : c.phone ? (
                  <a
                    href={`tel:${c.phone}`}
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-2 mt-1"
                  >
                    <Phone size={14} /> {c.phone}
                  </a>
                ) : (
                  <p className="text-xs text-foreground/40 mt-1">אין מספר עדיין</p>
                )}
              </div>
              <button
                onClick={() => startEdit(c)}
                className="text-foreground/40 hover:text-foreground/70 shrink-0"
                aria-label="עריכת מספר"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => removeContact(c.id)}
                className="text-foreground/35 hover:text-danger shrink-0 transition-colors"
                aria-label="מחיקה"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
