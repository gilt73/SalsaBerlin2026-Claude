"use client";

import { useEffect, useRef, useState } from "react";
import { deleteFile, getFile, saveFile, StoredFile } from "@/lib/db";

/**
 * Lets the user attach a PDF/image (e.g. a boarding pass) that gets
 * stored as a Blob in IndexedDB, so it's viewable fully offline —
 * no network round-trip needed once it's saved on-device.
 */
export default function FileAttachment({
  storageKey,
  label,
}: {
  storageKey: string;
  label: string;
}) {
  const [file, setFile] = useState<StoredFile | null | undefined>(undefined);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    getFile(storageKey).then((f) => {
      if (!cancelled) setFile(f ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    // Object URLs must be created/revoked as a side effect tied to the
    // Blob's lifetime — there's no way to derive this during render.
    if (file) {
      const url = URL.createObjectURL(file.blob);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setObjectUrl(null);
  }, [file]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    await saveFile(storageKey, picked);
    setFile(await getFile(storageKey));
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleDelete() {
    await deleteFile(storageKey);
    setFile(null);
  }

  return (
    <div className="rounded-xl border border-dashed border-border p-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-foreground/60">{label}</p>
        {file ? (
          <p className="text-sm truncate mt-0.5">{file.name}</p>
        ) : (
          <p className="text-sm text-foreground/45 mt-0.5">לא צורף קובץ</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {file && objectUrl && (
          <a
            href={objectUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium rounded-lg px-2.5 py-1.5 bg-surface-muted"
          >
            צפייה
          </a>
        )}
        {file && (
          <button
            onClick={handleDelete}
            className="text-xs font-medium rounded-lg px-2.5 py-1.5 text-danger"
          >
            הסרה
          </button>
        )}
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs font-medium rounded-lg px-2.5 py-1.5 brand-gradient text-white"
        >
          {file ? "החלפה" : "העלאה"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
