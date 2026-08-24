"use client";

import { useState } from "react";
import { RefreshCw, Check, AlertCircle } from "lucide-react";
import pkg from "../package.json";
import { checkForUpdate } from "@/lib/swUpdate";

type Status = "idle" | "checking" | "up-to-date" | "updating" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: `v${pkg.version}`,
  checking: "בודק עדכון…",
  "up-to-date": "גרסה עדכנית ✓",
  updating: "נמצא עדכון, מרענן…",
  error: "אין חיבור — נסו שוב",
};

export default function VersionBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleClick() {
    if (status === "checking" || status === "updating") return;
    setStatus("checking");
    const result = await checkForUpdate();

    if (result === "updated") {
      setStatus("updating");
      // Give the new worker's caches a beat to settle before reloading.
      setTimeout(() => window.location.reload(), 400);
      return;
    }
    if (result === "up-to-date") {
      setStatus("up-to-date");
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2200);
  }

  const isBusy = status === "checking" || status === "updating";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBusy}
      title="בדיקת עדכונים"
      className={`inline-flex items-center gap-1.5 text-[10px] font-medium text-foreground/40 hover:text-foreground/70 transition-colors disabled:cursor-wait ${className}`}
    >
      {status === "up-to-date" ? (
        <Check size={11} className="text-accent" />
      ) : status === "error" ? (
        <AlertCircle size={11} className="text-danger" />
      ) : (
        <RefreshCw size={11} className={isBusy ? "animate-spin" : ""} />
      )}
      <span>{STATUS_LABEL[status]}</span>
    </button>
  );
}
