"use client";

import { useState } from "react";
import { Headphones, ExternalLink, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLocalStorage, genId } from "@/lib/storage";
import { PlaylistLink } from "@/lib/types";

function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("open.spotify.com")) return null;
    // /playlist/ID, /track/ID, /album/ID -> /embed/playlist/ID etc.
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const [type, id] = parts;
    if (!["playlist", "track", "album", "artist"].includes(type)) return null;
    return `https://open.spotify.com/embed/${type}/${id}`;
  } catch {
    return null;
  }
}

export default function MusicPage() {
  const [links, setLinks, hydrated] = useLocalStorage<PlaylistLink[]>(
    "playlistLinks",
    []
  );
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", url: "" });

  function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.url) return;
    setLinks((prev) => [{ id: genId(), ...form }, ...prev]);
    setForm({ title: "", url: "" });
    setShowForm(false);
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div>
      <PageHeader
        icon={Headphones}
        title="מוזיקה"
        subtitle="פלייליסטים בספוטיפיי לרכיבה ולזמני מנוחה"
      />

      {hydrated && links.length === 0 && !showForm && (
        <div className="text-center py-10 text-foreground/45 text-sm">
          עדיין לא נוספו פלייליסטים — הדביקו קישור מספוטיפיי
        </div>
      )}

      <div className="flex flex-col gap-4">
        {links.map((link) => {
          const embed = toEmbedUrl(link.url);
          return (
            <div key={link.id} className="rounded-2xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{link.title}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent font-medium"
                  >
                    פתיחה בספוטיפיי <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-foreground/35 hover:text-danger transition-colors"
                    aria-label="מחיקה"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              {embed ? (
                <iframe
                  src={embed}
                  className="w-full rounded-xl"
                  height="152"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              ) : (
                <p className="text-xs text-foreground/45">
                  קישור לא זוהה כפלייליסט/שיר בספוטיפיי — ניתן עדיין לפתוח אותו ישירות.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {showForm ? (
        <form
          onSubmit={addLink}
          className="mt-4 rounded-2xl border border-border bg-surface p-4 flex flex-col gap-3"
        >
          <input
            required
            placeholder="שם הפלייליסט (למשל: רכיבה בהרים)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            required
            type="url"
            placeholder="קישור spotify.com/playlist/..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            dir="ltr"
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
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 w-full rounded-xl border border-dashed border-border py-3 text-sm font-medium text-foreground/60"
        >
          + הוספת פלייליסט
        </button>
      )}
    </div>
  );
}
